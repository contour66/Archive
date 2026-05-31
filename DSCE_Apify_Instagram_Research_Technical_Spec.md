# DSCE - Apify Instagram Research Agent
## Technical Implementation Specification

**Version**: 1.0  
**Date**: 2026-05-31  
**Status**: Planning  
**Owner**: Zamir Thind  

---

## Overview

Automated Instagram research system that discovers high-performing content in Dapper Singh's niches, stores findings in Obsidian, and surfaces them in the Clarity app for content recreation.

---

## Architecture

```text
Scheduled Trigger (Daily) / Manual Trigger (On-demand)
                    ↓
            Research Orchestrator
                    ↓
            Apify Instagram Scraper
                    ↓
        Performance Filter & Scoring
                    ↓
            Data Transformation
                    ↓
        Obsidian Vault (Markdown)
                    ↓
        Clarity App (Research Tab)
                    ↓
    Content Recreation Suggestions
```

---

## Apify Configuration

### Apify Actors to Evaluate (Cost vs Results)

1. **Instagram Profile Scraper** (`apify/instagram-profile-scraper`)
   - Use case: Monitor specific competitor accounts
   - Cost: ~$0.01 per profile
   - Rate limits: 200 profiles/day (free tier)

2. **Instagram Hashtag Scraper** (`apify/instagram-hashtag-scraper`)
   - Use case: Discover trending content by hashtag
   - Cost: ~$0.02 per hashtag search
   - Rate limits: 100 searches/day (free tier)

3. **Instagram Post Scraper** (`apify/instagram-post-scraper`)
   - Use case: Deep dive into individual posts
   - Cost: ~$0.005 per post
   - Rate limits: 500 posts/day (free tier)

**Recommended Minimal Approach:**
- Start with **Instagram Hashtag Scraper** (broadest discovery)
- Add **Profile Scraper** for top competitors
- Use **Post Scraper** only for deep analysis of top performers

### Authentication
- Apify API Token: `APIFY_API_TOKEN` (environment variable)
- Store in: `.env.local` (not committed to git)
- Backup in: Vercel environment variables (production)

---

## Target Niches & Accounts

### Brand Categories (from Brand Vault)

#### Fragrance & Grooming
- Le Labo
- Tom Ford
- Byredo
- Aesop
- DS & Durga
- Malin+Goetz

#### Surf Culture
- Surfer accounts
- California surf brands
- Ocean lifestyle

#### Muay Thai / Fitness
- Muay Thai gyms
- Fighters
- Training content

#### Motorcycles
- Vintage motorcycles
- Custom builds
- Riding culture

#### Music
- Jazz
- Vinyl culture
- Music venues

#### Art & Design
- Architecture
- Craftsmanship
- Minimalist design

#### Travel
- California travel
- Luxury hotels
- Boutique stays

#### Food & Coffee
- Specialty coffee
- Fine dining
- California cuisine

### Manual Account Input
- Clarity UI should have "Add Account" feature
- Stored in: `Obsidian/Vault/Competitors/tracked_accounts.md`
- Format:
```yaml
accounts:
  - handle: lelabofragrances
    category: fragrance
    priority: high
    added_date: 2026-05-31
```

---

## Data Extraction Schema

### Post Metadata
```json
{
  "post_id": "string",
  "account_handle": "string",
  "account_name": "string",
  "follower_count": "number",
  "post_type": "carousel | reel | static",
  "url": "string",
  "thumbnail_url": "string",
  "media_urls": ["string"],
  "caption": "string",
  "hook": "string (first line)",
  "cta": "string (extracted CTA)",
  "hashtags": ["string"],
  "mentions": ["string"],
  "location": "string",
  "posted_date": "ISO8601",
  "scraped_date": "ISO8601",
  
  "metrics": {
    "views": "number",
    "likes": "number",
    "comments": "number",
    "shares": "number",
    "saves": "number",
    "engagement_rate": "number (calculated)"
  },
  
  "analysis": {
    "content_pillar": "founder | educational | product | world_building | philosophy | community",
    "mood": "string",
    "visual_style": "string",
    "narrative_pattern": "string",
    "why_it_works": "string (AI-generated)"
  },
  
  "dapper_singh_relevance": {
    "score": "number (0-10)",
    "reasoning": "string",
    "recreation_priority": "high | medium | low"
  }
}
```

---

## Performance Criteria

### Scoring Formula

**Primary: Views**
- 100k+ views: High priority
- 50k-100k views: Medium priority
- 10k-50k views: Low priority
- <10k views: Skip

**Secondary: Engagement Rate**
```
engagement_rate = (likes + comments + saves) / follower_count * 100
```
- >5%: Excellent
- 3-5%: Good
- 1-3%: Average
- <1%: Poor

**Tertiary: Saves**
- Saves indicate high value content
- >1000 saves: High priority
- 500-1000 saves: Medium priority
- <500 saves: Low priority

