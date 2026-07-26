# SanBayGo Progress Log

## Current Verified State

**Repository root directory:** `/Users/trinq/Developer/sanbaygo`

**Monorepo layout:**

- Root = Expo React Native (RN) app, `npm start` → Metro dev server
- `web/` = Vite + React frontend, `cd web && npm run dev` → http://localhost:5173
- `api/` = Express + tsx, `cd api && npm run dev` → http://localhost:3000
- `core/` = Shared TypeScript module, imported via `@core` path alias
- `init.sh` verifies all three: installs root + web + api, runs `tsc --noEmit` on root/core/web, runs `npm test` on root + web

**All features:** MVP + Landing Hero + Figma Result/Hero overlay complete; ResultDisplay→ResultPage swap landed (state lifted to App); `result` and `formData` not yet plumbed into ResultPage props.

**Current status:** Figma Make result screen live; `web/public/hero.jpg` committed; dev harness updated; services running locally (Session 13 restart).

**Recent fixes:**
- Figma Make result page (commit `8b4f19e`): new `web/src/components/Result/`, 4-step timeline with solid slate-200 connector, sky-600 accent, slate-900 CTA, hero blur stack (5 layers incl. `backdrop-blur-[2px]`)
- Lift `result`/`formData` state to App so `LandingPage` no longer renders `ResultDisplay` itself and `<ResultPage onBack>` in `App.tsx` actually mounts (uncommitted, verified TS + 13/13 tests pass)
- Fixed ResultDisplay wiring (was using stub file instead of index.tsx)
- Fixed double peak surcharge bug (travelTime.peak was getting +30min surcharge on top)
- Fixed VehicleComparison showing empty (was calling non-existent HTTP API `/api/calculate-trip` in Vite frontend-only build; changed to call `calculateTripComparison()` directly)
- Fixed white page on `http://localhost:5173` — `useFormState` was setting `busSchedules` to array of API objects (`{id, departure_time, ...}`) instead of time strings; `SchedulePreview` then crashed on `time.split(':')`. Now extracts `departure_time` from each schedule object before setState.

**Running services (Session 13):**
- API: pid 80576, port 3000 (Express + tsx watch) — HTTP 200 on /api/airports
- Web: pid 80860, port 5173 (Vite) — HTTP 200, returns `<title>SanBayGo - Đi xe buýt từ Nội Bài</title>`
- Killed 3 zombie Vite processes from previous sessions (pids 55594, 40730, 27641) and one orphaned tsx API process (pid 93434) before restart

---

## Session Record

### Session 13: 2026-07-24

**Goal:** Confirm PR #4 is merged into main, sync local main with origin, restart dev services cleanly so the web UI fix is actually running, and update dev-harness files to reflect the current monorepo shape.

**Completed:**
- Verified `fix/web-bus-schedules-time-shape` is 1 commit ahead of `origin/main`, 0 behind — PR #4 merged cleanly
- Ran `git checkout main && git pull origin main` → fast-forward to merge commit `cf1ecfd`
- Killed 3 zombie Vite processes from previous sessions (pids 55594, 40730, 27641) and the orphaned tsx API process (pid 93434)
- Restarted API (`api/`, tsx watch, port 3000) and Web (`web/`, Vite, port 5173) cleanly via background shell
- Smoke-tested: `curl /api/airports` → HTTP 200, `curl http://localhost:5173/` → HTTP 200 with correct Vietnamese title
- Updated `init.sh` to verify all three subprojects (root + web + api) instead of the old single-package setup
- Updated `feature_list.json` with the new `web-bus-schedules-time-shape` feature

**Decisions encoded:**
- `init.sh` now runs `npm install` for root, then for `web/` and `api/` only if their `node_modules` is missing. It runs `tsc --noEmit` on root, `core/`, and `web/`, and `npm test` on root + web. Does NOT auto-start dev servers — they stay optional via `RUN_START_COMMAND=1`.
- Dev services are started by the agent in a sandboxed background shell, not by `init.sh`, so logs land in `/tmp/sanbaygo-{api,web}.log` and the processes survive the shell call.
- `init.sh` is now safe to run repeatedly; dependency installs are skipped when `node_modules` already exists.

**Verification run:**
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/airports` → `200`
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/` → `200`
- `curl -s http://localhost:5173/` contains `<title>SanBayGo - Đi xe buýt từ Nội Bài</title>`
- `git rev-list --left-right --count origin/main...HEAD` (on main) → `0 0` after pull

