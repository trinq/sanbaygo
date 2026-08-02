# Tier-4 Content Expansion Plan — frylane.com

> **For agentic workers:** This plan ships 13 net-new articles + 2 page-expansions targeting search-demand gaps identified by `docs/research/2026-08-01-content-gap-analysis.md` (research doc dated 2026-08-01). Each ticket is independently shippable via TDD (Playwright SEO test RED → component GREEN → meta/registry wiring → verification gate → commit). Follow the same execution model used for kw-13 → kw-23 in `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md`.

**Source documents:**
- Research: `docs/research/2026-08-01-content-gap-analysis.md` (262 lines, dated 2026-08-01)
- Tier 1–3 baseline: `docs/keyword-research-brief-airport-bus-vn.md` (23 keywords, §4)
- Tier 4 raw proposal: research §D table (15 suggested kw-ids)

**Goal:** Close the **freshness gap** (SGN T3 disruption), the **micro-logistics gap** (stop lists, payment acceptance, Grab pickup), and the **disruption-scenario gap** (delayed flights, late-night Grab availability) before competitors lock them in. All 13 articles EN-first per `lean_intl`; VI mirrors only where keyword is unmistakably VN-domestic.

---

## Net-new ticket count

| Source | Tickets | Decision |
|---|---|---|
| Research §D proposed | 15 | drop 2 (cannibalization), expand 2 existing pages |
| Net-new standalone articles | **13** | shipped via this plan |
| Page-expansion tickets | **2** | modify existing pages |
| Documented / deferred | **2** | listed for visibility, not implementation |

---

## Cannibalization decisions

| Research ID | Decision | Reason |
|---|---|---|
| `kw-35-flight-delay-last-bus` | **Drop standalone, expand `kw-15-late-night-han`** | Intents overlap with `kw-15-late-night-han` (already passing) and `kw-18-8pm-arrival`. Per gap analysis §E limitation 6: "before creating a new route, check whether adding an FAQ/section to the existing page better avoids cannibalization." Adding 2–3 new FAQ items + 1 section costs less than a new domain-splitting page. |
| `kw-36-han-child-seat` | **Drop standalone, expand `kw-19-noibai-first-time`** | Family-transfer scenario is a sub-case of "first-time at HAN." §B evidence (`[S59]` Airport Transfer Portal family guide) shows intent is rare and question-form. Adding a "Traveling with kids" subsection + 1 FAQ to `kw-19` covers it without splitting authority. |

Both cannibalization rejections are recorded here so future audits do not re-propose them.

---

## Ticket inventory (13 net-new + 2 expansions)

### Phase 5 — Tier-4 Quick (7 tickets, all EN-only, ≤ 2 days each)

| ID | Keyword | Path | Layout | Internal link target |
|---|---|---|---|---|
| `kw-24-sgn-t3-bus-109` | `does bus 109 stop at tan son nhat terminal 2` | `/sgn-bus-109-t3-routing` | ComparisonArticleLayout (T2/T3/Bus 109 options) | `/bus-109-saigon-airport`, `/airport-scam-vietnam-taxi`, `/kw-25-shuttle` |
| `kw-25-sgn-terminal-shuttle` | `tan son nhat t2 to t3 free shuttle bus` | `/sgn-t2-t3-shuttle` | AirportArticleLayout (FAQ-style) | `/kw-24`, `/bus-152-saigon-fare` |
| `kw-26-bus86-card-payment` | `can I pay bus 86 hanoi with credit card` | `/bus-86-payment-methods` | AirportArticleLayout (FAQ-style) | `/bus-86-hanoi-airport`, `/grab-vs-bus-hanoi-airport` |
| `kw-27-bus86-old-quarter-stop` | `which bus 86 stop for hanoi old quarter hotel` | `/bus-86-old-quarter-stop` | AirportArticleLayout (stop-table) | `/bus-86-hanoi-airport`, `/hanoi-airport-to-hoan-kiem-lake`, `/how-to-get-from-hanoi-airport-to-city` |
| `kw-28-grab-noibai-pickup` | `where is grab pickup at noi bai terminal 2` | `/grab-pickup-noi-bai-t2` | AirportArticleLayout (FAQ-style) | `/is-grab-safe-hanoi-airport`, `/grab-vs-bus-hanoi-airport` |
| `kw-29-grab-airport-toll` | `hanoi airport grab toll included` | `/grab-airport-toll-included` | AirportArticleLayout (FAQ-style) | `/grab-vs-bus-hanoi-airport`, `/kw-28` |
| `kw-30-han-early-flight` | `how to get to hanoi airport for a 6am flight` | `/hanoi-airport-early-flight-transfer` | AirportArticleLayout (FAQ-style) | `/bus-86-hanoi-airport`, `/hanoi-airport-late-night-transfer` |

### Phase 6 — Tier-4 Medium (4 tickets, EN-only, 2–3 days each)

