---
title: "Identity Resolution After Cookies: UID2 vs. RampID, Explained Structurally"
description: "UID2 and RampID solve the same post-cookie identity problem in fundamentally different ways. Here's what each one does, where each one works, and the architectural limitation neither vendor advertises."
date: 2026-05-05
keywords: ["identity resolution", "UID2", "RampID", "first-party data", "data clean rooms", "cookieless measurement"]
---

For two decades, the third-party cookie was the shared key that made cross-site advertising work. When a user visited a publisher and then a brand's website, both read the same cookie from the user's browser. That shared identifier made targeting, frequency capping, and attribution possible across the open web without any coordination between the publisher and the brand.

That model is over.

Safari blocked third-party cookies in 2017. Firefox followed. Chrome — which carries roughly 65% of global browser traffic — has moved through a years-long deprecation process that has effectively ended the practical utility of third-party cookies for most measurement and targeting use cases.

The advertising ecosystem has been building replacements. Two have emerged as the primary infrastructure for identity in the post-cookie environment: UID2, an open-source framework created by The Trade Desk, and RampID, a proprietary identity graph operated by LiveRamp.

They solve the same problem. They work at completely different layers of the stack and are designed for different use cases. Understanding the difference matters because using the wrong one for the wrong job produces measurement that looks correct but isn't.

## The Problem Both Are Solving

Before cookies, matching was technically simple. The browser held the cookie; both parties read it. The user had no visibility and no consent mechanism. It worked because the web didn't require either.

The post-cookie world requires consent and a different technical architecture. The shared key — the identifier that lets a publisher know that the user on their page is the same user who bought something on the brand's website — has to be rebuilt on a foundation the user has agreed to.

Both UID2 and RampID use the same starting material: the user's email address. When a user logs into a publisher or a brand's website and consents to personalized advertising, that email becomes the foundation for a privacy-safe identifier that can travel across the ecosystem without exposing the raw email to any third party.

The implementation from that shared starting point is where they diverge.

## How UID2 Works

UID2 is an open-source framework governed by Prebid.org and originally created by The Trade Desk. Its primary use case is the real-time bid stream — it's designed to replace the third-party cookie inside the OpenRTB protocol that powers programmatic advertising.

**Token generation:** When a user logs into a publisher and consents to personalized ads, the publisher sends the user's normalized email address to a UID2 Operator — either the central operator maintained by The Trade Desk or a private operator the publisher runs in their own infrastructure. The operator hashes the email with a salt and encrypts it using a rotating key, producing a UID2 token that is an opaque string.

**Token properties that matter:**

The token is deterministic. The same email always produces the same underlying UID2, which means a brand and a publisher can independently generate UID2 tokens from the same email address without sharing the email. When those tokens match, both parties know they're looking at the same user — without either party having transmitted a raw email address to the other.

The token is encrypted. The raw UID2 identifier never travels in the bid stream. Only DSPs that have joined the UID2 ecosystem have the decryption keys required to read it. A third party intercepting the bid request sees an opaque string.

The token rotates. Encryption keys change on a regular cadence — daily to weekly depending on configuration. A token intercepted today has a limited useful life. This is the property that makes UID2 safer than the third-party cookie, which was static and permanent.

**Where UID2 lives:** Inside the `user.id` field of an OpenRTB bid request — exactly where the third-party cookie user identifier used to live. It travels in real time, with the bid request, across the programmatic auction infrastructure.

**What UID2 enables:** Deterministic audience targeting and frequency capping across publishers where the user has logged in and consented. A DSP can match an incoming UID2 token against the brand's first-party data to decide whether to bid on that impression and at what price. A frequency cap that used to work across sites via cookie now works via UID2 token for the logged-in user population.

**The coverage constraint:** UID2 only works for logged-in users who have consented on publishers that have implemented the UID2 framework. On a major news publisher with high login rates, this might cover 40–60% of impressions. On a content site with low login rates, it might cover 5%. The programmatic web is still largely anonymous, and UID2 doesn't solve that problem — it solves the measurement and targeting problem for the consented, logged-in portion.

## How RampID Works

RampID is a proprietary identity graph operated by LiveRamp. Its primary use case is batch analytical joins for measurement, attribution, and audience building — not real-time bidding.

**How the match works:** The brand submits their customer email list to LiveRamp, which normalizes and hashes each email and maps it to a stable pseudonymous identifier — the RampID. The publisher does the same with their logged-in user base. LiveRamp's mapping is consistent: the same email always maps to the same RampID regardless of which party submitted it.

