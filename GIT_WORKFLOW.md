# Git Workflow & Development Guidelines

## Branch Strategy

### Main Branches
- `main` - Production-ready code only
- `develop` - Integration branch for features (optional)

### Feature Branches
**ALL development work MUST be done on feature branches.**

**Naming Convention:**
```
feature/[ticket-number]-[short-description]
```

**Examples:**
- `feature/DSCE-13-apify-integration`
- `feature/DSCE-17-research-tab-ui`
- `feature/DSCE-18-api-endpoints`

---

## Workflow Steps

### 1. Start New Feature

```bash
# Pull latest main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/DSCE-13-apify-integration

# Work on your feature
# ... make changes ...

# Commit frequently
git add .
git commit -m "Add Apify hashtag scraper function"
```

### 2. Push Feature Branch

```bash
# Push to remote
git push -u origin feature/DSCE-13-apify-integration
```

### 3. Create Pull Request

```bash
# Use GitHub CLI (recommended)
gh pr create --title "DSCE-13: Build Apify Integration Module" \
  --body "Implements scrapeHashtag(), scrapeProfile(), and scrapePost() functions with error handling and rate limiting." \
  --base main

# Or manually on GitHub:
# https://github.com/contour66/clarity-app/compare
```

### 4. Code Review & Merge

- Wait for CI checks to pass
- Review changes
- Merge PR to main
- Delete feature branch

```bash
# After merge, clean up
git checkout main
git pull origin main
git branch -d feature/DSCE-13-apify-integration
```

---

## Commit Message Format

```
[TICKET-ID]: Brief description (50 chars max)

Optional longer description explaining:
- What changed
- Why it changed
- Any breaking changes

https://claude.ai/code/session_[SESSION_ID]
```

**Examples:**

Good ✅
```
DSCE-13: Add Apify Instagram hashtag scraper

Implements scrapeHashtag() function with retry logic and 
rate limiting. Handles Instagram API responses and maps 
to our internal post schema.
```

Bad ❌
```
updated stuff
```

---

## Pull Request Guidelines

### PR Title Format
```
[TICKET-ID]: Brief description
```

### PR Description Template
```markdown
## Summary
Brief description of changes

## Ticket
[DSCE-XX](https://dappersingh.atlassian.net/browse/DSCE-XX)

## Changes
- Added X
- Updated Y
- Fixed Z

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manually tested in dev environment

## Screenshots (if UI changes)
[Add screenshots]

## Deployment Notes
Any special deployment considerations
```

---

## Branch Protection Rules

**Main branch:**
- ✅ Require pull request reviews (1 approval minimum)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ No direct pushes to main
- ✅ No force pushes

**To set up:**
1. Go to: Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable protection rules above

---

## Never Do This ❌

```bash
# DON'T push features directly to main
git checkout main
git add feature-code.js
git commit -m "add feature"
git push origin main  # ❌ WRONG!

# DON'T work on main branch
git checkout main
# ... make changes ...  # ❌ WRONG!

# DON'T force push to main
git push --force origin main  # ❌ WRONG!
```

---

## Always Do This ✅

```bash
# ✅ Create feature branch
git checkout -b feature/DSCE-XX-description

# ✅ Work on feature branch
# ... make changes ...

# ✅ Commit with descriptive messages
git commit -m "DSCE-XX: Descriptive message"

# ✅ Push feature branch
git push -u origin feature/DSCE-XX-description

# ✅ Create PR for review
gh pr create --base main

# ✅ Merge via PR after approval
```

---

## CI/CD Pipeline

### GitHub Actions Workflows

All workflows run on:
- Push to any branch
- Pull request to main

**Required Checks:**
1. **Lint** - ESLint must pass
2. **Type Check** - TypeScript compilation
3. **Tests** - All unit/integration tests
4. **Build** - Production build succeeds

**Auto-Deploy:**
- `main` branch → Production (Vercel)
- Feature branches → Preview deployments

---

## Environment Variables

**Never commit:**
- `.env.local`
- `.env.*.local`
- Any file with secrets/tokens

**Always use:**
- Environment variables
- Vercel environment settings
- GitHub Secrets for CI/CD

---

## Code Review Checklist

Before approving a PR, verify:
- [ ] Code follows style guidelines
- [ ] Tests are included and pass
- [ ] No secrets committed
- [ ] Documentation updated
- [ ] Jira ticket linked
- [ ] Breaking changes documented
- [ ] Performance implications considered

---

## Quick Reference

```bash
# Start new feature
git checkout main && git pull
git checkout -b feature/DSCE-XX-name

# Save progress
git add .
git commit -m "DSCE-XX: Progress description"

# Push for first time
git push -u origin feature/DSCE-XX-name

# Push subsequent changes
git push

# Create PR
gh pr create --base main

# Update branch with latest main
git checkout main && git pull
git checkout feature/DSCE-XX-name
git merge main

# Clean up after merge
git checkout main && git pull
git branch -d feature/DSCE-XX-name
git remote prune origin
```

---

## Questions?

See: [CONTRIBUTING.md](./CONTRIBUTING.md)  
Jira: https://dappersingh.atlassian.net/  
Claude Session: Link in commit messages
