# Search Configuration Guide 🎯

This guide explains how to customize your lead search criteria using the `search-config.json` file.

## Quick Start

### Using a Pre-Built Profile

```bash
# Edit search-config.json and change the activeProfile
{
  "activeProfile": "meeting-tools"  // Change this to any profile name
}

# Then run normally
npm start
```

### Available Pre-Built Profiles

1. **default** - AI Engineers & CTOs (Voice/Speech Focus)
2. **meeting-tools** - Meeting & Collaboration Tool Builders
3. **customer-support** - Customer Support AI Builders
4. **sales-coaching** - Sales Intelligence & Coaching Tools
5. **healthcare-tech** - Healthcare & Medical Documentation
6. **media-podcasting** - Media, Podcasting & Content Platforms
7. **legal-compliance** - Legal Tech & Compliance Recording
8. **education-tech** - Education & E-Learning Platforms

## Creating Custom Profiles

### Profile Structure

```json
{
  "activeProfile": "your-profile-name",
  "profiles": {
    "your-profile-name": {
      "name": "Display Name",
      "description": "What this profile targets",
      "leadCount": 50,
      "search": {
        "query": "High-level description of who you're looking for",
        "criteria": [
          "criterion 1",
          "criterion 2",
          "criterion 3"
        ],
        "enrichments": ["linkedin", "email", "twitter", "company", "github"]
      }
    }
  }
}
```

### Example: Custom Profile for DevOps Engineers

```json
{
  "activeProfile": "devops-monitoring",
  "profiles": {
    "devops-monitoring": {
      "name": "DevOps Engineers - Monitoring & Observability",
      "description": "DevOps teams building monitoring and observability tools",
      "leadCount": 75,
      "search": {
        "query": "DevOps engineers and SREs building monitoring, observability, and incident management platforms",
        "criteria": [
          "role: devops engineer, sre, platform engineer, or infrastructure lead",
          "works on: monitoring tools, observability platforms, or incident management",
          "uses: prometheus, grafana, datadog, or custom monitoring solutions",
          "company size: 20-1000 employees",
          "needs: log analysis, metrics aggregation, alert management",
          "active in devops community on twitter, github, or tech blogs"
        ],
        "enrichments": [
          "linkedin",
          "email",
          "twitter",
          "github"
        ]
      }
    }
  }
}
```

## Writing Effective Search Criteria

### Best Practices

#### 1. **Start Broad, Then Narrow**

❌ Too narrow:
```json
"criteria": [
  "must be cto at a series b company in san francisco using python and react"
]
```

✅ Better:
```json
"criteria": [
  "role: cto, vp of engineering, or technical cofounder",
  "company stage: seed to series b (10-200 employees)",
  "tech stack includes: python, react, or node.js",
  "location: us-based or remote"
]
```

#### 2. **Focus on Pain Points & Use Cases**

❌ Generic:
```json
"builds software products"
```

✅ Specific:
```json
"builds products with these pain points: needs real-time transcription, handles high audio volume, requires multi-language support, needs speaker identification"
```

#### 3. **Use Multiple Criteria Types**

Mix different types of criteria:
- **Role-based**: "cto, ai engineer, product manager"
- **Technology**: "uses python, aws, builds apis"
- **Use case**: "builds voice assistants, call analytics"
- **Company**: "10-500 employees, saas platform, venture-backed"
- **Activity**: "active on github, writes tech blog, speaks at conferences"

#### 4. **Be Specific About Decision-Making Power**

```json
"criteria": [
  "has technical decision-making authority (cto, vp eng, tech lead)",
  "owns or influences technology purchasing decisions",
  "manages engineering team or product roadmap"
]
```

### Query Writing Tips

The `query` field is a natural language description. Make it descriptive:

❌ Vague:
```json
"query": "People who need our API"
```

✅ Clear:
```json
"query": "Senior engineers and technical leaders at mid-sized SaaS companies (50-500 employees) who are building customer-facing voice features, call analytics, or meeting intelligence tools. They currently use or are evaluating speech-to-text APIs and care about accuracy, latency, and ease of integration."
```

## Advanced Customization

### Adjusting Lead Count by Profile

```json
{
  "profiles": {
    "high-volume-search": {
      "leadCount": 200,  // Get more leads
      ...
    },
    "quality-focused": {
      "leadCount": 20,   // Get fewer, higher-quality leads
      ...
    }
  }
}
```

### Targeting Specific Company Sizes

```json
"criteria": [
  "company size: 10-50 employees (early stage)",
  // or
  "company size: 50-200 employees (growth stage)",
  // or
  "company size: 200-1000 employees (scale up)",
  // or
  "company size: under 1000 employees (not enterprise)"
]
```

### Targeting by Technology Stack

