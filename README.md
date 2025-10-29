# Gladia Lead Generation System

> AI-powered lead generation and personalized email creation using Exa search and Claude AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## 🎯 Overview

The Gladia Lead Generation System is a comprehensive monorepo application that automates lead discovery and personalized email generation. It combines powerful AI models with an intuitive web interface to streamline your outreach process.

### Key Features

- 🔍 **Intelligent Lead Discovery** - Powered by Exa's web search API
- ✉️ **AI-Generated Emails** - Personalized outreach using Claude AI
- 🎨 **Modern Web Interface** - React + Vite + TailwindCSS
- 📊 **Multiple Email Types** - Cold outreach, follow-ups, and value-add emails
- 🏗️ **Monorepo Architecture** - Scalable and maintainable structure
- 🚀 **Easy Deployment** - Vercel-ready frontend, flexible backend hosting

## 📁 Project Structure

This is a **monorepo** managed with **npm workspaces**:

```
gladia-lead-gen/
├── apps/
│   ├── web/                    # React frontend (Vite + TailwindCSS)
│   └── api/                    # Node.js backend (Express)
├── packages/
│   └── shared/                 # Shared utilities and types
├── docs/                       # Comprehensive documentation
│   ├── guides/                 # User guides
│   └── architecture/           # Technical documentation
└── .claude/                    # AI assistant guidelines
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- API keys:
  - [Anthropic Claude API](https://console.anthropic.com/)
  - [Exa API](https://exa.ai/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DarianGhassemi/gladia-lead-gen.git
cd gladia-lead-gen

# 2. Install dependencies (for all workspaces)
npm install

# 3. Set up environment variables
cp docs/guides/.env.example .env
# Edit .env and add your API keys:
# ANTHROPIC_API_KEY=your_key_here
# EXA_API_KEY=your_key_here

# 4. Start development servers
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

### Getting Started
- [📖 Quick Start Guide](./docs/guides/QUICKSTART.md)
- [✅ Setup Checklist](./docs/guides/SETUP_CHECKLIST.md)
- [🎓 Start Here](./docs/guides/START_HERE.md)

### User Guides
- [🔍 Search Configuration](./docs/guides/SEARCH_CONFIG_GUIDE.md)
- [👤 Profiles Overview](./docs/guides/PROFILES_OVERVIEW.md)
- [🌐 Web App Guide](./docs/guides/WEB_APP_README.md)

### Technical Documentation
- [🏗️ System Architecture](./docs/architecture/SYSTEM_ARCHITECTURE.md)
- [📁 Monorepo Structure](./docs/architecture/MONOREPO_STRUCTURE.md)
- [🤖 Claude Code Guide](./.claude/claude.md)

## 💻 Development

### Running Individual Apps

```bash
# Frontend only
npm run dev:web

# Backend only
npm run dev:api

# Both together
npm run dev
```

### Generate Leads (CLI)

```bash
# Generate leads with cold outreach emails
npm run generate:cold

# Generate follow-up emails
npm run generate:followup

# Generate value-add emails
npm run generate:value
```

### Available Scripts

```bash
npm run dev              # Run both frontend and backend
npm run dev:web          # Run frontend only
npm run dev:api          # Run backend only
npm run build            # Build all workspaces
npm run build:web        # Build frontend for production
npm run generate         # Generate leads (default: cold outreach)
npm run clean            # Remove all node_modules
npm run clean:builds     # Remove all build outputs
```

## 🏗️ Architecture

### Frontend (`apps/web`)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Features**: Lead search, email preview, configuration management

### Backend (`apps/api`)
- **Runtime**: Node.js
- **Framework**: Express
- **APIs**: Exa (search), Claude (email generation)
- **Storage**: JSON/CSV files

### Shared (`packages/shared`)
- Type definitions (JSDoc)
- Shared constants
- Common utilities

## 🚀 Deployment

### Frontend (Vercel)

The frontend is configured for Vercel deployment:

```bash
# Vercel will automatically:
# 1. Detect the monorepo structure
# 2. Build from apps/web
# 3. Deploy the static site
```

Configuration: [`vercel.json`](./vercel.json)

### Backend

The backend can be deployed to:
- **Vercel Serverless Functions**
- **AWS Lambda**
- **Google Cloud Run**
- **Traditional Node.js hosting**

## 🔐 Environment Variables

Required environment variables (create `.env` in root):

```env
# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Exa API
EXA_API_KEY=your_exa_api_key

# Optional: Server configuration
PORT=3001
HOST=localhost
```

See [`.env.example`](./docs/guides/.env.example) for a complete template.

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Modern ES6+

### Backend
- Node.js 18+
- Express
- ES Modules
- Claude AI SDK
- Exa JavaScript SDK

### Development
- npm workspaces
- Concurrently (parallel scripts)
- Git for version control

## 📦 Monorepo Structure

This project uses **npm workspaces** for monorepo management:

- **Benefits**:
  - Shared dependencies
  - Easy cross-package imports
  - Consistent versioning
  - Simplified development

- **Workspaces**:
  - `apps/*` - Applications
  - `packages/*` - Shared packages

Learn more: [Monorepo Structure Guide](./docs/architecture/MONOREPO_STRUCTURE.md)

## 🤝 Contributing

We welcome contributions! Please see our guidelines:

1. Read the [Claude Code Guide](./.claude/claude.md) for codebase organization
2. Follow the existing code style and structure
3. Document your changes
4. Test thoroughly before submitting

### Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature

# 2. Make your changes
# - Follow the monorepo structure
# - Add documentation
# - Update relevant guides

# 3. Test your changes
npm run dev

# 4. Commit with descriptive message
git commit -m "Add feature: description"

# 5. Push and create PR
git push origin feature/your-feature
```

## 📖 Learn More

### Understanding the Codebase
1. Start with this README
2. Review [System Architecture](./docs/architecture/SYSTEM_ARCHITECTURE.md)
3. Explore [Monorepo Structure](./docs/architecture/MONOREPO_STRUCTURE.md)
4. Read [Claude Code Guide](./.claude/claude.md) for development guidelines

### Key Concepts
- **Monorepo**: Multiple related packages in one repository
- **Workspaces**: npm feature for managing monorepos
- **AI Integration**: Using Claude and Exa APIs for intelligent lead generation
- **Full-Stack**: React frontend + Node.js backend

## 🐛 Troubleshooting

### Common Issues

**Problem**: `npm install` fails
- **Solution**: Ensure Node.js 18+ and npm 9+ are installed

**Problem**: API requests fail
- **Solution**: Check `.env` file has valid API keys

**Problem**: Frontend can't connect to backend
- **Solution**: Ensure backend is running on port 3001

**Problem**: Build fails on Vercel
- **Solution**: Check `vercel.json` configuration

More help: [Guides Documentation](./docs/guides/)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 👤 Author

**Darian Ghassemi**
- GitHub: [@DarianGhassemi](https://github.com/DarianGhassemi)

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com/) - Claude AI
- [Exa](https://exa.ai/) - Web search API
- [Vercel](https://vercel.com/) - Deployment platform

---

**Built with ❤️ using AI assistance from Claude Code**

For detailed documentation, see [`docs/README.md`](./docs/README.md)
