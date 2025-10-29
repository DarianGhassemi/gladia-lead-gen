# Monorepo Structure

This project uses a monorepo architecture powered by npm workspaces for better code organization, sharing, and scalability.

## 📁 Directory Structure

```
gladia-lead-gen/
├── apps/
│   ├── web/                    # React frontend application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── api/                    # Node.js backend API
│       ├── server.js           # Express server
│       ├── gladia-lead-gen.js  # Lead generation logic
│       ├── regenerate-emails.js
│       ├── search-config.json
│       └── package.json
│
├── packages/
│   └── shared/                 # Shared utilities and types
│       ├── src/
│       │   ├── index.js
│       │   ├── types.js       # Shared type definitions
│       │   └── config.js      # Shared constants
│       └── package.json
│
├── docs/
│   ├── guides/                 # User guides and tutorials
│   ├── architecture/           # Architecture documentation
│   └── README.md
│
├── .claude/
│   └── claude.md              # AI assistant guidelines
│
├── package.json               # Root package.json with workspaces
├── .gitignore
└── README.md
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **apps/**: User-facing applications with specific purposes
- **packages/**: Reusable code shared across applications
- **docs/**: All documentation in one place

### 2. **Workspace Benefits**
- Shared dependencies managed at root level
- Easy cross-package imports
- Consistent versioning
- Simplified development workflow

### 3. **Scalability**
- Add new apps easily: `apps/mobile/`, `apps/cli/`
- Create new packages: `packages/email-templates/`, `packages/analytics/`
- Independent deployment of apps

## 📦 Package Naming Convention

All packages follow the scoped naming pattern:
- `@gladia-lead-gen/api`
- `@gladia-lead-gen/web`
- `@gladia-lead-gen/shared`

## 🔄 Import Patterns

### From apps to packages:
```javascript
// In apps/api/server.js
import { EmailTypes, API_CONFIG } from '@gladia-lead-gen/shared';
```

### Between packages:
```javascript
// In packages/email-templates/src/index.js
import { EmailTypes } from '@gladia-lead-gen/shared';
```

## 🚀 Running Applications

```bash
# Install all dependencies
npm install

# Run frontend
npm run dev:web

# Run backend
npm run dev:api

# Run both together
npm run dev
```

## ➕ Adding New Apps

1. Create directory: `apps/new-app/`
2. Add `package.json` with name `@gladia-lead-gen/new-app`
3. Root `package.json` automatically includes it via `"workspaces": ["apps/*"]`

## ➕ Adding New Packages

1. Create directory: `packages/new-package/`
2. Add `package.json` with name `@gladia-lead-gen/new-package`
3. Export main functionality from `src/index.js`
4. Other apps can import: `import { something } from '@gladia-lead-gen/new-package'`

## 📝 Best Practices

1. **Keep apps independent** - Each app should be deployable separately
2. **Share common code** - Extract reusable logic to packages
3. **Document exports** - Use JSDoc for shared package functions
4. **Version together** - All packages share the same version for consistency
5. **Test independently** - Each package/app has its own tests
