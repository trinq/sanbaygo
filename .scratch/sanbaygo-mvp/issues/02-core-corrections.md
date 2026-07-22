# 02 — Apply intentional data corrections in `core/`

**What to build:** Three intentional corrections land in the `core/` module (Bus 86 price 35000 → 50000, T1 supports international flights, `'other'` destination added). New test file `core/tests/data.test.ts` pins all three so future drift is caught. Root `data/*` stays in place during expand — these corrections only affect `core/` for now; legacy consumers see no change until ticket 06.

**Blocked by:** 01c — `core/data/` skeleton must exist before corrections land

**Status:** ready-for-agent

- [ ] Update `core/data/busSchedule.ts`: change `BUS_86.ticketPrice` from `35000` to `50000`; add comment citing `CONTEXT.md` line 92
- [ ] Update `core/data/exitTimeEstimates.ts`: add T1 international entries (terminalType `'domestic'`, `flightType: 'international'`, both baggage types — using the existing T1 domestic numbers, since T1 international has no immigration)
- [ ] Update `core/data/airport.ts`: change T1's `flightTypes` from `['domestic']` to `['domestic', 'international']`
- [ ] Update `core/data/destinations.ts`: add the `'other'` destination at the end of the array (id `'other'`, display name `'Khu vực khác'`, `hasBusCoverage: false`, same travel times as Hoan Kiem)
- [ ] Create `core/tests/data.test.ts` with assertions pinning the three corrections: `BUS_86.ticketPrice === 50000`, `'other'` destination exists with `hasBusCoverage: false`, T1 `flightTypes` includes `'international'`, T1 international exit-time entries exist for both baggage types
- [ ] Update `core/tsconfig.json` `include` to add `"./tests"`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test -- --testPathPattern="data.test"` passes (the new pinning test)
- [ ] Root `npm test` (full suite) still passes — corrections only land in `core/`, root files unchanged
- [ ] Commit with message `feat(core): apply Bus 86 50k, T1 international, and 'other' destination corrections`