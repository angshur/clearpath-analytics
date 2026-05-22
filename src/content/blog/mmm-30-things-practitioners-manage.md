---
title: "30 Things Practitioners Actually Have to Manage in MMM"
description: "Media mix modeling sounds like one thing. In practice it's 30 interconnected decisions and failure modes. Here's the complete list — organized by where things break."
date: 2026-05-22
readTime: "12 min"
keywords: ["media mix modeling", "MMM", "marketing measurement", "Bayesian MMM", "adstock", "multicollinearity", "attribution"]
author: "Angshuman Rudra"
---

Most writing about media mix modeling describes what it is. This is about what it takes to actually do it — every decision, assumption, and failure mode a practitioner has to manage from data collection to output interpretation.

There are more than 30. But these are the ones that break programs.

---

## Section 1: Input Data — What Goes In

**1. Dependent variable selection**
What you're trying to explain: revenue, units sold, website conversions, store visits, leads. The choice changes everything downstream. A model optimized to explain revenue will produce different channel coefficients than one optimized to explain store visits — even on identical data. Define this before touching the model.

**2. Marketing spend by channel**
TV, paid search, social, display, email, OOH, radio, print — each needs its own variable. How you define channel boundaries matters: "paid search" as one variable versus "branded paid search" and "non-branded paid search" as two variables will produce different results because their response functions are different.

**3. Impressions vs. spend as the input**
Some models use spend; some use delivery volume (GRPs for TV, impressions for digital). Mixing spend and GRPs across channels is a modeling choice with real consequences. Spend is available but doesn't reflect delivery efficiency. Impressions are closer to actual exposure but require a different data pipeline.

**4. Pricing data**
If your product price changes week to week, sales fluctuate for reasons that have nothing to do with marketing. Must be controlled for or the model attributes price-driven volume swings to whatever channel was running.

**5. Promotions and discounts**
A 20%-off sale drives sales. If the model doesn't know the promotion happened, it attributes the lift to whatever marketing channel ran that week. This is one of the most common sources of inflated TV coefficients — brands run promotions with TV support and the model can't separate them.

**6. Distribution and availability**
If you launched in 500 new stores in Q2, sales went up — not because of media. If you ran out of stock in a category for three weeks, sales dropped. Both events must be modeled explicitly.

**7. Competitor activity**
Competitor price cuts, ad spend increases, or promotions affect your sales in ways your own media didn't cause. Hard to obtain reliably. Often estimated from third-party data sources. Omitting it biases your own channel coefficients — especially in competitive categories where brands move simultaneously.

**8. Macroeconomic variables**
Consumer confidence, unemployment, category spending indices. Relevant for big-ticket purchases (auto, home, financial services) and discretionary spend. In recessionary environments, omitting macro variables means the model attributes economic contraction to your media going dark.

**9. Seasonality**
Christmas, back to school, summer, Valentine's Day — must be explicitly modeled. If you don't, the model attributes seasonal sales lifts to whatever channel was running during peak season. Most common result: TV gets massive coefficients because TV spend and Q4 sales both peak simultaneously.

**10. Weather**
Relevant for categories where it drives demand: retail, restaurants, outdoor, automotive, home improvement. A cold snap in March drives different purchasing behavior than a warm spell. Omitting weather in these categories creates systematic residuals that the model incorrectly attributes to media.

**11. Product launches and SKU changes**
New product introductions create sales that aren't media-driven. Reformulations change baseline repurchase rates. These are structural breaks in the data that need explicit treatment — either as dummy variables or as separate modeling periods.

---

## Section 2: Time Series Considerations

**12. Data granularity**
Weekly is standard. Daily is more precise but dramatically noisier, requires more sophisticated autocorrelation handling, and is rarely worth the added complexity unless your business has meaningful day-of-week patterns. Monthly loses too much signal to be useful for channel-level attribution.

**13. Length of historical data**
Minimum 2–3 years to capture full seasonality cycles. Less than 18 months and the model cannot reliably distinguish seasonal effects from media effects — they're confounded. Shorter windows are usable for specific analyses but produce wide confidence intervals on channel coefficients.

**14. Data stationarity**
If your sales are trending upward over time because the business is growing, the model needs to account for that underlying trend. Without it, the growth gets attributed to media — inflating every channel's ROI during growth periods.

