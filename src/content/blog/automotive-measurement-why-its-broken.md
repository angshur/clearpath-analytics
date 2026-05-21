---
title: "Why Automotive Measurement Is Harder Than Anything Else"
description: "Automotive at $50M media spend sits at the intersection of every measurement problem simultaneously: multi-year purchase cycles, fractured OEM/dealer attribution, geo experiment contamination, and MTA that can't see the top of the funnel. Here's what actually works."
date: 2026-05-20
readTime: "11 min"
keywords: ["automotive measurement", "media mix modeling", "MMM automotive", "OEM measurement", "dealer attribution", "marketing measurement", "incrementality testing", "auto industry advertising"]
author: "Angshuman Rudra"
---

Every industry has hard measurement problems. Automotive has all of them simultaneously.

Multi-year purchase cycles that make last-click attribution structurally useless. A fractured OEM/dealer spending relationship where three separate parties claim credit for the same conversion. Geo experiments that get contaminated by inventory constraints and competitor activity. MTA that can only see the last 2% of a 4-year customer journey.

If you work on automotive marketing measurement, you know that every methodology that works cleanly in other industries runs into at least one fundamental problem in your vertical. This is a post about why, and what the imperfect-but-honest toolkit actually looks like.

---

## The Purchase Cycle Problem Is Structural

The median car purchase cycle is somewhere between 3 and 7 years, depending on the segment. This is not a data problem or a methodology problem — it's a structural fact about the category that breaks every attribution model built for shorter cycles.

Last-click attribution gives 100% credit to whichever ad or touchpoint immediately preceded conversion. For a car purchase, that means the dealer's display retargeting ad that someone clicked on Tuesday morning gets full credit for a purchase that was 4 years in the making. The TV campaign that first put the model on the consideration list, the YouTube comparison video they watched 18 months ago, the test drive email sequence from last spring — none of these show up in a last-click model. They're invisible.

This isn't just a measurement accuracy problem. It's a strategic allocation problem. Last-click systematically undervalues brand and awareness investment and overvalues bottom-funnel direct response. Brands that optimize to last-click signals over time gradually defund the awareness spend that creates future consideration sets. The effect isn't visible in the short term — ROAS looks good — but brand health erodes and the pipeline of in-market buyers starts to shrink, usually 2–3 years later.

**What the adstock math actually requires:** To model the full carryover effect of brand investment in automotive, you need adstock decay parameters that span years, not weeks. A standard Robyn implementation with a 52-week lookback is capturing approximately the last 15% of the causal chain. Meridian's Weibull temporal carryover model is more flexible here, but even it is typically run on 3–5 years of data. The honest answer is that capturing the full brand → consideration → purchase arc in automotive requires historical data and model specifications that most teams aren't set up to run.

---

## The OEM / Dealer Attribution Fracture

This is the issue that kills more automotive measurement programs than any technical modeling challenge.

<div style="overflow-x: auto; margin: 2rem 0;">
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:system-ui,sans-serif;">
  <rect width="700" height="320" fill="#F0EBE1" rx="8"/>

  <!-- Customer journey arrow -->
  <text x="350" y="26" text-anchor="middle" fill="rgba(28,25,23,0.55)" font-size="12">Who gets credit for this purchase?</text>

  <!-- Three spend pools -->
  <rect x="30" y="50" width="180" height="80" fill="rgba(29,78,216,0.07)" rx="6" stroke="#1D4ED8" stroke-width="1.5"/>
  <text x="120" y="76" text-anchor="middle" fill="#1D4ED8" font-size="12" font-weight="600">OEM National</text>
  <text x="120" y="94" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">TV, streaming, search</text>
  <text x="120" y="110" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">brand campaigns</text>
  <text x="120" y="126" text-anchor="middle" fill="rgba(28,25,23,0.55)" font-size="10">Tracked by: OEM agency</text>

  <rect x="260" y="50" width="180" height="80" fill="rgba(29,78,216,0.07)" rx="6" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="350" y="76" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">Regional Dealer Assoc.</text>
  <text x="350" y="94" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">Regional TV, radio,</text>
  <text x="350" y="110" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">OEM co-op funded 50–70%</text>
  <text x="350" y="126" text-anchor="middle" fill="rgba(28,25,23,0.55)" font-size="10">Tracked by: regional agency</text>

  <rect x="490" y="50" width="180" height="80" fill="rgba(29,78,216,0.07)" rx="6" stroke="#4D7C5F" stroke-width="1.5"/>
  <text x="580" y="76" text-anchor="middle" fill="#4D7C5F" font-size="12" font-weight="600">Individual Dealer</text>
  <text x="580" y="94" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">Local search, display,</text>
  <text x="580" y="110" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">retargeting, direct mail</text>
  <text x="580" y="126" text-anchor="middle" fill="rgba(28,25,23,0.55)" font-size="10">Tracked by: dealer CRM</text>

  <!-- Arrows down to conversion -->
  <line x1="120" y1="130" x2="350" y2="220" stroke="#1D4ED8" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>
  <line x1="350" y1="130" x2="350" y2="220" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>
  <line x1="580" y1="130" x2="350" y2="220" stroke="#4D7C5F" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>

  <!-- Conversion box -->
  <rect x="250" y="220" width="200" height="50" fill="rgba(217,119,6,0.08)" rx="6" stroke="#D97706" stroke-width="1.5"/>
  <text x="350" y="242" text-anchor="middle" fill="#D97706" font-size="12" font-weight="600">Dealership Sale</text>
  <text x="350" y="260" text-anchor="middle" fill="rgba(28,25,23,0.55)" font-size="10">DMS records conversion</text>

  <!-- Three claim arrows back up -->
  <text x="160" y="195" fill="#1D4ED8" font-size="10" text-anchor="middle">claims credit</text>
  <text x="350" y="210" fill="#7C3AED" font-size="10" text-anchor="middle">claims credit</text>
  <text x="540" y="195" fill="#4D7C5F" font-size="10" text-anchor="middle">claims credit</text>

  <!-- Bottom note -->
  <text x="350" y="298" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">Each party's measurement shows positive ROI. None has visibility into the others' spend.</text>
  <text x="350" y="312" text-anchor="middle" fill="rgba(28,25,23,0.4)" font-size="10">All three claiming the same conversion is arithmetically impossible.</text>