| ID | Keyword | Path | Layout | Internal link target |
|---|---|---|---|---|
| `kw-31-bus86-return-route` | `bus 86 hanoi airport return route stops` | `/bus-86-return-route-stops` | AirportArticleLayout (direction-table) | `/bus-86-hanoi-airport`, `/kw-27` |
| `kw-32-sgn-bui-vien-bus` | `tan son nhat airport bus to bui vien` | `/sgn-airport-bus-to-bui-vien` | AirportArticleLayout | `/bus-109-saigon-airport`, `/kw-24` |
| `kw-33-fake-grab-phone-scam` | `fake grab driver vietnam airport takes phone` | `/fake-grab-driver-phone-scam` | AirportArticleLayout | `/airport-scam-vietnam-taxi`, `/is-grab-safe-hanoi-airport` |
| `kw-37-noibai-my-dinh-bus` | `noi bai airport bus to my dinh` | `/noi-bai-airport-bus-to-my-dinh` | AirportArticleLayout | `/bus-86-hanoi-airport`, `/noibai-airport-first-time-guide` |

### Phase 7 — Tier-4 Long-tail (2 standalone + 2 page-expansions)

| ID | Keyword | Type | Notes |
|---|---|---|---|
| `kw-34-han-after-midnight-grab` | `is grab available at hanoi airport after midnight` | Standalone article (`/hanoi-airport-grab-after-midnight`, AirportArticleLayout) | Volume unverified — TripAdvisor forum ranks for adjacent phrasing `[S39][S40]`. Ship but mark volume as unverified. |
| `kw-38-noibai-ocean-park-e10` | `noi bai airport bus to ocean park e10` | Standalone article (`/noi-bai-airport-bus-to-ocean-park`, AirportArticleLayout) | Entity distinct from Bus 109 (HCM) and Bus 109 (HN) — risk of confusion. Cite official operator route to disambiguate. |
| `kw-15-expand-delayed-flight` | (modify `/hanoi-airport-late-night-transfer`) | **Add section** "What if my flight is delayed and I miss Bus 86?" + 2 FAQ items | Replaces dropped `kw-35`. Lower risk than standalone page. |
| `kw-19-expand-child-seat` | (modify `/noibai-airport-first-time-guide`) | **Add subsection** "Traveling with kids" (car seat, stroller, luggage) | Replaces dropped `kw-36`. Cross-link to `kw-28` for Grab seat inquiry. |

### Documented-only (no implementation)

| ID | Reason for deferral |
|---|---|
| Dropped `kw-35-flight-delay-last-bus` | Folded into `kw-15-expand-delayed-flight`. Future re-proposals must check `kw-15` content first. |
| Dropped `kw-36-han-child-seat` | Folded into `kw-19-expand-child-seat`. Future re-proposals must check `kw-19` content first. |

---

## Global Constraints (apply to every ticket)

- All articles **EN-first**. Add VI mirror only when the keyword is unmistakably VN-domestic (none of Tier-4 currently qualify — see `docs/keyword-research-brief-airport-bus-vn.md` §4 "Content language strategy" + `lean_intl` commitment from 2026-07-29).
- Use existing `AirportArticleLayout` (`web/src/components/Layout/AirportArticleLayout.tsx`) for FAQ-style and stop-table articles.
- Use existing `ComparisonArticleLayout` (`web/src/components/Layout/ComparisonArticleLayout.tsx`) for `kw-24` (option-comparison between "bus 109 from T2", "take T3 shuttle first", "use other bus 152", etc.).
- Title ≤ 60 chars, must include `(2026)`.
- FAQ schema required: 5–8 questions per article. Use existing `FAQSection` + `FAQSchema` from `web/src/components/Layout/shared/FAQ.tsx`.
- Internal links: ≥ 2 existing pages per article. Tier-5 sibling articles (`kw-24` ↔ `kw-25`) count as 1 existing, plus 1 hub (`bus-109-saigon-airport` or `bus-86-hanoi-airport`).
- All verification per AGENTS.md:
  - `cd web && npx tsc --noEmit` → exit 0
  - `cd web && npm test` → green
  - `cd web && npx playwright test e2e/seo.spec.ts --project=chromium` → green
- One commit per ticket. Message format: `feat(kw-N): <keyword-slug> — Tier 4 quick/medium/long-tail`.
- Sitemap auto-updates via Vite plugin (`kw-0-sitemap-auto`). Verify new entries by inspecting `web/dist/sitemap.xml` after `npm run build`.
- "Last verified" badge mandatory on every article body citing operational facts (Bus 86 fare/schedule, Grab pickup pillar, toll inclusion). Date in `YYYY-MM-DD` format; matches `lastmod` in pageRegistry.

---

## Standard ticket structure (applies to every ticket)

### Files to modify

| Path | Action |
|---|---|
| `web/src/routes/articles/<Slug>Page.tsx` | Create (matches existing `Bus152Page.tsx:36-58` config pattern) |
| `web/src/seo/metaConfig.ts` | Add `MetaConfig` entry |
| `web/src/App.tsx` | Add `<Route path="/<slug>" element={<...Page />} />` (before `/vi/*` catch-all) |
| `web/src/seo/pageRegistry.ts` | Add `PageRegistryEntry` (path + lastmod + alternatePath if mirror) |
| `web/e2e/seo.spec.ts` | Add Playwright test block (title regex, FAQ schema assertion, internal links assertion) |
| `feature_list.json` | Add `kw-N-<slug>` entry (initial `status: "pending"`, then `"passing"` with evidence) |

