---
title: "RampID Explained: How Identity Resolution Actually Works in Cookieless Advertising"
description: "A complete walkthrough of RampID — from CRM upload to real-time auction to clean room attribution. Who pays whom, what the 150ms bidding flow actually looks like, and where the structural conflicts are buried."
date: 2026-05-21
readTime: "14 min"
keywords: ["RampID", "LiveRamp", "identity resolution", "cookieless advertising", "programmatic advertising", "identity graph", "UID2", "clean room"]
author: "Angshuman Rudra"
---

Digital advertising has always needed a way to answer one question: **is the person seeing this ad someone I actually want to reach?**

For years, the answer was the third-party cookie. A browser cookie stored on your laptop told advertisers who you were, what you'd browsed, and whether you'd been to their site before. It was imperfect but it worked at scale.

When browsers started killing third-party cookies, the industry needed a replacement. Something that could identify a person across websites, devices, and contexts — without relying on cookies.

Two main solutions emerged: **UID2** and **RampID**.

UID2 is the simple version: you take a user's email address, hash it (a one-way encryption), and that hash becomes their ID. Same email always produces the same hash. One email in, one ID out. Clean, open, and free to use.

RampID is the more powerful version. It sits on top of LiveRamp's identity graph — a massive database built over decades (through LiveRamp's acquisition of Acxiom) that links together every signal a person leaves online and offline into a single persistent ID. Same email as UID2, but also your phone number, your home address, your device IDs, your loyalty card — all stitched together.

The key difference: if you log in to a website on your laptop, UID2 knows it's your email. RampID knows it's also probably you on your iPhone and your work computer, because the graph has seen those devices associated with the same person across many contexts.

---

## Part 1: How the Identity Graph Works

Think of LiveRamp's identity graph as a giant matching engine with 700 million+ global profiles.

When signals come in — a hashed email, a phone number, a device ID, a home address — the graph runs two types of matching:

**Deterministic matching:** Hard facts. Same email address = same person. No ambiguity.

**Probabilistic matching:** Inference. Same IP address + same device type + same behavioral patterns across sites ≈ probably the same person. Not certain, but confident enough to link.

The result is a RampID: a pseudonymous token tied to a person, not a device. One human = one RampID, even if they have four devices and two email addresses.

This is what the Acxiom heritage unlocks. Acxiom spent decades building offline consumer databases — name, address, phone, purchase history. LiveRamp used that as the seed to grow a graph that could link online and offline identity at scale.

| | UID2 | RampID |
|---|---|---|
| Input | Hashed email | Hashed email + phone + device + offline PII |
| Matching | Deterministic only | Deterministic + probabilistic |
| Cross-device | No | Yes |
| Operator | Open standard | LiveRamp (proprietary) |
| Cost | Free | Charged at every step |

---

## Part 2: The Brand's Journey — Nike as the Example

Let's say Nike wants to run a digital campaign targeting customers who bought running shoes but haven't bought apparel yet. Here's the complete flow from their perspective.

### Step 1 — Data onboarding (Days 0–14)

Nike uploads their CRM to LiveRamp: 10 million customer records with emails, phone numbers, loyalty IDs, and purchase history.

LiveRamp hashes the PII (so the raw emails never travel anywhere), runs it through the identity graph, and maps each record to a RampID. Nike's 10 million customers become 10 million RampIDs — or fewer, because match rates are typically 50–80%. If a customer used an old email address Nike doesn't have, or has never authenticated on any digital property LiveRamp has seen, they don't get resolved.

Nike then defines their segment: "bought shoes in the last 90 days, no apparel purchase." That filters down to 1 million RampIDs.

**The catch:** Nike pays LiveRamp per record ingested, regardless of match rate. If 3 million records don't resolve, Nike still paid to try.

### Step 2 — Activation (Hours 0–24)

Nike tells LiveRamp to push that 1 million RampID segment to their DSPs — The Trade Desk (TTD) for open web and CTV, DV360 for YouTube and Google Display.

