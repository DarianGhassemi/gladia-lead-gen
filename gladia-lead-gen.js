import 'dotenv/config';
import Exa from "exa-js";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

// Initialize clients
const exa = new Exa(process.env.EXA_API_KEY);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load search configuration
async function loadSearchConfig() {
  try {
    const configData = await fs.readFile("./search-config.json", "utf-8");
    const config = JSON.parse(configData);

    const activeProfileName = config.activeProfile || "default";
    const profile = config.profiles[activeProfileName];

    if (!profile) {
      throw new Error(`Profile "${activeProfileName}" not found in search-config.json`);
    }

    console.log(`📋 Using profile: "${profile.name}"`);
    console.log(`📝 Description: ${profile.description}`);
    console.log(`🎯 Target leads: ${profile.leadCount}\n`);

    return profile;
  } catch (error) {
    console.error("❌ Error loading search-config.json:", error.message);
    console.log("💡 Using default configuration...\n");

    // Fallback to default config
    return {
      name: "Default Profile",
      description: "AI Engineers & CTOs (Voice/Speech Focus)",
      leadCount: 50,
      search: {
        query: `AI engineers, CTOs, and technical decision makers focused on speech-to-text,
voice AI, and conversational AI applications. They build voice agents, meeting transcription
tools, phone support automation, and sales call analysis tools.`,
        criteria: [
          "currently employed as an ai engineer, cto, vp of engineering, or technical decision maker",
          "professional focus on speech-to-text, voice ai, conversational ai, or audio processing",
          "builds or maintains products involving: ai voice agents, meeting transcription, phone support automation, or voice-enabled applications",
          "works at a company with 10-1000 employees (not enterprise, not solo)",
          "likely in the market for speech-to-text apis or looking to improve their current solution",
          "active in the ai/developer community (github, twitter, linkedin, blog posts)"
        ],
        enrichments: ["linkedin", "email", "twitter", "company", "github", "personal_website"]
      }
    };
  }
}

// Configuration
const CONFIG = {
  outputDir: "./leads",
  leadsFile: "./leads/leads.json",
  emailsFile: "./leads/emails.json",
  csvFile: "./leads/leads.csv",
};

// Gladia value proposition for context
const GLADIA_CONTEXT = `
Gladia is a speech-to-text API that offers:
- High accuracy transcription with speaker diarization
- Support for 100+ languages
- Real-time and batch processing
- Audio intelligence features (summarization, sentiment analysis, topic detection)
- Easy integration with modern tech stacks
- Competitive pricing with generous free tier
- Built for developers with excellent documentation
`;

// Helper functions to extract contact info from search results
function extractContactInfo(result) {
  const { title, url, text, highlights } = result;

  // Combine text and highlights for better extraction
  const content = [text, ...(highlights || [])].join(' ');

  // Extract name from title or content
  let name = 'Unknown';
  const titleNameMatch = title?.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
  if (titleNameMatch) {
    name = titleNameMatch[1];
  }

  // Extract role/title
  let role = 'N/A';
  const rolePatterns = [
    /(?:^|\s)(CTO|CEO|VP of Engineering|Head of AI|AI Engineer|ML Engineer|Engineering Manager|Founder|Co-Founder|Chief Technology Officer|Technical Lead|Engineering Director)/i,
    /(?:title|role|position):\s*([^,\n]+)/i
  ];
  for (const pattern of rolePatterns) {
    const match = (title + ' ' + content).match(pattern);
    if (match) {
      role = match[1];
      break;
    }
  }

  // Extract company
  let company = 'N/A';
  const companyPatterns = [
    /(?:at|@)\s+([A-Z][a-zA-Z0-9\s&]+(?:Inc|LLC|Ltd|Corporation|Corp)?)/,
    /(?:works? at|working at|employed at)\s+([A-Z][a-zA-Z0-9\s&]+)/i,
    /(?:company|organization):\s*([^,\n]+)/i
  ];
  for (const pattern of companyPatterns) {
    const match = (title + ' ' + content).match(pattern);
    if (match) {
      company = match[1].trim();
      break;
    }
  }

  // Extract LinkedIn URL
  let linkedin = null;
  if (url.includes('linkedin.com')) {
    linkedin = { url: url };
  } else {
    const linkedinMatch = content.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/);
    if (linkedinMatch) {
      linkedin = { url: `https://linkedin.com/in/${linkedinMatch[1]}` };
    }
  }

  // Extract Twitter
  let twitter = null;
  const twitterMatch = content.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/);
  if (twitterMatch) {
    twitter = { handle: `@${twitterMatch[1]}`, url: `https://twitter.com/${twitterMatch[1]}` };
  }

  // Extract GitHub
  let github = null;
  const githubMatch = content.match(/github\.com\/([a-zA-Z0-9-]+)/);
  if (githubMatch && !githubMatch[1].includes('/')) {
    github = { username: githubMatch[1], url: `https://github.com/${githubMatch[1]}` };
  }

  // Extract email (basic pattern)
  let email = null;
  const emailMatch = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    email = emailMatch[1];
  }

  // Generate summary
  const summary = text?.substring(0, 300) || highlights?.[0]?.substring(0, 300) || 'No summary available';

  return {
    name,
    title: role,
    company: { name: company },
    email,
    linkedin,
    twitter,
    github,
    personal_website: url,
    summary,
    source_url: url,
    raw_title: title
  };
}