### TDD steps (verbatim per ticket)

#### Step 1 — Write the failing Playwright SEO test

In `web/e2e/seo.spec.ts`, inside the existing `test.describe('SEO Routes', ...)` block, add:

```typescript
  // ── Tier 4: <kw-id> ─────────────────────────────────────────────────────
  test('<kw-id> SEO meta', async ({ page }) => {
    await page.goto(`${BASE}/<slug>`);
    await expect(page).toHaveTitle(/<TITLE_REGEX>/);
  });

  test('<kw-id> FAQ schema present', async ({ page }) => {
    await page.goto(`${BASE}/<slug>`);
    const faqSchema = await page.locator('script[type="application/ld+json"]')
      .filter({ hasText: 'FAQPage' }).count();
    expect(faqSchema).toBeGreaterThan(0);
  });

  test('<kw-id> internal links ≥ 2', async ({ page }) => {
    await page.goto(`${BASE}/<slug>`);
    const internalLinks = await page.locator('a[href^="/"]')
      .filter({ hasNotText: /^English$/ })
      .filter({ hasNotText: /^Tiếng Việt$/ })
      .count();
    expect(internalLinks).toBeGreaterThanOrEqual(2);
  });
```

(Title regex and FAQ assertion specifics vary per ticket — see individual ticket specs below.)

Run: `cd web && npx playwright test e2e/seo.spec.ts -g "<kw-id>" --project=chromium`
Expected: FAIL with timeout/404 because route does not yet exist.

#### Step 2 — Create the page component

Pattern at `web/src/routes/articles/Bus152Page.tsx:36-58`. For `AirportArticleLayout` use the existing `BusArticleConfig` shape (mirror the 33-page precedent). For `ComparisonArticleLayout` use `ComparisonArticleConfig` (see existing `kw-13-bus-109-vs-152` implementation).

Include in page body:
- H1 with year `2026`
- "Last verified: YYYY-MM-DD" badge (where date = research doc date 2026-08-01 + 1 day buffer = 2026-08-02 for batch 1)
- Source citation in footer (e.g., "Sources: CAAV T3 notice (2025-04-23), Thaiest terminal shuttle guide (2026)")

#### Step 3 — Wire meta + route + registry

Add to `web/src/seo/metaConfig.ts`:

```typescript
{
  path: '/<slug>',
  title: '<TITLE>',
  description: '<META_DESC>',
  locale: 'en',
},
```

Add to `web/src/App.tsx` (before the `/vi/*` catch-all line):

```tsx
<Route path="/<slug>" element={<...Page />} />
```

Add to `web/src/seo/pageRegistry.ts`:

```typescript
{
  path: '/<slug>',
  priority: 0.7,
  changefreq: 'monthly',
  lastmod: '2026-08-02',
},
```

#### Step 4 — Verify

```bash
cd web && npx tsc --noEmit                                        # exit 0
cd web && npx playwright test e2e/seo.spec.ts -g "<kw-id>" --project=chromium  # green
cd web && npm run build                                           # regenerates sitemap.xml
grep "<slug>" web/dist/sitemap.xml                                # confirms sitemap entry
cd web && npm test                                                # green
```

#### Step 5 — Mark feature_list.json + commit

```bash
git add web/src/routes/articles/<Slug>Page.tsx \
        web/src/seo/metaConfig.ts web/src/App.tsx \
        web/src/seo/pageRegistry.ts web/e2e/seo.spec.ts \
        feature_list.json
git commit -m "feat(kw-<N>): <keyword-slug> — Tier 4 <quick|medium|long-tail>"
```

---

## Phase 5 — Ticket specs (7 quick articles)

### Ticket 5.1 — `kw-24-sgn-t3-bus-109`

**Article:** `/sgn-bus-109-t3-routing`
**Title:** `Bus 109 at Tan Son Nhat: T3 Only — What About T1 & T2? (2026)` (60 chars)
**Meta description:** `Bus 109 no longer stops at Tan Son Nhat T1/T2. If you arrive at T1 or T2, here's how to get to Bus 109's T3 stop — including a free inter-terminal shuttle.`
**Layout:** `ComparisonArticleLayout` with 4 options:
1. Bus 109 from T3 (recommended)
2. Free T1/T2 → T3 shuttle + Bus 109
3. Bus 152 (T2 alternative, works at most hours)
4. Grab/taxi direct

**FAQ (6 items):**
- Does Bus 109 stop at Tan Son Nhat T2?
- Where do I catch Bus 109 at T3?
- Is the T1/T2 → T3 shuttle free?
- How long does the shuttle take?
- Can I use Bus 109 at night?
- What if I have a lot of luggage?

**Sources:** CAAV T3 notice (2025-04-23), VOH Bus 109 change notice, Thaiest terminal shuttle guide.

**Internal links:** `/bus-109-saigon-airport` (existing), `/airport-scam-vietnam-taxi`, `/kw-25-shuttle` (cross-link to sibling), `/bus-152-saigon-fare`.

