# Session Handoff - SanBayGo MVP

## Currently Verified

| Feature | Status | Last Verified |
|---------|--------|---------------|
| seo-helmet-provider | passing | 2026-07-29 |
| seo-playwright-e2e | passing | 2026-07-29 |
| seo-review-fixes | passing | 2026-07-29 |
| kw-0-comparison-layout | passing | 2026-07-30 |
| kw-0-sitemap-auto | passing | 2026-07-30 |

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
    3 jest tests (urlset structure, alternatePath hreflang, add-entry semantics)
  - 12 routes seeded matching `web/src/App.tsx` (homepage, /vi/, bus 86/109/152
    EN+VI, scam EN+VI, privacy, terms)
  - Verification: web tsc --noEmit exit 0, web jest 122 (3 new green + 4
    pre-existing Bus86Page reds unchanged), web Playwright seo.spec.ts 28/28,
    root RN 168/168, root tsc 0
  - Add-entry round-trip verified: 12 → 13 (added `/tmp-add-entry-rebuild-check`)
    → 12 (reverted).

## Still Broken or Unverified

- web/e2e/landing-flow.spec.ts — pre-existing failures (out of scope for SEO plan)
- web/e2e/ is gitignored; seo.spec.ts was force-added (`git add -f`)
- web/__tests__/routes/articles/Bus86Page.{exit-time,scam-warning}.test.tsx — 4 pre-existing RED
  tests (TDD-RED per AGENTS.md); these will turn green as kw-13/kw-17 implement Bus86Page updates
- Untracked: docs/superpowers/plans/2026-07-29-seo-domain-setup.md, research/
- Dev server (pid 14508) running on port 5173
- Branch is 36 commits ahead of origin/main; push needed

## Next Best Action

1. **kw-0-comparison-layout PASSING** — unblocks kw-13/kw-5/kw-6/kw-7 (all use ComparisonArticleLayout)
2. Next ticket: `kw-13-bus-109-vs-152` (Tier 1, KD 18, lowest KD quick-win)
3. Run `npm run wiki:lint` and fix any drift flagged by C1 staleness
4. Schedule cleanup of dormant `BusArticleConfig.scheduleCount` field (out of scope here)
5. Push branch to origin and consider opening PR

## Commands

```bash
# Verify Phase 0
cd web && npx tsc --noEmit
cd web && npx jest __tests__/components/Layout/ComparisonArticleLayout.test.tsx
cd web && npx playwright test e2e/seo.spec.ts --project=chromium
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
