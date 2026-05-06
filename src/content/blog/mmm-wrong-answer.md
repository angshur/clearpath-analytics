---
title: "Why Your MMM Model Is Giving You the Wrong Answer — And What to Do About It"
description: "MMM is having a renaissance. Most brands rebuilding it are making the same data quality mistakes that corrupted their last program. Here are the three failure modes and what the data infrastructure needs to look like."
date: 2026-05-06
keywords: ["MMM", "media mix modeling", "marketing measurement", "data quality", "first-party data", "incrementality"]
---

Media Mix Modeling is back. After a decade during which many brands shifted their measurement budgets toward multi-touch attribution — with its promise of user-level precision and real-time optimization signals — the collapse of third-party cookie infrastructure has pushed the industry back toward aggregate statistical models that don't require individual user tracking to function.

This is a reasonable response to a real constraint. MMM works without cookies, without device IDs, without any user-level signal at all. It operates on aggregate data: how much did you spend in each channel each week, and how did your sales move in response? The statistical model finds the relationship between spending patterns and business outcomes, and from that relationship it estimates how much of your current revenue is attributable to each channel — and how your revenue would change if you shifted budget between channels.

The problem is that the renaissance of MMM has not been accompanied by a renaissance in MMM data quality. Brands are rebuilding MMM programs on the same fragmented, inconsistently defined, poorly governed data infrastructure that made their last MMM program unreliable. And because MMM operates on aggregate data rather than row-level records, the errors are invisible — the model converges, produces coefficients, generates an attribution report that looks authoritative, and nobody in the room knows that the input data was wrong enough to make the output meaningless.

This post is about the three most common data quality problems that corrupt MMM inputs, why they're hard to see, and what the data infrastructure needs to look like to avoid them.

## How MMM Works — The Thirty-Second Version

The model takes a time series of observations — typically weekly data going back two to three years — and fits a statistical relationship between marketing inputs and business outputs. The inputs are spend and impression volume across every channel: TV, digital display, paid search, social, out-of-home, email, promotions, trade. The outputs are sales, revenue, or whatever business metric the brand has defined as the primary KPI.

The model also accounts for external factors that influence sales independent of marketing: seasonality, economic conditions, competitive promotions, weather, distribution changes. Separating the marketing signal from these external factors is the hardest part of MMM — and the part most sensitive to data quality problems.

The output is a set of coefficients — one per channel — that estimate how much incremental revenue was generated per dollar spent in each channel. From those coefficients, the model produces budget optimization recommendations: given your total budget, here is the allocation across channels that maximizes expected revenue.

The quality of those recommendations is entirely determined by the quality of the input data. This is not a modeling problem — it's a data engineering problem.

## Problem 1 — Inconsistent Spend Data Across Platforms

The foundation of any MMM model is an accurate, consistent record of how much was spent in each channel each week. This sounds straightforward. In practice, it is one of the most reliably broken inputs in any MMM program.

**Platform-reported spend vs. billed spend.** The spend figure that appears in your Google Ads dashboard may not match the amount that appears on your invoice at the end of the month. Budget pacing, credit adjustments, invalid click refunds, and billing cycle differences can create discrepancies of 5–15% between platform-reported and billed spend. Most MMM models use platform-reported spend because it's easier to pull via API. This introduces systematic noise into the model's understanding of how much was actually invested in each channel.

**Inconsistent channel definitions.** A brand running paid search across Google and Bing may report both channels as "paid search" in one period and split them into "Google search" and "Bing search" in another — following a change in how their agency reports. The MMM model sees this as a channel that was renamed mid-flight, which breaks the time series continuity that the statistical estimation depends on. If channel definitions changed at any point in your two-year historical data, every observation before and after the change is measuring a different thing.

**Missing dark periods.** Most brands have periods where spend in a channel went to zero — a channel was paused, a budget was redirected, a platform was tested and abandoned. Dark periods are essential for MMM calibration: they're the moments where the model can see what happens to sales when a channel goes silent, which is the cleanest signal of that channel's contribution. If dark periods are missing from the data — coded as zero when they should be null, or filled with interpolated values — the model loses its best calibration signal.

**The fix:** A single governed spend data store, updated weekly, with consistent channel taxonomy, billed spend as the primary metric (not platform-reported), and explicit coding of dark periods. This requires someone to own it — to reconcile platform-reported spend against invoices, to maintain the channel taxonomy across organizational changes, and to audit the historical record for gaps and inconsistencies before the model is run.

