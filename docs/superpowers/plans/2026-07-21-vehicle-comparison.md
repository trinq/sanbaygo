# Vehicle Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vehicle Comparison feature showing all 6 transport options (Bus 86, Grab Bike, Xanh SM Bike, Grab Car, Xanh SM, Be) in a sortable card grid with API routes and Supabase integration.

**Architecture:** Next.js App Router with API routes for transport calculations. Supabase PostgreSQL for data storage with static fallback. Card-based UI with sort toggle persisted in localStorage.

**Tech Stack:** Next.js 14+, TypeScript, Supabase JS, Jest for tests

---

## Global Constraints

- Bus 86 ticket price: 35,000 VND (not 50,000)
- Peak hours: 07:00-09:00 and 17:00-19:00
- Bus 86 operating hours: 06:40 - 22:15
- Airport toll (~15,000 VND) included in private vehicle estimates
- 6 transport options: BUS_86, GRAB_BIKE, XANH_SM_BIKE, GRAB_CAR, XANH_SM, BE

---

## File Structure

```
web/
├── src/
│   ├── types/index.ts                    (modify - add TransportComparison)
│   ├── lib/
│   │   ├── supabase.ts                   (create - Supabase client)
│   │   ├── transport-data.ts             (create - static transport data)
│   │   └── transport-calculator.ts      (create - calculation logic)
│   ├── components/
│   │   └── VehicleComparison/             (create - new component)
│   │       ├── index.tsx
│   │       ├── VehicleCard.tsx
│   │       └── SortToggle.tsx
│   └── app/api/
│       ├── transport-options/route.ts    (create - GET endpoint)
│       └── calculate-trip/route.ts       (create - POST endpoint)
├── supabase/
│   └── migrations/
│       └── 001_transport_options.sql     (create - DB schema)
└── __tests__/
    └── lib/
        └── transport-calculator.test.ts  (create - unit tests)
```

---

## Task 1: Type Definitions

**Files:**
- Modify: `web/src/types/index.ts`

**Interfaces:**
- Produces: `TransportComparison`, `TransportOption`, `SortOption`, `TripCalculationRequest`, `TripCalculationResponse`

- [ ] **Step 1: Add TransportComparison interface**

Add to `web/src/types/index.ts`:

```typescript
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
  luggageScore: number; // 1-5
  comfortScore: number; // 1-5
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

- [ ] **Step 2: Verify file compiles**

Run: `cd web && npx tsc --noEmit`
Expected: No errors related to new types

- [ ] **Step 3: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/types/index.ts
git commit -m "types: add TransportComparison and related interfaces"
```

---

## Task 2: Static Transport Data

**Files:**
- Create: `web/src/lib/transport-data.ts`

**Interfaces:**
- Produces: `TRANSPORT_OPTIONS` constant array

- [ ] **Step 1: Create transport-data.ts**

```typescript
import { TransportOption } from '../types';

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'BUS_86',
    name: 'Bus 86',
    nameVi: 'Xe buýt 86',
    type: 'bus',
    basePrice: 35000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
    luggageScore: 5,
    comfortScore: 2,
    ecoFriendly: false,
    isRecommended: true,
    notes: 'Xe buýt sân bay chuyên dụng, ghế ngồi, giá rẻ nhất',
  },
  {
    id: 'GRAB_BIKE',
    name: 'Grab Bike',
    nameVi: 'Grab Bike',
    type: 'motorbike',
    basePrice: 80000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 50 },
      peak: { min: 55, max: 70 },
    },
    luggageScore: 1,
    comfortScore: 2,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Xe máy, phù hợp 1 người hành lý nhẹ',
  },
  {
    id: 'XANH_SM_BIKE',
    name: 'Xanh SM Bike',
    nameVi: 'Xanh SM Bike',
    type: 'motorbike',
    basePrice: 80000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 50 },
      peak: { min: 55, max: 70 },
    },
    luggageScore: 1,
    comfortScore: 2,
    ecoFriendly: true,
    isRecommended: false,
    notes: 'Xe máy điện VinGroup, thân thiện môi trường',
  },
  {
    id: 'GRAB_CAR',
    name: 'Grab Car',
    nameVi: 'Grab Car',
    type: 'car',
    basePrice: 250000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 4,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Xe 4 chỗ Grab, có điều hòa, phù hợp 1-4 người',
  },
  {
    id: 'XANH_SM',
    name: 'Xanh SM',
    nameVi: 'Xanh SM',
    type: 'car',
    basePrice: 280000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 5,
    ecoFriendly: true,
    isRecommended: false,
    notes: 'Xe điện VinGroup, êm ái, thân thiện môi trường',
  },
  {
    id: 'BE',
    name: 'Be Car',
    nameVi: 'Be Car',
    type: 'car',
    basePrice: 250000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 4,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Dịch vụ xe của Be, xe 4 chỗ có điều hòa',
  },
];

export function getTransportOption(id: string): TransportOption | undefined {
  return TRANSPORT_OPTIONS.find((opt) => opt.id === id);
}

export function getScoreLabel(score: number): string {
  if (score >= 4) return 'Tốt';
  if (score >= 3) return 'Khá';
  if (score >= 2) return 'Trung bình';
  return 'Kém';
}
```