**Evidence recorded:** `lsof` output showing pids + ports, curl status codes, git log confirming merge commit.

**Commits:** None this session (only file updates, no code changes)

**Known risks:**
- Services are running in the background; if the user closes the terminal session that started them they may need restart. Long-term: dev orchestration should move to a `concurrently` script or a single `npm run dev:all` at root.
- API is in `tsx watch` mode so it auto-reloads on file changes; if the watch dies silently (seen in this session when one tsx process stopped listening without exiting) it would need a manual restart.

**Next best action:** Add a `concurrently`-based `npm run dev:all` script at the root that starts api + web + metro in one terminal with prefixed logs.

---

### Session 12: 2026-07-24

**Goal:** Fix white page on `http://localhost:5173` (SanBayGo web UI) and ship the fix as a PR.

**Completed:**
- Reproduced the bug via Playwright headless: page rendered empty because React unmounted on runtime error `time.split is not a function` inside `SchedulePreview` (web/src/components/ArrivalForm/index.tsx:179)
- Root cause: `web/src/hooks/useFormState.ts` was setting `busSchedules` from the API response directly, but `/api/airports/{id}/bus-routes/{id}` returns `schedules` as an array of objects (`{id, departure_time, ...}`), not an array of time strings
- Fixed `useFormState.ts` to map each schedule object to its `departure_time` string before calling `setBusSchedules(...)`
- Restarted Vite (HMR was serving cached module) and re-verified via Playwright: page now renders header, form, terminals T1/T2, baggage, destinations — no console errors
- Updated `claude-progress.md` with the fix
- Created branch `fix/web-bus-schedules-time-shape`, committed the fix, opened PR #4, merged into main

**Decisions encoded:**
- Fix is local to `useFormState` (the boundary between API and UI); `SchedulePreview` keeps its existing assumption that `busSchedules` is `string[]` — that's the correct type for the UI
- Did not change the API contract — extracting on the client matches the rest of the codebase's "API gives raw rows, hook normalizes" pattern

**Verification run:**
- Playwright headless load of `http://localhost:5173` → body contains `SanBayGo`, `Nhập thông tin chuyến bay`, terminals, baggage selector, destinations; zero console errors; zero page errors
- After Session 13 restart: `curl /` returns 200 with correct title

**Evidence recorded:** Playwright debug session output captured errors before fix and confirmed clean render after.

**Commits:** `fix(web): map busSchedules to departure_time strings in useFormState` (commit `21f148d`), merged via PR #4 → `cf1ecfd`

**Known risks:**
- Same shape mismatch could exist in RN app if `useArrivalWizard.ts` consumes the same API contract — should check but not part of this fix
- No automated test guards the shape mapping yet — bug regression possible if someone refactors `useFormState`

**Next best action:** Add a Jest test for `useFormState` that asserts `busSchedules` ends up as `string[]` after a mocked API response with schedule objects.

---

### Session 11: 2026-07-22

**Goal:** Plan and ticket the "collapse platform duplication" refactor — extract shared business logic from web and RN into a single `core/` module imported via the `@core` path alias.

**Completed:**
- Wrote implementation plan `docs/superpowers/plans/2026-07-22-collapse-platform-duplication.md` (1283 lines, 8 tasks, 50 checkboxes)
- Self-reviewed and fixed 7 issues: relative-path inconsistency, redundant type export, standalone `tsc` verify commands, TODO-planning in `vehicle-comparison-data.test.ts`, missing `findNextCatchableTrip.test.ts` price-assertion step, missing `web/src/lib/api/**` coverage, inconsistent rg patterns
- Broke plan into 7 tickets under `.scratch/sanbaygo-mvp/issues/01–07` using expand→migrate batches→contract pattern
- Updated this progress log

**Decisions encoded:**
- Folder structure: `core/data/`, `core/calculation-engine/`, `core/utils/`, `core/types/`
- Module format: TypeScript path alias `@core` → `core/index.ts` (no deep imports, no `../../core`-style relative paths)
- Consumer naming: barrel exports via `from '@core'`
- Tests live inside `core/`; run from both web and RN Jest configs
- Migration order: web-first (active development), RN second
- Bus 86 price: 50,000 VND per CONTEXT.md (was stale 35,000)
- T1 supports international flights: `Terminal.flightTypes: FlightType[]`
- Destination `'other'` added with `hasBusCoverage: false`

**Verification run:** N/A — planning + ticket breakdown only, no code changes