**15. Autocorrelation**
This week's sales are correlated with last week's sales. If you don't model this explicitly, the residuals are non-random and your coefficient estimates are biased. Common fix: include a lagged dependent variable or use a model specification that handles autocorrelation in the error term.

**16. Structural breaks**
COVID. A major product recall. A competitor going bankrupt. A distribution partnership ending. These events change the data-generating process at a specific point in time. The model needs to know — either via a break dummy variable or by restricting the estimation window to post-break data. Fitting a single model across a structural break produces coefficients that are meaningless averages across two different worlds.

---

## Section 3: Adstock — How Advertising Lingers

**17. Adstock (geometric decay)**
Advertising doesn't only affect the week it runs. It has a carryover effect that decays over time. Week 1: 100% effect. Week 2: 60%. Week 3: 36%. The decay rate is a parameter that must be estimated from data or set as a prior. Getting it wrong biases the channel's effective spend variable and therefore its coefficient.

**18. Decay rate calibration per channel**
TV decays slowly — high awareness, brand building, emotional resonance. Paid search decays fast — immediate intent, no lingering effect once the search window closes. Email decays very fast. Display is somewhere in between. Each channel needs its own decay rate. Using a single decay rate across channels systematically over- or under-attributes depending on how media-heavy each channel's natural decay is.

**19. Lag effects**
Some channels have a delay before they affect sales. A TV campaign for a car might take 6–8 weeks to show up in purchase data because of the consideration cycle. A seasonal retailer's TV spend in October affects November and December sales. Modeling the lag correctly is critical for long-consideration-cycle categories.

**20. Diminishing returns and saturation**
Spending $2M on TV in one week produces less incremental sales than spending $200K/week for 10 weeks, even at the same total budget. The model needs a saturation function — typically an S-curve or Hill function — to capture this. Without saturation, the model assumes linear effectiveness at any spend level, which produces budget recommendations that dramatically overinvest in any channel with a positive coefficient.

---

## Section 4: Multicollinearity

**21. Channel correlation**
Brands tend to run all channels up simultaneously during peak season and cut all channels during slow periods. When TV and digital always move together, the model cannot separate their individual effects. Coefficients become unstable — small changes in the data produce large swings in attribution shares.

**22. Budget allocation correlation**
Agencies often maintain fixed channel mix ratios. If you always spend 60% TV / 40% digital regardless of the week, the model sees one variable moving, not two. The result is that one channel "absorbs" the effect of both.

**23. VIF (Variance Inflation Factor)**
The standard diagnostic for multicollinearity. VIF > 10 on a channel means its coefficient estimate is statistically unreliable. The most common high-VIF pair in practice: TV and branded paid search. TV drives brand awareness, which drives branded search volume, which drives conversions — so both variables spike together and the model can't tell which caused the sales.

**24. Decorrelation strategies**
The fix for multicollinearity is introducing variance: run channels at different flighting schedules across regions or time periods to create natural variance in the data. This requires deliberate media planning for model-ability, not just performance optimization. It's the reason well-run MMM programs influence media planning, not just measure it.

---

## Section 5: Spike Events

**25. Burst spend and single-event campaigns**
The Super Bowl, the Olympics, a product launch blitz. A single massive spend spike gives the model one data point. You cannot estimate a reliable coefficient from one observation. The standard workaround: add a binary event dummy variable to absorb the spike and prevent it from contaminating other channel coefficients — but this means you're controlling for the event, not measuring its ROI.

**26. Multi-year event modeling**
If you run a Super Bowl ad across multiple years, you accumulate data points. With 3+ years of Super Bowl spend, you can begin to estimate a cross-year coefficient. Still noisy, still high variance, but statistically defensible in a way that a single-year model is not.

**27. Natural experiments from media execution errors**
If a media buy was accidentally suppressed in certain markets due to a trafficking error or late creative delivery, that accident creates the variance the model needs to isolate channel effects. These unplanned variations are often more statistically valuable than the planned campaign.

---

## Section 6: Baseline vs. Incremental Decomposition

**28. Baseline estimation**
The baseline is what you'd sell with zero marketing activity — driven by brand equity, distribution, pricing, seasonality, and organic demand. For established brands, this is typically 50–70% of total sales. Overestimating the baseline understates media contribution. Underestimating it inflates ROI. Getting the baseline right is one of the most consequential — and most debated — outputs of any MMM.

