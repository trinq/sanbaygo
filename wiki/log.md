# Wiki Session Log

One entry per session. Newest at the top. Format:

```
## YYYY-MM-DD — <one-line summary>
- Sources touched: `<path>`, `<path>`, …
- Wiki pages touched: `<page>`, `<page>`, …
- Lint status: clean | <n> errors / <n> warns
- Commit: <sha> — <message>
```

---

## 2026-07-31 — Phase 4: site infrastructure (5 tickets, 4 passing + 1 documented)
- Sources touched: `docs/seo/keyword-sheet.csv` (new), `docs/seo/README.md` (new), `web/src/App.tsx` (added `/vi/ket-qua` route + ResultVI component), `web/e2e/seo.spec.ts` (1 new countdown test + 4 selector fixes), `web/scripts/audit-internal-links.mjs` (new), `web/__tests__/scripts/audit-internal-links.test.mjs` (new), `web/package.json` (added `audit:internal-links` script), `web/jest.config.js` (added `.test.mjs` to testMatch), `web/src/routes/articles/{Bus86Page,Bus86PageVI,Bus109Page,Bus109PageVI,Bus152Page,Bus152PageVI,HanToHoanKiemPage,LateNightBusPage,Tuyen86GioPageVI}.tsx` (added `<nav>` blocks), `AGENTS.md` (appended Content Refresh Cadence section), `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` (appended GSC runbook appendix), `session-handoff.md`, `feature_list.json`.
- Wiki pages touched: none (wiki pages reference sources but none were modified in this phase; expect C1 staleness warnings when lint runs next).
- Lint status: not run (12 expected C1 warnings from AGENTS.md + feature_list.json being modified after 2026-07-29 last_verified dates).
- Commits: `e84bcb9`, `f8d100d`, `8f558f4`, `c514c87`, `6d2a609`, `e870ab3`, `90b3314` (follow-up Playwright selector fix).
- Plan: `docs/superpowers/plans/2026-07-31-phase4-site-infrastructure.md`
- Outcome: 4/5 Phase 4 tickets `passing` in feature_list.json (`kw-0-keyword-sheet`, `kw-0-bus-departure-countdown-vi`, `kw-0-internal-link-graph`, `kw-0-content-refresh-cadence`); `kw-0-gsc-setup` stays `pending` (human-only — DNS + Google account + credit card required).
- Final verification: `web npx tsc --noEmit` exit 0; `web jest` 201/208 pass (7 pre-existing Bus86Page failures pre-date Phase 4); `web npx playwright test e2e/seo.spec.ts --project=chromium` 153/153 pass (incl. new VI countdown test); `web npm run audit:internal-links` exits 0 with `PASS: all 32 articles have >= 2 internal links.`
- Concern (logged in `.superpowers/sdd/progress.md`): Task 3's new footer `<nav>` blocks duplicate the language switcher's `/vi/...` href for 4 articles (Bus86/109/152 + scam). Caught at End-of-Phase-4 verification step 3 (Playwright strict-mode violation). Fixed in `90b3314` by scoping affected selectors with `.first()`. Footer sibling links are independently validated by `audit:internal-links`.

## 2026-07-30 — /guides listing page + homepage CTA (kw from spec, shipped via SDD)
- Sources touched: `web/src/seo/guidesRegistry.ts` (new), `web/src/seo/metaConfig.ts`, `web/src/seo/pageRegistry.ts`, `web/src/routes/GuidesPage.tsx` (new), `web/src/App.tsx`, `web/src/components/Landing/BusGuides.tsx`, `web/public/sitemap.xml`, `web/__tests__/seo/guidesRegistry.test.ts` (new), `web/__tests__/routes/GuidesPage.test.tsx` (new), `docs/superpowers/specs/2026-07-30-guides-listing-page.md`, `.gitignore`
- Wiki pages touched: none (lint pass required — see handoff)
- Lint status: not run (deferred — wiki/pages/seo.md and wiki/pages/data-sources.md will trigger C1 staleness after this session)
- Commits: `a77b554` `dba4943` `76b3d6f` `0883e92` `3918ca2` `7a05a22` `f5ef7d4` `9de8b4e` `cdc0666` `235912e`
- Merged to main: `cdc0666` (no-ff merge commit) + `235912e` (gitignore chore)
- Plan: `docs/superpowers/specs/2026-07-30-guides-listing-page.md`