LiveRamp pushes the segment to each DSP. Each DSP ingests it and makes it available as an audience targeting option. This takes anywhere from 4 to 24 hours per DSP.

Nike then goes into each DSP's platform, creates a campaign, selects the LiveRamp segment as their audience, sets a bid price (say $8 CPM for these high-value customers), adds their creatives, and sets the budget and flight dates.

**The catch:** Nike pays LiveRamp again per activation destination. Pushing to two DSPs = two activation fees.

### Step 3 — Real-time bidding (150 milliseconds)

This is where the actual advertising happens, and it moves faster than anything else in this process.

A Nike customer — let's call her Sarah — visits the New York Times. She's logged in to her NYT account.

The moment her browser loads the NYT page, a small piece of JavaScript from LiveRamp (called ATS — Authenticated Traffic Solution) fires. It captures her logged-in email, hashes it, sends it to LiveRamp's servers, and gets back an encrypted RampID "envelope." This envelope gets embedded in the ad request that NYT sends to the ad marketplace.

The ad marketplace (SSP) fans that request out to every connected DSP simultaneously: "We have an impression available. Here's what we know about this user." Inside the request is Sarah's encrypted RampID envelope.

Nike's DSP (TTD) receives the request. It decrypts the envelope (it can do this because TTD has a pre-built technical integration with LiveRamp). It looks up Sarah's RampID against Nike's 1 million-person audience list.

Match. Sarah bought Nikes six weeks ago and has never bought apparel.

TTD bids $8 CPM. Other brands' DSPs do the same math for their own audiences. The highest bid wins. Sarah sees a Nike apparel ad.

If Sarah isn't logged in to NYT, no RampID is generated. The impression goes out without identity signal and gets bid on for contextual reasons only — much lower CPM, generic ad.

**The whole auction — from page load to ad serving — takes about 150 milliseconds.**

---

## Part 3: Clean Rooms — The Measurement Layer

The real-time bidding flow handles *serving* the ad. The clean room handles *understanding* what happened.

A clean room is a privacy-safe environment where two parties can join their data on a shared key (RampID) without either party seeing the other's raw data. Only aggregate results come out.

There are two moments when Nike uses the clean room:

**Before the campaign — planning:**
Nike sends their 1 million RampIDs to the clean room. The NYT sends their authenticated reader pool — also resolved to RampIDs by LiveRamp. The clean room joins them and tells Nike: "180,000 of your target customers are regular NYT readers." Nike uses this to decide whether to buy NYT inventory directly, negotiate a deal, or skip it.

**After the campaign — attribution:**
Nike sends their post-campaign conversion data (who bought apparel after the flight ended) to the clean room. It gets joined against the impression log. Nike learns: of the 680,000 customers they actually reached, how many converted? What was the lift compared to the 320,000 they didn't reach?

**Important:** the clean room has nothing to do with real-time bidding. It's a batch analytical tool. Queries take days to run. Results are aggregate — if your segment is too small (under ~50 people), the clean room returns nothing to protect privacy.

**Nike pays LiveRamp per query.** Every insight costs money.

---

## Part 4: Multiple DSPs — Why and How

Nike doesn't use just one DSP. Different DSPs access different inventory:

| DSP | Primary inventory |
|---|---|
| The Trade Desk | Open web, CTV, audio |
| DV360 | YouTube, Google Display Network |
| Amazon DSP | Amazon properties + retail signal |
| Yahoo DSP | Yahoo/AOL owned inventory |

Nike pushes the same 1 million RampID segment to all of them. This isn't primarily about finding the cheapest CPM — it's about reach. No single DSP has access to all inventory.

The problem: TTD and DV360 don't know about each other. If Sarah visits a site where both DSPs can bid, Nike might compete against itself. Neither DSP is aware of what frequency the other is running. Sarah could see 7 Nike ads from TTD and 5 more from DV360 in the same week, with no one catching it.

---

## Part 5: The Three-Way Commercial Relationship

Nike has three separate contracts with three separate companies, and all three have to work together for a campaign to function:

```
        Nike (or their agency)
        /          |          \
   LiveRamp       TTD        DV360
  (identity)   (DSP #1)    (DSP #2)

LiveRamp <——— pre-built integration ———> TTD
LiveRamp <——— pre-built integration ———> DV360
```

| Party | What Nike pays for | Structure |
|---|---|---|
| LiveRamp | Data onboarding, segment activation per DSP, clean room queries | Annual fee + per-record + per-activation |
| The Trade Desk | Media spend + platform fee | % of media spend (~15–20%) |
| DV360 | Same | % of media spend |

Nike gets three separate invoices. Reconciling them into a coherent picture of "what did this campaign actually cost" is a manual spreadsheet exercise every month.

In practice, at Nike's scale, their media agency manages all of this operationally. Nike's brand team sets strategy and approves budgets. The agency has master agreements with LiveRamp and the DSPs, runs the trading desk day-to-day, and consolidates reporting.

This creates an inherent misalignment: the agency's incentive is to maintain vendor relationships and retain the brand's budget — not to aggressively audit vendor numbers.

---

## Part 6: The Sample Campaign Report

After a one-month campaign, Nike gets a report from TTD that looks roughly like this:

```
NIKE AIR MAX — APPAREL CROSS-SELL CAMPAIGN
Period: Apr 1–30, 2026  |  DSP: The Trade Desk
Audience pushed: 1,000,000 RampIDs
─────────────────────────────────────────────────────────

REACH & DELIVERY
  RampIDs matched in inventory        680,000   (68% of target)
  RampIDs never seen in flight        320,000   (not authenticated
                                                on any ATS publisher
                                                during campaign window)
  Total impressions served          4,760,000
  Avg frequency per reached user          7.0x

COST
  Total spend                         $30,464
  CPM                                   $6.40
  Viewable CPM                          $8.89
  Viewability rate                        72%

ENGAGEMENT
  Clicks                               28,560
  CTR                                   0.60%
  CPC                                   $1.07

ATTRIBUTION
  Click-through conversions             1,142   (purchased apparel, same session)
  View-through conversions              3,890   (purchased within 7 days of seeing ad)
  Total attributed conversions          5,032
  Revenue attributed                 $251,600
  CPA                                   $6.05
  ROAS                                   4.2x

UNMATCHED BREAKDOWN
  Not authenticated on any ATS publisher    180,000
  Authenticated, outside flight dates        90,000
  No ATS publisher coverage                  50,000
─────────────────────────────────────────────────────────
```

**The number to interrogate:** 32% unmatched. Those 320,000 customers were in Nike's CRM but invisible to the campaign — they never logged in to any publisher running ATS during April.

**The number to be skeptical of:** view-through conversions. 3,890 people saw a Nike ad and later bought apparel — but would some of them have bought anyway? Without a holdout group (people in the audience who were deliberately not shown the ad), there's no way to know. The ROAS of 4.2x may be real or significantly inflated.

This is the exact problem we cover in depth in [Your Platform Attribution Numbers Will Never Add Up to Your Actual Sales](/blog/platform-attribution-numbers-dont-add-up) — the structural reasons why platform-reported ROAS systematically overstates incremental return, and what it takes to measure what's actually working.

---

## Part 7: The Full Flow with Latency

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — SETUP                              Days 0–14
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Nike CRM] → [LiveRamp ingest] → [Graph resolution] → [Segment]
   D+0           D+0 to D+3        D+1 to D+7          D+14
 10M records    PII hashed        Det + probabilistic  1M RampIDs
 uploaded       SHA-256           matching             ready

Challenges:
✗ Match rate only 50–80% (old emails, no graph entry)
✗ Offline buyers (in-store) harder to resolve than digital
✗ LiveRamp charges per record regardless of match rate


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — ACTIVATION                        Hours 0–24
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1M RampIDs] → LiveRamp pushes → TTD       live H+4
                              → DV360      live H+8
                              → Amazon     live H+24

