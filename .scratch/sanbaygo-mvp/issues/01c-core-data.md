# 01c — Stand up `core/data/` with shared static data

**What to build:** A new `core/data/` containing all six data files (`busSchedule.ts`, `airport.ts`, `destinations.ts`, `exitTimeEstimates.ts`, `grabEstimates.ts`) and a barrel `core/data/index.ts`. **No data corrections yet** — the Bus 86 price stays at the committed 35000 (correction to 50000 lands in ticket 02); T1 keeps `flightTypes: ['domestic']`; destinations do NOT yet include `'other'`. Root `data/*` stays in place during expand.

**Blocked by:** 01a — `core/tsconfig.json` already exists; extend its `include` to cover data

**Status:** ready-for-agent

- [ ] Create `core/data/busSchedule.ts` with `BUS_86_SCHEDULE` (26 departures) and `BUS_86` constant, **`ticketPrice: 35000`** (no correction yet — that lands in ticket 02)
- [ ] Create `core/data/exitTimeEstimates.ts` with the 4 entries that currently exist in `data/exitTimeEstimates.ts` (T1 domestic carry_on/checked + T2 international carry_on/checked; do NOT add T1 international entries yet)
- [ ] Create `core/data/grabEstimates.ts` with `GRAB_ESTIMATE` (250k–350k VND, 40–60 / 60–90 min) unchanged
- [ ] Create `core/data/destinations.ts` with the 5 destinations that currently exist in `data/destinations.ts` (do NOT add `'other'` yet)
- [ ] Create `core/data/airport.ts` with `NOI_BAI_AIRPORT` — T1 has `flightTypes: ['domestic']`, T2 has `flightTypes: ['international']` (no T1 international support yet)
- [ ] Create `core/data/index.ts` re-exporting `BUS_86_SCHEDULE`, `BUS_86`, `EXIT_TIME_ESTIMATES`, `GRAB_ESTIMATE`, `DESTINATIONS`, `NOI_BAI_AIRPORT`
- [ ] Update `core/tsconfig.json` `include` to `["./types", "./utils", "./data", "./tests"]`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test` (full suite) still passes — old `data/*` files are still in place, so legacy consumers are unaffected
- [ ] Commit with message `feat(core): move data module verbatim (corrections in next ticket)`