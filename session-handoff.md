# Session Handoff - SanBayGo MVP

## Currently Verified

| Feature | Status | Last Verified |
|---------|--------|---------------|
| seo-helmet-provider | passing | 2026-07-29 |
| seo-playwright-e2e | passing | 2026-07-29 |
| seo-review-fixes | passing | 2026-07-29 |
| kw-0-comparison-layout | passing | 2026-07-30 |
| kw-0-sitemap-auto | passing | 2026-07-30 |
| kw-13-bus-109-vs-152 | passing | 2026-07-30 |
| kw-18-8pm-arrival | passing | 2026-07-30 |

## Changes This Session

- Fixed broken Bus86Page.tsx import: `'../components/SEO'` → `'../../components/SEO'` (was 500 on /bus-86-hanoi-airport)
- Removed duplicate HelmetProvider from main.tsx (was already in App.tsx)
- Added web/e2e/seo.spec.ts with 7 Playwright E2E tests (all passing)
- Code review fixes (commit 6f8a05b):
  - SEOHelmet: self-referencing hreflang + removed unconditional homepage hreflang
  - sitemap.xml: lastmod dates, removed unreachable /vi/tuyen-86-noi-bai
  - App.tsx: wired ResultRoute to calculateTrip()
  - LandingPage: passes baggage + flightType URL params
  - HomePageVI: removed redundant LanguageProvider
  - metaConfig.ts: year to 2026
  - robots.txt: removed redundant Allow: /vi/
- Commits: `6f8a05b`, `9734052`, `37c087b`, `5f935f8`, `a31fc21`, `31b2bc8` (on feature/seo-domain-setup)
- **2026-07-29 (this session):** Extracted `AirportArticleLayout` shared component
  - Added `exitTimeSummary?: string` to `BusRoute` type (core/types/index.ts)
  - Added `exitTimeSummary` to BUS_86, BUS_109, BUS_152 data files
  - New component: web/src/components/Layout/AirportArticleLayout.tsx
  - Refactored Bus86Page, Bus109Page, Bus152Page to use shared component
  - All sections now standardized: Hero, Search CTA, Schedule, Stops, ScamWarning, TravelTime, ExitTime, GrabAlternative, FAQ, FAQSchema
  - TypeScript compiles clean, wiki lint clean, 17/17 SEO E2E tests pass
- **2026-07-29 (this session):** Wired missing SEO routes in App.tsx
  - Created Bus109PageVI, Bus152PageVI (EN h1 + VI metaConfig entry)
  - Created ScamPage + ScamPageVI with FAQ schema, safety tips, fare table
  - Added missing metaConfig entries: `/vi/tuyen-152-tan-son-nhat`, `/vi/xe-lo-gio-sanh-bay-viet-nam`
  - Fixed Bus152PageVI + ScamPageVI import paths (../../components → ../components)
  - 10 new E2E tests added to seo.spec.ts — all 17 SEO tests now pass
- **2026-07-29 (this session):** Updated sitemap.xml
  - Added all 9 missing article URLs (bus-109 EN+VI, bus-152 EN+VI, scam EN+VI)
  - Added VI bus-86 page (was missing from sitemap too)
  - Added hreflang cross-links for all new entries
  - Added new test: sitemap.xml contains all article pages — all 18 SEO tests now pass
- **2026-07-29 (this session):** Add URL-based language switcher on article pages
  - `ArticleLayout` accepts optional `languageSwitchPath` prop for SEO article pages
  - `Nav` renders text link (Tiếng Việt / English) instead of toggle when `languageSwitchPath` provided
  - Each language has its own URL — Google indexable, user-friendly
  - Toggle (in-place language switch) continues to work on calculator pages (`/`, `/vi/`, `/ket-qua`)
  - 8 new E2E tests: counterpart links exist, toggle absent on articles
  - All 26 SEO E2E tests pass
- **2026-07-29 (this session):** Fix `/vi/tuyen-86-noi-bai` falling through to homepage
  - Route was missing a registered component → HomePageVI fallback rendered calculator
  - Created `Bus86PageVI` mirroring `Bus86Page` with VI content
  - Registered route before `/vi/*` wildcard
  - 2 new E2E tests added (H1 is Bus 86 article, EN link visible)
  - All 28 SEO E2E tests pass
