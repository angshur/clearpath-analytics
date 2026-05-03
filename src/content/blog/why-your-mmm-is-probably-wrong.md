---
title: "Why Your MMM Is Probably Wrong (And What to Do About It)"
description: "MMM outputs get treated as ground truth. They're not. Three specific failure modes that make most media mix models misleading — and how to fix them."
date: 2026-05-03
readTime: "8 min"
keywords: ["media mix modeling", "MMM", "marketing measurement", "marketing attribution", "halo effect", "adstock", "incrementality"]
author: "Angshuman Rudra"
---

Most brands that run a media mix model make the same mistake: they treat the output as a precise answer.

It is not a precise answer. It is a directional signal. And treating it as something more precise than that leads to exactly the kind of bad budget decisions MMM was supposed to prevent.

I've worked with enough marketing and measurement teams to see the same failure modes repeat. Three of them account for most of the damage.

## Failure 1: Confusing Directionality With Precision

Your MMM runs and comes back with something like: Google Search ROI is 3.4x, Meta Prospecting is 1.9x, and Connected TV is 2.7x. The temptation is to optimize to those numbers exactly — shift budget toward Google, pull back on Meta, and find the mathematically optimal allocation.

The problem is that these coefficients have confidence intervals that are rarely communicated and almost never acted on. The "3.4x" for Google might be anything between 2.1x and 4.9x. The "1.9x" for Meta might be 1.2x or 2.8x. At those ranges, the directional ranking still holds — Google is outperforming Meta — but the 1.5x delta you're optimizing around is statistical noise.

**What MMM actually tells you:** which channels are working and which aren't, roughly where you are on each channel's diminishing returns curve, and which categories of spend deserve more or less. It does not tell you the precise dollar figure to allocate to each campaign.

Use it to make strategic calls — move budget from a clearly underperforming channel category to an overperforming one. Don't use it to justify a $3,200 reallocation based on a 0.2x coefficient difference.

The teams that get the most out of MMM treat it as a quarterly strategic input, not a monthly optimization engine.

## Failure 2: Missing the Halo Effect

This is the one that costs brands the most money.

Upper-funnel channels — TV, streaming audio, podcast sponsorships, out-of-home, brand display — do not convert directly. They prime audiences. They build familiarity and intent that makes your lower-funnel channels more efficient. When someone who saw your CTV ad three times searches for your brand on Google, both channels contributed. The CTV ad primed the search. The search closed it.

A naive MMM without proper adstock and cross-channel interaction modeling will systematically undervalue the upper-funnel channel. It sees low direct ROI on CTV and suggests cutting it. You cut it. Three months later your branded search volume drops, your Google ROAS declines, and your cost per acquisition climbs — and nobody connects it back to the CTV cut because the signal is delayed and indirect.

This is not hypothetical. It is the most common way brands accidentally destroy their demand engine while optimizing their attribution report.

**What to look for in your model:** Does it include adstock or carryover effects — the idea that spend in week 1 still has residual impact in weeks 2, 3, and 4? Does it test for cross-channel interaction terms — whether spend in one channel amplifies returns in another? If your MMM vendor or model doesn't explicitly account for these, the upper-funnel channels in your mix are being penalized for doing exactly what they're supposed to do.

Before cutting any brand-building channel based on MMM output, ask: does this model capture the delayed and indirect effects of that channel? If the answer is unclear, run an incrementality holdout before making the call.

## Failure 3: Running Channels That Don't Have Enough Signal

This is the most fixable failure mode, and the least discussed.

MMM is a regression. It estimates the relationship between your spend and your outcomes using historical data. For that estimate to be reliable, the channel needs to have enough spend variation in the historical data — periods where you were spending more, periods where you were spending less — so the model can observe what happens at different levels.

If you've been running a channel at a flat $8,000/month for two years, there's almost no variation for the model to learn from. The coefficient it produces will be unreliable. It might show near-zero ROI. It might show implausibly high ROI. Either way, it's not a trustworthy signal.

The practical rule: if a channel represents less than roughly 5–10% of your total media budget, or if you've never meaningfully varied its spend level, hold it out of your MMM entirely. Test it separately through a geo experiment or user-level holdout. Don't let a noisy, unreliable coefficient for a small channel distort your model's estimates for the channels that actually have enough signal.

**A related version of this problem:** brands that include a channel they just launched six months ago. The model doesn't have enough history. The coefficient is garbage. The conclusion you draw from it is worse than having no data at all.

## What MMM Gets Right

None of this means MMM isn't worth running. It means it's worth running correctly, with clear-eyed expectations about what you're getting.

Done well, MMM gives you three things that no other measurement approach delivers:

**Offline and upper-funnel visibility.** It's the only method that can quantify the contribution of TV, OOH, radio, and sponsorships in the same framework as your digital channels.

**Diminishing returns curves.** It tells you not just that a channel is working, but where you are on the efficiency curve — whether you're in the high-return zone or the flat zone where additional spend generates marginal return.

**Portfolio-level budget guidance.** MMM answers the question attribution can't: "If I have $500K to allocate next quarter, what's the right split across channels?" Attribution tells you which channels got credit for past conversions. MMM tells you where future dollars will work hardest.

The output is directional. It comes with uncertainty. It requires clean, consistent historical data to be trustworthy. And it is most valuable when used to make strategic allocation decisions — not to produce a number that justifies the budget you already wanted to spend.

That distinction — between using MMM as a decision-support tool and using it as a number generator — is what separates teams that actually improve their media ROI from teams that just have a more expensive way of confirming their existing assumptions.
