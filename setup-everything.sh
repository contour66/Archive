#!/bin/bash
# DSCE One-Time Setup Script
# Run this ONCE on your local machine to set up everything

echo "🚀 DSCE Setup - Automating Everything..."

# Navigate to clarity-app (adjust path if needed)
cd ~/clarity-app || cd ~/Desktop/clarity-app || cd ~/Documents/clarity-app

# Pull latest
git pull origin main
git checkout feature/DSCE-foundation
git pull origin feature/DSCE-foundation

# Add GitHub secrets
echo "📝 Adding GitHub secrets..."
gh secret set JIRA_BASE_URL --body "https://dappersingh.atlassian.net"
gh secret set JIRA_EMAIL --body "business@dappersingh.co"
gh secret set JIRA_API_TOKEN --body "ATCTT3xFfGN0ckdnttNOFUp4SVGe5DPQ495jL-gkFoIWMSJOUSBIsNkqa74xcFVCJUg3Ic5XRRbkqH65ePL_gxPNonR_aimgEMi6cqa5RHbzywt2GAZxbyETHCI2btWnwijfZrDeVE-YW9xDtqjsAij96yyI8ee243fZNawZrRZHN7b5mU4rKyA=9284DBAB"
gh secret set JIRA_PROJECT_KEY --body "DSCE"
gh secret set APIFY_API_TOKEN --body "apify_api_laNqZz0ttpHT0AzYsNBY1mETiZ5p0V37aX7v"
gh secret set APIFY_USER_ID --body "5B9AGAs6xmPxtJQPo"

# Create Jira tickets
echo "🎫 Creating Jira tickets..."
node scripts/create-jira-tickets.js

# Create PR
echo "📋 Creating PR..."
gh pr create --base main --title "DSCE: Foundation Setup" --body "Initial DSCE setup with documentation, vault, and automation"

echo ""
echo "✅ DONE! Everything set up:"
echo "  - GitHub secrets configured"
echo "  - 16 Jira tickets created"
echo "  - PR created and ready to merge"
echo ""
echo "Next: Merge PR at https://github.com/contour66/clarity-app/pulls"