- **2026-07-30 (this session):** Phase 0 — kw-0-comparison-layout
  - Preserved WIP (4 commits: linear MCP, kw-* plan, exit time + BusGuides, TDD-RED)
  - `ComparisonArticleLayout` component + `shared/FAQ.tsx` + 14-case test suite
  - Review flagged 2 Important (FAQ dedupe, intro required vs conditional) — fixed in 004dae5
  - Side effect: 3 pre-existing TS6133 errors in AirportArticleLayout cleared (FAQ dedupe)
  - ScheduleCount now dormant — flagged for follow-up
  - Commits: `136dd52`, `35f772f`, `3b5623b`, `9d8db4c`, `a23350d`, `004dae5`
- **2026-07-30 (this session):** Phase 0 — kw-0-sitemap-auto
  - Vite build hook `closeBundle` loads registry via esbuild → writes
    `web/public/sitemap.xml` + `web/dist/sitemap.xml` from `web/src/seo/pageRegistry.ts`
  - Pure `generateSitemap()` (xml escaping + xhtml:link hreflang + defaults) with
    4 jest tests (urlset structure, alternatePath hreflang, add-entry semantics,
    build-time lastmod default)
  - 12 routes seeded matching `web/src/App.tsx` (homepage, /vi/, bus 86/109/152
    EN+VI, scam EN+VI, privacy, terms)
  - Review fixes (a643857): build-time lastmod via `now` param, hreflangFor
    edge case, xhtml:link indent, trailing newlines
  - Verification: web tsc --noEmit exit 0, web jest 4/4 generate-sitemap, web
    Playwright seo.spec.ts 28/28, root RN 168/168
  - Add-entry round-trip verified: 12 → 13 → 12
  - Commits: `9ae46dc`, `a643857`
