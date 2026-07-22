# 04 — Migrate time utilities and calculation engine into `core/`

**What to build:** `core/utils/time.ts` and `core/calculation-engine/*` become the single source of truth. The corresponding test files move into `core/tests/` and run from the project's Jest config. The `findNextCatchableTrip.test.ts` price assertion is updated from 35000 to 50000 to match the new Bus 86 price. Old root-level `utils/`, `calculation-engine/`, and their test files stay in place during expand.

**Blocked by:** 03 — the calculation engine reads Bus 86 and exit-time estimates, so the data must exist first

**Status:** ready-for-agent

- [ ] Make `core/utils/time.ts` the canonical implementation (move body from `utils/time.ts`)
- [ ] Make `core/calculation-engine/{isPeakHour,calculateExitTime,findNextCatchableTrip,calculateArrivalEstimate}.ts` the canonical implementations (move bodies from the existing files)
- [ ] Move `tests/time.test.ts` to `core/tests/utils/time.test.ts` (update import paths only)
- [ ] Move `tests/calculation-engine/{isPeakHour,calculateExitTime,findNextCatchableTrip,calculateArrivalEstimate}.test.ts` to `core/tests/calculation-engine/*.test.ts`; update the `findNextCatchableTrip.test.ts` assertion `expect(result.trip.ticketPrice).toBe(50000)`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test` and `cd web && npm test` both pass with all moved test suites green (old files still in place, so Jest from each project's config will pick up both locations until the contract ticket removes them — for now they double-run, which is fine since tests are pure and idempotent)
- [ ] Commit with message `feat(core): move time utils and calculation engine with 50k price test`