</svg>
</div>

The OEM runs national brand campaigns — TV, streaming, search brand terms — measured by their agency using MMM at the national level. The regional dealer association runs campaigns funded 50–70% by OEM co-op money, measured by a separate regional agency. The individual dealer runs their own direct-response campaigns — local search, display, retargeting — tracked in their dealer management system (DMS).

When someone buys a car, all three of these parties have a financial interest in claiming that conversion. And critically, none of them has visibility into the others' data. The OEM's MMM sees national spend and national sales volume. The regional agency sees regional spend and regional registrations. The dealer sees their digital touchpoints and the signed contract.

Run the three measurement programs independently and you'll reliably find that each one shows positive ROI. This is not because the math is wrong — it's because each model is counting the same conversion multiple times without knowing it. The fundamental problem is that the measurement architecture is as fractured as the spending architecture.

The direction the sophisticated players are moving: joint measurement programs that pool spend data across OEM and top dealer groups, so at least the largest attribution units are modeled together. Running separate MMMs for the top 20 dealer groups — which collectively represent enough sales volume to be statistically meaningful — gives you local signal the national model can't see, while using the same outcome data.

---

## Why Geo Experiments Fail Cleanly Here

Geo holdout experiments are the gold standard for incrementality measurement. Turn off spend in a test market, keep it running in matched control markets, observe the difference. In most industries this is tractable if executed carefully. In automotive it runs into three specific problems.

**Inventory contamination.** Dealerships don't have uniform inventory. If you turn off media in Phoenix and Phoenix dealers happen to be low on the popular trim levels that month, your sales decline isn't from the media blackout — it's from supply constraints. Your experiment is confounded before you've collected a single data point, and you typically don't know this until after the test is over. Vehicle inventory is notoriously volatile and is not distributed uniformly across markets.

**Conquest vs. loyalty dynamics.** A meaningful share of automotive purchases are conquest — someone switching from a competitor brand. Geo holdout experiments can't separate "our media went dark" from "the competitor ran an aggressive conquest campaign in that market this quarter." In packaged goods, a media-dark market and a control market typically face similar competitive conditions. In automotive, competitor spend patterns are active and targeted, and a media-dark market can look attractive to a competitor running conquest. Your holdout produces a biased estimate.

**Dealer autonomy.** Dealers are independent businesses. You can instruct Phoenix dealers to reduce co-op spend for a test period, but you cannot prevent them from backfilling with their own budget. Many will, because their Q3 sales targets don't care about your measurement protocol. This poisons the holdout — you measure the effect of "reduced OEM support" rather than "total media reduction."

None of these problems are fatal. But they mean that geo experiments in automotive require significantly more design rigor than in other categories — longer test periods, more control markets, pre-test inventory matching, and explicit accounting for dealer top-up behavior. A two-month, two-market holdout that works fine for a CPG brand will produce unreliable results in automotive.

---

## The MTA Dead End

Multi-touch attribution requires three things: a connected identity graph linking impressions to people, conversion data that can be matched back to those people, and a reasonable coverage rate across the purchase path.

