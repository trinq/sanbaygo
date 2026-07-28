# P0 Corrections — Hướng A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 3 P0 issues before Hướng A launch: (F) test fixture price, (E) flight type selector, (H) map stop-id mapping

**Architecture:** 3 independent features. Feature F is a 1-line test fix. Feature E adds a UI selector + hook state. Feature H refactors hardcoded mapping to structured core data.

**Tech Stack:** React, TypeScript, Jest, Expo Router

---

## Global Constraints

- All user-facing text must be in Vietnamese
- TDD: write failing test before implementation
- Commit after each feature completion
- All tests must pass before moving to next feature

---

## File Map

### Feature F — Test fixture fix
- Modify: `web/__tests__/components/Result/ResultPage.test.tsx:90`

### Feature E — Flight type selector
- Modify: `web/src/hooks/useLandingForm.ts`
- Create: `web/src/components/Landing/FlightTypeSelector.tsx`
- Create: `web/src/components/Landing/FlightTypeSelector.module.css`
- Modify: `web/src/components/Landing/SearchCard.tsx` (wire selector)
- Test: `web/__tests__/hooks/useLandingForm.test.ts`

### Feature H — Bus152 mapping refactor
- Modify: `core/types/index.ts`
- Create: `core/data/route-maps/bus152.ts`
- Create: `core/data/route-maps/index.ts`
- Modify: `core/data/index.ts`
- Modify: `web/src/components/Result/ResultPage.tsx:82-115`

---

## Task 1: Feature F — Fix SGN Grab price test fixture

**Files:**
- Modify: `web/__tests__/components/Result/ResultPage.test.tsx:90`
- Run: `npm test -- --testPathPattern="ResultPage"`

**Context:** Core data `SGN_GRAB_ESTIMATE.priceRange` is already `{ min: 100000, max: 180000 }`. The test fixture at line 90 still has the old value `'90000 - 150000 VND'`.

- [ ] **Step 1: Run test to see current failure**

```bash
cd /Users/trinq/Developer/sanbaygo
npm test -- --testPathPattern="ResultPage" --no-coverage 2>&1 | head -60
```

Expected: One test may pass or fail depending on whether the test actually asserts on price — check line 90 fixture value is wrong but test might not assert on it directly. Still fix for correctness.

- [ ] **Step 2: Fix the fixture value**

```typescript
// web/__tests__/components/Result/ResultPage.test.tsx line 90
// TRƯỚC:
priceEstimate: '90000 - 150000 VND',

// SAU:
priceEstimate: '100000 - 180000 VND',
```

- [ ] **Step 3: Run test to verify**

```bash
npm test -- --testPathPattern="ResultPage" --no-coverage
```

Expected: All pass

- [ ] **Step 4: Commit**

```bash
git add web/__tests__/components/Result/ResultPage.test.tsx
git commit -m "fix: SGN Grab price fixture 90k→100k-180k VND"
```

---

## Task 2: Feature E — Flight type selector

### Sub-task 2a: Add state to useLandingForm

**Files:**
- Modify: `web/src/hooks/useLandingForm.ts`
- Test: `web/__tests__/hooks/useLandingForm.test.ts`

**Interfaces:**
- Produces: `flightType: FlightType`, `setFlightType: (v: FlightType) => void`, `showFlightTypeSelector: boolean`, `flightTypeOptions: FlightType[]`

- [ ] **Step 1: Read current useLandingForm to understand structure**

```bash
cat /Users/trinq/Developer/sanbaygo/web/src/hooks/useLandingForm.ts
```

- [ ] **Step 2: Write failing test for new flightType state**

