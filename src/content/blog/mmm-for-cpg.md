---
title: "MMM for CPG: The Canonical Case and Where It Still Goes Wrong"
description: "CPG is the industry that made media mix modeling famous. It's also the industry where most MMM programs quietly fail because of bad data inputs, promotional contamination, and distribution changes that look like media effects. Here's what a rigorous CPG MMM actually requires."
date: 2026-05-20
readTime: "10 min"
keywords: ["CPG marketing measurement", "media mix modeling CPG", "MMM FMCG", "marketing attribution CPG", "adstock decay", "saturation curves", "Robyn CPG", "promotional lift measurement"]
author: "Angshuman Rudra"
---

CPG is where media mix modeling was invented, and for good reason. The category has the properties that make MMM work well: high purchase frequency producing stable weekly sales signals, meaningful variation in media spend across channels, long histories of TV and offline investment where last-click is structurally useless, and decades of agency relationships generating the kind of spend data that feeds a model.

But CPG is also the category where the gap between what MMM promises and what most programs actually deliver is largest. The models run. The coefficients get estimated. The output deck goes to the CMO. And the recommendations quietly don't match reality — not because MMM is wrong for CPG, but because the data inputs are almost always messier than the methodology requires.

Here's what a rigorous CPG MMM actually requires, and where the typical program cuts corners.

---

## Why CPG Is the Right Category for MMM

Before getting to the failure modes, it's worth being explicit about why CPG is well-suited to MMM in the first place.

**Purchase frequency creates dense outcome signals.** A weekly sales series for a CPG brand has real information in it — enough variation week over week to identify how media correlates with sales changes. Compare this to automotive, where a weekly sales series at the model level can be thin enough that a single dealership having a good weekend distorts the signal. CPG weekly scanner data or shipment data gives you a stable, reliable outcome variable.

**Offline channels dominate the media mix.** At most CPG spends, TV, out-of-home, and in-store promotion represent the majority of the budget. These channels have no click stream, no impression-level identity, and no direct conversion tracking. Last-click attribution gives them zero credit. MMM is the only methodology that can estimate their contribution.

**Long enough history exists.** Most large CPG brands have been running consistent media programs for long enough to have 3–5 years of weekly spend data — the minimum for a reliable MMM. Many have 10+ years. That history matters: it's what allows the model to separate the seasonal effect of holiday demand from the media effect of a Q4 spending surge.

---

## The Adstock Problem: Why TV Spend This Week Affects Sales Next Month

The most important concept in CPG MMM — and the one most often undersimplified — is adstock decay.

When you run a TV campaign, its effect on sales doesn't disappear the moment the ads stop airing. Brand awareness created this week persists into next week, and the week after, at diminishing strength. Shoppers who were exposed to your campaign but didn't buy immediately are more likely to buy the next time they're in the cereal aisle. This carryover effect is what adstock modeling captures.

