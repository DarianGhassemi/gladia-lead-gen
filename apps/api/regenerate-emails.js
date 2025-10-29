import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";

// Initialize Claude
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

Gladia Context:
${GLADIA_CONTEXT}

Write a personalized cold email that:
1. References something specific about their work/company
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
    const subjectMatch = emailContent.match(/SUBJECT:\s*(.+?)(?:\n|$)/i);
    const bodyMatch = emailContent.match(/BODY:\s*([\s\S]+)/i);

    return {
      subject: subjectMatch ? subjectMatch[1].trim() : "Gladia - Speech-to-Text API",
      body: bodyMatch ? bodyMatch[1].trim() : emailContent,
      type: emailType,
      generated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`❌ Error generating email:`, error.message);
    return null;
  }
}

async function main() {
  console.log("🔄 Regenerating Emails for Existing Leads\n");

  try {
    // Load existing leads
    const leadsData = await fs.readFile("./leads/leads.json", "utf-8");
    const leads = JSON.parse(leadsData);

    console.log(`📋 Found ${leads.length} existing leads`);

    const emailType = process.env.EMAIL_TYPE || "cold_outreach";
    console.log(`📧 Generating ${emailType} emails...\n`);

    const emails = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      console.log(`Processing ${i + 1}/${leads.length}: ${lead.name}`);

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
      }

      // Rate limiting
      if (i < leads.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Save new emails
    await fs.writeFile(
      "./leads/emails.json",
      JSON.stringify(emails, null, 2)
    );

    console.log(`\n✅ Generated ${emails.length} emails`);
    console.log(`📁 Saved to ./leads/emails.json`);

    // Display first 3 samples
    console.log("\n" + "=".repeat(80));
    console.log("📬 SAMPLE EMAILS (first 3)");
    console.log("=".repeat(80));

    for (let i = 0; i < Math.min(3, emails.length); i++) {
      const { lead, email } = emails[i];
      console.log(`\n${"─".repeat(80)}`);
      console.log(`To: ${lead.name} <${lead.email || "No email found"}>`);
      console.log(`${"─".repeat(80)}`);
      console.log(`Subject: ${email.subject}`);
      console.log(`\n${email.body}`);
      console.log(`${"─".repeat(80)}\n`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
