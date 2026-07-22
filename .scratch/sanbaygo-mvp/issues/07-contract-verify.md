# 07 — Contract: verify single source of truth

**What to build:** Final integration check that proves the refactor is complete. After this ticket, no `core`-owned business logic remains outside `core/`, no consumer imports the legacy relative paths, both projects' test suites are green, and web's `tsc --noEmit` exits 0.

**Blocked by:** 06 — both web and RN migrations must be complete

**Status:** ready-for-agent

- [ ] `ls data types utils calculation-engine` from repo root reports "No such file or directory" for each
- [ ] `rg "from '\.\./data/|from '\.\./\.\./data/|from '\.\./types'|from '\.\./\.\./types'|from '\.\./utils/time'|from '\.\./\.\./utils/time'|from '\.\./calculation-engine'|from '\.\./\.\./calculation-engine'" app components hooks web/src` returns no matches
- [ ] `cd web && npm test` passes with zero failures
- [ ] Root `npm test` passes with zero failures
- [ ] `cd web && npx tsc --noEmit` exits 0
- [ ] Root `npx tsc --noEmit` exits 0 — **NOTE**: this step is known to fail on the `@/lib/transport-calculator` import in `web/src/components/VehicleComparison/index.tsx` because root tsconfig maps `@/*` to repo root while web tsconfig maps `@/*` to `web/src/`. This is a pre-existing alias conflict (confirmed against `main` baseline before the refactor). Treat this step as **expected failure** unless web's Vite import paths have been reworked; document the failure rather than treating it as a regression. The web's own `tsc --noEmit` (run from inside `web/`) passes cleanly.
- [ ] `git status` shows the 7 feature commits; pre-existing untracked files (`web/e2e/`, `web/playwright-report/`, `web/playwright.config.ts`, `web/specs/`, `docs/superpowers/plans/2026-07-21-vehicle-comparison.md`) are out of scope
- [ ] `git log --oneline -7` shows the seven feature commits from tickets 01a–06 in order
- [ ] No new commit needed — this ticket is verification-only. If any step fails, file a follow-up ticket and stop; do not amend prior commits
- [ ] **Bonus cleanup**: add the pre-existing untracked playwright directories (`web/e2e/`, `web/playwright-report/`, `web/playwright.config.ts`, `web/specs/`) to root `.gitignore` so future work isn't polluted by them. This is a separate commit from verification.
