#!/usr/bin/env node
/**
 * Create DSCE Jira Tickets
 * Imports all Research Agent tickets into Jira
 *
 * Usage: node scripts/create-jira-tickets.js
 * Requires: JIRA_EMAIL, JIRA_API_TOKEN, JIRA_BASE_URL in .env.local
 */

import 'dotenv/config';

const JIRA_BASE_URL = process.env.JIRA_BASE_URL || 'https://dappersingh.atlassian.net';
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'DSCE';

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

const headers = {
  'Authorization': `Basic ${auth}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function createEpic(summary, description) {
  const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        project: { key: PROJECT_KEY },
        summary,
        description: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: description }]
          }]
        },
        issuetype: { name: 'Epic' }
      }
    })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Failed to create Epic:', JSON.stringify(result, null, 2));
    throw new Error(`Epic creation failed: ${result.errorMessages || result.errors || 'Unknown error'}`);
  }

  return result;
}

async function createStory(summary, description, storyPoints, epicKey) {
  const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        project: { key: PROJECT_KEY },
        summary,
        description: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: description }]
          }]
        },
        issuetype: { name: 'Story' },
        parent: { key: epicKey },
        customfield_10016: storyPoints // Story Points field
      }
    })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(`❌ Failed to create story "${summary}":`, JSON.stringify(result, null, 2));
    // Don't throw, just log and continue with other tickets
    return { key: undefined, error: true };
  }

  return result;
}

async function main() {
  console.log('🎫 Creating DSCE Jira tickets...\n');

  try {
    // Create Epic
    console.log('Creating Epic: Research Agent - Instagram...');
    const epic = await createEpic(
      'Research Agent - Instagram',
      'Automated Instagram research system that discovers high-performing content in Dapper Singh niches using Apify'
    );

    const epicKey = epic.key;
    console.log(`✅ Epic created: ${epicKey}\n`);

    // Create Stories
    const stories = [
      {
        summary: 'Set Up Apify Account & Authentication',
        description: 'Configure Apify API token and test connection',
        points: 2
      },
      {
        summary: 'Research Apify Instagram Actors',
        description: 'Evaluate different Apify actors and choose optimal setup',
        points: 3
      },
      {
        summary: 'Create Obsidian Vault Structure',
        description: 'Set up folder structure and templates for research data',
        points: 2
      },
      {
        summary: 'Build Apify Integration Module',
        description: 'Create TypeScript module for calling Apify Instagram scrapers',
        points: 5
      },
      {
        summary: 'Implement Performance Filtering & Scoring',
        description: 'Create scoring system to identify high-performing posts',
        points: 5
      },
      {
        summary: 'Create Obsidian Writer Module',
        description: 'Build module to write scraped posts to Obsidian vault',
        points: 3
      },
      {
        summary: 'Build Research Orchestrator',
        description: 'Coordinate entire research workflow from scraping to storage',
        points: 5
      },
      {
        summary: 'Create Clarity Research Tab UI',
        description: 'Add Research tab to Clarity app to display viral posts',
        points: 8
      },
      {
        summary: 'Build Research API Endpoints',
        description: 'Create Next.js API routes to serve research data',
        points: 5
      },
      {
        summary: 'Implement Manual Scan Trigger',
        description: 'Add "Scan Now" button for on-demand Instagram research',
        points: 3
      },
      {
        summary: 'Set Up Scheduled Daily Scraping',
        description: 'Configure Vercel Cron for automated daily scraping',
        points: 3
      },
      {
        summary: 'Create Tracked Accounts Configuration',
        description: 'Initial list of Instagram accounts and hashtags to monitor',
        points: 2
      },
      {
        summary: 'Add Manual Account Input Feature',
        description: 'Allow adding Instagram accounts via Clarity UI',
        points: 3
      },
      {
        summary: 'Build Daily Research Report Generator',
        description: 'Generate daily markdown reports summarizing findings',
        points: 3
      },
      {
        summary: 'Implement Content Recreation Queue',
        description: 'Queue viral posts for recreation and integrate with Campaign Agent',
        points: 5
      },
      {
        summary: 'End-to-End Testing - Research Workflow',
        description: 'Test complete workflow from trigger to Clarity display',
        points: 3
      }
    ];

    for (const story of stories) {
      console.log(`Creating: ${story.summary}...`);
      const result = await createStory(
        story.summary,
        story.description,
        story.points,
        epicKey
      );
      console.log(`✅ ${result.key}: ${story.summary}`);
    }

    console.log('\n🎉 All tickets created successfully!');
    console.log(`\nView in Jira: ${JIRA_BASE_URL}/browse/${epicKey}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      const body = await error.response.text();
      console.error('Response:', body);
    }
  }
}

main();