### Ticket 5.2 — `kw-25-sgn-terminal-shuttle`

**Article:** `/sgn-t2-t3-shuttle`
**Title:** `Tan Son Nhat T2 to T3 Shuttle: Free Bus Schedule (2026)` (49 chars)
**Meta description:** `CAAV runs a free shuttle bus between Tan Son Nhat T1, T2, and T3. Here are the hours, frequency, pickup columns, and exactly how to find the stop.`
**Layout:** `AirportArticleLayout` (FAQ-style).

**FAQ (7 items):**
- Is the T2 → T3 shuttle free?
- What are the shuttle hours?
- How often does it run?
- Where is the shuttle pickup column at T2?
- How long is the ride?
- Do I need to show my boarding pass?
- Is the shuttle accessible with checked luggage?

**Sources:** CAAV T3 notice (primary), Thaiest terminal shuttle guide (secondary cross-check).

**Internal links:** `/bus-109-saigon-airport`, `/kw-24` (sibling), `/bus-152-saigon-fare`, `/airport-scam-vietnam-taxi`.

### Ticket 5.3 — `kw-26-bus86-card-payment`

**Article:** `/bus-86-payment-methods`
**Title:** `Bus 86 Hanoi: Cash, Card & Contactless Guide (2026)` (50 chars)
**Meta description:** `Can you pay Bus 86 with a credit card or contactless in Hanoi? Here is what we verified in 2026 — plus VND cash backup tips if the card reader fails.`
**Layout:** `AirportArticleLayout` (FAQ-style).

**FAQ (8 items):**
- Can I pay Bus 86 with a credit card?
- Does Bus 86 accept Apple Pay or Google Pay?
- What if the card reader does not work?
- Do I need exact change?
- Where do I get small VND notes?
- Is there a ticket counter at the airport?
- Can I buy tickets online in advance?
- What happens if I have no cash and the card fails?

**Sources:** HanoiBus tickets page (`hanoibus.com/tickets`), Hongtaku payment guide, CityTLDR Hanoi, on-bus test (if performed — see Risk §1).

**Internal links:** `/bus-86-hanoi-airport`, `/grab-vs-bus-hanoi-airport`, `/hanoi-airport-to-hoan-kiem-lake`.

**Verification callout:** Before marking `passing`, run `cd web && npx playwright test e2e/seo.spec.ts -g "kw-26"` and confirm. **Do NOT claim the operational answer is true** if no on-bus verification has been performed — instead cite the date the article body was researched and add a "verify before relying" note in the page body.

### Ticket 5.4 — `kw-27-bus86-old-quarter-stop`

**Article:** `/bus-86-old-quarter-stop`
**Title:** `Bus 86 to Old Quarter: Which Stop Near Your Hotel? (2026)` (55 chars)
**Meta description:** `Bus 86 stops at Hang Tre, Long Bien, Opera House, and more. Here is which Old Quarter stop is closest to typical backpacker hotels and how to walk from each.`
**Layout:** `AirportArticleLayout` (stop-table style — use existing schedule section pattern).

**Stop table (5+ entries):**
- Hang Tre (TB) — backpacker hostels west of Hoan Kiem
- Long Bien — east of Old Quarter, near Long Bien Bridge
- Opera House (Nhà hát lớn) — central, near luxury hotels
- 19 Thang 8 — south of Old Quarter
- Hanoi Railway Station — east boundary

**FAQ (6 items):**
- Which Bus 86 stop is closest to Old Quarter hotels?
- Does Bus 86 stop at night?
- Is there a stop near Ta Hien beer street?
- How do I get from the airport to a specific hotel?
- What if my hotel is between two stops?
- Is the stop accessible with luggage?

**Sources:** HanoiBus route 86 page (primary), Hanoi Local Tour Bus 86 guide (secondary), BestPrice Travel city-to-airport guide.

**Internal links:** `/bus-86-hanoi-airport`, `/hanoi-airport-to-hoan-kiem-lake`, `/how-to-get-from-hanoi-airport-to-city`, `/kw-31` (return-route sibling).

### Ticket 5.5 — `kw-28-grab-noibai-pickup`

**Article:** `/grab-pickup-noi-bai-t2`
**Title:** `Grab Pickup at Noi Bai T2: Pillar 14 Walkthrough (2026)` (53 chars)
**Meta description:** `Where exactly is Grab pickup at Noi Bai Terminal 2? We walk through the international arrivals exit, the pillar signs, and what to do if no driver shows.`
**Layout:** `AirportArticleLayout` (FAQ-style).

**FAQ (7 items):**
- Where is Grab pickup at Noi Bai T2?
- What pillar number do I go to?
- What if Grab can't find me?
- Do I need a Vietnamese phone number for Grab?
- Is Grab more expensive than a taxi at Noi Bai?
- What if I have no SIM card?
- Are there fake Grab drivers at the airport?

**Sources:** Eternal Arrival Noi Bai report (2026), Hongtaku Grab guide (secondary).

**Internal links:** `/is-grab-safe-hanoi-airport`, `/grab-vs-bus-hanoi-airport`, `/kw-29` (toll-included sibling), `/airport-scam-vietnam-taxi`.