- [ ] **Step 2: Run type check**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/lib/transport-data.ts
git commit -m "data: add static transport options for comparison"
```

---

## Task 3: Transport Calculator

**Files:**
- Create: `web/src/lib/transport-calculator.ts`
- Create: `web/__tests__/lib/transport-calculator.test.ts`

**Interfaces:**
- Consumes: `TRANSPORT_OPTIONS`, `isPeakHour()`, `findNextCatchableTrip()`, `calculateExitTime()`
- Produces: `calculateTripComparison()`, `sortComparisons()`

- [ ] **Step 1: Create transport-calculator.ts**

```typescript
import {
  TransportOption,
  TransportComparison,
  TripCalculationRequest,
  TripCalculationResponse,
  SortOption,
} from '../types';
import { TRANSPORT_OPTIONS, getScoreLabel } from './transport-data';
import {
  isPeakHour,
  findNextCatchableTrip,
  calculateExitTime,
  timeToMinutes,
  addMinutes,
  formatTimeRange,
  formatPrice,
} from './calculation-engine';
import { BUS_86 } from './data';

const WALKING_TO_PICKUP_MINUTES = 5;

function calculatePrice(option: TransportOption, isPeak: boolean): number {
  // Bus 86 has fixed price
  if (option.id === 'BUS_86') {
    return option.basePrice;
  }

  // Private vehicles: base price + airport toll + peak surge
  const airportToll = 15000; // 15,000 VND
  const peakSurge = isPeak ? 1.25 : 1.0; // 25% surcharge during peak

  return Math.round((option.basePrice + airportToll) * peakSurge);
}

function calculateWaitTime(
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number },
  isBus86: boolean
): { minutes: number; nextDeparture: string } | undefined {
  if (!isBus86) return undefined;

  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);

  // Find next catchable trip
  for (const departure of BUS_86.schedule) {
    if (timeToMinutes(departure) >= timeToMinutes(readyTime)) {
      return {
        minutes: timeToMinutes(departure) - timeToMinutes(readyTime),
        nextDeparture: departure,
      };
    }
  }

  return undefined;
}

function calculateArrivalTime(
  startTime: string,
  waitMinutes: number | undefined,
  travelTime: { min: number; max: number }
): string {
  let actualStart = startTime;

  if (waitMinutes !== undefined) {
    actualStart = addMinutes(startTime, waitMinutes);
  }

  return formatTimeRange(actualStart, travelTime);
}

