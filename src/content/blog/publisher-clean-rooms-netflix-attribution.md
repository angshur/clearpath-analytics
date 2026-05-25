---
title: "Publisher Clean Rooms: How Netflix, Amazon, and YouTube Changed TV Attribution"
description: "Netflix's Snowflake clean room and Amazon Marketing Cloud have shifted streaming from a brand-awareness buy to a performance channel. Here's what changed, how the attribution actually works, and what it means for media buyers."
date: 2026-05-24
readTime: "10 min"
keywords: ["Netflix ads", "publisher clean room", "Amazon Marketing Cloud", "AMC", "Google Ads Data Hub", "streaming attribution", "CTV measurement", "connected TV advertising", "deterministic attribution", "Snowflake Data Clean Room"]
author: "Angshuman Rudra"
---

For most of advertising's history, television worked on faith. You bought reach. You trusted that reach created awareness, that awareness created consideration, that consideration eventually converted to purchase. You couldn't close the loop from a specific impression to a specific customer. The best you could do was MMM — a statistical model that estimated TV's contribution to sales over time.

That changed with publisher clean rooms.

Netflix launched its Snowflake-based clean room offering in 2025. Amazon Marketing Cloud has been running since 2021. Google Ads Data Hub since 2018. Together, these publisher-native clean rooms have done something the attribution industry spent a decade trying to accomplish: they give advertisers deterministic, one-to-one attribution on streaming impressions — without either party seeing the other's raw data.

The result, for advertisers who've used them, is that streaming has shifted from a brand-awareness buy to a performance channel. Tinuiti reported cost-per-visit and cost-per-acquisition numbers from Netflix clean room analysis that beat benchmarks from other channels. Some advertisers doubled their Netflix spend after seeing the data. That's not a brand lift story. That's a performance story, and it matters because performance budgets are significantly larger than brand budgets.

Here's how the attribution actually works, what each publisher's clean room offers, and what it means for how media buyers should think about streaming.

---

## What Deterministic Attribution Actually Means

The traditional approach to TV attribution is probabilistic. You observe that your sales go up in markets where you ran TV and don't go up in matched markets where you didn't. Or you run an MMM that estimates TV's incremental contribution using statistical separation of spend signals. Both approaches can tell you that TV works at scale. Neither can tell you that *this specific viewer* saw *this specific ad* and then *became your customer*.

Deterministic attribution works differently. It starts with the publisher's first-party data: their authenticated user base, tied to specific impressions. Netflix knows which users watched which shows, saw which ads, and when. That data is keyed to a stable identifier — an email address or a hashed identity — because users are authenticated when they log in.

The advertiser brings their own first-party data: a CRM or customer file keyed to email addresses. The clean room runs a query that matches the two datasets on the shared key. The output is an overlap analysis: how many users saw the Netflix ad and subsequently appeared in the advertiser's customer data, within what time window, and at what frequency of exposure.

No raw records cross the boundary. The publisher never sees the advertiser's customer list. The advertiser never sees the publisher's user data. The clean room executes the join in a controlled environment that enforces minimum group sizes and aggregated outputs.

The result is not an estimate. It's a count. These are the actual customers who were actually exposed to the actual ads before converting. That's what "deterministic" means — not a model-derived probability, but an observed fact.

---

## Netflix: The New Player With the Right Infrastructure

Netflix's advertising business launched in late 2022. It spent its first two years building audience scale — the minimum needed to make the platform viable for performance advertisers. By 2024, Netflix reported over 40 million monthly active users on its ad-supported tier. In 2025, it launched its in-house ad technology, moving away from Microsoft's ad serving infrastructure, and simultaneously rolled out Snowflake Data Clean Room access for measurement.

The timing is not coincidental. The ad tech build-out and the measurement capability had to come together. You can't sell deterministic attribution using someone else's ad server if you don't control the impression data.

The Netflix clean room architecture works as follows: both parties — Netflix and the advertiser — need to be on Snowflake. Netflix brings impression data (user identifier, ad creative, timestamp, placement context). The advertiser brings conversion data (customer identifier, event type, timestamp). The Snowflake Data Clean Room environment executes the query. The output is an aggregate: reach, frequency, and conversion overlap by campaign, creative, and audience segment.

