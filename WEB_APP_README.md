# Gladia Lead Generation Web App 🚀

A modern web interface for the Gladia lead generation system with React frontend and Express backend.

## Features

- 🎯 **Custom Search Criteria** - Define your target audience with flexible search queries
- 📊 **Real-time Lead Generation** - Get qualified leads from Exa search
- ✉️ **AI-Powered Email Writing** - Generate personalized emails with Claude AI
- 🎨 **Clean UI** - Modern, responsive interface built with React + Tailwind CSS
- 🔄 **Live Results** - View leads and generated emails instantly

## Quick Start

### 1. Install Dependencies

Make sure you've already run `npm install` in the root directory. If not:

```bash
npm install
cd frontend && npm install
cd ..
```

### 2. Start the App

Run both backend and frontend servers together:

```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend React app on `http://localhost:5173`

### 3. Use the App

1. Open your browser to `http://localhost:5173`
2. Customize your search criteria:
   - Edit the search query
   - Add/remove additional criteria
   - Set number of leads (1-50)
   - Choose email type (Cold Outreach, Follow Up, or Value Add)
3. Click **"Generate Leads"**
4. Review the leads found
5. Click **"Generate Emails"** to create personalized emails
6. Copy and use the generated emails!

## How It Works

### Backend (Express API)

The backend provides three main endpoints:

- `GET /api/profiles` - Get available search profiles
- `POST /api/generate-leads` - Generate leads using Exa search
- `POST /api/generate-emails` - Generate personalized emails with Claude

### Frontend (React)

The frontend provides:
- Search criteria form with dynamic inputs
- Real-time lead results display
- Email generation and display
- Loading states and error handling

## Manual Server Control

If you want to run servers separately:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run frontend
```

## Environment Variables

Make sure your `.env` file has:
```bash
EXA_API_KEY=your-exa-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Architecture

```
gladia-lead-gen/
├── server.js           # Express backend API
├── frontend/           # React frontend app
│   ├── src/
│   │   ├── App.jsx    # Main app component
│   │   └── index.css  # Tailwind styles
│   └── package.json
├── package.json        # Root dependencies & scripts
└── .env               # API keys
```

## Features in Detail

### Search Criteria
- **Query**: Main description of your target audience
- **Criteria**: Additional filters to narrow down results
- **Lead Count**: Number of leads to generate (1-50)
- **Email Type**:
  - Cold Outreach (150-200 words)
  - Follow Up (75-100 words)
  - Value Add (100-150 words, no hard sell)

### Lead Display
Each lead shows:
- Name, title, and company
- Email address (if found)
- Social links (LinkedIn, Twitter, GitHub)
- Summary of their profile

### Email Generation
For each lead, Claude generates:
- Personalized subject line
- Custom email body referencing their work
- Appropriate tone for the email type

## Tips

1. Start with fewer leads (5-10) to test your criteria
2. Review lead quality before generating emails
3. Adjust search criteria based on results
4. Use different email types for different stages of outreach

## Troubleshooting

**"Cannot connect to server"**
- Make sure backend is running on port 3001
- Check that your API keys are set in `.env`

**"No leads found"**
- Try broader search criteria
- Increase lead count
- Check Exa API is working

**Slow email generation**
- This is normal - Claude generates each email individually
- Rate limited to 1 email per second to avoid API limits

## Original CLI Still Works!

The original command-line scripts still work:
```bash
npm start              # Generate leads + emails (CLI)
npm run cold           # Cold outreach emails
npm run followup       # Follow-up emails
```

The web app is just a more user-friendly interface to the same functionality!
