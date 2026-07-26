# 02 — Engine: multi-airport bus finder + frequency branch

**What to build:** Update `core/calculation-engine/` to (a) accept `airportId` in `TripCalculationRequest`, (b) add `findCatchableBusForTerminal()` that filters `BusRoute[]` by `pickupPoints[*].terminalId === selectedTerminal`, (c) teach `findNextCatchableTrip()` (or equivalent) to handle `scheduleSource.kind === 'frequency'` by computing the next departure as `readyAt + headwayMinutes.normal` (or `.peak`).

**Blocked by:** 01 — schema migration

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] `TripCalculationRequest.airportId: AirportId` added; response shape unchanged
- [ ] `findCatchableBusForTerminal({ airportId, terminalId, readyAt })` returns only buses whose `pickupPoints` includes the selected terminal
- [ ] For explicit-schedule buses, the existing catchable-trip logic continues to work
- [ ] For frequency-schedule buses (e.g., TIA), the engine returns a departure time within the next headway window
- [ ] Edge case: `readyAt > operatingHours.end` returns no departure
- [ ] Edge case: `readyAt < operatingHours.start` returns the first departure after `start`
- [ ] Unit tests: HAN-T1 → Bus 86 only; HAN-T2 → Bus 86 only; SGN-T1 → Bus 152 only (109 filtered); SGN-T2 → Bus 152 only; SGN-T3 → Bus 109 + TIA
- [ ] Frequency test: TIA, readyAt=14:00 → next departure 14:00–14:17 (next 15-min slot respecting 04:30–00:30)
- [ ] All calculation-engine tests green

**Out of scope:**

- SGN airport data (covered by 03)
- Web/RN UI (covered by 04, 05)
