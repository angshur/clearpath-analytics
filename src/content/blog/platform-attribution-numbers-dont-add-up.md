---
title: "Your Platform Attribution Numbers Will Never Add Up to Your Actual Sales"
description: "Google says ROAS 4.2. Meta says 3.8. Your actual revenue is half of what both claim. This isn't a data quality problem — it's structural. Here's what it means and what to do about it."
date: 2026-05-18
keywords: ["incrementality testing", "attribution", "marketing measurement", "CFO marketing", "holdout testing", "platform attribution", "ROAS"]
---

There is a number every marketing team knows and no one talks about openly: if you add up all the conversions claimed by every ad platform you run, the total will be two, three, sometimes five times your actual sales.

Google claims credit. Meta claims credit. TikTok claims credit. Each platform's attribution model is designed to find the maximum plausible connection between its ads and your conversions. None of them are lying exactly — they're just each telling a story that's true from their vantage point and collectively impossible.

This isn't a data quality problem you can fix by cleaning your pixels or installing a better CDP. It's structural. It's how attribution math works when every platform counts every touchpoint it can see and ignores every touchpoint it can't. The numbers don't add up because they were never designed to.

Understanding why this happens — and what to do about it — is the most important measurement conversation your team isn't having.

## Why the Numbers Don't Reconcile

Every ad platform uses an attribution window. Meta's default is 7-day click, 1-day view: any conversion within 7 days of a click or 1 day of a view gets credited. Google Ads uses a data-driven model that distributes credit across touchpoints in the Google ecosystem. TikTok has its own window. Pinterest has its own. The Trade Desk has its own.

When a customer sees a Meta ad on Monday, clicks a Google search ad on Thursday, and converts on Friday, the result is:

- Meta claims 100% of the conversion (click happened within 7 days)
- Google claims 100% of the conversion (last click before conversion)
- If they saw a TikTok ad last week, TikTok may claim it too

One conversion. Three platforms. Three claims of full credit. Your revenue is counted once. Their reported conversions are counted three times.

This is the reconciliation gap. And it's not a rounding error — industry data consistently shows that the sum of platform-reported conversions exceeds actual conversions by 2–5x depending on how many channels you run.

## What This Means for Budget Decisions

Most media budgets are set based on ROAS targets. You want $4 back for every $1 spent. Each platform reports its ROAS. You allocate budget toward the platforms hitting the target.

The problem: **if the reported ROAS is measuring overlapping credit, every channel looks better than it is**. You're not optimizing toward the channels that actually drove incremental sales. You're optimizing toward the channels that are best at claiming credit for sales that would have happened anyway.

The result is a specific failure mode: you consistently over-invest in lower-funnel, direct-response channels (search retargeting, social retargeting) because they're the last touch before conversion and therefore claim the most credit. You under-invest in upper-funnel channels (prospecting, brand, video) because they influence purchases that get attributed downstream.

This is why incrementality testing consistently finds that Meta campaigns perform materially differently than Meta itself reports. Two data points from real brand measurement programs:

- **Johnnie-O**: Meta campaigns performed **275% better** than Google Analytics reported — not because GA was overcounting, but because last-click attribution was undercounting Meta's role as an upper-funnel influence that converted through other paths
- **Shinola**: Facebook awareness campaigns were **undervalued by 413%** in platform reporting — the brand-building effect was real but invisible to attribution models that couldn't see delayed conversions

These are not outliers. They're the predictable result of measuring upper-funnel activity with lower-funnel attribution logic.

## The Question You Should Be Asking Instead

The right question is not "what ROAS did each channel report?" It's: **what would have happened to my sales if I had turned that channel off?**

That's the incrementality question. It's the counterfactual. It's the only question that actually tells you whether the spend was doing anything.

Holdout testing — running a controlled experiment where a group of users or markets is withheld from seeing your ads — is how you answer it. The gap between the holdout group's conversion rate and the exposed group's conversion rate is your true incremental lift. Not what the platform claims. What actually happened.

When Johnnie-O ran holdout tests on Meta, they found that the real lift was significantly better than Google Analytics last-click implied — not worse. The channel was genuinely effective; it was just being credited for the wrong things in the wrong measurement system. That finding is directionally different from what most teams expect.

## Five Questions Your CFO Should Ask About Your Measurement

If you're presenting marketing performance to a CFO or board, these are the questions a financially rigorous evaluation requires. If your measurement program can't answer them, you're presenting correlation dressed up as causation.

**1. Is your measurement causal or correlative?**
Correlation describes what happened. It doesn't explain why. Causal measurement answers the counterfactual: what would have happened without the spend? Platform attribution is correlative by design. Holdout testing is causal.

**2. How quickly do results inform forecasts?**
Measurement that arrives weeks after the fact is useful for retrospectives. It does nothing for active budget allocation. If your measurement cycle is slower than your planning cycle, you're optimizing on old information.

**3. Is finance directly involved in interpreting results?**
When finance only sees summarized outputs — "Meta ROAS was 3.8x" — assumptions go unchallenged. The reconciliation gap stays hidden. Finance needs to understand the methodology, not just the headline number.

**4. Can you model outcomes before committing budget?**
If your measurement program can't simulate what happens when you shift $500K from search to connected TV, your budgeting is reactive. Forward-looking scenario modeling is what separates measurement from reporting.

**5. Would your results withstand scrutiny?**
Results need to be transparent, repeatable, and explainable. An audit trail for methodology changes. Reconciliation to actual financial outcomes. If the only place your ROAS exists is in a platform dashboard, it won't survive a serious review.

## What To Do About It

The gap between platform-reported and incrementally measured performance is, for most brands, the highest-leverage number in their measurement stack. Closing it isn't technically complicated — it requires running holdout tests and using the results to correct your attribution signals.

A practical starting point for most teams:

**Under $2M in annual ad spend:** Platform-native lift tests (Meta Conversion Lift, Google GeoX) are free and directionally useful. They're not independent, but they're a baseline.

**$2M–$10M:** One or two geo holdout tests per year, run through an open-source tool like GeoLift or a purpose-built platform like Haus, will tell you more than months of MTA analysis. Design the test on your highest-spend channel. The findings will surprise you.

**$10M–$50M:** Systematic holdout testing across channels, with results fed into a lightweight MMM as calibration data. The combination of holdout lift numbers and channel decomposition is more defensible than either alone.

**Above $50M:** Dedicated incrementality platform (Measured, Liftlab) plus full Bayesian MMM. The holdout results become priors in the model. Budget decisions are based on incrementally validated channel coefficients.

The measurement program you need isn't the one that produces the best-looking ROAS. It's the one that produces numbers a CFO can stake capital allocation decisions on. Those are often very different programs.

---

*Clearpath Analytics designs and implements incrementality testing programs for marketing teams that need measurement their finance teams will trust. [Get in touch](https://clearpath-analytics.vercel.app) if you're ready to find out what your channels are actually doing.*
