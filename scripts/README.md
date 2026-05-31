# DSCE Scripts

Utility scripts for development and testing.

## Available Scripts

### `test-apify.js`
Test Apify API connection and list available Instagram actors.

**Usage:**
```bash
node scripts/test-apify.js
```

**Requirements:**
- `APIFY_API_TOKEN` in `.env.local`
- `APIFY_USER_ID` in `.env.local`
- `apify-client` npm package installed

## Future Scripts

- `scrape-hashtag.js` - Manual hashtag scraping
- `scrape-account.js` - Manual account scraping  
- `analyze-posts.js` - Batch analyze scraped posts
- `sync-to-obsidian.js` - Sync Apify results to vault
