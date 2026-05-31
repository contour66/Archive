# DSCE - Working from Clarity App

**From now on, all work happens in `clarity-app` repo.**

Archive repo is deprecated for DSCE.

---

## Documentation in Clarity App

All these files are in the root of clarity-app:

### Core Documents

**`Dapper_Singh_DSCE_PRD_v2.md`**
- Product Requirements Document
- Full system architecture
- Agent descriptions
- Brand voice guidelines
- **Reference this for all product decisions**

**`DSCE_Apify_Instagram_Research_Technical_Spec.md`**
- Technical implementation details
- Apify integration architecture
- Data schemas
- API endpoints
- **Reference this for all technical implementation**

**`DSCE_Jira_Tickets.md`**
- 16 detailed tickets with acceptance criteria
- Story points, dependencies, subtasks
- **Reference this instead of Jira for now**
- You can manually create tickets in Jira when ready

### Configuration

**`config/tracked-accounts.yaml`**
- 24 Instagram accounts to monitor
- 10 hashtags to track
- Organized by category

**`obsidian-vault/`**
- Complete folder structure for research data
- Templates for viral posts
- README with usage instructions

### Scripts

**`scripts/create-jira-tickets.js`**
- Parked for now (Jira API issues)
- Can revisit later

**`scripts/test-apify.js`**
- Test Apify connection
- Run when ready to test Instagram scraping

### Git Workflow

**`GIT_WORKFLOW.md`**
- Feature branch guidelines
- PR process
- Commit message format
- **Follow this for all development**

---

## Next Steps - Building Features

All development should be on **feature branches** in clarity-app:

### Week 2 Sprint (Reference DSCE_Jira_Tickets.md)

**Priority 1: Core Infrastructure**
```bash
git checkout -b feature/DSCE-13-apify-integration
# Build: lib/apify.ts (scraping functions)
```

**Priority 2: Data Processing**
```bash
git checkout -b feature/DSCE-14-scoring-logic
# Build: lib/scoring.ts (performance filtering)
```

**Priority 3: Storage**
```bash
git checkout -b feature/DSCE-15-obsidian-writer
# Build: lib/obsidian-writer.ts (write to vault)
```

**Priority 4: Orchestration**
```bash
git checkout -b feature/DSCE-16-research-orchestrator
# Build: lib/research-orchestrator.ts (coordinate workflow)
```

**Priority 5: UI**
```bash
git checkout -b feature/DSCE-17-research-tab-ui
# Build: app/research/page.tsx (Research tab)
```

**Priority 6: API**
```bash
git checkout -b feature/DSCE-18-api-endpoints
# Build: app/api/research/* (API routes)
```

---

## How to Track Work

### Option 1: Use the MD File (Simple)
- Open `DSCE_Jira_Tickets.md`
- Check off tickets as you complete them
- Commit changes: `git commit -m "Mark DSCE-13 as complete"`

### Option 2: Manual Jira (When Ready)
- Copy tickets from MD file into Jira manually
- Or fix the auto-creation script later

### Option 3: GitHub Projects
- Create a GitHub Project board
- Import tickets from MD file
- Track progress visually

---

## Environment Setup for Clarity App

Make sure you have `.env.local` in clarity-app:

```bash
# Apify
APIFY_API_TOKEN=apify_api_laNqZz0ttpHT0AzYsNBY1mETiZ5p0V37aX7v
APIFY_USER_ID=5B9AGAs6xmPxtJQPo

# Obsidian
OBSIDIAN_VAULT_PATH=./obsidian-vault

# OpenAI (for AI analysis)
OPENAI_API_KEY=

# Clarity App
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Clean Up Archive Repo

You can:
1. Archive the GitHub repo (Settings → Archive)
2. Or just ignore it - all work is in clarity-app now

---

## Summary

**Work from:** `clarity-app` repo only  
**Reference:** `DSCE_Jira_Tickets.md` for tasks  
**Follow:** `GIT_WORKFLOW.md` for branching  
**Build:** Features on separate branches  
**Deploy:** Merge to main → auto-deploy to Vercel  

**Ready to start building the first feature?**
