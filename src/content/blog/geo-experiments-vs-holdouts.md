---
title: "Geo Experiments vs Holdouts: When to Use Which"
description: "Incrementality testing is the only way to know if your media is actually driving outcomes. Two methods dominate: geo experiments and user holdouts. Here's how to pick between them."
date: 2026-05-03
readTime: "9 min"
keywords: ["incrementality testing", "geo experiments", "holdout testing", "marketing measurement", "causal inference", "media effectiveness", "lift measurement"]
author: "Angshuman Rudra"
---

Attribution tells you which channels got credit. Incrementality tells you which channels actually caused the outcome.

These are different questions, and confusing them is one of the most expensive mistakes in marketing measurement.

A channel that gets a lot of attribution credit — branded search, retargeting, last-click email — isn't necessarily driving incremental revenue. It may be capturing customers who were already going to buy, showing up at the end of a journey it didn't cause. If you cut that channel, you find out. Sometimes nothing happens. Sometimes you realize you've been paying for something that was delivering zero incremental value at scale.

Incrementality testing is how you find out before you cut the budget — or before you scale something that doesn't actually work.

## What Incrementality Testing Measures

The fundamental question: would this outcome have happened without this advertising?

The setup is always the same in principle: divide your audience or geography into a test group (exposed to advertising) and a control group (not exposed, or exposed to less). Measure the outcome difference. That difference, properly attributed, is your incremental lift.

The complications come from how you define and maintain the groups, how you handle spillover between them, and how you ensure statistical validity. Two methodologies address these complications in different ways: geo experiments and user holdouts.

## User Holdouts

A user holdout randomly assigns individual users to test and control groups. The test group sees ads. The control group is suppressed — the budget that would have reached them is withheld or redirected. After a measurement period, you compare conversion rates between the two groups.

**When holdouts work well:**

Holdouts are the right tool when you can reliably suppress ads to the control group and when you have enough volume to detect a meaningful lift signal. They work particularly well for:

- Direct response campaigns on digital platforms (Meta, Google Display, YouTube) where individual user targeting is controllable
- Email campaigns where you can explicitly exclude a randomly selected control group from sending
- Retargeting campaigns where you're targeting a defined audience list and can hold out a portion of that list

The statistical advantage of user holdouts is precision. When you randomize at the user level with sufficient sample size, you control for confounding factors more cleanly than geographic experiments can. Individual-level randomization is the gold standard of causal inference.

**The limitations:**

Holdouts require platform-level support for control group suppression. On Meta, you can set up a holdout using Campaign Budget Optimization with a holdout group toggle. On Google, geo experiments are more common than user holdouts precisely because individual user suppression is harder to implement cleanly.

The more significant limitation is cross-channel spillover. If your control group doesn't see your Meta ads, but they do see your Google Search ads, your YouTube ads, and your email campaigns, you're not measuring the incrementality of Meta in isolation — you're measuring Meta's contribution in the presence of everything else. That's often exactly what you want, but it means the holdout needs to be scoped carefully to match the question you're asking.

Minimum scale for a reliable user holdout: typically 10,000+ users in each arm, with enough conversion volume to detect a 10–20% lift with statistical confidence. Under that, the confidence intervals are too wide to act on.

## Geo Experiments

A geo experiment randomizes at the geographic level — typically at the DMA, city, or country level — assigning some markets to receive advertising and others to serve as controls. Business outcomes (revenue, store visits, website conversions from those geos) are compared across the two groups.

**When geo experiments work well:**

Geo experiments are the right tool when:

- You're measuring channels that can't be suppressed at the user level (TV, OOH, radio, podcast, some programmatic)
- You're measuring channels where cross-device and cross-platform spillover makes user holdouts unreliable
- You have offline outcomes (in-store purchases, phone calls) that can be measured at the geographic level
- You're measuring brand-building campaigns where the outcome is behavior change over weeks, not clicks over days

The fundamental insight behind geo experiments is that people in different geographic markets are reasonably similar in their behavior absent the advertising treatment. By controlling for the baseline difference between markets (through careful market selection and statistical adjustment), you can attribute the outcome difference to the ad exposure.

**The limitations:**

Geographic randomization is noisier than individual randomization. Markets differ in ways that affect outcomes — local economy, competitive landscape, weather, seasonal patterns — and no amount of matching eliminates all of that noise. This is why geo experiments require more volume, longer duration, and careful design to produce reliable results.

The design decisions that matter most:
- **Market matching:** Test and control markets need to be matched on historical outcome patterns before the experiment. Mismatched markets produce unreliable results.
- **Duration:** Short geo experiments (under 4 weeks) often produce inconclusive results because you haven't given the advertising enough time to impact measurable behavior, especially for awareness channels.
- **Spillover:** People cross geographic boundaries. A person in the control market who works in the test market will be exposed to the advertising. In dense urban areas, geographic spillover is a significant source of noise.

Minimum scale: at minimum 10 markets per arm, ideally 20+, with high statistical power requiring even more. For small or regional brands, this creates a meaningful constraint — you may not have enough distinct geographic markets to run a clean experiment.

## Choosing Between Them

The choice between geo experiments and user holdouts usually comes down to four factors:

**Channel type.** If you can suppress at the user level on the platform, a user holdout is cleaner. If you can't (TV, OOH, radio), a geo experiment is your only option.

**Outcome type.** Online conversions are easier to measure in user holdouts. Offline outcomes — in-store purchases, phone calls, foot traffic — are typically more accessible through geo-level data.

**Scale.** User holdouts work at smaller scale (tens of thousands of users). Geo experiments require sufficient geographic spread to be credible.

**Speed.** User holdouts on digital platforms can run in 2–4 weeks. Geo experiments for awareness channels often need 6–12 weeks to detect meaningful lift.

For most mid-market brands, the practical answer is: run user holdouts on your controllable digital channels (Meta, email) quarterly, and run a geo experiment once or twice a year for channels where user-level suppression isn't possible.

## How to Interpret Results

A lift result is only as good as the statistical power behind it.

Two numbers matter: the lift estimate and the confidence interval. A Meta holdout that shows 15% incremental lift with a 90% confidence interval of [2%, 28%] is telling you something real — the lift is positive and statistically distinguishable from zero, though the magnitude is uncertain. A holdout that shows 15% lift with a confidence interval of [-5%, 35%] is telling you nothing actionable — you can't distinguish it from zero.

Before running any incrementality test, calculate the required sample size for the lift you expect to detect. If your conversion volume doesn't support that sample size in a reasonable time frame, you'll generate an underpowered test that produces inconclusive results. An inconclusive result isn't neutral — it consumes budget and time and answers nothing.

For channels spending more than $30K/month, the cost of a properly designed incrementality test is almost always worth it. For channels below that threshold, the statistical power required to detect a meaningful lift at that spend level often makes the test impractical. In those cases, use MMM for directional signal instead.

## The Channel-Level Question That Changes Everything

Here's the question incrementality testing answers that attribution never can: if we paused this channel for 90 days, what would actually happen?

For branded search, the answer is often: not much. Most of that spend is capturing demand that exists with or without the ads. Cut the budget, and most of those conversions still happen via direct traffic or organic search.

For a well-targeted prospecting campaign reaching genuinely new audiences, the answer may be: revenue drops measurably within 6–8 weeks.

These two channels might look identical in an MTA model. Incrementality testing shows you which one is worth keeping.

That distinction — between channels that drive demand and channels that capture it — is where the real budget optimization opportunity lives.
