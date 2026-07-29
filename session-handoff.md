# Session Handoff - SanBayGo MVP

## Currently Verified

| Feature | Status | Last Verified |
|---------|--------|---------------|
| seo-helmet-provider | passing | 2026-07-29 |
| seo-playwright-e2e | passing | 2026-07-29 |
| seo-review-fixes | passing | 2026-07-29 |

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

## Still Broken or Unverified

- web/e2e/landing-flow.spec.ts — pre-existing failures (out of scope for SEO plan)
- web/e2e/ is gitignored; seo.spec.ts was force-added (`git add -f`)
- Untracked: docs/superpowers/plans/2026-07-29-seo-domain-setup.md, research/
- Dev server (pid 14508) running on port 5173

## Next Best Action

1. Run `npm run wiki:lint` and fix any issues
2. Verify 7/7 SEO E2E tests pass: `cd web && npx playwright test seo.spec.ts --project=chromium`
3. Push feature/seo-domain-setup to remote
4. Create PR or merge to main
5. Remaining caveat from Task 7 review (minor, not blocking): hardcoded baggage/flightType
   in ResultRoute URL parsing — now fixed, baggage/flightType passed from LandingPage

## Commands

```bash
# Verify TypeScript
npx tsc --noEmit

# Run SEO E2E tests (chromium only)
cd web && npx playwright test seo.spec.ts --project=chromium

# Full test suite
cd web && npm test

# Wiki lint
npm run wiki:lint
```

## Context

- **Branch:** feature/seo-domain-setup
- **Project:** Frylane (brand rename from SanBayGo)
- **Domain:** frylane.com (single domain, EN root + VI /vi/…)
- **Plan:** docs/superpowers/plans/2026-07-29-seo-domain-setup.md
