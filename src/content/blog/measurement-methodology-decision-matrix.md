---
title: "Which Measurement Methodology Is Right for You: The Decision Matrix"
description: "Last-click, MTA, MMM, geo experiments — every methodology is right for some companies and wrong for others. The decision comes down to three factors: media spend, purchase cycle, and data infrastructure. Here's a practical framework."
date: 2026-05-20
readTime: "9 min"
keywords: ["media mix modeling", "MMM", "multi-touch attribution", "MTA", "marketing measurement", "geo experiments", "incrementality testing", "marketing analytics"]
author: "Angshuman Rudra"
---

The measurement methodology conversation usually starts wrong. Someone reads about MMM's renaissance or hears about a clean room at a conference and concludes they should adopt it. Or they're told MTA is dead and pivot away from it entirely.

Both moves are mistakes. No single methodology is universally correct. The right answer depends on three factors that are specific to your business: how much you spend, how long your purchase cycle is, and how clean your data infrastructure is.

Here's the framework.

---

## The Three Factors That Drive the Decision

### 1. Annual Media Spend

This is the hardest constraint. Statistical models need variation — they identify channel effects by comparing weeks when you spent more or less on a channel and observing what changed in outcomes. If you spend roughly the same amount every week, the model can't separate "TV works" from "we always run TV."

The practical thresholds:

- **Below $5M/year:** MMM is not viable. There isn't enough spend variation or channel diversity to identify coefficients with statistical confidence. You're better served by channel-by-channel incrementality tests or simply using platform-reported numbers with appropriate skepticism.
- **$5M–$30M/year:** Lightweight MMM is viable, but you need 3+ years of weekly data and meaningful variation in spend levels. A single-agency engagement producing quarterly MMM output is the right scale.
- **$30M–$150M/year:** Full MMM is the foundation. Complement with geo holdout experiments to calibrate the model on your highest-spend channels. This is where MMM produces its highest ROI — the spend level where reallocation decisions are meaningful but the model uncertainty is manageable.
- **Above $150M/year:** MMM remains essential but needs to be run at granular levels — by geo, by business unit, by brand — rather than as a single aggregate model. At this scale, channel interaction effects (TV lifting search, social amplifying display) become large enough to matter and a simple additive model will mislead you.

### 2. Purchase Cycle Length

Last-click attribution makes an implicit assumption: the ad someone clicked or viewed immediately before converting is the one that caused the conversion. For a $15 impulse purchase, that assumption is defensible. For a $60,000 car or an enterprise software contract, it's not just wrong — it's destructively wrong, because it leads you to systematically undervalue the brand and awareness spend that created the consideration set.

The longer your purchase cycle, the more your measurement needs to account for carryover effects — the fact that awareness created six months ago is still influencing today's purchase decision.

- **Cycle under 2 weeks:** Last-click with careful deduplication is workable as a tactical signal. MTA adds value if you have clean cross-device identity.
- **Cycle 2 weeks to 3 months:** MTA for channel mix guidance, MMM for strategic allocation. Neither alone is sufficient.
- **Cycle 3 months to 1 year:** MMM is the foundation. MTA data is useful for within-campaign optimization but cannot answer budget allocation questions. Adstock parameters need to span months, not weeks.
- **Cycle over 1 year:** MMM with extended lookbacks (4–5 years of weekly data) plus brand tracking surveys as leading indicators. The intermediate metric — are you in the consideration set when someone enters market? — matters more than conversion attribution.

### 3. Data Infrastructure Maturity

Every methodology requires a data foundation. MMM needs 3+ years of weekly spend data across all channels in one place, matched against weekly business outcome data (revenue, transactions, leads) with promotional events and external factors flagged. MTA needs a connected identity graph linking impressions to conversions. Geo experiments need clean sales data at the market level with controllable spend by geography.

If you don't have that foundation, methodology choice is premature — you're debating which car to buy when you don't have a license.

---

## The Matrix

