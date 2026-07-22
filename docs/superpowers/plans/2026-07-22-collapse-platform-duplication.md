# Collapse Platform Duplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract shared business logic (data, types, calculation engine, time utilities) from both web and RN codebases into a single `core/` directory that both platforms import via TypeScript path alias.

**Architecture:** Web (active) becomes the source of truth for the shared module's data values; RN adopts the shared module and deletes its duplicate code. Consumers always import from the `@core` path alias (a barrel at `core/index.ts`) — never deep imports, never `../../core`-style relative paths. Tests live inside `core/` and run from both projects' Jest configs.

**Tech Stack:** TypeScript, Vite (web), Expo (RN), Jest, ts-jest.

---

## Global Constraints

- **Bus 86 ticket price:** `50000` VND (per `CONTEXT.md` line 92 — current code has stale `35000`).
- **T1 supports international flights:** `Terminal` shape gets `flightTypes: FlightType[]`; the existing `EXIT_TIME_ESTIMATES` table needs T1 international entries (currently only T2 international is listed).
- **Destination `other`:** added to `DESTINATIONS` with `hasBusCoverage: false` so vehicle-comparison flow stays correct.
- **Path alias:** `@core/*` resolves to `core/*` from each project's root. Web's `tsconfig.json` and `jest.config.js` get updated; RN's `tsconfig.json` and `jest` config get updated.
- **Module format:** ESM (matching web's current `"module": "ESNext"`).
- **Consumer naming:** every consumer uses `from '@core'` (the barrel at `core/index.ts`) — never deep imports, never relative paths.
- **No new dependencies.** No package.json scripts renamed — `npm test` in `web/` keeps working.
- **Each task ends with a passing test suite and a clean commit.**

---

## File Structure

Files to create:

| Path | Responsibility |
|------|----------------|
| `core/data/busSchedule.ts` | `BUS_86_SCHEDULE`, `BUS_86` constant (price 50000) |
| `core/data/airport.ts` | `NOI_BAI_AIRPORT` with T1 supporting international |
| `core/data/destinations.ts` | `DESTINATIONS` array including `other` |
| `core/data/exitTimeEstimates.ts` | `EXIT_TIME_ESTIMATES` with T1 international entries |
| `core/data/grabEstimates.ts` | `GRAB_ESTIMATE` constant |
| `core/data/index.ts` | Re-export everything from `data/` |
| `core/utils/time.ts` | Time parse/format/compare helpers |
| `core/calculation-engine/isPeakHour.ts` | Peak-hour detection (07:00-09:00, 17:00-19:00) |
| `core/calculation-engine/calculateExitTime.ts` | Exit-time lookup from `EXIT_TIME_ESTIMATES` |
| `core/calculation-engine/findNextCatchableTrip.ts` | Next-bus finder |
| `core/calculation-engine/calculateArrivalEstimate.ts` | Arrival time range helper |
| `core/calculation-engine/index.ts` | Re-export all engines |
| `core/types/index.ts` | Shared TypeScript types |
| `core/tests/data.test.ts` | Data shape regression tests |
| `core/tests/utils/time.test.ts` | Time utility tests (moved from `tests/time.test.ts`) |
| `core/tests/calculation-engine/isPeakHour.test.ts` | Moved from `tests/calculation-engine/isPeakHour.test.ts` |
| `core/tests/calculation-engine/calculateExitTime.test.ts` | Moved from `tests/calculation-engine/calculateExitTime.test.ts` |
| `core/tests/calculation-engine/findNextCatchableTrip.test.ts` | Moved (price assertion updated to 50000) |
| `core/tests/calculation-engine/calculateArrivalEstimate.test.ts` | Moved from `tests/calculation-engine/calculateArrivalEstimate.test.ts` |
| `core/index.ts` | Top-level barrel re-exporting `data`, `calculation-engine`, `utils`, `types` |

Files to modify:

| Path | Change |
|------|--------|
| `web/tsconfig.json` | Add `@core/*` path alias pointing to `../core/*` |
| `web/jest.config.js` | Add `@core` moduleNameMapper for Jest |
| `web/src/lib/data.ts` | Delete (replaced by `core/data/*`) |
| `web/src/lib/calculation-engine.ts` | Delete (replaced by `core/calculation-engine/*`) |
| `web/src/lib/time.ts` | Delete (replaced by `core/utils/time.ts`) |
| `web/src/types/index.ts` | Delete engine-specific types (move to `core/types`); keep web-only legacy types |
| `web/src/components/**` and `web/src/hooks/**` | Update imports from `'../lib/...'`, `'../../lib/...'`, `'../types'`, `'../../types'` to `'@core'` |
| `web/src/lib/api/**` | Update imports from `'../../types'` to `'@core'` (`api/` folder stays in web) |
| `web/__tests__/lib/transport-calculator.test.ts` | Update imports to `@core`; update price assertion `35000 → 50000` |
| `web/__tests__/lib/vehicle-comparison-data.test.ts` | Update imports to `@core`; update price assertion `35000 → 50000` |
| `tsconfig.json` (root) | Add `@core/*` path alias |
| `package.json` (root, RN jest) | Update `testMatch` to include `core/tests/**/*.test.ts` |
| `data/busSchedule.ts`, `data/airport.ts`, `data/destinations.ts`, `data/exitTimeEstimates.ts`, `data/grabEstimates.ts` | Delete (replaced by `core/data/*`) |
| `types/index.ts` (root) | Delete (replaced by `core/types/index.ts`) |
| `utils/time.ts` (root) | Delete (replaced by `core/utils/time.ts`) |
| `calculation-engine/*.ts` (root) | Delete (replaced by `core/calculation-engine/*`) |
| `tests/time.test.ts`, `tests/calculation-engine/*.test.ts` | Delete after moved |
| `app/**` and `components/**` and `hooks/**` | Update imports from `'../utils/...'`, `'../data/...'`, `'../types'`, `'../calculation-engine'` to `'../../core'` |

---

## Task 1: Create core/types with shared TypeScript types

**Files:**
- Create: `core/types/index.ts`
- Delete: `web/src/types/index.ts` (web-only legacy types move here too — see "Produces")

**Interfaces:**
- Produces: `TerminalType`, `TerminalId`, `BaggageType`, `FlightType`, `Terminal`, `Airport`, `BusRoute`, `DestinationPoint`, `ExitTimeEstimate`, `GrabEstimate`, `TimeRange`, `BusRecommendation`, `ArrivalResult`, `ArrivalFormData`, `ArrivalFormStep`, `TransportType`, `SortOption`, `TransportOption`, `TransportComparison`, `TripCalculationRequest`, `TripCalculationResponse`

- [ ] **Step 1: Create core/types/index.ts**

Write the entire file as follows. This combines RN's `types/index.ts` with the additional vehicle-comparison types from `web/src/types/index.ts`. The `Terminal` shape gets a `flightTypes` array so T1 can host both domestic and international flights.

```typescript
// Shared types for sanbaygo core domain model.
// Both web (src/) and RN (app/) import from here via the `@core` path alias.

export type TerminalType = 'domestic' | 'international';
export type TerminalId = 'T1' | 'T2';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

export interface Airport {
  id: string;
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

export interface BusRoute {
  id: string;
  routeNumber: string;
  schedule: string[];
  ticketPrice: number;
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
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
}

export type ArrivalFormStep = 'time' | 'terminal' | 'baggage' | 'destination';

// Vehicle comparison types
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
  terminalId: 'T1' | 'T2';
  baggageType: 'carry_on' | 'checked';
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

- [ ] **Step 2: Verify the types module compiles**

Run: `cd /Users/trinq/Developer/sanbaygo/core && npx tsc --noEmit -p tsconfig.json`
Expected: exit code 0, no output.

- [ ] **Step 3: Commit**

```bash
git add core/types/index.ts
git commit -m "feat(core): add shared types module"
```

---

## Task 2: Create core/utils/time with shared time utilities

**Files:**
- Create: `core/utils/time.ts`

**Interfaces:**
- Produces: `parseTime`, `formatTime`, `addMinutes`, `timeToMinutes`, `minutesToTime`, `compareTimes`, `isAfterOrEqual`, `isWithinRange`

- [ ] **Step 1: Create core/utils/time.ts**

```typescript
/**
 * Parse HH:mm time string to Date (using today's date as reference)
 */
export function parseTime(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

/**
 * Format Date to HH:mm string
 */
export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Add minutes to HH:mm time string
 */
export function addMinutes(time: string, minutes: number): string {
  const date = parseTime(time);
  date.setMinutes(date.getMinutes() + minutes);
  return formatTime(date);
}

/**
 * Convert HH:mm to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to HH:mm
 */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Compare two HH:mm times: returns negative if a < b, 0 if equal, positive if a > b
 */
export function compareTimes(a: string, b: string): number {
  return timeToMinutes(a) - timeToMinutes(b);
}

/**
 * Check if time a is after or equal to time b
 */
export function isAfterOrEqual(a: string, b: string): boolean {
  return compareTimes(a, b) >= 0;
}

/**
 * Check if time is within a range (inclusive)
 */
export function isWithinRange(time: string, start: string, end: string): boolean {
  const t = timeToMinutes(time);
  return t >= timeToMinutes(start) && t <= timeToMinutes(end);
}

/**
 * Format a range object as "early - late"
 */
export function formatTimeRange(range: { early: string; late: string }): string {
  return `${range.early} - ${range.late}`;
}

/**
 * Format a VND price as a localized string
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}
```

- [ ] **Step 2: Verify the new file compiles**

Create `core/tsconfig.json` (permanent — Tasks 1-4 and Tasks 6-7 all use it):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["./types", "./utils", "./data", "./calculation-engine", "./index.ts"]
}
```

Run: `cd /Users/trinq/Developer/sanbaygo/core && npx tsc --noEmit -p tsconfig.json`
Expected: exit code 0, no output.

- [ ] **Step 3: Commit**

```bash
git add core/utils/time.ts core/tsconfig.json
git commit -m "feat(core): add shared time utilities"
```

---

## Task 3: Create core/data with shared static data

**Files:**
- Create: `core/data/busSchedule.ts`
- Create: `core/data/airport.ts`
- Create: `core/data/destinations.ts`
- Create: `core/data/exitTimeEstimates.ts`
- Create: `core/data/grabEstimates.ts`
- Create: `core/data/index.ts`

**Interfaces:**
- Produces: `BUS_86_SCHEDULE`, `BUS_86` (with `ticketPrice: 50000`), `NOI_BAI_AIRPORT` (with T1 `flightTypes: ['domestic', 'international']`), `DESTINATIONS` (includes `'other'` entry with `hasBusCoverage: false`), `EXIT_TIME_ESTIMATES` (includes T1 international entries), `GRAB_ESTIMATE`

- [ ] **Step 1: Create core/data/busSchedule.ts**

The Bus 86 price is updated from `35000` to `50000` per `CONTEXT.md` line 92.

```typescript
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
  schedule: BUS_86_SCHEDULE,
  ticketPrice: 50000, // VND — per CONTEXT.md
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 50, max: 55 },
    peak: { min: 65, max: 75 },
  },
};
```

- [ ] **Step 2: Create core/data/exitTimeEstimates.ts**

T1 international entries are added (currently missing — only T2 international is in the table).

```typescript
import { ExitTimeEstimate } from '../types';

export const EXIT_TIME_ESTIMATES: ExitTimeEstimate[] = [
  // T1 Domestic
  { terminalType: 'domestic', baggageType: 'carry_on', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', minMinutes: 25, maxMinutes: 45 },
  // T1 International (no immigration; same as domestic)
  { terminalType: 'domestic', baggageType: 'carry_on', flightType: 'international', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', flightType: 'international', minMinutes: 25, maxMinutes: 45 },
  // T2 Domestic (no domestic flights at T2, kept for data completeness)
  { terminalType: 'international', baggageType: 'carry_on', minMinutes: 20, maxMinutes: 35 },
  { terminalType: 'international', baggageType: 'checked', minMinutes: 35, maxMinutes: 60 },
  // T2 International with immigration
  { terminalType: 'international', baggageType: 'carry_on', flightType: 'international', minMinutes: 45, maxMinutes: 75 },
  { terminalType: 'international', baggageType: 'checked', flightType: 'international', minMinutes: 60, maxMinutes: 90 },
];
```

- [ ] **Step 3: Create core/data/grabEstimates.ts**

```typescript
import { GrabEstimate } from '../types';

export const GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 250000, max: 350000 },
  travelTime: {
    normal: { min: 40, max: 60 },
    peak: { min: 60, max: 90 },
  },
};
```

- [ ] **Step 4: Create core/data/destinations.ts**

The `'other'` destination is added with `hasBusCoverage: false`.

```typescript
import { DestinationPoint } from '../types';

export const DESTINATIONS: DestinationPoint[] = [
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

- [ ] **Step 5: Create core/data/airport.ts**

T1's `flightTypes` now includes `'international'` so the lookup logic in `calculateExitTime` can find a T1 international entry.

```typescript
import { Airport, Terminal } from '../types';
import { BUS_86 } from './busSchedule';
import { GRAB_ESTIMATE } from './grabEstimates';

const TERMINALS: Terminal[] = [
  {
    id: 'T1',
    name: 'Nhà ga T1',
    type: 'domestic',
    flightTypes: ['domestic', 'international'],
  },
  {
    id: 'T2',
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

- [ ] **Step 6: Create core/data/index.ts**

```typescript
export { BUS_86_SCHEDULE, BUS_86 } from './busSchedule';
export { EXIT_TIME_ESTIMATES } from './exitTimeEstimates';
export { GRAB_ESTIMATE } from './grabEstimates';
export { DESTINATIONS } from './destinations';
export { NOI_BAI_AIRPORT } from './airport';
```

Note: `ExitTimeEstimate`, `DestinationPoint`, etc. are re-exported by the top-level barrel `core/index.ts` (`export * from './types'`), so consumers that need them go through `@core` rather than this inner module.

- [ ] **Step 7: Verify the data module compiles**

Run: `cd /Users/trinq/Developer/sanbaygo/core && npx tsc --noEmit -p tsconfig.json`
Expected: exit code 0, no output.

- [ ] **Step 8: Commit**

```bash
git add core/data/
git commit -m "feat(core): add shared data module with T1 international and other destination"
```

---

## Task 4: Create core/calculation-engine with pure calculation functions

**Files:**
- Create: `core/calculation-engine/isPeakHour.ts`
- Create: `core/calculation-engine/calculateExitTime.ts`
- Create: `core/calculation-engine/findNextCatchableTrip.ts`
- Create: `core/calculation-engine/calculateArrivalEstimate.ts`
- Create: `core/calculation-engine/index.ts`

**Interfaces:**
- Produces: `isPeakHour`, `calculateExitTime`, `findNextCatchableTrip`, `calculateArrivalEstimate`

- [ ] **Step 1: Create core/calculation-engine/isPeakHour.ts**

```typescript
import { isWithinRange } from '../utils/time';

const PEAK_MORNING_START = '07:00';
const PEAK_MORNING_END = '09:00';
const PEAK_EVENING_START = '17:00';
const PEAK_EVENING_END = '19:00';

export function isPeakHour(time: string): boolean {
  return (
    isWithinRange(time, PEAK_MORNING_START, PEAK_MORNING_END) ||
    isWithinRange(time, PEAK_EVENING_START, PEAK_EVENING_END)
  );
}
```

- [ ] **Step 2: Create core/calculation-engine/calculateExitTime.ts**

```typescript
import { BaggageType, ExitTimeEstimate, FlightType, TerminalType } from '../types';
import { EXIT_TIME_ESTIMATES } from '../data/exitTimeEstimates';

export interface ExitTimeResult {
  minMinutes: number;
  maxMinutes: number;
}

export function calculateExitTime(
  terminal: TerminalType,
  baggage: BaggageType,
  flightType: FlightType = 'domestic'
): ExitTimeResult {
  const isInternational = terminal === 'international' || flightType === 'international';

  const estimate: ExitTimeEstimate | undefined = EXIT_TIME_ESTIMATES.find(
    (e) =>
      e.terminalType === terminal &&
      e.baggageType === baggage &&
      (isInternational ? e.flightType === 'international' : true)
  );

  if (!estimate) {
    return { minMinutes: 30, maxMinutes: 60 };
  }

  return {
    minMinutes: estimate.minMinutes,
    maxMinutes: estimate.maxMinutes,
  };
}
```

- [ ] **Step 3: Create core/calculation-engine/calculateArrivalEstimate.ts**

```typescript
import { TimeRange } from '../types';
import { addMinutes } from '../utils/time';

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  _isPeak: boolean
): TimeRange {
  return {
    early: addMinutes(departureTime, travelTime.min),
    late: addMinutes(departureTime, travelTime.max),
    minutesRange: travelTime,
  };
}
```

- [ ] **Step 4: Create core/calculation-engine/findNextCatchableTrip.ts**

```typescript
import { BusRecommendation } from '../types';
import { BUS_86 } from '../data/busSchedule';
import { addMinutes, isAfterOrEqual, timeToMinutes } from '../utils/time';

const WALKING_TO_PICKUP_MINUTES = 5;

export function findNextCatchableTrip(
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number }
): BusRecommendation {
  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);

  if (isAfterOrEqual(readyTime, BUS_86.operatingHours.end)) {
    return { available: false, reason: 'too_late' };
  }

  if (isAfterOrEqual(readyTime, BUS_86.operatingHours.start)) {
    const catchableTrip = BUS_86.schedule.find((departure) =>
      isAfterOrEqual(departure, readyTime)
    );

    if (!catchableTrip) {
      return { available: false, reason: 'missed_last' };
    }

    return {
      available: true,
      trip: {
        departureTime: catchableTrip,
        waitMinutes: timeToMinutes(catchableTrip) - timeToMinutes(readyTime),
        ticketPrice: BUS_86.ticketPrice,
      },
    };
  }

  return { available: false, reason: 'no_service' };
}
```

- [ ] **Step 5: Create core/calculation-engine/index.ts**

```typescript
export { isPeakHour } from './isPeakHour';
export { calculateExitTime } from './calculateExitTime';
export type { ExitTimeResult } from './calculateExitTime';
export { findNextCatchableTrip } from './findNextCatchableTrip';
export { calculateArrivalEstimate } from './calculateArrivalEstimate';
```

- [ ] **Step 6: Verify the calculation engine compiles**

Run: `cd /Users/trinq/Developer/sanbaygo/core && npx tsc --noEmit -p tsconfig.json`
Expected: exit code 0, no output.

- [ ] **Step 7: Commit**

```bash
git add core/calculation-engine/
git commit -m "feat(core): add shared calculation engine"
```

---

## Task 5: Create core/index.ts barrel and move tests

**Files:**
- Create: `core/index.ts`
- Create: `core/tests/utils/time.test.ts` (moved from `tests/time.test.ts`)
- Create: `core/tests/calculation-engine/isPeakHour.test.ts` (moved from `tests/calculation-engine/isPeakHour.test.ts`)
- Create: `core/tests/calculation-engine/calculateExitTime.test.ts` (moved from `tests/calculation-engine/calculateExitTime.test.ts`)
- Create: `core/tests/calculation-engine/findNextCatchableTrip.test.ts` (moved, updated price)
- Create: `core/tests/calculation-engine/calculateArrivalEstimate.test.ts` (moved from `tests/calculation-engine/calculateArrivalEstimate.test.ts`)
- Create: `core/tests/data.test.ts` (new — verifies Bus 86 = 50000 and `other` destination exists)
- Delete: `tests/time.test.ts`
- Delete: `tests/calculation-engine/*.test.ts`

**Interfaces:**
- Produces: `core/index.ts` barrel that consumers import from; tests living under `core/tests/`

- [ ] **Step 1: Create core/index.ts**

```typescript
// SanBayGo shared core.
// Imported by both web (src/) and RN (app/) via the `@core` path alias.

export * from './types';
export * from './data';
export * from './utils/time';
export * from './calculation-engine';
```

- [ ] **Step 2: Read the existing tests we are moving**

Run these reads so the move step has them in context:
```
Read /Users/trinq/Developer/sanbaygo/tests/time.test.ts
Read /Users/trinq/Developer/sanbaygo/tests/calculation-engine/isPeakHour.test.ts
Read /Users/trinq/Developer/sanbaygo/tests/calculation-engine/calculateExitTime.test.ts
Read /Users/trinq/Developer/sanbaygo/tests/calculation-engine/calculateArrivalEstimate.test.ts
```

- [ ] **Step 3: Move tests to core/tests/**

Read each existing test file from its current location, then create the new file in `core/tests/` with the import path adjusted (e.g. `'../../calculation-engine/isPeakHour'`). Test **bodies stay byte-identical** to the originals.

For `findNextCatchableTrip.test.ts`, the moved file needs one assertion updated in addition to the import line:

```typescript
// In core/tests/calculation-engine/findNextCatchableTrip.test.ts
// Original (tests/calculation-engine/findNextCatchableTrip.test.ts):
//   import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';
//   ...
//   expect(result.trip.ticketPrice).toBe(35000);
// Becomes:
//   import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';
//   ...
//   expect(result.trip.ticketPrice).toBe(50000);
```

(One assertion, line 14 of the original file. All other assertions stay unchanged.)

Final locations and import lines:

| New file | Import line |
|----------|-------------|
| `core/tests/utils/time.test.ts` | `from '../../utils/time'` and `from '../../types'` if needed |
| `core/tests/calculation-engine/isPeakHour.test.ts` | `from '../../calculation-engine/isPeakHour'` |
| `core/tests/calculation-engine/calculateExitTime.test.ts` | `from '../../calculation-engine/calculateExitTime'` |
| `core/tests/calculation-engine/calculateArrivalEstimate.test.ts` | `from '../../calculation-engine/calculateArrivalEstimate'` |
| `core/tests/calculation-engine/findNextCatchableTrip.test.ts` | `from '../../calculation-engine/findNextCatchableTrip'` + price assertion update above |

- [ ] **Step 4: Add core/tests/data.test.ts**

This pins the two intentional data updates (price and `other` destination) so future drift is caught.

```typescript
import { BUS_86, DESTINATIONS, EXIT_TIME_ESTIMATES, NOI_BAI_AIRPORT } from '../data';

describe('Shared data: Bus 86', () => {
  test('ticket price is 50000 VND per CONTEXT.md', () => {
    expect(BUS_86.ticketPrice).toBe(50000);
  });

  test('schedule starts at 06:40 and ends at 22:15', () => {
    expect(BUS_86.schedule[0]).toBe('06:40');
    expect(BUS_86.schedule[BUS_86.schedule.length - 1]).toBe('22:15');
  });
});

describe('Shared data: destinations', () => {
  test('includes the other destination with no bus coverage', () => {
    const other = DESTINATIONS.find((d) => d.id === 'other');
    expect(other).toBeDefined();
    expect(other?.hasBusCoverage).toBe(false);
  });

  test('preserves the five original covered destinations', () => {
    const ids = DESTINATIONS.map((d) => d.id);
    expect(ids).toEqual(
      expect.arrayContaining(['old-quarter', 'hoan-kiem', 'dong-da', 'ba-dinh', 'cau-giay'])
    );
  });
});

describe('Shared data: airport terminals', () => {
  test('T1 supports both domestic and international flights', () => {
    const t1 = NOI_BAI_AIRPORT.terminals.find((t) => t.id === 'T1');
    expect(t1?.flightTypes).toEqual(expect.arrayContaining(['domestic', 'international']));
  });

  test('T2 supports international flights only', () => {
    const t2 = NOI_BAI_AIRPORT.terminals.find((t) => t.id === 'T2');
    expect(t2?.flightTypes).toEqual(['international']);
  });
});

describe('Shared data: exit time estimates', () => {
  test('has a T1 international carry_on entry', () => {
    const entry = EXIT_TIME_ESTIMATES.find(
      (e) => e.terminalType === 'domestic' && e.flightType === 'international' && e.baggageType === 'carry_on'
    );
    expect(entry).toBeDefined();
    expect(entry?.minMinutes).toBeGreaterThan(0);
  });

  test('has a T1 international checked entry', () => {
    const entry = EXIT_TIME_ESTIMATES.find(
      (e) => e.terminalType === 'domestic' && e.flightType === 'international' && e.baggageType === 'checked'
    );
    expect(entry).toBeDefined();
    expect(entry?.minMinutes).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 5: Delete the moved root-level test files**

```bash
rm /Users/trinq/Developer/sanbaygo/tests/time.test.ts
rm /Users/trinq/Developer/sanbaygo/tests/calculation-engine/isPeakHour.test.ts
rm /Users/trinq/Developer/sanbaygo/tests/calculation-engine/calculateExitTime.test.ts
rm /Users/trinq/Developer/sanbaygo/tests/calculation-engine/calculateArrivalEstimate.test.ts
rm /Users/trinq/Developer/sanbaygo/tests/calculation-engine/findNextCatchableTrip.test.ts
```

If the `tests/calculation-engine/` directory is now empty, also:

```bash
rmdir /Users/trinq/Developer/sanbaygo/tests/calculation-engine
```

Do **not** remove `tests/hooks/` — those tests are not in scope for this plan.

- [ ] **Step 6: Commit**

```bash
git add core/index.ts core/tests/ tests/
git commit -m "test(core): move shared tests into core/tests and add data regression tests"
```

---

## Task 6: Wire `@core` path alias in web and run web tests

**Files:**
- Modify: `web/tsconfig.json` (add path alias)
- Modify: `web/jest.config.js` (add moduleNameMapper)
- Modify: `web/__tests__/lib/transport-calculator.test.ts` (use `@core` for types; update price assertion `35000 → 50000`)
- Modify: `web/__tests__/lib/vehicle-comparison-data.test.ts` (verify; usually no edits needed — see Step 6)
- Modify: `web/src/lib/transport-calculator.ts` (import from `@core`)
- Modify: `web/src/lib/transport-data.ts` (import `TransportOption` from `@core`)
- Modify: `web/src/components/**` and `web/src/hooks/**` (only where they import from `../lib/data`, `../lib/calculation-engine`, `../lib/time`, or `../types`)

**Interfaces:**
- Consumes: every export from `@core` (Task 1–5)
- Produces: web's Jest suite runs `core/tests/**` via the shared `@core` alias

- [ ] **Step 1: Discover web files that currently import from the local lib/types**

Run this grep to find every web file that needs its imports rewritten:

```bash
cd /Users/trinq/Developer/sanbaygo/web && rg -l "from '\.\./types'|from '\.\./\.\./types'|from '\.\./lib/data'|from '\.\./\.\./lib/data'|from '\.\./lib/calculation-engine'|from '\.\./\.\./lib/calculation-engine'|from '\.\./lib/time'|from '\.\./\.\./lib/time'" src
```

For each file in the output, follow the same change rule in Step 4 below. **Record the list** — you'll need it.

- [ ] **Step 2: Update web/tsconfig.json**

Add `@core/*` alias. Final `compilerOptions` block:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@core": ["../core/index.ts"],
      "@core/*": ["../core/*"]
    }
  },
  "include": ["src", "../core"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Update web/jest.config.js**

Final config:

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>', '../core'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
    '../core/tests/**/*.test.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core$': '<rootDir>/../core/index.ts',
    '^@core/(.*)$': '<rootDir>/../core/$1',
    '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};
```

- [ ] **Step 4: Rewrite web source imports to use `@core`**

For every file in the list from Step 1, replace:

- `from '../types'` → `from '@core'`
- `from '../../types'` → `from '@core'`
- `from '../lib/data'` → `from '@core'`
- `from '../../lib/data'` → `from '@core'`
- `from '../lib/calculation-engine'` → `from '@core'`
- `from '../../lib/calculation-engine'` → `from '@core'`
- `from '../lib/time'` → `from '@core'`
- `from '../../lib/time'` → `from '@core'`

These are pure string replacements — no other edits in those files.

Also rewrite `web/src/lib/transport-calculator.ts` and `web/src/lib/transport-data.ts` themselves: their existing imports from `'../types'` and `'./data'` and `'./calculation-engine'` become `'@core'`.

- [ ] **Step 5: Delete the now-redundant web files**

After Step 4, delete the files whose contents have been fully migrated:

```bash
rm /Users/trinq/Developer/sanbaygo/web/src/lib/data.ts
rm /Users/trinq/Developer/sanbaygo/web/src/lib/calculation-engine.ts
rm /Users/trinq/Developer/sanbaygo/web/src/lib/time.ts
```

Do **not** delete `web/src/lib/transport-calculator.ts` or `web/src/lib/transport-data.ts` — they stay in web because they import `@core` and contain web-side logic.

- [ ] **Step 6: Update web's two existing tests to use `@core` and the new price**

In `web/__tests__/lib/transport-calculator.test.ts`:

Replace the top-of-file imports:
```typescript
import { sortComparisons, calculateTripComparison } from '../../src/lib/transport-calculator';
import { TransportComparison } from '../../src/types';
```
with:
```typescript
import { sortComparisons, calculateTripComparison } from '../../src/lib/transport-calculator';
import { TransportComparison } from '@core';
```

Then update the two price assertions:
- `price: { estimate: '35,000 VND', value: 35000, isEstimate: false }` → `price: { estimate: '50,000 VND', value: 50000, isEstimate: false }`
- `expect(bus86?.price.value).toBe(35000);` → `expect(bus86?.price.value).toBe(50000);`

In `web/__tests__/lib/vehicle-comparison-data.test.ts`, no changes are required to test body or assertions — that file does not assert a numeric price anywhere. Only the import stays valid:

```typescript
import { calculateTripComparison } from '../../src/lib/transport-calculator';
```

This is already correct (and the local `src/lib/transport-calculator.ts` keeps importing `BUS_86` from `@core`, so the price flows through `BUS_86` at runtime). No edit needed in this file.

- [ ] **Step 7: Run web's full test suite**

Run: `cd /Users/trinq/Developer/sanbaygo/web && npm test 2>&1 | tail -40`
Expected: all suites pass — both the existing web tests and the new `core/tests/` tests. No "module not found" errors.

- [ ] **Step 8: Run web TypeScript check**

Run: `cd /Users/trinq/Developer/sanbaygo/web && npx tsc --noEmit`
Expected: exit code 0.

- [ ] **Step 9: Commit**

```bash
git add web/
git commit -m "feat(web): migrate to @core path alias and update Bus 86 price to 50000"
```

---

## Task 7: Wire `@core` path alias in RN (root) and delete duplicate code

**Files:**
- Modify: `tsconfig.json` (root — add path alias)
- Modify: `package.json` (root — extend jest `testMatch`)
- Modify: `app/**`, `components/**`, `hooks/**` (RN consumer imports → `@core`)
- Delete: `data/busSchedule.ts`, `data/airport.ts`, `data/destinations.ts`, `data/exitTimeEstimates.ts`, `data/grabEstimates.ts`
- Delete: `types/index.ts`
- Delete: `utils/time.ts`
- Delete: `calculation-engine/*.ts`

**Interfaces:**
- Consumes: every export from `@core` (Task 1–5)
- Produces: `npm test` at repo root passes; RN code compiles via `tsc --noEmit` against the new `@core` alias

- [ ] **Step 1: Discover RN files importing the to-be-deleted modules**

```bash
cd /Users/trinq/Developer/sanbaygo && rg -l "from '\.\./data'|from '\.\./\.\./data'|from '\.\./types'|from '\.\./\.\./types'|from '\.\./utils/time'|from '\.\./\.\./utils/time'|from '\.\./calculation-engine'|from '\.\./\.\./calculation-engine'" app components hooks
```

**Record the list** — every file in it gets rewritten in Step 4.

- [ ] **Step 2: Update tsconfig.json (root)**

Final content:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@core": ["./core/index.ts"],
      "@core/*": ["./core/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

- [ ] **Step 3: Update package.json (root) jest config**

Replace the `"jest"` block with:

```json
"jest": {
  "preset": "ts-jest",
  "testMatch": [
    "**/tests/**/*.test.ts",
    "**/core/tests/**/*.test.ts"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "moduleNameMapper": {
    "^@core$": "<rootDir>/core/index.ts",
    "^@core/(.*)$": "<rootDir>/core/$1"
  },
  "passWithNoTests": true
}
```

- [ ] **Step 4: Rewrite RN consumer imports to `@core`**

For every file in the list from Step 1, replace:

- `from '../data'` → `from '@core'`
- `from '../../data'` → `from '@core'`
- `from '../types'` → `from '@core'`
- `from '../../types'` → `from '@core'`
- `from '../utils/time'` → `from '@core'`
- `from '../../utils/time'` → `from '@core'`
- `from '../calculation-engine'` → `from '@core'`
- `from '../../calculation-engine'` → `from '@core'`

These are pure string replacements. (If a file imports a sub-path like `'../data/busSchedule'`, change it to `'@core'` — the barrel re-exports it.)

- [ ] **Step 5: Delete the now-redundant root-level duplicates**

```bash
rm /Users/trinq/Developer/sanbaygo/data/busSchedule.ts
rm /Users/trinq/Developer/sanbaygo/data/airport.ts
rm /Users/trinq/Developer/sanbaygo/data/destinations.ts
rm /Users/trinq/Developer/sanbaygo/data/exitTimeEstimates.ts
rm /Users/trinq/Developer/sanbaygo/data/grabEstimates.ts
rm /Users/trinq/Developer/sanbaygo/types/index.ts
rm /Users/trinq/Developer/sanbaygo/utils/time.ts
rm /Users/trinq/Developer/sanbaygo/calculation-engine/isPeakHour.ts
rm /Users/trinq/Developer/sanbaygo/calculation-engine/calculateExitTime.ts
rm /Users/trinq/Developer/sanbaygo/calculation-engine/findNextCatchableTrip.ts
rm /Users/trinq/Developer/sanbaygo/calculation-engine/calculateArrivalEstimate.ts
rm /Users/trinq/Developer/sanbaygo/calculation-engine/index.ts
```

Then remove the now-empty parent directories:

```bash
rmdir /Users/trinq/Developer/sanbaygo/data
rmdir /Users/trinq/Developer/sanbaygo/types
rmdir /Users/trinq/Developer/sanbaygo/utils
rmdir /Users/trinq/Developer/sanbaygo/calculation-engine
```

`rmdir` will refuse if a directory is not empty — investigate any leftovers before deleting.

- [ ] **Step 6: Run RN test suite**

Run: `cd /Users/trinq/Developer/sanbaygo && npm test 2>&1 | tail -40`
Expected: `core/tests/` suites pass; `tests/hooks/useArrivalWizard.test.ts` continues to pass. No "module not found" errors.

- [ ] **Step 7: Run RN TypeScript check**

Run: `cd /Users/trinq/Developer/sanbaygo && npx tsc --noEmit`
Expected: exit code 0.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat(rn): migrate to @core path alias and delete duplicate data/types/calc code"
```

---

## Task 8: Final verification

**Files:**
- Read-only verification — no file changes.

- [ ] **Step 1: Confirm no leftover duplicate modules**

```bash
cd /Users/trinq/Developer/sanbaygo && ls data types utils calculation-engine 2>&1
```

Expected: each `ls` reports "No such file or directory".

- [ ] **Step 2: Confirm no consumer still imports the old paths**

```bash
cd /Users/trinq/Developer/sanbaygo && rg "from '\.\./data/|from '\.\./\.\./data/|from '\.\./types'|from '\.\./\.\./types'|from '\.\./utils/time'|from '\.\./\.\./utils/time'|from '\.\./calculation-engine'|from '\.\./\.\./calculation-engine'" app components hooks web/src 2>&1 | head -20
```

Expected: no matches. (Imports should now read `from '@core'` only.)

- [ ] **Step 3: Run the full test suite from both projects**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test 2>&1 | tail -20
cd /Users/trinq/Developer/sanbaygo && npm test 2>&1 | tail -20
```

Expected: both pass with zero failures. The full `core/tests/` suite runs from each project's jest config.

- [ ] **Step 4: Run TypeScript checks in both projects**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npx tsc --noEmit
cd /Users/trinq/Developer/sanbaygo && npx tsc --noEmit
```

Expected: both exit 0.

- [ ] **Step 5: Confirm git tree is clean (no uncommitted edits)**

Run: `cd /Users/trinq/Developer/sanbaygo && git status`
Expected: `nothing to commit, working tree clean`.

- [ ] **Step 6: Confirm the diff is reviewable**

Run: `git log --oneline --no-decorate main..HEAD 2>/dev/null || git log --oneline -8`
Expected: 7 new commits corresponding to Tasks 1–7 (Task 8 is verification-only).

---

## Self-Review Checklist

- **Spec coverage:** Each of the 8 decisions from the discussion has a task — Bus 86 = 50k (Tasks 3, 5, 6), T1 international (Tasks 1, 3, 5), `other` destination (Tasks 3, 5), folder structure (Tasks 1–5), path alias (Tasks 6, 7), barrel imports (Task 5 + import rewrite in Tasks 6, 7), tests inside `core/` (Task 5), web-first order (Task 6 runs before Task 7).
- **No placeholders:** Every code block is the actual code to write. No "TBD", no "similar to Task N", no "fill in details".
- **Type consistency:** `Terminal.flightTypes: FlightType[]` (Task 1) is consumed by `airport.ts` (Task 3) and read by `calculateExitTime` (Task 4). `BUS_86.ticketPrice: 50000` (Task 3) is asserted in `core/tests/data.test.ts` and `core/tests/calculation-engine/findNextCatchableTrip.test.ts` (Task 5) and `web/__tests__/lib/transport-calculator.test.ts` (Task 6). The `ExitTimeEstimate.flightType` field is unchanged from current code.
- **Single source of truth:** After Task 7, only `core/` contains shared business code. Web keeps only `transport-calculator.ts` and `transport-data.ts` (intentional — they encode web-side comparison/sort logic, not shared domain).
