# DSCE - Jira Project Structure & Tickets

**Project Key**: DSCE  
**Project Name**: Dapper Singh Content Engine  
**Created**: 2026-05-31  

---

## Epic Structure

### EPIC-1: Foundation & Setup
**Priority**: Highest  
**Timeline**: Week 1  
**Owner**: Zamir Thind  

### EPIC-2: Research Agent - Instagram
**Priority**: High  
**Timeline**: Week 2  
**Owner**: Claude + Zamir  

### EPIC-3: Campaign Engine
**Priority**: High  
**Timeline**: Week 3  
**Owner**: TBD  

### EPIC-4: Content Agents (Carousel, Email)
**Priority**: Medium  
**Timeline**: Week 4-5  
**Owner**: TBD  

### EPIC-5: QA & Approval System
**Priority**: Medium  
**Timeline**: Week 6  
**Owner**: TBD  

### EPIC-6: Analytics & Optimization
**Priority**: Low  
**Timeline**: Week 7-8  
**Owner**: TBD  

---

## EPIC-2 Tickets: Research Agent - Instagram

### DSCE-10: Set Up Apify Account & Authentication
**Type**: Task  
**Priority**: Highest  
**Story Points**: 2  
**Sprint**: Week 2  

**Description:**
Set up Apify account and configure authentication for Instagram scraping.

**Acceptance Criteria:**
- [ ] Apify account created
- [ ] API token generated and stored securely
- [ ] Token added to `.env.local` (not committed)
- [ ] Token added to Vercel environment variables
- [ ] Test API connection successful

**Subtasks:**
- Sign up for Apify
- Generate API token
- Configure environment variables
- Test connection with simple API call

---

### DSCE-11: Research Apify Instagram Actors & Choose Optimal Setup
**Type**: Research  
**Priority**: Highest  
**Story Points**: 3  
**Sprint**: Week 2  

**Description:**
Evaluate different Apify Instagram actors and determine the most cost-effective setup for our needs.

**Acceptance Criteria:**
- [ ] Test `apify/instagram-hashtag-scraper`
- [ ] Test `apify/instagram-profile-scraper`
- [ ] Test `apify/instagram-post-scraper`
- [ ] Document cost per scrape
- [ ] Document rate limits
- [ ] Choose optimal actor(s) for MVP
- [ ] Create sample scrape of 10 posts

**Testing Hashtags:**
- #mensgrooming
- #nichefragrance
- #californiasurfing

**Testing Accounts:**
- @lelabofragrances
- @tomford
- @aesopskincare

---

### DSCE-12: Create Obsidian Vault Structure for Research Data
**Type**: Task  
**Priority**: High  
**Story Points**: 2  
**Sprint**: Week 2  

**Description:**
Set up Obsidian vault folder structure and markdown templates for storing Instagram research data.

**Acceptance Criteria:**
- [ ] Folder structure created per spec
- [ ] Markdown template created for viral posts
- [ ] Metadata schema defined (YAML frontmatter)
- [ ] Sample post entry created
- [ ] Git initialized in vault
- [ ] `.gitignore` configured (exclude large media)

**Folder Structure:**
```
Vault/Research/Instagram/
├── Daily_Reports/
├── Viral_Posts/
│   ├── fragrance/
│   ├── surf/
│   ├── motorcycles/
│   ├── music/
│   ├── art/
│   ├── travel/
│   └── food/
├── Top_Performers/
└── Content_Patterns/
```

---

### DSCE-13: Build Apify Integration Module (Direct API)
**Type**: Story  
**Priority**: High  
**Story Points**: 5  
**Sprint**: Week 2  

**Description:**
Create TypeScript module for calling Apify Instagram scrapers and retrieving post data.

**Acceptance Criteria:**
- [ ] `lib/apify.ts` created
- [ ] `scrapeHashtag()` function implemented
- [ ] `scrapeProfile()` function implemented
- [ ] `scrapePost()` function implemented
- [ ] Error handling implemented
- [ ] Rate limiting implemented
- [ ] Retry logic for failed requests
- [ ] Unit tests written
- [ ] Integration test with real Apify API

**Dependencies:**
- DSCE-10 (Apify account)
- DSCE-11 (Actor selection)

---

### DSCE-14: Implement Performance Filtering & Scoring Logic
**Type**: Story  
**Priority**: High  
**Story Points**: 5  
**Sprint**: Week 2  

**Description:**
Create filtering and scoring system to identify high-performing posts relevant to Dapper Singh.

**Acceptance Criteria:**
- [ ] Performance scoring formula implemented
  - Views (primary)
  - Engagement rate (secondary)
  - Saves (tertiary)