<div style="overflow-x: auto; margin: 2rem 0;">
<svg viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;font-family:system-ui,sans-serif;">

  <!-- Background -->
  <rect width="760" height="480" fill="#0f1117" rx="8"/>

  <!-- Title -->
  <text x="380" y="32" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="600">Measurement Methodology by Spend × Purchase Cycle</text>

  <!-- Grid background zones -->
  <!-- Bottom-left: too small / last-click -->
  <rect x="60" y="50" width="220" height="330" fill="#1e1b2e" rx="4"/>
  <!-- Bottom-right zone 1: lightweight MMM -->
  <rect x="280" y="50" width="160" height="330" fill="#1a2332" rx="4"/>
  <!-- Bottom-right zone 2: full MMM -->
  <rect x="440" y="50" width="140" height="165" fill="#0d2416" rx="4"/>
  <!-- Top-right zone: full MMM + geo -->
  <rect x="440" y="215" width="140" height="165" fill="#0d2416" rx="4"/>
  <!-- Right-most zones -->
  <rect x="580" y="50" width="140" height="165" fill="#122010" rx="4"/>
  <rect x="580" y="215" width="140" height="165" fill="#122010" rx="4"/>

  <!-- Y-axis: Purchase cycle -->
  <text x="22" y="300" fill="#94a3b8" font-size="11" transform="rotate(-90,22,220)" text-anchor="middle">Purchase Cycle</text>
  <line x1="58" y1="50" x2="58" y2="395" stroke="#334155" stroke-width="1"/>

  <!-- Y-axis labels -->
  <text x="52" y="390" text-anchor="end" fill="#94a3b8" font-size="10">&lt; 2 weeks</text>
  <text x="52" y="310" text-anchor="end" fill="#94a3b8" font-size="10">1–3 months</text>
  <text x="52" y="230" text-anchor="end" fill="#94a3b8" font-size="10">3–12 months</text>
  <text x="52" y="150" text-anchor="end" fill="#94a3b8" font-size="10">&gt; 1 year</text>

  <!-- Y gridlines -->
  <line x1="58" y1="380" x2="720" y2="380" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="58" y1="298" x2="720" y2="298" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="58" y1="215" x2="720" y2="215" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="58" y1="133" x2="720" y2="133" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- X-axis: Spend -->
  <line x1="58" y1="395" x2="720" y2="395" stroke="#334155" stroke-width="1"/>
  <text x="390" y="440" text-anchor="middle" fill="#94a3b8" font-size="11">Annual Media Spend</text>

  <!-- X-axis labels -->
  <text x="170" y="415" text-anchor="middle" fill="#94a3b8" font-size="10">&lt; $5M</text>
  <text x="360" y="415" text-anchor="middle" fill="#94a3b8" font-size="10">$5M–$30M</text>
  <text x="510" y="415" text-anchor="middle" fill="#94a3b8" font-size="10">$30M–$150M</text>
  <text x="650" y="415" text-anchor="middle" fill="#94a3b8" font-size="10">&gt; $150M</text>

  <!-- X gridlines -->
  <line x1="280" y1="50" x2="280" y2="395" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="440" y1="50" x2="440" y2="395" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="580" y1="50" x2="580" y2="395" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Cell labels -->
  <!-- Col 1: < $5M -->
  <text x="170" y="175" text-anchor="middle" fill="#f87171" font-size="12" font-weight="600">Experiments</text>
  <text x="170" y="192" text-anchor="middle" fill="#94a3b8" font-size="10">or last-click</text>
  <text x="170" y="255" text-anchor="middle" fill="#f87171" font-size="12" font-weight="600">Experiments</text>
  <text x="170" y="272" text-anchor="middle" fill="#94a3b8" font-size="10">+ brand tracking</text>
  <text x="170" y="338" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="600">Lightweight MTA</text>
  <text x="170" y="355" text-anchor="middle" fill="#94a3b8" font-size="10">+ channel tests</text>

  <!-- Col 2: $5M-$30M -->
  <text x="360" y="163" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="600">MMM + brand</text>
  <text x="360" y="178" text-anchor="middle" fill="#94a3b8" font-size="10">tracking surveys</text>
  <text x="360" y="243" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="600">Lightweight MMM</text>
  <text x="360" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">+ geo holdouts</text>
  <text x="360" y="323" text-anchor="middle" fill="#34d399" font-size="12" font-weight="600">MMM + MTA</text>
  <text x="360" y="338" text-anchor="middle" fill="#94a3b8" font-size="10">complementary</text>

  <!-- Col 3: $30M-$150M -->
  <text x="510" y="163" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="600">MMM (5yr) +</text>
  <text x="510" y="178" text-anchor="middle" fill="#94a3b8" font-size="10">brand tracking</text>
  <text x="510" y="243" text-anchor="middle" fill="#34d399" font-size="12" font-weight="600">Full MMM</text>
  <text x="510" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">+ geo calibration</text>
  <text x="510" y="323" text-anchor="middle" fill="#34d399" font-size="12" font-weight="600">MMM + MTA</text>
  <text x="510" y="338" text-anchor="middle" fill="#94a3b8" font-size="10">clean room ready</text>

  <!-- Col 4: > $150M -->
  <text x="650" y="163" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="600">Hierarchical MMM</text>
  <text x="650" y="178" text-anchor="middle" fill="#94a3b8" font-size="10">geo × brand × BU</text>
  <text x="650" y="243" text-anchor="middle" fill="#34d399" font-size="12" font-weight="600">Hierarchical MMM</text>
  <text x="650" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">+ interaction terms</text>
  <text x="650" y="323" text-anchor="middle" fill="#34d399" font-size="12" font-weight="600">Full stack</text>
  <text x="650" y="338" text-anchor="middle" fill="#94a3b8" font-size="10">MMM + MTA + clean room</text>

  <!-- Industry dots (example placements) -->
  <circle cx="170" cy="362" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="178" y="366" fill="#93c5fd" font-size="9">DTC / eComm</text>

  <circle cx="360" cy="340" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="368" y="344" fill="#93c5fd" font-size="9">Retail</text>

  <circle cx="510" cy="260" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="518" y="264" fill="#93c5fd" font-size="9">CPG</text>

  <circle cx="580" cy="175" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="588" y="179" fill="#93c5fd" font-size="9">Auto (OEM)</text>

  <circle cx="390" cy="180" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="398" y="184" fill="#93c5fd" font-size="9">B2B SaaS</text>

  <circle cx="480" cy="260" r="5" fill="#60a5fa" opacity="0.8"/>
  <text x="488" y="264" fill="#93c5fd" font-size="9">Insurance</text>

