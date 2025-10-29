# System Architecture

## 🎯 Overview

The Gladia Lead Generation system is a full-stack application that combines AI-powered lead generation with an intuitive web interface.

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Layer                            │
│                   (Web Browser / CLI)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│                     apps/web/                                │
│  • Vite + React + TailwindCSS                               │
│  • Lead search interface                                     │
│  • Email preview and management                              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (Express)                      │
│                      apps/api/                               │
│  • REST API endpoints                                        │
│  • Lead generation orchestration                             │
│  • Email generation                                          │
└────┬──────────────────┬────────────────────┬────────────────┘
     │                  │                    │
     ▼                  ▼                    ▼
┌─────────┐      ┌──────────┐        ┌────────────┐
│  Exa    │      │ Claude   │        │   File     │
│  API    │      │   AI     │        │  Storage   │
│         │      │          │        │ (JSON/CSV) │
└─────────┘      └──────────┘        └────────────┘
```

## 🔧 Core Components

### 1. Frontend (apps/web)
**Technology**: React + Vite + TailwindCSS

**Responsibilities**:
- User interface for lead search
- Email preview and management
- Configuration management
- Real-time updates

**Key Files**:
- `src/App.jsx` - Main application component
- `src/main.jsx` - Application entry point

### 2. Backend API (apps/api)
**Technology**: Node.js + Express

**Responsibilities**:
- REST API for lead operations
- Integration with Exa API for web search
- Integration with Claude AI for email generation
- Data persistence (JSON/CSV)

**Key Files**:
- `server.js` - Express server and API endpoints
- `gladia-lead-gen.js` - Lead generation core logic
- `regenerate-emails.js` - Email regeneration utility
- `search-config.json` - Search configuration

### 3. Shared Package (packages/shared)
**Technology**: JavaScript ES Modules

**Responsibilities**:
- Type definitions (JSDoc)
- Shared constants
- Common utilities

**Key Files**:
- `src/types.js` - Shared type definitions
- `src/config.js` - Configuration constants

## 🔄 Data Flow

### Lead Generation Flow

```
1. User configures search
   └─> Frontend sends search params to API

2. API processes request
   ├─> Calls Exa API with search config
   └─> Receives company/website data

3. Lead enrichment
   ├─> Exa returns detailed results
   └─> API structures data as leads

4. Email generation
   ├─> API sends lead context to Claude AI
   ├─> Claude generates personalized email
   └─> API saves email to storage

5. Response to user
   ├─> API returns leads + emails
   └─> Frontend displays results
```

### Email Regeneration Flow

```
1. User requests email regeneration
   └─> Frontend sends lead ID to API

2. API retrieves lead data
   └─> Reads from JSON storage

3. API calls Claude AI
   ├─> Provides lead context
   └─> Requests new email variation

4. Save and return
   ├─> API updates email in storage
   └─> Frontend displays new email
```

## 🗄️ Data Storage

### Current Implementation
- **Format**: JSON files and CSV exports
- **Location**: `leads/` directory (gitignored)
- **Structure**:
  - `leads/leads.json` - Lead data
  - `leads/emails.json` - Generated emails
  - `leads/leads.csv` - CSV export

### Scalability Path
For production, consider migrating to:
- PostgreSQL for relational data
- Redis for caching
- S3 for file storage

## 🔐 Security Considerations

1. **API Keys**: Stored in `.env` (never committed)
2. **CORS**: Configured in Express server
3. **Input Validation**: Required for all API endpoints
4. **Rate Limiting**: Should be added for production

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── Frontend: http://localhost:5173 (Vite dev server)
└── Backend: http://localhost:3001 (Node server)
```

### Production
```
Frontend: Vercel (Static hosting)
    │
    ├─> API: Vercel Serverless Functions / Cloud Provider
    │
    └─> External Services:
        ├─> Exa API
        └─> Claude AI API
```

## 📊 Performance Considerations

1. **Caching**: Consider caching Exa API responses
2. **Rate Limits**: Respect API rate limits (Exa, Claude)
3. **Batch Processing**: Process multiple leads efficiently
4. **Progressive Loading**: Load lead results incrementally

## 🔮 Future Enhancements

1. **Real-time Updates**: WebSocket for live progress
2. **Background Jobs**: Queue system for long-running tasks
3. **Analytics**: Track email performance
4. **Multi-tenancy**: Support multiple users/teams
5. **Mobile App**: Native mobile applications