- [ ] Minimum threshold filters applied
  - Views > 10k
  - Engagement rate > 2%
  - Follower count > 5k
- [ ] Content pillar categorization (AI)
- [ ] Dapper Singh relevance score (0-10)
- [ ] Recreation priority assignment (high/medium/low)
- [ ] Unit tests for scoring logic

**Scoring Formula:**
```typescript
score = (
  (views / 100000) * 0.5 +
  (engagement_rate / 10) * 0.3 +
  (saves / 1000) * 0.2
) * relevance_multiplier
```

---

### DSCE-15: Create Obsidian Writer Module
**Type**: Story  
**Priority**: High  
**Story Points**: 3  
**Sprint**: Week 2  

**Description:**
Build module to write scraped and scored posts to Obsidian vault as markdown files.

**Acceptance Criteria:**
- [ ] `lib/obsidian-writer.ts` created
- [ ] `writeViralPost()` function implemented
- [ ] Markdown template populated with post data
- [ ] YAML frontmatter generated correctly
- [ ] Files organized by category
- [ ] Git commit after each write (optional)
- [ ] Duplicate detection (don't re-save same post)
- [ ] Unit tests written

**File Naming Convention:**
```
{account}_{post_date}.md
Example: lelabo_2026-05-28.md
```

---

### DSCE-16: Build Research Orchestrator (Scan Workflow)
**Type**: Story  
**Priority**: High  
**Story Points**: 5  
**Sprint**: Week 2  

**Description:**
Create orchestrator that coordinates the entire research workflow from scraping to storage.

**Acceptance Criteria:**
- [ ] `lib/research-orchestrator.ts` created
- [ ] Reads tracked accounts from config
- [ ] Reads tracked hashtags from config
- [ ] Calls Apify for each target
- [ ] Filters by performance thresholds
- [ ] Scores posts for relevance
- [ ] Writes to Obsidian
- [ ] Generates daily summary report
- [ ] Error handling & logging
- [ ] Dry-run mode for testing

**Workflow:**
```typescript
async function runResearch() {
  const accounts = await getTrackedAccounts();
  const hashtags = await getTrackedHashtags();
  
  for (const hashtag of hashtags) {
    const posts = await scrapeHashtag(hashtag);
    const filtered = filterByPerformance(posts);
    const scored = scorePosts(filtered);
    await writeTasks(scored);
  }
  
  await generateDailyReport();
}
```

**Dependencies:**
- DSCE-13 (Apify integration)
- DSCE-14 (Scoring logic)
- DSCE-15 (Obsidian writer)

---

### DSCE-17: Create Clarity Research Tab UI
**Type**: Story  
**Priority**: High  
**Story Points**: 8  
**Sprint**: Week 2  

**Description:**
Add new "Research" tab to Clarity app to display viral posts and research insights.

**Acceptance Criteria:**
- [ ] New `/research` route created
- [ ] Dashboard view with stats:
  - Posts discovered this week
  - Top categories
  - Recreation queue count
  - Last scan timestamp
- [ ] Viral posts feed (card grid)
- [ ] Filtering by category, date, score
- [ ] Sorting by views, engagement, saves
- [ ] Post detail modal
- [ ] "Add to Recreation Queue" button
- [ ] Responsive design (mobile + desktop)

**UI Components:**
```typescript
// components/research/Dashboard.tsx
// components/research/PostsFeed.tsx
// components/research/PostCard.tsx
// components/research/PostDetailModal.tsx
// components/research/FilterBar.tsx
```

**Dependencies:**
- Clarity app repo access
- Design system/components from existing Clarity

---

### DSCE-18: Build Research API Endpoints
**Type**: Story  
**Priority**: High  
**Story Points**: 5  
**Sprint**: Week 2  

**Description:**
Create Next.js API routes to serve research data to Clarity frontend.

**Acceptance Criteria:**
- [ ] `GET /api/research/posts` - list posts with filters
- [ ] `GET /api/research/post/:id` - get single post
- [ ] `POST /api/research/scan` - trigger manual scan
- [ ] `POST /api/research/accounts` - add tracked account
- [ ] `GET /api/research/stats` - dashboard metrics
- [ ] `POST /api/research/queue` - add to recreation queue
- [ ] Request validation (Zod schemas)
- [ ] Error handling
- [ ] API documentation (OpenAPI/Swagger)

**Example Response:**
```json
{
  "posts": [
    {
      "id": "ABC123",
      "account": "@lelabofragrances",
      "category": "fragrance",
      "views": 125000,
      "score": 9.2,
      "thumbnail": "url",
      "hook": "The ritual matters more than the scent."
    }
  ],
  "pagination": {
    "page": 1,
    "total": 150
  }
}
```

**Dependencies:**
- DSCE-16 (Orchestrator to generate data)

---

### DSCE-19: Implement Manual Scan Trigger
**Type**: Story  
**Priority**: Medium  
**Story Points**: 3  
**Sprint**: Week 2  

**Description:**
Add "Scan Now" button to Clarity that triggers on-demand Instagram research.

**Acceptance Criteria:**
- [ ] "Scan Now" button in Research tab
- [ ] Calls `POST /api/research/scan`
- [ ] Loading state during scan
- [ ] Progress indicator (optional)
- [ ] Success notification with results count
- [ ] Error handling
- [ ] Rate limiting (max 5 scans/hour)

**UI Flow:**
```
User clicks "Scan Now"
  ↓
Button shows loading spinner
  ↓
API triggers research orchestrator
  ↓
Scan completes (30-60s)
  ↓
Notification: "Found 23 new viral posts"
  ↓
Feed refreshes with new data
```

---

### DSCE-20: Set Up Scheduled Daily Scraping (Vercel Cron)
**Type**: Story  
**Priority**: Medium  
**Story Points**: 3  
**Sprint**: Week 2  

**Description:**
Configure Vercel Cron job to run Instagram research automatically every day at 8 AM PST.

**Acceptance Criteria:**
- [ ] `vercel.json` cron configuration
- [ ] API route `POST /api/cron/daily-research`
- [ ] CRON_SECRET environment variable
- [ ] Secret validation in API route
- [ ] Email notification on completion (optional)
- [ ] Error alerts if scan fails
- [ ] Logging to monitoring service

**Cron Configuration:**
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-research",
      "schedule": "0 8 * * *"
    }
  ]
}
```

**Dependencies:**
- DSCE-16 (Research orchestrator)
- Vercel Pro account (for cron jobs)

---

### DSCE-21: Create Tracked Accounts Configuration
**Type**: Task  
**Priority**: Medium  
**Story Points**: 2  
**Sprint**: Week 2  

**Description:**
Create initial list of Instagram accounts to track based on Brand Vault niches.

**Acceptance Criteria:**
- [ ] `config/tracked-accounts.yaml` created
- [ ] At least 20 accounts added across categories:
  - Fragrance: Le Labo, Tom Ford, Byredo, Aesop
  - Surf: 3-5 accounts
  - Muay Thai: 2-3 accounts
  - Motorcycles: 2-3 accounts
  - Music: 2-3 accounts
  - Art/Design: 2-3 accounts
  - Travel: 2-3 accounts
  - Food/Coffee: 2-3 accounts
- [ ] Each account has category tag
- [ ] Priority level assigned (high/medium/low)

**Format:**
```yaml
accounts:
  - handle: lelabofragrances
    category: fragrance
    priority: high
  - handle: tomford
    category: fragrance
    priority: high