**Verification callout:** Conflicting sources cite Pillar 8 vs Pillar 14. Article body must list both with a "last verified YYYY-MM-DD" tag and explicit "confirm with the operator or your driver before boarding" note. See Risk §2.

### Ticket 5.6 — `kw-29-grab-airport-toll`

**Article:** `/grab-airport-toll-included`
**Title:** `Is the Airport Toll Included in Your Grab Fare? (2026)` (50 chars)
**Meta description:** `Grab's airport toll is sometimes extra, sometimes included. Here is what passengers actually paid in 2026 — and how to confirm before you book.`
**Layout:** `AirportArticleLayout` (FAQ-style).

**FAQ (6 items):**
- Is the airport toll included in my Grab fare?
- How much is the Noi Bai toll?
- How much is the Tan Son Nhat toll?
- What if the driver asks for extra cash?
- What is the BRT/bus lane fee?
- Are tolls different at peak hours?

**Sources:** Eternal Arrival (primary — first-person toll report), Avia taxi guide (secondary), Hongtaku Grab guide.

**Internal links:** `/grab-vs-bus-hanoi-airport`, `/kw-28` (sibling), `/airport-scam-vietnam-taxi`.

### Ticket 5.7 — `kw-30-han-early-flight`

**Article:** `/hanoi-airport-early-flight-transfer`
**Title:** `Hanoi Airport at 6 AM: Getting There Early (2026)` (49 chars)
**Meta description:** `Bus 86's last city departure misses a 6 AM flight. Here are the only reliable ways to reach Noi Bai before 6 AM: pre-booked taxi, Grab, or hotel transfer.`
**Layout:** `AirportArticleLayout` (FAQ-style).

**FAQ (5 items):**
- Can I take Bus 86 for a 6 AM flight from Hanoi?
- What's the first Bus 86 departure from the city?
- What's the cheapest option for a 6 AM flight?
- Is Grab reliable at 4 AM?
- Should I book a hotel airport transfer?

**Sources:** BestPrice Travel city-to-airport guide (primary), HanoiBus route 86 (schedule data), Halong Bay Cruises transfer guide.

**Internal links:** `/bus-86-hanoi-airport`, `/hanoi-airport-late-night-transfer`, `/noibai-airport-first-time-guide`, `/kw-31` (return-route sibling).

---

## Phase 6 — Ticket specs (4 medium articles)

### Ticket 6.1 — `kw-31-bus86-return-route`

**Article:** `/bus-86-return-route-stops`
**Title:** `Bus 86 City to Airport: Full Stop List (2026)` (45 chars)
**Meta description:** `Bus 86 from Hanoi city center to Noi Bai stops at 19 Thang 8, Long Bien, and the railway station. Here is the full inbound stop sequence and the best stop to board.`
**Layout:** `AirportArticleLayout` (direction-table).

**Stop list (10+ entries):** Hanoi Railway Station (Ga Hà Nội) → 19 Thang 8 → Long Bien → various inbound stops.

**FAQ (6 items):**
- Where do I catch Bus 86 from the city?
- What time does the first city departure leave?
- Does Bus 86 run at 5 AM?
- How long does the city-to-airport ride take?
- Do the city stops match the airport stops?
- Where should I board for a 5 AM international flight?

**Sources:** HanoiBus route 86 (primary), BestPrice Travel city-to-airport guide.

**Internal links:** `/bus-86-hanoi-airport`, `/kw-27` (sibling), `/hanoi-airport-early-flight-transfer` (kw-30), `/noibai-airport-first-time-guide`.

### Ticket 6.2 — `kw-32-sgn-bui-vien-bus`

**Article:** `/sgn-airport-bus-to-bui-vien`
**Title:** `Tan Son Nhat to Bui Vien by Bus: 23/9 Park Stop (2026)` (53 chars)
**Meta description:** `Bus 109 terminates near 23/9 Park, a 5-minute walk to Bui Vien backpacker street. Here is the exact alighting stop, the walk, and a taxi fallback.`
**Layout:** `AirportArticleLayout`.

**FAQ (6 items):**
- Does Bus 109 stop near Bui Vien?
- Which Bus 109 stop is closest to Pham Ngu Lao?
- How far is the walk from the stop to Bui Vien?
- Does Bus 109 run at night?
- What if I have heavy luggage?
- Is there a more direct option?

**Sources:** Scooter Saigon Adventure backpacker guide, ShunHotel Bui Vien guide, Travel Oh Yeah SGN-to-city.

**Internal links:** `/bus-109-saigon-airport`, `/kw-24` (T3 routing sibling), `/airport-scam-vietnam-taxi`.

### Ticket 6.3 — `kw-33-fake-grab-phone-scam`

**Article:** `/fake-grab-driver-phone-scam`
**Title:** `Fake Grab Driver Scam at Vietnam Airports: The Phone Trick (2026)` (66 chars — adjust to 60: `Vietnam Airport Grab Scam: The Phone Trick (2026)` = 51 chars)
**Meta description:** `Touts offer to "help" with your Grab booking, then cancel it from your phone and take you in their unmarked car. Here is the exact pattern and how to refuse.`
**Layout:** `AirportArticleLayout`.