async function generateLeads(searchProfile) {
  console.log("🔍 Searching for leads with Exa Search API...");

  try {
    // Build comprehensive search query
    const searchQuery = `${searchProfile.search.query} ${searchProfile.search.criteria.join(' ')}`;

    console.log(`📝 Query: ${searchQuery.substring(0, 150)}...`);

    // Use standard Exa search with contents
    const searchResults = await exa.searchAndContents(searchQuery, {
      type: "neural",
      useAutoprompt: true,
      numResults: searchProfile.leadCount * 3, // Get more results to filter
      text: true,
      highlights: {
        numSentences: 3,
        highlightsPerUrl: 3
      },
      includeDomains: ["linkedin.com", "github.com", "twitter.com", "medium.com"],
    });

    console.log(`🔎 Found ${searchResults.results.length} raw results, extracting contact info...`);

    // Extract and structure lead data
    const leads = searchResults.results
      .map(result => extractContactInfo(result))
      .filter(lead => lead.name !== 'Unknown') // Filter out leads without names
      .slice(0, searchProfile.leadCount); // Limit to requested count

    console.log(`✅ Extracted ${leads.length} qualified leads`);

    // Create output directory
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    // Save raw results
    await fs.writeFile(
      CONFIG.leadsFile,
      JSON.stringify(leads, null, 2)
    );

    // Also save as CSV for easy viewing
    await saveLeadsAsCSV(leads);

    console.log(`📁 Leads saved to ${CONFIG.leadsFile}`);
    console.log(`📊 CSV saved to ${CONFIG.csvFile}`);

    return leads;
  } catch (error) {
    console.error("❌ Error generating leads:", error.message);
    throw error;
  }
}

async function saveLeadsAsCSV(leads) {
  const csvWriter = createObjectCsvWriter({
    path: CONFIG.csvFile,
    header: [
      { id: "name", title: "Name" },
      { id: "title", title: "Title" },
      { id: "company", title: "Company" },
      { id: "email", title: "Email" },
      { id: "linkedin", title: "LinkedIn" },
      { id: "twitter", title: "Twitter" },
      { id: "github", title: "GitHub" },
      { id: "website", title: "Website" },
      { id: "summary", title: "Summary" },
    ],
  });

  const records = leads.map((lead) => ({
    name: lead.name || "N/A",
    title: lead.title || "N/A",
    company: lead.company?.name || "N/A",
    email: lead.email || "N/A",
    linkedin: lead.linkedin?.url || "N/A",
    twitter: lead.twitter?.handle || "N/A",
    github: lead.github?.username || "N/A",
    website: lead.personal_website || "N/A",
    summary: lead.summary?.substring(0, 200) || "N/A",
  }));

  await csvWriter.writeRecords(records);
}

