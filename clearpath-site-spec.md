# Clearpath Analytics — Site Expansion Spec
**For use with Claude Code**

---

## Context

Clearpath Analytics (clearpath-analytics.vercel.app) is a one-person consulting practice run by Angshuman Rudra — a CS-trained engineer-turned-PM with 20 years of experience, including 10 years as founding PM at TapClicks building data pipelines, ETL infrastructure, and agentic AI systems at production scale.

The site was originally positioned for a non-technical CMO buyer ("clarity problem, not a data problem"). This expansion adds three new pages that showcase the underlying technical depth — for hiring managers, technical buyers, and enterprise clients — while keeping the homepage CMO-friendly.

**Tech stack assumption:** Next.js + Tailwind (match existing site). All new pages should feel native to the existing design system.

---

## Existing Site Structure

```
/                    ← Homepage (CMO-focused, keep as-is)
/blog                ← Blog index
/blog/[slug]         ← Individual posts
/audit               ← AI audit tool
```

---

## What We're Building

Three new content pages + nav update.

```
/data-engineering    ← NEW: Kafka, Redis, Airbyte, pipelines, real-time infra
/semantic-layer      ← NEW: dbt, metric definitions, semantic layer, warehouse-as-truth
/ai                  ← NEW: Agentic systems, LLM integration, CaaS design, AI observability
```

Plus a **nav update** to surface two entry points:
- CMO entry point (existing)
- Technical entry point (new)

---

## Navigation Update

### Current nav
```
Services | How It Works | Blog | AI Audit | About
```

### New nav
```
Services ▾  |  Blog  |  AI Audit  |  About
```

**Services dropdown:**
```
For Marketing Leaders
  → Services (existing homepage #services anchor)

For Engineering & Data Teams
  → Data Engineering  (/data-engineering)
  → Semantic Layer    (/semantic-layer)
  → AI Consulting     (/ai)
```

On mobile: collapsible accordion with the same two-group structure.

---

## Page 1: `/data-engineering`

### Purpose
Signal production-scale infrastructure credibility to technical buyers and hiring managers at companies like Fivetran, Hightouch, Airbyte, Databricks, Snowflake.

### Hero
**Headline:** `Marketing data pipelines that actually run in production.`

**Subhead:** Most marketing data problems aren't analytics problems. They're pipeline problems. Bad connectors. Schema drift. No normalization layer. Data that arrives late, arrives wrong, or doesn't arrive at all.

**CTA:** Book a Data Architecture Review →

### Problem Section — "What breaks in production"
Three cards:

1. **Connector rot** — Platform APIs change. Your connector breaks at 2am. Nobody notices until the Monday report is wrong.
2. **Schema drift** — Google Ads adds a field. Your pipeline silently drops it. Your attribution model is now wrong by an unknown amount.
3. **No normalization** — Every platform defines "click" differently. You have 8 sources of truth and none of them agree.

### What We Build Section
Four items with brief descriptions:

1. **Ingestion pipelines** — Airbyte-based or custom connectors for ad platforms, CRMs, and marketing tools. Reliable, monitored, alertable.
2. **Real-time event streams** — Kafka-based pipelines for campaign events, conversion signals, and audience updates that can't wait for a nightly batch.
3. **Redis caching layer** — Fast-access layers for dashboards and reporting APIs that need sub-second response without hammering the warehouse.
4. **Normalization & deduplication** — Cross-platform entity resolution. One customer record. One campaign record. Regardless of how many platforms claim ownership.

### Tech Stack Visual
Logo grid (same style as homepage): Airbyte · Kafka · Redis · Python · Postgres · BigQuery · Snowflake · Databricks · dbt · Airflow

### Experience Callout (pull quote style)
> "At TapClicks I built and maintained 200+ data connectors serving thousands of marketing agencies — ingesting billions of campaign events across Google, Meta, TikTok, and 200 other platforms. I've seen every failure mode a marketing data pipeline can have."

### CTA Section
**Headline:** Start with a Data Architecture Review.
**Copy:** Two hours. We map your current pipeline, find the failure points, and give you a prioritized fix list. $2,000 flat.
**CTA button:** Book a review →