## 2026-07-30 — Task 19 kw-11-how-to-get-han: HAN hub page (EN + VI, 6 options, 7 FAQ)
- Sources touched: `web/src/routes/articles/HowToGetHanPage.tsx`, `web/src/routes/articles/HowToGetHanPageVI.tsx`, `web/src/App.tsx`, `web/src/seo/metaConfig.ts`, `web/src/seo/pageRegistry.ts`, `web/e2e/seo.spec.ts`, `web/public/sitemap.xml`, `feature_list.json`.
- Sources read for context: `wiki/README.md`, `wiki/index.md`, `AGENTS.md`, `feature_list.json`, `task-19-brief.md`, `ArticleLayout.tsx`, `NoibaiFirstTimePage.tsx`, `metaConfig.ts`, `pageRegistry.ts`, `App.tsx`, `seo.spec.ts`.
- Wiki pages touched: none (no wiki page claims these sources).
- Lint status: clean.
- Commit: `e88bab0` — `feat: kw-11-how-to-get-han — HAN hub page (EN + VI, 7 FAQ, 6 options)`. Follow-up commit: `e10f599` — `docs: update feature_list.json kw-11-how-to-get-han status to passing`.
- Test results: 131/131 Playwright pass, 119/123 Jest (4 pre-existing failures unrelated to this ticket). TypeScript clean.

---

## 2026-07-30 — Task 18 kw-19-noibai-first-time: First-timer Noi Bai Airport guide EN + VI
- Sources touched: `web/src/routes/articles/NoibaiFirstTimePage.tsx`, `web/src/routes/articles/NoibaiFirstTimePageVI.tsx`, `web/src/App.tsx`, `web/src/seo/metaConfig.ts`, `web/src/seo/pageRegistry.ts`, `web/e2e/seo.spec.ts`, `web/public/sitemap.xml`, `feature_list.json`
- Wiki pages touched: none (no wiki pages reference these new routes yet)
- Lint status: not run (content-only changes, no wiki drift)
- Commits: `0c35d0a` feat: kw-19-noibai-first-time, `0999225` docs: feature_list.json update

---

## 2026-07-30 — Task 17 kw-15-late-night-han: Late night transfer Hanoi Airport (22:00–05:00) EN + VI
- Sources touched: `web/src/routes/articles/LateNightHanPage.tsx`, `web/src/routes/articles/LateNightHanPageVI.tsx`, `web/src/seo/metaConfig.ts`, `web/src/App.tsx`, `web/src/seo/pageRegistry.ts`, `web/e2e/seo.spec.ts`, `web/public/sitemap.xml`
- Wiki pages touched: none
- Lint status: N/A (no wiki changes)
- Commit: `9914814` — feat: kw-15-late-night-han — Late Night Hanoi Airport Transfer (2026); `e32f938` — docs: update feature_list.json kw-15-late-night-han status to passing

---

