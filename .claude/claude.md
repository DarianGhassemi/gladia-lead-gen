# Claude Code - Gladia Lead Generation Codebase Guide

This document provides comprehensive guidelines for working with the Gladia Lead Generation codebase. Follow these instructions to maintain consistency, quality, and scalability.

---

## 📁 Monorepo Structure

This is a **monorepo** using **npm workspaces**. The structure is:

```
gladia-lead-gen/
├── apps/          # Applications (frontend, backend)
├── packages/      # Shared code
├── docs/          # Documentation
└── .claude/       # This file
```

### Key Principles
1. **Apps are independent** - Each app can be deployed separately
2. **Packages are shared** - Extract common code to packages
3. **Documentation is centralized** - All docs live in `docs/`

---

## 🎯 Working with Different Parts of the Codebase

### Frontend (apps/web/)
**Tech Stack**: React + Vite + TailwindCSS

**When working on frontend:**
```bash
cd apps/web
npm run dev  # Start dev server on port 5173
```

**File Organization:**
- `src/` - All source code
- `src/components/` - Reusable React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/` - Static assets

**Styling Guidelines:**
- Use TailwindCSS utility classes
- Create custom components for repeated patterns
- Keep components small and focused
- Use semantic HTML

**Example Component Structure:**
```jsx
// apps/web/src/components/LeadCard.jsx
import React from 'react';

/**
 * Displays a single lead card with company information
 * @param {Object} props
 * @param {Object} props.lead - Lead data object
 */
export function LeadCard({ lead }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold">{lead.company}</h3>
      <p className="text-gray-600">{lead.description}</p>
    </div>
  );
}
```

### Backend (apps/api/)
**Tech Stack**: Node.js + Express + ES Modules

**When working on backend:**
```bash
cd apps/api
npm run dev  # Start Express server on port 3001
```

**File Organization:**
- `server.js` - Express server and API routes
- `gladia-lead-gen.js` - Core lead generation logic
- `regenerate-emails.js` - Email regeneration utility
- `search-config.json` - Search configuration

**API Guidelines:**
- Use RESTful conventions
- Return consistent JSON responses
- Handle errors gracefully
- Add JSDoc comments for all functions

**Example API Endpoint:**
```javascript
// apps/api/server.js

/**
 * Generate leads based on search configuration
 * @route POST /api/leads/generate
 * @param {Object} req.body - Search configuration
 * @returns {Object} Generated leads and emails
 */
app.post('/api/leads/generate', async (req, res) => {
  try {
    const { query, numResults } = req.body;

    // Validate input
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Generate leads
    const leads = await generateLeads(query, numResults);

    res.json({ success: true, leads });
  } catch (error) {
    console.error('Lead generation error:', error);
    res.status(500).json({ error: 'Failed to generate leads' });
  }
});
```

### Shared Package (packages/shared/)
**Tech Stack**: JavaScript ES Modules

**Purpose**: Code shared between frontend and backend

**File Organization:**
- `src/index.js` - Main entry point, exports everything
- `src/types.js` - Type definitions (JSDoc)
- `src/config.js` - Configuration constants
- `src/utils.js` - Utility functions

**When adding shared code:**
1. Export from the appropriate file (`types.js`, `config.js`, etc.)
2. Re-export from `index.js`
3. Import using the package name: `@gladia-lead-gen/shared`

**Example:**
```javascript
// packages/shared/src/types.js
/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} company
 * @property {string} website
 */

// packages/shared/src/index.js
export * from './types.js';
export * from './config.js';

