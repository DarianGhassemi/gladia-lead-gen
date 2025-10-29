# 🚀 START HERE - Gladia Lead Generation System

**Welcome!** You have a complete, customizable lead generation system ready to go.

---

## ⚡ Quick Start (Choose Your Path)

### Path 1: "Just Make It Work" (5 min)
1. Add API keys to `.env` (instructions below)
2. Run `npm start`
3. Check `./leads/leads.csv` for results

→ [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for step-by-step

### Path 2: "I Want to Customize First" (10 min)
1. Read [PROFILES_OVERVIEW.md](PROFILES_OVERVIEW.md)
2. Pick your target market profile
3. Edit `search-config.json` (line 2)
4. Add API keys to `.env`
5. Run `npm start`

→ [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for deep customization

---

## 🎯 What This System Does

```
You pick a target market (8 profiles included)
         ↓
System finds 50 qualified leads via Exa API
         ↓
Enriches with email, LinkedIn, Twitter, GitHub
         ↓
Claude AI writes personalized emails for each lead
         ↓
Exports to CSV + JSON
         ↓
Ready to import to CRM & send!
```

**Time:** 2-3 minutes per run
**Cost:** ~$2-5 per 50 leads (API usage)

---

## 📋 Setup Requirements (One-Time)

### 1. API Keys (Required)

You need 2 API keys:

**Exa API** (for finding leads)
- Sign up: https://exa.ai
- Get your key from dashboard
- Add to `.env` file

**Anthropic API** (for writing emails)
- Sign up: https://console.anthropic.com
- Get your key from API Keys section
- Add to `.env` file

**Add keys to `.env`:**
```bash
nano .env  # or use any editor
```

Change:
```bash
EXA_API_KEY=your-exa-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

---

## 🎨 8 Pre-Built Target Markets

Your system includes 8 ready-to-use profiles:

1. **default** - AI Engineers & CTOs (Voice/Speech)
2. **meeting-tools** - Meeting & collaboration platforms
3. **customer-support** - Customer support AI builders
4. **sales-coaching** - Sales intelligence tools
5. **healthcare-tech** - Healthcare documentation
6. **media-podcasting** - Podcast & content platforms
7. **legal-compliance** - Legal tech
8. **education-tech** - EdTech platforms

**Switch profiles:**
```bash
./switch-profile.sh meeting-tools
npm start
```

---

## 📚 Documentation Map

### Getting Started
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start
- **[README.md](README.md)** - Full system documentation

### Customization
- **[SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)** - How to customize search criteria
- **[PROFILES_OVERVIEW.md](PROFILES_OVERVIEW.md)** - All 8 profiles explained
- **[search-config.json](search-config.json)** - Your configuration file

### Quick Reference
- **[package.json](package.json)** - Available npm commands
- **[.env.example](.env.example)** - Environment variables template

---

## 🚀 Run Commands

### Generate Fresh Leads + Emails
```bash
npm start              # Cold outreach (default)
npm run cold           # Cold outreach
npm run followup       # Follow-up emails
npm run value          # Value-add emails (no ask)
```

### Regenerate Emails (Keep Same Leads)
```bash
npm run regen:cold     # New cold emails
npm run regen:followup # New follow-ups
npm run regen:value    # New value emails
```

### Helper Scripts
```bash
./switch-profile.sh meeting-tools  # Switch profiles
```

---

## 📊 What You Get

After running `npm start`:

### Files Created
```
leads/
├── leads.json      # Raw lead data (all fields)
├── leads.csv       # Import to Excel/CRM
└── emails.json     # Generated emails
```

### Console Output
- Progress updates
- 5 sample emails
- File locations

### CSV Contains
- Name, Title, Company
- Email, LinkedIn, Twitter, GitHub
- Summary of their work

---

## 💡 Recommended First Run

### Step 1: Test with Small Batch
Edit `search-config.json`:
```json
{
  "profiles": {
    "default": {
      "leadCount": 10  // Start with just 10
    }
  }
}
```

### Step 2: Run
```bash
npm start
```

### Step 3: Review Quality
```bash
open leads/leads.csv
cat leads/emails.json | head -50
```

### Step 4: Adjust if Needed
- If leads are perfect → increase leadCount to 50
- If leads are off → try different profile or customize criteria
- If emails need work → see [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)

### Step 5: Scale Up
```json
{
  "leadCount": 50  // Or 100, 200...
}
```

---

## 🎯 Common Use Cases

### Use Case 1: Test Multiple Markets
```bash
./switch-profile.sh meeting-tools && npm start
./switch-profile.sh customer-support && npm start
./switch-profile.sh sales-coaching && npm start
# Compare results, pick winner
```

### Use Case 2: Different Email Styles
```bash
npm run cold       # Initial outreach
npm run followup   # For non-responders
npm run value      # Build credibility first
```

### Use Case 3: A/B Testing
```bash
# Generate 2 sets with same profile
npm start  # Set 1
mv leads leads-batch1
npm run regen:followup  # Set 2, different style
# Test which performs better
```

---

## 🆘 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "API key not found"
```bash
cat .env  # Check keys are added
```

### "No leads found"
- Increase `leadCount` to 100-200
- Try different profile
- Broaden search criteria

### "Leads are wrong type"
- Read [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)
- Customize criteria for your ICP
- Try different profile

---

## 🎓 Learning Path

### Beginner (Day 1)
1. ✅ Follow [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
2. ✅ Run with default profile
3. ✅ Review results

### Intermediate (Day 2)
1. ✅ Try all 8 profiles
2. ✅ Compare quality
3. ✅ Test different email types

### Advanced (Week 1)
1. ✅ Read [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)
2. ✅ Create custom profile
3. ✅ Optimize for your ICP
4. ✅ Integrate with CRM/email sender

---

## 📞 What to Do Next

### Immediate (Today)
- [ ] Add API keys to `.env`
- [ ] Run `npm start`
- [ ] Review first batch of leads

### This Week
- [ ] Test different profiles
- [ ] Try different email styles
- [ ] Find best-performing profile
- [ ] Scale up lead count

### This Month
- [ ] Create custom profiles
- [ ] Integrate with email sender
- [ ] Track response rates
- [ ] Iterate based on results

---

## 🎉 Ready to Start?

### Absolute Minimum to Run:
1. Add API keys to `.env`
2. Run `npm start`

That's it! Everything else is already configured.

**Detailed instructions:** [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

---

## 📁 Project Structure
```
gladia-lead-gen/
├── gladia-lead-gen.js         # Main script
├── regenerate-emails.js       # Email regenerator
├── search-config.json         # 8 pre-built profiles (customize here!)
├── switch-profile.sh          # Helper to switch profiles
├── package.json               # npm scripts
├── .env                       # Your API keys (add here!)
│
├── START_HERE.md             # This file
├── SETUP_CHECKLIST.md        # Step-by-step setup
├── QUICKSTART.md             # 5-min guide
├── README.md                 # Full docs
├── SEARCH_CONFIG_GUIDE.md    # Customization guide
├── PROFILES_OVERVIEW.md      # All profiles explained
│
└── leads/                    # Output (created after first run)
    ├── leads.json
    ├── leads.csv
    └── emails.json
```

---

**Questions? Check the docs above or just run it and see what happens! 🚀**

**Most important:** Add your API keys to `.env`, then run `npm start`.

**Everything else is optional.**