- **2026-07-31 (this session):** Phase 4 (site infrastructure, 5 tickets)
  - Shipped kw-0-keyword-sheet: 23-keyword CSV at docs/seo/keyword-sheet.csv
    with 10 columns (keyword, variant, type, intent, KD, priority, cluster,
    notes, source, volume_range). 10 priority-1 (Tier 1) keywords. E2E
    verified: 23 distinct keyword rows, headers match schema, every row has
    non-empty priority. Commits: `e84bcb9`.
  - Shipped kw-0-bus-departure-countdown-vi: 1 new Playwright E2E test
    "bus-departure countdown renders on VI side at /vi/ket-qua/". Required
    adding the missing `/vi/ket-qua` route + component to `web/src/App.tsx`
    (EN/VI parity gap — EN had `/ket-qua`, VI didn't). Implementer deviated
    from brief: (a) URL params corrected to domain IDs `HAN-T1`/`carry_on`,
    (b) dynamic `flightTime = now + 60 min` (static 14:00 clashed with
    120-min visible window). Follow-up `8f558f4` fixed evidence-text
    drift. Commits: `f8d100d`, `8f558f4`.
  - Shipped kw-0-internal-link-graph: audit script
    `web/scripts/audit-internal-links.mjs` + 4 jest tests +
    `audit:internal-links` npm script. Audit exits 0 with
    `PASS: all 32 articles have >= 2 internal links.`. Pre-flight found 9
    articles with 0 links (Bus 86/109/152 × EN/VI, HanToHoanKiemPage,
    LateNightBusPage, Tuyen86GioPageVI); each received minimal additive
    `<nav>` block of 3 sibling links (preferring language-counterpart
    links). 2 deviations from brief: (1) `web/jest.config.js` testMatch
    extended with `.test.mjs` (strictly additive — makes brief's own
    verification command work — though plan §Self-Review noted it as
    out-of-scope follow-up, the change is harmless), (2) brief said 33
    articles, actual 32 (stale number). Commit: `c514c87`.
  - Shipped kw-0-content-refresh-cadence: 21-line "Content Refresh
    Cadence (SEO)" section appended to AGENTS.md documenting the
    6-month refresh cycle (GSC top-10 audit → schedule/fare/year
    check → pageRegistry lastmod bump → npm run build → commit). Next
    cycle = 2027-01-29. Commit: `6d2a609`.
  - Documented kw-0-gsc-setup (human-only): 69-line step-by-step runbook
    appended to `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md`
    (4 steps: GSC verify → GA4 install → Google Ads account → CSV volume
    update). Status remains `pending` in feature_list.json. Commit:
    `e870ab3`.
  - 4/5 Phase 4 tickets now `passing` in feature_list.json; kw-0-gsc-setup
    stays `pending` until the user reports completion.
  - Commits this phase: `e84bcb9`, `f8d100d`, `8f558f4`, `c514c87`,
    `6d2a609`, `e870ab3`.
  - Final verification: tsc --noEmit exit 0; jest 201/208 pass (7 pre-existing
    Bus86Page.{scam-warning,exit-time,Grab-link} failures pre-date Phase 4);
    Playwright seo.spec.ts 153/153 pass (incl. new VI countdown test).
  - Follow-up fix after the phase: Task 3's new footer `<nav>` links caused
    a strict-mode duplicate in 4 Playwright EN→VI counterpart tests
    (header language switcher + footer sibling link both had the same
    `/vi/...` href). Selector scoped with `.first()` to test the
    language-switcher (original intent); footer sibling links are
    independently validated by `audit:internal-links`. Commit: `90b3314`.

## Still Broken or Unverified

- web/e2e/landing-flow.spec.ts — pre-existing failures (out of scope for SEO plan)
- web/e2e/ is gitignored; seo.spec.ts was force-added (`git add -f`)
- web/__tests__/routes/articles/Bus86Page.{exit-time,scam-warning,Grab-link}.test.tsx — 7 pre-existing RED
  tests (TDD-RED per AGENTS.md); will turn green when kw-13/kw-17 implement the Bus86Page updates they expect
- Untracked: docs/superpowers/plans/2026-07-29-seo-domain-setup.md, docs/superpowers/plans/*.md drafts, research/
- Dev server (pid 14508) running on port 5173 (serves previous build's public/sitemap.xml)
- Branch is ahead of origin/main; push needed
- BusArticleConfig.scheduleCount is now dormant — flagged for follow-up cleanup
- Sitemap dev-mode freshness: npm run dev does NOT regenerate sitemap.xml
  (only npm run build does). Long-lived dev sessions may serve stale sitemap.
- **Phase 4 follow-up:** Task 3's new footer `<nav>` blocks create a href
  collision with the header language switcher on the 4 articles whose
  alternatePath equals one of the 3 sibling links. Fixed in `90b3314`
  (scoped selector to `.first()`); no remaining `nav a[href]` collisions
  but the link-equality is intentional — `audit:internal-links` checks
  count, not uniqueness. If a future task adds another footer link that
  collides, the same `.first()` pattern will need to extend.

## Next Best Action

1. **Phase 0 complete** — both kw-0-comparison-layout + kw-0-sitemap-auto PASSING
2. Phase 0 remaining (process, not code): `kw-0-gsc-setup` (GSC + GA4 + Google Ads
   account setup — requires human DNS action), `kw-0-keyword-sheet` (CSV)
3. Phase 1 next: `kw-13-bus-109-vs-152` (Tier 1, KD 18, lowest KD quick-win)
4. Run `npm run wiki:lint` and fix any drift flagged by C1 staleness
5. Schedule cleanup of dormant `BusArticleConfig.scheduleCount` field
6. Push branch to origin and consider opening PR

## Commands

```bash
# Verify Phase 0 complete
cd web && npx tsc --noEmit
cd web && npx jest __tests__/components/Layout/ComparisonArticleLayout.test.tsx
cd web && npx jest __tests__/lib/generate-sitemap.test.ts
cd web && npx playwright test e2e/seo.spec.ts --project=chromium
cd web && npm run build
npm test

# Wiki lint
npm run wiki:lint

# Start kw-13 (next ticket) — subagent-driven-development
```

## Context

- **Branch:** main
- **Project:** Frylane (brand rename from SanBayGo)
- **Domain:** frylane.com (single domain, EN root + VI /vi/…)
- **Plan:** docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md
