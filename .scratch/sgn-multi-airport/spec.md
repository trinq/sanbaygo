# SGN Multi-Airport Support

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:writing-plans after this spec is approved to break it into an implementation plan.

**Source request:** User asked for Tan Son Nhat (SGN) to appear as a selectable airport option in SanBayGo, alongside the existing Noi Bai (HAN) support.

**Status:** Draft awaiting code review and user approval.

**Triage Label:** ready-for-agent

---

## 1. Context (live state of the repo at HEAD)

The current SanBayGo codebase supports only Noi Bai (HAN):

| Surface | What exists |
|---|---|
| `core/` | Single-source-of-truth business logic. `Airport`, `Terminal`, `BusRoute`, `DestinationPoint` interfaces in `core/types/index.ts`. Concrete `NOI_BAI_AIRPORT` exported from `core/data/airport.ts`. |
| `web/` | Next.js + Vite + Tailwind 4 implementation. `useLandingForm` (in `web/src/hooks/`) hardcodes departure to NoiBai. |
| `app/` | RN (Expo) parallel effort. Mirrors `useLandingForm`. |
| `core/api/` | API client wrappers for web-side `lib/transport-calculator`. |

The current `TerminalId` type is the literal union `'T1' | 'T2'`. With SGN having 3 terminals (`T1`, `T2`, `T3`), "T1" is now ambiguous across airports. The current `BusRoute` type has `schedule: string[]` only — no support for buses that run on a frequency (`TIA` shuttle, 15-20 min headway).

User data (Vietnamese primary sources) for SGN:
- **Route 109** (electric bus, Phương Trang): T3 ↔ Bến xe buýt Sài Gòn, 15,000 VND, 05:30–22:00, 40–45 min headway
- **Route 152**: T1/T2 (Làn B) ↔ Chợ Bến Thành ↔ KDC Trung Sơn, 5–7,000 VND, 05:00–19:00 (có thể đến 22:00), 12–20 min headway
- **TIA VinBus shuttle**: T1 ↔ T2 ↔ T3, free, 4:30–00:30, 15–20 min headway

This spec records the decisions made during grilling and the technical shape needed to land SGN support without breaking HAN.

---

## 2. Problem Statement

A naive approach — adding SGN as a literal — would:

1. **Hardcode** airport ids and route ids into the form, breaking the data-driven contract SanBayGo already established (`useLandingForm` reads from `@core/data`).
2. **Reuse** `TerminalId = 'T1' | 'T2'` literally, causing collisions: SGN's T1 (domestic cũ) is not the same airport as HAN's T1.
3. **Force** every bus to fit `schedule: string[]`, but SGN's TIA runs on a frequency — fabricating an HH:mm[] would be dishonest about real operations.
4. **Skip** destination coverage: SGN passengers go to Q1/Q3/Q5/etc., not Phố Cổ/Hoàn Kiếm.
5. **Skip** travel time: SGN → Bến Thành is ~8-10 km (vs HAN → Phố Cổ ~25 km), so timing matrix must reflect geography.

The spec below addresses each.

---

## 3. Solution

### 3.1 Terminal ID scheme (scoped)

Replace the bare literal `'T1' | 'T2'` with airport-scoped ids. This is the **only structural breaking change** to the type system.

| Current | After |
|---|---|
| `TerminalId = 'T1' \| 'T2'` | `TerminalId = 'HAN-T1' \| 'HAN-T2' \| 'SGN-T1' \| 'SGN-T2' \| 'SGN-T3'` |
| `TripCalculationRequest.terminalId: 'T1' \| 'T2'` | `terminalId: TerminalId` (uses the new union) |
| `ArrivalFormData.terminal: TerminalId \| null` | unchanged in shape; value set changes |

A discriminated `AirportId` type (`'noi-bai' \| 'tan-son-nhat'`) is also introduced for explicit airport selection in `useLandingForm`.

### 3.2 Airport picker in landing form

