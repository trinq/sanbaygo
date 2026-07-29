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