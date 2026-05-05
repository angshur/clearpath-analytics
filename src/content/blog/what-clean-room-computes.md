---
title: "What a Data Clean Room Actually Computes"
description: "Most brands know what a clean room is. Far fewer know what query actually runs, how the math works, and where the measurement breaks down. That gap is expensive."
date: 2026-05-05
keywords: ["data clean rooms", "marketing measurement", "incrementality", "iROAS", "privacy-safe measurement"]
---

Most brands that have bought a clean room product can tell you what it is. Far fewer can tell you what it actually computes — which query runs, what data joins what, and why the number that comes back means what it means.

That gap is expensive. A clean room ROAS figure that you can't explain to your CFO is worse than no figure at all. It becomes another black box — just one you paid to build yourself.

This post is about closing that gap. By the end, you'll know exactly what SQL logic runs inside a clean room, what it's measuring, and where the measurement can go wrong.

## The Question That Requires a Clean Room

Start with the specific business question: which publisher drove the most incremental sales from my campaign?

This sounds simple. It requires joining three datasets that no single party can assemble alone:

- **Your CRM** — who your customers are, their purchase history, their identity
- **The publisher's exposure log** — which users saw your ads, when, how many times
- **Your transaction data** — who bought something after the campaign ran

The brand has the CRM and transaction data. The publisher has the exposure log. Neither will hand over raw records. The clean room is the only environment where all three can be joined without either party seeing the other's underlying data.

## What the Query Actually Does

The logic runs in three steps.

**Step one: establish who was exposed per publisher.**

The clean room joins your CRM — keyed on a shared identity token, typically a hashed email via LiveRamp's RampID or The Trade Desk's UID2 — against the publisher's impression log for the campaign window. The result is two groups:

- **Exposed group:** CRM customers who had at least one impression from this publisher in the lookback window (typically 30–90 days)
- **Unexposed group:** CRM customers who appear nowhere in that publisher's impression log during the same window

The unexposed group is your control. It's drawn from the same CRM population — same demographics, same purchase history baseline — which is what makes it a meaningful comparison rather than an arbitrary benchmark.

**Step two: join both groups to transaction data.**

Both groups are joined to your transaction data for the post-campaign window (typically 7–30 days after campaign end). The query counts converters — customers who made a purchase — in each group and computes conversion rates.

**Step three: compute incremental lift and iROAS.**

The core calculation:

```
Incremental lift = Exposed CVR − Baseline CVR

iROAS = (Incremental converters × Average order value) ÷ Spend on that publisher
```

Incremental ROAS (iROAS) is the number your CMO cares about. An iROAS of 3.4x means every dollar spent on that publisher generated $3.40 in revenue that would not have occurred without the ad exposure — not revenue you would have captured anyway.

Here's what that output looks like in practice:

| Publisher | Exposed CVR | Baseline CVR | Lift | iROAS |
|---|---|---|---|---|
| Publisher A (CTV) | 4.8% | 2.1% | +2.7pp | 3.4x |
| Publisher B (web) | 3.2% | 2.1% | +1.1pp | 1.5x |
| Publisher C (mobile) | 2.4% | 2.1% | +0.3pp | 0.9x |

Publisher C has a positive nominal ROAS — it drove conversions. But it has a sub-1x iROAS — those customers were going to buy anyway. The spend generated no incremental outcome. Without the clean room comparison, you'd never see that.

## Why k-Anonymity Matters for These Results

Before any result is returned, the clean room applies a k-anonymity threshold — typically a minimum of 25 users in the exposed group. If Publisher D matched fewer than 25 CRM customers, the query returns nothing rather than a number that could be used to reverse-engineer individual identity.

This matters operationally: for niche publishers or narrow audience segments, you may hit k-anonymity suppression regularly. That's not a bug — it's the privacy guarantee working as designed. But it means measurement coverage isn't uniform across your publisher mix. Small publishers will often produce no measurable output even if they drove real outcomes.

## The Three Places This Breaks Down

The query logic is clean. The real-world execution is not. Here's where the analysis fails and why.

**1. Match rate bias**

The exposed group is limited to CRM customers whose identity token appears in the publisher's exposure log. If your RampID match rate is 60%, the remaining 40% of customers are invisible to the analysis.

The problem isn't the missing coverage by itself — it's that the missing 40% may be systematically different from the matched 60%. If older customers, offline-primary buyers, or lower-income segments are less likely to be in your publisher's logged-in user graph, your baseline CVR is calculated on a population that skews younger, more digitally active, and more purchase-ready. Your lift estimate will be inflated — not because your media performed better, but because your sample was biased toward people who were already more likely to convert.

The honest version of any clean room measurement program starts with: "here's our match rate, and here's what we know about who we're missing."

**2. Attention is not counted**

The impression log records that an ad was served. It does not record that a user saw it, read it, or was influenced by it. A 30-second unskippable CTV spot carries fundamentally different attention weight than a 300×250 banner at the bottom of a web page that loaded below the fold.

A rigorous cross-channel iROAS comparison needs to weight impressions by viewability score — data available from verification vendors like IAS or DoubleVerify — before computing the exposed group. Without this, you're comparing apples to thumbnails and attributing lift to the publisher's audience quality when you're actually measuring their inventory quality.

**3. DSP targeting was not random**

This is the most important caveat and the one most brands don't grapple with until they've been doing clean room measurement for a year.

Your DSP did not distribute impressions randomly across your CRM segment. It optimized — it bid more aggressively on users predicted to convert, and it spent less on users who looked like low-probability converters. This means the exposed group is already more purchase-likely than the unexposed group before the campaign launched.

When you observe higher CVR in the exposed group, part of that difference is real media effect. Part of it is the DSP's targeting model selecting the customers most likely to convert. The clean room query cannot distinguish between these two effects.

The only methodologically valid fix requires pre-campaign planning: randomly designate a holdout group before the campaign launches — customers who will be suppressed from seeing your ads entirely — and use that randomly assigned holdout as your baseline. That's incrementality testing with a proper holdout, and it's more causally valid than post-hoc clean room comparison. The clean room is still the measurement environment; the holdout design is what makes it defensible.

## What This Means Practically

Clean room measurement is genuinely better than platform-reported ROAS. It's not perfect.

Used well, it tells you which publishers are generating real incremental lift versus recycling conversions that were happening anyway. That's a significant improvement over last-click attribution or pixel-based ROAS that counts any conversion within a 30-day window.

Used naively — without understanding match rate bias, without viewability weighting, without acknowledging DSP selection bias — it produces confident-looking numbers that overstate media effectiveness and direct budget toward publishers that look productive but aren't.

The standard for good measurement isn't a higher iROAS number. It's understanding exactly what your iROAS number is measuring, what population it's based on, and what it's leaving out.

That understanding is what the clean room vendors are not going to teach you. It's what you need to build internally before the numbers mean anything.