The landing form gains an explicit **airport picker** as its first step (ahead of time/terminal/baggage/destination). Downstream steps filter by selected airport:

```
airport → time → terminal → baggage → destination
```

| Field | Type | Notes |
|---|---|---|
| `airport` | `AirportId \| null` | Required. Drives all downstream options. |
| All existing fields | unchanged | Their option lists now filter by `airport`. |

If a user picks SGN, the terminal picker shows SGN-T1/T2/T3 only; the destination picker shows Q1/Q3/Q5/Bình Thạnh/Phú Nhuận; the bus list shows Bus 109 + Bus 152 + TIA instead of Bus 86 + VIN transfers.

### 3.3 New `pickupPoints` field on `BusRoute`

```ts
export interface PickupPoint {
  terminalId: TerminalId;
  location: string; // e.g. "Tầng 1 sảnh đến, đối diện cột 12"
}

export interface BusRoute {
  // ... existing fields ...
  pickupPoints: PickupPoint[]; // terminals where this bus stops
}
```

Existing HAN Bus 86 data:
- `HAN-T1`: "Tầng 1 sảnh đến, đối diện cột 12"
- `HAN-T2`: "Tầng 1 sảnh đến, đối diện cột 14"

SGN Route 109 data (T3 only):
- `SGN-T3`: "Ngay tại T3 — cột A17–A20"

SGN Route 152 data (T1/T2):
- `SGN-T1`: "Làn B ga quốc nội, cột B06–B09"
- `SGN-T2`: "Làn B gần sảnh đến quốc tế"

TIA shuttle data (T1/T2/T3):
- `SGN-T1`: "Làn B, cột B17–B20"
- `SGN-T2`: "Làn B, cột B15–B16"
- `SGN-T3`: "Cột A17–A20"

### 3.4 Schedule support: explicit times **and** frequency

`BusRoute` gets a discriminated union for schedule source:

```ts
export interface BusRouteBase {
  id: string;
  routeNumber: string;
  ticketPrice: number; // VND
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number }; // minutes
    peak: { min: number; max: number };
  };
  pickupPoints: PickupPoint[];
  scheduleSource:
    | { kind: 'explicit'; departures: string[] } // HH:mm[]
    | { kind: 'frequency'; headwayMinutes: { peak: number; normal: number } };
}
```

- **Bus 86 (HAN)**, **Bus 109 (SGN)**, **Bus 152 (SGN)**: `kind: 'explicit'` — keep the existing HH:mm[] list.
- **TIA (SGN)**: `kind: 'frequency'`, headway = `{ peak: 15, normal: 20 }` minutes, operating hours 04:30–00:30.

Consumers of `schedule` (e.g. `findNextCatchableTrip()` in `core/calculation-engine`) branch on `scheduleSource.kind`. For `'frequency'`, the engine generates the next departure as `now + headway` (or interpolates from the operating hours window).

### 3.5 Travel time for SGN (estimated)

Real-world travel-time data for SGN buses was not supplied. The spec defaults to **estimates from distance**:

| Bus | Distance | Normal | Peak |
|---|---|---|---|
| Bus 109 (SGN-T3 → Bến xe buýt Sài Gòn) | ~12 km | 30–45 min | 50–70 min |
| Bus 152 (SGN-T1/T2 → Bến Thành) | ~9 km | 25–35 min | 40–55 min |
| TIA (T1 ↔ T2 ↔ T3) | n/a (shuttle) | 15–20 min | 15–20 min |

These are estimates only and labelled as such in the result UI ("Ước tính — chưa xác minh realtime"). A subsequent spec may replace them with measured values.

### 3.6 SGN destination set

A new module `core/data/destinations/sgn.ts` exports `SGN_DESTINATIONS: DestinationPoint[]` — 5 quận trung tâm:

```ts
[
  { id: 'q1', name: 'Quận 1', nearestBusStop: 'Chợ Bến Thành', walkingMinutes: 5, hasBusCoverage: true, travelTime: { normal: { 25, 35 }, peak: { 40, 55 } } },
  { id: 'q3', name: 'Quận 3', nearestBusStop: 'Chợ Bến Thành', walkingMinutes: 8, hasBusCoverage: true, travelTime: { normal: { 28, 38 }, peak: { 45, 60 } } },
  { id: 'q5', name: 'Quận 5', nearestBusStop: 'Chợ Bến Thành', walkingMinutes: 10, hasBusCoverage: true, travelTime: { normal: { 30, 40 }, peak: { 45, 60 } } },
  { id: 'binh-thanh', name: 'Bình Thạnh', nearestBusStop: 'Chợ Bến Thành', walkingMinutes: 12, hasBusCoverage: true, travelTime: { normal: { 28, 38 }, peak: { 42, 55 } } },
  { id: 'phu-nhuan', name: 'Phú Nhuận', nearestBusStop: 'Chợ Bến Thành', walkingMinutes: 7, hasBusCoverage: true, travelTime: { normal: { 22, 32 }, peak: { 35, 50 } } },
]
```

`core/data/destinations.ts` exports a `DESTINATIONS_BY_AIRPORT: Record<AirportId, DestinationPoint[]>` map. HAN keeps the existing 5 entries + `'other'`. Each `DestinationPoint` also gains an optional `airportId: AirportId` filter field — default inferred from its slot in the map.

### 3.7 Airport registry

`core/data/airport.ts` extends from a single export to a registry:

```ts
export const AIRPORTS: Record<AirportId, Airport> = {
  'noi-bai': NOI_BAI_AIRPORT,
  'tan-son-nhat': SGN_AIRPORT,
};

export const AIRPORT_LIST: Airport[] = Object.values(AIRPORTS);
```

`NOI_BAI_AIRPORT` is kept (back-compat) and `SGN_AIRPORT` is added. SGN contains 3 terminals, 3 bus routes (109, 152, TIA), and the same SGN-specific grab estimate (price range + travel time).

### 3.8 SGN grab estimate

Static estimate only (no API). Price range pulled from typical SGN ↔ Q1 fares:

```ts
{
  priceRange: { min: 100_000, max: 180_000 }, // VND, includes ~15,000 toll
  travelTime: {
    normal: { min: 20, max: 35 },
    peak: { min: 35, max: 55 },
  },
}
```

Same surface as `GRAB_ESTIMATE` for HAN. The plan notes the user did not supply exact data — these are reasonable defaults labelled as estimates.

### 3.9 Vehicle comparison providers

The same 6 providers from HAN remain available for SGN, with one tweak:

- **Bus 86 → Bus 109 + Bus 152 + TIA** (the "bus" rows swap based on selected airport)
- **Grab Bike, Xanh SM Bike, Grab Car, Xanh SM, Be** unchanged

The vehicle comparison engine receives the selected airport and pulls the right bus roster. Pricing/timing use the per-airport grab estimate; estimates are clearly labelled ("Ước tính").

### 3.10 TIA shuttle inclusion

**TIA is in scope.** It runs only inside SGN's three terminals (does not go to the city), so it appears as a **last-mile transfer** option in the result UI when the user's selected bus is **109 but their terminal is T1 or T2** — at which point the result surfaces:

> _Bạn ở [SGN-T1/T2]. Tuyến 109 chỉ đón tại T3. Bạn có thể đi TIA (miễn phí, ~17 phút) tới T3 rồi bắt tuyến 109, hoặc đi tuyến 152 trực tiếp từ Làn B._

This is **contextual** — it only shows up when it's relevant (109 + wrong terminal). For T3 users, it doesn't appear.

### 3.11 Calculation engine changes

The engine gains two new behaviours:

1. **Bus selection by terminal**: `findCatchableBusForTerminal()` walks the selected airport's `busRoutes`, filters by `pickupPoints[*].terminalId === selectedTerminal`, then runs the existing `findNextCatchableTrip` logic per matching bus.
2. **Frequency-mode trip finder**: if `scheduleSource.kind === 'frequency'`, the engine computes the next departure time as `readyAt + headwayMinutes.normal` (or `.peak`, whichever applies), respecting `operatingHours`.

`ArrivalFormData` adds `airport: AirportId`. `TripCalculationRequest` adds `airportId: AirportId`. The web orchestrator (`web/src/lib/calculation-result.ts`) propagates the field.

### 3.12 Files to touch

> Note: file paths listed here for migration sequencing. Behaviour is described elsewhere; tests and seams drive the change.

**Schema/data (`core/`):**
- MODIFY `core/types/index.ts` — new `AirportId`, new `TerminalId`, new `PickupPoint`, new `BusRoute` shape with `scheduleSource` discriminated union
- MODIFY `core/data/airport.ts` — register `SGN_AIRPORT`, export `AIRPORTS` + `AIRPORT_LIST`
- ADD `core/data/airports/sgn.ts` — SGN airports data
- ADD `core/data/busSchedules/sgn.ts` — Bus 109 + Bus 152 + TIA
- ADD `core/data/grabEstimates/sgn.ts` — SGN grab estimate
- MODIFY `core/data/destinations.ts` — split into `destinations/han.ts` + `destinations/sgn.ts` + index map
- MODIFY `core/data/busSchedule.ts` — annotate Bus 86 with `pickupPoints`
- MODIFY `core/data/grabEstimates.ts` — keep file as re-export shim or move to directory

**Calculation engine (`core/`):**
- MODIFY `core/calculation-engine/findNextCatchableTrip.ts` (or equivalent) — branch on `scheduleSource.kind`
- ADD `core/calculation-engine/findCatchableBusForTerminal.ts` — narrow bus list by terminal before scoring
- MODIFY `core/calculation-engine/calculateArrivalEstimate.ts` — accept airportId

**Web (`web/`):**
- MODIFY `web/src/hooks/useLandingForm.ts` — add `airport` field, filter downstream options by airport
- MODIFY `web/src/lib/calculation-result.ts` — propagate `airportId`
- ADD `web/src/components/Landing/AirportPicker.tsx` (dropdown showing airports)
- MODIFY `web/src/components/Landing/SearchCard.tsx` — slot AirportPicker as first control
- ADD `web/src/components/Result/TiaHint.tsx` — surfaces TIA transfer advice (only when 109 + wrong terminal)
- MODIFY `web/__tests__/hooks/useLandingForm.test.ts` — add tests for airport switching, terminal filtering, destination filtering
- ADD `web/__tests__/components/Landing/AirportPicker.test.tsx`
- ADD `web/__tests__/components/Result/TiaHint.test.tsx`

**RN (`app/`, `components/`):**
- MODIFY `app/hooks/useLandingForm.ts` — mirror web changes
- ADD `components/Landing/AirportPicker.tsx`
- MODIFY `tests/landing-flow.test.tsx` — add airport picker assertions
- ADD `components/Result/TiaHint.tsx`

**API (`core/api/`):**
- MODIFY `core/api/airports.ts` — return `AIRPORT_LIST` instead of hardcoded value
- MODIFY `core/api/calculate.ts` — request now includes `airportId`

### 3.13 Migration order (in implementation plan)

1. Land schema changes to `core/types/index.ts` (TerminalId → scoped, AirportId → new, PickupPoint, scheduleSource discriminated union)
2. Update `TripCalculationRequest`/`ArrivalFormData` types
3. Add `SGN_DESTINATIONS` + `DESTINATIONS_BY_AIRPORT` map
4. Add `SGN_AIRPORT` and its sub-data
5. Annotate Bus 86 with `pickupPoints` (no behaviour change)
6. Update `findNextCatchableTrip` for `scheduleSource.kind`
7. Add `findCatchableBusForTerminal`
8. Wire `airportId` through the web orchestrator and RN mirror
9. Build web `AirportPicker`, slot into `SearchCard`
10. Build RN `AirportPicker` mirror
11. Build `TiaHint` (both platforms)
12. Update tests on both platforms
13. Re-run `bash init.sh` — must stay green
14. Update Playwright e2e spec