async function generateEmailForLead(lead, emailType = "cold_outreach") {
  console.log(`✍️  Generating ${emailType} email for ${lead.name}...`);

  const prompts = {
    cold_outreach: `You are writing a personalized cold outreach email for Gladia, a speech-to-text API company.

Lead Information:
- Name: ${lead.name}
- Title: ${lead.title || "Not specified"}
- Company: ${lead.company?.name || "Not specified"}
- Summary: ${lead.summary || "Not specified"}
- LinkedIn: ${lead.linkedin?.url || "Not specified"}
- GitHub: ${lead.github?.username || "Not specified"}

Gladia Context:
${GLADIA_CONTEXT}

Write a personalized cold email that:
1. References something specific about their work/company (use the summary and profile info)
2. Clearly explains how Gladia can solve a pain point they likely have
3. Includes a clear, low-pressure call-to-action
4. Is concise (150-200 words max)
5. Feels personal, not templated
6. Has a compelling subject line

Format your response as:
SUBJECT: [subject line]

BODY:
[email body]`,

    follow_up: `You are writing a follow-up email for Gladia to someone who hasn't responded to initial outreach.

Lead Information:
- Name: ${lead.name}
- Title: ${lead.title || "Not specified"}
- Company: ${lead.company?.name || "Not specified"}

Write a brief follow-up email that:
1. Adds new value (a relevant case study, feature, or insight)
2. Acknowledges they're busy
3. Makes it easy to respond with a simple yes/no question
4. Is very short (75-100 words)

Format your response as:
SUBJECT: [subject line]

BODY:
[email body]`,

    value_add: `You are writing a value-add email for Gladia that provides useful content first, asks for nothing.

Lead Information:
- Name: ${lead.name}
- Title: ${lead.title || "Not specified"}
- Company: ${lead.company?.name || "Not specified"}
- Summary: ${lead.summary || "Not specified"}

Write an email that:
1. Shares a relevant technical insight, benchmark, or resource about speech-to-text
2. References their specific use case or industry
3. Positions you as helpful, not salesy
4. Has no explicit CTA (just "hope this helps" vibe)
5. Is 100-150 words

Format your response as:
SUBJECT: [subject line]

BODY:
[email body]`,
  };

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompts[emailType],
        },
      ],
    });

    const emailContent = message.content[0].text;

    // Parse subject and body
    const subjectMatch = emailContent.match(/SUBJECT:\s*(.+?)(?:\n|$)/i);
    const bodyMatch = emailContent.match(/BODY:\s*([\s\S]+)/i);

    return {
      subject: subjectMatch ? subjectMatch[1].trim() : "Gladia - Speech-to-Text API",
      body: bodyMatch ? bodyMatch[1].trim() : emailContent,
      type: emailType,
      generated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`❌ Error generating email for ${lead.name}:`, error.message);
    return null;
  }
}

async function generateEmailsForAllLeads(leads, emailType = "cold_outreach") {
  console.log(`\n📧 Generating ${emailType} emails for ${leads.length} leads...`);

  const emails = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`\nProcessing ${i + 1}/${leads.length}: ${lead.name}`);

    const email = await generateEmailForLead(lead, emailType);

    if (email) {
      emails.push({
        lead: {
          name: lead.name,
          email: lead.email,
          title: lead.title,
          company: lead.company?.name,
          linkedin: lead.linkedin?.url,
        },
        email: email,
      });

      console.log(`✅ Email generated for ${lead.name}`);
    }

    // Rate limiting - be nice to the API
    if (i < leads.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Save emails to file
  await fs.writeFile(CONFIG.emailsFile, JSON.stringify(emails, null, 2));
  console.log(`\n✅ All emails saved to ${CONFIG.emailsFile}`);

  return emails;
}

async function displayEmailSample(emails, count = 5) {
  console.log("\n" + "=".repeat(80));
  console.log("📬 SAMPLE EMAILS (first " + count + ")");
  console.log("=".repeat(80));

  for (let i = 0; i < Math.min(count, emails.length); i++) {
    const { lead, email } = emails[i];

    console.log(`\n${"─".repeat(80)}`);
    console.log(`To: ${lead.name} <${lead.email || "No email found"}>`);
    console.log(`Company: ${lead.company || "N/A"} | Title: ${lead.title || "N/A"}`);
    console.log(`${"─".repeat(80)}`);
    console.log(`Subject: ${email.subject}`);
    console.log(`\n${email.body}`);
    console.log(`${"─".repeat(80)}\n`);
  }
}

// Main execution
async function main() {
  console.log("🚀 Gladia Lead Generation & Email System");
  console.log("=".repeat(80) + "\n");

  try {
    // Step 1: Load search configuration
    const searchProfile = await loadSearchConfig();

    // Step 2: Generate leads
    const leads = await generateLeads(searchProfile);

    if (leads.length === 0) {
      console.log("❌ No leads found. Try adjusting your search criteria in search-config.json");
      return;
    }

    // Step 3: Generate emails for all leads
    const emailType = process.env.EMAIL_TYPE || "cold_outreach"; // Options: cold_outreach, follow_up, value_add
    const emails = await generateEmailsForAllLeads(leads, emailType);

    // Step 4: Display sample emails
    await displayEmailSample(emails, 5);

    console.log("\n✅ Complete! Check the following files:");
    console.log(`   - ${CONFIG.leadsFile} (raw lead data)`);
    console.log(`   - ${CONFIG.csvFile} (leads in spreadsheet format)`);
    console.log(`   - ${CONFIG.emailsFile} (generated emails)`);
    console.log(`\n💡 To use a different search profile, edit search-config.json`);
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

main();
