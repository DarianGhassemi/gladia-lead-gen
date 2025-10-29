# Search Profiles Overview 🎯

Quick reference for all 8 pre-built search profiles.

---

## 1. default - AI Engineers & CTOs (Voice/Speech Focus)

**Target Audience:**
- AI engineers, CTOs, VPs of Engineering
- Technical decision makers

**Focus Areas:**
- Speech-to-text applications
- Voice AI and conversational AI
- AI voice agents
- Meeting transcription tools
- Phone support automation

**Company Size:** 10-1000 employees

**Best For:**
- Initial broad targeting
- Companies actively building voice features
- Technical teams evaluating STT APIs

---

## 2. meeting-tools - Meeting & Collaboration Tool Builders

**Target Audience:**
- Product managers
- Engineers
- Founders

**Focus Areas:**
- Meeting assistants
- Note-taking apps
- Video conferencing platforms
- Collaboration software
- Zoom/Meet/Teams integrations

**Key Needs:**
- Automatic transcription
- Meeting summaries
- Action item extraction
- Searchable meeting history

**Company Size:** 5-500 employees

**Best For:**
- Remote work tools
- Productivity platforms
- Video conferencing add-ons

---

## 3. customer-support - Customer Support AI Builders

**Target Audience:**
- AI/ML engineers
- Product leaders

**Focus Areas:**
- AI phone support
- Call center AI
- Customer service automation
- Conversational support bots

**Key Needs:**
- Real-time transcription
- Sentiment analysis
- Call analytics
- Voice bot capabilities

**Company Size:** 10-1000 employees

**Best For:**
- SaaS support platforms
- Customer service software
- Call center automation

---

## 4. sales-coaching - Sales Intelligence & Coaching Tools

**Target Audience:**
- Heads of Product
- VPs of Engineering
- CTOs
- Founders

**Focus Areas:**
- Sales intelligence platforms
- Call recording
- Conversation analytics
- Sales coaching tools

**Key Needs:**
- Accurate transcription
- Speaker diarization
- Keyword spotting
- Sentiment analysis

**Company Size:** 10-500 employees (Series A to Growth)

**Best For:**
- Revenue operations tools
- Sales enablement platforms
- Conversation intelligence

---

## 5. healthcare-tech - Healthcare & Medical Documentation

**Target Audience:**
- Health tech engineers
- Product managers
- Medical informatics specialists

**Focus Areas:**
- Medical scribe software
- Clinical documentation
- EHR integration
- Healthcare voice assistants

**Key Needs:**
- HIPAA-compliant transcription
- Medical terminology accuracy
- EHR integration
- Clinical workflow automation

**Company Size:** 10-500 employees

**Best For:**
- Digital health companies
- Clinical documentation tools
- Medical workflow automation

---

## 6. media-podcasting - Media, Podcasting & Content Platforms

**Target Audience:**
- Engineering leaders
- Product managers

**Focus Areas:**
- Podcast platforms
- Video hosting services
- Content creation tools
- Media production

**Key Needs:**
- Podcast transcription
- Video subtitles
- Content search
- Accessibility features
- Multi-language support

**Company Type:** Media tech, creator tools, content platforms

**Best For:**
- Podcast hosting
- Video platforms
- Content management systems

---

## 7. legal-compliance - Legal Tech & Compliance Recording

**Target Audience:**
- Legal tech engineers
- Product managers
- CTOs

**Focus Areas:**
- Deposition recording
- Legal transcription
- Compliance recording
- Contract analysis

**Key Needs:**
- High accuracy transcription
- Timestamp precision
- Speaker identification
- Secure storage

**Target Customers:** Law firms, legal departments, compliance teams

**Best For:**
- Legal workflow automation
- Litigation technology
- Compliance software

---

## 8. education-tech - Education & E-Learning Platforms

**Target Audience:**
- EdTech engineers
- Product managers
- Heads of Product

**Focus Areas:**
- Lecture transcription
- Learning management systems
- Educational video platforms
- Student accessibility tools

**Key Needs:**
- Lecture captioning
- Searchable video content
- Multi-language support
- Accessibility compliance

**Target Customers:**
- Universities
- K-12 schools
- Online learning platforms
- Corporate training

**Best For:**
- Educational platforms
- E-learning tools
- Video learning platforms

---

## Quick Comparison Table

| Profile | Best Lead Volume | Decision Speed | Technical Complexity |
|---------|-----------------|----------------|---------------------|
| default | 🔥🔥🔥 High | ⚡⚡⚡ Fast | 🔧🔧🔧 High |
| meeting-tools | 🔥🔥🔥 High | ⚡⚡ Medium | 🔧🔧 Medium |
| customer-support | 🔥🔥 Medium | ⚡⚡ Medium | 🔧🔧 Medium |
| sales-coaching | 🔥🔥 Medium | ⚡⚡⚡ Fast | 🔧🔧 Medium |
| healthcare-tech | 🔥 Lower | ⚡ Slow | 🔧🔧🔧 High |
| media-podcasting | 🔥🔥 Medium | ⚡⚡ Medium | 🔧 Low-Med |
| legal-compliance | 🔥 Lower | ⚡ Slow | 🔧🔧🔧 High |
| education-tech | 🔥🔥 Medium | ⚡ Slow | 🔧🔧 Medium |

---

## How to Choose

### Need High Volume Fast?
→ **default** or **meeting-tools**

### Targeting Specific Verticals?
→ **healthcare-tech**, **legal-compliance**, **education-tech**

### Focus on B2B SaaS?
→ **customer-support** or **sales-coaching**

### Content/Creator Market?
→ **media-podcasting**

---

## Switching Profiles

### Method 1: Edit Config File
```bash
nano search-config.json
# Change: "activeProfile": "meeting-tools"
```

### Method 2: Use Helper Script
```bash
./switch-profile.sh meeting-tools
```

### Method 3: Manual Edit
Open [search-config.json](search-config.json) and change line 2.

---

## Creating Your Own Profile

See [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for step-by-step instructions.

**Quick template:**
```json
{
  "your-profile-name": {
    "name": "Display Name",
    "description": "Who you're targeting",
    "leadCount": 50,
    "search": {
      "query": "Natural language description...",
      "criteria": [
        "role: job titles",
        "builds: product types",
        "needs: pain points",
        "company size: range"
      ],
      "enrichments": ["linkedin", "email", "twitter", "company", "github"]
    }
  }
}
```

---

## Tips

1. **Start with default** to understand the system
2. **Test profiles** with leadCount: 10 first
3. **Compare results** between different profiles
4. **Create custom profiles** for your specific ICP
5. **Track performance** - which profiles get best responses?

---

**Ready to start?**

```bash
# Pick a profile
./switch-profile.sh meeting-tools

# Generate leads
npm start

# Review results
open leads/leads.csv
```

🚀 Happy prospecting!