**Evidence recorded:** Plan file + 7 ticket files exist; this session log

**Commits:** None — no implementation this session

**Known risks:**
- Plan and tickets are review-only; not yet executed
- Web has web-only logic in `transport-calculator.ts` and `transport-data.ts` that intentionally stays out of `core/`
- Web's legacy types in `src/types/index.ts` (`Baggage`, `Destination`, `FormData`) are unused by components — safe to delete, but verify by grep before contract step

**Next best action:** Implement ticket 01 — stand up `core/` skeleton. Use `/implement 01` to start.

---

### Session 1: 2026-07-21

**Goal:** Create development harness and scaffold Expo project

**Completed:**
- Created AGENTS.md with development instructions
- Created init.sh for automated setup
- Created claude-progress.md (this file)
- Created feature_list.json for feature tracking
- Created session-handoff.md template
- Created clean-state-checklist.md template
- Created evaluator-rubric.md for quality scoring
- Created quality-document.md for codebase health tracking

**Verification run:** N/A - harness creation only

**Evidence recorded:** N/A

**Commits:** None yet - project not scaffolded

**Known risks:**
- Implementation plan exists but not yet executed
- Project directory does not exist yet

**Next best action:** Execute Task 1 (Project Scaffold) from `docs/superpowers/plans/2026-07-21-sanbaygo-mvp.md`

---

## Sessions 2-10: Implementation

All 10 implementation tasks completed:
- Task 1: Project scaffold with Expo
- Task 2: TypeScript types
- Task 3: Static data (airport, bus schedule, destinations)
- Task 4: Time utilities
- Task 5: Calculation engine (4 pure functions)
- Task 6: Form state hook (useArrivalWizard)
- Task 7: Form components (4-step wizard)
- Task 8: Result display components
- Task 9: Main app screen with expo-router
- Task 10: Final integration & build verification

**Final verification:**
- `npm test` - 85 tests passed
- `npx tsc --noEmit` - No errors
- `git push` - Pushed to GitHub

---

## Historical Summary

| Date | Session | Goal | Status |
|------|---------|------|--------|
| 2026-07-21 | 1 | Create harness + scaffold | Harness done, scaffold pending |
| 2026-07-21 | 2-10 | Implement MVP features | COMPLETE |
| 2026-07-22 | 11 | Plan collapse-platform-duplication refactor + 7 tickets | COMPLETE |
| 2026-07-24 | 12 | Fix white page (busSchedules time shape) → PR #4 merged | COMPLETE |
| 2026-07-24 | 13 | Restart api+web dev servers, sync local main with origin, update harness | COMPLETE |
| 2026-07-26 | 14 | Implement Figma Make Result page + Hero blur image; lift state to App so ResultPage mounts | COMPLETE |

## 2026-07-26 — Figma Make Result page + Hero blur image

- **Goal:** Bring the in-flight Figma Make redesign to the local web UI. Two pieces: a brand-new `ResultPage` (no longer the editorial-paper `ResultDisplay`) that mirrors the Figma Make result screen 1:1, and the missing `backdrop-blur` image stack on the landing hero.
- **What landed (commit `8b4f19e`):**
  - `web/src/components/Result/ResultPage.{tsx,module.css,index.ts}` — Figma Make result screen: sticky header with `ArrowLeft` + `Sân bay Nội Bài (T2)` + `Đến Phố Cổ, Hà Nội`, page title `Phương án di chuyển tốt nhất`, primary Bus card with sky-600 accent strip, `Khuyên dùng` badge, 4-step journey timeline (Pickup → Departure → Transit → Dropoff) with solid `bg-slate-200` connector and `border-[2.5px]` dots, amber callout, divider, ride-hail secondary card with slate-900 CTA.
  - `web/src/App.tsx` + `web/src/components/Landing/LandingPage.tsx` — `onSearch` prop now carries `(formData, result)` so App can lift state.
  - `web/src/components/Landing/Hero.tsx` — replaced 2-layer background with Figma's 5-layer stack: `bg-[#e6eff6]` fallback, full-width Unsplash photo via `mix-blend-overlay`, `from-white/95 via-white/80 to-white/10` left-right gradient (desktop), `from-transparent via-white/20 to-white/90` top-bottom gradient (mobile), and the key missing `bg-white/30 backdrop-blur-[2px]`.
  - `web/public/hero.jpg` — 2070×1382 JPEG, 454 KB, downloaded from the Unsplash URL Figma references (URLs expire in ~7 days, so downloaded to `public/`).
  - `design-system/tokens/tokens.{css,ts}` — added `--color-primary-50/100`, `--color-benefit-50/100`, `--color-warn-50/100/500/900` for Figma hex parity (slate/sky/emerald/amber families were already in place).