**29. Base erosion**
If you cut all media spend, the baseline erodes over time as brand equity fades, new customer acquisition slows, and awareness declines. Traditional MMM treats the baseline as stable and doesn't model this dynamic. The result: MMM systematically undervalues brand-building channels (TV, sponsorships) because it doesn't capture the long-term cost of going dark. This is the reason CFOs who rely only on MMM tend to over-cut brand spend.

---

## Section 7: Model Specification

**30. Functional form**
Linear models assume that each additional dollar of spend produces a constant incremental effect. Log-linear models assume that percentage changes in spend produce percentage changes in sales (more realistic for most channels). Multiplicative models assume channels interact and amplify each other. The choice of functional form affects every coefficient in the model and should be selected based on economic theory about the category, not just model fit statistics.

---

## Section 8: Bayesian vs. Frequentist

**Prior setting**
Bayesian MMM — used in Google Meridian, Meta Robyn, and most modern implementations — encodes prior beliefs about channel ROI ranges, decay rates, and saturation parameters, then updates those beliefs with observed data. The prior carries weight when data is sparse (new channels, rare events like the Super Bowl). Getting priors right is itself a modeling decision: too tight and the data can't update the model; too loose and you're back to frequentist with extra steps.

**Posterior uncertainty**
Bayesian models produce distributions over coefficients, not point estimates. A TV ROI of 1.8x with a 90% credible interval of [0.4, 3.2] is a materially different business input than "TV ROI = 1.8x." The interval often spans from "this channel destroys value" to "this is your best channel." Presenting the uncertainty honestly is uncomfortable but necessary for good budget decisions.

---

## Section 9: Calibration and Validation

**Holdout validation**
Withhold the last N weeks of data, fit the model on everything before, see if it predicts the holdout period accurately. Standard acceptable threshold: MAPE (mean absolute percentage error) below 10% on the holdout period.

**Lift test calibration**
Run geo holdouts or incrementality tests for specific channels and use those results to calibrate or constrain the MMM coefficients. This is the gold standard approach — using causal experiment results to anchor the observational model. Expensive to execute properly but dramatically increases confidence in the output.

**DECOMP.RSSD**
A diagnostic from Meta's Robyn framework: how far are the model's decomposition shares from your prior expectations? A useful sanity check that the model isn't producing implausible results — for example, attributing 40% of all sales to email when email represents 3% of budget.

---

## Section 10: Common Failure Modes

**Garbage in, garbage out**
If your spend data mixes billed and platform-reported figures inconsistently, or your sales data has untracked promotions, or your seasonality variables are wrong, the model produces authoritative-looking garbage. The confidence intervals are tight. The coefficients are stable. And they're measuring something that isn't real.

**Overfitting**
The model fits historical data perfectly — R² of 0.97 — and predicts nothing useful out of sample. Usually caused by including too many variables relative to the number of data points. The model has memorized the historical period rather than learned the underlying relationships.

**Coefficient sign reversal**
The model outputs a negative ROI for TV. Almost always a symptom of multicollinearity or an omitted variable — your competitor cut spend the same weeks you increased yours, and the model attributes the resulting sales decline to your TV.

**Attribution to always-on channels**
Branded paid search is almost always running at a roughly constant level. The model sees it as a near-constant and may estimate its coefficient at zero because there's no variance to estimate from. The channel is effective — it's just unidentifiable from observational data alone.

**Ignoring long-term brand effects**
MMM measures short-to-medium-term sales response, typically within a 52-week window. It systematically undervalues channels that build brand equity over years — TV, sponsorships, PR — because those effects manifest outside the measurement window. This is a known limitation, not a modeling error, but it produces budget recommendations that consistently underinvest in brand.

---

## The Practical Takeaway

MMM is not a single model you run. It's a system of decisions — about data, specification, priors, validation, and interpretation — each of which affects the credibility of the output. The practitioners who get the most value from it treat it as a living analytical program, updated quarterly, calibrated against experiments, and used to inform planning rather than justify past decisions.

The ones who get the least value treat it as an audit they commission once a year and use to fight over attribution credit.

---

*Clearpath Analytics helps media companies and agencies design and interpret measurement programs. If you're running MMM and want a second opinion on your model specification or output interpretation, [get in touch](/contact).*