function buildComparison(
  option: TransportOption,
  arrivalTime: string,
  isPeak: boolean,
  readyAt: string
): TransportComparison {
  const isBus86 = option.id === 'BUS_86';

  // Calculate exit time for bus wait calculation
  const exitTime = { min: 15, max: 30 }; // Default, will be overridden by caller
  const waitTime = calculateWaitTime(arrivalTime, exitTime, isBus86);

  // Calculate travel time range
  const travelTimeRange = isPeak ? option.travelTime.peak : option.travelTime.normal;

  // Calculate arrival time
  const startTime = isBus86 && waitTime ? waitTime.nextDeparture : readyAt;
  const arrivalEstimate = calculateArrivalTime(startTime, waitTime?.minutes, travelTimeRange);

  // Calculate price
  const priceValue = calculatePrice(option, isPeak);

  return {
    id: option.id,
    name: option.name,
    nameVi: option.nameVi,
    type: option.type,
    price: {
      estimate: formatPrice(priceValue),
      value: priceValue,
      isEstimate: !isBus86,
    },
    travelTime: {
      estimate: `${travelTimeRange.min}-${travelTimeRange.max} phút`,
      minutesRange: travelTimeRange,
      arrivalEstimate,
    },
    waitTime,
    luggage: {
      score: option.luggageScore,
      label: getScoreLabel(option.luggageScore),
    },
    comfort: {
      score: option.comfortScore,
      label: getScoreLabel(option.comfortScore),
    },
    ecoFriendly: option.ecoFriendly,
    notes: option.notes,
    isRecommended: option.isRecommended,
  };
}

export function sortComparisons(
  comparisons: TransportComparison[],
  sortBy: SortOption
): TransportComparison[] {
  const sorted = [...comparisons];

  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price.value - b.price.value);

    case 'fastest':
      return sorted.sort((a, b) => a.travelTime.minutesRange.min - b.travelTime.minutesRange.min);

    case 'recommended':
    default:
      return sorted.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return 0;
      });
  }
}

export function calculateTripComparison(
  request: TripCalculationRequest
): TripCalculationResponse {
  const { arrivalTime, terminalId, baggageType, sortBy } = request;

  const isPeak = isPeakHour(arrivalTime);
  const exitTime = calculateExitTime(
    terminalId === 'T1' ? 'domestic' : 'international',
    baggageType
  );

  // Calculate ready time
  const readyAt = addMinutes(
    arrivalTime,
    exitTime.maxMinutes + WALKING_TO_PICKUP_MINUTES
  );

  // Build comparison for each transport option
  const comparisons = TRANSPORT_OPTIONS.map((option) =>
    buildComparison(option, arrivalTime, isPeak, readyAt)
  );

  // Sort and return
  return {
    comparison: sortComparisons(comparisons, sortBy),
    metadata: {
      arrivalTime,
      readyAt,
      isPeakHour: isPeak,
    },
  };
}
```

- [ ] **Step 2: Create unit tests**

Create `web/__tests__/lib/transport-calculator.test.ts`:

```typescript
import { sortComparisons, calculateTripComparison } from '../../src/lib/transport-calculator';
import { TransportComparison } from '../../src/types';

describe('sortComparisons', () => {
  const mockComparisons: TransportComparison[] = [
    {
      id: 'BUS_86',
      name: 'Bus 86',
      nameVi: 'Xe buýt 86',
      type: 'bus',
      price: { estimate: '35,000 VND', value: 35000, isEstimate: false },
      travelTime: {
        estimate: '50-70 phút',
        minutesRange: { min: 50, max: 70 },
        arrivalEstimate: '14:50-15:10',
      },
      luggage: { score: 5, label: 'Tốt' },
      comfort: { score: 2, label: 'Trung bình' },
      ecoFriendly: false,
      notes: 'Bus notes',
      isRecommended: true,
    },
    {
      id: 'GRAB_BIKE',
      name: 'Grab Bike',
      nameVi: 'Grab Bike',
      type: 'motorbike',
      price: { estimate: '100,000 VND', value: 100000, isEstimate: true },
      travelTime: {
        estimate: '40-50 phút',
        minutesRange: { min: 40, max: 50 },
        arrivalEstimate: '14:40-14:50',
      },
      luggage: { score: 1, label: 'Kém' },
      comfort: { score: 2, label: 'Trung bình' },
      ecoFriendly: false,
      notes: 'Bike notes',
      isRecommended: false,
    },
    {
      id: 'GRAB_CAR',
      name: 'Grab Car',
      nameVi: 'Grab Car',
      type: 'car',
      price: { estimate: '280,000 VND', value: 280000, isEstimate: true },
      travelTime: {
        estimate: '45-55 phút',
        minutesRange: { min: 45, max: 55 },
        arrivalEstimate: '14:45-14:55',
      },
      luggage: { score: 4, label: 'Khá' },
      comfort: { score: 4, label: 'Khá' },
      ecoFriendly: false,
      notes: 'Car notes',
      isRecommended: false,
    },
  ];

  test('sorts by recommended first', () => {
    const sorted = sortComparisons(mockComparisons, 'recommended');
    expect(sorted[0].id).toBe('BUS_86');
  });

  test('sorts by cheapest first', () => {
    const sorted = sortComparisons(mockComparisons, 'cheapest');
    expect(sorted[0].id).toBe('BUS_86');
    expect(sorted[1].id).toBe('GRAB_BIKE');
    expect(sorted[2].id).toBe('GRAB_CAR');
  });

  test('sorts by fastest first', () => {
    const sorted = sortComparisons(mockComparisons, 'fastest');
    expect(sorted[0].id).toBe('GRAB_BIKE');
    expect(sorted[1].id).toBe('GRAB_CAR');
    expect(sorted[2].id).toBe('BUS_86');
  });
});