```

**Dependencies:**
- Brand Vault review

---

### DSCE-22: Add Manual Account Input Feature
**Type**: Story  
**Priority**: Low  
**Story Points**: 3  
**Sprint**: Week 2 (if time) or Week 3  

**Description:**
Allow user to manually add Instagram accounts to track via Clarity UI.

**Acceptance Criteria:**
- [ ] "Add Account" button in Research tab
- [ ] Modal with form:
  - Account handle input
  - Category dropdown
  - Priority dropdown
- [ ] Form validation
- [ ] `POST /api/research/accounts` endpoint
- [ ] Writes to `tracked-accounts.yaml`
- [ ] Git commit (optional)
- [ ] Success notification

---

### DSCE-23: Build Daily Research Report Generator
**Type**: Story  
**Priority**: Low  
**Story Points**: 3  
**Sprint**: Week 3  

**Description:**
Generate daily markdown report summarizing research findings.

**Acceptance Criteria:**
- [ ] Report template created
- [ ] Includes:
  - Date
  - Total posts scraped
  - High-priority posts count
  - Top 5 posts by score
  - Categories breakdown
  - Key insights/patterns
- [ ] Saved to `Vault/Research/Instagram/Daily_Reports/`
- [ ] Email sent with summary (optional)

**Sample Report:**
```markdown
# Daily Research Report - 2026-05-31

## Summary
- Posts Scraped: 247
- High Priority: 18
- Medium Priority: 42
- Low Priority: 187

## Top 5 Posts
1. @lelabofragrances - "Ritual over scent" (Score: 9.2)
2. @tomford - "Craftsmanship" (Score: 8.8)
...