```typescript
// web/__tests__/hooks/useLandingForm.test.ts
// Add new test describe block

describe('flightType state', () => {
  it('defaults to domestic', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.flightType).toBe('domestic');
  });

  it('shows selector when terminal has both domestic and international', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T3');
    });
    expect(result.current.showFlightTypeSelector).toBe(true);
    expect(result.current.flightTypeOptions).toEqual(['domestic', 'international']);
  });

  it('hides selector when terminal has only one flight type', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T1');
    });
    expect(result.current.showFlightTypeSelector).toBe(false);
    expect(result.current.flightTypeOptions).toEqual(['domestic']);
  });

  it('buildArrivalFormData uses flightType state when selector shown', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T3');
    });
    act(() => {
      result.current.setDestination('q1');
    });
    act(() => {
      result.current.setFlightType('international');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData?.flightType).toBe('international');
  });

  it('buildArrivalFormData uses terminal.type when selector hidden (SGN-T1)', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T1');
    });
    act(() => {
      result.current.setDestination('q1');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData?.flightType).toBe('domestic');
  });

  it('buildArrivalFormData uses terminal.type when selector hidden (SGN-T2)', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T2');
    });
    act(() => {
      result.current.setDestination('q1');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData?.flightType).toBe('international');
  });

  it('changing terminal resets flightType to terminal default', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
    });
    act(() => {
      result.current.setTerminal('SGN-T3');
    });
    act(() => {
      result.current.setFlightType('international');
    });
    expect(result.current.flightType).toBe('international');
    act(() => {
      result.current.setTerminal('SGN-T1');
    });
    expect(result.current.flightType).toBe('domestic');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- --testPathPattern="useLandingForm" --no-coverage 2>&1 | head -40
```

Expected: FAIL — `flightType`, `setFlightType`, `showFlightTypeSelector`, `flightTypeOptions` not defined

- [ ] **Step 4: Implement state and logic in useLandingForm**

Add after line 36 (after `checked` state):

```typescript
const [flightType, setFlightTypeRaw] = useState<FlightType>('domestic');
```

Add after `setChecked` (around line 54):

```typescript
const setFlightType = useCallback((v: FlightType) => setFlightTypeRaw(v), []);

const flightTypeOptions: FlightType[] = useMemo(() => {
  if (!airport || !terminal) return [];
  const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
  if (!term) return [];
  return term.flightTypes;
}, [airport, terminal]);

const showFlightTypeSelector = useMemo(() => {
  return flightTypeOptions.length > 1;
}, [flightTypeOptions]);
```

Update `setTerminal` (around line 50) to reset flightType:

```typescript
const setTerminal = useCallback((id: TerminalId) => {
  setTerminalRaw(id);
  setDestinationRaw(null);
  // Reset flight type to default of new terminal
  const term = AIRPORTS[airport ?? '']?.terminals.find(t => t.id === id);
  setFlightTypeRaw(term?.flightTypes[0] ?? term?.type ?? 'domestic');
}, [airport]);
```

Update `buildArrivalFormData` to use `flightTypeOptions` length:

```typescript
const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
  if (!airport || !terminal || !destination) return null;
  const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
  const resolvedFlightType: FlightType = flightTypeOptions.length === 1
    ? (term?.type ?? 'domestic')
    : flightType;

  return {
    arrivalTime,
    airportId: airport,
    terminal,
    baggage: DEFAULT_BAGGAGE,
    destination,
    flightType: resolvedFlightType,
  };
}, [arrivalTime, airport, terminal, destination, flightType, flightTypeOptions]);
```

Update return object to include new exports:

```typescript
return {
  // ... existing fields ...
  flightType,
  setFlightType,
  showFlightTypeSelector,
  flightTypeOptions,
  // ... rest ...
};
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- --testPathPattern="useLandingForm" --no-coverage
```

Expected: All pass

- [ ] **Step 6: Commit**

```bash
git add web/src/hooks/useLandingForm.ts web/__tests__/hooks/useLandingForm.test.ts
git commit -m "feat: add flightType state and selector logic to useLandingForm"
```

### Sub-task 2b: Create FlightTypeSelector UI component

