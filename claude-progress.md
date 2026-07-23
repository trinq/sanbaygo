# SanBayGo Progress Log

## Current Verified State

**Repository root directory:** `/Users/trinq/Developer/sanbaygo`

**Standard startup path:** `npm start`

**Standard verification path:** `npm test`

**All features:** COMPLETED

**Current status:** MVP complete + bug fixes pushed to GitHub

**Recent fixes:**
- Fixed ResultDisplay wiring (was using stub file instead of index.tsx)
- Fixed double peak surcharge bug (travelTime.peak was getting +30min surcharge on top)
- Fixed VehicleComparison showing empty (was calling non-existent HTTP API `/api/calculate-trip` in Vite frontend-only build; changed to call `calculateTripComparison()` directly)

---

## Session Record

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


---

### Session 12: 2026-07-24

**Goal:** Apply glassmorphism + warm palette to the result screens on both platforms (RN + web); port `VehicleComparison` from web-only to RN.

**Branch:** `feature/glass-warm-result-screen` (worktree `/Users/trinq/Developer/sanbaygo-glass`).

**Commits on this branch (14 total):**
- `66fe5ca` Task 1 — JSON tokens + RN adapter + MASTER
- `59c0308` Task 2 — `@design-system` path alias (root + web + Metro)
- `5f61121` Task 3 — CSS-vars adapter + barrel
- `d25eafc` Task 4 — Vietnamese copy table
- `fcc9188` Task 5 — `ResultCard` primitive (RN + web) + Jest harness
- `3e86f7c` Task 6 — 14 token-invariant tests
- `b218b6c` Task 7 — relocate `calculateTripComparison` into `@core`
- `4a83c38` Tasks 8+9 — RN card redesign + warm background
- `0da1587` Task 10 — web ResultDisplay re-skin + LanguageContext keys
- `896fcde` Task 11 — web VehicleComparison re-skin
- `95fe1c0` Task 12 — RN VehicleComparison port
- `9e66069` Task 13 — wire VehicleComparison into ResultDisplay
- `fe67b30` Task 13b — drop duplicate `jest.config.js`
- `e60e9ad` Task 14a — fix Vite aliases for `@design-system/*` sub-path resolution

**Verification (Task 14):**
- root `npx tsc --noEmit` exit 0
- web `npx tsc --noEmit` exit 0
- root `npx jest` → 135/135 tests pass
- web `npm test` → 11/11 tests pass
- web `npm run build` → exit 0 (80 modules; was ENOTDIR before Vite alias fix)
- grep Vietnamese literals in RN components → OK_NO_LITERALS
- grep hex literals in web CSS modules (excluding score[1-5]) → OK_NO_HEX
- 7 files import from `@design-system` (≥ 4 required)

**Evidence recorded:** `feature_list.json` gains `rn-result-glass-redesign` (priority 14) and `web-result-glass-redesign` (priority 15), both `status: passing`.

**Subagent deviations caught (good):**
- Task 12+13: actual `calculateTripComparison` returns `{comparison, metadata:{isPeakHour}}` not `{comparisons, isPeakHour}` as plan showed
- Task 14: Vite alias fix (`@design-system/` was resolving to `design-system/index.ts/tokens/index.css` — ENOTDIR)
- Task 13b: removed subagent-created duplicate `jest.config.js`

**Known risks:**
- Vite regex aliases are required for `@design-system/*` sub-paths to resolve correctly
- Sandbox blocks writing to `web/dist/`; production build needs to run with `all` permission
- The web `tsc` step runs before `vite build` per `npm run build` — any TS error halts before reaching the alias check

**Next best action:** Open a PR from `feature/glass-warm-result-screen` → `main`. Use `/finishing-a-development-branch` to pick merge vs PR strategy.
