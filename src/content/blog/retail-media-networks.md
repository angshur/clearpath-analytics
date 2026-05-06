---
title: "What Retail Media Networks Actually Are — And Why They're the Measurement Problem Nobody Has Solved"
description: "Retail media is the fastest-growing ad channel in the industry. It's also the one where measurement is most conflicted, most opaque, and most in need of an independent infrastructure layer."
date: 2026-05-06
keywords: ["retail media networks", "RMN", "measurement", "clean rooms", "first-party data", "commerce media"]
---

Every major retailer now has an advertising business. Amazon built the model. Walmart followed. Then Kroger, Target, Home Depot, Instacart, CVS, Ulta, Best Buy. The category has a name — Retail Media Networks, or RMNs — and it has grown faster than any other channel in digital advertising over the past five years.

The reason is straightforward: retailers have something nobody else has. They know what you bought. Not what you searched for, not what content you consumed, not what you clicked on — what you actually purchased, at what price, in what category, at what frequency. That purchase signal is the most valuable targeting and measurement asset in advertising because it closes the loop that every other channel leaves open.

But the measurement of retail media is deeply conflicted. The retailer owns the ad platform, the audience data, and the transaction data that proves the campaign worked. They report ROAS using their own methodology, with attribution windows they define, against conversion events they track. The advertiser has no independent view of whether any of it is true.

This is the same walled garden problem that exists with Google and Meta — but with one important difference. In retail media, the retailer is also the store. The conflict of interest isn't just about media attribution. It's about whether the brand's media spend is driving incremental sales or subsidizing purchases that were going to happen anyway.

## What a Retail Media Network Actually Is

A Retail Media Network is an advertising platform built on top of a retailer's first-party data and properties. It has three components:

**Onsite inventory** — ad placements within the retailer's own digital properties. Sponsored product listings on Amazon. Banner ads on Walmart.com. Featured placements in the Kroger app. This is inventory the retailer controls directly and can sell to brands at a premium because the user is in an active shopping mindset.

**Offsite activation** — extending the retailer's audience data to advertising outside their own properties. A brand can target Kroger loyalty card holders on The Trade Desk or on Meta, using Kroger's purchase data as the targeting signal. The retailer doesn't show you the raw customer data — they create audience segments and push them to DSPs and social platforms via clean room or data collaboration infrastructure.

**Closed-loop measurement** — the retailer connects ad exposure to actual purchase transactions. Because they own the point of sale — online and often offline — they can tell a brand that customers who saw their ad bought 23% more in the following 30 days than customers who didn't. This is the core value proposition: deterministic closed-loop attribution using actual purchase data.

That third component is both the most valuable and the most conflicted.

## The Measurement Conflict

When Amazon tells a brand that their Sponsored Products campaign generated a 4.2x ROAS, that number is calculated by Amazon, using Amazon's attribution model, with Amazon's conversion window, crediting Amazon's ad exposure, against transactions that occurred on Amazon's platform.

Every one of those inputs is controlled by the party with a financial interest in the outcome.

This doesn't mean the number is wrong. Amazon's measurement methodology is more sophisticated than most brands could build themselves, and their closed-loop purchase data is genuinely valuable. But it does mean the brand cannot independently verify the number, cannot audit the attribution logic, and cannot compare it on an apples-to-apples basis with measurement from other channels.

The specific problems:

**Attribution window inflation.** Most RMNs use a 14-day or 30-day attribution window for purchase credit. A customer who bought detergent 28 days after seeing a sponsored listing was probably going to buy detergent regardless — it's a replenishment purchase. The attribution window counts it as a media-driven conversion. The brand's actual incrementality from that impression may be close to zero.

**Halo effect overcounting.** Some RMNs attribute conversions across the entire brand portfolio when a customer saw an ad for any product in the portfolio. An ad for Brand X's shampoo drives a customer to buy Brand X's conditioner — the conditioner purchase is counted as a media conversion even though the ad didn't feature the conditioner.

**Baseline suppression.** The most sophisticated measurement problem: because DSP targeting within retail media is optimized toward likely purchasers, the exposed group is already more purchase-ready than the unexposed group before the campaign runs. The measured lift includes the DSP's targeting intelligence, not just the media's persuasive effect. Separating those two effects requires a pre-planned holdout — which most RMN measurement programs don't include.

## The Three Layers of Retail Media Data