---

## 4. User Stories

### A. Airport selection
1. As a passenger landing at SGN, I want to pick "Sân bay Tân Sơn Nhất" as my departure airport, so the form shows SGN-specific options.
2. As a passenger landing at HAN, I want everything to keep working exactly as before, so existing users aren't disrupted.
3. As a passenger switching airports mid-flow, I want all downstream options to refresh automatically, so the destination and terminal lists are always consistent with my airport choice.

### B. SGN-specific transport
4. As a passenger at SGN-T3, I want to see Bus 109 (electric, fast to city) as the recommended bus, so I know about the modern option.
5. As a passenger at SGN-T1 or T2, I want to see Bus 152 (cheap, to Bến Thành) as the recommended bus, with TIA shuttle surfaced only as a "you can also transfer to 109" hint, so I'm not forced into a transfer.
6. As a passenger at SGN-T1 or T2, when I select Bus 109, I want a clear hint that I'd need a TIA transfer first, so I don't miss my bus.
7. As a passenger who wants the cheapest option in SGN, I want to see Bus 152 (5–7,000 VND) prioritised over Bus 109 (15,000 VND) when both are catchable.

### C. Destinations
8. As a passenger going to Q1 in Saigon, I want "Quận 1" to appear in the destination list, with Bus 152 coverage, so the result includes walking time from Bến Thành.
9. As a passenger at HAN going to Phố Cổ, I want the destination list to be unchanged, so my previously-saved preferences (if any) still apply.

### D. Schedule fidelity
10. As a passenger planning a 22:30 arrival at SGN, I want the calculation to acknowledge that Bus 152 stops at 19:00–22:00 and Bus 109 stops at 22:00, so I'm not told a bus is available when it isn't.
11. As a passenger at SGN at 16:30 (peak hour), I want the travel time estimate to use peak figures, so I can plan realistically.

### E. Vehicle comparison
12. As a passenger at SGN, I want the vehicle comparison table to include the same 6 providers as HAN (5 ride-hail + buses), so I have the same choice.
13. As a passenger at SGN, I want the recommended-first sort to highlight Bus 152 (over Bus 109) when going to Q1, since it's cheaper and stops right at Bến Thành.

### F. Accessibility & quality
14. As a keyboard user, I want the airport picker to be reachable via Tab with visible focus.
15. As a Vietnamese-speaking user, I want all new strings (SGN terminals, Q1/Q3/Q5 district names, Bus 109/152 labels) to be in Vietnamese.
16. As a user with `prefers-reduced-motion: reduce`, I want the airport-picker transitions disabled.
17. As a low-end Android user, I want TIA hint to render as plain text if icons fail to load.

---

## 5. Testing Decisions

### What makes a good test

- **External behaviour only.** Tests assert on rendered content (Vietnamese strings, computed recommendations, dropdown options lists) — not on switch branches.
- **One test per behaviour, not per implementation detail.** The discriminated union (`scheduleSource.kind`) is an implementation detail; what matters is "given a TIA schedule, the engine returns a sensible next departure".

### Test surface