</svg>
</div>

---

## What This Looks Like by Industry

**DTC / eCommerce (cycle: days, spend: $1M–$20M)**
MTA is most useful here — short cycles and digital-native conversion paths mean you actually have the data to connect impressions to outcomes. MMM becomes valuable once you're spending enough across enough channels to need strategic allocation decisions. Most DTC brands below $10M are better served by rigorous incrementality tests on their top 2–3 channels than by a full MMM engagement.

**CPG (cycle: days–weeks, spend: $30M–$300M)**
The canonical MMM use case. Long history of TV and offline spend where last-click is structurally useless. Enough budget to produce meaningful spend variation. The challenge is data quality — normalizing spend data across agencies, correcting for promotional events, and handling distribution changes that affect sales independent of media. Get the data infrastructure right and CPG MMM produces reliable, actionable outputs.

**B2B SaaS (cycle: 3–18 months, spend: $5M–$50M)**
One of the harder measurement problems. Purchase cycles are long enough that last-click is misleading (the click that closes a deal happened 14 months after the webinar that put you on the shortlist), but enterprise deal values are high enough that sample sizes are small. MTA over-rewards bottom-funnel activity. MMM works if you have 3+ years of pipeline data as your outcome variable — not just closed revenue, because closed revenue lags too far. Pipeline influenced in a given week is the right outcome metric.

**Automotive (cycle: 3–7 years, spend: $50M–$500M)**
The hardest measurement problem in the industry. Covered in detail in a [separate post on automotive measurement](/blog/automotive-measurement-why-its-broken) — but the short version is: MMM is necessary but insufficient. You need separate models for brand and activation spend, brand tracking surveys as leading indicators, and dealer-level analysis to separate OEM and local spend attribution.

**Insurance and Financial Services (cycle: months, spend: $30M–$200M)**
Regulatory constraints on data sharing make clean room approaches valuable but complex. MMM is the foundation. The specific challenge is that offline channels (TV, direct mail, agent relationships) often drive the majority of volume, and digital channels look better in last-click than they actually perform — exactly the scenario where MMM catches what attribution misses.

---

## The Honest Answer on Data Infrastructure

The matrix above assumes you have clean data. In practice, most companies spend 40–60% of their measurement engagement on data preparation: assembling spend data from multiple agencies and platforms, normalizing to a common taxonomy, matching spend to weekly business outcomes, and flagging promotional events, pricing changes, and external shocks that need to be controlled.

Before deciding which methodology to adopt, answer these questions:

1. **Do you have 3 years of weekly spend data across all channels in one place?** If not, that's the first project.
2. **Is your revenue or outcome data available at weekly granularity, by market?** Monthly aggregates make MMM significantly less precise.
3. **Are your promotional events, pricing changes, and distribution changes documented?** The model will find these as anomalies and attribute them incorrectly to media unless they're flagged.
4. **Do you have consistent channel taxonomy across agencies?** "Paid social" means different things to different agencies — Facebook-only at one, Facebook + TikTok + Pinterest at another.

If you can answer yes to all four, you're ready to run a meaningful MMM. If not, the data infrastructure project is the higher-value investment.

---

## A Note on Robyn vs. Meridian

Both are open-source MMM frameworks worth knowing about. Robyn (Meta, open-sourced 2021) uses geometric adstock decay and a frequentist optimization approach — it's faster to run and easier to interpret. Meridian (Google, open-sourced 2024) uses Bayesian inference with Weibull temporal carryover, which can express the delayed peak response that awareness channels (TV, podcast) often show. The practical difference: if your media mix is heavily weighted toward brand and awareness channels with delayed response curves, Meridian's more flexible temporal model will be more accurate. For performance-heavy mixes, Robyn's faster iteration cycle is often more valuable than Meridian's statistical precision.

Neither replaces judgment about what to put in the model. The methodology is 20% of the work. The other 80% is data quality, model specification, and calibration — and that's where most MMM programs fail.