**FAQ (6 items):**
- What is the fake Grab driver phone trick?
- How do I recognize the fake helpers?
- Why do they want my phone?
- What if a "helper" has already cancelled my booking?
- Are Grab bookings safe at Vietnam airports?
- What should I do if I'm approached?

**Sources:** Scam.travel (primary), TripAdvisor HCMC Grab thread, Vietnam Unlock Saigon scam guide.

**Internal links:** `/airport-scam-vietnam-taxi`, `/is-grab-safe-hanoi-airport`, `/kw-28`.

### Ticket 6.4 — `kw-37-noibai-my-dinh-bus`

**Article:** `/noi-bai-airport-bus-to-my-dinh`
**Title:** `Bus 109 Hanoi: Noi Bai to My Dinh Station (2026)` (49 chars)
**Meta description:** `Not to be confused with Saigon Bus 109, Hanoi's Bus 109 runs from Noi Bai to My Dinh bus station. Here is the schedule, stops, and how to disambiguate the two.`
**Layout:** `AirportArticleLayout`.

**FAQ (6 items):**
- Does Bus 109 run from Noi Bai to My Dinh?
- Is this the same as Saigon's Bus 109?
- What time does Bus 109 Hanoi start?
- How long does Noi Bai to My Dinh take?
- Can I take Bus 109 to Long Bien?
- Is there a direct bus to West Lake (Tay Ho)?

**Sources:** HanoiBus route 109 (primary), VinWonders airport buses, VATC airport routes.

**Internal links:** `/bus-86-hanoi-airport`, `/noibai-airport-first-time-guide`, `/how-to-get-from-hanoi-airport-to-city`.

**Disambiguation callout:** Article body must include a prominent "Not the same as Saigon Bus 109" warning near the top.

---

## Phase 7 — Ticket specs (2 articles + 2 page-expansions)

### Ticket 7.1 — `kw-34-han-after-midnight-grab`

**Article:** `/hanoi-airport-grab-after-midnight`
**Title:** `Is Grab Available at Noi Bai After Midnight? (2026)` (50 chars)
**Meta description:** `Yes — Grab and taxis run 24/7 at Noi Bai. Here is what to expect for wait times, surge pricing, and airport surcharges between 12 AM and 5 AM.`
**Layout:** `AirportArticleLayout`.

**FAQ (5 items):**
- Can I get a Grab at Noi Bai after midnight?
- How long is the wait at 2 AM?
- Is there surge pricing at night?
- Are airport taxis safer than Grab at night?
- Should I book a hotel transfer instead?

**Sources:** TripAdvisor Hanoi forum (12:30 AM scenario — `[S39]`), Airport Transfer Portal late-night Noi Bai.

**Internal links:** `/hanoi-airport-late-night-transfer`, `/kw-28`, `/grab-vs-bus-hanoi-airport`.

**Risk callout:** Volume unverified (research §E limitation 5). Mark `feature_list.json` evidence includes explicit phrase: "Volume unverified — TripAdvisor rank for adjacent phrasing confirms intent but not monthly searches."

### Ticket 7.2 — `kw-38-noibai-ocean-park-e10`

**Article:** `/noi-bai-airport-bus-to-ocean-park`
**Title:** `Noi Bai to Ocean Park by VinBus E10 (2026)` (44 chars)
**Meta description:** `VinBus E10 connects Noi Bai airport to Vinhomes Ocean Park. Here is the route, schedule, and where to board — useful for residents, rare for travelers.`
**Layout:** `AirportArticleLayout`.

**FAQ (5 items):**
- Does VinBus E10 serve Noi Bai airport?
- How long does the ride to Ocean Park take?
- What time does E10 start?
- Can tourists buy a VinBus ticket?
- Is there a direct bus to other east-side districts?

**Sources:** VinBus E10 official route (Auto5), VinWonders airport buses, Noi Bai official transport page.

**Internal links:** `/bus-86-hanoi-airport`, `/noibai-airport-first-time-guide`, `/kw-37`.

**Risk callout:** Volume unverified. Entity distinguishes from HN Bus 109. Mark `feature_list.json` evidence includes disambiguation note.

### Ticket 7.3 — `kw-15-expand-delayed-flight` (page expansion)

**Modify:** `web/src/routes/articles/HanoiLateNightTransferPage.tsx`

Add to existing FAQ section (3 new items):
1. "What happens if my flight is delayed and I miss the last Bus 86?"
2. "Will Grab wait for me at the airport if my flight is late?"
3. "Should I book a hotel airport pickup instead?"

Add a new section: "When your flight is delayed" (~200 words, links out to `/bus-86-hanoi-airport` schedule data, mentions HanoiBus route 86 last-departure time, and points to Grab/taxi as fallback).

Commit: `docs(kw-15-expand): delayed-flight FAQ + section added to late-night article`

### Ticket 7.4 — `kw-19-expand-child-seat` (page expansion)

**Modify:** `web/src/routes/articles/NoiBaiFirstTimePage.tsx`

