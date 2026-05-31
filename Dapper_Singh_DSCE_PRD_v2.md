# Dapper Singh Content Engine (DSCE)
## Architecture & Product Requirements Document v2

### Vision
Build an AI-powered Campaign Operating System for Dapper Singh that creates cohesive, premium, brand-aligned content across Instagram, Email, Website, and future channels.

Primary objective:
Create campaign-driven content, not isolated posts.

---

# Core Philosophy

The system should optimize for:

- Brand consistency over volume
- Campaigns over posts
- Quality over automation
- Human approval over autonomous publishing
- Research-driven content over generic AI content

---

# System Goals

## Goal 1
Reduce content production workload by 80%.

## Goal 2
Create cohesive campaigns across:
- Instagram
- Email
- Website
- Future channels

## Goal 3
Preserve premium Dapper Singh positioning.

## Goal 4
Eliminate generic AI output.

## Goal 5
Create reusable brand intelligence.

---

# High-Level Architecture

```text
                    User
                      |
                      v

              Clarity Interface

                      |

             Orchestrator Agent

                      |

 ------------------------------------------------
 |                  MCP Layer                    |
 ------------------------------------------------

 Filesystem MCP
 Git MCP
 Playwright MCP
 Canva MCP
 Firecrawl MCP
 Exa MCP

                      |

 ------------------------------------------------
 |                   Agents                      |
 ------------------------------------------------

 Research Agent

 Campaign Agent

 Carousel Agent

 Email Agent

 QA Agent

 Asset Manager

 Analytics Agent

                      |

 ------------------------------------------------
 |                 Data Layer                    |
 ------------------------------------------------

 Obsidian Vault

 Campaign Database

 Inspiration Database

 Asset Registry

 Published Content Log

 Performance Metrics
```

---

# Why MCP Matters

This project should be MCP-first.

Claude should not directly manage systems.

Claude should use MCP servers as tools.

Required MCPs:

## Filesystem MCP
Purpose:
- Read/write Obsidian
- Store campaigns
- Store prompts
- Store research

## Git MCP
Purpose:
- Prompt versioning
- Content versioning
- Audit trail

## Playwright MCP
Purpose:
- Instagram research
- Competitor analysis
- Trend analysis

## Canva MCP
Purpose:
- Template population
- Asset management
- Draft creation

## Firecrawl MCP
Purpose:
- Website research
- Brand research
- Blog scraping

## Exa MCP
Purpose:
- Trend discovery
- Content opportunity discovery

---

# Data Layer

## Obsidian Vault Structure

```text
Vault/

├── Brand/
├── Products/
├── Campaigns/
├── Research/
├── Competitors/
├── Templates/
├── Prompts/
├── Emails/
├── Content/
├── Analytics/
├── Published/
├── Assets/
└── System/
```

---

# Brand Vault

Purpose:
Single source of truth.

Contains:

- Mission
- Positioning
- Voice
- Taglines
- Product details
- Customer personas
- Messaging guidelines
- Campaign history

---

# Inspiration Database

Purpose:
Store high-performing content.

Sources:

- Luxury brands
- Fragrance brands
- Menswear brands
- Wellness brands
- Surf culture
- Hospitality brands
- Watches
- Architecture
- Lifestyle brands

Stored Data:

- Hook
- CTA
- Visual style
- Narrative
- Engagement
- Why it worked

---

# Campaign Data Model

```yaml
campaign_id:
title:
objective:
product:
offer:
launch_date:
end_date:
content_pillars:
keywords:
mood:
visual_direction:
cta:
status:
owner:
performance_score:
```

Relationships:

Campaign

→ Carousel

→ Email

→ Reel

→ Stories

→ Website

→ Analytics

---

# Content Entity Model

```yaml
content_id:
campaign_id:
type:
status:
hook:
body:
cta:
template:
created_date:
approval_status:
performance_metrics:
```

---

# Asset Registry

```yaml
asset_id:
filename:
product:
campaign:
usage_type:
status:
date_created:
last_used:
approved:
archived:
tags:
```

---

# Canva Template Model

```yaml
template_id:
name:
type:
pillar:
slide_count:
layout_style:
image_placeholders:
text_placeholders:
brand_approved:
version:
owner:
```

---

# Content Pillars

## Founder (20%)

Examples:

- Building Dapper Singh
- Markets
- Lessons learned
- Motorcycle rides
- Surfing
- Cold plunge
- Product creation

## Educational (25%)

Examples:

- Beard oil usage
- Skin care
- Fragrance
- Rituals
- Grooming

## Product (20%)

Examples:

- Sol
- Black Temple
- Bala
- Blue Note
- Ichi Ban
- Rollers

## World Building (20%)

Examples:

- California
- Craftsmanship
- Surf culture
- Tailoring
- Architecture
- Coffee
- Jazz
- Travel

## Philosophy (10%)

Examples:

- Presence
- Intention
- Discipline
- Ritual

## Community (5%)

Examples:

- Reviews
- UGC
- Events
- Customers

---

# Agent Architecture

## Research Agent

Responsibilities:

- Monitor competitors
- Discover trends
- Capture viral content
- Store findings

