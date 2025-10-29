# Gladia Lead Generation & Email System 🚀

A complete lead generation and personalized email writing system using Exa Websets API and Claude AI with **customizable search profiles**.

## 🎯 Key Feature: Customizable Search Profiles

This system includes **8 pre-built search profiles** targeting different market segments, plus the ability to create your own custom profiles. Simply change the `activeProfile` in [search-config.json](search-config.json) to target different audiences.

### Available Profiles:
1. **default** - AI Engineers & CTOs (Voice/Speech Focus)
2. **meeting-tools** - Meeting & Collaboration Tool Builders
3. **customer-support** - Customer Support AI Builders
4. **sales-coaching** - Sales Intelligence & Coaching Tools
5. **healthcare-tech** - Healthcare & Medical Documentation
6. **media-podcasting** - Media, Podcasting & Content Platforms
7. **legal-compliance** - Legal Tech & Compliance Recording
8. **education-tech** - Education & E-Learning Platforms

---

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up API Keys

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```bash
EXA_API_KEY=your-exa-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here
```

Get your API keys:
- **Exa API**: https://exa.ai
- **Anthropic API**: https://console.anthropic.com

### 3. Choose Your Search Profile

Edit [search-config.json](search-config.json):
```json
{
  "activeProfile": "meeting-tools"  // Change this to any profile name
}
```

### 4. Run the System

```bash
npm start
```

This will:
✅ Use your selected search profile
✅ Find 50 qualified leads
✅ Enrich with contact info
✅ Generate personalized emails
✅ Save to `./leads/` folder

---

## 📊 Output Files

After running, check these files:

- **`./leads/leads.json`** - Raw lead data with all enrichments
- **`./leads/leads.csv`** - Spreadsheet format (import to CRM)
- **`./leads/emails.json`** - Generated personalized emails

---

## 🎨 Email Types

Generate different email styles:

```bash
npm run cold           # Cold outreach (150-200 words)
npm run followup       # Follow-up emails (75-100 words)
npm run value          # Value-add emails, no ask (100-150 words)
```

---

## 🔧 Customizing Search Profiles

### Switch to a Different Profile

Edit [search-config.json](search-config.json):
```json
{
  "activeProfile": "healthcare-tech"  // Target healthcare companies
}
```

### Create Your Own Profile

See [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for detailed instructions.

Quick example - add a new profile to `search-config.json`:

```json
{
  "activeProfile": "your-custom-profile",
  "profiles": {
    "your-custom-profile": {
      "name": "Your Target Market",
      "description": "Description of who you're targeting",
      "leadCount": 50,
      "search": {
        "query": "Natural language description of your ideal leads",
        "criteria": [
          "role: specific job titles or roles",
          "works on: specific technologies or products",
          "company size: employee range",
          "needs: pain points they likely have"
        ],
        "enrichments": ["linkedin", "email", "twitter", "company", "github"]
      }
    }
  }
}
```

### Adjust Number of Leads

In [search-config.json](search-config.json), change `leadCount`:
```json
{
  "profiles": {
    "default": {
      "leadCount": 100,  // Increase from 50 to 100
      ...
    }
  }
}
```

---

## 📚 Documentation

- **[SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)** - Complete guide to customizing search criteria
- **[search-config.json](search-config.json)** - Your search profile configuration

---

## 🚀 Available Commands

### Generate New Leads + Emails
```bash
npm start              # Use active profile, cold outreach
npm run cold           # Cold outreach emails
npm run followup       # Follow-up emails
npm run value          # Value-add emails
```

### Regenerate Emails (Use Existing Leads)
```bash
npm run regen          # Regenerate with default type
npm run regen:cold     # New cold emails
npm run regen:followup # New follow-ups
npm run regen:value    # New value-add emails
```

---

## 💡 Tips for Best Results

1. **Start Small**: Set `leadCount: 10` to test profile quality
2. **Review Output**: Check `leads.csv` and sample emails
3. **Iterate**: Adjust criteria in [search-config.json](search-config.json) based on results
4. **Switch Profiles**: Try different profiles for different campaigns
5. **Customize**: Create your own profiles for your specific ICP

---

## 🆘 Troubleshooting

**"No leads found"**
- Increase `leadCount` in your profile (try 100-200)
- Broaden your search criteria
- Check if your Exa API key is valid

**"Wrong types of leads"**
- Make criteria more specific in [search-config.json](search-config.json)
- See [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for tips

**"API key error"**
```bash
# Verify environment variables are set
cat .env
```

---

## 🎯 Example Workflow

```bash
# 1. Target meeting tool builders
# Edit search-config.json: "activeProfile": "meeting-tools"
npm start

# 2. Review results
open leads/leads.csv

# 3. Try healthcare market
# Edit search-config.json: "activeProfile": "healthcare-tech"
npm start

# 4. Regenerate with different email style
npm run regen:followup
```

---

## 📖 Learn More

- Read [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for in-depth customization
- Check [search-config.json](search-config.json) to see all 8 pre-built profiles
- Each profile is production-ready and targets a specific market segment

---

## 📦 What's Included

```
gladia-lead-gen/
├── gladia-lead-gen.js           # Main script
├── regenerate-emails.js         # Regenerate emails
├── search-config.json           # 8 pre-built search profiles
├── SEARCH_CONFIG_GUIDE.md       # Customization guide
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment template
└── README.md                    # This file
```

---

**Built with:** Exa Websets API + Claude AI + Node.js
**Setup Time:** 5 minutes
**Time to First Results:** 2-3 minutes

**Ready? Start with [search-config.json](search-config.json) → Pick a profile → `npm start`** 🚀
