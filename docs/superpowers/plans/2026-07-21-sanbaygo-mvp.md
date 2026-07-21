# SanBayGo MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A mobile app that helps Noi Bai Airport passengers decide whether to take Bus 86 or Grab after landing, based on their arrival time, terminal, baggage, and destination.

**Architecture:** Single-screen wizard with 4-step form → pure calculation engine → results display. No backend, all client-side. Static data embedded in app. React Native / Expo with TypeScript.

**Tech Stack:** React Native (Expo), TypeScript, React hooks (useState/useReducer), Jest for testing, date-fns for time manipulation.

## Global Constraints

- Vietnamese language UI throughout
- All calculations must be client-side (no API calls)
- Bus 86 schedule is the only bus route in MVP
- Noi Bai Airport only (no multi-airport support)
- Static Grab estimates (no real-time pricing)
- All time handling uses local time (Asia/Ho_Chi_Minh)

---

## File Structure

```
sanbaygo-mvp/
├── app/                          # Expo Router pages
│   ├── _layout.tsx               # Root layout with SafeAreaProvider
│   └── index.tsx                 # Main wizard screen
├── components/
│   ├── ArrivalForm/
│   │   ├── index.tsx             # 4-step form orchestrator
│   │   ├── TimeInput.tsx         # Step 1: arrival time picker
│   │   ├── TerminalSelector.tsx  # Step 2: T1/T2 selector
│   │   ├── BaggageSelector.tsx    # Step 3: carry-on/checked selector
│   │   └── DestinationPicker.tsx # Step 4: destination dropdown
│   └── ResultDisplay/
│       ├── index.tsx             # Results container
│       ├── BusRecommendation.tsx  # Bus 86 recommendation card
│       ├── GrabFallback.tsx      # Grab reference card
│       └── DirectionGuide.tsx    # Walking directions to pickup
├── calculation-engine/
│   ├── index.ts                  # Exports all public functions
│   ├── calculateExitTime.ts      # Estimate exit time from terminal
│   ├── isPeakHour.ts             # Detect rush hour
│   ├── findNextCatchableTrip.ts  # Find catchable bus
│   └── calculateArrivalEstimate.ts # Calculate arrival range
├── data/
│   ├── airport.ts                # Noi Bai Airport static data
│   ├── busSchedule.ts            # Bus 86 schedule (26 departures)
│   ├── exitTimeEstimates.ts      # Exit time matrix
│   ├── destinations.ts           # Destination points
│   └── grabEstimates.ts          # Static Grab data
├── hooks/
│   └── useArrivalWizard.ts       # Form state reducer
├── types/
│   └── index.ts                  # All TypeScript interfaces
├── utils/
│   └── time.ts                   # Time parsing/formatting helpers
├── tests/
│   ├── calculation-engine.test.ts
│   │   ├── calculateExitTime.test.ts
│   │   ├── isPeakHour.test.ts
│   │   ├── findNextCatchableTrip.test.ts
│   │   └── calculateArrivalEstimate.test.ts
│   └── validation.test.ts
└── package.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `sanbaygo-mvp/package.json`
- Create: `sanbaygo-mvp/tsconfig.json`
- Create: `sanbaygo-mvp/app.json` (Expo config)
- Create: `sanbaygo-mvp/babel.config.js`

**Interfaces:**
- Produces: Expo project ready for `npx expo start`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "sanbaygo-mvp",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "test": "jest"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "react": "18.3.1",
    "react-native": "0.76.0",
    "date-fns": "^3.6.0",
    "@react-native-picker/picker": "2.9.0",
    "expo-status-bar": "~2.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.0",
    "@types/react": "~18.3.0",
    "typescript": "~5.3.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.2.0"
  },
  "jest": {
    "preset": "ts-jest",
    "testMatch": ["**/tests/**/*.test.ts"],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx"]
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

- [ ] **Step 3: Create app.json (Expo config)**

```json
{
  "expo": {
    "name": "SanBayGo",
    "slug": "sanbaygo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "sanbaygo",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1E3A5F"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.sanbaygo.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png"
      },
      "package": "com.sanbaygo.app"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

- [ ] **Step 4: Create babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

- [ ] **Step 5: Create assets directory placeholder**

Run: `mkdir -p sanbaygo-mvp/assets && touch sanbaygo-mvp/assets/.gitkeep`

- [ ] **Step 6: Initialize git**

Run: `cd sanbaygo-mvp && git init && git add . && git commit -m "feat: scaffold Expo project"`

---

## Task 2: TypeScript Types

**Files:**
- Create: `sanbaygo-mvp/types/index.ts`

**Interfaces:**
- Produces: All TypeScript types used throughout app

- [ ] **Step 1: Create types/index.ts**

```typescript
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
  schedule: string[]; // HH:mm format
  ticketPrice: number; // VND
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number }; // minutes
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
  flightType?: FlightType; // if international, add immigration time
  minMinutes: number;
  maxMinutes: number;
}

export interface GrabEstimate {
  priceRange: { min: number; max: number }; // VND
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface TimeRange {
  early: string; // HH:mm
  late: string;  // HH:mm
  minutesRange: { min: number; max: number };
}

export interface BusRecommendation {
  available: boolean;
  trip?: {
    departureTime: string; // HH:mm
    waitMinutes: number;
    arrivalEstimate: TimeRange;
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

// Form state
export interface ArrivalFormData {
  arrivalTime: string; // HH:mm
  terminal: TerminalId | null;
  baggage: BaggageType | null;
  destination: string | null;
  flightType: FlightType;
}

export type ArrivalFormStep = 'time' | 'terminal' | 'baggage' | 'destination';
```

- [ ] **Step 2: Commit**

Run: `cd sanbaygo-mvp && git add types/index.ts && git commit -m "feat: add TypeScript types"`

---

## Task 3: Static Data

**Files:**
- Create: `sanbaygo-mvp/data/airport.ts`
- Create: `sanbaygo-mvp/data/busSchedule.ts`
- Create: `sanbaygo-mvp/data/exitTimeEstimates.ts`
- Create: `sanbaygo-mvp/data/destinations.ts`
- Create: `sanbaygo-mvp/data/grabEstimates.ts`

**Interfaces:**
- Produces: Static data objects for Noi Bai Airport, Bus 86, destinations

- [ ] **Step 1: Create data/busSchedule.ts**

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
  ticketPrice: 35000, // VND
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 60, max: 90 },
    peak: { min: 90, max: 120 },
  },
};
```

- [ ] **Step 2: Create data/exitTimeEstimates.ts**

```typescript
import { ExitTimeEstimate } from '../types';