Understanding why measurement is hard requires understanding what data actually exists and who controls it.

**Layer 1 — Transaction data (retailer owns)**

Every loyalty card swipe, every app purchase, every online order. This is the ground truth of purchase behavior. It is the most valuable data asset in the ecosystem and it never leaves the retailer's environment without the retailer's explicit decision to share it.

**Layer 2 — Exposure data (retailer owns for onsite, shared for offsite)**

For onsite placements, the retailer's own ad server logs every impression. They control the exposure log completely.

For offsite placements — ads served on third-party publishers using retailer audience data — the exposure log lives with the DSP or publisher. The retailer knows which audience segments they pushed to the DSP. They don't always know exactly which impressions were served to which users.

**Layer 3 — Brand first-party data (brand owns)**

The brand's CRM, their DTC purchase history, their loyalty program data, their website behavioral data. This is the data the brand brings into any measurement conversation.

The measurement problem is that Layers 1 and 2 live with the retailer and Layer 3 lives with the brand. Connecting them for independent measurement requires a privacy-safe data collaboration infrastructure — a clean room — where neither party has to expose raw records to the other.

## How Clean Rooms Change the Retail Media Measurement Picture

A clean room in the retail media context allows a brand to ask: of my CRM customers, how many were exposed to my campaign on this retailer's network, and what was their purchase rate versus the unexposed group?

The mechanics: the brand brings their CRM — keyed on a shared identity token, typically a hashed email matched via RampID or the retailer's own identity graph — into the clean room. The retailer brings their exposure log and transaction data. The clean room joins them on the matched identity tokens, computes exposed vs. unexposed conversion rates, and returns the incremental lift — without the brand seeing the retailer's raw transaction data and without the retailer seeing the brand's raw CRM.

The result is measurement that the brand owns, based on a methodology they can audit, using a comparison group they understand.

Three things change when you have this infrastructure:

**You can see the baseline.** The clean room shows you not just what exposed customers did, but what similar unexposed customers did. When a retailer reports 4.2x ROAS and your clean room shows 1.3x incremental ROAS, that gap tells you how much of the reported performance was organic purchase behavior rather than media-driven incremental sales.

**You can measure across the full customer portfolio.** The retailer's closed-loop measurement only sees what happens on their platform. If a campaign on Walmart's RMN drove customers to buy the same product at Target or on the brand's DTC site, the Walmart measurement misses all of it. Your clean room, built on your own CRM and transaction data, captures total customer behavior — on and off the retailer's platform.

**You can compare across RMNs.** Amazon's ROAS methodology and Walmart's ROAS methodology are not the same. Your own clean room measurement applies a consistent methodology across all your retail media spend, enabling an honest budget allocation conversation.

## What the Architecture Looks Like

A brand building independent retail media measurement needs three things in their data infrastructure:

**First-party data foundation.** A clean, governed, consistently updated CRM with email-based identity that can be hashed and matched against retailer identity graphs. The quality of this foundation determines the match rate — the percentage of retailer exposures you can actually connect to your customer records. A poorly maintained CRM produces a 30% match rate. A well-governed CRM with regular deduplication and validation produces 65–80%.

**Clean room infrastructure.** A governed environment where your CRM can be joined to retailer exposure and transaction data without raw record exchange. Snowflake's Data Clean Room is the primary enterprise solution, but the right choice depends on which retailer networks you're working with and what identity infrastructure they've already built.

**Consistent measurement methodology.** Pre-campaign holdout design, standardized attribution windows, consistent conversion event definitions across all RMN partners. This requires the brand's marketing science team, their media agency, and their data infrastructure team to agree on methodology before any campaign launches, not after.

## The Brands Getting This Right

The brands building independent retail media measurement infrastructure share a common pattern: they started with their data foundation before they started with the measurement program. They invested in CRM hygiene, identity resolution, and first-party data governance first — which meant that when they went to build clean room measurement, the match rate was high enough to produce defensible results.

The brands still relying entirely on retailer-reported ROAS let the measurement conversation be led by the retailer's account team, accepted the attribution methodology that came with the ad platform, and are now in a position where they can't tell their CFO how much of their retail media spend is driving real incremental revenue versus subsidizing purchases that were going to happen regardless.

The gap between those two groups is widening. The infrastructure to close it is available. The question is whether the brand's data and analytics team has the organizational mandate to build it before the next budget cycle.
