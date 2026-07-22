# 01d — Stand up `core/calculation-engine/` with pure functions

**What to build:** A new `core/calculation-engine/` containing the four pure functions (`isPeakHour.ts`, `calculateExitTime.ts`, `findNextCatchableTrip.ts`, `calculateArrivalEstimate.ts`) plus a barrel `core/calculation-engine/index.ts`. **No price correction yet** — `findNextCatchableTrip` still returns `BUS_86.ticketPrice = 35000` (correction to 50000 lands in ticket 02). All four test files mirror the existing tests verbatim (bodies unchanged). Root `calculation-engine/*` and `tests/calculation-engine/*` stay in place during expand.

**Blocked by:** 01a — `core/tsconfig.json` already exists; extend its `include` to cover calculation-engine

**Status:** ready-for-agent

- [ ] Create `core/calculation-engine/isPeakHour.ts` containing the existing `isPeakHour` function verbatim
- [ ] Create `core/calculation-engine/calculateExitTime.ts` containing the existing `calculateExitTime` function verbatim
- [ ] Create `core/calculation-engine/calculateArrivalEstimate.ts` containing the existing `calculateArrivalEstimate` function verbatim (this is the version with the peak-surcharge bug fix already committed — `travelTime.peak` already includes peak delays; `isPeak` is informational only)
- [ ] Create `core/calculation-engine/findNextCatchableTrip.ts` containing the existing `findNextCatchableTrip` verbatim, returning `ticketPrice: BUS_86.ticketPrice` (which is 35000 in this ticket; corrected to 50000 in ticket 02)
- [ ] Create `core/calculation-engine/index.ts` re-exporting the four functions
- [ ] Move `tests/calculation-engine/{isPeakHour,calculateExitTime,findNextCatchableTrip,calculateArrivalEstimate}.test.ts` to `core/tests/calculation-engine/*.test.ts` with updated import paths only — bodies stay byte-identical, including the 35000 price assertion (correction lands in ticket 02)
- [ ] Update `core/tsconfig.json` `include` to `["./types", "./utils", "./data", "./calculation-engine", "./tests"]`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test -- --testPathPattern="calculation-engine"` passes (the moved test suites)
- [ ] Root `npm test` (full suite) still passes — old `calculation-engine/*` and `tests/calculation-engine/*` files are still in place, so legacy consumers are unaffected
- [ ] Commit with message `feat(core): move calculation engine with tests`