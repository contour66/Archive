# Moving DSCE to Clarity App

## Files to Copy from Archive to Clarity

Run these commands **on your desktop** in the clarity-app directory:

```bash
# 1. Navigate to clarity-app
cd /path/to/clarity-app

# 2. Create feature branch
git checkout -b feature/DSCE-foundation

# 3. Copy DSCE files from Archive
cp -r /path/to/Archive/obsidian-vault ./
cp -r /path/to/Archive/config ./
cp -r /path/to/Archive/scripts ./
cp /path/to/Archive/.env.local ./
cp /path/to/Archive/Dapper_Singh_DSCE_PRD_v2.md ./docs/
cp /path/to/Archive/DSCE_Apify_Instagram_Research_Technical_Spec.md ./docs/
cp /path/to/Archive/DSCE_Jira_Tickets.md ./docs/
cp /path/to/Archive/DSCE_Jira_Import.csv ./docs/
cp /path/to/Archive/GIT_WORKFLOW.md ./
cp /path/to/Archive/.gitignore ./.gitignore

# 4. Create docs directory if it doesn't exist
mkdir -p docs

# 5. Add to git
git add .
git commit -m "DSCE: Add foundation - Obsidian vault, config, docs, scripts

Moved DSCE project files from Archive repo:
- Obsidian vault structure
- Tracked accounts configuration
- Apify integration scripts
- Complete documentation (PRD, technical spec, Jira tickets)
- Git workflow guidelines
- Environment configuration

https://claude.ai/code/session_01EvF6YJfKDvAUvDte2tJ2u5"

# 6. Push feature branch
git push -u origin feature/DSCE-foundation

# 7. Create PR
gh pr create --title "DSCE: Foundation Setup" \
  --body "Initial DSCE project setup with documentation, Obsidian vault, and configuration files"
```

---

## Or Use This Script

Save as `move-dsce.sh` and run:

```bash
#!/bin/bash

ARCHIVE_PATH="/path/to/Archive"
CLARITY_PATH="/path/to/clarity-app"

cd "$CLARITY_PATH"
git checkout -b feature/DSCE-foundation

mkdir -p docs

cp -r "$ARCHIVE_PATH/obsidian-vault" ./
cp -r "$ARCHIVE_PATH/config" ./
cp -r "$ARCHIVE_PATH/scripts" ./
cp "$ARCHIVE_PATH/.env.local" ./
cp "$ARCHIVE_PATH"/*.md ./docs/
cp "$ARCHIVE_PATH"/*.csv ./docs/
cp "$ARCHIVE_PATH/GIT_WORKFLOW.md" ./

git add .
git commit -m "DSCE: Add foundation files from Archive"
git push -u origin feature/DSCE-foundation

echo "✅ Done! Create PR at:"
echo "https://github.com/contour66/clarity-app/compare/feature/DSCE-foundation"
```

Make executable and run:
```bash
chmod +x move-dsce.sh
./move-dsce.sh
```

---

## Next Steps After Moving

1. ✅ Review PR and merge to main
2. ✅ Set up branch protection on main
3. ✅ Run Jira ticket creation:
   ```bash
   cd clarity-app
   node scripts/create-jira-tickets.js
   ```
4. ✅ Start building features on new branches:
   - `feature/DSCE-13-apify-integration`
   - `feature/DSCE-17-research-tab-ui`
   - etc.