### Minimum Thresholds (AND condition)
- Views: >10,000
- Engagement Rate: >2%
- Account Follower Count: >5,000

---

## Data Storage

### Obsidian Structure

```text
Vault/
├── Research/
│   ├── Instagram/
│   │   ├── Daily_Reports/
│   │   │   └── 2026-05-31_report.md
│   │   ├── Viral_Posts/
│   │   │   ├── fragrance/
│   │   │   ├── surf/
│   │   │   ├── motorcycles/
│   │   │   ├── music/
│   │   │   ├── art/
│   │   │   ├── travel/
│   │   │   └── food/
│   │   ├── Top_Performers/
│   │   │   └── posts_by_score.md
│   │   └── Content_Patterns/
│   │       └── insights.md
```

### File Format: Viral Post Entry

**File**: `Vault/Research/Instagram/Viral_Posts/fragrance/lelabo_2026-05-28.md`

```markdown
---
post_id: ABC123XYZ
account: @lelabofragrances
category: fragrance
post_type: carousel
url: https://instagram.com/p/ABC123XYZ
scraped_date: 2026-05-31
posted_date: 2026-05-28
views: 125000
engagement_rate: 4.2
saves: 1520
dapper_singh_score: 9.2
recreation_priority: high
---

# Le Labo - Fragrance Ritual Carousel

## Hook
"The ritual matters more than the scent."

## Caption
Full caption text here...

## CTA
"Discover your ritual at lelabofragrances.com"

## Metrics
- Views: 125,000
- Likes: 8,400
- Comments: 340
- Saves: 1,520
- Shares: 210
- Engagement Rate: 4.2%

## Visual Style
- Muted earth tones
- Close-up product shots
- Lifestyle integration
- Minimal text overlay

## Why It Works
Premium positioning through ritual-focused messaging. Emphasizes experience over product features. Aligns with Dapper Singh's "intention" and "presence" pillars.

## Dapper Singh Adaptation Ideas
- Create "Morning Ritual" carousel for beard oil
- Emphasize intentionality over grooming
- Use similar muted California color palette
- Focus on the moment, not the product

## Assets
- [Thumbnail](url)
- [Slide 1](url)
- [Slide 2](url)
```

---

## Clarity App Integration

### New Tab: "Research"

**UI Components:**

1. **Dashboard View**
   - Total posts discovered (this week)
   - Top performing categories
   - Recreation queue count
   - Last scan timestamp

2. **Viral Posts Feed**
   - Filterable by category, date, score
   - Sortable by views, engagement, saves
   - Card view with thumbnail, metrics, CTA
   - "Add to Recreation Queue" button

3. **Post Detail Modal**
   - Full post data
   - Dapper Singh adaptation suggestions
   - "Create Campaign from This" button
   - "Mark as Inspiration" button

4. **Manual Triggers**
   - "Scan Now" button (on-demand)
   - Account input field + "Add Account" button
   - Hashtag input field + "Track Hashtag" button

5. **Settings**
   - Performance thresholds (views, engagement)
   - Scraping frequency
   - Apify usage limits
   - Categories to monitor

### API Endpoints

```typescript
// Clarity App Backend Routes

GET  /api/research/posts
     ?category=fragrance
     &sort=views
     &limit=50

GET  /api/research/post/:id

POST /api/research/scan
     { trigger: "manual" | "scheduled" }

POST /api/research/accounts
     { handle: string, category: string }

GET  /api/research/stats
     // Dashboard metrics

POST /api/research/queue
     { post_id: string, action: "recreate" }
```

---

## Workflow

### Daily Scheduled Scan (Automated)

**Time**: 8:00 AM PST  
**Frequency**: Daily  
**Trigger**: Vercel Cron Job

```text
1. Vercel Cron triggers /api/research/scan
2. Research Orchestrator reads tracked accounts/hashtags
3. Calls Apify actors (rate-limited)
4. Filters by performance thresholds
5. Scores posts for Dapper Singh relevance (AI)
6. Writes to Obsidian vault
7. Sends daily summary email (optional)
8. Updates Clarity dashboard
```

### On-Demand Scan (Manual)

```text
1. User clicks "Scan Now" in Clarity
2. Same workflow as scheduled
3. Real-time progress indicator
4. Notification when complete
```

### Content Recreation Workflow

```text
1. User browses Research tab
2. Finds high-scoring post
3. Clicks "Create Campaign from This"
4. Pre-filled campaign form with:
   - Hook adapted to Dapper Singh
   - Visual direction
   - Content pillar
   - Target product
5. User reviews/edits
6. Clicks "Generate Carousel"
7. Carousel Agent creates draft
8. QA Agent reviews
9. Human approves
10. Publish
```

---

## Apify Implementation: Direct API vs MCP

### Option A: Direct Apify API Calls

**Pros:**
- Simpler to implement
- Fewer dependencies
- Direct control over rate limiting

**Cons:**
- Code tightly coupled to Apify
- Harder to swap providers later

