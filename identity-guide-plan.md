# Clearpath Identity Resolution Guide — Content Plan

## What this is

A parallel content cluster to the measurement guide. Same hub-and-spoke structure, different question.

- Measurement guide answers: **which methodology should I use?**
- Identity guide answers: **how much can I trust my data inputs?**

The link between the two: identity resolution quality sets the ceiling on what any measurement methodology can achieve. MTA match rates, MMM data completeness, clean room query reliability — all of them are downstream of how well you've solved identity.

---

## The hub page

**URL:** `/tools/identity-guide` (or `/identity`)
**What it is:** The interactive widget (screenshot from May 20 session) — already built, needs to be ported to Astro the same way as the measurement hub.

**Features:**
- SELECT BUSINESS TYPE: 6 tiles (E-commerce, Omnichannel retail, Automotive, Digital product/SaaS, Pharma/healthcare, Financial services)
- SIGNAL SOURCES & STRENGTH table: signal name, description, strength bar, deterministic/probabilistic tag, strong/moderate/weak rating
  - Email (checkout) — deterministic, strong
  - Device / cookie ID — probabilistic, moderate
  - Login session — deterministic, strong
  - Payment fingerprint — deterministic, strong
  - Behavioural clickstream — probabilistic, moderate
  - IP address — probabilistic, weak
- USER JOURNEY: step-by-step with the identity signal at each step, color-coded green/amber/red
- IDENTITY PROFILE panel: channels, purchase cycle, anonymous %, match rate, key gap, regulation, CDP necessity bar, resolution confidence bar

**The organizing spine:** Deterministic vs probabilistic identity. Deterministic = real identifier (email hash, login, loyalty card, NPI). Probabilistic = inferred from signals (IP, device fingerprint, behavior), always a confidence score not a fact.

**Tech approach:** Same as measurement hub — `.astro` page with vanilla JS `<script>` block. No new framework dependencies.

---

## The connector post (write first — links both clusters)

**File:** `identity-resolution-measurement-ceiling.md`
**Title:** "Why Identity Resolution Quality Sets the Ceiling on Every Measurement Methodology"
**Angle:** The relationship between the two hubs made explicit. MTA can't exceed its match rate. MMM data completeness is only as good as the spend and outcome data it ingests. Clean room query results are bounded by the join quality between participating datasets. The measurement program you can run is determined before you choose a methodology — it's determined by how well you've solved identity upstream.
**Key diagram:** A "ceiling" chart — each methodology's theoretical maximum accuracy vs. its practical accuracy given typical identity resolution quality by business type.
**Length:** ~8 min read. Bridges both content clusters.

---

## The 6 industry articles

### 1. E-commerce identity resolution
**Profile from widget:** 2 channels (web, email), purchase cycle hours-days, ~55% anonymous sessions, match rate 75–88%, key gap pre-login attribution, GDPR/CCPA
**Angle:** E-commerce is the middle case — not as clean as digital SaaS, not as broken as automotive. The 55% anonymous session problem and what to do about it. Progressive identity capture (email before checkout, not just at checkout). Why the pre-login window is where most attribution credit is misassigned. First-party cookie strategy post-iOS 14.
**Key diagram:** The session-to-identity funnel — what % of sessions become known at each step

### 2. Omnichannel retail identity resolution
**Profile:** Highest CDP necessity score. POS + loyalty database + web analytics + ad platform all using different identifiers, none natively connected.
**Angle:** The 4-system join problem that makes omnichannel measurement so hard. Loyalty program design as identity infrastructure — the brands that get this right treat loyalty as a measurement investment, not just a discount program. In-store conversion attribution. The offline-online identity bridge.
**Key diagram:** The 4-system identifier mismatch — POS transaction_id vs loyalty_id vs cookie vs MAID, and what it takes to join them

### 3. Automotive identity resolution
**Profile:** Worst-case scenario. 80% of the meaningful journey (multi-year consideration) produces no individual signal. DMS purchase record is the richest data point but sits in a system never designed to connect to media.
**Angle:** Already covered in the measurement post — lean on that content, expand the identity-specific angle. The DMS integration problem. Test drive forms as the primary deterministic capture point (only ~20% of buyers). The OEM/dealer data ownership conflict at the identity level.
**Cross-link:** `/blog/automotive-measurement-why-its-broken`

### 4. Digital product / SaaS identity resolution
**Profile:** Easy mode. Near-entire journey is authenticated. Match rates 95%+. Biggest problem is the 30-second pre-registration window.
**Angle:** Why SaaS has solved identity by accident (the product IS the identity graph — user_id ties everything). What this means for measurement: full-funnel attribution is achievable in a way that's impossible for most other business types. The PLG-specific identity challenge: free trial → paid conversion with a gap in authenticated sessions. CDP necessity is low — the product database already does the job.
**Key diagram:** Authenticated vs anonymous session coverage across the funnel — SaaS vs e-commerce comparison

### 5. Pharma / healthcare identity resolution
**Profile:** Strictest privacy constraints. HCP vs DTC are fundamentally different identity problems.
**Angle:** Two completely different identity graphs in one industry. DTC: consumer identity under HIPAA, very limited data sharing. HCP: NPI number as the deterministic anchor — the cleanest professional identifier that exists in marketing. The NPI-to-claims data join that powers pharmaceutical measurement. Why pharma clean rooms are the most mature in any vertical (driven by IQVIA, IMS data infrastructure).
**Key diagram:** HCP identity graph (NPI → prescribing data → media exposure) vs DTC identity graph (much weaker)

### 6. Financial services identity resolution
**Profile:** Regulated identity. Strong deterministic signals (account number, SSN fragment, verified email) but strict constraints on how they can be used.
**Angle:** The GLBA and FCRA constraints on data use for marketing. Why financial services clean rooms exist — it's not optional, it's compliance-driven. The paradox: FS has the best identity data (fully verified, regulatory-grade) and the most restricted ability to use it. How Snowflake Native Apps solve the "can't share but need to join" problem.
**Cross-link:** `/blog/mmm-for-financial-services`

---

## Recommended sequence to resume

1. Write the connector post (`identity-resolution-measurement-ceiling.md`) — highest leverage, links both clusters
2. Write Digital product / SaaS article — shortest, clearest, good contrast with Automotive
3. Write Omnichannel retail article — highest CDP necessity, most relevant to Snowflake
4. Write E-commerce article — most search volume
5. Write remaining three (Pharma, Financial services, Automotive supplement)
6. Build hub page — port widget to Astro vanilla JS, same approach as measurement hub
7. Cross-link both hubs from a new `/tools` index page

---

## SEO targets by article

| Article | Primary keyword | Monthly search estimate |
|---|---|---|
| Connector post | "identity resolution marketing measurement" | Medium |
| E-commerce | "e-commerce identity resolution" | High |
| Omnichannel retail | "omnichannel customer identity" | Medium-high |
| Digital SaaS | "SaaS user identity attribution" | Medium |
| Pharma | "HCP identity resolution marketing" | Low, high intent |
| Financial services | "financial services marketing data compliance" | Medium |
| Automotive | "automotive marketing identity data" | Low, high intent |