describe('calculateTripComparison', () => {
  test('returns comparison for valid request', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    expect(result.comparison).toHaveLength(6);
    expect(result.metadata.arrivalTime).toBe('14:00');
    expect(result.metadata.isPeakHour).toBe(false);
    expect(result.comparison[0].isRecommended).toBe(true);
  });

  test('applies peak surge during peak hours', () => {
    const normalResult = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'cheapest',
    });

    const peakResult = calculateTripComparison({
      arrivalTime: '08:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'cheapest',
    });

    // Bus 86 price should not change
    const normalBus = normalResult.comparison.find(c => c.id === 'BUS_86');
    const peakBus = peakResult.comparison.find(c => c.id === 'BUS_86');
    expect(normalBus?.price.value).toBe(peakBus?.price.value);

    // Grab bike should be more expensive during peak
    const normalBike = normalResult.comparison.find(c => c.id === 'GRAB_BIKE');
    const peakBike = peakResult.comparison.find(c => c.id === 'GRAB_BIKE');
    expect(peakBike?.price.value).toBeGreaterThan(normalBike?.price.value);
  });
});
```

- [ ] **Step 3: Run tests**

Run: `cd web && npm test -- --testPathPattern=transport-calculator`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/lib/transport-calculator.ts web/__tests__/lib/transport-calculator.test.ts
git commit -m "feat: add transport calculator with sorting logic"
```

---

## Task 4: API Routes

**Files:**
- Create: `web/src/app/api/transport-options/route.ts`
- Create: `web/src/app/api/calculate-trip/route.ts`

**Interfaces:**
- Produces: GET /api/transport-options, POST /api/calculate-trip

- [ ] **Step 1: Create transport-options route**

Create `web/src/app/api/transport-options/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { TRANSPORT_OPTIONS } from '@/lib/transport-data';

export async function GET() {
  return NextResponse.json({
    options: TRANSPORT_OPTIONS,
    lastUpdated: new Date().toISOString(),
  });
}
```

- [ ] **Step 2: Create calculate-trip route**

Create `web/src/app/api/calculate-trip/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { calculateTripComparison } from '@/lib/transport-calculator';
import { TripCalculationRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: TripCalculationRequest = await request.json();

    // Validate required fields
    if (
      !body.arrivalTime ||
      !body.terminalId ||
      !body.baggageType ||
      !body.destinationId ||
      !body.sortBy
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = calculateTripComparison(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Calculate trip error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Test API routes**

Run: `cd web && npm run dev` (in background, or use curl)

```bash
# Test GET
curl http://localhost:3000/api/transport-options

# Test POST
curl -X POST http://localhost:3000/api/calculate-trip \
  -H "Content-Type: application/json" \
  -d '{"arrivalTime":"14:00","terminalId":"T1","baggageType":"carry_on","destinationId":"old-quarter","sortBy":"recommended"}'
```

- [ ] **Step 4: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/app/api/
git commit -m "feat: add API routes for transport options and trip calculation"
```