**Implementation:**
```typescript
// lib/apify.ts
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

export async function scrapeHashtag(hashtag: string) {
  const run = await client.actor('apify/instagram-hashtag-scraper').call({
    hashtags: [hashtag],
    resultsLimit: 100,
  });
  
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items;
}
```

### Option B: Custom Apify MCP Server

**Pros:**
- MCP-first architecture (aligns with PRD)
- Agent-friendly interface
- Easier to integrate with Claude
- Swappable providers

**Cons:**
- More complex setup
- Additional MCP server to maintain

**Implementation:**
```typescript
// mcp-servers/apify-server/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
  name: 'apify-instagram',
  version: '1.0.0',
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'scrape_instagram_hashtag',
      description: 'Scrape Instagram posts by hashtag',
      inputSchema: { /* ... */ }
    }
  ]
}));
```

**Recommendation for MVP:**
- Start with **Direct API** (faster)
- Migrate to **MCP** in Phase 2 when adding more agents

---

## Cost Estimation

### Apify Usage (Daily Scheduled)

Assuming:
- 10 hashtags monitored
- 5 competitor accounts
- 100 posts scraped per day

**Monthly Costs:**
- Hashtag searches: 10 * 30 * $0.02 = $6
- Profile scrapes: 5 * 30 * $0.01 = $1.50
- Post scrapes: 100 * 30 * $0.005 = $15

**Total: ~$22.50/month** (well within free tier limits)

### Scaling (Future)
- 50 hashtags, 20 accounts, 500 posts/day
- Estimated: ~$100/month

---

## Jira Project Structure

### Epic: Research Agent - Instagram

**Story 1: Apify Integration**
- Set up Apify account
- Configure API token
- Test Instagram scrapers
- Choose optimal actor

**Story 2: Data Schema & Storage**
- Define Obsidian structure
- Create markdown templates
- Implement file writing logic
- Set up Git versioning

**Story 3: Performance Filtering**
- Implement scoring formula
- Create threshold filters
- Add relevance scoring (AI)

**Story 4: Clarity Research Tab**
- Design UI mockups
- Build dashboard
- Create viral posts feed
- Add post detail modal

**Story 5: API Endpoints**
- /api/research/scan
- /api/research/posts
- /api/research/accounts
- /api/research/stats

**Story 6: Scheduled Scraping**
- Set up Vercel Cron
- Implement orchestrator
- Add error handling
- Create monitoring

**Story 7: Manual Triggers**
- "Scan Now" button
- "Add Account" feature
- "Track Hashtag" feature

**Story 8: Recreation Workflow**
- "Create Campaign" integration
- Pre-fill campaign form
- Connect to Campaign Agent

---

## Phase 1: MVP (Week 2 Timeline)

### Day 1-2: Foundation
- [ ] Set up Apify account + API token
- [ ] Test Instagram scrapers manually
- [ ] Create Obsidian folder structure
- [ ] Define data schema

### Day 3-4: Backend
- [ ] Build Apify integration (Direct API)
- [ ] Implement performance filtering
- [ ] Create Obsidian writer
- [ ] Set up Git versioning

### Day 5-6: Clarity Integration
- [ ] Add Research tab to Clarity
- [ ] Build viral posts feed UI
- [ ] Create API endpoints
- [ ] Add manual scan button

### Day 7: Testing & Polish
- [ ] End-to-end test with real data
- [ ] Set up scheduled cron job
- [ ] Create Jira tickets for Phase 2

---

## Phase 2: Enhancements (Week 3-4)

- [ ] Migrate to Apify MCP server
- [ ] Add AI-powered relevance scoring
- [ ] Implement content pattern analysis
- [ ] Build recreation suggestions engine
- [ ] Add daily email reports
- [ ] Create analytics dashboard

---

## Environment Variables

```bash
# .env.local

# Apify
APIFY_API_TOKEN=apify_api_xxxxxxxxxxxxx

# Obsidian
OBSIDIAN_VAULT_PATH=/path/to/vault

# Clarity App
NEXT_PUBLIC_API_URL=http://localhost:3000

# OpenAI (for relevance scoring)
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Scheduling
CRON_SECRET=random_secret_key
```

---

## Success Metrics

### Week 1
- 100+ viral posts discovered
- 10+ high-priority recreation candidates
- Zero Apify errors
- <30s scan time

### Month 1
- 500+ posts in inspiration database
- 20+ content patterns identified
- 3+ campaigns created from research
- 50% reduction in manual research time

---

## Next Steps

1. ✅ Save this spec to repo
2. ⏳ Create Jira tickets
3. ⏳ Set up Apify account (if not done)
4. ⏳ Review Brand Vault for account list
5. ⏳ Begin Day 1 tasks

---

## Questions for Zamir

- Do you already have Apify account + token?
- Where is Clarity app repo? (Need to add Research tab)
- Do you have Jira workspace set up?
- Should I create initial tracked accounts list from Brand Vault?