**Files:**
- Create: `web/src/components/Landing/FlightTypeSelector.tsx`
- Create: `web/src/components/Landing/FlightTypeSelector.module.css`
- Test: visual inspection + existing tests

- [ ] **Step 1: Read existing chip/selector styles for consistency**

```bash
cat /Users/trinq/Developer/sanbaygo/web/src/components/Landing/BaggageChips.module.css
```

- [ ] **Step 2: Create FlightTypeSelector component**

```typescript
// web/src/components/Landing/FlightTypeSelector.tsx
import { FlightType } from '@core';
import styles from './FlightTypeSelector.module.css';

interface FlightTypeSelectorProps {
  value: FlightType;
  onChange: (v: FlightType) => void;
  label?: string;
}

export function FlightTypeSelector({
  value,
  onChange,
  label = 'Loại chuyến bay',
}: FlightTypeSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.options} role="radiogroup" aria-label={label}>
        <label className={styles.option}>
          <input
            type="radio"
            name="flight-type"
            value="domestic"
            checked={value === 'domestic'}
            onChange={() => onChange('domestic')}
            className={styles.radio}
          />
          <span className={`${styles.chip} ${value === 'domestic' ? styles.chipActive : ''}`}>
            ✈️ Quốc nội
          </span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="flight-type"
            value="international"
            checked={value === 'international'}
            onChange={() => onChange('international')}
            className={styles.radio}
          />
          <span className={`${styles.chip} ${value === 'international' ? styles.chipActive : ''}`}>
            🌍 Quốc tế
          </span>
        </label>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create styles**

```css
/* web/src/components/Landing/FlightTypeSelector.module.css */

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #666);
}

.options {
  display: flex;
  gap: 12px;
}

