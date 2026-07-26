# SGN Multi-Airport Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Tan Son Nhat (SGN) as a second airport in SanBayGo alongside Noi Bai (HAN), with terminal-scoped IDs, frequency-based bus schedules, and an airport picker in the landing form.

**Architecture:** Extend `core/types/index.ts` with airport-scoped `TerminalId` (`HAN-T1`, `SGN-T2`, etc.) and discriminated `scheduleSource` (`'explicit' | 'frequency'`). Add `SGN_AIRPORT` to `core/data/`, register it in `AIRPORTS`. The calculation engine filters buses by `pickupPoints[*].terminalId` and computes next departure for frequency buses. The web + RN landing forms gain an `AirportPicker` as the first control, which filters downstream options (terminals, destinations, buses).

**Tech Stack:** TypeScript 5.x, React 18, Next.js (web), Expo SDK (app), Tailwind 4, Jest, custom utility functions in `core/utils/time.ts`.

## Global Constraints

- All user-facing strings in Vietnamese (existing `LanguageContext` on web, RN vi.ts file)
- DRY: shared logic in `core/`, do not duplicate between web and RN
- YAGNI: no address-to-coordinate lookup, no real-time API, no new design tokens
- TDD: write failing test first, then minimal implementation, then commit
- Frequent commits: one commit per task (or per logical sub-step when task is large)
- Terminal IDs are scoped: `HAN-T1`, `HAN-T2`, `SGN-T1`, `SGN-T2`, `SGN-T3` — never bare `T1`/`T2`
- Schedule is a discriminated union — every bus must explicitly state `kind: 'explicit'` or `kind: 'frequency'`
- `init.sh` must remain green after every task (root `npx tsc --noEmit`, `cd web && npx tsc --noEmit`, all Jest suites)

---

## File Structure

### `core/types/`
- `core/types/index.ts` — extend with `AirportId`, scoped `TerminalId`, `PickupPoint`, `BusRoute` discriminated union

### `core/data/`
- `core/data/airport.ts` — add `SGN_AIRPORT`, export `AIRPORTS` and `AIRPORT_LIST` registry
- `core/data/airports/sgn.ts` (NEW) — SGN airport data
- `core/data/busSchedules/sgn.ts` (NEW) — SGN bus routes (Bus 109, Bus 152, TIA)
- `core/data/grabEstimates/sgn.ts` (NEW) — SGN grab estimate
- `core/data/destinations.ts` — split into `destinations/han.ts` + `destinations/sgn.ts` + index map
- `core/data/destinations/han.ts` (NEW) — extract existing HAN destinations
- `core/data/destinations/sgn.ts` (NEW) — 5 quận SGN
- `core/data/busSchedule.ts` — annotate `BUS_86` with `pickupPoints`
- `core/data/index.ts` — add new exports

### `core/calculation-engine/`
- `core/calculation-engine/findCatchableBusForTerminal.ts` (NEW) — filter buses by terminal
- `core/calculation-engine/findNextCatchableTrip.ts` — extend to accept `BusRoute` (and `AirportId` for frequency defaults), branch on `scheduleSource.kind`
- `core/calculation-engine/calculateArrivalEstimate.ts` — accepts `BusRoute` so the travel time is per-route
- `core/calculation-engine/index.ts` — export new function

### `web/`
- `web/src/hooks/useLandingForm.ts` — add `airport` field, filter downstream options
- `web/src/components/Landing/AirportPicker.tsx` (NEW) — first control
- `web/src/components/Landing/SearchCard.tsx` — slot `AirportPicker`
- `web/src/components/Result/TiaHint.tsx` (NEW) — conditional TIA transfer hint
- `web/src/components/ResultDisplay/index.tsx` — render `TiaHint` when relevant
- `web/src/lib/calculation-result.ts` — propagate `airportId`, use `findCatchableBusForTerminal`
- `web/__tests__/hooks/useLandingForm.test.ts` — update for new field
- `web/__tests__/components/Landing/AirportPicker.test.tsx` (NEW)
- `web/__tests__/components/Result/TiaHint.test.tsx` (NEW)
- `web/__tests__/lib/calculation-result.test.ts` (NEW) — verify airport-aware routing

### `app/`
- `app/hooks/useLandingForm.ts` — mirror web changes
- `app/hooks/useLandingForm.test.ts` — mirror web tests
- `components/Landing/AirportPicker.tsx` (NEW) — RN mirror
- `components/Result/TiaHint.tsx` (NEW) — RN mirror

### Docs
- `CONTEXT.md` — already updated inline during grilling

---

## Task 1: Extend `core/types/index.ts` with multi-airport + discriminated schedule

**Files:**
- Modify: `core/types/index.ts` (replaces lines 1-31)
- Test: `core/tests/types/airport-shape.test.ts` (NEW)

**Interfaces:**
- Produces: `AirportId`, `TerminalId` (scoped), `PickupPoint`, `BusRoute` (new shape with `scheduleSource`)

- [ ] **Step 1: Write failing type-shape test**

Create `core/tests/types/airport-shape.test.ts`:

```ts
import type {
  AirportId,
  TerminalId,
  PickupPoint,
  BusRoute,
} from '../../types';

describe('multi-airport type shape', () => {
  it('AirportId is a discriminated union of two airports', () => {
    const a: AirportId = 'noi-bai';
    const b: AirportId = 'tan-son-nhat';
    expect([a, b]).toHaveLength(2);
  });

  it('TerminalId is airport-scoped (5 literals)', () => {
    const literals: TerminalId[] = ['HAN-T1', 'HAN-T2', 'SGN-T1', 'SGN-T2', 'SGN-T3'];
    expect(literals).toHaveLength(5);
  });

  it('PickupPoint requires terminalId and location', () => {
    const p: PickupPoint = { terminalId: 'HAN-T1', location: 'Tầng 1 sảnh đến' };
    expect(p.terminalId).toBe('HAN-T1');
    expect(p.location).toBe('Tầng 1 sảnh đến');
  });

  it('BusRoute uses scheduleSource discriminated union — explicit kind', () => {
    const r: BusRoute = {
      id: 'bus-86',
      routeNumber: '86',
      ticketPrice: 50000,
      operatingHours: { start: '06:40', end: '22:15' },
      travelTime: { normal: { min: 50, max: 55 }, peak: { min: 65, max: 75 } },
      pickupPoints: [{ terminalId: 'HAN-T1', location: 'Tầng 1' }],
      scheduleSource: { kind: 'explicit', departures: ['06:40', '22:15'] },
    };
    expect(r.scheduleSource.kind).toBe('explicit');
  });

  it('BusRoute uses scheduleSource discriminated union — frequency kind', () => {
    const r: BusRoute = {
      id: 'tia',
      routeNumber: 'TIA',
      ticketPrice: 0,
      operatingHours: { start: '04:30', end: '00:30' },
      travelTime: { normal: { min: 15, max: 20 }, peak: { min: 15, max: 20 } },
      pickupPoints: [{ terminalId: 'SGN-T1', location: 'Làn B' }],
      scheduleSource: { kind: 'frequency', headwayMinutes: { peak: 15, normal: 20 } },
    };
    expect(r.scheduleSource.kind).toBe('frequency');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/trinq/Developer/sanbaygo && npx jest core/tests/types/airport-shape.test.ts`
Expected: FAIL (`Cannot find module '../../types'` or `AirportId` not exported)

- [ ] **Step 3: Update `core/types/index.ts`**

Replace the existing file content with:

```ts
export type TerminalType = 'domestic' | 'international';
export type AirportId = 'noi-bai' | 'tan-son-nhat';
export type TerminalId =
  | 'HAN-T1'
  | 'HAN-T2'
  | 'SGN-T1'
  | 'SGN-T2'
  | 'SGN-T3';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

export interface Airport {
  id: AirportId;
  name: string;
  terminals: Terminal[];
  busRoutes: BusRoute[];
  grabEstimates: GrabEstimate;
}

export interface Terminal {
  id: TerminalId;
  name: string;
  type: TerminalType;
  flightTypes: FlightType[];
}

export interface PickupPoint {
  terminalId: TerminalId;
  location: string;
}

export type ScheduleSource =
  | { kind: 'explicit'; departures: string[] }
  | { kind: 'frequency'; headwayMinutes: { peak: number; normal: number } };

export interface BusRoute {
  id: string;
  routeNumber: string;
  ticketPrice: number;
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
  pickupPoints: PickupPoint[];
  scheduleSource: ScheduleSource;
}

export interface DestinationPoint {
  id: string;
  name: string;
  nearestBusStop: string;
  walkingMinutes: number;
  hasBusCoverage: boolean;
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface ExitTimeEstimate {
  terminalType: TerminalType;
  baggageType: BaggageType;
  flightType?: FlightType;
  minMinutes: number;
  maxMinutes: number;
}

export interface GrabEstimate {
  priceRange: { min: number; max: number };
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface TimeRange {
  early: string;
  late: string;
  minutesRange: { min: number; max: number };
}

export interface BusRecommendation {
  available: boolean;
  trip?: {
    departureTime: string;
    waitMinutes: number;
    arrivalEstimate?: TimeRange;
    ticketPrice: number;
  };
  reason?: 'no_service' | 'too_late' | 'missed_last';
}

export interface ArrivalResult {
  bus: BusRecommendation;
  grab: {
    available: boolean;
    priceEstimate: string;
    travelTime: TimeRange;
  };
  direction?: {
    description: string;
    estimatedMinutes: number;
  };
}

export interface ArrivalFormData {
  arrivalTime: string;
  terminal: TerminalId | null;
  baggage: BaggageType | null;
  destination: string | null;
  flightType: FlightType;
  airportId: AirportId;
}

export type ArrivalFormStep = 'time' | 'terminal' | 'baggage' | 'destination';

export type TransportType = 'bus' | 'motorbike' | 'car';
export type SortOption = 'recommended' | 'cheapest' | 'fastest';

export interface TransportOption {
  id: string;
  name: string;
  nameVi: string;
  type: TransportType;
  basePrice: number;
  priceUnit: 'per_trip' | 'per_person';
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
  luggageScore: number;
  comfortScore: number;
  ecoFriendly: boolean;
  isRecommended: boolean;
  notes: string;
}

export interface TransportComparison {
  id: string;
  name: string;
  nameVi: string;
  type: TransportType;
  price: {
    estimate: string;
    value: number;
    isEstimate: boolean;
  };
  travelTime: {
    estimate: string;
    minutesRange: { min: number; max: number };
    arrivalEstimate: string;
  };
  waitTime?: {
    minutes: number;
    nextDeparture: string;
  };
  luggage: {
    score: number;
    label: string;
  };
  comfort: {
    score: number;
    label: string;
  };
  ecoFriendly: boolean;
  notes: string;
  isRecommended: boolean;
}

export interface TripCalculationRequest {
  arrivalTime: string;
  airportId: AirportId;
  terminalId: TerminalId;
  baggageType: BaggageType;
  destinationId: string;
  sortBy: SortOption;
}

export interface TripCalculationResponse {
  comparison: TransportComparison[];
  metadata: {
    arrivalTime: string;
    readyAt: string;
    isPeakHour: boolean;
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest core/tests/types/airport-shape.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Type-check existing consumers**

Run: `npx tsc --noEmit`
Expected: FAIL with errors at:
- `core/data/airport.ts:7,14` (`Terminal.id: 'T1' | 'T2'` no longer matches)
- `web/src/hooks/useLandingForm.ts:10` (`DEFAULT_TERMINAL: 'T1'` no longer valid)
- `web/src/lib/calculation-result.ts:18` (terminal lookup and TripCalculationRequest)
- `web/src/components/ResultDisplay/index.tsx` (`formData.terminal === 'T1'` checks)
- `core/tests/calculation-engine/findNextCatchableTrip.test.ts` (uses `BUS_86` which still has `schedule: string[]`)

This is expected. Fixes come in later tasks.

- [ ] **Step 6: Commit**

```bash
git add core/types/index.ts core/tests/types/airport-shape.test.ts
git commit -m "feat(core): multi-airport types — scoped TerminalId, AirportId, scheduleSource union"
```

---

## Task 2: Annotate `BUS_86` with `pickupPoints` and fix `airport.ts` TerminalId

**Files:**
- Modify: `core/data/busSchedule.ts`
- Modify: `core/data/airport.ts`
- Test: `core/tests/data/busSchedule.test.ts` (NEW)

**Interfaces:**
- Consumes: `PickupPoint`, `BusRoute` from Task 1
- Produces: `BUS_86` with `pickupPoints: [{HAN-T1, ...}, {HAN-T2, ...}]`; `NOI_BAI_AIRPORT.terminals[*].id` updated to scoped ids

- [ ] **Step 1: Write failing test**

Create `core/tests/data/busSchedule.test.ts`:

```ts
import { BUS_86 } from '../../data/busSchedule';