Automotive fails on all three.

The conversion happens in a physical dealership and is recorded in a DMS that pre-dates modern data infrastructure. Matching a DMS sale record back to digital impressions requires either a form submission during the research process (test drive requests, configure-and-price tools) — which captures roughly 20% of buyers — or a third-party data match that is increasingly unreliable post-iOS 14 and essentially non-functional in Safari. The other 80% of the purchase path is invisible to any MTA system.

Even in the 20% where you achieve the match, you're matching on the last few digital touchpoints in a 3–7 year journey. The model sees the bottom 5% of the funnel and is asked to explain the whole purchase. The resulting attribution weights are not just inaccurate — they encode a specific systematic bias: channels that appear at the bottom of the funnel (search, retargeting, dealer display) look better than they actually perform, and channels that appear at the top (TV, streaming, audio) look worse.

MTA is not a useful tool for automotive budget allocation decisions. It has some utility for within-channel campaign optimization at the dealer level — which search ad drove the test drive booking — but it cannot answer the question of how to split budget between brand and activation, between national and regional, or between above-the-line and below-the-line spend.

---

## What Actually Works

The honest answer is a combination of imperfect instruments used together, with explicit acknowledgment of what each can and cannot tell you.

**MMM as the foundation — but built right for automotive.**

Standard MMM with a 52-week lookback will understate the brand investment contribution because it misses the multi-year carryover effect. The right specification:
- 4–5 years of weekly data minimum (most brands don't have this clean, so this becomes a data engineering project first)
- Separate models for brand spend (TV, streaming, awareness) and activation spend (dealer local, search, direct response) — different response functions, different adstock parameters, don't conflate them in a single model
- Weibull temporal carryover for brand channels rather than geometric adstock — you need to be able to express a response curve that peaks 2–4 weeks after the spend, not one that only decays from the spend week
- Vehicle launch events, incentive periods, and inventory constraints flagged explicitly as model variables

**Brand tracking surveys as load-bearing, not supplementary.**

In most categories, brand tracking is a nice-to-have that tells you something you already knew. In automotive, because the purchase cycle is so long, brand health metrics are the primary leading indicator of future sales performance. Share of consideration among in-market buyers is a better predictor of quarterly sales than any attribution model output. If your consideration score is declining among households that will enter market in the next 12 months, no amount of bottom-funnel optimization will save your numbers. Run brand tracking at least quarterly, segment by purchase timeline, and treat it as a core measurement output alongside MMM.

**Dealer-level MMM for the largest dealer groups.**

The top 20 dealer groups in any OEM system represent enough volume to support their own MMM. Running separate models at this level gives you local signal — which markets are media-saturated, where incremental spend is actually incremental — that the national model aggregates away. It also gives you a mechanism to attribute the OEM / dealer / regional spend without counting the same conversion across all three models.

**Targeted geo experiments with appropriate design.**

Geo holdouts still have value, but they need to be designed for automotive's specific constraints: 12-week minimum test duration, 8+ control markets per test market (automotive sales are noisy enough that you need more statistical power than other categories), pre-test inventory matching, and a plan for how to account for dealer top-up behavior. Use them for calibrating MMM outputs on your highest-uncertainty channels — typically streaming and audio, where measurement is weakest — rather than as a primary measurement tool.

---

## The $50M Question

The $50M spend level is where these constraints bite hardest. It's enough to see the problem clearly but not enough to fund the full measurement stack needed to solve it.

A tier-1 OEM at $500M national spend can fund a brand tracking panel across 50 markets, proprietary MMM with a dedicated data science team, geo experiments running continuously in multiple markets, and a dealer-level analytics program. The measurement infrastructure itself is a meaningful line item.

At $50M — a mid-tier OEM brand or a large regional dealer group — you have to choose. The highest-value investment, in rough priority order:

1. **Data infrastructure first.** Get 4 years of weekly spend and weekly sales in one place before commissioning an MMM. The data preparation will take longer than you expect and cost more than you budgeted.
2. **MMM as the core.** Accept the limitations. A well-specified MMM with 4 years of data and proper brand/activation separation will still tell you materially more useful things than last-click attribution.
3. **Brand tracking at minimum quarterly.** One consistent survey instrument run consistently is more valuable than three different studies run inconsistently.
4. **Geo experiments selectively.** One well-designed test per year on your highest-uncertainty channel is better than quarterly tests that produce unreliable results.

The thing to resist is the impulse to run MTA and call the resulting numbers your measurement foundation. In automotive, MTA is a flattering mirror that shows you what you want to see — bottom-funnel performance looking strong — while the brand health that creates future purchase consideration quietly erodes. The measurement approach that's easy to implement is usually the one that's most misleading in this category.
