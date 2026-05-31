# Quick Start: Auto-Create Jira Tickets

## Run This on Your Desktop

```bash
# 1. Clone or pull latest from this repo
cd /path/to/Archive  # wherever you cloned it
git pull origin claude/debug-prompt-issue-01EvF6YJfKDvAUvDte2tJ2u5

# 2. Install dependencies (if not already)
npm install

# 3. Run the script
node scripts/create-jira-tickets.js
```

The script will:
- ✅ Create Epic: "Research Agent - Instagram"
- ✅ Create 15 Stories/Tasks automatically
- ✅ Set story points, priorities, and epic links
- ✅ Use your Jira credentials from .env.local

**Done in ~30 seconds!**

---

## If You Get Errors

### Error: "Project 'DSCE' not found"
Your Jira project key might be different. Check your Jira URL.

**Fix:**
```bash
# In .env.local, change:
JIRA_PROJECT_KEY=DS  # or whatever your project key is
```

### Error: "Field 'customfield_10016' not found"
Story Points field ID might be different.

**Fix:** Open `scripts/create-jira-tickets.js` and comment out line with `customfield_10016`, or find your Story Points field ID in Jira settings.

---

## Alternative: CSV Import

If the script doesn't work for any reason, just import `DSCE_Jira_Import.csv` manually (takes 2 minutes).

---

## After Creation

View your tickets at:
https://dappersingh.atlassian.net/browse/DSCE-1
