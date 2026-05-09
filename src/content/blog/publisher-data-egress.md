---
title: "Publisher Data Egress: How Impression Logs Actually Get to Your Clean Room"
description: "Everyone explains what a clean room does. Nobody explains how the data gets there. The messy reality of publisher data egress — why it's harder than vendors suggest, and why it determines whether your measurement is defensible."
date: 2026-05-09
keywords: ["data clean rooms", "publisher data", "impression logs", "AdTech data pipelines", "data engineering"]
---

When a brand sets up a clean room measurement program, the conversation almost always focuses on the query layer — what business questions can we answer, how do we protect privacy, what does the output look like. That's the interesting part.

What rarely gets discussed is the data plumbing upstream: how does the publisher's impression log actually get into the shared environment in the first place? What format does it arrive in? How fresh is it? And why does the same ad impression look completely different depending on which publisher sent it?

This matters because the quality of your clean room measurement is entirely determined by the quality of the data going in. A clean room built on top of inconsistently normalized, hours-old, partially matched impression data produces measurement that looks precise but isn't. Understanding the egress problem is what separates a measurement program that actually works from one that produces confident-looking numbers nobody fully trusts.

## The Core Problem: No Two Publishers Are Alike

Every publisher has an ad server. Every ad server writes a log when an impression is served. And every ad server writes that log differently.

The same conceptual event — "this creative was shown to this user at this time on this placement" — is represented differently across the four major publisher types in the ecosystem. The field names differ. The timestamp formats differ. The user identifier type differs. The delivery cadence differs. In some cases, a user-level identifier doesn't exist at all.

Here's what that looks like in practice for the fields a clean room join actually needs:

| Field | Web (GAM) | Mobile (AppLovin) | CTV (Freewheel) | DOOH (Lamar) |
|---|---|---|---|---|
| User identifier | `cookie_id` | `idfa` / `gaid` | `household_id` | (none) |
| Timestamp | `event_time_usec` | `timestamp_ms` | `imp_time` | `play_start_utc` |
| Placement | `AdUnitId` | `placement_id` | `pod_position` | `screen_id` |
| Creative | `CreativeId` | `ad_id` | `asset_id` | `creative_name` |
| Price | `CPM` | `ecpm` | `net_rate` | `cpm_equivalent` |

Before a single clean room query can run, every row from every publisher needs to land in a unified schema with consistent field names, consistent timestamp formats, and a consistent identity token. That normalization work is the actual engineering problem. It happens before Snowflake, before the clean room, and it's largely invisible in vendor marketing materials.

## Web Publishers: The Most Mature Stack

Web publishers — major news sites, content networks, sports and entertainment properties — run their ad serving through Google Ad Manager (GAM) or Freewheel. These are the most mature and standardized systems in the ecosystem.

When an impression is served, GAM writes a structured log record immediately. The egress pattern is predictable: GAM exports these logs to Google Cloud Storage on an hourly basis, in compressed TSV or Avro format. Each file is typically 500MB to 5GB per hour for a large publisher. The schema is GAM's documented standard, which is relatively consistent across publishers using the same ad server.

For logged-in users — subscribers, registered users — the publisher assigns a first-party user ID that can be hashed and mapped to a RampID or UID2 token. For anonymous users, the identifier is either a third-party cookie (increasingly unavailable) or a probabilistic fingerprint. Post-cookie, this anonymous population has no persistent identifier, which means those impressions cannot be matched in a clean room join.

**Practical implication:** A premium news publisher with high subscription rates might have deterministic identity coverage on 60–70% of impressions. A content site with low login rates might have coverage on 10–15%. The clean room measurement you can run is limited to the matched population.

## Mobile App Publishers: High Volume, Disrupted Identity

The ad server in a mobile app is an embedded SDK — AppLovin's MAX, IronSource, Google's AdMob, or similar. When the SDK serves an impression, it fires an event to a collection endpoint, which feeds into a real-time stream — Kafka or AWS Kinesis — rather than the hourly batch files that web publishers produce.

The volume is enormous. A large mobile game can serve 500 million impressions per day. The data arrives continuously, not in hourly drops, which means the ingestion pipeline needs to handle streaming velocity rather than scheduled batch loads.

The user identifier is the device ID — IDFA on iOS or GAID on Android. Apple's App Tracking Transparency framework requires users to explicitly opt in to device ID tracking. The result: IDFA is unavailable for approximately 80% of iOS impressions. The mobile impression log, for most iOS users, has no persistent user-level identifier.

**Practical implication:** Mobile is high volume but low match rate for clean room purposes. The impressions you can match are biased toward users who have opted in to tracking or who are logged in — typically younger, more engaged, and more digitally active than the full audience. Measurement built on matched mobile impressions will overrepresent this population.