---

## Page 2: `/semantic-layer`

### Purpose
Address the "our numbers don't match" problem at the layer beneath the dashboard — for RevOps leads, data team leads, and CMOs who are tired of arguing about definitions.

### Hero
**Headline:** `One definition of "conversion." Everywhere. Always.`

**Subhead:** Your pipeline works. Your warehouse has data. But Google says ROAS 4.2, Meta says 3.8, and your CRM shows neither in pipeline. That's not a data problem. That's a semantic layer problem.

**CTA:** Book a Semantic Layer Audit →

### Problem Section — "The definition war"
Three cards:

1. **Metric sprawl** — Marketing uses one definition of MQL. Sales uses another. Finance uses a third. Every dashboard is right and none of them agree.
2. **Logic embedded in dashboards** — Business rules live inside Looker calculated fields, Tableau LODs, and spreadsheet formulas. Nobody knows which one is canonical.
3. **No single source of truth** — When the CFO asks "what was our CPA last quarter?" — who answers? Which tool? Which definition?

### What We Build Section
Four items:

1. **dbt transformation layer** — All business logic defined once, in version-controlled SQL. Metrics computed upstream of every dashboard.
2. **Metric catalog** — Every KPI defined: what it measures, how it's computed, which source it draws from, when it was last updated. Accessible to analysts and executives alike.
3. **Semantic layer integration** — Connect your warehouse to a semantic layer (dbt Semantic Layer, Cube, or Metriql) so every tool — Looker, Tableau, Claude, your internal tools — queries the same definitions.
4. **Cross-platform entity resolution** — One customer ID. One campaign ID. One channel taxonomy. Regardless of how many platforms define them differently.

### Before / After Section
Two-column visual:

**Before (without semantic layer)**
- 6 dashboards, 6 definitions of ROAS
- Business logic in Excel
- New analyst spends 3 weeks "learning the numbers"
- CFO meeting requires 2 hours of prep per slide

**After (with semantic layer)**
- One metric catalog, one definition per KPI
- Logic version-controlled in dbt
- New analyst productive in 2 days
- CFO meeting prep is a dashboard refresh

### Tech Stack Visual
Logo grid: dbt · Snowflake · BigQuery · Databricks · Cube · Looker · Metabase · Sigma · Python

### Experience Callout
> "I built the normalization and aggregation layer at TapClicks that unified campaign data from 200+ platforms into a single coherent model — so that 'impressions' meant the same thing whether it came from Google, Meta, TikTok, or a DSP nobody's heard of."

### CTA Section
**Headline:** Start with a Semantic Layer Audit.
**Copy:** We map your current metric definitions, find where logic is duplicated or conflicting, and give you a build plan. $2,000 flat.
**CTA button:** Book an audit →

---

## Page 3: `/ai`

### Purpose
Signal agentic AI systems credibility — not "we added a chatbot" but production AI architecture. For technical buyers, hiring managers at AI-native companies, and CMOs ready to move beyond dashboards.

### Hero
**Headline:** `AI that works in production. Not in demos.`

**Subhead:** Most "AI for marketing" is a wrapper around ChatGPT. Real AI systems perceive state, plan actions, use tools, and recover from failure — automatically, on schedule, without a human in the loop. That's what we build.

**CTA:** Book an AI Architecture Review →

### Problem Section — "Why AI projects fail"
Three cards:

1. **Context is bad** — The model is fine. The prompt is the problem. Bad context = hallucinated insights = AI your team stops trusting after week two.
2. **No write-back** — Your AI surfaces an insight. Then what? If there's no action layer, you've built an expensive dashboard with worse UX.
3. **No observability** — You don't know when the agent fails, why it gave a wrong answer, or how to improve it. It's a black box you're paying to run.

### What We Build Section
Five items:

1. **Agentic reporting workflows** — Agents that monitor campaign performance, detect anomalies, and generate narrated insight summaries — on schedule, without human assembly.
2. **Natural language querying** — Connect your warehouse to an LLM so analysts and executives can ask questions in plain English and get defensible, sourced answers.
3. **Context architecture (CaaS)** — Design the context layer that feeds your agents: what customer state, campaign state, and business rules the model needs to reason correctly.
4. **AI observability** — LLM call logging, prompt versioning, output quality monitoring. Know when your agent is underperforming before your CMO notices.
5. **AI stack design** — Audit your current stack for AI readiness. Select the right orchestration framework. Get a blueprint, not a vendor recommendation.

### Architecture Visual (text diagram — render as styled code block or visual)
```
Data Core (Snowflake / Databricks)
    ↓
Semantic Layer (dbt / Cube)
    ↓
Context Layer — CaaS (what the agent knows)
    ↓
Agent Runtime (perceive → plan → act → observe)
    ↓
Write-back Actions (campaign pauses, budget shifts, alerts)
    ↓
Observability (Helicone / LangSmith / Arize)
```

Label this: **"The stack we design and build."**

### Tech Stack Visual
Logo grid: Claude AI · LangChain · Python · dbt · Snowflake · Helicone · LangSmith · Airbyte · Kafka · Redis · Temporal

### Experience Callout
> "At TapClicks I built production agentic AI systems — perceive-plan-act-observe loops with real write-back actions — not proof-of-concepts. Ask Your Dashboard (NLQ agent), AI Operator Agents, and ObsGap (AI observability) shipped to real customers."

### CTA Section
**Headline:** Start with an AI Architecture Review.
**Copy:** Two hours. We assess your current stack, identify where AI can replace manual work, and design the agent architecture. $2,000 flat.
**CTA button:** Book a review →

---

## Shared Page Components

All three pages should include:

### Consistent Header Pattern
- Page-specific headline + subhead (as specified above)
- Single CTA button → links to `/#audit` contact form
- Subtle breadcrumb: Home → [Page Title]

### Consistent Footer CTA
Same format across all three pages — "Start with a [X] Review. $2,000 flat. Book a review →"

### Back-link to Homepage Services
Small text link at bottom: "Looking for measurement and analytics consulting? → See all services"

---

## Design Notes

- Match existing site typography, color tokens, and component style exactly
- The architecture diagram on `/ai` should be a styled visual, not a plain code block — use the same visual language as the homepage stack diagram (numbered steps with connecting lines or arrows)
- The Before/After section on `/semantic-layer` can use a two-column card layout
- Tech stack logo grids should match the existing homepage logo strip style
- Experience callouts should be styled as pull quotes — visually distinct from body copy
- All pages should be fully responsive (mobile-first)

---

## SEO Metadata

### `/data-engineering`
- Title: `Marketing Data Engineering | Clearpath Analytics`
- Description: `Production-grade marketing data pipelines — Kafka, Airbyte, Redis, normalization, and real-time ingestion for marketing teams that need data they can trust.`

### `/semantic-layer`
- Title: `Semantic Layer Consulting | Clearpath Analytics`
- Description: `One definition of every metric, everywhere. dbt-based semantic layer design for marketing teams tired of arguing about whose numbers are right.`

### `/ai`
- Title: `AI Consulting for Marketing Teams | Clearpath Analytics`
- Description: `Agentic AI systems that work in production — not demos. Context architecture, NLQ, AI observability, and write-back agents built on your existing data stack.`

---

## Out of Scope for This Build

- No new blog posts (content to be added separately)
- No changes to homepage copy or layout
- No changes to `/audit` tool
- No backend changes — contact form uses existing implementation

---

## Acceptance Criteria

- [ ] Three new pages render correctly at their routes
- [ ] Nav dropdown works on desktop and mobile
- [ ] All CTAs link to `/#audit`
- [ ] Tech stack logo grids display correctly
- [ ] Architecture diagram on `/ai` renders as a styled visual
- [ ] Before/After section on `/semantic-layer` is two-column on desktop, stacked on mobile
- [ ] All three pages pass basic Lighthouse accessibility check
- [ ] SEO metadata present on all three pages