## Problem 2 — Missing or Inconsistent Offline Sales Signal

MMM is at its most valuable when it connects media investment to business outcomes that extend beyond digital — in-store sales, call center conversions, direct mail response, distributor purchases. This is the use case that makes MMM irreplaceable for CPG, retail, automotive, financial services, and healthcare brands where a significant portion of conversion happens offline.

It is also where the data quality problems are most severe.

**The retailer data lag.** For a CPG brand selling through Walmart, Target, and Kroger, the weekly sales signal comes from retailer point-of-sale data — scanner data provided by the retailer or purchased from a data syndication provider like NIQ or Circana. This data is typically available with a two-to-four-week lag, and the lag is not consistent across retailers. The model is calibrating against a ragged edge of sales data that is complete for some channels and incomplete for others, creating systematic bias in the coefficients for the channels whose spend patterns correlated with the periods where sales data is missing.

**The online-offline split.** For brands selling through both DTC e-commerce and brick-and-mortar retail, the model needs a consistent definition of total sales that combines both. In practice, these data sources live in different systems, are updated on different schedules, and are denominated in different units — revenue for e-commerce, units for retail. Normalizing them into a consistent weekly sales metric is an unglamorous but critical data engineering task that is frequently done inconsistently or not at all.

**The geography problem.** MMM models that include TV or out-of-home spend need to align geographic market definitions between the media data (DMAs for TV, markets for OOH) and the sales data (retailer distribution footprints, census regions). When these definitions don't align — when your TV buy covers a DMA that straddles two of your sales territories — the model can't accurately attribute the sales impact of the TV spend. The geographic alignment is a data transformation problem, not a modeling problem, and it needs to be solved in the data layer before the model sees the data.

**The fix:** A unified sales data store that combines all revenue streams — online, offline, direct, indirect — into a consistent weekly time series, normalized to a common unit, with explicit geographic alignment to media market definitions, updated on a consistent schedule, with lag explicitly documented and handled.

## Problem 3 — Attribution Window Misalignment

MMM models measure the relationship between spending in a given week and sales outcomes over a defined response window — the number of weeks of sales response that a media investment is expected to generate. This response window is called the adstock or carryover parameter, and it varies by channel: a TV campaign might have a carryover effect that persists for several weeks, while a paid search click typically converts within days.

The problem is that most brands enter MMM with sales data that has already been processed through an attribution model — their analytics platform, their CDP, their retailer measurement tool — that has its own attribution window. This creates a double-attribution problem: the sales data has already been partially credited to marketing activities through the attribution model's window, and then the MMM model tries to re-attribute those same sales using its own adstock assumptions.

The result is that the MMM model is calibrating against an outcome variable that has already been distorted by a different attribution model's assumptions. The coefficients it produces are not measuring the true relationship between media spend and sales — they're measuring the relationship between media spend and an already-attributed version of sales. The budget recommendations that come from those coefficients are wrong in ways that are very difficult to detect because the model still converges and the output still looks reasonable.

**The fix:** MMM models should be calibrated against raw, unattributed sales data — transactions as they occurred, not as they were credited by an attribution model. This requires going back to the source data — point-of-sale records, e-commerce order tables, call center logs — rather than pulling from an analytics platform that has already applied attribution logic. It requires the data infrastructure to maintain raw transaction-level records alongside the attributed reporting views, and it requires the modeling team to be explicit about which data source is being used as the outcome variable.

## What Good MMM Data Infrastructure Looks Like

A measurement program that produces MMM results worth trusting needs three things in its data layer before the model is run:

**A governed marketing data store** with consistent channel taxonomy, billed spend as the primary metric, complete historical coverage including dark periods, and a documented update process that runs on the same schedule as the model.

**A unified sales data store** that combines all revenue streams into a consistent weekly time series, with explicit geographic alignment to media market definitions, raw unattributed transaction data as the outcome variable, and documented lag handling.

**A calibration data set** — incrementality test results, geo experiment outcomes, or holdout study data — that the modeling team uses to validate the model's coefficients against an independent causal estimate. Without calibration data, an MMM model is a correlational model dressed in causal language. With calibration data, it becomes a model whose outputs can be defended to a CFO or a board.

None of this is glamorous. None of it is what the MMM vendors spend time demonstrating in their sales process. All of it determines whether the budget recommendations the model produces are worth acting on.

The MMM renaissance is real. The data infrastructure required to make it work is being built at approximately one-tenth the speed of the modeling programs it's supposed to support. That gap is where the wrong answers come from.