```json
"criteria": [
  "uses or interested in: python, javascript, go, or rust",
  "deploys on: aws, gcp, or azure",
  "builds: rest apis, websockets, or streaming services",
  "frameworks: react, vue, fastapi, or django"
]
```

### Targeting by Funding/Company Stage

```json
"criteria": [
  "company stage: pre-seed to series a (product-market fit phase)",
  "venture-backed or bootstrapped with revenue",
  "actively hiring engineers",
  "shipping product updates regularly"
]
```

### Geographic Targeting

```json
"criteria": [
  "location: san francisco bay area, new york, or austin",
  // or
  "location: us-based or us remote",
  // or
  "location: europe (uk, germany, france, netherlands)",
  // or
  "global/remote-first company"
]
```

## Real-World Examples

### Example 1: Fintech Companies Needing Voice Banking

```json
{
  "fintech-voice": {
    "name": "Fintech - Voice Banking & Phone Support",
    "description": "Financial services companies building voice banking and phone support",
    "leadCount": 50,
    "search": {
      "query": "Engineering and product leaders at fintech companies building voice banking, phone support for financial services, or conversational ai for banking apps.",
      "criteria": [
        "works at: fintech startup, digital bank, payment platform, or financial services company",
        "role: ai engineer, product manager, cto, or head of customer experience",
        "builds: voice banking, phone support automation, or conversational banking assistant",
        "needs: secure voice verification, transaction confirmations, account inquiries by voice",
        "compliance requirements: pci-dss, sox, or financial regulations",
        "company size: 20-500 employees"
      ],
      "enrichments": ["linkedin", "email", "twitter", "company", "github"]
    }
  }
}
```

### Example 2: Developer Tool Companies

```json
{
  "devtools": {
    "name": "Developer Tools with Voice/Audio Features",
    "description": "Developer tool companies adding voice or audio capabilities",
    "leadCount": 40,
    "search": {
      "query": "Product and engineering leaders at developer tool companies looking to add voice commands, audio documentation, or speech-enabled features to their IDEs, platforms, or services.",
      "criteria": [
        "builds: ide, code editor, developer platform, or programming tools",
        "role: product manager, staff engineer, or technical cofounder",
        "interested in: voice commands for coding, audio documentation, accessibility features",
        "targets: professional developers and engineering teams",
        "company type: devtools startup or developer platform",
        "company size: 10-300 employees"
      ],
      "enrichments": ["linkedin", "email", "twitter", "github", "personal_website"]
    }
  }
}
```

### Example 3: E-commerce with Voice Shopping

```json
{
  "ecommerce-voice": {
    "name": "E-commerce Voice Shopping & Support",
    "description": "E-commerce platforms adding voice shopping and customer support",
    "leadCount": 60,
    "search": {
      "query": "E-commerce platform engineers and product managers building voice shopping, voice search, or ai phone support for online retail.",
      "criteria": [
        "works at: e-commerce platform, online marketplace, or retail tech company",
        "role: ai/ml engineer, product manager, or vp of engineering",
        "builds: voice shopping, voice search in catalog, or ai customer support",
        "needs: product search by voice, order tracking by phone, customer support automation",
        "company type: shopify apps, e-commerce saas, or d2c brand tech stack",
        "company size: 15-500 employees"
      ],
      "enrichments": ["linkedin", "email", "twitter", "company"]
    }
  }
}
```

## Testing Your Configuration

### Start Small
```json
{
  "leadCount": 10  // Test with 10 leads first
}
```

### Review Results
```bash
npm start

# Check the output:
# 1. Look at ./leads/leads.csv
# 2. Read the generated emails in ./leads/emails.json
# 3. Verify the leads match your criteria
```

### Iterate
- Too broad? Add more specific criteria
- Not enough leads? Broaden criteria or increase leadCount
- Wrong titles/companies? Adjust role and company criteria

## Switching Between Profiles

### Method 1: Edit search-config.json
```json
{
  "activeProfile": "meeting-tools"  // Change this line
}
```

### Method 2: Create Multiple Config Files
```bash
# Create specialized configs
cp search-config.json search-config-healthcare.json
cp search-config.json search-config-fintech.json

# Edit each one with different activeProfile

# Run with specific config (you'd need to modify the script)
```

## Troubleshooting

### "Not enough leads found"
- Increase `leadCount` to 100-200
- Broaden your criteria (remove very specific requirements)
- Check if your target audience exists on the web with public profiles

### "Leads are too generic"
- Add more specific criteria about their work
- Include technology stack or product type requirements
- Add company size or funding stage filters

### "Wrong types of companies"
- Be more explicit about company type in criteria
- Add exclusions: "not at: consultancies, agencies, or enterprises"
- Specify industry more clearly

## Need Help?

Check out the example profiles in `search-config.json` for inspiration. Each profile is production-ready and targets a specific market segment.

Happy hunting! 🎯