Output:

- Weekly reports
- Opportunity reports
- Inspiration records

---

## Campaign Agent

Input:

- Product
- Goal
- Launch date

Output:

- Campaign brief
- Content plan
- Email plan
- Website updates

---

## Carousel Agent

Input:

- Campaign
- Template

Output:

- Hook
- Slides
- CTA
- Caption
- Canva draft

---

## Email Agent

Input:

- Campaign

Output:

- Weekly email
- Launch email
- Reminder email
- Story email

Important:

Instagram and Email must share campaign context.

---

## QA Agent

Purpose:

Remove generic AI content.

Validation:

- Brand fit
- Originality
- Authenticity
- Readability
- Compliance

Process:

Claude Creates

→ ChatGPT Reviews

→ Claude Revises

→ Human Approves

---

## Asset Manager

Responsibilities:

- Duplicate detection
- Metadata assignment
- Folder organization
- Asset archival

---

## Analytics Agent

Responsibilities:

- Track engagement
- Track performance
- Score campaigns
- Recommend improvements

---

# Agent Interaction Diagram

```text
Research Agent

      ↓

Campaign Agent

      ↓

Content Agents

      ↓

Canva Agent

      ↓

QA Agent

      ↓

Human Review

      ↓

Publish Queue

      ↓

Analytics Agent

      ↓

Research Agent
```

---

# Viral Content Workflow

Step 1

Monitor:

- Instagram
- TikTok
- Pinterest

Step 2

Capture:

- Views
- Likes
- Shares
- Saves
- Comments

Step 3

Categorize:

- Founder
- Educational
- Product
- World Building
- Philosophy
- Community

Step 4

Store in Inspiration Database

Step 5

Extract patterns

Step 6

Generate opportunities

---

# Email + Instagram Synchronization

Rule:

No standalone content.

Everything belongs to a campaign.

```text
Campaign

    ↓

Instagram Carousel

    ↓

Stories

    ↓

Reel

    ↓

Email

    ↓

Website

    ↓

Offer
```

All content references:

campaign_id

---

# Prompt Engineering Standards

Every prompt must reference:

- Brand Vault
- Campaign
- Product
- Content Pillar
- Inspiration Database
- Previous Content

Avoid:

- Corporate language
- AI buzzwords
- Generic hooks
- Bro marketing
- Fake luxury

---

# Brand Voice

California

Cultured

Intentional

Warm

Confident

Refined

Human

Never:

- Alpha male content
- Medical claims
- Aggressive sales language
- Fear marketing

---

# QA Scoring Framework

Score 1-10

Categories:

- Brand Alignment
- Originality
- Authenticity
- Campaign Alignment
- Emotional Resonance
- Conversion Potential
- Visual Alignment
- Readability

Minimum Passing Score:

8.0

Anything lower returns for revision.

---

# Human Approval Workflow

```text
Agent Creates

      ↓

QA Review

      ↓

Draft Presented

      ↓

Human Feedback

      ↓

Revision

      ↓

Approval

      ↓

Publish
```

No autonomous publishing during MVP.

---

# Trello Structure

## Backlog

Future ideas

## Foundation

Obsidian
Brand Vault
Git

## Research

Playwright
Competitor Tracking
Trend Discovery

## Canva

Templates
Assets
Metadata

## Campaign Engine

Campaign Creation
Storage
Planning

## Content Engine

Carousels
Emails
Reels

## QA

Validation
Review

## Testing

Black Temple
Sol
Bala
Blue Note
Ichi Ban

## Future

Automation
Publishing
Analytics

---

# Timeline

## Week 1

Brand Vault

Obsidian

Documentation

## Week 2

Research Agent

Playwright MCP

## Week 3

Campaign Engine

## Week 4

Carousel Engine

## Week 5

Email Engine

## Week 6

QA Engine

## Week 7

Canva Asset Manager

## Week 8

End-to-End Testing

---

# Future Higgsfield Integration

```text
Campaign

   ↓

Visual Brief

   ↓

Prompt Generator

   ↓

Higgsfield

   ↓

QA Review

   ↓

Approval
```

---

# Future Midjourney Integration

```text
Campaign

   ↓

Mood Board

   ↓

Prompt Generator

   ↓

Image Concepts

   ↓

Asset Approval

   ↓

Canva
```

---

# Requirements Claude Must Consider

- Authentication
- Permissions
- Audit Logs
- Error Handling
- Retry Logic
- Queue Management
- Cost Monitoring
- Prompt Versioning
- Template Versioning
- Asset Backup
- Analytics Dashboard
- Human Approval Logs
- Content Revision History
- Campaign Attribution
- Notification System
- Future Multi-Brand Support
- Shopify Integration
- Klaviyo Integration
- Meta Integration
- Creator Management
- Affiliate Management
- UGC Management

---

# Final Recommendation

Build this as a Campaign Operating System.

Do not build a content generator.

Campaigns are the primary object.

Every asset, email, reel, carousel, story, website update, and future video should inherit context from a Campaign ID.

This creates a scalable system capable of supporting Dapper Singh and future brands under Vitruvian West Holdings.
