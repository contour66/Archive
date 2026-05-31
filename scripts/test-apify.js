/**
 * Test Apify API Connection
 * Run: node scripts/test-apify.js
 */

import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

async function testConnection() {
  console.log('🔍 Testing Apify connection...\n');

  try {
    // Test 1: Get user info
    console.log('Test 1: Fetching user info...');
    const user = await client.user(process.env.APIFY_USER_ID).get();
    console.log(`✅ Connected as: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Plan: ${user.plan}\n`);

    // Test 2: List available actors
    console.log('Test 2: Listing Instagram actors...');
    const actorsResponse = await client.actors().list({
      my: false,
      search: 'instagram'
    });

    const instagramActors = actorsResponse.items
      .filter(actor => actor.name.toLowerCase().includes('instagram'))
      .slice(0, 5);

    console.log(`✅ Found ${instagramActors.length} Instagram actors:`);
    instagramActors.forEach(actor => {
      console.log(`   - ${actor.name} (${actor.username}/${actor.name})`);
    });

    console.log('\n🎉 Apify connection successful!\n');
    console.log('Recommended actors for DSCE:');
    console.log('  1. apify/instagram-hashtag-scraper - For trend discovery');
    console.log('  2. apify/instagram-profile-scraper - For competitor monitoring');
    console.log('  3. apify/instagram-post-scraper - For deep post analysis');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