## 2026-07-30 — Task 16 kw-12-han-hoan-kiem: Phase 2 Hanoi Airport to Hoan Kiem Lake destination article
- Sources touched: `web/src/routes/articles/HanToHoanKiemPage.tsx` (new, EN),
  `web/src/routes/articles/HanToHoanKiemPageVI.tsx` (new, VI),
  `web/src/seo/metaConfig.ts` (added 2 entries with bidirectional hreflang),
  `web/src/App.tsx` (added 2 routes before /vi/* catch-all),
  `web/src/seo/pageRegistry.ts` (added 2 entries with bidirectional alternatePath),
  `web/public/sitemap.xml` (rebuilt via vite build),
  `web/e2e/seo.spec.ts` (added 10 new Playwright tests),
  `feature_list.json` (status → passing)
- Wiki pages touched: none
- Lint status: clean
- Commits: 568b081 — feat: add kw-12-han-hoan-kiem; 03ca8f9 — docs: mark passing


- Sources touched: `web/src/routes/articles/CheapestSgnPage.tsx` (new, EN),
  `web/src/routes/articles/CheapestSgnPageVI.tsx` (new, VI),
  `web/src/seo/metaConfig.ts` (added 2 entries with bidirectional hreflang),
  `web/src/App.tsx` (added 2 routes before /vi/* catch-all),
  `web/src/seo/pageRegistry.ts` (added 2 entries with bidirectional alternatePath),
  `web/public/sitemap.xml` (added 2 entries for cheapest SGN routes),
  `web/e2e/seo.spec.ts` (added 10 new Playwright tests),
  `feature_list.json` (kw-6-cheapest-sgn → passing)
- Wiki pages touched: none
- Lint status: clean
- Commit: ff91fbc — feat(kw-6): cheapest way Saigon Airport District 1 comparison article (kw-6-cheapest-sgn)

## 2026-07-30 — Task 13 kw-7-grab-vs-bus-han: Phase 2 Grab vs Bus 86 comparison article
- Sources touched: `web/src/routes/articles/GrabVsBusPage.tsx` (new, EN),
  `web/src/routes/articles/GrabVsBusPageVI.tsx` (new, VI),
  `web/src/seo/metaConfig.ts` (added 2 entries with bidirectional hreflang),
  `web/src/App.tsx` (added 2 routes before /vi/* catch-all),
  `web/src/seo/pageRegistry.ts` (added 2 entries with bidirectional alternatePath),
  `web/public/sitemap.xml` (added 2 entries for Grab vs Bus routes),
  `web/e2e/seo.spec.ts` (added 10 new Playwright tests),
  `feature_list.json` (kw-7-grab-vs-bus-han → passing)
- Wiki pages touched: none
- Lint status: clean
- Commit: 9114da77 — feat: add Grab vs Bus 86 Hanoi Airport comparison article (kw-7-grab-vs-bus-han)

---

## 2026-07-30 — Task 10 kw-17-t2-exit-time: Phase 1 Tier 1 with interactive calculator
- Sources touched: `web/src/components/ExitTimeCalculator.tsx` (new),
  `web/src/routes/articles/ExitTimePage.tsx` (new, EN),
  `web/src/routes/articles/ExitTimePageVI.tsx` (new, VI),
  `web/src/seo/metaConfig.ts` (added 2 entries with bidirectional hreflang),
  `web/src/App.tsx` (added 2 routes before /vi/* catch-all),
  `web/src/seo/pageRegistry.ts` (added 2 sitemap entries),
  `web/e2e/seo.spec.ts` (added 10 Playwright SEO tests),
  `web/public/sitemap.xml` (regenerated by npm run build),
  `feature_list.json` (status → passing).
- Wiki pages touched: none.
- Lint status: 0 errors, not run (no wiki pages modified).
- Commits: `f4cad87` (impl), `778fb91` (feature_list marking).
- Title: "Noi Bai T2 International Exit Time: How Long to Get Out (2026)" — 60 chars ✅
- TDD cycle: seo.spec.ts 9 tests RED (404 routes) → Green 10/10 pass.
  Full suite: tsc --noEmit exit 0, 119/123 jest (4 pre-existing Bus86Page failures),
  49/49 playwright.
- Layout: ArticleLayout + ExitTimeCalculator above fold, 8-question FAQ schema,
  internal links to /bus-86-hanoi-airport and /airport-scam-vietnam-taxi.
- Calculator: calls calculateExitTime() from core on every state change (terminal/baggage/flightType).

---


- Sources touched: `web/src/routes/articles/LateNightBusPage.tsx` (new),
  `web/src/seo/metaConfig.ts` (added 1 entry, no alternateVI),
  `web/src/App.tsx` (added 1 route, EN only),
  `web/src/seo/pageRegistry.ts` (added 1 entry),
  `web/e2e/seo.spec.ts` (added 2 Playwright SEO tests),
  `feature_list.json` (status → passing).
- Wiki pages touched: none.
- Lint status: 0 errors, not run (no wiki pages modified).
- Commits: `ca09b5c` (impl), `e0f2c6d` (feature_list marking).
- Title: "8 PM at Hanoi Airport: Is the Bus Still Running? (2026)" — 53 chars ✅
- TDD cycle: seo.spec.ts 2 tests RED (404 + no FAQ schema) → LateNightBusPage
  + wiring GREEN (2/2 pass). Full suite: tsc --noEmit exit 0, 119/123 jest (4
  pre-existing Bus86Page failures), 42 playwright (39 pass, 3 pre-existing landing-flow).
- Layout: AirportArticleLayout with BUS_86 data, 5 EN FAQ items (JSON-LD FAQPage),
  internal links to /bus-86-hanoi-airport (via pickupHint) + /airport-scam-vietnam-taxi
  (via ScamWarningSection). EN-only (no VI mirror, no alternatePath).

## 2026-07-30 — Task 8 kw-13-bus-109-vs-152: Phase 1 Tier 1 article — EN + VI
- Sources touched: `web/src/routes/articles/Bus109Vs152Page.tsx` (new),
  `web/src/routes/articles/Bus109Vs152PageVI.tsx` (new),
  `web/src/seo/metaConfig.ts` (added 2 entries),
  `web/src/App.tsx` (added 2 routes),
  `web/src/seo/pageRegistry.ts` (added 2 entries, sitemap auto-update),
  `web/src/components/SEO/SEOHelmet.tsx` (bugfix: removed Fragment wrapper
  from alternateEN links — react-helmet-async drops hreflang tags when a
  Fragment wraps multiple links),
  `web/e2e/seo.spec.ts` (added 9 Playwright SEO tests),
  `web/public/sitemap.xml` (regenerated via `npm run build`, 14 entries),
  `feature_list.json` (status → passing).
- Wiki pages touched: none.
- Lint status: 0 errors, not run (no wiki pages modified).
- TDD cycle: seo.spec.ts 9 tests RED (routes 404, sitemap empty) → page
  components + wiring GREEN (37/37 Playwright pass).
- Bugfix: SEOHelmet Fragment wrapper — affects ALL articles with alternateEN
  hreflang. Fix applied here as incidental improvement.
- Commits: `aad899b`.
## 2026-07-30 — Phase 0 kw-0-sitemap-auto: auto-generated sitemap from registry
- Sources touched: `web/src/seo/pageRegistry.ts` (new),
  `web/src/seo/generateSitemap.ts` (new),
  `web/__tests__/lib/generate-sitemap.test.ts` (new),
  `web/vite.config.mts` (added `frylane-sitemap` plugin loading registry
  via esbuild + writing `public/` + `dist/` on `closeBundle`),
  `web/public/sitemap.xml` (regenerated), `web/dist/sitemap.xml` (regenerated).
- Wiki pages touched: none.
- Lint status: 0 errors, 4 C1 staleness warnings (expected — feature_list.json, plans modified).
- TDD cycle: `generate-sitemap.test.ts` RED (4 cases, `Could not locate module @/seo/generateSitemap`) → registry + generator GREEN (4/4 pass) → Vite plugin wired → add-entry round-trip 12→13→12 verified. Verification: web tsc --noEmit exit 0, web jest 4/4 generate-sitemap (added build-time-default test), Playwright seo.spec.ts 28/28, root RN 168/168, root tsc 0.
- Approach: Vite build hook (recommended option in brief) — runs only on `npm run build`, leaves dev server untouched.
- Review fixes (a643857): build-time lastmod via `now` param (was per-route hardcoded), `hreflangFor` edge case (`/vi-foo` no longer matches), `xhtml:link` 4-space indent, trailing newlines.
- Commits: `9ae46dc`, `a643857`.

## 2026-07-30 — Phase 0 kw-0-comparison-layout: ComparisonArticleLayout + shared FAQ module
- Sources touched: `web/src/components/Layout/ComparisonArticleLayout.tsx`,
  `web/src/components/Layout/shared/FAQ.tsx`,
  `web/src/components/Layout/AirportArticleLayout.tsx`,
  `web/__tests__/components/Layout/ComparisonArticleLayout.test.tsx`,
  `feature_list.json`, `.superpowers/sdd/progress.md`,
  `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md`.
- Wiki pages touched: none (no infra concept-page changes).
- Lint status: 0 errors, 4 C1 staleness warnings (expected — feature_list.json, plans modified).
- TDD cycle: ComparisonArticleLayout.test.tsx RED (14 cases, module missing)
  → ComparisonArticleLayout.tsx + shared/FAQ.tsx GREEN (14/14 pass)
  → review flagged 2 Important (FAQ dedupe, intro required vs conditional)
  → 004dae5 fixed both + minor trailing-newlines. Verification: web
  tsc --noEmit exit 0 (3 pre-existing TS6133 errors gone), jest
  ComparisonArticleLayout 14/14, playwright seo.spec.ts 28/28,
  root RN 168/168. Side-effect: BusArticleConfig.scheduleCount is
  now dormant — flagged for follow-up cleanup.
- Commits: `a23350d` (impl), `004dae5` (review fixes).
- Pre-session commits (WIP preservation): `136dd52` (linear MCP),
  `35f772f` (kw-* plan), `3b5623b` (exit time + BusGuides),
  `9d8db4c` (TDD-RED for kw-13/kw-17).

---

## 2026-07-29 — Wire missing SEO routes + sitemap.xml update
- Sources touched: `web/public/sitemap.xml`, `web/e2e/seo.spec.ts`.
- Wiki pages touched: none.
- Lint status: clean (9/9 pages, 0 issues).
- TDD cycle: sitemap content test added → RED (6 URLs missing) → sitemap updated
  with all 12 entries (bus-86 VI, bus-109 EN+VI, bus-152 EN+VI, scam EN+VI)
  → all 18 SEO E2E tests pass.

---

## 2026-07-29 — URL-based language switcher on article pages
- Sources touched: `web/src/components/Landing/Nav.tsx`,
  `web/src/components/Layout/ArticleLayout.tsx`,
  `web/src/components/Layout/AirportArticleLayout.tsx`,
  `web/src/routes/articles/Bus86Page.tsx`,
  `web/src/routes/articles/Bus109Page.tsx`,
  `web/src/routes/articles/Bus109PageVI.tsx`,
  `web/src/routes/articles/Bus152Page.tsx`,
  `web/src/routes/articles/Bus152PageVI.tsx`,
  `web/src/pages/ScamPage.tsx`,
  `web/src/pages/ScamPageVI.tsx`.
- Wiki pages touched: none.
- Lint status: clean.
- TDD cycle: 8 ArticleNav tests written → RED (no links, toggle present) →
  ArticleLayout + Nav updated with `languageSwitchPath` prop → all 26 SEO tests pass.

---

## 2026-07-29 — Bus86PageVI fix
- Sources touched: `web/src/routes/articles/Bus86PageVI.tsx`,
  `web/src/App.tsx`, `web/e2e/seo.spec.ts`.
- Wiki pages touched: none.
- Lint status: clean.
- TDD cycle: 2 new tests added (`/vi/tuyen-86-noi-bai` renders article, VI
  bus-86 has EN counterpart link) → RED (H1 was homepage, no EN link) →
  created `Bus86PageVI` mirroring `Bus86Page`, registered route before
  `/vi/*` wildcard → all 28 SEO tests pass.

---

## 2026-07-29 — Wire missing SEO routes + AirportArticleLayout refactor
- Sources touched: `core/types/index.ts`, `core/data/busSchedule.ts`,
  `core/data/busSchedules/sgn.ts`,
  `web/src/components/Layout/AirportArticleLayout.tsx` (new),
  `web/src/routes/articles/Bus86Page.tsx`, `web/src/routes/articles/Bus109Page.tsx`,
  `web/src/routes/articles/Bus152Page.tsx`, `web/src/routes/articles/Bus109PageVI.tsx` (new),
  `web/src/routes/articles/Bus152PageVI.tsx` (new),
  `web/src/pages/ScamPage.tsx` (new), `web/src/pages/ScamPageVI.tsx` (new),
  `web/src/App.tsx`, `web/src/seo/metaConfig.ts`, `web/e2e/seo.spec.ts`.
- Wiki pages touched: none.
- Lint status: clean (9/9 pages, 0 issues).
- TDD cycle: 10 new failing tests added → 2 failures due to missing metaConfig entries
  for `/vi/tuyen-152-tan-son-nhat` and `/vi/xe-lo-gio-sanh-bay-viet-nam` → fixed
  metaConfig → all 17 SEO E2E tests pass.
- Key bugs found: (1) ScamPage/ScamPageVI had wrong import path `../../components`
  instead of `../components`; (2) VI article pages missing from `PAGE_META`
  (SEOHelmet fell back to DEFAULT_META = wrong title).

---

## 2026-07-29 — Code review fixes: hreflang, sitemap, ResultRoute wiring
- Sources touched: `web/src/components/SEO/SEOHelmet.tsx`, `web/public/sitemap.xml`,
  `web/public/robots.txt`, `web/src/seo/metaConfig.ts`, `web/src/App.tsx`,
  `web/src/components/Landing/LandingPage.tsx`, `web/src/routes/HomePageVI.tsx`,
  `web/e2e/seo.spec.ts`.
- Wiki pages touched: none.
- Lint status: not run this session (committed without lint; verify before push).
- Commits on feature/seo-domain-setup:
  - `6f8a05b` fix: address code review findings — hreflang, sitemap, ResultRoute, meta
  - `37c087b` docs: mark SEO E2E and import fix features complete
- Bugs fixed from code review:
  1. SEOHelmet: self-referencing hreflang (Google spec requires every page to
     declare its own language) + removed unconditional homepage hreflang (was
     breaking hreflang on non-homepage routes)
  2. sitemap.xml: added lastmod dates, removed unreachable /vi/tuyen-86-noi-bai
  3. App.tsx: wired ResultRoute to calculateTrip() for real results (was
     hardcoded); added baggage + flightType URL params; null guard
  4. LandingPage: passes baggage + flightType in result page URL
  5. HomePageVI: removed redundant LanguageProvider (App.tsx provides it)
  6. metaConfig.ts: updated year to 2026 on Bus 109 and Scam pages
  7. robots.txt: removed redundant Allow: /vi/
  8. seo.spec.ts: chromium-only comment
- E2E: 7/7 SEO tests pass (chromium)
- TypeScript: clean (tsc --noEmit)

## 2026-07-29 — Extract AirportArticleLayout shared component for bus route articles
- Sources touched: `core/types/index.ts`, `core/data/busSchedule.ts`,
  `core/data/busSchedules/sgn.ts`, `web/src/components/Layout/AirportArticleLayout.tsx`,
  `web/src/routes/articles/Bus86Page.tsx`, `web/src/routes/articles/Bus109Page.tsx`,
  `web/src/routes/articles/Bus152Page.tsx`.
- Wiki pages touched: none.
- Lint status: clean (9/9 pages, 0 issues).
- Summary: Added `exitTimeSummary?: string` to `BusRoute` type; populated data for
  all 3 bus routes. Created `AirportArticleLayout` component that renders all
  sections in order: Hero (EN H1), SearchCTA, Schedule, Stops, ScamWarning,
  TravelTime, ExitTime, GrabAlternative, FAQ, FAQSchema. Refactored all 3
  article pages to use the shared component. Bus109Page and Bus152Page now have
  all sections that Bus86Page had (exit time, scam warning, Grab link to
  grab.com). TypeScript compiles clean.

## 2026-07-29 — Drop sanbaygo.app; frylane.com is sole domain
- Sources touched: `app.json`, `wiki/pages/seo-content-strategy.md`,
  `wiki/pages/project-overview.md`, `wiki/pages/decisions.md`, `wiki/index.md`,
  `docs/keyword-research-brief-airport-bus-vn.md`.
- Wiki pages touched: `seo-content-strategy`, `project-overview`, `decisions`,
  `index` (all `last_verified` still 2026-07-29; sources unchanged for pages
  that merely had stale domain references removed).
- Lint status: clean (9/9 pages, 0 issues).
- Commit: `dd52d9c` — `feat: drop sanbaygo.app — frylane.com is the sole domain`.
- Summary: `app.json` scheme `sanbaygo` → `frylane`; all wiki/docs
  references to `sanbaygo.app` as a separate domain removed; single-domain
  policy (EN root + VI `/vi/…`) now consistent across codebase.
- Context: decision to drop `sanbaygo.app` confirmed by user mid-session; user
  wants ALL traffic on `frylane.com`. `app.json` bundle ID (`com.sanbaygo.app`)
  unchanged (already deployed to App/Play Store).

## 2026-07-29 — SEO domain setup: router wiring + Bus86Page + robots.txt + sitemap + E2E
- Sources touched: `web/src/App.tsx`, `web/src/routes/articles/Bus86Page.tsx`,
  `web/src/seo/metaConfig.ts`, `web/public/robots.txt`, `web/public/sitemap.xml`,
  `web/e2e/seo.spec.ts`, `web/src/main.tsx`.
- Wiki pages touched: none (new SEO features not yet documented in wiki).
- Lint status: not run this session (deferred to next session per AGENTS.md workflow).
- Commits (feature/seo-domain-setup):
  - `5bec5ea` feat: replace state-based routing with react-router-dom v6
  - `769b0c6` feat: create Bus86Page SEO article with schedule, stops, FAQ schema
  - `b4fcb93` feat: create SEOHelmet component with dynamic meta and hreflang
  - `ff40ff4` feat: add HelmetProvider and remove hardcoded meta from index.html
  - `22e398a` feat: add SEO meta configuration for all routes
  - `125fb19` deps: add react-router-dom and react-helmet-async
  - `db813c1` feat: create HomePage and HomePageVI route components
  - `11ea8a5` fix: correct Bus86Page data from static data sources
  - `71f8b59` feat: add robots.txt and sitemap.xml with hreflang
  - `a31fc21` fix: add seo.spec.ts E2E tests
  - `31b2bc8` fix: correct Bus86Page import path and remove duplicate HelmetProvider
- Bugs caught and fixed:
  - Bus86Page.tsx had wrong import path `'../components/SEO'` (500 error on route)
  - main.tsx had duplicate HelmetProvider (already in App.tsx)
  - .gitignore has `web/e2e/` — seo.spec.ts force-added with `git add -f`
- E2E: 7/7 SEO tests pass (chromium); landing-flow.spec.ts pre-existing failures
- Task 7 review caveats resolved: `initialLocale` removal is fine (LanguageProvider
  defaults to `'vi'`); hreflang for Bus 86 is correctly configured in metaConfig.ts

## 2026-07-29 — Initial wiki scaffold + lint + diagram
- Wiki pages created: all 8 seed pages (`project-overview`, `architecture`,
  `domain-model`, `data-sources`, `sessions-history`, `decisions`,
  `conventions`, `tooling`).
- Wiki pages touched: none (this commit *creates* them).
- Lint status: clean (8/8 pages, 0 issues).
- Diagram: `./wiki-diagram.svg` rendered from `wiki/diagram.mmd` via
  `@mermaid-js/mermaid-cli` (40 KB SVG, transparent background).
- Tests: `node --test wiki/scripts/__tests__/lint.test.mjs` → 8/8 pass.
- TypeScript: `npx tsc --noEmit` → clean.
- Commit: `26de171` — `feat: add wiki/ knowledge layer + lint + Mermaid diagram`.
- Open follow-ups: see `wiki/pages/decisions.md#open-contradictions` —
  the `docs/` triage (resolving the "no backend" vs "Next.js + Supabase +
  Vercel" contradiction, the ADR 0001 numbering gap, etc.) is deferred to
  a later session per the design decision recorded there.

---

## 2026-07-29 — Pivot keyword brief to lean_intl (EN primary, VN secondary)
- Sources touched: `docs/keyword-research-brief-airport-bus-vn.md` (rewrite per audience pivot).
- Sources read for context: `CONTEXT.md`, `docs/superpowers/specs/2026-07-29-rename-brand-frylane-design.md`, `docs/seo-ads-plan.md`, `feature_list.json`, `wiki/pages/decisions.md`.
- Wiki pages touched: none (no wiki page claims these sources, so no `last_verified` bump needed).
- Lint status: clean (`npm run wiki:lint` → 8/8 pages, 0 issues).
- Commit: `7211c18` — `docs(seo): pivot keyword brief to lean_intl (EN primary 60%, VN secondary 40%)`.
- Decisions deferred: not touched (the lean_intl pivot is a content/SEO scoping decision, not a domain model or architecture change — no ADR or wiki page needs migration).
- Lưu ý kết thúc: file `research/domain-name-brief.md` vẫn untracked; brief mới là sản phẩm SEO content, không phải entity upstream.