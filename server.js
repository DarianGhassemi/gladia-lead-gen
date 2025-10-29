import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Exa from 'exa-js';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;

// Initialize clients
const exa = new Exa(process.env.EXA_API_KEY);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Gladia context
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

// Helper function to extract contact info
function extractContactInfo(result) {
  const { title, url, text, highlights } = result;
  const content = [text, ...(highlights || [])].join(' ');

  let name = 'Unknown';
  const titleNameMatch = title?.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
  if (titleNameMatch) {
    name = titleNameMatch[1];
  }

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

  let linkedin = null;
  if (url.includes('linkedin.com')) {
    linkedin = { url: url };
  } else {
    const linkedinMatch = content.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/);
    if (linkedinMatch) {
      linkedin = { url: `https://linkedin.com/in/${linkedinMatch[1]}` };
    }
  }

  let twitter = null;
  const twitterMatch = content.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/);
  if (twitterMatch) {
    twitter = { handle: `@${twitterMatch[1]}`, url: `https://twitter.com/${twitterMatch[1]}` };
  }

  let github = null;
  const githubMatch = content.match(/github\.com\/([a-zA-Z0-9-]+)/);
  if (githubMatch && !githubMatch[1].includes('/')) {
    github = { username: githubMatch[1], url: `https://github.com/${githubMatch[1]}` };
  }

  let email = null;
  const emailMatch = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    email = emailMatch[1];
  }

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

// API Routes

// Get all available profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const configData = await fs.readFile('./search-config.json', 'utf-8');
    const config = JSON.parse(configData);

    const profiles = Object.keys(config.profiles).map(key => ({
      id: key,
      ...config.profiles[key]
    }));

    res.json({ profiles, activeProfile: config.activeProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate leads
app.post('/api/generate-leads', async (req, res) => {
  try {
    const { query, criteria, leadCount } = req.body;

    const searchQuery = `${query} ${criteria.join(' ')}`;

    const searchResults = await exa.searchAndContents(searchQuery, {
      type: 'neural',
      useAutoprompt: true,
      numResults: leadCount * 3,
      text: true,
      highlights: {
        numSentences: 3,
        highlightsPerUrl: 3
      },
      includeDomains: ['linkedin.com', 'github.com', 'twitter.com', 'medium.com'],
    });

    const leads = searchResults.results
      .map(result => extractContactInfo(result))
      .filter(lead => lead.name !== 'Unknown')
      .slice(0, leadCount);

    // Save to files
    await fs.mkdir('./leads', { recursive: true });
    await fs.writeFile('./leads/leads.json', JSON.stringify(leads, null, 2));

    res.json({ leads, count: leads.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate email for a single lead
app.post('/api/generate-email', async (req, res) => {
  try {
    const { lead, emailType = 'cold_outreach' } = req.body;

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

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompts[emailType] }],
    });

    const emailContent = message.content[0].text;
    const subjectMatch = emailContent.match(/SUBJECT:\s*(.+?)(?:\n|$)/i);
    const bodyMatch = emailContent.match(/BODY:\s*([\s\S]+)/i);

    const email = {
      subject: subjectMatch ? subjectMatch[1].trim() : 'Gladia - Speech-to-Text API',
      body: bodyMatch ? bodyMatch[1].trim() : emailContent,
      type: emailType,
      generated_at: new Date().toISOString(),
    };

    res.json({ email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate emails for multiple leads
app.post('/api/generate-emails', async (req, res) => {
  try {
    const { leads, emailType = 'cold_outreach' } = req.body;
    const emails = [];

    for (const lead of leads) {
      const response = await fetch(`http://localhost:${PORT}/api/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead, emailType })
      });

      const { email } = await response.json();

      emails.push({
        lead: {
          name: lead.name,
          email: lead.email,
          title: lead.title,
          company: lead.company?.name,
          linkedin: lead.linkedin?.url,
        },
        email
      });

      // Rate limiting
      if (leads.indexOf(lead) < leads.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Save to file
    await fs.writeFile('./leads/emails.json', JSON.stringify(emails, null, 2));

    res.json({ emails, count: emails.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
