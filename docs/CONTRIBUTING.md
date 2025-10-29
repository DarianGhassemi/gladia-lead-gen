# Contributing to Gladia Lead Generation

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Read the documentation**
   - [README.md](../README.md) - Project overview
   - [.claude/claude.md](../.claude/claude.md) - Codebase organization guide
   - [MONOREPO_STRUCTURE.md](./architecture/MONOREPO_STRUCTURE.md) - Structure details

2. **Set up your development environment**
   ```bash
   git clone https://github.com/DarianGhassemi/gladia-lead-gen.git
   cd gladia-lead-gen
   npm install
   cp docs/guides/.env.example .env
   # Add your API keys to .env
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

## 📋 Development Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

Follow these guidelines:

#### Code Style
- Use ES6+ syntax
- Use functional components (React)
- Add JSDoc comments for functions
- Follow existing naming conventions
- Keep functions small and focused

#### File Organization
- Frontend components → `apps/web/src/components/`
- Backend logic → `apps/api/`
- Shared code → `packages/shared/src/`
- Documentation → `docs/`

#### Example of Good Code
```javascript
/**
 * Validates email configuration
 * @param {Object} config - Email configuration object
 * @param {string} config.type - Email type
 * @param {number} config.maxLength - Maximum email length
 * @returns {boolean} True if valid
 */
function validateEmailConfig(config) {
  const { type, maxLength } = config;

  if (!EmailTypes[type]) {
    throw new Error(`Invalid email type: ${type}`);
  }

  if (maxLength < 100 || maxLength > 1000) {
    throw new Error('Email length must be between 100 and 1000 characters');
  }

  return true;
}
```

### 3. Document Your Changes

#### For New Features
- Update relevant guide in `docs/guides/`
- Add JSDoc comments in code
- Update README if needed

#### For Bug Fixes
- Document the fix in commit message
- Add code comments explaining the issue

#### For Architecture Changes
- Update `docs/architecture/` documentation
- Update `.claude/claude.md` if needed

### 4. Test Your Changes

```bash
# Test frontend
npm run dev:web

# Test backend
npm run dev:api

# Test full integration
npm run dev

# Test CLI commands
npm run generate:cold
```

### 5. Commit Your Changes

Use clear, descriptive commit messages:

```bash
# Good commit messages
git commit -m "Add email template validation"
git commit -m "Fix lead generation rate limiting"
git commit -m "Update search configuration documentation"

# Bad commit messages (avoid these)
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Link to related issues
- Screenshots (if UI changes)

## 🎯 Contribution Areas

### Frontend Improvements
- New UI components
- Better styling
- UX enhancements
- Accessibility improvements

### Backend Enhancements
- New API endpoints
- Better error handling
- Performance optimizations
- Additional integrations

### Documentation
- Improve existing guides
- Add new tutorials
- Fix typos
- Add examples

### Shared Utilities
- Common functions
- Type definitions
- Configuration helpers
- Validation utilities

## 📝 Coding Standards

### JavaScript/JSDoc

```javascript
/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {Error} When error occurs
 */
function myFunction(paramName) {
  // Implementation
}
```

### React Components

```jsx
/**
 * Component description
 * @param {Object} props
 * @param {string} props.title - Title text
 * @param {Function} props.onClick - Click handler
 */
export function MyComponent({ title, onClick }) {
  return (
    <div className="...">
      <h1>{title}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `leadData`, `emailType` |
| Functions | camelCase | `generateEmail`, `fetchLeads` |
| Components | PascalCase | `LeadCard`, `EmailPreview` |
| Constants | SCREAMING_SNAKE_CASE | `API_KEY`, `MAX_RETRIES` |
| Files (JS) | kebab-case | `email-generator.js` |
| Files (Components) | PascalCase | `LeadCard.jsx` |

## 🔍 Code Review Process

Your PR will be reviewed for:

1. **Code Quality**
   - Follows style guidelines
   - Well-documented
   - No unnecessary complexity

2. **Functionality**
   - Works as intended
   - No breaking changes
   - Handles errors gracefully

3. **Documentation**
   - Code comments present
   - User docs updated
   - Examples provided

4. **Testing**
   - Manually tested
   - No console errors
   - Works in development

## ❌ What Not to Do

- ❌ Commit `.env` files
- ❌ Commit `node_modules/`
- ❌ Commit generated `leads/` data
- ❌ Make breaking changes without discussion
- ❌ Skip documentation
- ❌ Use `var` (use `const`/`let`)
- ❌ Create duplicate code
- ❌ Hard-code API keys
- ❌ Submit untested code

## ✅ Best Practices

- ✅ Read `.claude/claude.md` before coding
- ✅ Follow monorepo structure
- ✅ Write clear commit messages
- ✅ Document new features
- ✅ Test thoroughly
- ✅ Keep PRs focused and small
- ✅ Ask questions if unclear
- ✅ Be respectful and patient

## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Description** - What happened?
2. **Expected behavior** - What should happen?
3. **Steps to reproduce** - How to recreate the bug?
4. **Environment** - OS, Node version, etc.
5. **Screenshots** - If applicable

## 💡 Suggesting Features

When suggesting features:

1. **Use case** - Why is this needed?
2. **Description** - What should it do?
3. **Proposed solution** - How might it work?
4. **Alternatives** - Other approaches considered?

## 📞 Getting Help

- Read the [documentation](./README.md)
- Check [existing issues](https://github.com/DarianGhassemi/gladia-lead-gen/issues)
- Review [.claude/claude.md](../.claude/claude.md)
- Ask in discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