## Category Breakdown
- Fragrance: 45 posts
- Surf: 32 posts
...

## Insights
- "Ritual" messaging performs 30% better than product features
- Carousel posts outperform static by 2x
```

---

### DSCE-24: Implement Content Recreation Queue
**Type**: Story  
**Priority**: Medium  
**Story Points**: 5  
**Sprint**: Week 3  

**Description:**
Add ability to queue viral posts for content recreation and integrate with Campaign Agent.

**Acceptance Criteria:**
- [ ] "Add to Queue" button on post cards
- [ ] Recreation queue stored in Obsidian
- [ ] Queue view in Clarity (separate tab or section)
- [ ] "Create Campaign from This" button
- [ ] Pre-fills campaign form with:
  - Hook (adapted)
  - Visual direction
  - Content pillar
  - Target product (suggested)
- [ ] Integration with Campaign Agent (Phase 2)

---

## Testing & Polish

### DSCE-25: End-to-End Testing - Research Workflow
**Type**: Test  
**Priority**: High  
**Story Points**: 3  
**Sprint**: Week 2  

**Description:**
Test complete research workflow from trigger to Clarity display.

**Test Scenarios:**
- [ ] Daily scheduled scan runs successfully
- [ ] Manual scan completes in <60s
- [ ] 100+ posts scraped and filtered
- [ ] At least 10 high-priority posts identified
- [ ] Posts written to Obsidian correctly
- [ ] Posts appear in Clarity Research tab
- [ ] Filtering and sorting work correctly
- [ ] Post detail modal displays all data
- [ ] No Apify errors or rate limit hits

---

### DSCE-26: Documentation - Research Agent Setup Guide
**Type**: Documentation  
**Priority**: Medium  
**Story Points**: 2  
**Sprint**: Week 2  

**Description:**
Create comprehensive setup and usage documentation for Research Agent.

**Acceptance Criteria:**
- [ ] `docs/research-agent-setup.md` created
- [ ] Includes:
  - Apify account setup
  - Environment variables configuration
  - Obsidian vault setup
  - Clarity integration
  - Manual scan instructions
  - Adding tracked accounts
  - Troubleshooting guide
- [ ] Screenshots/diagrams included

---

## Backlog (Week 3+)

### DSCE-27: Migrate to Apify MCP Server
**Type**: Enhancement  
**Priority**: Low  
**Story Points**: 8  

Migrate from direct Apify API calls to custom MCP server for better agent integration.

---

### DSCE-28: Add AI-Powered Content Pattern Analysis
**Type**: Enhancement  
**Priority**: Medium  
**Story Points**: 8  

Use Claude to analyze viral posts and extract reusable content patterns (hook structures, visual styles, narratives).

---

### DSCE-29: Build Recreation Suggestions Engine
**Type**: Enhancement  
**Priority**: Medium  
**Story Points**: 8  

AI agent that generates specific Dapper Singh content ideas based on viral posts.

---

### DSCE-30: Add TikTok & Pinterest Scraping
**Type**: Feature  
**Priority**: Low  
**Story Points**: 8  

Expand research beyond Instagram to TikTok and Pinterest.

---

## Sprint Plan: Week 2

### Must Have (Critical Path)
1. DSCE-10: Apify Setup ✅
2. DSCE-11: Actor Research ✅
3. DSCE-12: Obsidian Structure ✅
4. DSCE-13: Apify Integration ✅
5. DSCE-14: Scoring Logic ✅
6. DSCE-15: Obsidian Writer ✅
7. DSCE-16: Research Orchestrator ✅

### Should Have
8. DSCE-17: Clarity UI ✅
9. DSCE-18: API Endpoints ✅
10. DSCE-19: Manual Scan ✅

### Nice to Have
11. DSCE-20: Scheduled Cron
12. DSCE-21: Tracked Accounts Config
13. DSCE-25: E2E Testing

### Future
- DSCE-22: Manual Account Input
- DSCE-23: Daily Reports
- DSCE-24: Recreation Queue

---

## Velocity Tracking

**Week 2 Target**: 30 story points  
**Estimated Completion**: 60% of Epic-2  

---

## Next Action

**Immediate:**
1. Create Jira project "DSCE"
2. Import these tickets
3. Start DSCE-10 (Apify setup)
4. Locate Clarity app repo
5. Review Brand Vault for tracked accounts

**Questions for Zamir:**
- Do you have Jira account? What's the workspace URL?
- Where is Clarity app repo? Is it private?
- Do you want me to start DSCE-10 now?