// Usage in apps/api/server.js
import { API_CONFIG } from '@gladia-lead-gen/shared';
```

---

## 📝 Documentation Standards

### When to Document

**ALWAYS document:**
- New features or functionality
- API endpoints
- Configuration options
- Complex algorithms
- Public functions/components

**Document in appropriate location:**
- User-facing features → `docs/guides/`
- Architecture changes → `docs/architecture/`
- Code-level docs → JSDoc comments in code

### Documentation Structure

```
docs/
├── README.md                    # Documentation index
├── guides/                      # User guides
│   ├── QUICKSTART.md
│   ├── SEARCH_CONFIG_GUIDE.md
│   └── ...
├── architecture/                # Technical docs
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── MONOREPO_STRUCTURE.md
│   └── DATA_FLOW.md
└── CONTRIBUTING.md              # How to contribute
```

### Writing Good Documentation

**Structure:**
1. **Title** - Clear, descriptive
2. **Overview** - What this document covers
3. **Prerequisites** - What reader should know
4. **Step-by-step guide** - Numbered or bulleted
5. **Examples** - Code samples
6. **Troubleshooting** - Common issues

**Example:**
```markdown
# Feature Name

## Overview
Brief description of what this feature does.

## Prerequisites
- Node.js 18+
- API keys configured

## Usage

### Step 1: Configure
\`\`\`bash
npm run config
\`\`\`

### Step 2: Run
\`\`\`bash
npm run feature
\`\`\`

## Examples

### Example 1: Basic usage
\`\`\`javascript
import { feature } from './feature.js';
feature({ option: 'value' });
\`\`\`

## Troubleshooting

**Problem**: Feature fails
**Solution**: Check API key in .env
```

---

## 🔧 File Organization Guidelines

### Creating New Files

**Frontend Components:**
- Location: `apps/web/src/components/`
- Naming: PascalCase (e.g., `LeadCard.jsx`)
- One component per file

**Backend Modules:**
- Location: `apps/api/`
- Naming: kebab-case (e.g., `email-generator.js`)
- Group related functionality

**Shared Utilities:**
- Location: `packages/shared/src/`
- Naming: kebab-case (e.g., `string-utils.js`)
- Pure functions, no side effects

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `LeadCard.jsx` |
| JavaScript Modules | kebab-case | `lead-generator.js` |
| Configuration | kebab-case | `search-config.json` |
| Documentation | SCREAMING_SNAKE_CASE | `QUICKSTART.md` |
| Utilities | kebab-case | `date-utils.js` |

### Import Order

Organize imports in this order:
```javascript
// 1. External dependencies
import React from 'react';
import express from 'express';

// 2. Internal packages
import { EmailTypes } from '@gladia-lead-gen/shared';

// 3. Local imports (relative)
import { generateEmail } from './email-generator.js';
import config from './config.json' assert { type: 'json' };

// 4. Styles
import './styles.css';
```

---

## 🎨 Code Style Guidelines

### JavaScript/JSX

**Use modern ES6+ syntax:**
```javascript
// ✅ Good
const leads = await fetchLeads();
const filtered = leads.filter(lead => lead.score > 0.8);

// ❌ Avoid
var leads = await fetchLeads();
var filtered = leads.filter(function(lead) {
  return lead.score > 0.8;
});
```

**Destructure when appropriate:**
```javascript
// ✅ Good
const { company, website, description } = lead;

// ❌ Avoid
const company = lead.company;
const website = lead.website;
const description = lead.description;
```

**Use arrow functions for callbacks:**
```javascript
// ✅ Good
leads.map(lead => generateEmail(lead));

// ❌ Avoid
leads.map(function(lead) {
  return generateEmail(lead);
});
```

### React Components

**Use functional components with hooks:**
```javascript
// ✅ Good
export function LeadList({ leads }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {leads.map(lead => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onClick={() => setSelected(lead)}
        />
      ))}
    </div>
  );
}

// ❌ Avoid class components for new code
class LeadList extends React.Component { ... }
```

### Naming Conventions

**Variables and functions:**
- Use camelCase: `leadGenerator`, `fetchLeads`
- Be descriptive: `emailTemplate` not `temp`
- Boolean variables: prefix with `is`, `has`, `should`
  - `isLoading`, `hasError`, `shouldRetry`

