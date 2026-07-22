# 02 — Migrate shared types into `core/types` (vehicle-comparison types included)

**What to build:** `core/types/index.ts` becomes the single source of truth for all shared TypeScript types — the existing RN types plus web's vehicle-comparison types — with the new `Terminal.flightTypes` shape so T1 can host international flights. The old `types/index.ts` and `web/src/types/index.ts` stay in place (expand phase); no consumer yet imports from `@core`.

**Blocked by:** 01 — `core/` skeleton must exist so the new types file has a home

**Status:** ready-for-agent

- [ ] Update `core/types/index.ts` to combine RN's existing types with web's `TransportType`, `SortOption`, `TransportOption`, `TransportComparison`, `TripCalculationRequest`, `TripCalculationResponse`
- [ ] Add `flightTypes: FlightType[]` to the `Terminal` interface (replace, do not append, since the old shape had no such field — verify no existing code reads a different shape)
- [ ] Confirm `ExitTimeEstimate.flightType?: FlightType` stays optional (do not break the 4-entry pre-flight-type table)
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] `cd web && npm test` and root `npm test` both still pass (no consumer yet imports `core`)
- [ ] Commit with message `feat(core): consolidate shared types and add Terminal.flightTypes`
