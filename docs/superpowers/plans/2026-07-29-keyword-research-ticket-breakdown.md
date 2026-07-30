# Keyword Research Ticket Breakdown — frylane.com Airport-Bus Niche

> **For agentic workers:** This plan splits `docs/keyword-research-brief-airport-bus-vn.md` into small tickets for phased execution. Each ticket = one feature in `feature_list.json` (id prefix `kw-`).
>
> **Source:** Brief authored 2026-07-29 by automated research agent; 23 keyword samples (12 EN intl primary + 5 EN scenario + 3 VN secondary + 3 misc). Verified volume estimates require Google Ads Keyword Planner — out of scope for ticket creation.

**Goal:** Convert the 23 keyword samples from the brief into individually-tracked tickets (feature_list.json `kw-*` entries) grouped by Tier (KD-based priority), so each article can be built test-first, committed independently, and ranked independently.

**Architecture:** Each ticket produces:
1. One article Page component (EN) in `web/src/routes/articles/<Slug>Page.tsx`
2. (If VI mirror needed) one mirror component in `web/src/routes/articles/<Slug>PageVI.tsx`
3. Meta entry in `web/src/seo/metaConfig.ts`
4. Route line in `web/src/App.tsx`
5. Sitemap `<url>` entry in `web/public/sitemap.xml`
6. Playwright SEO test entry in `web/e2e/seo.spec.ts`
7. Feature entry in `feature_list.json` (status: `pending` → `passing`)

Reuse `AirportArticleLayout` + `BusArticleConfig` for bus-route articles. New layout variant `ComparisonArticleLayout` for #5/#6/#7/#13 (comparison articles) — see Ticket 0.

**Tech Stack:** React 18, TypeScript, Tailwind, react-router-dom@6, react-helmet-async@2, existing `AirportArticleLayout`.

---

## Global Constraints

- Use `AirportArticleLayout` for all bus-route articles (already exists at `web/src/components/Layout/AirportArticleLayout.tsx`)
- Use shared `PageLayout` for non-article pages (Privacy, Terms — already done)
- Design tokens: `primary`, `ink`, `ink-soft`, `surface-border` — no hardcoded colors
- EN at root path (`/slug`), VI mirror at `/vi/vietnamese-slug`
- Title ≤ 60 char, contains year (2026)
- Above-the-fold: key info (price + time + 3-step) visible without scroll on mobile (≤375px)
- FAQ schema (JSON-LD) required — 5–8 questions per article
- No `<h2>` inside another `<h2>` — heading hierarchy strict
- Internal linking: each new article links to ≥2 existing articles (bus-86, bus-109, bus-152, scam)
- All verification commands per AGENTS.md: `cd web && npx tsc --noEmit`, `cd web && npm test`, `cd web && npx playwright test --project=chromium`

---

## Ticket Inventory (23 keyword → 23 features + 2 infra)

### Phase 0 — Infra (do FIRST, unblocks everything)

| ID | Title | Why first |
|---|---|---|
| `kw-0-comparison-layout` | Create `ComparisonArticleLayout` for #5/#6/#7/#13 | Comparison articles have different structure (table + pros/cons) — no point building 4 articles then refactor |
| `kw-0-sitemap-auto` | Convert `sitemap.xml` to Vite build-time generation | Manual sitemap drift is root cause of stale indexing; also unblocks Phase 1/2 batch updates |

### Phase 1 — Tier 1 Quick Wins (KD < 30, target first 30 days)

Per brief §4 "Tier 1 = KD<30, rankable in 90 days for low-authority site."