<div style="overflow-x: auto; margin: 2rem 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;font-family:system-ui,sans-serif;">
  <rect width="680" height="300" fill="#0f1117" rx="8"/>
  <text x="340" y="28" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="600">Adstock Decay: How a Single Week of TV Spend Carries Forward</text>

  <!-- Axes -->
  <line x1="60" y1="240" x2="620" y2="240" stroke="#334155" stroke-width="1"/>
  <line x1="60" y1="60" x2="60" y2="240" stroke="#334155" stroke-width="1"/>

  <!-- X labels -->
  <text x="340" y="268" text-anchor="middle" fill="#64748b" font-size="11">Weeks after spend</text>
  <text x="80" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">0</text>
  <text x="160" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">2</text>
  <text x="240" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">4</text>
  <text x="320" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">6</text>
  <text x="400" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">8</text>
  <text x="480" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">10</text>
  <text x="560" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">12</text>

  <!-- Y label -->
  <text x="18" y="155" text-anchor="middle" fill="#64748b" font-size="11" transform="rotate(-90,18,155)">Effective adstock</text>
  <text x="52" y="244" text-anchor="end" fill="#94a3b8" font-size="10">0%</text>
  <text x="52" y="180" text-anchor="end" fill="#94a3b8" font-size="10">25%</text>
  <text x="52" y="120" text-anchor="end" fill="#94a3b8" font-size="10">50%</text>
  <text x="52" y="65" text-anchor="end" fill="#94a3b8" font-size="10">100%</text>

  <!-- Gridlines -->
  <line x1="60" y1="180" x2="620" y2="180" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="60" y1="120" x2="620" y2="120" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- TV (θ=0.61, slow decay) -->
  <!-- Points: week 0=100%, 1=61%, 2=37%, 3=23%, 4=14%, 5=8.5%, 6=5.2%, 7=3.2%, 8=1.9% -->
  <polyline points="80,65 120,109 160,146 200,170 240,186 280,196 320,202 360,206 400,209 440,211 480,212 520,213 560,213 600,213" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <text x="380" y="82" fill="#60a5fa" font-size="11">TV / Linear (θ = 0.61)</text>
  <text x="380" y="96" fill="#64748b" font-size="10">61% of awareness carries to next week</text>

  <!-- Digital display (θ=0.35, fast decay) -->
  <!-- Points: week 0=100%, 1=35%, 2=12%, 3=4%, 4=1.5% -->
  <polyline points="80,65 120,163 160,206 200,219 240,224 280,226 320,227 360,228 400,228 440,228" fill="none" stroke="#34d399" stroke-width="2.5"/>
  <text x="380" y="136" fill="#34d399" font-size="11">Digital display (θ = 0.35)</text>
  <text x="380" y="150" fill="#64748b" font-size="10">Fast decay — effect mostly in-week</text>

  <!-- Paid social (θ=0.20) -->
  <polyline points="80,65 120,193 160,220 200,228 240,231 280,232" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="200" y="185" fill="#f59e0b" font-size="11">Paid social (θ = 0.20)</text>

  <!-- Spend week marker -->
  <line x1="80" y1="60" x2="80" y2="245" stroke="#475569" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="82" y="250" fill="#64748b" font-size="9">spend week</text>
</svg>
</div>

The decay parameter θ determines how much of last week's adstock carries into this week. TV typically decays slowly (θ = 0.55–0.65 for awareness campaigns), meaning 55–65% of the brand awareness from one week's airing persists into the next. Digital channels decay faster — paid social at θ = 0.20 means most of the effect is within the spend week.

Why this matters practically: if you run your MMM without adstock transformation — just raw spend as the input — you'll underestimate TV's contribution, because you're comparing raw spending weeks against sales outcomes without accounting for the awareness that carries forward. The model sees a week of high TV spend and a mediocre sales week (the purchase effect comes later) and concludes TV doesn't work. This is one of the most common ways CPG MMMs produce wrong outputs.

---

## The Three Data Problems That Break CPG MMM

**1. Promotional events treated as media effects**

In CPG, promotional activity — price reductions, feature/display at retail, BOGOs, TPRs (temporary price reductions) — often drives more short-term sales variance than media. A 20% in-store price reduction during a retailer promo week will spike scanner data. If that week happens to coincide with a TV flight, the model will attribute the spike to TV.

The fix is to include promotional variables explicitly in the model — a binary flag for in-store promotion, a continuous variable for price index, and where possible, a feature/display variable from POS data. This requires your promotions team and your measurement team to be talking to each other, which is rarer than it should be.

**2. Distribution changes that look like media effects**

When a CPG brand expands distribution — adding a new retailer, increasing facings at existing accounts, expanding from regional to national — sales grow. If that distribution expansion coincides with a media investment, the MMM will attribute the distribution-driven sales growth to media. You'll conclude your campaign worked when the campaign was largely irrelevant.

Distribution changes need to be flagged explicitly in the model — ideally as a continuous variable representing ACV (All Commodity Volume) weighted distribution, so the model can control for it. Most brands have this data in their syndicated POS reports. Few include it in their MMM.