What advertisers get from this analysis that they couldn't get before:
- **Incremental reach** — what percentage of the people who converted were exposed to Netflix ads and not to the advertiser's other digital channels in the window before conversion
- **Frequency analysis** — is there a diminishing returns curve? At what ad frequency does conversion rate stop improving?
- **Audience segment performance** — which audience segments (by content genre, daypart, device) have the highest conversion rates
- **Cross-channel deduplication** — when the same user is in both Netflix and, say, Meta attribution windows, which channel gets credit

The last one is the most valuable for large advertisers. Multi-publisher clean room matching — where the advertiser runs the same attribution query against multiple publisher datasets — is technically possible but requires the advertiser to orchestrate the join across clean rooms. It's complex, but it's the path to a unified view of media performance.

---

## Amazon Marketing Cloud: The Most Mature Publisher Clean Room

Netflix is new. Amazon Marketing Cloud (AMC) has been running long enough to have established playbooks.

AMC is a SQL-based analytics environment that sits on top of Amazon's ad signal data — Sponsored Products, Sponsored Brands, DSP impressions, and Streaming TV ads. Advertisers bring their own data (CRM files, conversion events) and join them against Amazon's impression data using SQL queries that return aggregated results.

What makes AMC genuinely powerful is the cross-media attribution within the Amazon ecosystem. An advertiser can run a query that asks: "Among users who purchased in the last 30 days, how many were exposed to Sponsored Products, how many to DSP display, how many to Prime Video streaming ads, and how many to some combination?" The answer tells you which media combinations in the Amazon ecosystem drive the highest conversion rates.

**Practical AMC query types:**

- **Path-to-purchase analysis** — the sequence of touchpoints (search ad → display ad → streaming ad → purchase) that converted customers traversed, compared to non-converters
- **Time-to-conversion curves** — at what point after first exposure does the bulk of conversion happen for different product categories
- **Halo effect measurement** — when someone clicks a sponsored product for Brand A and then buys Brand B from the same brand portfolio in the same session
- **Audience overlap with purchase intent signals** — which Amazon audience segments (electronics intenders, grocery purchasers, etc.) have the highest overlap with your existing customer base

The constraint is that AMC only uses Amazon signals on the publisher side. If you want to measure Prime Video's contribution in combination with Netflix or YouTube, you're running separate queries against separate clean rooms and trying to deduplicate manually — which requires having consistent identity resolution (usually hashed email) across all three.

---

## Google Ads Data Hub: The Search Giant's Attribution Environment

Google Ads Data Hub (ADH) is older than AMC and has a similar architecture: event-level ad data from Google properties (Search, YouTube, Display, DV360) meets the advertiser's first-party data in a BigQuery-based clean room environment.

ADH is most useful for YouTube-specific attribution — understanding whether YouTube video impressions contributed to conversions that would have appeared in Search attribution anyway. Without ADH, YouTube often looks like a brand channel in last-click analysis because the actual conversion click happens via Search after someone sees a YouTube ad. ADH lets you run the query that shows how many Search converters were exposed to YouTube before their Search click.

The architecture requires both parties to use Google Cloud / BigQuery. For advertisers whose stack is GCP-native, the integration is relatively seamless. For advertisers on Snowflake or AWS, the additional infrastructure is a barrier.