## CTV Publishers: Household-Level, Batch Delivery

CTV publishers use Freewheel or Google DAI as their ad server. The impression log structure is similar to web, but the user identifier is fundamentally different.

CTV operates at the household level, not the person level. The identifier might be a Roku ID, a Samsung ID, an IP-based household cluster, or a combination. When a household watches a streaming service on a connected TV, the impression is logged against that household identifier, not against an individual person. This creates a specific challenge for clean room joins: your CRM has person-level records, but the CTV exposure log has household-level records. Matching them requires a household-to-person resolution step that introduces additional uncertainty.

There is also ACR (Automatic Content Recognition) data — technology embedded in smart TVs that identifies what content is being displayed by comparing frames against a reference library. ACR gives publishers and measurement vendors the ability to log not just ad exposure but actual content viewing behavior. This is richer than digital impression data but comes with its own privacy compliance requirements.

The egress pattern for CTV is batch — typically daily rather than hourly, and often delivered via SFTP or S3. Schemas vary significantly across publishers.

**Practical implication:** CTV measurement in a clean room requires household-to-person resolution before the join can run. Match rates are typically lower than web and methodology is more complex. The measurement is valuable but requires explicit acknowledgment of the household vs. person gap.

## DOOH Publishers: No User Identity at All

Digital out-of-home — digital billboards, transit screens, airport displays, retail screens — is the most difficult publisher category for clean room measurement, and the one most often left out of measurement programs entirely.

DOOH publishers log play events — "creative X played on screen Y at time Z" — but have no user-level identifier whatsoever. There is no cookie, no device ID, no login. The standard approach is mobile location data: companies like Foursquare use opt-in mobile location signals to estimate how many devices were present near a DOOH screen during a given play window. The match to an advertiser's CRM is probabilistic, not deterministic.

The egress pattern is the least standardized in the ecosystem: API polling, daily CSV files, sometimes manual delivery. Data arrives days, not hours, after the impression event.

**Practical implication:** DOOH cannot be included in a deterministic clean room join. If you're running a multi-channel campaign that includes DOOH, accept that channel out of the measurement program or treat it as a separate probabilistic analysis. Don't let the absence of DOOH identity data corrupt the deterministic measurement from your other channels.

## The Normalization Layer: What Actually Has to Be Built

Before any of this data reaches Snowflake, a normalization layer has to do four things:

**Schema mapping.** Every source field gets mapped to a canonical target field. `event_time_usec` and `timestamp_ms` and `imp_time` all become `impression_timestamp_utc`. `AdUnitId` and `placement_id` and `pod_position` all become `placement_id`. This is the connector problem applied to publisher data — the same semantic concept expressed in dozens of different syntaxes.

**Identity tokenization.** Every user identifier — cookie ID, IDFA, GAID, household ID, login ID — gets hashed and mapped to a canonical identity token (RampID, UID2, or a consistent first-party hash) before the data enters Snowflake. This happens in the normalization layer, not inside the clean room. The clean room receives pre-tokenized data; it does not perform identity resolution itself.

**Deduplication.** Publisher logs occasionally produce duplicate records — the same impression logged twice due to delivery confirmation retries or network issues. Downstream measurement is corrupted by duplicates in ways that are difficult to diagnose after the fact.

**Completeness validation.** Each publisher file gets validated for expected volume and schema compliance before being passed downstream. A publisher that normally delivers 50 million impression rows per day should raise an alert if a file arrives with 5 million rows. Unexplained volume drops are usually a pipeline issue on the publisher's side.

Once this normalization layer has processed the data, it lands in Snowflake's impression log table via Snowpipe — the event-driven ingestion service that picks up files as they arrive in S3 and loads them automatically. The table is clustered on date and user token bucket so that clean room overlap queries can prune to the relevant date range and identity subset without scanning the full table.

## The Honest Summary

Publisher data egress is not a solved problem. It is a collection of partially compatible systems, each maintained by organizations with different incentives, different technical capabilities, and different privacy constraints, all trying to describe the same event in incompatible formats.

The brands that build rigorous clean room measurement programs understand this and build accordingly: they know which channels have deterministic identity coverage, they know their match rate by publisher type, and they treat measurement from high-match channels differently from measurement from low-match channels.

The brands that build fragile programs assume the data is clean when it arrives, run a single match rate figure across their entire impression universe, and present iROAS outputs with more precision than the underlying data quality supports.

The infrastructure is the same in both cases. The understanding of what that infrastructure is measuring — and what it isn't — is what separates defensible measurement from expensive guesswork.