The result: the brand has a CRM file where each customer record carries a RampID instead of an email address. The publisher has an exposure log where each impression record carries a RampID instead of a login ID. Neither party knows what the other's RampID maps back to. But inside a clean room, both datasets can be joined on RampID to answer measurement questions — reach, overlap, conversion lift — without either party exposing raw emails or user IDs to the other.

**Where RampID lives:** In data files, warehouse tables, and clean room environments — not in the real-time bid stream. RampID is a batch token, updated through periodic file submissions to LiveRamp, not a live token refreshed per impression.

**What RampID enables:** Privacy-safe measurement and audience building at scale. It's the identity layer that makes clean room overlap queries work. It's also the foundation for audience onboarding — taking an offline CRM segment and activating it for digital targeting by mapping it to RampID and distributing that to DSPs and publishers.

**The coverage constraint:** RampID match rates depend on whether LiveRamp's graph contains the email address in question. For major consumer brands with large, well-maintained CRM databases, match rates typically run 60–80%. For niche B2B advertisers with email lists from conferences or direct sales — addresses LiveRamp may have never processed — match rates can drop to 20–30%. Below 40%, clean room measurement becomes directionally useful at best.

## The Structural Difference

The architectural distinction isn't a matter of preference — it determines which tool is appropriate for which use case.

| | UID2 | RampID |
|---|---|---|
| **Primary use case** | Real-time bidding, targeting | Batch measurement, clean room |
| **Latency** | Sub-second (lives in bid request) | Batch — hours to days |
| **Token lifecycle** | Rotates frequently (daily/weekly) | Stable pseudonym, updated periodically |
| **Who controls it** | Open-source, Prebid.org | LiveRamp (proprietary) |
| **Coverage** | Logged-in, consented users on UID2 publishers | Emails in LiveRamp's graph |
| **Where it works** | OpenRTB bid stream | Data files, warehouse tables, clean rooms |

Neither token is a complete replacement for the third-party cookie. Together, they cover a significant portion of the identity problem — but not all of it.

## The Identity Gap Nobody Advertises

Here's the architectural limitation that neither vendor leads with: neither UID2 nor RampID solves the full cross-channel identity problem, because the ecosystem contains multiple identity spaces that don't connect cleanly.

A single user might:

- Log into a news publisher and get a UID2 token and a RampID
- Browse a sports site without logging in — no persistent identifier, only probabilistic fingerprint
- Watch a streaming service on their smart TV — household-level device ID, not person-level
- See a digital billboard on their commute — no identifier whatsoever

This means the identity graph underlying any cross-channel measurement program looks like this in practice:

```
canonical_user_id
    ├── rampid (when email match is available)
    ├── uid2_token (when logged-in, consented, UID2-enabled publisher)
    ├── household_id (CTV and connected TV impressions)
    ├── probabilistic_cluster (device fingerprint fallback)
    └── null (DOOH, anonymous browsing without login)
```

The job of a well-built identity layer — whether that's LiveRamp's graph, a custom-built one in Snowflake, or a third-party identity resolution platform — is to stitch these spaces together using deterministic matches where available and probabilistic matches as fallback. The stitching quality determines the coverage and accuracy of every measurement query downstream.

## What This Means for Your Measurement Program

If you're using clean rooms for post-campaign measurement and your clean room vendor is telling you identity resolution is solved, they're simplifying. Here's what to actually track:

**Match rate by channel.** Your CRM-to-publisher match rate is not a single number — it varies by publisher type. Web publishers with logged-in users match better than mobile app publishers after ATT. CTV publishers match at household level. DOOH doesn't match at all. Your aggregate match rate hides significant variation by channel that affects how much weight to put on each channel's measurement output.

**Deterministic vs. probabilistic coverage.** The percentage of your matched impressions that are based on deterministic identity (same email, same RampID, certain match) versus probabilistic signals (inferred from device + IP + behavioral patterns, uncertain match) changes the confidence interval on your iROAS figures. Measurement based primarily on deterministic matches is defensible to a CFO. Measurement heavily weighted toward probabilistic matches is directional.

**Consent coverage.** UID2 and RampID both require user consent. The percentage of your impression volume covered by consented identity tokens is the percentage of your campaign that can be measured through these frameworks at all. For campaigns running heavy mobile or anonymous web inventory, that percentage may be lower than you expect.

None of this makes clean room measurement invalid. It makes it bounded — useful within the population it can see, uncertain about the population it can't. The honest measurement conversation is about knowing the size of each population and being explicit about what the numbers do and don't represent.

The brands that understand this are using it to improve their data strategy — investing in login programs, improving CRM hygiene, selecting publishers with higher authenticated user rates. The brands that don't are running clean room queries against low match rates and presenting the output as definitive.

The infrastructure doesn't tell you which one you're doing. That judgment is yours.
