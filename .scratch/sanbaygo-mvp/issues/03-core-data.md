# 03 — Migrate shared data into `core/data` with corrected values

**What to build:** `core/data/` becomes the single source of truth for Noi Bai Airport, Bus 86 schedule, exit-time estimates, destinations, and Grab estimates. Three intentional corrections land here: Bus 86 price 35000 → 50000 VND (per `CONTEXT.md` line 92), T1 international exit-time entries added, and `'other'` destination added with `hasBusCoverage: false`. The old `data/*` files stay in place during expand. A new `core/tests/data.test.ts` pins all three corrections so future drift is caught.

**Blocked by:** 02 — the `Terminal.flightTypes` shape must exist before the airport data references it

**Status:** ready-for-agent

- [ ] Create `core/data/busSchedule.ts` with `BUS_86_SCHEDULE` (26 departures) and `BUS_86` constant, `ticketPrice: 50000`
- [ ] Create `core/data/exitTimeEstimates.ts` with all 8 entries: existing 4 base entries plus 4 T1 international entries (`terminalType: 'domestic'`, `flightType: 'international'`, both baggage types)
- [ ] Create `core/data/grabEstimates.ts` with `GRAB_ESTIMATE` unchanged (250k–350k VND, 40–60 / 60–90 min)
- [ ] Create `core/data/destinations.ts` with all 6 destinations: 5 originals plus `'other'` (`hasBusCoverage: false`, display name `'Khu vực khác'`)
- [ ] Create `core/data/airport.ts` with `NOI_BAI_AIRPORT` where T1 has `flightTypes: ['domestic', 'international']` and T2 has `flightTypes: ['international']`
- [ ] Update `core/data/index.ts` to re-export concrete values (no longer thin re-exports of root files)
- [ ] Create `core/tests/data.test.ts` that asserts: `BUS_86.ticketPrice === 50000`, `'other'` destination exists with `hasBusCoverage: false`, T1 `flightTypes` includes `'international'`, T1 international exit-time entries exist for both baggage types
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test -- --testPathPattern="data.test"` passes (the new pinning test)
- [ ] `cd web && npm test` and root `npm test` (full suite) still pass — old `data/*` files are still in place, so legacy consumers are unaffected
- [ ] Commit with message `feat(core): move data with Bus 86 50k, T1 international, and 'other' destination`
