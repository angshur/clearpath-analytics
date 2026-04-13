---
title: "Why Your Attribution Numbers Don't Add Up (And What To Do About It)"
description: "Google says one thing. Meta says another. Your CRM says both are wrong. This is not a bug — it's how attribution works. Here's what's actually happening and how to fix it."
date: 2026-04-01
readTime: "8 min"
keywords: ["marketing attribution", "last-click attribution", "multi-touch attribution", "marketing analytics"]
author: "Angshuman Rudra"
---

Every marketing team eventually has this meeting.

You're presenting last quarter's results. You pull the Google Ads report: 847 conversions, ROAS of 4.2. You pull the Meta report: 612 conversions, ROAS of 3.8. You pull Salesforce: 490 new customers. Nobody's numbers agree. The CFO asks which channel is actually working. You explain that the platforms measure things differently. The CFO is skeptical.

This happens to almost every marketing team running more than two channels. It's not a data quality problem. It's a structural problem with how digital advertising platforms count conversions — and understanding it is the first step to fixing it.

## The Double-Counting Problem

Every ad platform wants to claim credit for every conversion it touched. Google Ads counts a conversion if someone clicked a Google ad within the last 30 days before converting. Meta counts a conversion if someone saw or clicked a Meta ad within the last 28 days. If a customer saw a Meta ad on Monday, clicked a Google ad on Wednesday, and purchased on Friday — both platforms count it as a conversion.

This is not fraud. It's how attribution windows work. But when you add up conversions across platforms, you're double-counting (or triple-counting) the same customers.

The actual number of customers is in your CRM or your payment processor — neither of which any ad platform can see directly. That's why Salesforce says 490 when the platforms are claiming 1,459 combined.

## Last-Click Is Not "Wrong" — It's Incomplete

Last-click attribution, which most ad platforms default to, assigns 100% of the credit to the final ad interaction before a conversion. It's simple and deterministic. The problem is that it systematically undercounts channels that operate early in the buying journey.

Display advertising, YouTube, prospecting campaigns on Meta — these channels rarely get the last click. The customer sees the ad, becomes aware of the brand, and then converts two weeks later via Google search. Last-click gives Google 100% of the credit. Display and YouTube get zero.

The result: teams that rely on last-click attribution chronically underfund awareness channels and overfund search and retargeting. You're optimizing for the channels that show up last, not the channels that actually drove intent.

## What Multi-Touch Attribution Actually Solves

Multi-touch attribution (MTA) distributes credit across all the touchpoints in a customer's journey — not just the last one. There are several models:

- **Linear**: equal credit to every touchpoint
- **Time-decay**: more credit to touchpoints closer to conversion
- **Data-driven**: statistical credit allocation based on which touchpoints actually correlate with conversion

Data-driven MTA is the most accurate but requires a large enough conversion volume to run reliable models (typically 1,000+ monthly conversions minimum). For most mid-market companies, position-based or time-decay models are more practical.

The catch: MTA requires a unified customer identity across all your channels. If your data is fragmented — different IDs in Google Analytics, Meta's pixel, and Salesforce — you can't stitch the journey together.

## Attribution vs. Incrementality: The More Important Question

Here's the thing most attribution vendors don't tell you: multi-touch attribution still only measures correlation, not causation.

Even a perfect MTA model can tell you which touchpoints appeared before a conversion. It cannot tell you whether removing that touchpoint would have prevented the conversion. That's the incrementality question — and it's the one that actually matters for budget allocation.

Example: you run a branded search campaign. It shows a beautiful ROAS of 8.0 in your MTA model. But many of those clicks are from customers who were already going to buy — they just happened to click a branded search ad on the way to your site. Remove the branded search budget and most of them buy anyway. Your "8.0 ROAS" campaign might be driving almost no incremental revenue at all.

Incrementality testing — running holdout experiments where you show ads to some users and not others — is the only way to answer this question definitively. It's not easy to run, but for channels representing $50K+ per month in spend, it's worth doing.

## The Practical Fix: A Measurement Stack That Works

You don't need to solve attribution perfectly to make better decisions. You need enough clarity to make directionally correct budget calls. Here's the stack that works for most mid-market teams:

**Layer 1: A single source of truth**
Pull all your ad platform data, analytics data, and CRM data into one place (Snowflake, BigQuery, or a comparable warehouse). Normalize conversion definitions so you're comparing the same event across platforms. This alone resolves most of the "our numbers don't add up" problem.

**Layer 2: An agreed-upon attribution model**
Pick one model and use it consistently. Data-driven if your volume supports it. Position-based (40/20/40 — 40% to first touch, 20% distributed in the middle, 40% to last touch) if not. The specific model matters less than having one that everyone agrees to use for decisions.

**Layer 3: Incrementality tests on high-spend channels**
For channels above $30K/month, run at least one holdout test per quarter. This doesn't need to be a sophisticated geo-split test — a simple user-level holdout on Meta or a geo experiment on YouTube is enough to give you directional signal.

**Layer 4: Media mix modeling for strategic allocation**
MTA and incrementality testing are good at evaluating current channels. MMM is good at answering "should we shift budget from paid social to CTV?" It uses historical data to model the relationship between spend and outcomes at the channel level, independent of click-based tracking. More on that in a separate post.

## The CFO Meeting Answer

When the CFO asks why Google shows 847 conversions and Salesforce shows 490 new customers, the answer is: platforms double-count, our source of truth is the CRM, and we use a consistent attribution model that reflects actual customer journeys.

Getting to that answer requires building the data infrastructure first. Most teams skip that step and go straight to "let's try a new attribution tool." The tool is only as good as the data feeding it.

If you're not sure where your data is broken, that's exactly what a Marketing Data Audit surfaces.
