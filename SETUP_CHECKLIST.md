# Setup Checklist ✅

Follow this checklist to get your system running.

---

## Prerequisites

- [ ] Node.js installed (v16 or higher)
- [ ] Terminal access
- [ ] Text editor (VS Code, nano, vim, etc.)

Check Node.js version:
```bash
node --version  # Should be v16+
```

---

## Setup Steps

### 1. ✅ Dependencies Installed
```bash
cd ~/gladia-lead-gen
npm install
```

**Status:** ✅ Already done! (44 packages installed)

---

### 2. ⚠️ Add Your API Keys

#### Get Your Keys:

**Exa API Key:**
1. Go to https://exa.ai
2. Sign up or log in
3. Navigate to API Keys section
4. Copy your API key

**Anthropic API Key:**
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Go to API Keys
4. Create new key or copy existing
5. Copy your API key

#### Add Keys to .env:

```bash
nano .env
# or
code .env
# or
vim .env
```

Replace these lines:
```bash
EXA_API_KEY=your-exa-api-key-here          # ← Replace this
ANTHROPIC_API_KEY=your-anthropic-api-key-here  # ← Replace this
```

With your actual keys:
```bash
EXA_API_KEY=exa_1234567890abcdef
ANTHROPIC_API_KEY=sk-ant-1234567890abcdef
```

**Status:** ⚠️ **ACTION REQUIRED** - Add your API keys now

---

### 3. ✅ Choose Search Profile

Edit `search-config.json` (line 2):

```bash
nano search-config.json
```

Change the `activeProfile`:
```json
{
  "activeProfile": "default"  // ← Change this to any profile
}
```

**Available profiles:**
- `default` - AI Engineers & CTOs (Voice/Speech)
- `meeting-tools` - Meeting platforms
- `customer-support` - Support AI builders
- `sales-coaching` - Sales intelligence
- `healthcare-tech` - Healthcare docs
- `media-podcasting` - Podcast platforms
- `legal-compliance` - Legal tech
- `education-tech` - EdTech

**Or use the helper script:**
```bash
./switch-profile.sh meeting-tools
```

**Status:** ✅ Default profile ready (you can change anytime)

---

### 4. Optional: Test with Small Batch

Before generating 50 leads, test with 10:

Edit `search-config.json` and change your profile's leadCount:
```json
{
  "profiles": {
    "default": {
      "leadCount": 10,  // ← Change from 50 to 10
      ...
    }
  }
}
```

**Status:** ⚠️ Optional but recommended for first run

---

## Ready to Run!

Once you've added API keys, run:

```bash
npm start
```

**Expected output:**
1. ✅ Loads your search profile
2. ✅ Searches for leads (takes 30-60 seconds)
3. ✅ Enriches with contact info
4. ✅ Generates personalized emails (1 second per lead)
5. ✅ Saves to `./leads/` folder
6. ✅ Shows 5 sample emails in terminal

---

## Verification Checklist

After running, verify:

- [ ] `./leads/leads.json` exists with lead data
- [ ] `./leads/leads.csv` opens in Excel/Sheets
- [ ] `./leads/emails.json` has generated emails
- [ ] Terminal shows 5 sample emails
- [ ] Lead quality looks good (check names, companies, titles)
- [ ] Emails are personalized (not generic templates)

---

## If Something Goes Wrong

### "Cannot find module"
```bash
npm install
```

### "API key not found" or "Unauthorized"
- Check `.env` file has correct keys
- No quotes needed around keys
- No spaces before/after keys
- Keys should start with correct prefix:
  - Exa: typically starts with `exa_`
  - Anthropic: typically starts with `sk-ant-`

### "No leads found"
- Increase `leadCount` to 100-200
- Try a different profile: `./switch-profile.sh meeting-tools`
- Broaden criteria in `search-config.json`

### "Rate limit exceeded"
- Wait a few minutes
- Reduce `leadCount` to 25
- Check your API tier/credits

---

## Next Steps After Setup

### 1. Review Your Leads
```bash
open leads/leads.csv  # or 'xdg-open' on Linux
```

### 2. Check Email Quality
```bash
cat leads/emails.json | head -100
```

### 3. Try Different Email Types
```bash
npm run followup    # Follow-up style
npm run value       # Value-add style
```

### 4. Switch Profiles
```bash
./switch-profile.sh healthcare-tech
npm start
```

### 5. Customize Your Own Profile
See [SEARCH_CONFIG_GUIDE.md](SEARCH_CONFIG_GUIDE.md)

---

## Quick Reference

### Common Commands
```bash
npm start              # Generate leads + emails
npm run followup       # Follow-up emails
npm run value          # Value-add emails

npm run regen:cold     # Regenerate cold emails
npm run regen:followup # Regenerate follow-ups

./switch-profile.sh <name>  # Switch profiles
```

### Key Files
- `search-config.json` - Your search profiles
- `.env` - Your API keys (never commit!)
- `leads/` - Output directory
- `SEARCH_CONFIG_GUIDE.md` - Customization guide

---

## Ready?

1. ✅ Dependencies installed
2. ⚠️ **Add API keys to `.env`** ← Do this now!
3. ✅ Profile selected
4. ⚠️ Optional: Set leadCount to 10 for test

**Then run:**
```bash
npm start
```

🚀 **You've got this!**
