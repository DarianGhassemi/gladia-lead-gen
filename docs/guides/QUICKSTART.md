# Quick Start Guide ⚡

Get your Gladia lead generation system running in 5 minutes!

## Step 1: Install (1 min)

```bash
cd ~/gladia-lead-gen
npm install
```

## Step 2: Add API Keys (2 min)

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your keys
nano .env  # or use your favorite editor
```

Your `.env` should look like:
```bash
EXA_API_KEY=your-actual-exa-key
ANTHROPIC_API_KEY=your-actual-anthropic-key
```

**Get API Keys:**
- Exa: https://exa.ai
- Anthropic: https://console.anthropic.com

## Step 3: Choose Target Market (1 min)

Edit `search-config.json` and change the `activeProfile`:

```json
{
  "activeProfile": "meeting-tools"  // Pick any profile
}
```

**Available profiles:**
- `default` - AI Engineers (voice/speech focus)
- `meeting-tools` - Meeting & collaboration platforms
- `customer-support` - Customer support AI builders
- `sales-coaching` - Sales intelligence tools
- `healthcare-tech` - Healthcare documentation
- `media-podcasting` - Podcast & content platforms
- `legal-compliance` - Legal tech
- `education-tech` - EdTech platforms

## Step 4: Run! (1 min)

```bash
npm start
```

**What happens:**
1. ✅ Finds 50 qualified leads based on your profile
2. ✅ Enriches with email, LinkedIn, Twitter, GitHub
3. ✅ Generates personalized cold emails
4. ✅ Saves everything to `./leads/` folder
5. ✅ Shows you 5 sample emails

## Step 5: Review Results

```bash
# Open the CSV in Excel/Sheets
open leads/leads.csv

# Check the generated emails
cat leads/emails.json | head -50
```

---

## Next Steps

### Try Different Email Styles

```bash
npm run followup    # Short follow-up emails
npm run value       # Value-add emails (no ask)
```

### Target Different Markets

Edit `search-config.json` → change `activeProfile` → run again

### Customize Search Criteria

See [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md) for detailed instructions

### Adjust Lead Count

Edit `search-config.json`:
```json
{
  "profiles": {
    "default": {
      "leadCount": 100  // Get more leads
    }
  }
}
```

---

## Troubleshooting

**"Cannot find module"**
```bash
npm install
```

**"API key not found"**
```bash
cat .env  # Check if keys are set
```

**"No leads found"**
- Increase `leadCount` to 100-200
- Try a different profile
- Broaden criteria in your profile

---

## Quick Commands Reference

```bash
npm start              # Generate leads + cold emails
npm run followup       # Generate leads + follow-ups
npm run value          # Generate leads + value emails

npm run regen:cold     # Regenerate cold emails (existing leads)
npm run regen:followup # Regenerate follow-ups (existing leads)
npm run regen:value    # Regenerate value emails (existing leads)
```

---

**That's it! You're ready to generate leads. 🚀**

For advanced customization, see [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)