**Constants:**
- Use SCREAMING_SNAKE_CASE: `API_KEY`, `MAX_RETRIES`
- Group related constants in objects:
  ```javascript
  const EMAIL_TYPES = {
    COLD: 'cold_outreach',
    FOLLOW_UP: 'follow_up',
    VALUE: 'value_add'
  };
  ```

**React Components:**
- Use PascalCase: `LeadCard`, `EmailPreview`
- Name files same as component: `LeadCard.jsx`

### Comments and JSDoc

**Use JSDoc for functions:**
```javascript
/**
 * Generates a personalized email for a lead
 * @param {Object} lead - Lead data object
 * @param {string} lead.company - Company name
 * @param {string} lead.website - Company website
 * @param {string} emailType - Type of email (cold_outreach, follow_up, value_add)
 * @returns {Promise<Object>} Generated email object
 * @throws {Error} If API call fails
 */
async function generateEmail(lead, emailType) {
  // Implementation
}
```

**Use inline comments sparingly:**
```javascript
// ✅ Good - explains WHY
// Retry up to 3 times because API occasionally times out
const maxRetries = 3;

// ❌ Bad - explains WHAT (code is self-explanatory)
// Increment i by 1
i++;
```

---

## 🚀 Adding New Features

### Step-by-Step Process

1. **Plan the feature**
   - What problem does it solve?
   - Where does it fit in the architecture?
   - What files need to be changed/created?

2. **Choose the right location**
   - Frontend feature → `apps/web/src/`
   - Backend feature → `apps/api/`
   - Shared code → `packages/shared/src/`

3. **Create necessary files**
   ```bash
   # Example: Adding email templates feature
   mkdir -p packages/email-templates/src
   touch packages/email-templates/package.json
   touch packages/email-templates/src/index.js
   ```

4. **Implement the feature**
   - Write clean, documented code
   - Follow style guidelines
   - Add JSDoc comments

5. **Update imports**
   - Export from package index
   - Import in apps that need it

6. **Document the feature**
   - Add user guide in `docs/guides/`
   - Update architecture docs if needed
   - Add code comments

7. **Test the feature**
   - Manual testing
   - Add automated tests (future)

### Example: Adding a New API Endpoint

```javascript
// 1. Add to apps/api/server.js

/**
 * Archive a lead by ID
 * @route POST /api/leads/:id/archive
 * @param {string} req.params.id - Lead ID
 * @returns {Object} Success status
 */
app.post('/api/leads/:id/archive', async (req, res) => {
  try {
    const { id } = req.params;

    // Read leads
    const leads = await readLeadsFromFile();

    // Find and update lead
    const lead = leads.find(l => l.id === id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.archived = true;
    lead.archivedAt = new Date().toISOString();

    // Save
    await saveLeadsToFile(leads);

    res.json({ success: true, lead });
  } catch (error) {
    console.error('Archive error:', error);
    res.status(500).json({ error: 'Failed to archive lead' });
  }
});

// 2. Document in docs/guides/API_REFERENCE.md

### Archive Lead
\`\`\`
POST /api/leads/:id/archive
\`\`\`

Archives a lead by ID.

**Parameters:**
- `id` (path) - Lead ID

**Response:**
\`\`\`json
{
  "success": true,
  "lead": { ... }
}
\`\`\`
```

---

## 🔍 Common Tasks

### Task: Add a new search filter

**Files to modify:**
- `apps/api/search-config.json` - Add filter definition
- `apps/api/gladia-lead-gen.js` - Implement filter logic
- `apps/web/src/components/SearchForm.jsx` - Add UI control
- `docs/guides/SEARCH_CONFIG_GUIDE.md` - Document filter

### Task: Add a new email type

**Files to modify:**
- `packages/shared/src/types.js` - Add to EmailTypes
- `apps/api/gladia-lead-gen.js` - Add generation logic
- `apps/web/src/components/EmailTypeSelector.jsx` - Add UI option
- `docs/guides/EMAIL_TYPES.md` - Document email type