---

## Task 5: VehicleComparison Components

**Files:**
- Create: `web/src/components/VehicleComparison/index.tsx`
- Create: `web/src/components/VehicleComparison/VehicleCard.tsx`
- Create: `web/src/components/VehicleComparison/SortToggle.tsx`

**Interfaces:**
- Consumes: `TransportComparison[]`, `SortOption`, `TripCalculationResponse`

- [ ] **Step 1: Create SortToggle component**

Create `web/src/components/VehicleComparison/SortToggle.tsx`:

```typescript
import { SortOption } from '@/types';
import styles from './SortToggle.module.css';

interface SortToggleProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Đề xuất' },
  { value: 'cheapest', label: 'Giá rẻ nhất' },
  { value: 'fastest', label: 'Nhanh nhất' },
];

export function SortToggle({ value, onChange }: SortToggleProps) {
  return (
    <div className={styles.container}>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

Create `web/src/components/VehicleComparison/SortToggle.module.css`:

```css
.container {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: var(--color-surface);
  border-radius: 12px;
}

.button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--color-hover);
}

.button.active {
  background: var(--color-primary);
  color: white;
}
```

- [ ] **Step 2: Create VehicleCard component**

Create `web/src/components/VehicleComparison/VehicleCard.tsx`:

```typescript
import { TransportComparison } from '@/types';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  comparison: TransportComparison;
}

const TYPE_ICONS: Record<string, string> = {
  bus: '🚌',
  motorbike: '🏍️',
  car: '🚗',
};

export function VehicleCard({ comparison }: VehicleCardProps) {
  const icon = TYPE_ICONS[comparison.type] || '🚗';

  return (
    <div className={`${styles.card} ${comparison.isRecommended ? styles.recommended : ''}`}>
      {comparison.isRecommended && (
        <div className={styles.badge}>Đề xuất</div>
      )}

      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.name}>
          <h3 className={styles.nameText}>{comparison.nameVi}</h3>
          <span className={styles.nameEn}>{comparison.name}</span>
        </div>
      </div>

      <div className={styles.price}>
        <span className={styles.priceValue}>{comparison.price.estimate}</span>
        {comparison.price.isEstimate && (
          <span className={styles.estimateTag}>ước tính</span>
        )}
      </div>

      <div className={styles.time}>
        <span className={styles.timeIcon}>⏱️</span>
        <span className={styles.timeValue}>{comparison.travelTime.estimate}</span>
      </div>

      {comparison.waitTime && (
        <div className={styles.wait}>
          <span className={styles.waitLabel}>Chờ xe:</span>
          <span className={styles.waitValue}>{comparison.waitTime.minutes} phút</span>
          <span className={styles.waitNext}>({comparison.waitTime.nextDeparture})</span>
        </div>
      )}

      <div className={styles.arrival}>
        <span className={styles.arrivalLabel}>Đến nơi:</span>
        <span className={styles.arrivalValue}>{comparison.travelTime.arrivalEstimate}</span>
      </div>

      <div className={styles.ratings}>
        <div className={styles.rating}>
          <span className={styles.ratingLabel}>Hành lý</span>
          <span className={`${styles.ratingBadge} ${styles[`score${comparison.luggage.score}`]}`}>
            {comparison.luggage.label}
          </span>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingLabel}>Thoải mái</span>
          <span className={`${styles.ratingBadge} ${styles[`score${comparison.comfort.score}`]}`}>
            {comparison.comfort.label}
          </span>
        </div>
      </div>

      {comparison.ecoFriendly && (
        <div className={styles.eco}>🌿 Thân thiện môi trường</div>
      )}

      <p className={styles.notes}>{comparison.notes}</p>
    </div>
  );
}
```

Create `web/src/components/VehicleComparison/VehicleCard.module.css`:

```css
.card {
  flex: 0 0 280px;
  padding: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  position: relative;
}

.card.recommended {
  border-color: var(--color-primary);
  border-width: 2px;
}