ADH also covers Connected TV and display from DV360 (Google's DSP). For large advertisers buying programmatic CTV across multiple publishers through DV360, ADH provides a unified view of programmatic exposure that would otherwise require separate clean room implementations per publisher.

---

## What Changes for Media Buyers

The arrival of publisher clean rooms changes the strategic calculus on streaming in three specific ways.

**Budget classification.** Before deterministic attribution, streaming budgets were classified as brand spend — subject to brand budget cycles, brand KPIs (awareness, reach, consideration), and brand approval processes. Once you can produce a cost-per-acquisition number for Netflix or Prime Video, the conversation moves to performance channels — different budget owner, different approval cycle, different benchmark set. Performance budgets are typically larger and faster to expand when ROI is proven.

**Optimization levers.** Probabilistic attribution doesn't give you enough signal to optimize within a campaign. You can adjust broad allocation between channels, but you can't see which creative, which frequency, which audience segment is driving conversion. Deterministic attribution does. Once you can run the clean room query by creative variant and see that 30-second ads outperform 15-second ads on cost-per-acquisition by 40%, you have an optimization lever that justifies the analytical investment.

**Publisher negotiations.** Clean room attribution data changes the negotiation dynamic. If your analysis shows that Netflix delivers a lower cost-per-acquisition than a competing streaming platform, you have a data-backed reason to shift budget. Publishers are aware of this — which is part of why Netflix invested in making its measurement offering robust before trying to capture large performance budgets. The advertiser who can show the attribution data has leverage.

---

## The Match Rate Problem

Publisher clean rooms don't work uniformly well for every advertiser. The primary constraint is match rate — the percentage of users who appear in both the publisher's dataset and the advertiser's dataset with a shared identifier.

Netflix's authentication is strong: users log in with an email address, and that email can be hashed and matched against the advertiser's CRM. But if the advertiser's CRM is mostly acquired through phone number, loyalty ID, or anonymous checkout, the match will be low regardless of Netflix's data quality.

Realistic match rates by data quality:

- **Email-primary CRM with high login rate:** 40–60% match against authenticated streaming audiences
- **Mixed identity CRM:** 20–35%
- **Primarily offline customer base (in-store, phone, mail):** under 15%

A 15% match rate means that 85% of the customers you want to include in attribution analysis don't appear in the matched dataset. The 15% who do may not be representative. The CPA you calculate from a 15% match rate should carry wide error bars.

The practical implication: before investing in publisher clean room infrastructure, audit your CRM's email completeness. If less than 50% of your customer records have a valid, current email address, your match rate problem is a CRM data quality problem — and that's the higher-value fix.

---

## How to Run Your First Clean Room Attribution Analysis

Assuming your stack is Snowflake-native and you're starting with Netflix as your publisher:

**Step 1 — Prepare your conversion dataset.** You need a table with hashed email (SHA-256 is the standard), conversion event type, and timestamp. The timestamp is critical — attribution windows are configurable, but you need to be able to define whether conversion within 7 days, 14 days, or 30 days of exposure counts.

**Step 2 — Enable Snowflake Data Clean Room.** Netflix provisions access on their side. You share your conversion table within the clean room environment. Neither party can see the other's raw data — only queries against the combined dataset are permitted.

**Step 3 — Run the overlap query.** The core query asks: among users in Netflix's impression data for your campaigns, how many appear in your conversion dataset within the attribution window, broken down by campaign, creative, and audience segment?

**Step 4 — Apply minimum group size filters.** Clean room implementations typically require a minimum group size (often 25–50 users) before returning aggregate results. Small audience segments or narrow creative variants may not reach the threshold. Design the query at a level of granularity that produces reportable groups.

**Step 5 — Calculate incremental reach.** The raw overlap count includes users who would have converted regardless of Netflix exposure. To isolate Netflix's contribution, compare the conversion rate of exposed users to a matched control group — users in your customer database who were in Netflix's reachable audience but were not served your ads. This gets closer to an incrementality estimate than raw attribution.

**Step 6 — Interpret against your benchmarks.** A cost-per-acquisition number from a clean room query is not directly comparable to your Google Search CPA — the methodology is different, the attribution window may be different, and the audience may skew differently. Establish what CPA from clean room analysis is acceptable for streaming, treating it as a new channel category, rather than directly comparing to your last-click search numbers.

---

## The Bigger Picture

Publisher clean rooms represent a structural shift in how streaming advertising works, not an incremental improvement. They close the attribution loop that TV advertising never had. They move streaming from brand measurement frameworks (awareness, reach, consideration scores) to performance measurement frameworks (CPA, ROAS, incrementality).

For the advertising industry, the downstream effect is that performance budgets — which historically went to search and social because they were the measurable channels — are now accessible to streaming publishers. Netflix, Amazon, and YouTube are not competing for brand dollars anymore. They're competing for the same pool of budget that Google and Meta have dominated for fifteen years.

The advertisers who build clean room measurement programs now, establish match rate baselines, and understand what streaming attribution numbers actually mean in their specific category will be ahead of the curve when the rest of the market catches up and streaming CPMs reflect that competition.

The data is already available. The infrastructure exists. The constraint is almost entirely analytical capacity and organizational willingness to run a measurement program with more moving parts than a last-click dashboard.

That gap closes fast once a competitor proves the number.