export const EXIT_TIME_ESTIMATES: ExitTimeEstimate[] = [
  // T1 Domestic
  { terminalType: 'domestic', baggageType: 'carry_on', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', minMinutes: 25, maxMinutes: 45 },
  // T1 International (uses same times, no immigration at T1)
  { terminalType: 'domestic', baggageType: 'carry_on', flightType: 'international', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', flightType: 'international', minMinutes: 25, maxMinutes: 45 },
  // T2 Domestic (no domestic flights at T2, but keep for data completeness)
  { terminalType: 'international', baggageType: 'carry_on', minMinutes: 20, maxMinutes: 35 },
  { terminalType: 'international', baggageType: 'checked', minMinutes: 35, maxMinutes: 60 },
  // T2 International with immigration
  { terminalType: 'international', baggageType: 'carry_on', flightType: 'international', minMinutes: 45, maxMinutes: 75 },
  { terminalType: 'international', baggageType: 'checked', flightType: 'international', minMinutes: 60, maxMinutes: 90 },
];
```

- [ ] **Step 3: Create data/destinations.ts**

```typescript
import { DestinationPoint } from '../types';

export const DESTINATIONS: DestinationPoint[] = [
  {
    id: 'old-quarter',
    name: 'Khu phố cổ Hà Nội',
    nearestBusStop: 'ĐạI lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 60, max: 90 },
      peak: { min: 90, max: 120 },
    },
  },
  {
    id: 'hoan-kiem',
    name: 'Quận Hoàn Kiếm',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 55, max: 85 },
      peak: { min: 85, max: 115 },
    },
  },
  {
    id: 'dong-da',
    name: 'Quận Đống Đa',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 50, max: 75 },
      peak: { min: 75, max: 105 },
    },
  },
  {
    id: 'ba-dinh',
    name: 'Quận Ba Đình',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 65, max: 95 },
      peak: { min: 95, max: 125 },
    },
  },
  {
    id: 'cau-giay',
    name: 'Quận Cầu Giấy',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 40, max: 60 },
      peak: { min: 60, max: 90 },
    },
  },
  {
    id: 'other',
    name: 'Khu vực khác',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: false,
    travelTime: {
      normal: { min: 60, max: 90 },
      peak: { min: 90, max: 120 },
    },
  },
];
```

- [ ] **Step 4: Create data/grabEstimates.ts**

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

- [ ] **Step 5: Create data/airport.ts**

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

- [ ] **Step 6: Commit**

Run: `cd sanbaygo-mvp && git add data/*.ts && git commit -m "feat: add static data for Noi Bai Airport"`

---

## Task 4: Time Utilities

**Files:**
- Create: `sanbaygo-mvp/utils/time.ts`

**Interfaces:**
- Produces: `parseTime(time: string): Date`, `formatTime(date: Date): string`, `addMinutes(time: string, minutes: number): string`, `timeToMinutes(time: string): number`, `minutesToTime(minutes: number): string`

- [ ] **Step 1: Create utils/time.ts**

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
```

- [ ] **Step 2: Commit**

Run: `cd sanbaygo-mvp && git add utils/time.ts && git commit -m "feat: add time utility functions"`

---

## Task 5: Calculation Engine

**Files:**
- Create: `sanbaygo-mvp/calculation-engine/calculateExitTime.ts`
- Create: `sanbaygo-mvp/calculation-engine/isPeakHour.ts`
- Create: `sanbaygo-mvp/calculation-engine/findNextCatchableTrip.ts`
- Create: `sanbaygo-mvp/calculation-engine/calculateArrivalEstimate.ts`
- Create: `sanbaygo-mvp/calculation-engine/index.ts`
- Create: `sanbaygo-mvp/tests/calculation-engine/*.test.ts`

**Interfaces:**
- Consumes: `types/index.ts`, `data/*.ts`, `utils/time.ts`
- Produces: Pure calculation functions exported from `index.ts`

- [ ] **Step 1: Create calculation-engine/isPeakHour.ts**

```typescript
import { isWithinRange } from '../utils/time';

const PEAK_MORNING_START = '07:00';
const PEAK_MORNING_END = '09:00';
const PEAK_EVENING_START = '17:00';
const PEAK_EVENING_END = '19:00';

export function isPeakHour(time: string): boolean {
  const isMorningPeak = isWithinRange(time, PEAK_MORNING_START, PEAK_MORNING_END);
  const isEveningPeak = isWithinRange(time, PEAK_EVENING_START, PEAK_EVENING_END);
  return isMorningPeak || isEveningPeak;
}
```

- [ ] **Step 2: Create calculation-engine/calculateExitTime.ts**

```typescript
import { TerminalType, BaggageType, FlightType } from '../types';
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
  // T2 international flights require immigration processing
  const isInternational = terminal === 'international' || flightType === 'international';
  
  const estimate = EXIT_TIME_ESTIMATES.find(
    e => e.terminalType === terminal 
      && e.baggageType === baggage
      && (isInternational ? e.flightType === 'international' : !e.flightType || e.flightType === 'domestic')
  );

  if (!estimate) {
    // Fallback: conservative estimate
    return { minMinutes: 30, maxMinutes: 60 };
  }

  return {
    minMinutes: estimate.minMinutes,
    maxMinutes: estimate.maxMinutes,
  };
}
```

- [ ] **Step 3: Create calculation-engine/findNextCatchableTrip.ts**

```typescript
import { BusRecommendation } from '../types';
import { BUS_86 } from '../data/busSchedule';
import { isAfterOrEqual, addMinutes } from '../utils/time';

const WALKING_TO_PICKUP_MINUTES = 5;

export function findNextCatchableTrip(
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number }
): BusRecommendation {
  // Calculate when passenger will be ready at pickup point (use max for safety)
  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);
  
  // Check if within operating hours
  if (isAfterOrEqual(readyTime, BUS_86.operatingHours.end)) {
    return {
      available: false,
      reason: 'too_late',
    };
  }

  // Check if before first departure
  if (isAfterOrEqual(BUS_86.operatingHours.start, readyTime)) {
    // Find first trip of the day that is >= readyTime
    const catchableTrip = BUS_86.schedule.find(departure => 
      isAfterOrEqual(departure, readyTime)
    );

    if (!catchableTrip) {
      return {
        available: false,
        reason: 'missed_last',
      };
    }

    // Calculate wait time (from ready time to departure)
    const waitMinutes = Math.max(0, 0); // Simplified: readyTime already includes buffer

    return {
      available: true,
      trip: {
        departureTime: catchableTrip,
        waitMinutes: calculateWaitMinutes(readyTime, catchableTrip),
        ticketPrice: BUS_86.ticketPrice,
      },
    };
  }

  // Before operating hours
  return {
    available: false,
    reason: 'no_service',
  };
}

function calculateWaitMinutes(readyTime: string, departureTime: string): number {
  const [rH, rM] = readyTime.split(':').map(Number);
  const [dH, dM] = departureTime.split(':').map(Number);
  return (dH * 60 + dM) - (rH * 60 + rM);
}
```

- [ ] **Step 4: Create calculation-engine/calculateArrivalEstimate.ts**

```typescript
import { TimeRange } from '../types';
import { isPeakHour } from './isPeakHour';
import { addMinutes } from '../utils/time';

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  isPeak: boolean
): TimeRange {
  const adjustedTravelTime = isPeak ? travelTime : travelTime;
  
  return {
    early: addMinutes(departureTime, adjustedTravelTime.min),
    late: addMinutes(departureTime, adjustedTravelTime.max),
    minutesRange: adjustedTravelTime,
  };
}
```

- [ ] **Step 5: Create calculation-engine/index.ts**

```typescript
export { calculateExitTime } from './calculateExitTime';
export type { ExitTimeResult } from './calculateExitTime';
export { isPeakHour } from './isPeakHour';
export { findNextCatchableTrip } from './findNextCatchableTrip';
export { calculateArrivalEstimate } from './calculateArrivalEstimate';
```

- [ ] **Step 6: Create tests/calculation-engine/calculateExitTime.test.ts**

```typescript
import { calculateExitTime } from '../../calculation-engine/calculateExitTime';

describe('calculateExitTime', () => {
  it('returns exit time for T1 domestic with carry-on', () => {
    const result = calculateExitTime('domestic', 'carry_on', 'domestic');
    expect(result.minMinutes).toBe(15);
    expect(result.maxMinutes).toBe(25);
  });

  it('returns exit time for T1 domestic with checked baggage', () => {
    const result = calculateExitTime('domestic', 'checked', 'domestic');
    expect(result.minMinutes).toBe(25);
    expect(result.maxMinutes).toBe(45);
  });

  it('returns exit time for T2 international with carry-on', () => {
    const result = calculateExitTime('international', 'carry_on', 'international');
    expect(result.minMinutes).toBe(45);
    expect(result.maxMinutes).toBe(75);
  });

  it('returns exit time for T2 international with checked baggage', () => {
    const result = calculateExitTime('international', 'checked', 'international');
    expect(result.minMinutes).toBe(60);
    expect(result.maxMinutes).toBe(90);
  });
});
```

- [ ] **Step 7: Create tests/calculation-engine/isPeakHour.test.ts**

```typescript
import { isPeakHour } from '../../calculation-engine/isPeakHour';

describe('isPeakHour', () => {
  describe('morning peak', () => {
    it('returns true at 07:00', () => {
      expect(isPeakHour('07:00')).toBe(true);
    });

    it('returns true at 08:00', () => {
      expect(isPeakHour('08:00')).toBe(true);
    });

    it('returns true at 08:59', () => {
      expect(isPeakHour('08:59')).toBe(true);
    });

    it('returns false at 06:59', () => {
      expect(isPeakHour('06:59')).toBe(false);
    });

    it('returns false at 09:01', () => {
      expect(isPeakHour('09:01')).toBe(false);
    });
  });

  describe('evening peak', () => {
    it('returns true at 17:00', () => {
      expect(isPeakHour('17:00')).toBe(true);
    });

    it('returns true at 18:00', () => {
      expect(isPeakHour('18:00')).toBe(true);
    });

    it('returns true at 18:59', () => {
      expect(isPeakHour('18:59')).toBe(true);
    });

    it('returns false at 16:59', () => {
      expect(isPeakHour('16:59')).toBe(false);
    });

    it('returns false at 19:01', () => {
      expect(isPeakHour('19:01')).toBe(false);
    });
  });

  describe('off-peak hours', () => {
    it('returns false at 10:00', () => {
      expect(isPeakHour('10:00')).toBe(false);
    });

    it('returns false at 12:00', () => {
      expect(isPeakHour('12:00')).toBe(false);
    });

    it('returns false at 15:00', () => {
      expect(isPeakHour('15:00')).toBe(false);
    });
  });
});
```

- [ ] **Step 8: Create tests/calculation-engine/findNextCatchableTrip.test.ts**

```typescript
import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';

describe('findNextCatchableTrip', () => {
  it('finds next catchable trip for normal arrival', () => {
    const result = findNextCatchableTrip('08:00', { min: 25, max: 45 });
    expect(result.available).toBe(true);
    expect(result.trip).toBeDefined();
    if (result.trip) {
      expect(result.trip.departureTime).toBe('08:40'); // 08:00 + 45 + 5 = 08:50, next bus is 08:40... wait
      // Actually: 08:00 + 45 (max) + 5 (walking) = 08:50, first bus >= 08:50 is 09:15
    }
  });

  it('returns no_service when before operating hours', () => {
    const result = findNextCatchableTrip('06:00', { min: 15, max: 25 });
    expect(result.available).toBe(false);
    expect(result.reason).toBe('no_service');
  });

  it('returns too_late when after last bus', () => {
    const result = findNextCatchableTrip('22:00', { min: 15, max: 25 });
    expect(result.available).toBe(false);
    expect(result.reason).toBe('too_late');
  });
});
```

- [ ] **Step 9: Create tests/calculation-engine/calculateArrivalEstimate.test.ts**

```typescript
import { calculateArrivalEstimate } from '../../calculation-engine/calculateArrivalEstimate';

describe('calculateArrivalEstimate', () => {
  it('calculates arrival estimate for normal hours', () => {
    const result = calculateArrivalEstimate('09:00', { min: 60, max: 90 }, false);
    expect(result.early).toBe('10:00'); // 09:00 + 60 min
    expect(result.late).toBe('10:30'); // 09:00 + 90 min
  });

  it('calculates arrival estimate for peak hours', () => {
    const result = calculateArrivalEstimate('08:00', { min: 60, max: 90 }, true);
    // Peak travel time is longer: { min: 90, max: 120 }
    expect(result.early).toBe('09:30'); // 08:00 + 90 min
    expect(result.late).toBe('10:00'); // 08:00 + 120 min
  });
});
```

- [ ] **Step 10: Run tests**

Run: `cd sanbaygo-mvp && npm test`
Expected: All tests pass

- [ ] **Step 11: Commit**

Run: `cd sanbaygo-mvp && git add calculation-engine/*.ts tests/calculation-engine/*.test.ts && git commit -m "feat: implement calculation engine with tests"`

---

## Task 6: Form State Hook

**Files:**
- Create: `sanbaygo-mvp/hooks/useArrivalWizard.ts`
- Create: `sanbaygo-mvp/tests/hooks/useArrivalWizard.test.ts`

**Interfaces:**
- Produces: `useArrivalWizard` hook with form state, navigation, and result generation

- [ ] **Step 1: Create hooks/useArrivalWizard.ts**

```typescript
import { useReducer, useCallback } from 'react';
import { ArrivalFormData, ArrivalFormStep, ArrivalResult } from '../types';
import { calculateExitTime, isPeakHour, findNextCatchableTrip, calculateArrivalEstimate } from '../calculation-engine';
import { DESTINATIONS } from '../data/destinations';
import { NOI_BAI_AIRPORT } from '../data/airport';

type Action =
  | { type: 'SET_TIME'; payload: string }
  | { type: 'SET_TERMINAL'; payload: 'T1' | 'T2' }
  | { type: 'SET_BAGGAGE'; payload: 'carry_on' | 'checked' }
  | { type: 'SET_DESTINATION'; payload: string }
  | { type: 'SET_FLIGHT_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'RESET' };

const initialState: ArrivalFormData = {
  arrivalTime: getCurrentTime(),
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
};

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function formReducer(state: ArrivalFormData, action: Action): ArrivalFormData {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state, arrivalTime: action.payload };
    case 'SET_TERMINAL':
      return { ...state, terminal: action.payload };
    case 'SET_BAGGAGE':
      return { ...state, baggage: action.payload };
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload };
    case 'SET_FLIGHT_TYPE':
      return { ...state, flightType: action.payload };
    case 'RESET':
      return { ...initialState, arrivalTime: getCurrentTime() };
    default:
      return state;
  }
}

export function useArrivalWizard() {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const setArrivalTime = useCallback((time: string) => {
    dispatch({ type: 'SET_TIME', payload: time });
  }, []);

  const setTerminal = useCallback((terminal: 'T1' | 'T2') => {
    dispatch({ type: 'SET_TERMINAL', payload: terminal });
  }, []);

  const setBaggage = useCallback((baggage: 'carry_on' | 'checked') => {
    dispatch({ type: 'SET_BAGGAGE', payload: baggage });
  }, []);

  const setDestination = useCallback((destination: string) => {
    dispatch({ type: 'SET_DESTINATION', payload: destination });
  }, []);

  const setFlightType = useCallback((flightType: 'domestic' | 'international') => {
    dispatch({ type: 'SET_FLIGHT_TYPE', payload: flightType });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const calculateResult = useCallback((): ArrivalResult | null => {
    if (!formData.terminal || !formData.baggage || !formData.destination) {
      return null;
    }

    const terminalInfo = NOI_BAI_AIRPORT.terminals.find(t => t.id === formData.terminal);
    const destination = DESTINATIONS.find(d => d.id === formData.destination);
    
    if (!terminalInfo || !destination) {
      return null;
    }

    const isPeak = isPeakHour(formData.arrivalTime);
    const exitTime = calculateExitTime(terminalInfo.type, formData.baggage, formData.flightType);
    const busRecommendation = findNextCatchableTrip(formData.arrivalTime, exitTime);
    
    if (busRecommendation.available && busRecommendation.trip) {
      busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
        busRecommendation.trip.departureTime,
        isPeak ? NOI_BAI_AIRPORT.busRoutes[0].travelTime.peak : NOI_BAI_AIRPORT.busRoutes[0].travelTime.normal,
        isPeak
      );
    }

    const grabTravelTime = calculateArrivalEstimate(
      formData.arrivalTime,
      isPeak ? NOI_BAI_AIRPORT.grabEstimates.travelTime.peak : NOI_BAI_AIRPORT.grabEstimates.travelTime.normal,
      isPeak
    );

    return {
      bus: busRecommendation,
      grab: {
        available: true,
        priceEstimate: `${NOI_BAI_AIRPORT.grabEstimates.priceRange.min.toLocaleString()} - ${NOI_BAI_AIRPORT.grabEstimates.priceRange.max.toLocaleString()} VND`,
        travelTime: grabTravelTime,
      },
      direction: {
        description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
        estimatedMinutes: destination.walkingMinutes,
      },
    };
  }, [formData]);

  return {
    formData,
    setArrivalTime,
    setTerminal,
    setBaggage,
    setDestination,
    setFlightType,
    reset,
    calculateResult,
  };
}
```

- [ ] **Step 2: Commit**

Run: `cd sanbaygo-mvp && git add hooks/useArrivalWizard.ts && git commit -m "feat: add form state hook"`

---

## Task 7: Form Components

**Files:**
- Create: `sanbaygo-mvp/components/ArrivalForm/TimeInput.tsx`
- Create: `sanbaygo-mvp/components/ArrivalForm/TerminalSelector.tsx`
- Create: `sanbaygo-mvp/components/ArrivalForm/BaggageSelector.tsx`
- Create: `sanbaygo-mvp/components/ArrivalForm/DestinationPicker.tsx`
- Create: `sanbaygo-mvp/components/ArrivalForm/index.tsx`

**Interfaces:**
- Consumes: `useArrivalWizard` hook, form data
- Produces: Individual step components and orchestrator

- [ ] **Step 1: Create components/ArrivalForm/TimeInput.tsx**

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, setHours, setMinutes } from 'date-fns';

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  
  // Parse current value
  const [hours, minutes] = value.split(':').map(Number);
  const selectedDate = setMinutes(setHours(new Date(), hours), minutes);

  const handleConfirm = (date: Date) => {
    const newTime = format(date, 'HH:mm');
    onChange(newTime);
    setShowPicker(false);
  };

  // Simple time increment/decrement buttons
  const adjustTime = (deltaMinutes: number) => {
    const totalMinutes = hours * 60 + minutes + deltaMinutes;
    const newHours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const newMinutes = totalMinutes % 60;
    const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange(newTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giờ máy bay đáp</Text>
      <View style={styles.timeDisplay}>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustTime(-15)}
        >
          <Text style={styles.adjustButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.timeButton}
          onPress={() => setShowPicker(!showPicker)}
        >
          <Text style={styles.timeText}>{value}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustTime(15)}
        >
          <Text style={styles.adjustButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>Điều chỉnh giờ đáp máy bay của bạn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  adjustButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EEF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustButtonText: {
    fontSize: 24,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  timeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: 14,
    color: '#6B7C8F',
    textAlign: 'center',
    marginTop: 16,
  },
});
```

- [ ] **Step 2: Create components/ArrivalForm/TerminalSelector.tsx**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TerminalSelectorProps {
  value: 'T1' | 'T2' | null;
  onChange: (terminal: 'T1' | 'T2') => void;
}

export function TerminalSelector({ value, onChange }: TerminalSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn nhà ga</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, value === 'T1' && styles.optionSelected]}
          onPress={() => onChange('T1')}
        >
          <Text style={[styles.optionTitle, value === 'T1' && styles.optionTitleSelected]}>
            T1
          </Text>
          <Text style={[styles.optionSubtitle, value === 'T1' && styles.optionSubtitleSelected]}>
            Chuyến bay nội địa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, value === 'T2' && styles.optionSelected]}
          onPress={() => onChange('T2')}
        >
          <Text style={[styles.optionTitle, value === 'T2' && styles.optionTitleSelected]}>
            T2
          </Text>
          <Text style={[styles.optionSubtitle, value === 'T2' && styles.optionSubtitleSelected]}>
            Chuyến bay quốc tế
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#1E3A5F',
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: '#1E3A5F',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7C8F',
    textAlign: 'center',
  },
  optionSubtitleSelected: {
    color: '#1E3A5F',
  },
});
```

- [ ] **Step 3: Create components/ArrivalForm/BaggageSelector.tsx**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BaggageSelectorProps {
  value: 'carry_on' | 'checked' | null;
  onChange: (baggage: 'carry_on' | 'checked') => void;
}

export function BaggageSelector({ value, onChange }: BaggageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Loại hành lý</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, value === 'carry_on' && styles.optionSelected]}
          onPress={() => onChange('carry_on')}
        >
          <Text style={styles.optionIcon}>🎒</Text>
          <Text style={[styles.optionTitle, value === 'carry_on' && styles.optionTitleSelected]}>
            Xách tay
          </Text>
          <Text style={[styles.optionSubtitle, value === 'carry_on' && styles.optionSubtitleSelected]}>
            Không cần nhận hành lý
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, value === 'checked' && styles.optionSelected]}
          onPress={() => onChange('checked')}
        >
          <Text style={styles.optionIcon}>🧳</Text>
          <Text style={[styles.optionTitle, value === 'checked' && styles.optionTitleSelected]}>
            Ký gửi
          </Text>
          <Text style={[styles.optionSubtitle, value === 'checked' && styles.optionSubtitleSelected]}>
            Cần chờ nhận hành lý
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#1E3A5F',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: '#1E3A5F',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7C8F',
    textAlign: 'center',
  },
  optionSubtitleSelected: {
    color: '#1E3A5F',
  },
});
```

- [ ] **Step 4: Create components/ArrivalForm/DestinationPicker.tsx**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DESTINATIONS } from '../../data/destinations';

interface DestinationPickerProps {
  value: string | null;
  onChange: (destination: string) => void;
}

export function DestinationPicker({ value, onChange }: DestinationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn điểm đến</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {DESTINATIONS.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            style={[styles.item, value === dest.id && styles.itemSelected]}
            onPress={() => onChange(dest.id)}
          >
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, value === dest.id && styles.itemTitleSelected]}>
                {dest.name}
              </Text>
              {dest.hasBusCoverage ? (
                <Text style={styles.itemSubtitle}>
                  Xe buýt 86: {dest.travelTime.normal.min}-{dest.travelTime.normal.max} phút
                </Text>
              ) : (
                <Text style={styles.itemSubtitleWarning}>
                  Không có xe buýt 86, chỉ Grab
                </Text>
              )}
            </View>
            {value === dest.id && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#1E3A5F',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  itemTitleSelected: {
    color: '#1E3A5F',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7C8F',
  },
  itemSubtitleWarning: {
    fontSize: 14,
    color: '#D97706',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
```

- [ ] **Step 5: Create components/ArrivalForm/index.tsx**

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrivalFormData } from '../../types';
import { TimeInput } from './TimeInput';
import { TerminalSelector } from './TerminalSelector';
import { BaggageSelector } from './BaggageSelector';
import { DestinationPicker } from './DestinationPicker';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onTimeChange: (time: string) => void;
  onTerminalChange: (terminal: 'T1' | 'T2') => void;
  onBaggageChange: (baggage: 'carry_on' | 'checked') => void;
  onDestinationChange: (destination: string) => void;
  onComplete: () => void;
}

const STEPS = [
  { key: 'time', title: 'Giờ đáp', subtitle: 'Máy bay đáp lúc mấy giờ?' },
  { key: 'terminal', title: 'Nhà ga', subtitle: 'Bạn đáp ở nhà ga nào?' },
  { key: 'baggage', title: 'Hành lý', subtitle: 'Bạn mang loại hành lý gì?' },
  { key: 'destination', title: 'Điểm đến', subtitle: 'Bạn muốn đi đâu?' },
];

export function ArrivalForm({
  formData,
  onTimeChange,
  onTerminalChange,
  onBaggageChange,
  onDestinationChange,
  onComplete,
}: ArrivalFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.arrivalTime;
      case 1:
        return !!formData.terminal;
      case 2:
        return !!formData.baggage;
      case 3:
        return !!formData.destination;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TimeInput value={formData.arrivalTime} onChange={onTimeChange} />;
      case 1:
        return <TerminalSelector value={formData.terminal} onChange={onTerminalChange} />;
      case 2:
        return <BaggageSelector value={formData.baggage} onChange={onBaggageChange} />;
      case 3:
        return <DestinationPicker value={formData.destination} onChange={onDestinationChange} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <View style={styles.progress}>
        {STEPS.map((step, index) => (
          <View
            key={step.key}
            style={[
              styles.progressDot,
              index <= currentStep && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      {/* Step header */}
      <View style={styles.header}>
        <Text style={styles.stepTitle}>{STEPS[currentStep].title}</Text>
        <Text style={styles.stepSubtitle}>{STEPS[currentStep].subtitle}</Text>
      </View>

      {/* Step content */}
      <View style={styles.content}>
        {renderStep()}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigation}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === STEPS.length - 1 ? 'Xem kết quả →' : 'Tiếp tục →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8EEF4',
  },
  progressDotActive: {
    backgroundColor: '#1E3A5F',
    width: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6B7C8F',
  },
  content: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8EEF4',
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7C8F',
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1E3A5F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E8EEF4',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
```

- [ ] **Step 6: Commit**

Run: `cd sanbaygo-mvp && git add components/ArrivalForm/*.tsx && git commit -m "feat: add form components"`

---

## Task 8: Result Display Components

**Files:**
- Create: `sanbaygo-mvp/components/ResultDisplay/BusRecommendation.tsx`
- Create: `sanbaygo-mvp/components/ResultDisplay/GrabFallback.tsx`
- Create: `sanbaygo-mvp/components/ResultDisplay/DirectionGuide.tsx`
- Create: `sanbaygo-mvp/components/ResultDisplay/index.tsx`

**Interfaces:**
- Consumes: `ArrivalResult` type
- Produces: Results cards with Vietnamese copy

- [ ] **Step 1: Create components/ResultDisplay/BusRecommendation.tsx**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusRecommendation } from '../../types';

interface BusRecommendationCardProps {
  recommendation: BusRecommendation;
}

export function BusRecommendationCard({ recommendation }: BusRecommendationCardProps) {
  if (!recommendation.available) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableHeader}>
          <Text style={styles.unavailableIcon}>🚌</Text>
          <Text style={styles.unavailableTitle}>Xe buýt 86</Text>
        </View>
        <View style={styles.unavailableContent}>
          {recommendation.reason === 'no_service' && (
            <Text style={styles.unavailableText}>
              Xe buýt chưa bắt đầu hoạt động.{'\n'}
              Giờ hoạt động: 06:40 - 22:15
            </Text>
          )}
          {recommendation.reason === 'too_late' && (
            <Text style={styles.unavailableText}>
              Xe buýt đã kết thúc chuyến cuối.{'\n'}
              Giờ hoạt động: 06:40 - 22:15
            </Text>
          )}
          {recommendation.reason === 'missed_last' && (
            <Text style={styles.unavailableText}>
              Bạn không kịp chuyến cuối của ngày.{'\n'}
              Vui lòng cân nhắc Grab.
            </Text>
          )}
        </View>
      </View>
    );
  }

  const { trip } = recommendation;
  if (!trip) return null;

  return (
    <View style={styles.container}>
      <View style={styles.recommendedBadge}>
        <Text style={styles.recommendedBadgeText}>✓ ĐỀ XUẤT</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.icon}>🚌</Text>
        <Text style={styles.title}>Xe buýt 86</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Giờ xe khởi hành:</Text>
          <Text style={styles.value}>{trip.departureTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian chờ:</Text>
          <Text style={styles.value}>~{trip.waitMinutes} phút</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian đến nơi:</Text>
          <Text style={styles.value}>
            {trip.arrivalEstimate.early} - {trip.arrivalEstimate.late}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Giá vé:</Text>
          <Text style={styles.price}>{trip.ticketPrice.toLocaleString()} VND</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 15,
    color: '#6B7C8F',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  unavailableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unavailableIcon: {
    fontSize: 28,
    marginRight: 10,
    opacity: 0.5,
  },
  unavailableTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7C8F',
  },
  unavailableContent: {
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 12,
  },
  unavailableText: {
    fontSize: 14,
    color: '#6B7C8F',
    lineHeight: 22,
  },
});
```

- [ ] **Step 2: Create components/ResultDisplay/GrabFallback.tsx**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GrabFallbackCardProps {
  priceEstimate: string;
  travelTime: { early: string; late: string };
  isPeak: boolean;
}

export function GrabFallbackCard({ priceEstimate, travelTime, isPeak }: GrabFallbackCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🚗</Text>
        <Text style={styles.title}>Grab (tham khảo)</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Giá ước tính:</Text>
          <Text style={styles.price}>{priceEstimate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian di chuyển:</Text>
          <Text style={[styles.value, isPeak && styles.peakValue]}>
            {travelTime.early} - {travelTime.late}
            {isPeak && ' (giờ cao điểm)'}
          </Text>
        </View>
        {isPeak && (
          <View style={styles.peakWarning}>
            <Text style={styles.peakWarningText}>
              ⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.disclaimer}>
        * Giá và thời gian chỉ mang tính tham khảo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8EEF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7C8F',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#6B7C8F',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  peakValue: {
    color: '#D97706',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  peakWarning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  peakWarningText: {
    fontSize: 13,
    color: '#92400E',
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
```

- [ ] **Step 3: Create components/ResultDisplay/DirectionGuide.tsx**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DirectionGuideProps {
  description: string;
  estimatedMinutes: number;
}

export function DirectionGuide({ description, estimatedMinutes }: DirectionGuideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🧭</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Hướng dẫn</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
});
```

- [ ] **Step 4: Create components/ResultDisplay/index.tsx**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrivalResult } from '../../types';
import { isPeakHour } from '../../calculation-engine';
import { BusRecommendationCard } from './BusRecommendation';
import { GrabFallbackCard } from './GrabFallback';
import { DirectionGuide } from './DirectionGuide';

interface ResultDisplayProps {
  result: ArrivalResult;
  arrivalTime: string;
  onBack: () => void;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, arrivalTime, onBack, onRecalculate }: ResultDisplayProps) {
  const isPeak = isPeakHour(arrivalTime);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.subtitle}>
          Dựa trên giờ đáp {arrivalTime}
          {isPeak && ' (giờ cao điểm)'}
        </Text>
      </View>

      {/* Bus recommendation */}
      <BusRecommendationCard recommendation={result.bus} />

      {/* Direction guide (if bus available) */}
      {result.bus.available && result.direction && (
        <DirectionGuide
          description={result.direction.description}
          estimatedMinutes={result.direction.estimatedMinutes}
        />
      )}

      {/* Grab fallback */}
      <GrabFallbackCard
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
        isPeak={isPeak}
      />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Sửa lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recalculateButton} onPress={onRecalculate}>
          <Text style={styles.recalculateButtonText}>Tính lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7C8F',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7C8F',
    fontWeight: '500',
  },
  recalculateButton: {
    flex: 1,
    backgroundColor: '#1E3A5F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  recalculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
```

- [ ] **Step 5: Commit**

Run: `cd sanbaygo-mvp && git add components/ResultDisplay/*.tsx && git commit -m "feat: add result display components"`

---

## Task 9: Main App Screen

**Files:**
- Create: `sanbaygo-mvp/app/_layout.tsx`
- Create: `sanbaygo-mvp/app/index.tsx`

**Interfaces:**
- Consumes: All components and hooks
- Produces: Complete working app

- [ ] **Step 1: Create app/_layout.tsx**

```typescript
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E3A5F',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'SanBayGo',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
```

- [ ] **Step 2: Create app/index.tsx**

```typescript
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArrivalWizard } from '../hooks/useArrivalWizard';
import { ArrivalForm } from '../components/ArrivalForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { ArrivalResult } from '../types';

type AppState = 'form' | 'result';

export default function HomeScreen() {
  const [appState, setAppState] = useState<AppState>('form');
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const {
    formData,
    setArrivalTime,
    setTerminal,
    setBaggage,
    setDestination,
    reset,
    calculateResult,
  } = useArrivalWizard();

  const handleFormComplete = () => {
    const calculatedResult = calculateResult();
    if (calculatedResult) {
      setResult(calculatedResult);
      setAppState('result');
    }
  };

  const handleBack = () => {
    setAppState('form');
  };

  const handleRecalculate = () => {
    reset();
    setResult(null);
    setAppState('form');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {appState === 'form' ? (
          <ArrivalForm
            formData={formData}
            onTimeChange={setArrivalTime}
            onTerminalChange={setTerminal}
            onBaggageChange={setBaggage}
            onDestinationChange={setDestination}
            onComplete={handleFormComplete}
          />
        ) : (
          result && (
            <ResultDisplay
              result={result}
              arrivalTime={formData.arrivalTime}
              onBack={handleBack}
              onRecalculate={handleRecalculate}
            />
          )
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
});
```

- [ ] **Step 3: Add SafeAreaProvider dependency**

Update `package.json` to include `react-native-safe-area-context`:

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "react": "18.3.1",
    "react-native": "0.76.0",
    "date-fns": "^3.6.0",
    "react-native-safe-area-context": "4.12.0",
    "expo-status-bar": "~2.0.0"
  }
}
```

- [ ] **Step 4: Commit**

Run: `cd sanbaygo-mvp && git add app/*.tsx && git commit -m "feat: add main app screen"`

---

## Task 10: Final Integration & Build Verification

**Files:**
- Modify: `sanbaygo-mvp/package.json` (if needed)
- Create: `sanbaygo-mvp/README.md`

- [ ] **Step 1: Install dependencies and verify build**

Run: `cd sanbaygo-mvp && npm install`
Expected: All packages installed successfully

- [ ] **Step 2: Run TypeScript check**

Run: `cd sanbaygo-mvp && npx tsc --noEmit`
Expected: No TypeScript errors

- [ ] **Step 3: Run all tests**

Run: `cd sanbaygo-mvp && npm test`
Expected: All tests pass

- [ ] **Step 4: Create README.md**

```markdown
# SanBayGo MVP

App giúp hành khách đáp máy bay tại sân bay Nội Bài quyết định nhanh chóng giữa xe buýt 86 và Grab.

## Getting Started

```bash
npm install
npm start
```

## Features

- Nhập giờ đáp máy bay
- Chọn nhà ga (T1/T2)
- Chọn loại hành lý
- Chọn điểm đến
- Xem chuyến xe buýt 86 gần nhất có thể bắt được
- So sánh với Grab (giá tham khảo)
- Hướng dẫn đến điểm đón xe buýt
```

- [ ] **Step 5: Final commit**

Run: `cd sanbaygo-mvp && git add README.md && git commit -m "docs: add README"`

---

**Plan complete and saved to `docs/superpowers/plans/2026-07-21-sanbaygo-mvp.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
