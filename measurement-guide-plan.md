# Clearpath Measurement Guide — Content Plan

## What's been built (5 posts, live on clean-master)

| File | Title | Status |
|---|---|---|
| `measurement-methodology-decision-matrix.md` | Which Measurement Methodology Is Right for You: The Decision Matrix | ✅ Live |
| `automotive-measurement-why-its-broken.md` | Why Automotive Measurement Is Harder Than Anything Else | ✅ Live |
| `mmm-for-cpg.md` | MMM for CPG: The Canonical Case and Where It Still Goes Wrong | ✅ Live |
| `mmm-for-financial-services.md` | Marketing Measurement for Financial Services: Why Clean Rooms Aren't Optional | ✅ Live |
| `mmm-for-b2b-saas.md` | Marketing Measurement for B2B SaaS: Why Pipeline Is the Only Honest Outcome Variable | ✅ Live |

---

## What's left to write (4 industry articles)

### 1. Retail / e-commerce
**Angle:** The MTA + MMM combination case. Short cycles and digital-native paths make MTA viable here — but MMM is still needed once offline spend (TV, OOH, direct mail) becomes material. Promo zones as natural geo experiments. The incrementality problem with Amazon and marketplace channels.
**Key diagram:** MTA coverage by channel type (tracked vs untracked)
**Snowflake relevance:** Retail is a core Snowflake vertical. Promo zones = natural clean room use case.

### 2. Travel / hospitality
**Angle:** Seasonality dominates the signal — the model needs to separate "summer always spikes" from "our campaign worked." Long consideration for big trips (months), short consideration for hotels (days). Loyalty programs as first-party data gold mine that most brands underuse for measurement. OTA vs direct channel attribution conflict.
**Key diagram:** Seasonality decomposition — what's base, what's seasonal, what's media-driven
**Snowflake relevance:** Travel data collaboration (airline + hotel + OTA clean rooms)

### 3. Pharma / healthcare
**Angle:** The hardest privacy constraints in any vertical. Script lift studies as the primary measurement tool (not MMM). Why NRx/TRx data is the outcome variable, not sales. HCP vs DTC measurement are completely different problems. The HIPAA wall and what it means for data-driven measurement.
**Key diagram:** HCP vs DTC measurement architectures side by side
**Snowflake relevance:** Pharma clean rooms, HCP data collaboration, IQVIA partnership

### 4. Telco / utilities
**Angle:** High-volume, churn-driven business where retention marketing matters as much as acquisition. Long contract cycles with defined renewal windows (natural experiment opportunities). The network effect problem — coverage expansion that looks like marketing effectiveness.
**Key diagram:** Acquisition vs retention measurement split
**Snowflake relevance:** Telco is a named Snowflake vertical

---

## The hub page (build after all 8 articles are written)

**URL:** `/measurement` or `/tools/measurement-guide`
**What it is:** The interactive tool from `dashboard_v3.jsx` (in `job-search-os/`) ported to an Astro page with client-side JS.

**Features to port:**
- Spend slider ($1M → $500M+)
- Industry dropdown (8 industries)
- Four methodology cards: MMM / MTA / Geo experiments / Brand surveys — each rated strong / viable / not recommended
- Recommendation panel: primary method + rationale + nuance text
- Four attribute tiles: signal quality, purchase cycle, cookie dependency, digital mix %
- "How all industries score at this spend level" bar chart
- Link from each industry selection to the corresponding deep-dive article

**Tech approach:** `.astro` page with a `<script>` tag containing vanilla JS (no framework needed — keeps the existing stack, avoids adding React/Vue as a dependency). The tool is simple enough that vanilla JS handles it cleanly.

**Content links from the tool:**
- CPG → `/blog/mmm-for-cpg`
- Retail → `/blog/mmm-for-retail` (not yet written)
- Financial services → `/blog/mmm-for-financial-services`
- Automotive → `/blog/automotive-measurement-why-its-broken`
- Pharma → `/blog/mmm-for-pharma` (not yet written)
- B2B SaaS → `/blog/mmm-for-b2b-saas`
- Travel → `/blog/mmm-for-travel` (not yet written)
- Telco → `/blog/mmm-for-telco` (not yet written)

---

## Recommended sequence to resume

1. Write 4 remaining industry articles (Retail, Travel, Pharma, Telco)
2. Build hub page — port `dashboard_v3.jsx` logic to Astro vanilla JS page
3. Add cross-links between all articles and the hub
4. Commit and push
