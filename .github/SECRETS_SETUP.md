# GitHub Secrets Setup for DSCE

## Required Secrets for Workflows

Add these secrets to: https://github.com/contour66/clarity-app/settings/secrets/actions

### Jira Integration

**Name:** `JIRA_BASE_URL`  
**Value:** `https://dappersingh.atlassian.net`

**Name:** `JIRA_EMAIL`  
**Value:** `business@dappersingh.co`

**Name:** `JIRA_API_TOKEN`  
**Value:** `<your-jira-api-token>`

**Name:** `JIRA_PROJECT_KEY`  
**Value:** `DSCE`

### Apify Integration (for future use)

**Name:** `APIFY_API_TOKEN`  
**Value:** `<your-apify-api-token>`

**Name:** `APIFY_USER_ID`  
**Value:** `5B9AGAs6xmPxtJQPo`

---

## Quick Setup Commands

```bash
# Using GitHub CLI (recommended)
gh secret set JIRA_BASE_URL --body "https://dappersingh.atlassian.net"
gh secret set JIRA_EMAIL --body "business@dappersingh.co"
gh secret set JIRA_API_TOKEN --body "<your-jira-api-token>"
gh secret set JIRA_PROJECT_KEY --body "DSCE"
gh secret set APIFY_API_TOKEN --body "<your-apify-api-token>"
gh secret set APIFY_USER_ID --body "5B9AGAs6xmPxtJQPo"
```

---

## Triggering the Jira Workflow

### Manual Trigger
```bash
gh workflow run setup-jira.yml
```

### Automatic Trigger
The workflow runs automatically when:
- You push changes to `feature/DSCE-foundation`
- The workflow file itself is modified

---

## Verify Setup

After adding secrets:
1. Go to: https://github.com/contour66/clarity-app/actions
2. Find "Setup Jira Tickets" workflow
3. Click "Run workflow"
4. Watch it create all 16 tickets automatically!

---

## Security Note

⚠️ **Never commit these values to git!**  
✅ Always use GitHub Secrets for sensitive data