| ID | Keyword | KD | EN Page | VI Mirror |
|---|---|---|---|---|
| `kw-13-bus-109-vs-152` | `tan son nhat airport bus 109 vs 152` | 18 | ✓ | ✓ |
| `kw-22-tuyen-86-gio` | `tuyến 86 nội bài giờ` | 22 | (already in #2) | ✓ standalone VI |
| `kw-4-bus-152-fare` | `bus 152 saigon fare` | 22 | ✓ (already exists as `Bus152Page`) | ✓ (exists) |
| `kw-14-grab-safe-reddit` | `is grab safe at hanoi airport reddit` | 22 | ✓ | — |
| `kw-16-luggage-fee` | `airport bus luggage fee vietnam` | 25 | ✓ | ✓ |
| `kw-17-t2-exit-time` | `t2 international noibai how long to exit` | 26 | ✓ | ✓ |
| `kw-3-bus-109` | `bus 109 saigon airport` | 25 | ✓ (exists) | ✓ (exists) |
| `kw-2-bus-86` | `bus 86 hanoi airport` | 28 | ✓ (exists) | ✓ (exists) |
| `kw-21-xe-buyt-noi-bai` | `xe buýt sân bay nội bài` | 28 | (already in #2) | ✓ standalone VI |
| `kw-18-8pm-arrival` | `8pm arrival hanoi airport bus still running` | 15 | ✓ | — |

**10 Phase 1 tickets. 5 already-done (count toward feature_list). 5 net-new.**

### Phase 2 — Tier 2 Medium (KD 30–45, target 30–60 days)

| ID | Keyword | KD | EN Page | VI Mirror |
|---|---|---|---|---|
| `kw-7-grab-vs-bus-han` | `grab vs bus airport hanoi` | 30 | ✓ | ✓ |
| `kw-23-grab-noi-bai-gia` | `grab nội bài giá bao nhiêu 2026` | 32 | (covered by #7) | ✓ standalone VI |
| `kw-6-cheapest-sgn` | `cheapest way from airport saigon district 1` | 35 | ✓ | ✓ |
| `kw-19-noibai-first-time` | `what to do at noibai airport first time` | 35 | ✓ | ✓ |
| `kw-12-han-hoan-kiem` | `hanoi airport to hoan kiem lake` | 39 | ✓ | ✓ |
| `kw-5-cheapest-han` | `cheapest way from airport hanoi` | 41 | ✓ | ✓ |
| `kw-10-scam-warning` | `airport scam vietnam taxi` | 42 | ✓ (exists as `ScamPage`) | ✓ (exists) |
| `kw-15-late-night-han` | `late night airport transfer hanoi` | 30 | ✓ | ✓ |
| `kw-11-how-to-get-han` | `how to get from hanoi airport to city` | 44 | ✓ | ✓ |

**9 Phase 2 tickets. 1 already-done (#10). 8 net-new.**

### Phase 3 — Tier 3 Pillars (KD 45+, target 6–12 months)

| ID | Keyword | KD | EN Page | VI Mirror |
|---|---|---|---|---|
| `kw-8-noibai-old-quarter` | `noi bai airport to old quarter` | 45 | ✓ (covered by #11) | ✓ |
| `kw-9-tsn-district-1` | `tan son nhat airport to district 1` | 48 | ✓ (covered by #6) | ✓ |
| `kw-1-pillar-airport-bus` | `bus from airport to city center` | 38 (medium actually) | ✓ pillar page | ✓ |

**3 Phase 3 tickets. All net-new.**

### Phase 4 — Site Infrastructure (Parallel work, do when blocked on content)

| ID | Title | Notes |
|---|---|---|
| `kw-0-gsc-setup` | Verify `frylane.com` on GSC + GA4 + create Google Ads account | Brief §6 Day 1 |
| `kw-0-keyword-sheet` | Create `docs/seo/keyword-sheet.csv` from brief | Living document |
| `kw-0-internal-link-graph` | Audit + enforce ≥2 internal links per article | Done after Phase 1 |
| `kw-0-content-refresh-cadence` | Calendar reminder: refresh top 10 articles every 6 months | Out of code, but ticket documents process |
| `kw-0-bus-departure-countdown-vi` | Verify the countdown UI shows on VN-side too | Quick QA pass |

---

## Ticket Count Summary

| Phase | Total tickets | Already done | Net new |
|---|---|---|---|
| Phase 0 (Infra) | 2 | 0 | 2 |
| Phase 1 (Tier 1) | 10 | 5 | 5 |
| Phase 2 (Tier 2) | 9 | 1 | 8 |
| Phase 3 (Tier 3) | 3 | 0 | 3 |
| Phase 4 (Infra/Process) | 5 | 0 | 5 |
| **TOTAL** | **29** | **6** | **23** |

**Done already:** `kw-2`, `kw-3`, `kw-4`, `kw-10`, plus part of `kw-22`/`kw-21` (covered by #2). All others pending.

---

## Standard Ticket Structure (template)

Every `kw-*` ticket follows this structure. Replace `<SLUG>`, `<KD>`, `<KEYWORD>` per ticket.

### Files
- Create: `web/src/routes/articles/<Slug>Page.tsx`
- Create (if VI): `web/src/routes/articles/<Slug>PageVI.tsx`
- Modify: `web/src/seo/metaConfig.ts` — add `MetaConfig` entry
- Modify: `web/src/App.tsx` — add `<Route>`
- Modify: `web/public/sitemap.xml` — add `<url>`
- Modify: `web/e2e/seo.spec.ts` — add test for title/description/canonical/hreflang/FAQ schema
- Modify: `feature_list.json` — add `kw-<slug>` entry

### Interfaces
- Consumes: `AirportArticleLayout` (bus articles) OR `ComparisonArticleLayout` (kw-0-0 then kw-5/6/7/13)
- Produces: `<Slug>Page` component matching existing `BusArticleConfig` shape; SEO meta entry; sitemap entry; Playwright test

### Step 1: Write failing Playwright SEO test first
```typescript
test('<Slug> SEO meta', async ({ page }) => {
  await page.goto('/<slug>');
  await expect(page).toHaveTitle(/<TITLE_REGEX>/);
  // description, canonical, hreflang, FAQ schema assertions
});
```
Run: `cd web && npx playwright test e2e/seo.spec.ts -g "<slug>" --project=chromium`
Expected: FAIL (page not yet routed)

### Step 2: Create the page component
Use `AirportArticleLayout` config pattern. Example at `web/src/routes/articles/Bus152Page.tsx:36-58`.

### Step 3: Add meta + route + sitemap + test
Wire all 4 sites. Re-run Playwright test → should pass.

### Step 4: Verify
- `cd web && npx tsc --noEmit` → exit 0
- `cd web && npx playwright test e2e/seo.spec.ts --project=chromium` → all pass
- `cd web && npm test` → all pass

### Step 5: Commit
```bash
git add web/src/routes/articles/<Slug>Page*.tsx web/src/seo/metaConfig.ts web/src/App.tsx web/public/sitemap.xml web/e2e/seo.spec.ts feature_list.json
git commit -m "feat(kw): <keyword> — Tier <N>, KD <KD>, EN+VI"
```

---

## Recommended Execution Order (calendar)

### Week 1 (foundation)
- `kw-0-comparison-layout` (2 days)
- `kw-0-sitemap-auto` (1 day, parallel)
- `kw-0-gsc-setup` (1 hour, parallel)
- `kw-0-keyword-sheet` (1 hour, parallel)

### Week 2–3 (Phase 1 quick wins, highest leverage)
- `kw-13-bus-109-vs-152` (3 days — comparison article, needs new layout)
- `kw-17-t2-exit-time` (2 days — leverages exit-time data, high E-E-A-T)
- `kw-18-8pm-arrival` (1 day — long-tail, short article)
- `kw-16-luggage-fee` (1 day — FAQ-style)
- `kw-14-grab-safe-reddit` (2 days — needs Reddit research)

### Week 4–6 (Phase 2 medium)
- `kw-7-grab-vs-bus-han` (3 days)
- `kw-6-cheapest-sgn` (3 days)
- `kw-5-cheapest-han` (3 days — can pair with #7)

### Week 7–10 (Phase 2 continued + Phase 3 pillar)
- `kw-19-noibai-first-time` (4 days — high-trust pillar)
- `kw-11-how-to-get-han` (4 days — pillar hub)
- `kw-1-pillar-airport-bus` (5 days — biggest, hub for everything)

### Ongoing
- `kw-0-internal-link-graph` after each phase
- `kw-0-content-refresh-cadence` setup after Phase 2

---

## Coverage Check

| Brief requirement | Ticket |
|---|---|
| 12 EN intl keywords | Phase 1 + 2 + 3 EN pages (18 articles, some shared) |
| 5 EN scenario long-tail | #15 #16 #17 #18 #19 → Phase 1 + 2 |
| 3 VN secondary | #21 #22 #23 → Phase 1 + 2 |
| Tiered approach (60/30/10 effort split) | Phase 1 (6 tickets) + Phase 2 (9 tickets) + Phase 3 (3 tickets) |
| lean_intl commitment (EN first) | All EN routes ship before VI mirror in each phase |
| Hreflang pairing | Every VI mirror ticket must update `metaConfig.ts` `alternateEN` |
| FAQ schema required | Playwright test asserts `application/ld+json` `FAQPage` presence |

---

## Spec Coverage vs Brief

| Brief §  | What | Ticket mapping |
|---|---|---|
| §3.1 (GSC 4-filter) | Monthly audit | `kw-0-content-refresh-cadence` (process, not code) |
| §3.2 (Autocomplete + PAA) | Initial discovery | `kw-0-keyword-sheet` (already done in brief) |
| §3.3 (Trends 5-year) | Seasonality timing | `kw-0-content-refresh-cadence` |
| §4 (20 keywords) | Article production | All `kw-N-` tickets |
| §5 (7 mistakes) | Anti-patterns to avoid | Built into ticket template "Above-the-fold" + "FAQ schema" requirements |
| §6 (weekly checklist) | One-time setup | `kw-0-gsc-setup` + `kw-0-keyword-sheet` |
| §7 (sources) | Reference only | n/a |

---

## Execution Options

**Plan complete.** 29 tickets total, 23 net-new. Each ticket is independent except:
- All Phase 1/2/3 EN articles depend on `kw-0-comparison-layout` (if comparison-style)
- All sitemap updates depend on `kw-0-sitemap-auto` (recommended to do first)

**1. Subagent-Driven (recommended)** — dispatch fresh subagent per ticket, review between, fast iteration

**2. Inline Execution** — run sequentially in this session, with `AskQuestion` checkpoint between batches

**3. Hybrid** — do Phase 0 inline (small), then subagent-drive Phase 1+

Which approach?
---

## Appendix: How to complete `kw-0-gsc-setup` (human-only, 60 min)

This ticket is **not** implementable by an agent. The user must complete it manually. Estimated time: 60 minutes total. Required: Google account (any), DNS access for `frylane.com`, credit card (NOT charged) for Google Ads.

### Step 1 — Verify `frylane.com` on Google Search Console (15 min)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add property → URL prefix** → enter `https://frylane.com`.
3. Choose verification method: **HTML tag** (easiest).
4. Copy the meta tag Google gives you, e.g.:
   ```html
   <meta name="google-site-verification" content="abc123XYZ" />
   ```
5. Open `web/index.html` and paste the tag inside `<head>`. Save.
6. Run `npm run build` and deploy `web/dist/` to `frylane.com` (Vercel/Netlify auto-deploy if set up).
7. Back in GSC, click **Verify**. Should pass within 60 seconds.
8. Submit `sitemap.xml` URL: in GSC sidebar → **Sitemaps** → paste `https://frylane.com/sitemap.xml` → Submit.

### Step 2 — Set up Google Analytics 4 (15 min)

1. Go to [analytics.google.com](https://analytics.google.com).
2. Click **Admin → Create Account** → name "Frylane" → click **Create**.
3. Click **Create Property** → name "frylane.com" → timezone "Vietnam" → currency "VND" → Create.
4. Choose platform: **Web** → enter `https://frylane.com` → copy the **Measurement ID** (format `G-XXXXXXXXXX`).
5. Open `web/index.html` and paste inside `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
6. Deploy. Verify in GA4 **Realtime** tab that 1 active user appears (your own visit).

### Step 3 — Create Google Ads account (10 min, no campaigns)

1. Go to [ads.google.com](https://ads.google.com).
2. Click **Start now** → sign in with the same Google account as GSC.
3. Click **Switch to Expert mode** → **Create account without a campaign**.
4. Set country "Vietnam", timezone "Vietnam", currency "VND".
5. Enter billing info (credit card — **NOT charged** because we won't run campaigns).
6. Once in the Google Ads dashboard, navigate to **Tools → Keyword Planner**.
7. Click **Discover new keywords** → enter a seed (`bus from airport to city center`) → view volume range.
8. **Repeat for the top 10 keywords from `docs/seo/keyword-sheet.csv`.** Update the `volume_range` column in the CSV with the verified Google data.

### Step 4 — Mark `kw-0-gsc-setup` complete in `feature_list.json`

Once all 3 steps above are done, edit `feature_list.json`:

- Find the `kw-0-gsc-setup` entry.
- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  GSC verified via HTML tag (added to web/index.html, deployed). GA4 measurement ID G-XXXXXXXXXX added to web/index.html. Google Ads account created, Keyword Planner unlocked. Volume ranges for top-10 keywords updated in docs/seo/keyword-sheet.csv.
  ```

Commit:
```bash
git add web/index.html docs/seo/keyword-sheet.csv feature_list.json
git commit -m "docs(kw-0-gsc-setup): GSC + GA4 + Google Ads verified"
```

### Why this isn't automated

Adding `<meta name="google-site-verification">` to `web/index.html` is technically possible, but the **verification token** is a secret value that proves you control the domain. The agent must not hardcode it into the repo. The Google Ads account creation is genuinely a human-only flow (requires a credit card, billing setup, and acceptance of Google Ads terms).