Challenges:
✗ Each DSP ingests at different speeds
✗ Segment refreshes daily — not real time
✗ Customer converts today; segment doesn't know until tomorrow
✗ Nike pays per activation destination


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — REAL-TIME BIDDING              ~150ms total
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sarah loads NYT                                   0ms
ATS JavaScript fires, captures hashed email      +5ms
LiveRamp resolves to RampID, returns envelope   +80ms
NYT sends ad request to SSP (with envelope)     +90ms
SSP fans bid request to all DSPs               +100ms
TTD decrypts envelope, checks Nike audience    +120ms
  → RampID in list? Bid $8 CPM
  → Not in list? Pass or bid $0.40
Winning bid returned to SSP                    +140ms
Ad serves                                      +150ms

Challenges:
✗ ATS envelope generation (~80ms) eats into 100ms auction timeout
✗ Sarah not logged in → no RampID → blind impression
✗ TTD and DV360 both bid on same impression independently
✗ No cross-DSP frequency cap


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — DAILY REPORTING                  D+1 to D+2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[DSP logs] → [Overnight aggregation] → [Nike dashboard]
   D+1              D+1 to D+2               D+2

Challenges:
✗ TTD says 400K reached. DV360 says 300K. Overlap unknown.
✗ No unified view without manual reconciliation
✗ Conversion attribution window hasn't closed yet


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — ATTRIBUTION (Clean Room)       D+14 to D+30
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Nike CRM conversions] → [Clean room join] → [Lift report]
        D+7                    D+14               D+21
  who bought apparel      RampID match        exposed vs
  after seeing ad         brand ∩ publisher    control group

Challenges:
✗ k-anonymity floor — segments under ~50 people return no data
✗ Offline conversions (in-store) arrive days late
✗ Double-counting across DSPs unless you run a unified query
✗ Nike pays LiveRamp per query
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Part 8: The Structural Tension

The most important thing to understand about this whole system isn't the technology — it's the incentive structure.

**LiveRamp** charges at every step: onboarding, activation per DSP, clean room queries, attribution. Their business model requires being the mandatory intermediary in every transaction. The encrypted envelope model enforces this — you cannot use RampID without going through LiveRamp infrastructure to decrypt it.

**The DSPs** charge a percentage of media spend. Their incentive is to show strong performance metrics so brands spend more. View-through attribution, which credits the DSP for any conversion that happens after someone sees an ad, directly serves this incentive. Almost no DSP surfaces holdout groups proactively.

**The agency** manages relationships with both vendors. Their incentive is to maintain those relationships and retain the brand's budget, not to aggressively audit vendor numbers.

**The brand's CMO** sees a 4.2x ROAS in a deck and approves next year's budget.

The sophisticated brands — the ones with in-house programmatic teams, their own measurement layer, and the willingness to run holdout tests — see very different numbers from this system. Everyone else is essentially letting vendors grade their own homework.

For the full strategy layer on top of this infrastructure — how to think about first-party data, audience architecture, channel activation, and building a measurement program that isn't captured by vendor incentives — see the [Brand & Buy-Side Playbook](/blog/brand-buyside-programmatic-playbook).

---

## The One-Paragraph Version

*RampID is LiveRamp's identity solution for cookieless advertising. A brand uploads their CRM data, LiveRamp resolves those records against their identity graph using both deterministic and probabilistic matching, and produces a list of RampIDs — pseudonymous tokens tied to people, not devices. The brand activates those audiences through DSPs, who use the RampIDs to identify and bid on the right impressions in real-time auctions. Publishers generate RampIDs for authenticated users via LiveRamp's ATS JavaScript, pass them encrypted in the bid stream, and DSPs match them against pre-loaded audience lists in under 150 milliseconds. Post-campaign, brands use LiveRamp's clean room to join their conversion data against impression logs for attribution. LiveRamp sits as a mandatory intermediary in every step — identity resolution, audience activation, and measurement — and charges for each one.*

---

*Clearpath Analytics works with brand and agency teams on identity strategy, clean room implementation, and measurement programs that aren't dependent on vendor-reported numbers. [Get in touch](https://clearpath-analytics.vercel.app) if you're trying to understand what your programmatic program is actually doing.*