describe('BUS_86', () => {
  it('declares pickupPoints for both HAN terminals', () => {
    expect(BUS_86.pickupPoints).toHaveLength(2);
    const ids = BUS_86.pickupPoints.map((p) => p.terminalId).sort();
    expect(ids).toEqual(['HAN-T1', 'HAN-T2']);
  });

  it('uses explicit scheduleSource', () => {
    expect(BUS_86.scheduleSource.kind).toBe('explicit');
    if (BUS_86.scheduleSource.kind === 'explicit') {
      expect(BUS_86.scheduleSource.departures).toContain('06:40');
      expect(BUS_86.scheduleSource.departures).toContain('22:15');
    }
  });

  it('preserves existing ticket price and operating hours', () => {
    expect(BUS_86.ticketPrice).toBe(50000);
    expect(BUS_86.operatingHours).toEqual({ start: '06:40', end: '22:15' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/data/busSchedule.test.ts`
Expected: FAIL (`BUS_86.pickupPoints` is undefined or `scheduleSource` is undefined)

- [ ] **Step 3: Update `core/data/busSchedule.ts`**

Replace the existing file content with:

```ts
import { BusRoute } from '../types';

export const BUS_86_SCHEDULE: string[] = [
  '06:40', '07:20', '08:00', '08:40', '09:15', '09:40', '10:25', '11:00',
  '11:40', '12:20', '12:45', '13:15', '13:50', '14:30', '15:10', '15:40',
  '16:00', '16:45', '17:20', '17:55', '18:40', '19:20', '20:00', '20:45',
  '21:30', '22:15',
];

export const BUS_86: BusRoute = {
  id: 'bus-86',
  routeNumber: '86',
  ticketPrice: 50000,
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 50, max: 55 },
    peak: { min: 65, max: 75 },
  },
  pickupPoints: [
    { terminalId: 'HAN-T1', location: 'Tầng 1 sảnh đến, đối diện cột 12' },
    { terminalId: 'HAN-T2', location: 'Tầng 1 sảnh đến, đối diện cột 14' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: BUS_86_SCHEDULE,
  },
};
```

- [ ] **Step 4: Update `core/data/airport.ts`**

Replace the existing file content with:

```ts
import { Airport, Terminal } from '../types';
import { BUS_86 } from './busSchedule';
import { GRAB_ESTIMATE } from './grabEstimates';

const TERMINALS: Terminal[] = [
  {
    id: 'HAN-T1',
    name: 'Nhà ga T1',
    type: 'domestic',
    flightTypes: ['domestic', 'international'],
  },
  {
    id: 'HAN-T2',
    name: 'Nhà ga T2',
    type: 'international',
    flightTypes: ['international'],
  },
];

export const NOI_BAI_AIRPORT: Airport = {
  id: 'noi-bai',
  name: 'Sân bay Nội Bài',
  terminals: TERMINALS,
  busRoutes: [BUS_86],
  grabEstimates: GRAB_ESTIMATE,
};
```

(SGN airport registration is added in Task 4.)

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest core/tests/data/busSchedule.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Verify existing tests still compile**

Run: `npx jest core/tests/calculation-engine/findNextCatchableTrip.test.ts`
Expected: FAIL — `findNextCatchableTrip` still uses `BUS_86.schedule` (the old field). Fix comes in Task 3.

- [ ] **Step 7: Commit**

```bash
git add core/data/busSchedule.ts core/data/airport.ts core/tests/data/busSchedule.test.ts
git commit -m "feat(core): adapt BUS_86 to new BusRoute shape with pickupPoints"
```

---

## Task 3: Extend `findNextCatchableTrip` for `BusRoute` parameter + frequency branch

**Files:**
- Modify: `core/calculation-engine/findNextCatchableTrip.ts`
- Modify: `core/tests/calculation-engine/findNextCatchableTrip.test.ts`
- Test: additions in same file

**Interfaces:**
- Consumes: `BusRoute` (now has `scheduleSource`)
- Produces: `findNextCatchableTrip(busRoute, arrivalTime, exitTimeMinutes)` — `BusRoute` is now the first parameter

- [ ] **Step 1: Update the existing test to use the new signature**

Add at the top of the file:

```ts
import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';
import { BUS_86 } from '../../data/busSchedule';
```

Replace the entire file content with:

```ts
import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';
import { BUS_86 } from '../../data/busSchedule';
import type { BusRoute } from '../../types';

const makeFrequencyBus = (headway: { peak: number; normal: number }): BusRoute => ({
  id: 'tia',
  routeNumber: 'TIA',
  ticketPrice: 0,
  operatingHours: { start: '04:30', end: '00:30' },
  travelTime: { normal: { min: 15, max: 20 }, peak: { min: 15, max: 20 } },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B' },
    { terminalId: 'SGN-T2', location: 'Làn B' },
    { terminalId: 'SGN-T3', location: 'Cột A' },
  ],
  scheduleSource: { kind: 'frequency', headwayMinutes: headway },
});

describe('findNextCatchableTrip', () => {
  describe('explicit schedule (Bus 86)', () => {
    it('finds next catchable trip for morning arrival', () => {
      const result = findNextCatchableTrip(BUS_86, '08:00', { min: 25, max: 45 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('09:15');
        expect(result.trip.waitMinutes).toBe(25);
        expect(result.trip.ticketPrice).toBe(50000);
      }
    });

    it('finds next catchable trip for afternoon arrival', () => {
      const result = findNextCatchableTrip(BUS_86, '14:00', { min: 15, max: 25 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('14:30');
      }
    });

    it('returns no_service when before first bus departure', () => {
      const result = findNextCatchableTrip(BUS_86, '05:00', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when after operating hours', () => {
      const result = findNextCatchableTrip(BUS_86, '22:30', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('too_late');
    });

    it('finds bus when arriving just before first departure', () => {
      const result = findNextCatchableTrip(BUS_86, '06:35', { min: 10, max: 15 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('07:20');
      }
    });
  });

  describe('frequency schedule (TIA)', () => {
    it('returns next departure within headway', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      const result = findNextCatchableTrip(tia, '14:00', { min: 5, max: 10 });
      // 14:00 + 10 + 5 = 14:15. Headway 20-min, next departure 14:20.
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('14:20');
        expect(result.trip.waitMinutes).toBe(5);
        expect(result.trip.ticketPrice).toBe(0);
      }
    });

    it('returns no_service when readyTime is before operating hours start', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      const result = findNextCatchableTrip(tia, '02:00', { min: 5, max: 10 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when readyTime is after operating hours end', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      // 23:30 + 60 + 5 = 00:35, after 00:30
      const result = findNextCatchableTrip(tia, '23:30', { min: 5, max: 60 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('too_late');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/calculation-engine/findNextCatchableTrip.test.ts`
Expected: FAIL (signature mismatch — `findNextCatchableTrip` does not accept `BUS_86` as first arg)

- [ ] **Step 3: Update `core/calculation-engine/findNextCatchableTrip.ts`**

Replace the file content with:

```ts
import { BusRecommendation, BusRoute, TimeRange } from '../types';
import { isAfterOrEqual, addMinutes, timeToMinutes, minutesToTime, isWithinRange } from '../utils/time';

const WALKING_TO_PICKUP_MINUTES = 5;

export function findNextCatchableTrip(
  busRoute: BusRoute,
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number },
  isPeak = false,
): BusRecommendation {
  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);

  if (isAfterOrEqual(readyTime, busRoute.operatingHours.end)) {
    return { available: false, reason: 'too_late' };
  }

  if (busRoute.scheduleSource.kind === 'frequency') {
    return findNextFrequencyTrip(busRoute, readyTime, isPeak);
  }

  return findNextExplicitTrip(busRoute, readyTime);
}

function findNextExplicitTrip(busRoute: BusRoute, readyTime: string): BusRecommendation {
  const departures = busRoute.scheduleSource.kind === 'explicit'
    ? busRoute.scheduleSource.departures
    : [];

  if (isAfterOrEqual(readyTime, busRoute.operatingHours.start)) {
    const catchable = departures.find((d) => isAfterOrEqual(d, readyTime));
    if (!catchable) {
      return { available: false, reason: 'missed_last' };
    }
    return {
      available: true,
      trip: {
        departureTime: catchable,
        waitMinutes: calculateWaitMinutes(readyTime, catchable),
        ticketPrice: busRoute.ticketPrice,
      },
    };
  }

  return { available: false, reason: 'no_service' };
}

function findNextFrequencyTrip(
  busRoute: BusRoute,
  readyTime: string,
  isPeak: boolean,
): BusRecommendation {
  if (busRoute.scheduleSource.kind !== 'frequency') {
    return { available: false, reason: 'no_service' };
  }

  if (!isWithinRange(readyTime, busRoute.operatingHours.start, busRoute.operatingHours.end)) {
    return isAfterOrEqual(readyTime, busRoute.operatingHours.end)
      ? { available: false, reason: 'too_late' }
      : { available: false, reason: 'no_service' };
  }

  const headway = isPeak
    ? busRoute.scheduleSource.headwayMinutes.peak
    : busRoute.scheduleSource.headwayMinutes.normal;

  const readyMinutes = timeToMinutes(readyTime);
  const startMinutes = timeToMinutes(busRoute.operatingHours.start);
  const targetMinutes = startMinutes + Math.ceil((readyMinutes - startMinutes) / headway) * headway;
  const departureTime = minutesToTime(targetMinutes);

  return {
    available: true,
    trip: {
      departureTime,
      waitMinutes: calculateWaitMinutes(readyTime, departureTime),
      ticketPrice: busRoute.ticketPrice,
    },
  };
}

function calculateWaitMinutes(readyTime: string, departureTime: string): number {
  return timeToMinutes(departureTime) - timeToMinutes(readyTime);
}

// Re-export for backwards compatibility
export type { TimeRange };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest core/tests/calculation-engine/findNextCatchableTrip.test.ts`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add core/calculation-engine/findNextCatchableTrip.ts core/tests/calculation-engine/findNextCatchableTrip.test.ts
git commit -m "feat(core): findNextCatchableTrip accepts BusRoute + frequency branch"
```

---

## Task 4: Add `findCatchableBusForTerminal` and update `calculateArrivalEstimate`

**Files:**
- Create: `core/calculation-engine/findCatchableBusForTerminal.ts`
- Modify: `core/calculation-engine/calculateArrivalEstimate.ts`
- Modify: `core/calculation-engine/index.ts`
- Test: `core/tests/calculation-engine/findCatchableBusForTerminal.test.ts` (NEW)

**Interfaces:**
- Produces: `findCatchableBusForTerminal(buses, terminalId, arrivalTime, exitTime, isPeak)` returning the best `BusRecommendation` matching pickup at the terminal

- [ ] **Step 1: Write failing test**

Create `core/tests/calculation-engine/findCatchableBusForTerminal.test.ts`:

```ts
import { findCatchableBusForTerminal } from '../../calculation-engine/findCatchableBusForTerminal';
import { BUS_86 } from '../../data/busSchedule';
import { BUS_109, BUS_152, TIA } from '../../data/busSchedules/sgn';
import type { BusRoute } from '../../types';

describe('findCatchableBusForTerminal', () => {
  describe('HAN', () => {
    it('returns Bus 86 for HAN-T1', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T1',
        '08:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(50000);
      }
    });

    it('returns Bus 86 for HAN-T2', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T2',
        '08:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result.available).toBe(true);
    });
  });

  describe('SGN', () => {
    it('returns Bus 152 for SGN-T1', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152, TIA],
        'SGN-T1',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(6000);
      }
    });

    it('returns Bus 152 for SGN-T2', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152, TIA],
        'SGN-T2',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(6000);
      }
    });

    it('returns Bus 109 for SGN-T3', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152, TIA],
        'SGN-T3',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(15000);
      }
    });

    it('returns no_service when no bus matches the terminal', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'SGN-T3',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/calculation-engine/findCatchableBusForTerminal.test.ts`
Expected: FAIL (`Cannot find module`)

- [ ] **Step 3: Create `core/calculation-engine/findCatchableBusForTerminal.ts`**

```ts
import { BusRecommendation, BusRoute, TerminalId } from '../types';
import { findNextCatchableTrip } from './findNextCatchableTrip';

export function findCatchableBusForTerminal(
  buses: BusRoute[],
  terminalId: TerminalId,
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number },
  isPeak = false,
): BusRecommendation {
  const matching = buses.filter((b) =>
    b.pickupPoints.some((p) => p.terminalId === terminalId),
  );

  if (matching.length === 0) {
    return { available: false, reason: 'no_service' };
  }

  const candidates = matching
    .map((bus) => findNextCatchableTrip(bus, arrivalTime, exitTimeMinutes, isPeak))
    .filter((r) => r.available && r.trip) as Array<BusRecommendation & { trip: NonNullable<BusRecommendation['trip']> }>;

  if (candidates.length === 0) {
    return { available: false, reason: 'no_service' };
  }

  // Sort by (ticketPrice ascending, waitMinutes ascending) — cheapest first, then nearest
  candidates.sort((a, b) => {
    const priceDiff = a.trip.ticketPrice - b.trip.ticketPrice;
    if (priceDiff !== 0) return priceDiff;
    return a.trip.waitMinutes - b.trip.waitMinutes;
  });

  return candidates[0];
}
```

- [ ] **Step 4: Update `core/calculation-engine/calculateArrivalEstimate.ts`**

Replace the file content with:

```ts
import { BusRoute, TimeRange } from '../types';
import { addMinutes } from '../utils/time';

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  _isPeak: boolean,
): TimeRange {
  return {
    early: addMinutes(departureTime, travelTime.min),
    late: addMinutes(departureTime, travelTime.max),
    minutesRange: travelTime,
  };
}

export function calculateArrivalEstimateForBus(
  bus: BusRoute,
  departureTime: string,
  isPeak: boolean,
): TimeRange {
  return calculateArrivalEstimate(
    departureTime,
    bus.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak,
  );
}
```

- [ ] **Step 5: Update `core/calculation-engine/index.ts`**

Replace the file content with:

```ts
export { calculateExitTime } from './calculateExitTime';
export type { ExitTimeResult } from './calculateExitTime';
export { isPeakHour } from './isPeakHour';
export { findNextCatchableTrip } from './findNextCatchableTrip';
export { findCatchableBusForTerminal } from './findCatchableBusForTerminal';
export { calculateArrivalEstimate, calculateArrivalEstimateForBus } from './calculateArrivalEstimate';
```

- [ ] **Step 6: Run test to verify it still fails (bus schedules missing)**

Run: `npx jest core/tests/calculation-engine/findCatchableBusForTerminal.test.ts`
Expected: FAIL (`Cannot find module '../../data/busSchedules/sgn'` — fixed in Task 5)

- [ ] **Step 7: Commit**

```bash
git add core/calculation-engine/findCatchableBusForTerminal.ts core/calculation-engine/calculateArrivalEstimate.ts core/calculation-engine/index.ts core/tests/calculation-engine/findCatchableBusForTerminal.test.ts
git commit -m "feat(core): findCatchableBusForTerminal + per-bus arrival estimate"
```

---

## Task 5: Add SGN bus routes (Bus 109, Bus 152, TIA)

**Files:**
- Create: `core/data/busSchedules/sgn.ts`
- Test: `core/tests/data/busSchedules/sgn.test.ts` (NEW)

**Interfaces:**
- Produces: `BUS_109`, `BUS_152`, `TIA` `BusRoute` constants

- [ ] **Step 1: Write failing test**

Create `core/tests/data/busSchedules/sgn.test.ts`:

```ts
import { BUS_109, BUS_152, TIA } from '../../../data/busSchedules/sgn';

describe('SGN bus routes', () => {
  describe('BUS_109', () => {
    it('runs only at SGN-T3', () => {
      expect(BUS_109.pickupPoints.map((p) => p.terminalId)).toEqual(['SGN-T3']);
    });

    it('uses explicit schedule', () => {
      expect(BUS_109.scheduleSource.kind).toBe('explicit');
      if (BUS_109.scheduleSource.kind === 'explicit') {
        expect(BUS_109.scheduleSource.departures[0]).toBe('05:30');
        expect(BUS_109.scheduleSource.departures).toContain('22:00');
      }
    });

    it('costs 15,000 VND', () => {
      expect(BUS_109.ticketPrice).toBe(15000);
    });
  });

  describe('BUS_152', () => {
    it('runs at SGN-T1 and SGN-T2', () => {
      const ids = BUS_152.pickupPoints.map((p) => p.terminalId).sort();
      expect(ids).toEqual(['SGN-T1', 'SGN-T2']);
    });

    it('uses explicit schedule', () => {
      expect(BUS_152.scheduleSource.kind).toBe('explicit');
    });

    it('costs 6,000 VND (median of 5,000-7,000)', () => {
      expect(BUS_152.ticketPrice).toBe(6000);
    });
  });

  describe('TIA', () => {
    it('runs at all three SGN terminals', () => {
      const ids = TIA.pickupPoints.map((p) => p.terminalId).sort();
      expect(ids).toEqual(['SGN-T1', 'SGN-T2', 'SGN-T3']);
    });

    it('uses frequency schedule', () => {
      expect(TIA.scheduleSource.kind).toBe('frequency');
      if (TIA.scheduleSource.kind === 'frequency') {
        expect(TIA.scheduleSource.headwayMinutes).toEqual({ peak: 15, normal: 20 });
      }
    });

    it('costs 0 VND (free shuttle)', () => {
      expect(TIA.ticketPrice).toBe(0);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/data/busSchedules/sgn.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Create `core/data/busSchedules/sgn.ts`**

```ts
import { BusRoute } from '../../types';

export const BUS_109: BusRoute = {
  id: 'bus-109',
  routeNumber: '109',
  ticketPrice: 15000,
  operatingHours: { start: '05:30', end: '22:00' },
  travelTime: {
    normal: { min: 30, max: 45 },
    peak: { min: 50, max: 70 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T3', location: 'Ngay tại T3 — cột A17–A20' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: [
      '05:30', '06:10', '06:50', '07:30', '08:10', '08:55', '09:35', '10:20',
      '11:05', '11:45', '12:30', '13:15', '14:00', '14:45', '15:30', '16:15',
      '17:00', '17:45', '18:30', '19:15', '20:00', '20:45', '21:30', '22:00',
    ],
  },
};

export const BUS_152: BusRoute = {
  id: 'bus-152',
  routeNumber: '152',
  ticketPrice: 6000,
  operatingHours: { start: '05:00', end: '19:00' },
  travelTime: {
    normal: { min: 25, max: 35 },
    peak: { min: 40, max: 55 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B ga quốc nội, cột B06–B09' },
    { terminalId: 'SGN-T2', location: 'Làn B gần sảnh đến quốc tế' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: [
      '05:00', '05:18', '05:36', '05:51', '06:06', '06:21', '06:36', '06:51',
      '07:06', '07:21', '07:36', '07:51', '08:06', '08:21', '08:36', '08:51',
      '09:06', '09:21', '09:36', '09:51', '10:06', '10:21', '10:36', '10:51',
      '11:06', '11:21', '11:36', '11:51', '12:06', '12:21', '12:36', '12:51',
      '13:06', '13:21', '13:36', '13:51', '14:06', '14:21', '14:36', '14:51',
      '15:06', '15:21', '15:36', '15:51', '16:06', '16:21', '16:36', '16:51',
      '17:06', '17:21', '17:36', '17:51', '18:06', '18:21', '18:36', '18:51',
      '19:00',
    ],
  },
};

export const TIA: BusRoute = {
  id: 'tia',
  routeNumber: 'TIA',
  ticketPrice: 0,
  operatingHours: { start: '04:30', end: '00:30' },
  travelTime: {
    normal: { min: 15, max: 20 },
    peak: { min: 15, max: 20 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B, cột B17–B20' },
    { terminalId: 'SGN-T2', location: 'Làn B, cột B15–B16' },
    { terminalId: 'SGN-T3', location: 'Cột A17–A20' },
  ],
  scheduleSource: {
    kind: 'frequency',
    headwayMinutes: { peak: 15, normal: 20 },
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest core/tests/data/busSchedules/sgn.test.ts`
Expected: PASS (9 tests)

- [ ] **Step 5: Run the engine test from Task 4**

Run: `npx jest core/tests/calculation-engine/findCatchableBusForTerminal.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add core/data/busSchedules/sgn.ts core/tests/data/busSchedules/sgn.test.ts
git commit -m "feat(core): SGN bus routes — Bus 109, Bus 152, TIA shuttle"
```

---

## Task 6: Add SGN airport, SGN grab estimate, register airports

**Files:**
- Create: `core/data/airports/sgn.ts`
- Create: `core/data/grabEstimates/sgn.ts`
- Modify: `core/data/airport.ts`
- Modify: `core/data/index.ts`
- Test: `core/tests/data/airports.test.ts` (NEW)

**Interfaces:**
- Produces: `SGN_AIRPORT`, `SGN_GRAB_ESTIMATE`, `AIRPORTS`, `AIRPORT_LIST`

- [ ] **Step 1: Write failing test**

Create `core/tests/data/airports.test.ts`:

```ts
import { AIRPORTS, AIRPORT_LIST, NOI_BAI_AIRPORT } from '../../data/airport';
import { SGN_AIRPORT } from '../../data/airports/sgn';

describe('Airports registry', () => {
  it('NOI_BAI_AIRPORT still exported (back-compat)', () => {
    expect(NOI_BAI_AIRPORT.id).toBe('noi-bai');
  });

  it('SGN_AIRPORT has 3 terminals, 3 bus routes', () => {
    expect(SGN_AIRPORT.id).toBe('tan-son-nhat');
    expect(SGN_AIRPORT.terminals).toHaveLength(3);
    expect(SGN_AIRPORT.busRoutes).toHaveLength(3);
  });

  it('AIRPORTS map has both airports', () => {
    expect(AIRPORTS['noi-bai']).toBe(NOI_BAI_AIRPORT);
    expect(AIRPORTS['tan-son-nhat']).toBe(SGN_AIRPORT);
  });

  it('AIRPORT_LIST contains both airports', () => {
    const ids = AIRPORT_LIST.map((a) => a.id).sort();
    expect(ids).toEqual(['noi-bai', 'tan-son-nhat']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/data/airports.test.ts`
Expected: FAIL (modules not found)

- [ ] **Step 3: Create `core/data/grabEstimates/sgn.ts`**

```ts
import { GrabEstimate } from '../../types';

export const SGN_GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 100000, max: 180000 },
  travelTime: {
    normal: { min: 20, max: 35 },
    peak: { min: 35, max: 55 },
  },
};
```

- [ ] **Step 4: Create `core/data/airports/sgn.ts`**

```ts
import { Airport, Terminal } from '../../types';
import { BUS_109, BUS_152, TIA } from '../busSchedules/sgn';
import { SGN_GRAB_ESTIMATE } from '../grabEstimates/sgn';

const TERMINALS: Terminal[] = [
  {
    id: 'SGN-T1',
    name: 'Nhà ga T1 (quốc nội cũ)',
    type: 'domestic',
    flightTypes: ['domestic'],
  },
  {
    id: 'SGN-T2',
    name: 'Nhà ga T2 (quốc tế)',
    type: 'international',
    flightTypes: ['international'],
  },
  {
    id: 'SGN-T3',
    name: 'Nhà ga T3 (mới)',
    type: 'domestic',
    flightTypes: ['domestic', 'international'],
  },
];

export const SGN_AIRPORT: Airport = {
  id: 'tan-son-nhat',
  name: 'Sân bay Tân Sơn Nhất',
  terminals: TERMINALS,
  busRoutes: [BUS_109, BUS_152, TIA],
  grabEstimates: SGN_GRAB_ESTIMATE,
};
```

- [ ] **Step 5: Update `core/data/airport.ts`**

Replace the file content with:

```ts
import { Airport, AirportId } from '../types';
import { BUS_86 } from './busSchedule';
import { GRAB_ESTIMATE } from './grabEstimates';
import { SGN_AIRPORT } from './airports/sgn';

const TERMINALS = [
  {
    id: 'HAN-T1' as const,
    name: 'Nhà ga T1',
    type: 'domestic' as const,
    flightTypes: ['domestic', 'international'] as const,
  },
  {
    id: 'HAN-T2' as const,
    name: 'Nhà ga T2',
    type: 'international' as const,
    flightTypes: ['international'] as const,
  },
];

export const NOI_BAI_AIRPORT: Airport = {
  id: 'noi-bai',
  name: 'Sân bay Nội Bài',
  terminals: TERMINALS,
  busRoutes: [BUS_86],
  grabEstimates: GRAB_ESTIMATE,
};

export const AIRPORTS: Record<AirportId, Airport> = {
  'noi-bai': NOI_BAI_AIRPORT,
  'tan-son-nhat': SGN_AIRPORT,
};

export const AIRPORT_LIST: Airport[] = Object.values(AIRPORTS);
```

- [ ] **Step 6: Update `core/data/index.ts`**

Replace the file content with:

```ts
export { BUS_86_SCHEDULE, BUS_86 } from './busSchedule';
export { BUS_109, BUS_152, TIA } from './busSchedules/sgn';
export { EXIT_TIME_ESTIMATES } from './exitTimeEstimates';
export { GRAB_ESTIMATE } from './grabEstimates';
export { SGN_GRAB_ESTIMATE } from './grabEstimates/sgn';
export { DESTINATIONS, DESTINATIONS_BY_AIRPORT } from './destinations';
export { NOI_BAI_AIRPORT, AIRPORTS, AIRPORT_LIST } from './airport';
export { SGN_AIRPORT } from './airports/sgn';
```

(Note: `DESTINATIONS_BY_AIRPORT` is added in Task 7.)

- [ ] **Step 7: Run test to verify it passes**

Run: `npx jest core/tests/data/airports.test.ts`
Expected: 4 tests pass; `DESTINATIONS_BY_AIRPORT` export may fail (acceptable — fixed in Task 7)

- [ ] **Step 8: Commit**

```bash
git add core/data/airports/sgn.ts core/data/grabEstimates/sgn.ts core/data/airport.ts core/data/index.ts core/tests/data/airports.test.ts
git commit -m "feat(core): SGN airport + grab estimate + AIRPORTS registry"
```

---

## Task 7: Split destinations into HAN + SGN + `DESTINATIONS_BY_AIRPORT` map

**Files:**
- Create: `core/data/destinations/han.ts`
- Create: `core/data/destinations/sgn.ts`
- Modify: `core/data/destinations.ts`
- Test: `core/tests/data/destinations.test.ts` (NEW)

**Interfaces:**
- Produces: `HAN_DESTINATIONS`, `SGN_DESTINATIONS`, `DESTINATIONS_BY_AIRPORT: Record<AirportId, DestinationPoint[]>`

- [ ] **Step 1: Write failing test**

Create `core/tests/data/destinations.test.ts`:

```ts
import { DESTINATIONS, DESTINATIONS_BY_AIRPORT } from '../../data/destinations';
import { HAN_DESTINATIONS } from '../../data/destinations/han';
import { SGN_DESTINATIONS } from '../../data/destinations/sgn';

describe('Destinations', () => {
  it('HAN_DESTINATIONS has 6 entries (5 quận + other)', () => {
    expect(HAN_DESTINATIONS).toHaveLength(6);
  });

  it('SGN_DESTINATIONS has 5 quận', () => {
    expect(SGN_DESTINATIONS).toHaveLength(5);
  });

  it('all SGN destinations have bus coverage', () => {
    expect(SGN_DESTINATIONS.every((d) => d.hasBusCoverage)).toBe(true);
  });

  it('DESTINATIONS_BY_AIRPORT maps both airports', () => {
    expect(DESTINATIONS_BY_AIRPORT['noi-bai']).toBe(HAN_DESTINATIONS);
    expect(DESTINATIONS_BY_AIRPORT['tan-son-nhat']).toBe(SGN_DESTINATIONS);
  });

  it('DESTINATIONS flat list is a union (back-compat)', () => {
    expect(DESTINATIONS).toHaveLength(HAN_DESTINATIONS.length + SGN_DESTINATIONS.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest core/tests/data/destinations.test.ts`
Expected: FAIL

- [ ] **Step 3: Create `core/data/destinations/han.ts`**

```ts
import { DestinationPoint } from '../../types';

export const HAN_DESTINATIONS: DestinationPoint[] = [
  {
    id: 'old-quarter',
    name: 'Khu phố cổ Hà Nội',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
  },
  {
    id: 'hoan-kiem',
    name: 'Quận Hoàn Kiếm',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
  },
  {
    id: 'dong-da',
    name: 'Quận Đống Đa',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 45, max: 50 },
      peak: { min: 60, max: 70 },
    },
  },
  {
    id: 'ba-dinh',
    name: 'Quận Ba Đình',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
  },
  {
    id: 'cau-giay',
    name: 'Quận Cầu Giấy',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 40, max: 45 },
      peak: { min: 55, max: 65 },
    },
  },
  {
    id: 'other',
    name: 'Khu vực khác',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: false,
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
  },
];
```

- [ ] **Step 4: Create `core/data/destinations/sgn.ts`**

```ts
import { DestinationPoint } from '../../types';

export const SGN_DESTINATIONS: DestinationPoint[] = [
  {
    id: 'q1',
    name: 'Quận 1',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 25, max: 35 },
      peak: { min: 40, max: 55 },
    },
  },
  {
    id: 'q3',
    name: 'Quận 3',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 8,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 28, max: 38 },
      peak: { min: 45, max: 60 },
    },
  },
  {
    id: 'q5',
    name: 'Quận 5',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 10,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 30, max: 40 },
      peak: { min: 45, max: 60 },
    },
  },
  {
    id: 'binh-thanh',
    name: 'Bình Thạnh',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 12,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 28, max: 38 },
      peak: { min: 42, max: 55 },
    },
  },
  {
    id: 'phu-nhuan',
    name: 'Phú Nhuận',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 7,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 22, max: 32 },
      peak: { min: 35, max: 50 },
    },
  },
];
```

- [ ] **Step 5: Replace `core/data/destinations.ts`**

```ts
import { AirportId, DestinationPoint } from '../types';
import { HAN_DESTINATIONS } from './destinations/han';
import { SGN_DESTINATIONS } from './destinations/sgn';

export const DESTINATIONS: DestinationPoint[] = [
  ...HAN_DESTINATIONS,
  ...SGN_DESTINATIONS,
];

export const DESTINATIONS_BY_AIRPORT: Record<AirportId, DestinationPoint[]> = {
  'noi-bai': HAN_DESTINATIONS,
  'tan-son-nhat': SGN_DESTINATIONS,
};
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx jest core/tests/data/destinations.test.ts core/tests/data/airports.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add core/data/destinations.ts core/data/destinations/ core/tests/data/destinations.test.ts
git commit -m "feat(core): split destinations by airport — HAN + SGN"
```

---

## Task 8: Update `web/src/hooks/useLandingForm.ts` to require airport

**Files:**
- Modify: `web/src/hooks/useLandingForm.ts`
- Modify: `web/__tests__/hooks/useLandingForm.test.ts`

**Interfaces:**
- Produces: hook with `airport: AirportId | null`, `terminal: TerminalId | null`, `airportOptions`, `terminalOptions`, `destinationOptions` getters

- [ ] **Step 1: Update the test file**

Replace `web/__tests__/hooks/useLandingForm.test.ts` with:

```ts
import { renderHook, act } from '@testing-library/react';
import { useLandingForm } from '../../src/hooks/useLandingForm';

describe('useLandingForm', () => {
  it('starts with empty airport, terminal, destination', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.airport).toBeNull();
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
    expect(result.current.carryOn).toBe(false);
    expect(result.current.checked).toBe(false);
  });

  it('validate() returns false when airport, terminal, or destination is missing', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setAirport('noi-bai'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setTerminal('HAN-T1'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDestination('old-quarter'));
    expect(result.current.validate()).toBe(true);
  });

  it('clamps people to [1..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(15));
    expect(result.current.people).toBe(10);
    act(() => result.current.setPeople(0));
    expect(result.current.people).toBe(1);
  });

  it('terminal options filter by selected airport', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.terminalOptions.map((t) => t.id)).toEqual([
      'SGN-T1',
      'SGN-T2',
      'SGN-T3',
    ]);
  });

  it('destination options filter by selected airport', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.destinationOptions.map((d) => d.id)).toEqual([
      'q1',
      'q3',
      'q5',
      'binh-thanh',
      'phu-nhuan',
    ]);
  });

  it('switching airport clears terminal and destination', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('noi-bai');
      result.current.setTerminal('HAN-T1');
      result.current.setDestination('old-quarter');
    });
    expect(result.current.terminal).toBe('HAN-T1');
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
  });

  it('buildArrivalFormData() returns full shape when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
      result.current.setTerminal('SGN-T1');
      result.current.setDestination('q1');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData).toEqual({
      arrivalTime: '12:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T1',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
  });

  it('buildArrivalFormData() returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('reset() restores initial state', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('noi-bai');
      result.current.setTerminal('HAN-T1');
      result.current.setDestination('old-quarter');
      result.current.setPeople(5);
    });
    act(() => result.current.reset());
    expect(result.current.airport).toBeNull();
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx jest __tests__/hooks/useLandingForm.test.ts`
Expected: FAIL (new fields don't exist yet)

- [ ] **Step 3: Update `web/src/hooks/useLandingForm.ts`**

Replace the file content with:

```ts
import { useCallback, useMemo, useState } from 'react';
import type {
  AirportId,
  ArrivalFormData,
  BaggageType,
  DestinationPoint,
  FlightType,
  Terminal,
  TerminalId,
} from '@core';
import { AIRPORTS, DESTINATIONS_BY_AIRPORT } from '@core';

const DEFAULT_ARRIVAL_TIME = '12:00';
const DEFAULT_BAGGAGE: BaggageType = 'carry_on';
const DEFAULT_FLIGHT_TYPE: FlightType = 'international';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [airport, setAirportRaw] = useState<AirportId | null>(null);
  const [terminal, setTerminalRaw] = useState<TerminalId | null>(null);
  const [destination, setDestinationRaw] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [carryOn, setCarryOnRaw] = useState(false);
  const [checked, setCheckedRaw] = useState(false);

  const setAirport = useCallback((id: AirportId) => {
    setAirportRaw(id);
    setTerminalRaw(null);
    setDestinationRaw(null);
  }, []);

  const setTerminal = useCallback((id: TerminalId) => setTerminalRaw(id), []);
  const setDestination = useCallback((id: string) => setDestinationRaw(id), []);
  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setCarryOn = useCallback((v: boolean) => setCarryOnRaw(v), []);
  const setChecked = useCallback((v: boolean) => setCheckedRaw(v), []);

  const terminalOptions: Terminal[] = useMemo(() => {
    if (!airport) return [];
    return AIRPORTS[airport].terminals;
  }, [airport]);

  const destinationOptions: DestinationPoint[] = useMemo(() => {
    if (!airport) return [];
    return DESTINATIONS_BY_AIRPORT[airport];
  }, [airport]);

  const validate = useCallback(
    () => airport !== null && terminal !== null && destination !== null,
    [airport, terminal, destination],
  );

  const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
    if (!airport || !terminal || !destination) return null;

    const flightType: FlightType = airport === 'noi-bai' && terminal === 'HAN-T1'
      ? 'international'
      : 'domestic';

    return {
      arrivalTime: DEFAULT_ARRIVAL_TIME,
      airportId: airport,
      terminal,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType,
    };
  }, [airport, terminal, destination]);

  const reset = useCallback(() => {
    setAirportRaw(null);
    setTerminalRaw(null);
    setDestinationRaw(null);
    setPeopleRaw(1);
    setCarryOnRaw(false);
    setCheckedRaw(false);
  }, []);

  return {
    airport,
    terminal,
    destination,
    people,
    carryOn,
    checked,
    setAirport,
    setTerminal,
    setDestination,
    setPeople,
    setCarryOn,
    setChecked,
    terminalOptions,
    destinationOptions,
    validate,
    buildArrivalFormData,
    reset,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx jest __tests__/hooks/useLandingForm.test.ts`
Expected: PASS (9 tests)

- [ ] **Step 5: Commit**

```bash
git add web/src/hooks/useLandingForm.ts web/__tests__/hooks/useLandingForm.test.ts
git commit -m "feat(web): useLandingForm requires airport + filtered options"
```

---

## Task 9: Update `web/src/lib/calculation-result.ts` to use `findCatchableBusForTerminal`

**Files:**
- Modify: `web/src/lib/calculation-result.ts`
- Test: `web/__tests__/lib/calculation-result.test.ts` (NEW)

**Interfaces:**
- Produces: `calculateResult(formData)` → `ArrivalResult | null` using `findCatchableBusForTerminal` and per-route travel time

- [ ] **Step 1: Write failing test**

Create `web/__tests__/lib/calculation-result.test.ts`:

```ts
import { calculateResult } from '../../src/lib/calculation-result';

describe('calculateResult', () => {
  it('returns Bus 86 for HAN', () => {
    const result = calculateResult({
      arrivalTime: '08:00',
      airportId: 'noi-bai',
      terminal: 'HAN-T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'international',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(50000);
    }
  });

  it('returns Bus 152 for SGN-T1', () => {
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T1',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(6000);
    }
  });

  it('returns Bus 109 for SGN-T3', () => {
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T3',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(15000);
    }
  });

  it('returns null when formData is incomplete', () => {
    const result = calculateResult({
      arrivalTime: '08:00',
      airportId: 'noi-bai',
      terminal: null,
      baggage: null,
      destination: null,
      flightType: 'international',
    });
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx jest __tests__/lib/calculation-result.test.ts`
Expected: FAIL (uses old `findNextCatchableTrip(BUS_86, ...)` signature)

- [ ] **Step 3: Replace `web/src/lib/calculation-result.ts`**

```ts
import {
  ArrivalResult,
  ArrivalFormData,
  AIRPORTS,
  DESTINATIONS_BY_AIRPORT,
  isPeakHour,
  calculateExitTime,
  findCatchableBusForTerminal,
  calculateArrivalEstimateForBus,
} from '@core';

export function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) {
    return null;
  }

  const airport = AIRPORTS[formData.airportId];
  if (!airport) return null;

  const terminalInfo = airport.terminals.find((t) => t.id === formData.terminal);
  const destinations = DESTINATIONS_BY_AIRPORT[formData.airportId];
  const destination = destinations.find((d) => d.id === formData.destination);

  if (!terminalInfo || !destination) return null;

  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(terminalInfo.type, formData.baggage, formData.flightType);

  const busRecommendation = findCatchableBusForTerminal(
    airport.busRoutes,
    formData.terminal,
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes },
    isPeak,
  );

  if (busRecommendation.available && busRecommendation.trip) {
    const matchedBus = airport.busRoutes.find((b) =>
      b.pickupPoints.some((p) => p.terminalId === formData.terminal),
    );
    if (matchedBus) {
      busRecommendation.trip.arrivalEstimate = calculateArrivalEstimateForBus(
        matchedBus,
        busRecommendation.trip.departureTime,
        isPeak,
      );
    }
  }

  const grabTravelTime = calculateArrivalEstimateForBus(
    airport.busRoutes[0],
    formData.arrivalTime,
    isPeak,
  );
  // Override travel time with grab estimate (bus travelTime is for bus calculation)
  const grabEstimate = airport.grabEstimates;
  grabTravelTime.minutesRange = grabEstimate.travelTime[isPeak ? 'peak' : 'normal'];
  grabTravelTime.early = ((): string => {
    const [h, m] = formData.arrivalTime.split(':').map(Number);
    const totalMin = h * 60 + m + grabEstimate.travelTime[isPeak ? 'peak' : 'normal'].min;
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  })();
  grabTravelTime.late = ((): string => {
    const [h, m] = formData.arrivalTime.split(':').map(Number);
    const totalMin = h * 60 + m + grabEstimate.travelTime[isPeak ? 'peak' : 'normal'].max;
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  })();

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${grabEstimate.priceRange.min.toLocaleString()} - ${grabEstimate.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx jest __tests__/lib/calculation-result.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Type-check**

Run: `cd web && npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 6: Commit**

```bash
git add web/src/lib/calculation-result.ts web/__tests__/lib/calculation-result.test.ts
git commit -m "feat(web): calculateResult uses findCatchableBusForTerminal + airport-aware"
```

---

## Task 10: Build `web/src/components/Landing/AirportPicker.tsx`

**Files:**
- Create: `web/src/components/Landing/AirportPicker.tsx`
- Modify: `web/src/contexts/LanguageContext.tsx` (add `landing.airportPicker.*` keys)
- Test: `web/__tests__/components/Landing/AirportPicker.test.tsx` (NEW)

**Interfaces:**
- Produces: `AirportPicker({ value: AirportId | null, onChange: (id: AirportId) => void })`

- [ ] **Step 1: Write failing test**

Create `web/__tests__/components/Landing/AirportPicker.test.tsx`:

```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AirportPicker } from '../../../src/components/Landing/AirportPicker';
import { LanguageContext } from '../../../src/contexts/LanguageContext';

const mockT = {
  landing: {
    fieldAirport: 'Sân bay khởi hành',
    airportPlaceholder: 'Chọn sân bay',
  },
  airports: {
    'noi-bai': 'Sân bay Nội Bài',
    'tan-son-nhat': 'Sân bay Tân Sơn Nhất',
  },
} as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageContext.Provider value={{ t: mockT, locale: 'vi' }}>
    {children}
  </LanguageContext.Provider>
);

describe('AirportPicker', () => {
  it('renders placeholder when no airport selected', () => {
    render(<AirportPicker value={null} onChange={() => {}} />, { wrapper });
    expect(screen.getByText('Chọn sân bay')).toBeInTheDocument();
  });

  it('opens dropdown and shows both airports', async () => {
    const user = userEvent.setup();
    render(<AirportPicker value={null} onChange={() => {}} />, { wrapper });
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Sân bay Nội Bài')).toBeInTheDocument();
    expect(screen.getByText('Sân bay Tân Sơn Nhất')).toBeInTheDocument();
  });

  it('calls onChange when an airport is selected', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<AirportPicker value={null} onChange={onChange} />, { wrapper });
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Sân bay Tân Sơn Nhất'));
    expect(onChange).toHaveBeenCalledWith('tan-son-nhat');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx jest __tests__/components/Landing/AirportPicker.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Add language keys**

Open `web/src/contexts/LanguageContext.tsx` and locate the `landing` namespace. Add:

```ts
fieldAirport: 'Sân bay khởi hành',
airportPlaceholder: 'Chọn sân bay',
```

Also add a top-level `airports` namespace (or alongside `destinations`):

```ts
airports: {
  'noi-bai': 'Sân bay Nội Bài',
  'tan-son-nhat': 'Sân bay Tân Sơn Nhất',
},
```

(Adapt to the actual structure of `LanguageContext.tsx` — read the file first to confirm the namespace layout.)

- [ ] **Step 4: Create `web/src/components/Landing/AirportPicker.tsx`**

```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AirportId } from '@core';
import { AIRPORT_LIST } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type AirportPickerProps = {
  value: AirportId | null;
  onChange: (id: AirportId) => void;
};

export function AirportPicker({ value, onChange }: AirportPickerProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = value ? AIRPORT_LIST.find((a) => a.id === value) : null;

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldAirport}</label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-semibold">
          {selected ? t.airports[selected.id] : t.landing.airportPlaceholder}
        </span>
        <ChevronDown size={18} className="text-ink-soft" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card"
        >
          {AIRPORT_LIST.map((airport) => {
            const isSelected = value === airport.id;
            return (
              <li
                key={airport.id}
                role="option"
                aria-selected={isSelected}
                className="cursor-pointer px-4 py-3 hover:bg-primary-soft"
                onClick={() => {
                  onChange(airport.id);
                  setOpen(false);
                }}
              >
                {t.airports[airport.id]}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx jest __tests__/components/Landing/AirportPicker.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Landing/AirportPicker.tsx web/src/contexts/LanguageContext.tsx web/__tests__/components/Landing/AirportPicker.test.tsx
git commit -m "feat(web): AirportPicker dropdown — first control in landing form"
```

---

## Task 11: Slot `AirportPicker` into `SearchCard` + update prop shapes

**Files:**
- Modify: `web/src/components/Landing/SearchCard.tsx`
- Modify: `web/src/components/Landing/types.ts` (if exists, or add a new types file)
- Modify: `web/src/components/Landing/LandingPage.tsx` (wire airport picker)
- Modify: `web/__tests__/components/Landing/SearchCard.test.tsx`

**Interfaces:**
- Produces: `SearchCard` now takes `airport`, `terminal` (not `departure`), `terminalOptions`, `destinationOptions`, `onAirportChange`, `onTerminalChange`

- [ ] **Step 1: Read existing test file**

Open `web/__tests__/components/Landing/SearchCard.test.tsx` to understand the current shape.

- [ ] **Step 2: Update SearchCard types**

Create `web/src/components/Landing/types.ts` (if not existing) with:

```ts
import type { AirportId, DestinationPoint, Terminal, TerminalId } from '@core';

export interface SearchCardProps {
  airport: AirportId | null;
  terminal: TerminalId | null;
  destination: string | null;
  people: number;
  carryOn: boolean;
  checked: boolean;
  terminalOptions: Terminal[];
  destinationOptions: DestinationPoint[];
  onAirportChange: (id: AirportId) => void;
  onTerminalChange: (id: TerminalId) => void;
  onDestinationChange: (id: string) => void;
  onPeopleChange: (n: number) => void;
  onCarryOnChange: (v: boolean) => void;
  onCheckedChange: (v: boolean) => void;
  onSubmit: () => void;
}
```

- [ ] **Step 3: Update `web/src/components/Landing/SearchCard.tsx`**

Replace the file content with:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import type { SearchCardProps } from './types';
import { AirportPicker } from './AirportPicker';
import { TerminalPicker } from './TerminalPicker';
import { DestinationChips } from './DestinationChips';
import { Stepper } from './Stepper';
import { CTAButton } from './CTAButton';
import { BaggageChips } from './BaggageChips';

export function SearchCard({
  airport,
  terminal,
  destination,
  people,
  carryOn,
  checked,
  terminalOptions,
  destinationOptions,
  onAirportChange,
  onTerminalChange,
  onDestinationChange,
  onPeopleChange,
  onCarryOnChange,
  onCheckedChange,
  onSubmit,
}: SearchCardProps) {
  const { t } = useLanguage();
  const ready = airport !== null && terminal !== null && destination !== null;
  return (
    <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md">
      <div className="space-y-4">
        <AirportPicker value={airport} onChange={onAirportChange} />
        {airport && (
          <TerminalPicker
            value={terminal}
            options={terminalOptions}
            onChange={onTerminalChange}
          />
        )}
        {airport && (
          <DestinationChips
            value={destination}
            options={destinationOptions}
            onChange={onDestinationChange}
          />
        )}
        <Stepper
          label={t.landing.fieldPeople}
          value={people}
          min={1}
          max={10}
          onChange={onPeopleChange}
        />
        <BaggageChips
          fieldLabel={t.landing.fieldLuggage}
          carryOnLabel={t.landing.fieldCarryOn}
          checkedLabel={t.landing.fieldChecked}
          carryOn={carryOn}
          checked={checked}
          onCarryOnChange={onCarryOnChange}
          onCheckedChange={onCheckedChange}
        />
        <CTAButton disabled={!ready} onClick={onSubmit} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `web/src/components/Landing/TerminalPicker.tsx`**

```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Terminal, TerminalId } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type TerminalPickerProps = {
  value: TerminalId | null;
  options: Terminal[];
  onChange: (id: TerminalId) => void;
};

export function TerminalPicker({ value, options, onChange }: TerminalPickerProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = value ? options.find((opt) => opt.id === value) : null;

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldTerminal}</label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-semibold">
          {selected ? selected.name : t.landing.terminalPlaceholder}
        </span>
        <ChevronDown size={18} className="text-ink-soft" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card"
        >
          {options.map((opt) => {
            const isSelected = value === opt.id;
            return (
              <li
                key={opt.id}
                role="option"
                aria-selected={isSelected}
                className="cursor-pointer px-4 py-3 hover:bg-primary-soft"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Update `web/src/components/Landing/DestinationChips.tsx` to accept `options` prop**

Replace the file content with:

```tsx
import type { DestinationPoint } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type DestinationChipsProps = {
  value: string | null;
  options: DestinationPoint[];
  onChange: (id: string) => void;
};

export function DestinationChips({ value, options, onChange }: DestinationChipsProps) {
  const { t } = useLanguage();
  const filtered = options.filter((destination) => destination.hasBusCoverage && destination.id !== 'other');
  return (
    <div>
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldDestination}</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {filtered.map((destination) => {
          const selected = value === destination.id;
          return (
            <button
              key={destination.id}
              type="button"
              onClick={() => onChange(destination.id)}
              aria-pressed={selected}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selected ? 'bg-primary text-white' : 'border border-surface-border bg-white text-ink-soft hover:border-primary'}`}
            >
              {t.destinations[destination.id] ?? destination.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Update `web/src/components/Landing/LandingPage.tsx`**

Replace the file content with:

```tsx
import type { ArrivalFormData, ArrivalResult } from '@core';
import { useLandingForm } from '../../hooks/useLandingForm';
import { calculateResult } from '../../lib/calculation-result';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';

interface LandingPageProps {
  onSearch: (formData: ArrivalFormData, result: ArrivalResult) => void;
}

export function LandingPage({ onSearch }: LandingPageProps) {
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;

    const calculation = calculateResult(formData);
    if (!calculation) return;

    onSearch(formData, calculation);
  };

  return (
    <Hero>
      <SearchCard
        airport={form.airport}
        terminal={form.terminal}
        destination={form.destination}
        people={form.people}
        carryOn={form.carryOn}
        checked={form.checked}
        terminalOptions={form.terminalOptions}
        destinationOptions={form.destinationOptions}
        onAirportChange={form.setAirport}
        onTerminalChange={form.setTerminal}
        onDestinationChange={form.setDestination}
        onPeopleChange={form.setPeople}
        onCarryOnChange={form.setCarryOn}
        onCheckedChange={form.setChecked}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}
```

- [ ] **Step 7: Update `web/__tests__/components/Landing/SearchCard.test.tsx`**

Update the existing test file to use the new prop shape. Replace the test setup with:

```tsx
import { render, screen } from '@testing-library/react';
import { SearchCard } from '../../../src/components/Landing/SearchCard';
import { LanguageContext } from '../../../src/contexts/LanguageContext';
import { NOI_BAI_AIRPORT, SGN_AIRPORT } from '@core';

const mockT = {
  landing: {
    fieldAirport: 'Sân bay',
    airportPlaceholder: 'Chọn',
    fieldTerminal: 'Nhà ga',
    terminalPlaceholder: 'Chọn',
    fieldDestination: 'Điểm đến',
    fieldPeople: 'Người',
    fieldLuggage: 'Hành lý',
    fieldCarryOn: 'Xách tay',
    fieldChecked: 'Ký gửi',
  },
  destinations: { 'old-quarter': 'Phố cổ', 'q1': 'Q1' },
  airports: { 'noi-bai': 'Nội Bài', 'tan-son-nhat': 'Tân Sơn Nhất' },
} as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageContext.Provider value={{ t: mockT, locale: 'vi' }}>
    {children}
  </LanguageContext.Provider>
);

describe('SearchCard', () => {
  it('renders AirportPicker as first control', () => {
    render(
      <SearchCard
        airport={null}
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={[]}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.getByText('Sân bay')).toBeInTheDocument();
  });

  it('hides TerminalPicker and DestinationChips when no airport selected', () => {
    render(
      <SearchCard
        airport={null}
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={[]}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.queryByText('Nhà ga')).not.toBeInTheDocument();
  });

  it('shows TerminalPicker when airport is selected', () => {
    render(
      <SearchCard
        airport="tan-son-nhat"
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={SGN_AIRPORT.terminals}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.getByText('Nhà ga')).toBeInTheDocument();
  });

  it('CTA is disabled until airport, terminal, and destination all set', () => {
    render(
      <SearchCard
        airport="tan-son-nhat"
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={SGN_AIRPORT.terminals}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    const button = screen.getByRole('button', { name: /tìm/i });
    expect(button).toBeDisabled();
  });
});
```

- [ ] **Step 8: Run tests**

Run: `cd web && npx jest __tests__/components/Landing/`
Expected: PASS

- [ ] **Step 9: Type-check**

Run: `cd web && npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 10: Commit**

```bash
git add web/src/components/Landing/SearchCard.tsx web/src/components/Landing/TerminalPicker.tsx web/src/components/Landing/DestinationChips.tsx web/src/components/Landing/LandingPage.tsx web/src/components/Landing/types.ts web/__tests__/components/Landing/SearchCard.test.tsx
git commit -m "feat(web): SearchCard slots AirportPicker + TerminalPicker + filtered destinations"
```

---

## Task 12: Build `web/src/components/Result/TiaHint.tsx`

**Files:**
- Create: `web/src/components/Result/TiaHint.tsx`
- Test: `web/__tests__/components/Result/TiaHint.test.tsx` (NEW)

**Interfaces:**
- Produces: `TiaHint({ airportId, terminalId, recommendedBusId })` — renders null unless (SGN-T1|T2) AND (busId === 'bus-109')

- [ ] **Step 1: Write failing test**

Create `web/__tests__/components/Result/TiaHint.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { TiaHint } from '../../../src/components/Result/TiaHint';

describe('TiaHint', () => {
  it('renders nothing for HAN', () => {
    const { container } = render(
      <TiaHint airportId="noi-bai" terminalId="HAN-T1" recommendedBusId="bus-86" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for SGN-T3', () => {
    const { container } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T3" recommendedBusId="bus-109" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the TIA hint for SGN-T1 + bus-109', () => {
    render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-109" />,
    );
    expect(screen.getByText(/TIA/i)).toBeInTheDocument();
  });

  it('renders nothing for SGN-T1 + bus-152 (direct bus, no transfer needed)', () => {
    const { container } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-152" />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npx jest __tests__/components/Result/TiaHint.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Create `web/src/components/Result/TiaHint.tsx`**

```tsx
import type { AirportId, TerminalId } from '@core';

interface TiaHintProps {
  airportId: AirportId;
  terminalId: TerminalId | null;
  recommendedBusId: string | null;
}

export function TiaHint({ airportId, terminalId, recommendedBusId }: TiaHintProps) {
  const isSGN = airportId === 'tan-son-nhat';
  const isWrongTerminal = terminalId === 'SGN-T1' || terminalId === 'SGN-T2';
  const isBus109 = recommendedBusId === 'bus-109';

  if (!isSGN || !isWrongTerminal || !isBus109) {
    return null;
  }

  return (
    <div
      role="note"
      className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
    >
      <p className="font-semibold">
        Bạn ở {terminalId}. Tuyến 109 chỉ đón tại SGN-T3.
      </p>
      <p className="mt-1">
        Bạn có thể đi TIA miễn phí (~15–20 phút) tới SGN-T3 rồi bắt tuyến 109,
        hoặc đi tuyến 152 trực tiếp từ Làn B ga {terminalId === 'SGN-T1' ? 'quốc nội' : 'quốc tế'}.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npx jest __tests__/components/Result/TiaHint.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add web/src/components/Result/TiaHint.tsx web/__tests__/components/Result/TiaHint.test.tsx
git commit -m "feat(web): TiaHint component — surfaces 109+T1/T2 transfer advice"
```

---

## Task 13: Wire `TiaHint` into `ResultDisplay` and update tests

**Files:**
- Modify: `web/src/components/ResultDisplay/index.tsx`
- Modify: `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx`

**Interfaces:**
- Produces: `ResultDisplay` renders `TiaHint` when relevant

- [ ] **Step 1: Read existing test**

Open `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` to understand the setup.

- [ ] **Step 2: Update `web/src/components/ResultDisplay/index.tsx`**

Add the import at the top:

```tsx
import { TiaHint } from '../Result/TiaHint';
```

And render `<TiaHint ... />` inside the returned `<article>` below the `<header>`:

```tsx
<TiaHint
  airportId={formData.airportId}
  terminalId={formData.terminal}
  recommendedBusId={result.bus.trip ? getBusIdForAirportAndTerminal(formData.airportId, formData.terminal) : null}
/>
```

Add the helper function at the top of the file (after imports):

```ts
function getBusIdForAirportAndTerminal(airportId: string, terminalId: TerminalId | null): string | null {
  if (airportId === 'tan-son-nhat' && (terminalId === 'SGN-T1' || terminalId === 'SGN-T2')) {
    return 'bus-109';
  }
  return null;
}
```

Also add `TerminalId` to the existing import from `@core`.

- [ ] **Step 3: Update the ResultDisplay test**

Add a test in `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx`:

```tsx
it('renders TiaHint when SGN-T1 + bus-109', () => {
  render(
    <ResultDisplay
      result={mockResultWithBus109}
      formData={mockFormDataSgnT1}
      onBack={() => {}}
      onRecalculate={() => {}}
    />,
    { wrapper },
  );
  expect(screen.getByText(/TIA/i)).toBeInTheDocument();
});
```

Adapt the mock data to match the test scaffold already in the file.

- [ ] **Step 4: Run tests**

Run: `cd web && npx jest __tests__/components/ResultDisplay/`
Expected: PASS

- [ ] **Step 5: Type-check + commit**

```bash
cd web && npx tsc --noEmit
git add web/src/components/ResultDisplay/index.tsx web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx
git commit -m "feat(web): ResultDisplay renders TiaHint when applicable"
```

---

## Task 14: Mirror `useLandingForm` changes on RN

**Files:**
- Modify: `app/hooks/useLandingForm.ts`
- Modify: `app/hooks/useLandingForm.test.ts`

**Interfaces:**
- Same as web Task 8

- [ ] **Step 1: Update `app/hooks/useLandingForm.test.ts`**

Mirror the test file from web Task 8 (Step 1), adjusting import paths to RN style.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest app/hooks/useLandingForm.test.ts`
Expected: FAIL

- [ ] **Step 3: Update `app/hooks/useLandingForm.ts`**

Replace the file content with the same code as `web/src/hooks/useLandingForm.ts` from Task 8.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest app/hooks/useLandingForm.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/hooks/useLandingForm.ts app/hooks/useLandingForm.test.ts
git commit -m "feat(rn): useLandingForm requires airport + filtered options"
```

---

## Task 15: Build RN `AirportPicker`

**Files:**
- Create: `components/Landing/AirportPicker.tsx`
- Test: `components/Landing/__tests__/AirportPicker.test.tsx` (NEW)

**Interfaces:**
- Same as web Task 10, but RN styled

- [ ] **Step 1: Write failing test**

Mirror the web test from Task 10, using `@testing-library/react-native` and `fireEvent`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/Landing/__tests__/AirportPicker.test.tsx`
Expected: FAIL

- [ ] **Step 3: Create `components/Landing/AirportPicker.tsx`**

```tsx
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { AirportId } from '@core';
import { AIRPORT_LIST } from '@core';

interface AirportPickerProps {
  value: AirportId | null;
  onChange: (id: AirportId) => void;
  label: string;
  placeholder: string;
  airportLabels: Record<AirportId, string>;
}

export function AirportPicker({ value, onChange, label, placeholder, airportLabels }: AirportPickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? AIRPORT_LIST.find((a) => a.id === value) : null;

  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">{label}</Text>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        accessibilityRole="button"
        className="mt-2 rounded-xl border border-surface-border bg-white px-4 py-3"
      >
        <Text className="font-semibold">
          {selected ? airportLabels[selected.id] : placeholder}
        </Text>
      </Pressable>
      {open && (
        <View className="mt-1 rounded-xl border border-surface-border bg-white">
          {AIRPORT_LIST.map((airport) => (
            <Pressable
              key={airport.id}
              onPress={() => {
                onChange(airport.id);
                setOpen(false);
              }}
              className="px-4 py-3"
            >
              <Text>{airportLabels[airport.id]}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/Landing/__tests__/AirportPicker.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Landing/AirportPicker.tsx components/Landing/__tests__/AirportPicker.test.tsx
git commit -m "feat(rn): AirportPicker mirror"
```

---

## Task 16: Build RN `TiaHint`

**Files:**
- Create: `components/Result/TiaHint.tsx`
- Test: `components/Result/__tests__/TiaHint.test.tsx` (NEW)

**Interfaces:**
- Same as web Task 12, but RN styled

- [ ] **Step 1: Write failing test**

Mirror web Task 12 test using `@testing-library/react-native`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/Result/__tests__/TiaHint.test.tsx`
Expected: FAIL

- [ ] **Step 3: Create `components/Result/TiaHint.tsx`**

```tsx
import { View, Text } from 'react-native';
import type { AirportId, TerminalId } from '@core';

interface TiaHintProps {
  airportId: AirportId;
  terminalId: TerminalId | null;
  recommendedBusId: string | null;
}

export function TiaHint({ airportId, terminalId, recommendedBusId }: TiaHintProps) {
  const isSGN = airportId === 'tan-son-nhat';
  const isWrongTerminal = terminalId === 'SGN-T1' || terminalId === 'SGN-T2';
  const isBus109 = recommendedBusId === 'bus-109';

  if (!isSGN || !isWrongTerminal || !isBus109) return null;

  return (
    <View
      accessibilityRole="summary"
      className="rounded-xl border border-blue-200 bg-blue-50 p-4"
    >
      <Text className="font-semibold text-blue-900">
        Bạn ở {terminalId}. Tuyến 109 chỉ đón tại SGN-T3.
      </Text>
      <Text className="mt-1 text-sm text-blue-900">
        Bạn có thể đi TIA miễn phí (~15–20 phút) tới SGN-T3 rồi bắt tuyến 109,
        hoặc đi tuyến 152 trực tiếp từ Làn B ga {terminalId === 'SGN-T1' ? 'quốc nội' : 'quốc tế'}.
      </Text>
    </View>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest components/Result/__tests__/TiaHint.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Result/TiaHint.tsx components/Result/__tests__/TiaHint.test.tsx
git commit -m "feat(rn): TiaHint mirror"
```

---

## Task 17: Final integration verification

**Files:** none modified — verification only

- [ ] **Step 1: Run all Jest tests at the root**

Run: `npx jest`
Expected: all tests pass

- [ ] **Step 2: Run web Jest tests**

Run: `cd web && npx jest`
Expected: all tests pass

- [ ] **Step 3: Run root tsc**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Run web tsc**

Run: `cd web && npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 5: Run init.sh**

Run: `bash init.sh`
Expected: 0 errors

- [ ] **Step 6: Final commit if any fixups**

If any cleanup was needed, commit:
```bash
git add -A
git commit -m "chore: final integration cleanup"
```

---

## Self-Review

### Spec coverage
- Task 1: terminal ID scope (§3.1) ✓, AirportId ✓, PickupPoint type ✓, scheduleSource discriminated union ✓
- Task 2-3: BusRoute shape migration (§3.3) ✓, BUS_86 pickupPoints ✓
- Task 3: frequency branch in findNextCatchableTrip ✓
- Task 4: findCatchableBusForTerminal ✓
- Task 5: SGN bus data (Bus 109/152/TIA) ✓
- Task 6: SGN airport registration + grab estimate ✓
- Task 7: SGN destinations + DESTINATIONS_BY_AIRPORT ✓
- Task 8-9: web useLandingForm airport field + calculateResult ✅
- Task 10-11: AirportPicker + SearchCard slot ✓
- Task 12-13: TiaHint ✓
- Task 14-16: RN mirror ✓
- Task 17: verification ✓

### Placeholder scan
- All tasks have explicit code blocks; no "implement later" or "fill in details"
- No "similar to" references — every task is self-contained
- Type names (`AirportId`, `TerminalId`, `PickupPoint`, `ScheduleSource`, `BusRoute`) are consistent across tasks

### Type consistency
- `TerminalId` literal union spelled identically in types/index.ts, all data files, all tests
- `AirportId` literal union spelled identically
- `BusRoute.scheduleSource` discriminated union shape is consistent — `kind: 'explicit'` has `departures`, `kind: 'frequency'` has `headwayMinutes`
- `findCatchableBusForTerminal` signature is consistent across Task 4, 9, 12
- `useLandingForm` hook return shape is consistent across web (Task 8) and RN (Task 14)
- `TiaHint` props consistent across web (Task 12) and RN (Task 16)

### Gaps
- Vehicle comparison providers (6 same): not explicitly changed. The existing `web/__tests__/lib/transport-calculator.test.ts` already pulls providers from `core/data/`. The change is no-op for providers — but the test should still pass. Add a smoke test in Task 9 to verify the providers stay the same.
- The spec's `init.sh` step in Task 13 — at root, `npx tsc --noEmit` has a known pre-existing alias conflict per `07-contract-verify.md`. Document this as expected pass-through, same as that ticket did.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-07-26-sgn-multi-airport.md`. Two execution options:**

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
