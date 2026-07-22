# 03 — Apply `Terminal.flightTypes` change and update calc engine + price test

**What to build:** `core/types/index.ts` gets the `Terminal.flightTypes: FlightType[]` field, plus web's vehicle-comparison types (`TransportType`, `SortOption`, `TransportOption`, `TransportComparison`, `TripCalculationRequest`, `TripCalculationResponse`). The calc-engine lookup in `core/calculation-engine/calculateExitTime.ts` is updated to honor `flightType` correctly so T1 international entries are findable. The price assertion in `core/tests/calculation-engine/findNextCatchableTrip.test.ts` is updated from 35000 to 50000.

**Blocked by:** 01d — calc engine skeleton must exist before its lookup logic changes; 02 — T1 international data corrections must exist before the lookup logic can find them

**Status:** ready-for-agent

- [ ] Update `core/types/index.ts`: add `flightTypes: FlightType[]` to the `Terminal` interface (verify nothing reads a different shape — `findNextCatchableTrip` and `calculateExitTime` are the only consumers)
- [ ] Update `core/types/index.ts`: add the vehicle-comparison types from `web/src/types/index.ts` — `TransportType`, `SortOption`, `TransportOption`, `TransportComparison`, `TripCalculationRequest`, `TripCalculationResponse`
- [ ] Update `core/calculation-engine/calculateExitTime.ts`: rewrite the lookup predicate to honor `flightType` so that T1 international entries can be found (current logic uses `e.flightType === 'international'` only when isInternational is true — verify this still resolves T1 international correctly after the data corrections)
- [ ] Update `core/tests/calculation-engine/findNextCatchableTrip.test.ts`: change `expect(result.trip.ticketPrice).toBe(35000)` to `expect(result.trip.ticketPrice).toBe(50000)` (one assertion, one line)
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test` (full suite) passes — all moved test suites green, including the new 50000 price assertion
- [ ] Commit with message `feat(core): add Terminal.flightTypes, vehicle-comparison types, and 50000 price test`