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
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;font-family:system-ui,sans-serif;display:block;">
  <rect width="680" height="300" fill="#F0EBE1" rx="8"/>
  <text x="340" y="26" text-anchor="middle" fill="#1C1917" font-size="13" font-weight="600">Adstock Decay: How a Single Week of TV Spend Carries Forward</text>

  <!-- Axes: y=46(100%) to y=248(0%), range=202px; x=68 to x=620 -->
  <line x1="68" y1="248" x2="624" y2="248" stroke="rgba(28,25,23,0.2)" stroke-width="1.5"/>
  <line x1="68" y1="46" x2="68" y2="248" stroke="rgba(28,25,23,0.2)" stroke-width="1.5"/>

  <!-- Gridlines: 25%=y=198, 50%=y=147, 75%=y=97 -->
  <line x1="68" y1="198" x2="624" y2="198" stroke="rgba(28,25,23,0.08)" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="68" y1="147" x2="624" y2="147" stroke="rgba(28,25,23,0.08)" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="68" y1="97" x2="624" y2="97" stroke="rgba(28,25,23,0.08)" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Y axis labels -->
  <text x="62" y="252" text-anchor="end" fill="rgba(28,25,23,0.45)" font-size="10">0%</text>
  <text x="62" y="202" text-anchor="end" fill="rgba(28,25,23,0.45)" font-size="10">25%</text>
  <text x="62" y="151" text-anchor="end" fill="rgba(28,25,23,0.45)" font-size="10">50%</text>
  <text x="62" y="50" text-anchor="end" fill="rgba(28,25,23,0.45)" font-size="10">100%</text>
  <text x="15" y="152" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10" transform="rotate(-90,15,152)">Effective adstock</text>

  <!-- X axis: week 0 at x=88, each 40px = 1 week -->
  <text x="340" y="274" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="11">Weeks after campaign spend</text>
  <text x="88" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">0</text>
  <text x="168" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">2</text>
  <text x="248" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">4</text>
  <text x="328" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">6</text>
  <text x="408" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">8</text>
  <text x="488" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">10</text>
  <text x="568" y="262" text-anchor="middle" fill="rgba(28,25,23,0.45)" font-size="10">12</text>

  <!-- Spend week marker -->
  <line x1="88" y1="46" x2="88" y2="251" stroke="rgba(28,25,23,0.15)" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="91" y="258" fill="rgba(28,25,23,0.4)" font-size="9">spend</text>

  <!-- Curves: y(v) = 248 - v*202; x(w) = 88 + w*40 -->

  <!-- TV (θ=0.61) — Blue #1D4ED8 -->
  <!-- v per week: 1.000, 0.610, 0.372, 0.227, 0.138, 0.084, 0.051, 0.031, 0.019, 0.012, 0.007, 0.004, 0.002 -->
  <!-- y: 46, 125, 173, 202, 220, 231, 237, 242, 244, 245, 247, 247, 248 -->
  <polyline points="88,46 128,125 168,173 208,202 248,220 288,231 328,237 368,242 408,244 448,245 488,247 528,247 568,248 608,248"
            fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>

  <!-- Digital display (θ=0.35) — Sage #4D7C5F -->
  <!-- v per week: 1.000, 0.350, 0.123, 0.043, 0.015, 0.005, 0.002 -->
  <!-- y: 46, 177, 223, 239, 245, 247, 248 -->
  <polyline points="88,46 128,177 168,223 208,239 248,245 288,247 328,248"
            fill="none" stroke="#4D7C5F" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>

  <!-- Paid social (θ=0.20) — Amber #D97706 -->
  <!-- v per week: 1.000, 0.200, 0.040, 0.008, 0.002 -->
  <!-- y: 46, 208, 240, 246, 248 -->
  <polyline points="88,46 128,208 168,240 208,246 248,248"
            fill="none" stroke="#D97706" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>

  <!-- Legend: upper right — all curves near zero beyond week 6 (x≥328) -->
  <rect x="322" y="52" width="290" height="102" fill="rgba(250,247,242,0.92)" rx="6" stroke="rgba(28,25,23,0.1)" stroke-width="1"/>
  <rect x="332" y="68" width="18" height="3" fill="#1D4ED8" rx="1"/>
  <text x="356" y="74" fill="#1C1917" font-size="11" font-weight="500">TV / Linear  (θ = 0.61)</text>
  <text x="356" y="87" fill="rgba(28,25,23,0.55)" font-size="10">61% of awareness carries each week</text>
  <rect x="332" y="98" width="18" height="3" fill="#4D7C5F" rx="1"/>
  <text x="356" y="104" fill="#1C1917" font-size="11" font-weight="500">Digital display  (θ = 0.35)</text>
  <text x="356" y="117" fill="rgba(28,25,23,0.55)" font-size="10">35% carries — mostly in-week effect</text>
  <rect x="332" y="128" width="18" height="3" fill="#D97706" rx="1"/>
  <text x="356" y="134" fill="#1C1917" font-size="11" font-weight="500">Paid social  (θ = 0.20)</text>
  <text x="356" y="147" fill="rgba(28,25,23,0.55)" font-size="10">20% carries — effect gone in 2 weeks</text>
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