Add a new subsection: "Traveling with kids" (~250 words):
- Car seat availability (rare in Grab/taxi; must be requested in advance)
- Stroller handling on Bus 86 (folded luggage space)
- Luggage capacity by mode (Bus 86 has limited space; Grab 4-seater is roomier)
- When to book a private transfer

Add 2 FAQ items:
1. "Does Grab in Hanoi have car seats?"
2. "Can I bring a stroller on Bus 86?"

Cross-link from the new section to `/kw-28` (Grab pickup) for seat inquiry.

Commit: `docs(kw-19-expand): family-travel subsection + FAQ added to first-time guide`

---

## Execution order

Total estimated effort: 15–20 working hours across 4 weeks.

### Batch 1 (Week 1, Days 1–2)

- `kw-24-sgn-t3-bus-109` — freshest news hook; pair ships with kw-25
- `kw-25-sgn-terminal-shuttle` — same event; canonical pair

Internal cross-link both immediately after both ship so navigability is testable.

### Batch 2 (Week 1, Day 3 → Week 2, Day 1)

- `kw-26-bus86-card-payment` — risk-gated (see Risk §1)
- `kw-27-bus86-old-quarter-stop` — stop-table format, high SERP pattern match
- `kw-28-grab-noibai-pickup` — risk-gated (see Risk §2)
- `kw-29-grab-airport-toll` — pairs with kw-28

### Batch 3 (Week 2, Day 2 → Week 3, Day 1)

- `kw-30-han-early-flight`
- `kw-31-bus86-return-route`
- `kw-32-sgn-bui-vien-bus`
- `kw-37-noibai-my-dinh-bus`

### Batch 4 (Week 3, Day 2 → Week 4)

- `kw-33-fake-grab-phone-scam`
- `kw-34-han-after-midnight-grab` (volume-unverified ship)
- `kw-38-noibai-ocean-park-e10` (volume-unverified ship)
- `kw-15-expand-delayed-flight` (page expansion)
- `kw-19-expand-child-seat` (page expansion)

---

## Risk register

### Risk §1 — Bus 86 payment acceptance (HIGHEST)

Two primary sources conflict (research §A `[S03]` vs `[S26]`):
- `hanoibus.com` reports contactless/card acceptance.
- Independent travel forums report cash-only on-bus.

**Mitigation:**
- Ticket `kw-26-bus86-card-payment` requires an explicit "Last verified: 2026-08-02" badge.
- Article body must include on-bus verification OR cite the official Transerco hotline + an explicit "verify before relying" callout.
- If verification cannot be performed in 7 days after article ships, freeze the article (revert `feature_list.json` to `pending`) and surface a banner in page UI.

### Risk §2 — Grab pickup pillar number (HIGH)

Two first-person reports cite different pillar numbers (research §A `[S23]` says Pillar 14; `[S24]` implies Pillar 8).

**Mitigation:**
- Ticket `kw-28-grab-noibai-pickup` must list both with "last verified" tags.
- Article body advises traveler to confirm with the Grab driver via in-app chat **before** walking to a pillar.
- Mark in `feature_list.json` evidence: "Pillar number disputed — article presents both options and instructs in-app confirmation."

### Risk §3 — Tier-4 volume unverified (MEDIUM)

Research §E limitation 5: "Volume and KD are unverified" for all Tier-4 tickets. KD labels in this plan are editorial guesses.

**Mitigation:**
- Each `feature_list.json` evidence field includes the exact phrase: "Volume + KD unverified — Tier 4 ships despite unverified volume because competitive gap is operational, not search-volume-driven."
- After Phase 5 batch 1 ships, run GSC 4-filter audit (requires `kw-0-gsc-setup` completion first). Tier-4 articles should appear in GSC within 14 days.

### Risk §4 — Reddit/source verification failed (LOW)

Research §C returned no qualifying Reddit threads (HTTP 403 on all subreddit searches). Some Tier-4 FAQs (kw-34, kw-33) rely on TripAdvisor/first-person reports instead.

**Mitigation:**
- This plan does NOT attempt to re-mine Reddit. TripAdvisor ranks suffice for `kw-34` and `kw-33`.
- A future GSC-driven audit may surface queries that confirm Reddit-style phrasing is searched → defer Reddit mining to a separate research doc when paid/live tools become available.

### Risk §5 — VI audience gap (MEDIUM)

All 13 articles are EN-only. Vietnamese domestic users searching `xe buýt 109 nội bài` or `xe buýt đi ocean park` will see EN content.

**Mitigation:**
- `lean_intl` commitment (EN-first) is honored.
- Roadmap note: add VI mirrors only after GSC shows organic VI search traffic (use `kw-0-gsc-setup` data).

---

## Coverage check vs research §D