| Module | Test type | Notes |
|---|---|---|
| `core/types/` (no tests, but TypeScript itself verifies) | TS compilation | Type errors in consumers are the test |
| `core/data/airport.ts` (SGN_AIRPORT shape) | Unit | Verify SGN has 3 terminals, 3 bus routes, pickup points reference real terminal ids |
| `core/data/destinations/sgn.ts` | Unit | 5 entries, all `hasBusCoverage: true` |
| `core/calculation-engine/findNextCatchableTrip.ts` (frequency branch) | Unit | Given TIA, given readyAt = 14:00, returns departure ≈ 14:00–14:17 (next 15-min slot) |
| `core/calculation-engine/findCatchableBusForTerminal.ts` | Unit | Given airport=SGN, terminal=SGN-T2, readyAt=10:00 → returns 152 only (not 109). Given SGN-T1 → returns 152 only. Given SGN-T3 → returns 109 + TIA. |
| `web/src/hooks/useLandingForm.test.ts` | Unit | Switching `airport` from HAN→SGN updates terminal/destination options; submission shape includes `airportId` |
| `web/src/components/Landing/AirportPicker.test.tsx` | Render | Renders 2 options (HAN, SGN); selecting one fires `onChange` |
| `web/src/components/Result/TiaHint.test.tsx` | Render | Hidden when terminal=SGN-T3; visible with TIA info when terminal=SGN-T1/T2 and bus=109 |
| RN mirror tests | same as web | parallel coverage |
| `web/e2e/multi-airport.spec.ts` (NEW) | Playwright | At each viewport: pick SGN → see SGN airports destinations → pick Q1 → see Bus 152 first |
| `core/data/busSchedule.ts` schema parity (Bus 86 has pickupPoints) | Unit | Verify the existing data file gains pickup points without breaking values |

### Definition of Done (per AGENTS.md)

- All tests pass (`npm test`, `cd web && npm test`, RN `npm test`)
- TypeScript compiles (`npx tsc --noEmit`, `cd web && npx tsc --noEmit`)
- `bash init.sh` is green
- All new Vietnamese strings come from the language context (web) or the RN vi.ts file (RN)
- One feature entry added per platform to `feature_list.json` (multi-airport web + multi-airport RN)
- Two commits: `feat(core): multi-airport support — add SGN`, `feat(platform): multi-airport UI` (web + RN)

---

## 6. Open Decisions

1. **Real travel-time validation.** SGN travel times were estimated, not measured. Should the plan include a `research` ticket to validate them against BusMap/Moovit before launch? **Default:** yes — include as ticket 04.
2. **Contraction of `TerminalId` type.** The literal union grows from 2 to 5. Should we switch to `string` for flexibility? **Default:** keep the literal union — it gives exhaustiveness checking and catches typos. If a third airport arrives (DAD, CXR), widening to template literal or branded string is a focused refactor.
3. **`airportId` field on `DestinationPoint`.** Adding it makes filtering explicit. Is the implicit grouping via `DESTINATIONS_BY_AIRPORT` map sufficient? **Default:** implicit map for now; add `airportId` only if a destination needs to be in multiple airports' lists.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Renaming `TerminalId` literals breaks every consumer | Grep audit before commit (`rg "'T1'\|'T2'"`) and TypeScript compilation as the test |
| `findNextCatchableTrip` no longer exhaustively matches `BusRoute[]` — frequency path must also call the `operatingHours` check | Unit tests cover both kinds, plus an edge test where `readyAt > operatingHours.end` (no departure) |
| SGN travel-time estimates are wrong by ±20% | Label them "Ước tính" in the UI; queue a `research` ticket (06 above) to refine |
| Vehicle comparison now has 3 buses for SGN — risk of confusing recommended-first sort | Test: given SGN + Q1 + recommended sort, 152 comes first (cheapest + ends at Bến Thành) |
| `TIA` runs only between T1/T2/T3 — adding it to the destination route calculation would be wrong | TIA is registered as a `pickupPoints` shuttle bus, but its `scheduleSource.kind = 'frequency'` is set and its `travelTime` range tracks shuttle-not-line-haul; the engine filters buses by `pickupPoints[*].terminalId === selectedTerminal` so TIA only shows when current terminal matches its pickup — TIA does not appear in destination coverage |
| RN NativeWind string class for "Tan Son Nhat" may need fallback font glyph | Use only ASCII-safe Vietnamese diacritics ("Tân Sơn Nhất"), Plus Jakarta Sans supports them |
| Playwright e2e uses a fixed airport fixture — needs update | Update spec to test both airports, not just HAN |

