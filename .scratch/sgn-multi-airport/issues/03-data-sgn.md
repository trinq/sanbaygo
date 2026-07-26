# 03 — Data: add SGN_AIRPORT, SGN_DESTINATIONS, Bus 109/152/TIA, SGN grab estimate

**What to build:** Add SGN airport data:
- `core/data/airports/sgn.ts` exporting `SGN_AIRPORT: Airport` with 3 terminals (`SGN-T1`, `SGN-T2`, `SGN-T3`)
- `core/data/busSchedules/sgn.ts` exporting `BUS_109`, `BUS_152`, `TIA` `BusRoute[]` with `pickupPoints` + `scheduleSource`
- `core/data/grabEstimates/sgn.ts` exporting `SGN_GRAB_ESTIMATE: GrabEstimate`
- `core/data/destinations/sgn.ts` exporting `SGN_DESTINATIONS: DestinationPoint[]` — 5 quận (Q1, Q3, Q5, Bình Thạnh, Phú Nhuận), all `hasBusCoverage: true`
- Modify `core/data/destinations.ts` to expose `DESTINATIONS_BY_AIRPORT: Record<AirportId, DestinationPoint[]>` map
- Modify `core/data/airport.ts` to expose `AIRPORTS: Record<AirportId, Airport>` and `AIRPORT_LIST: Airport[]`
- Annotate Bus 86 (`core/data/busSchedule.ts`) with `pickupPoints` — behaviour unchanged

**Blocked by:** 01 — schema migration

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] `SGN_AIRPORT` has 3 terminals, 3 bus routes, SGN-specific grab estimate
- [ ] `BUS_109`: schedule explicit, `pickupPoints = [{ terminalId: 'SGN-T3', location: 'Ngay tại T3 — cột A17–A20' }]`, ticketPrice = 15_000, operatingHours { start: '05:30', end: '22:00' }, travelTime normal { 30, 45 } peak { 50, 70 }
- [ ] `BUS_152`: schedule explicit, `pickupPoints = [{ terminalId: 'SGN-T1', location: 'Làn B ga quốc nội, cột B06–B09' }, { terminalId: 'SGN-T2', location: 'Làn B gần sảnh đến quốc tế' }]`, ticketPrice range 5_000–7_000 (use median 6_000), operatingHours { start: '05:00', end: '19:00' }, travelTime normal { 25, 35 } peak { 40, 55 }
- [ ] `TIA`: scheduleSource kind 'frequency', `pickupPoints = [SGN-T1, SGN-T2, SGN-T3]`, ticketPrice = 0, operatingHours { start: '04:30', end: '00:30' }, headwayMinutes peak/normal = { peak: 15, normal: 20 }
- [ ] `SGN_DESTINATIONS`: 5 entries, all `hasBusCoverage: true`, walkingMinutes 5-12, travel time 22-60 min
- [ ] `DESTINATIONS_BY_AIRPORT['noi-bai']` = existing 5 + 'other'; `DESTINATIONS_BY_AIRPORT['tan-son-nhat']` = new 5
- [ ] `AIRPORTS` and `AIRPORT_LIST` exported; `NOI_BAI_AIRPORT` still re-exported for back-compat
- [ ] Bus 86 (`BUS_86`) gains `pickupPoints: [{ terminalId: 'HAN-T1', location: '...' }, { terminalId: 'HAN-T2', location: '...' }]`; values from `CONTEXT.md` "Bus 86 Pickup Points" table
- [ ] All existing bus/grab/destination tests still pass

**Out of scope:**

- Calculation engine changes (covered by 02)
- Web/RN UI (covered by 04, 05)