- **Integration fix (this session, uncommitted):**
  - `LandingPage` previously rendered `ResultDisplay` itself when `result` was set, so the `<ResultPage onBack>` branch in `App.tsx` was never reached. Now `LandingPage` no longer renders `ResultDisplay` — it just calls `onSearch(formData, result)` and App handles the swap. `ResultDisplay` is still imported by tests (12 tests pass against it directly) but is no longer mounted in the live app.
  - `App.tsx` deliberately ignores the lifted `formData`/`result` for now; `ResultPage` (Figma) renders static content. The wiring is in place so the next pass can plumb `formData` + `result` through `ResultPage` props to replace the static hard-coded values.
- **Verification:**
  - `web npx tsc --noEmit` → exit 0
  - `web npm test` → 13 suites, 77 tests pass
  - Vite serves `App.tsx`, `LandingPage.tsx`, `ResultPage.tsx` all HTTP 200; `web/public/hero.jpg` serves 454918 bytes
- **Known risks:**
  - `ResultPage` displays hard-coded values (`14:30`, `45.000₫`, `Phố Cổ, Hà Nội`, `14:50`, `45 – 50 phút`, `~ 250.000₫`, `~35 phút`, `Cột 4 - Cột 6`). The state is at App.tsx but not yet passed down — next session should plumb `formData` (arrivalTime, terminal, baggage, destination) and `result` (bus.trip, grab) into the ResultPage props.
  - `ResultDisplay` (editorial-paper version) still exists in the codebase and is still tested, but is no longer rendered in the app. Either delete it or keep it as a fallback while the Figma version stabilizes.
  - RN side has not been touched — `LandingPage` on RN still renders its own result, the Figma `ResultPage` import is web-only for now.
- **Next best action:** Plumb `formData` + `result` into `ResultPage` so the hard-coded values become dynamic. Then decide whether to delete `ResultDisplay` or keep it behind a feature flag.

## 2026-07-25 — Landing Page Replaces Form

- Spec: `docs/superpowers/specs/2026-07-25-landing-hero-replaces-form-design.md`
- Plan: `docs/superpowers/plans/2026-07-25-landing-hero-replaces-form.md`
- Plan commit: `1c6d845`
- Vision commit: `d6d423e` (editorial-paper baseline)
- Implementation evidence: Task 1 `65d68cf`; Task 2 `0d39e5c`, `cbfd985`; Task 3 `6e697bc`; Task 4 `caa2946`, `fd43e92`; Task 5 `11482ca`; Task 6 `cf95eca`; Task 7 `76455d2`, `eb5403e`; Task 8 `6d65675`; Task 9 `d1865a5`; Task 10 `7240ead`; Task 11 `0698e81`; Task 12 `2e3f11e`; Task 13 `6649a0f`; Task 14 `7519e00`; Task 15 `bfc2a69`.
- All 16 tasks complete; `init.sh` is green; Playwright e2e passes at 3 viewports.
- Editorial-paper and apple-minimal plans are closed/superseded.
- Figma palette replaces editorial-paper; BusTimetableSpine removed.
- Glass fallback on RN handled by `expo-blur` BlurView defaults.
- Task 16 feature ID renamed from `web-responsive-apple-minimal` to `responsive-web-apple-minimal`.
- Deferred — NativeWind 4 + Tailwind 4 pipeline + missing Metro config (RN Critical): requires a dedicated dependency and build-pipeline correction.
- Deferred — restore `result.comparisons` rendering in `ResultDisplay` (Web Critical): large behavior change outside this final-fix pass.
- Deferred — RN `LandingPage` `calculateResult` drops `direction` data (RN Critical): depends on the existing core result type.
- Deferred — `DepartureDropdown` keyboard operability (web + RN): plan-mandated follow-up.
- Deferred — RN Nav language toggle has no `onPress`: requires RN language-context wiring.
- Deferred — text glyphs versus Lucide icons (RN): small visual follow-up.
- Deferred — RN `SearchCard` test missing: scheduled for the next session.
- Deferred — i18n schema divergence (`landing.field*` versus `form.*`) (web): requires a focused consolidation task.
- Deferred — Footer `lg:` breakpoint on RN: visual-polish follow-up.