### Task: Add a new shared utility

**Files to create/modify:**
```bash
# 1. Create utility file
touch packages/shared/src/date-utils.js

# 2. Implement
echo "export function formatDate(date) { ... }" > packages/shared/src/date-utils.js

# 3. Export from index
echo "export * from './date-utils.js';" >> packages/shared/src/index.js

# 4. Use in apps
# apps/api/server.js
import { formatDate } from '@gladia-lead-gen/shared';
```

---

## 🛠️ Development Workflow

### Starting Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp docs/guides/.env.example .env
# Edit .env with your API keys

# 3. Start development servers
npm run dev  # Runs both frontend and backend
```

### Making Changes

```bash
# 1. Create a feature branch (if using git flow)
git checkout -b feature/new-feature

# 2. Make your changes
# - Edit files
# - Add documentation
# - Test changes

# 3. Commit with descriptive message
git add .
git commit -m "Add new feature: description"

# 4. Push changes
git push origin feature/new-feature
```

### Running Individual Apps

```bash
# Frontend only
npm run dev:web

# Backend only
npm run dev:api

# Generate leads (CLI)
cd apps/api && npm run generate
```

---

## ⚠️ Important Guidelines

### DO:
✅ Follow the monorepo structure
✅ Document all new features
✅ Use JSDoc for functions
✅ Keep components small and focused
✅ Extract shared code to packages
✅ Write descriptive commit messages
✅ Handle errors gracefully
✅ Use semantic HTML
✅ Follow naming conventions

### DON'T:
❌ Commit `.env` files
❌ Commit `node_modules/`
❌ Commit `leads/` directory
❌ Create duplicate code (extract to shared)
❌ Use `var` (use `const`/`let`)
❌ Create files in wrong location
❌ Skip documentation
❌ Hard-code API keys
❌ Use class components (use functional)

---

## 📚 Quick Reference

### File Locations
| What | Where |
|------|-------|
| React components | `apps/web/src/components/` |
| API endpoints | `apps/api/server.js` |
| Shared types | `packages/shared/src/types.js` |
| User docs | `docs/guides/` |
| Architecture docs | `docs/architecture/` |
| Config files | Root or app-specific |

### Common Commands
```bash
# Install all dependencies
npm install

# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:web

# Start backend only
npm run dev:api

# Generate leads
cd apps/api && npm run generate

# Format code (if prettier configured)
npm run format
```

### Import Patterns
```javascript
// External packages
import express from 'express';

// Shared package
import { EmailTypes, API_CONFIG } from '@gladia-lead-gen/shared';

// Relative imports
import { generateEmail } from './email-generator.js';
```

---

## 🎓 Learning Resources

### Understanding the Codebase
1. Start with `README.md` at root
2. Read `docs/architecture/SYSTEM_ARCHITECTURE.md`
3. Read `docs/architecture/MONOREPO_STRUCTURE.md`
4. Explore `apps/` to see implementations

### Key Concepts
- **Monorepo**: Multiple packages in one repository
- **Workspaces**: npm feature for managing monorepos
- **ES Modules**: Modern JavaScript module system (`import`/`export`)
- **React**: Frontend framework
- **Express**: Backend framework
- **Vite**: Frontend build tool

---

## 🤝 Contributing

When contributing to this codebase:

1. **Understand before changing** - Read relevant docs
2. **Follow conventions** - Match existing code style
3. **Document your work** - Update or create docs
4. **Test thoroughly** - Verify changes work
5. **Ask questions** - Better to ask than break things

---

## 📞 Getting Help

1. Check `docs/guides/` for user-facing help
2. Check `docs/architecture/` for technical understanding
3. Read code comments and JSDoc
4. Review similar existing implementations
5. Consult this file for organization guidelines

---

**Remember**: This is a living codebase. Keep it organized, documented, and scalable. When in doubt, follow existing patterns and ask for guidance.