.option {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid var(--border, #ddd);
  background: var(--bg-secondary, #f5f5f5);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #333);
  transition: all 0.2s ease;
  user-select: none;
}

.chipActive {
  border-color: var(--primary, #007AFF);
  background: var(--primary-light, #e8f4ff);
  color: var(--primary, #007AFF);
}

.radio:focus-visible + .chip {
  outline: 2px solid var(--primary, #007AFF);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Commit component**

```bash
git add web/src/components/Landing/FlightTypeSelector.tsx web/src/components/Landing/FlightTypeSelector.module.css
git commit -m "feat: add FlightTypeSelector component"
```

### Sub-task 2c: Wire selector into SearchCard

**Files:**
- Modify: `web/src/components/Landing/SearchCard.tsx`
- Modify: `web/__tests__/components/Landing/SearchCard.test.tsx`

- [ ] **Step 1: Read SearchCard to find insertion point**

```bash
grep -n "AirportPicker\|TerminalPicker\|DestinationPicker" /Users/trinq/Developer/sanbaygo/web/src/components/Landing/SearchCard.tsx | head -20
```

- [ ] **Step 2: Import and wire FlightTypeSelector**

Add import at top:
```typescript
import { FlightTypeSelector } from './FlightTypeSelector';
```

Find where `terminalOptions` is used (after AirportPicker), add conditional:
```tsx
{showFlightTypeSelector && (
  <FlightTypeSelector
    value={flightType}
    onChange={setFlightType}
  />
)}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- --testPathPattern="SearchCard" --no-coverage
```

Expected: All pass

- [ ] **Step 4: Commit**

```bash
git add web/src/components/Landing/SearchCard.tsx web/__tests__/components/Landing/SearchCard.test.tsx 2>/dev/null; git add web/src/components/Landing/SearchCard.tsx
git commit -m "feat: wire FlightTypeSelector into SearchCard"
```

---

## Task 3: Feature H — Bus152 stop-id mapping refactor

### Sub-task 3a: Add BusStop types to core

**Files:**
- Modify: `core/types/index.ts`

- [ ] **Step 1: Read current types to find insertion point**

```bash
grep -n "export interface\|export type" /Users/trinq/Developer/sanbaygo/core/types/index.ts
```

- [ ] **Step 2: Add BusStop and BusRouteMap interfaces**

Add at end of file (before any barrel re-exports):

```typescript
export interface BusStop {
  id: string;
  name: string;
  type: 'hub' | 'regular' | 'terminal';
  position: { x: number; y: number };
  labelPos: 'top' | 'bottom' | 'left' | 'right';
}

export interface BusRouteMap {
  routeNumber: string;
  outboundStops: BusStop[];
  returnStops: BusStop[];
  destinationToStopId: Record<string, string>;
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No new errors (only pre-existing if any)

- [ ] **Step 4: Commit**

```bash
git add core/types/index.ts
git commit -m "feat: add BusStop and BusRouteMap types"
```

### Sub-task 3b: Create core/data/route-maps/bus152.ts

**Files:**
- Create: `core/data/route-maps/bus152.ts`
- Create: `core/data/route-maps/index.ts`
- Modify: `core/data/index.ts`

- [ ] **Step 1: Read Bus152Stops.ts to copy data**

```bash
cat /Users/trinq/Developer/sanbaygo/web/src/components/RouteMap/Bus152Stops.ts
```

- [ ] **Step 2: Create bus152.ts with corrected mapping**

```typescript
// core/data/route-maps/bus152.ts
import { BusRouteMap } from '../../types';

// Lượt đi: Sân bay Tân Sơn Nhất → KDC Trung Sơn
const outboundStops = [
  { id: 'san-bay-tsn', name: 'Sân bay Tân Sơn Nhất', type: 'hub', position: { x: 2, y: 8 }, labelPos: 'bottom' },
  { id: 'truong-son', name: 'Trường Sơn', type: 'regular', position: { x: 2, y: 6 }, labelPos: 'right' },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', type: 'regular', position: { x: 2, y: 5 }, labelPos: 'left' },
  { id: 'duong-3-2', name: 'Đường 3/2', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'right' },
  { id: 'ly-thai-to', name: 'Lý Thái Tổ', type: 'regular', position: { x: 1, y: 3 }, labelPos: 'bottom' },
  { id: 'le-hong-phong', name: 'Lê Hồng Phong', type: 'regular', position: { x: 0, y: 3 }, labelPos: 'left' },
  { id: 'tran-phu', name: 'Trần Phú', type: 'regular', position: { x: 0, y: 2 }, labelPos: 'left' },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', type: 'regular', position: { x: 1, y: 2 }, labelPos: 'bottom' },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng 8', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'top' },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', type: 'regular', position: { x: 3, y: 2 }, labelPos: 'bottom' },
  { id: 'le-lai', name: 'Lê Lai', type: 'regular', position: { x: 4, y: 2 }, labelPos: 'right' },
  { id: 'ben-thanh', name: 'Bến Thành', type: 'hub', position: { x: 4, y: 1 }, labelPos: 'right' },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', type: 'regular', position: { x: 4, y: 0 }, labelPos: 'right' },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', type: 'regular', position: { x: 3, y: 0 }, labelPos: 'top' },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', type: 'regular', position: { x: 2, y: 0 }, labelPos: 'bottom' },
  { id: 'duong-9a', name: 'Đường 9A', type: 'regular', position: { x: 1, y: 0 }, labelPos: 'top' },
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', type: 'terminal', position: { x: 0, y: 0 }, labelPos: 'left' },
];

// Lượt về: KDC Trung Sơn → Sân bay Tân Sơn Nhất
const returnStops = [
  { id: 'san-bay-tsn', name: 'Sân bay Tân Sơn Nhất', type: 'hub', position: { x: 2, y: 0 }, labelPos: 'top' },
  { id: 'truong-son', name: 'Trường Sơn', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'right' },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'left' },
  { id: 'duong-3-2', name: 'Đường 3/2', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'right' },
  { id: 'ly-thai-to', name: 'Lý Thái Tổ', type: 'regular', position: { x: 1, y: 3 }, labelPos: 'bottom' },
  { id: 'le-hong-phong', name: 'Lê Hồng Phong', type: 'regular', position: { x: 0, y: 3 }, labelPos: 'left' },
  { id: 'tran-phu', name: 'Trần Phú', type: 'regular', position: { x: 0, y: 4 }, labelPos: 'left' },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', type: 'regular', position: { x: 1, y: 4 }, labelPos: 'bottom' },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng 8', type: 'regular', position: { x: 2, y: 4 }, labelPos: 'top' },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', type: 'regular', position: { x: 3, y: 4 }, labelPos: 'bottom' },
  { id: 'le-lai', name: 'Lê Lai', type: 'regular', position: { x: 4, y: 4 }, labelPos: 'right' },
  { id: 'ben-thanh', name: 'Bến Thành', type: 'hub', position: { x: 4, y: 5 }, labelPos: 'right' },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', type: 'regular', position: { x: 4, y: 6 }, labelPos: 'right' },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', type: 'regular', position: { x: 3, y: 6 }, labelPos: 'top' },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', type: 'regular', position: { x: 2, y: 6 }, labelPos: 'bottom' },
  { id: 'duong-9a', name: 'Đường 9A', type: 'regular', position: { x: 1, y: 6 }, labelPos: 'top' },
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', type: 'terminal', position: { x: 0, y: 6 }, labelPos: 'left' },
];

export const BUS_152_MAP: BusRouteMap = {
  routeNumber: '152',
  outboundStops,
  returnStops,
  destinationToStopId: {
    // Hub stops (destination points)
    'ben-thanh': 'ben-thanh',
    'le-lai': 'le-lai',
    'tran-hung-dao': 'tran-hung-dao',
    'nguyen-van-cu': 'nguyen-van-cu',
    'san-bay-tsn': 'san-bay-tsn',
    // District destinations — mapping to nearest stop
    'q1': 'ben-thanh',
    'q3': 'le-lai',           // Lê Lai is closest to Q3 boundary
    'q5': 'tran-hung-dao',    // Trần Hưng Đạo is closest to Q5
    'binh-thanh': 'tran-hung-dao',  // Bình Thạnh north side
    'phu-nhuan': 'tran-hung-dao',   // Phú Nhuận near Trần Hưng Đạo
  },
};
```

- [ ] **Step 3: Create barrel export**

```typescript
// core/data/route-maps/index.ts
export { BUS_152_MAP } from './bus152';
```

- [ ] **Step 4: Update core/data/index.ts**

Add at end:
```typescript
export * from './route-maps';
```

- [ ] **Step 5: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add core/data/route-maps/bus152.ts core/data/route-maps/index.ts core/data/index.ts
git commit -m "feat: add core/data/route-maps/bus152.ts with corrected destination mappings"
```

### Sub-task 3c: Update ResultPage to use BUS_152_MAP

**Files:**
- Modify: `web/src/components/Result/ResultPage.tsx:82-115`

- [ ] **Step 1: Write test for getDestinationStopId**

```bash
grep -n "getDestinationStopId\|selectedStopId" /Users/trinq/Developer/sanbaygo/web/__tests__/components/Result/ResultPage.test.tsx | head -10
```

Add new test:

```typescript
it('highlights le-lai for Q3 destination (not ben-thanh)', () => {
  const { result } = renderHook(() => {
    const [dest, setDest] = useState<string | null>('q3');
    const stopId = dest === 'q3' ? 'le-lai' : undefined; // simulating getDestinationStopId
    return { dest, setDest, stopId };
  });
  expect(result.current.stopId).toBe('le-lai');
});

it('highlights tran-hung-dao for Q5 destination (not ben-thanh)', () => {
  const { result } = renderHook(() => {
    const [dest, setDest] = useState<string | null>('q5');
    const stopId = dest === 'q5' ? 'tran-hung-dao' : undefined;
    return { dest, setDest, stopId };
  });
  expect(result.current.stopId).toBe('tran-hung-dao');
});
```

Actually, simpler — just verify the mapping in BUS_152_MAP:

```typescript
import { BUS_152_MAP } from '@core';

describe('BUS_152_MAP destination mappings', () => {
  it('maps q3 to le-lai', () => {
    expect(BUS_152_MAP.destinationToStopId['q3']).toBe('le-lai');
  });

  it('maps q5 to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['q5']).toBe('tran-hung-dao');
  });

  it('maps binh-thanh to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['binh-thanh']).toBe('tran-hung-dao');
  });

  it('maps phu-nhuan to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['phu-nhuan']).toBe('tran-hung-dao');
  });

  it('maps q1 to ben-thanh', () => {
    expect(BUS_152_MAP.destinationToStopId['q1']).toBe('ben-thanh');
  });
});
```

Add to existing test file or create `core/tests/data/route-maps/bus152.test.ts`:

```typescript
// core/tests/data/route-maps/bus152.test.ts
import { BUS_152_MAP } from '../../../data/route-maps/bus152';

describe('BUS_152_MAP', () => {
  it('has correct route number', () => {
    expect(BUS_152_MAP.routeNumber).toBe('152');
  });

  it('has outbound and return stops', () => {
    expect(BUS_152_MAP.outboundStops.length).toBeGreaterThan(0);
    expect(BUS_152_MAP.returnStops.length).toBeGreaterThan(0);
  });

  it('maps q3 to le-lai (closest stop)', () => {
    expect(BUS_152_MAP.destinationToStopId['q3']).toBe('le-lai');
  });

  it('maps q5 to tran-hung-dao (closest stop)', () => {
    expect(BUS_152_MAP.destinationToStopId['q5']).toBe('tran-hung-dao');
  });

  it('maps binh-thanh to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['binh-thanh']).toBe('tran-hung-dao');
  });

  it('maps phu-nhuan to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['phu-nhuan']).toBe('tran-hung-dao');
  });

  it('maps q1 to ben-thanh', () => {
    expect(BUS_152_MAP.destinationToStopId['q1']).toBe('ben-thanh');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern="bus152" --no-coverage 2>&1 | head -20
```

Expected: FAIL — BUS_152_MAP not found (file doesn't exist yet in test run)

Wait, we already committed bus152.ts. The test should fail because we're running against a non-existent module path in the test. The actual test file doesn't exist yet. Let me clarify:

Actually create the test file first:

```typescript
// core/tests/data/route-maps/bus152.test.ts
import { BUS_152_MAP } from '../../../data/route-maps/bus152';

describe('BUS_152_MAP', () => {
  it('has correct route number', () => {
    expect(BUS_152_MAP.routeNumber).toBe('152');
  });

  it('has outbound and return stops', () => {
    expect(BUS_152_MAP.outboundStops.length).toBeGreaterThan(0);
    expect(BUS_152_MAP.returnStops.length).toBeGreaterThan(0);
  });

  it('maps q3 to le-lai', () => {
    expect(BUS_152_MAP.destinationToStopId['q3']).toBe('le-lai');
  });

  it('maps q5 to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['q5']).toBe('tran-hung-dao');
  });

  it('maps binh-thanh to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['binh-thanh']).toBe('tran-hung-dao');
  });

  it('maps phu-nhuan to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['phu-nhuan']).toBe('tran-hung-dao');
  });

  it('maps q1 to ben-thanh', () => {
    expect(BUS_152_MAP.destinationToStopId['q1']).toBe('ben-thanh');
  });
});
```

Run:
```bash
npm test -- --testPathPattern="route-maps/bus152" --no-coverage
```

Expected: All pass (since we committed the data already)

- [ ] **Step 3: Update ResultPage getDestinationStopId**

Replace the hardcoded mapping in ResultPage.tsx (lines 82-116):

Old code (lines 82-116):
```typescript
const getDestinationStopId = (dest: string | null): string | undefined => {
  if (!dest) return undefined;
  const mapping109: Record<string, string> = {
    'ga-t3': 'ga-t3',
    'q1': 'ben-xe-buýt-sg',
  };
  const mapping86: Record<string, string> = {
    'han-t1': 'ga-t1',
    'han-t2': 'ga-t2',
    'old-quarter': 'ga-hà-nội',
    'hoan-kiem': 'ga-hà-nội',
    'dong-da': 'ga-hà-nội',
    'ba-dinh': 'ga-hà-nội',
    'cau-giay': 'ga-hà-nội',
    'other': 'ga-hà-nội',
  };
  const mapping152: Record<string, string> = {
    'ben-thanh': 'ben-thanh',
    'le-lai': 'le-lai',
    'tran-hung-dao': 'tran-hung-dao',
    'nguyen-van-cu': 'nguyen-van-cu',
    'san-bay-tsn': 'san-bay-tsn',
    'q1': 'ben-thanh',
    'q3': 'ben-thanh',        // ← WRONG
    'q5': 'ben-thanh',        // ← WRONG
    'binh-thanh': 'ben-thanh', // ← WRONG
    'phu-nhuan': 'ben-thanh',  // ← WRONG
  };
  const mapping = busRouteNumber === '109'
    ? mapping109
    : busRouteNumber === '86'
      ? mapping86
      : mapping152;
  return mapping[dest];
};
```

New code:
```typescript
import { BUS_152_MAP } from '@core/data/route-maps/bus152';

const getDestinationStopId = (dest: string | null): string | undefined => {
  if (!dest) return undefined;
  // For Bus 152, use the structured mapping from core
  if (busRouteNumber === '152') {
    return BUS_152_MAP.destinationToStopId[dest];
  }
  // For other buses, keep existing inline mappings
  if (busRouteNumber === '109') {
    const mapping109: Record<string, string> = {
      'ga-t3': 'ga-t3',
      'q1': 'ben-xe-buýt-sg',
    };
    return mapping109[dest];
  }
  if (busRouteNumber === '86') {
    const mapping86: Record<string, string> = {
      'han-t1': 'ga-t1',
      'han-t2': 'ga-t2',
      'old-quarter': 'ga-hà-nội',
      'hoan-kiem': 'ga-hà-nội',
      'dong-da': 'ga-hà-nội',
      'ba-dinh': 'ga-hà-nội',
      'cau-giay': 'ga-hà-nội',
      'other': 'ga-hà-nội',
    };
    return mapping86[dest];
  }
  return undefined;
};
```

- [ ] **Step 4: Run all tests**

```bash
npm test -- --no-coverage 2>&1 | tail -30
```

Expected: All pass

- [ ] **Step 5: Commit**

```bash
git add core/tests/data/route-maps/bus152.test.ts web/src/components/Result/ResultPage.tsx
git commit -m "fix: use BUS_152_MAP for Q3/Q5/BinhThanh/PhuNhuan stop mapping"
```

---

## Final Verification

- [ ] **Run full test suite**

```bash
npm test -- --no-coverage 2>&1 | tail -20
```

Expected: All pass, no failures

- [ ] **Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors

- [ ] **Verify feature_list.json** — mark F, E, H as completed

---

## Summary of Commits

1. `fix: SGN Grab price fixture 90k→100k-180k VND`
2. `feat: add flightType state and selector logic to useLandingForm`
3. `feat: add FlightTypeSelector component`
4. `feat: wire FlightTypeSelector into SearchCard`
5. `feat: add BusStop and BusRouteMap types`
6. `feat: add core/data/route-maps/bus152.ts with corrected destination mappings`
7. `fix: use BUS_152_MAP for Q3/Q5/BinhThanh/PhuNhuan stop mapping`