.badge {
  position: absolute;
  top: -10px;
  left: 16px;
  padding: 4px 12px;
  background: var(--color-primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.icon {
  font-size: 32px;
}

.name {
  display: flex;
  flex-direction: column;
}

.nameText {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.nameEn {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.priceValue {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
}

.estimateTag {
  font-size: 11px;
  padding: 2px 6px;
  background: var(--color-warning);
  color: white;
  border-radius: 4px;
}

.time {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}

.wait, .arrival {
  font-size: 14px;
  margin-bottom: 4px;
}

.waitLabel, .arrivalLabel {
  color: var(--color-text-secondary);
}

.ratings {
  display: flex;
  gap: 12px;
  margin: 12px 0;
}

.rating {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ratingLabel {
  font-size: 11px;
  color: var(--color-text-secondary);
}

.ratingBadge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-align: center;
}

.score5, .score4 { background: #E8F5E9; color: #2E7D32; }
.score3 { background: #FFF3E0; color: #EF6C00; }
.score2, .score1 { background: #FFEBEE; color: #C62828; }

.eco {
  font-size: 12px;
  color: #2E7D32;
  margin-bottom: 8px;
}

.notes {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
}
```

- [ ] **Step 3: Create VehicleComparison index**

Create `web/src/components/VehicleComparison/index.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { TransportComparison, SortOption, TripCalculationResponse } from '@/types';
import { SortToggle } from './SortToggle';
import { VehicleCard } from './VehicleCard';
import styles from './index.module.css';

interface VehicleComparisonProps {
  formData: {
    arrivalTime: string;
    terminalId: 'T1' | 'T2';
    baggageType: 'carry_on' | 'checked';
    destinationId: string;
  };
}

export function VehicleComparison({ formData }: VehicleComparisonProps) {
  const [comparisons, setComparisons] = useState<TransportComparison[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persist sort preference
    const savedSort = localStorage.getItem('vehicle-sort') as SortOption;
    if (savedSort) {
      setSortBy(savedSort);
    }
  }, []);

  useEffect(() => {
    async function fetchComparison() {
      setLoading(true);
      try {
        const response = await fetch('/api/calculate-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            sortBy,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const data: TripCalculationResponse = await response.json();
        setComparisons(data.comparison);
        setIsPeakHour(data.metadata.isPeakHour);
      } catch (error) {
        console.error('Error fetching comparison:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchComparison();
  }, [formData, sortBy]);

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    localStorage.setItem('vehicle-sort', newSort);
  };

  if (loading) {
    return <div className={styles.loading}>Đang tính toán...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>So sánh phương tiện</h2>
        {isPeakHour && (
          <span className={styles.peakBadge}>Giờ cao điểm</span>
        )}
      </div>

      <SortToggle value={sortBy} onChange={handleSortChange} />

      <div className={styles.grid}>
        {comparisons.map((comparison) => (
          <VehicleCard key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </div>
  );
}
```

Create `web/src/components/VehicleComparison/index.module.css`:

```css
.container {
  padding: 16px 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.peakBadge {
  font-size: 12px;
  padding: 4px 10px;
  background: #FFF3E0;
  color: #E65100;
  border-radius: 8px;
}

.grid {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px 0;
  margin: 0 -16px;
  padding-left: 16px;
  padding-right: 16px;
  -webkit-overflow-scrolling: touch;
}

.grid::-webkit-scrollbar {
  display: none;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--color-text-secondary);
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/components/VehicleComparison/
git commit -m "feat: add VehicleComparison components with sort toggle"
```

---

## Task 6: Integrate into ResultDisplay

**Files:**
- Modify: `web/src/components/ResultDisplay/index.tsx`

**Interfaces:**
- Consumes: `VehicleComparison` component
- Produces: Updated ResultDisplay with vehicle comparison

- [ ] **Step 1: Update ResultDisplay to include VehicleComparison**

Modify `web/src/components/ResultDisplay/index.tsx`:

Add import:
```typescript
import { VehicleComparison } from '../VehicleComparison';
```

Add component usage after GrabFallback:
```tsx
<VehicleComparison
  formData={{
    arrivalTime: formData.arrivalTime,
    terminalId: formData.terminal as 'T1' | 'T2',
    baggageType: formData.baggage,
    destinationId: formData.destination,
  }}
/>
```

- [ ] **Step 2: Run dev server and verify**

Run: `cd web && npm run dev`
Navigate to: http://localhost:3000

- [ ] **Step 3: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/src/components/ResultDisplay/index.tsx
git commit -m "feat: integrate VehicleComparison into ResultDisplay"
```

---

## Task 7: Supabase Integration (Optional/Database)

**Files:**
- Create: `web/supabase/migrations/001_transport_options.sql`
- Create: `web/src/lib/supabase.ts`

This task is optional for MVP - static data works fine. If Supabase is needed later:

- [ ] **Step 1: Create migration file**

Create `web/supabase/migrations/001_transport_options.sql`:

```sql
-- Transport options table
CREATE TABLE transport_options (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_vi VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('bus', 'motorbike', 'car')),
  base_price INTEGER NOT NULL,
  price_unit VARCHAR(20) NOT NULL CHECK (price_unit IN ('per_trip', 'per_person')),
  travel_time_normal_min INTEGER NOT NULL,
  travel_time_normal_max INTEGER NOT NULL,
  travel_time_peak_min INTEGER NOT NULL,
  travel_time_peak_max INTEGER NOT NULL,
  luggage_score INTEGER NOT NULL CHECK (luggage_score BETWEEN 1 AND 5),
  comfort_score INTEGER NOT NULL CHECK (comfort_score BETWEEN 1 AND 5),
  eco_friendly BOOLEAN DEFAULT FALSE,
  is_recommended BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Price multipliers for surge pricing
CREATE TABLE price_multipliers (
  id SERIAL PRIMARY KEY,
  transport_id VARCHAR(50) REFERENCES transport_options(id),
  multiplier DECIMAL(3,2) NOT NULL,
  condition VARCHAR(50) NOT NULL CHECK (condition IN ('peak', 'night', 'weekend'))
);

-- Insert default transport options
INSERT INTO transport_options (id, name, name_vi, type, base_price, price_unit, travel_time_normal_min, travel_time_normal_max, travel_time_peak_min, travel_time_peak_max, luggage_score, comfort_score, eco_friendly, is_recommended, notes)
VALUES
  ('BUS_86', 'Bus 86', 'Xe buýt 86', 'bus', 35000, 'per_trip', 50, 55, 65, 75, 5, 2, FALSE, TRUE, 'Xe buýt sân bay chuyên dụng'),
  ('GRAB_BIKE', 'Grab Bike', 'Grab Bike', 'motorbike', 80000, 'per_trip', 40, 50, 55, 70, 1, 2, FALSE, FALSE, 'Xe máy'),
  ('XANH_SM_BIKE', 'Xanh SM Bike', 'Xanh SM Bike', 'motorbike', 80000, 'per_trip', 40, 50, 55, 70, 1, 2, TRUE, FALSE, 'Xe máy điện VinGroup'),
  ('GRAB_CAR', 'Grab Car', 'Grab Car', 'car', 250000, 'per_trip', 40, 55, 55, 75, 4, 4, FALSE, FALSE, 'Xe 4 chỗ'),
  ('XANH_SM', 'Xanh SM', 'Xanh SM', 'car', 280000, 'per_trip', 40, 55, 55, 75, 4, 5, TRUE, FALSE, 'Xe điện VinGroup'),
  ('BE', 'Be Car', 'Be Car', 'car', 250000, 'per_trip', 40, 55, 55, 75, 4, 4, FALSE, FALSE, 'Dịch vụ xe Be');
```

- [ ] **Step 2: Create Supabase client**

Create `web/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Commit**

```bash
cd /Users/trinq/Developer/sanbaygo
git add web/supabase/ web/src/lib/supabase.ts
git commit -m "feat: add Supabase schema and client"
```

---

## Verification Checklist

- [ ] TypeScript compiles without errors
- [ ] All unit tests pass
- [ ] API routes return correct data
- [ ] UI displays all 6 transport options
- [ ] Sort toggle works and persists to localStorage
- [ ] Peak hour pricing applies correctly
- [ ] Responsive on mobile (horizontal scroll)