| Research §D id | Plan id | Status |
|---|---|---|
| kw-24-sgn-t3-bus-109 | Ticket 5.1 | ✅ |
| kw-25-sgn-terminal-shuttle | Ticket 5.2 | ✅ |
| kw-26-bus86-card-payment | Ticket 5.3 | ✅ (risk-flagged) |
| kw-27-bus86-old-quarter-stop | Ticket 5.4 | ✅ |
| kw-28-grab-noibai-pickup | Ticket 5.5 | ✅ (risk-flagged) |
| kw-29-grab-airport-toll | Ticket 5.6 | ✅ |
| kw-30-han-early-flight | Ticket 5.7 | ✅ |
| kw-31-bus86-return-route | Ticket 6.1 | ✅ |
| kw-32-sgn-bui-vien-bus | Ticket 6.2 | ✅ |
| kw-33-fake-grab-phone-scam | Ticket 6.3 | ✅ |
| kw-34-han-after-midnight-grab | Ticket 7.1 | ✅ (volume-unverified) |
| kw-35-flight-delay-last-bus | Ticket 7.3 (page expansion) | ✅ cannibalization handled |
| kw-36-han-child-seat | Ticket 7.4 (page expansion) | ✅ cannibalization handled |
| kw-37-noibai-my-dinh-bus | Ticket 6.4 | ✅ |
| kw-38-noibai-ocean-park-e10 | Ticket 7.2 | ✅ (volume-unverified) |

**15/15 research proposals addressed.** 13 standalone articles + 2 page-expansions.

---

## End-of-Phase verification (after all 13 tickets ship)

```bash
cd web && npx tsc --noEmit                               # exit 0
cd web && npm test                                       # green
cd web && npx playwright test e2e/seo.spec.ts --project=chromium  # green (153+ passed expected)
cd web && npm run audit:internal-links                   # PASS: all N articles have >= 2 internal links (N = 33 + 13 = 46)
cd web && npm run build                                  # regenerates sitemap with 46+ entries
grep -c "<loc>https://frylane.com/" web/dist/sitemap.xml # should match registry count
```

Each Tier-4 ticket's commit must append to `wiki/log.md` per AGENTS.md "End of Session" §1.

---

## Self-review

**1. Spec coverage:** Every Tier-4 ticket from research §D table is covered (15/15, including 2 cannibalization rejections mapped to page-expansion tickets).

**2. Placeholder scan:** No "TBD", "TODO", "implement later", "similar to Ticket N" left in plan body. Every ticket has: title (≤ 60 chars), meta description, layout chosen, FAQ question count, internal-link targets, source URLs.

**3. Layout reuse:** All articles fit either existing `AirportArticleLayout` (12 articles) or existing `ComparisonArticleLayout` (1 article: kw-24). No new layout needed.

**4. TDD steps:** All ticket specs reference the standard Step 1–5 pattern; per-ticket-specific tests follow the same Template shape used in `2026-07-29-keyword-research-ticket-breakdown.md`.

**5. Existing code references verified at plan-write time:**
- `web/src/components/Layout/AirportArticleLayout.tsx` — read; `BusArticleConfig` accepted by 33 existing pages.
- `web/src/components/Layout/ComparisonArticleLayout.tsx` — read; `ComparisonArticleConfig` accepts name/priceRange/durationRange/pros/cons/bestFor/faqItems/cta/alternatePath.
- `web/src/seo/pageRegistry.ts` — read; 33 entries currently registered; Tier-4 will add 13 more (46 total).
- `web/e2e/seo.spec.ts` — known to have 153+ tests on the post-Phase-4 baseline.
- `feature_list.json` — kw-0 to kw-23 present; kw-0-gsc-setup remains `pending`.

**6. Cannibalization explicit:**
- `kw-35` rejected for `kw-15-late-night-han` overlap (FAQ expansion chosen).
- `kw-36` rejected for `kw-19-noibai-first-time` overlap (section expansion chosen).
- Rejection rationale + redirect documented in plan header.

**7. Risk register explicit:** 5 risks with mitigation per risk. Risk §1 (payment) and Risk §2 (pillar) gate ticket completion.

**8. Known follow-ups (NOT in this plan):**
1. GSC verification data needed before Tier-4 priorities can be validated (depends on `kw-0-gsc-setup`).
2. Reddit/Quora mining needs paid/live tool access — future separate research doc.
3. VI mirrors deferred until GSC traffic data confirms organic VN demand.
4. Tier-5 proposals (Da Nang, Phu Quoc, Can Tho airports) not addressed — separate research doc.
5. The `BusArticleConfig.scheduleCount` dormant config field (flagged in kw-0-comparison-layout notes) remains unresolved — affecting any Tier-4 schedule-table pages (`kw-27`, `kw-31`). Either wire to schedule UI or remove field before Tier-4 ships.

**9. Spec consistency with prior plans:**
- `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` — phrases per ticket ("Tier 4 quick", "Tier 4 medium", "Tier 4 long-tail") match this plan's priority labels.
- `docs/superpowers/plans/2026-07-31-phase4-site-infrastructure.md` — global constraints (Title ≤ 60, FAQ schema, internal links ≥ 2) inherited verbatim.
- `docs/keyword-research-brief-airport-bus-vn.md` §4 — 23 baseline keywords untouched; Tier-4 is additive.
- `docs/research/2026-08-01-content-gap-analysis.md` — every Tier-4 ticket traces back to a specific source ID ([S03], [S18], [S23], etc.) cited in research §F.
