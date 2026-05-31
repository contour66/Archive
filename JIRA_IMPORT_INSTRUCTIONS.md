# How to Import DSCE Tickets into Jira

## Method 1: CSV Import (Recommended)

1. Go to your Jira project: https://dappersingh.atlassian.net/
2. Click **Project Settings** (bottom left)
3. Click **Import**
4. Choose **CSV**
5. Upload `DSCE_Jira_Import.csv`
6. Map the columns:
   - Issue Type → Issue Type
   - Summary → Summary
   - Description → Description
   - Story Points → Story Points
   - Priority → Priority
   - Epic Link → Epic Link
7. Click **Begin Import**

This will create:
- 1 Epic: "Research Agent - Instagram"
- 15 Stories/Tasks linked to the epic
- All with story points and priorities assigned

---

## Method 2: Manual Creation

If CSV import doesn't work, you can create tickets manually using the detailed specs in `DSCE_Jira_Tickets.md`.

Each ticket (DSCE-10 through DSCE-26) has:
- Full description
- Acceptance criteria
- Story points
- Dependencies
- Subtasks

---

## Method 3: Run Script Locally

If you want to run the creation script on your local machine:

```bash
# From your clarity-app directory
node /path/to/Archive/scripts/create-jira-tickets.js
```

This will use the Jira API to create all tickets programmatically.

---

## After Import

1. Review tickets in Jira board
2. Drag tickets into Sprint 1 (Week 2)
3. Assign yourself to tickets you're actively working on
4. Update status as you progress:
   - ✅ DSCE-10: Apify Setup (DONE)
   - ✅ DSCE-12: Obsidian Structure (DONE)
   - ✅ DSCE-21: Tracked Accounts (DONE)
   - 🔄 DSCE-13: Apify Integration (IN PROGRESS - next)

---

## Jira Workflow

**Statuses:**
- To Do → In Progress → In Review → Done

**Velocity Tracking:**
- Week 2 Target: 30 story points
- Current: 7 points complete (DSCE-10, DSCE-12, DSCE-21)
- Remaining: 23 points

---

## Next Sprint Planning

After completing Research Agent (Epic-2), create these epics:
- Epic-3: Campaign Engine
- Epic-4: Content Agents (Carousel, Email)
- Epic-5: QA & Approval System
- Epic-6: Analytics & Optimization