---

## 8. Out of Scope

- New airports beyond SGN (DAD, CXR, PQC, etc.) — separate spec when SGN ships
- Real-time traffic / Google Maps API integration — `CONTEXT.md` already defers this
- Cross-airport transfers (e.g., arriving at HAN, going to SGN) — out of scope; this is a same-city app
- Deep-linking to Grab app for booking — `CONTEXT.md` already excludes
- Real-time schedule sync from BusMap/Moovit APIs — out of scope; static schedule data only
- Per-route variant of TIA (e.g., wheelchair-accessible shuttle) — out of scope for v1
- Visual regression tooling — out of scope

---

## 9. Worked example — happy path (SGN)

**Given** form: airport=`Tân Sơn Nhất (SGN)`, terminal=`SGN-T1` (domestic), baggage=`carry_on`, arrival=`14:30`, destination=`Quận 1` (`q1`), flightType=`domestic`.

1. `useLandingForm.airport = 'tan-son-nhat'`
2. Terminal picker shows `SGN-T1`, `SGN-T2`, `SGN-T3`; user picks `SGN-T1`.
3. Destination picker shows SGN's 5 quận; user picks `q1`.
4. `findCatchableBusForTerminal({ airport: 'tan-son-nhat', terminal: 'SGN-T1', readyAt: '14:40' })` returns:
   - **Bus 152** (pickupPoint terminalId = SGN-T1, schedule: '14:36' departure found) ✓
   - Bus 109 filtered out (no pickupPoint for SGN-T1)
   - TIA filtered out from "destination bus" (it doesn't go to the city)
5. Result renders:
   - **Recommended**: Bus 152 → Chợ Bến Thành, departure 14:36, wait 0 min, +5 min walk to Q1, total 14:36 + 35 min ride + 5 min walk ≈ 15:16
   - 5 ride-hail providers in vehicle comparison
6. **TIA hint does NOT appear** (user is on Bus 152 directly, no transfer needed).

---

## 10. Worked example — TIA transfer hint

**Given** form: airport=`Tân Sơn Nhất (SGN)`, terminal=`SGN-T2` (international), baggage=`checked`, arrival=`15:00`, destination=`Quận 1`.

1. User notices Bus 109 is faster (electric, modern) and ticks the "I want Bus 109" option (if such a UI control exists) — or, the recommended engine considers all buses and shows Bus 109 as alternative next to Bus 152.
2. Engine surfaces TIA hint:
   > _Bạn ở SGN-T2. Tuyến 109 chỉ đón tại T3. Bạn có thể đi TIA miễn phí (~17 phút) tới T3 rồi bắt 109 lúc 15:42, hoặc đi tuyến 152 trực tiếp từ Làn B ga quốc tế lúc 15:18._
3. Vehicle comparison includes TIA→109 as a possible bus option (transfer = 17 min wait + 109 ride = ~50 min total), but the recommended badge stays on Bus 152 (cheaper, direct).

---

## 11. Reviewer checklist

- [ ] Confirm `TerminalId` becomes `HAN-T1 | HAN-T2 | SGN-T1 | SGN-T2 | SGN-T3`
- [ ] Confirm `AirportId` discriminated union exists and `NOI_BAI_AIRPORT` and `SGN_AIRPORT` are registered
- [ ] Confirm `pickupPoints` field added to `BusRoute` with HAN Bus 86 annotated
- [ ] Confirm `scheduleSource: { kind: 'explicit' } | { kind: 'frequency' }` discriminated union
- [ ] Confirm TIA hint is conditional (only when relevant)
- [ ] Confirm vehicle comparison uses the airport-aware bus list
- [ ] Confirm SGN travel-time estimates labelled "Ước tính" in UI
- [ ] Confirm 5 quận destinations for SGN (Q1, Q3, Q5, Bình Thạnh, Phú Nhuận)
- [ ] Confirm migration order keeps HAN working end-to-end before SGN lights up