**3. Missing the competitive spend context**

Your sales don't respond to your media spend in isolation — they respond to your share of voice relative to competitors. If you double your TV spend in Q3 but so does every competitor, your relative position hasn't changed and your incremental lift will be minimal. If a competitor goes dark in Q2, your apparent lift from holding spend constant looks high — but it's driven by their absence, not your presence.

Competitive spend data (typically from Nielsen Ad Intel or a similar syndicated source) should be included in the model wherever possible. At minimum, competitive activity should be flagged as a variable during known competitive events. Most CPG MMMs omit this entirely because the data is expensive, and then produce overconfident coefficient estimates.

---

## The Saturation Curve: Where Most Brands Actually Are

The other essential concept for CPG MMM is channel saturation. Every channel has a response function — a relationship between spend level and sales impact — and that response function is not linear. It saturates.

At low spend levels, incremental dollars are highly efficient — you're reaching new people who haven't seen your message. At high spend levels, you're reaching people who've already been exposed multiple times, and incremental dollars produce diminishing returns. The saturation curve describes this relationship.

In practice, most large CPG brands are operating at or past the half-saturation point on their largest channels — the spend level at which you're getting 50% of maximum possible response. The implication: the marginal return on incremental spend in those channels is lower than the average return. Last-click ROAS, which uses average returns, systematically overstates the value of increasing spend in already-saturated channels.

The budget optimizer built on top of MMM saturation curves can typically identify 15–25% revenue uplift from reallocation of the same total budget — not from spending more, but from moving money from oversaturated to undersaturated channels. For a brand spending $80M, that's a $12–20M opportunity. This is the number that gets finance's attention.

---

## What a Rigorous CPG MMM Requires

**Data inputs:**
- 3–5 years of weekly spend data across all channels, broken down to channel level (not just "digital" but search, social, display, video separately)
- Weekly scanner or shipment data as the outcome variable — unit sales or revenue, not shipments if there's inventory volatility
- Weekly promotional variables: price index, TPR flags, feature/display flags by major retailer
- ACV-weighted distribution data, weekly
- Seasonal indices and holiday flags
- Competitive spend data for top 2–3 competitors (strongly recommended, often omitted)

**Model specification decisions that matter:**
- Adstock transformation before entering spend variables (not optional)
- Saturation transformation (Hill function or log) to capture diminishing returns
- Channel-specific decay parameters — don't apply the same θ to TV and paid social
- Promotion variables modeled separately from media variables

**Calibration:**
The output of Robyn or a custom MMM should be calibrated against external evidence where it exists — geo holdout experiments, brand lift studies, causal inference on channel-off periods. A model that's never been validated against an experiment should be treated as a directional guide, not a ground truth. The calibration step is what separates a credible program from a slide deck.

---

## The CPG Measurement Stack in Practice

For a brand spending $30M–$150M annually, the right measurement architecture:

| Layer | Tool | Cadence | Purpose |
|---|---|---|---|
| Foundation | MMM (Robyn or Meridian) | Quarterly | Strategic budget allocation |
| Calibration | Geo holdout experiments | 2–3 per year | Validate MMM on key channels |
| Tactical | Platform measurement (Meta lift, Google conversions) | Ongoing | Within-campaign optimization |
| Leading indicator | Brand health tracking | Quarterly | Early signal on awareness/consideration |

MMM answers the strategic question: how should we split our annual budget across TV, digital, trade, and shopper marketing? Platform measurement answers the tactical question: which creative is working within our Meta campaign this week? They're complementary, not competing.

The mistake most CPG brands make is using the tactical layer (platform metrics) to answer the strategic question (budget allocation). The result is a systematic shift of budget toward channels that are easy to measure — digital, search, performance — and away from channels that are hard to measure but often more effective at building long-term brand equity.

The MMM, done properly, is the corrective. It's not a perfect instrument. But for CPG at scale, it's the best available answer to the question that actually matters: across all the places we spend money, where does the next dollar go?
