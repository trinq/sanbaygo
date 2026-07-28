# P0 Corrections — Hướng A (3 Features)

**Ngày:** 2026-07-28
**Trạng thái:** Draft

---

## Tổng quan

3 bug fixes/data corrections cần thiết trước khi launch Hướng A (SGN multi-terminal + Bus 152):

| Priority | Feature | File | Loại |
|----------|---------|------|------|
| P0-1 | F: Sửa test fixture SGN Grab price | `web/__tests__/ResultPage.test.tsx` | Bug fix |
| P0-2 | E: Flight type selector | `useLandingForm.ts` + UI | Feature |
| P0-3 | H: Chuẩn hóa stop-id ↔ destination-id mapping | `core/data/route-maps/bus152.ts` + `ResultPage.tsx` | Refactor |

---

## Feature F — Sửa test fixture SGN Grab price

### Mục tiêu
Sửa giá trị sai trong test fixture để test không bị fail khi chạy CI.

### Thay đổi

**File:** `web/__tests__/components/Result/ResultPage.test.tsx`

**Dòng 90:** Sửa `sgnResult.grab.priceEstimate`:

```typescript
// TRƯỚC (sai)
priceEstimate: '90000 - 150000 VND',

// SAU (đúng)
priceEstimate: '100000 - 180000 VND',
```

### Lý do
- Core data `SGN_GRAB_ESTIMATE.priceRange` đã là `{ min: 100000, max: 180000 }` ✓
- Test fixture còn giá trị cũ từ research ban đầu
- Đây là test snapshot nên giá trị phải khớp với production data

### Verification
```bash
npm test -- --testPathPattern="ResultPage"
```

---

## Feature E — Flight Type Selector

### Mục tiêu
Cho phép user chọn flight type (quốc nội / quốc tế) khi terminal hỗ trợ cả hai. Fix logic inference để exit time estimate chính xác hơn.

### Bối cảnh

SGN-T3 (nhà ga mới, mở tháng 4/2025) có:
```typescript
{
  id: 'SGN-T3',
  name: 'Nhà ga T3 (mới)',
  type: 'domestic',
  flightTypes: ['domestic', 'international'],
}
```

Hiện tại `useLandingForm.ts` dùng `flightTypes[0]`:
```typescript
const flightType: FlightType = terminalData?.flightTypes[0] ?? terminalData?.type ?? 'domestic';
// → luôn trả về 'domestic' cho T3
```

### Thiết kế

#### 1. Thêm state trong `useLandingForm`

```typescript
// web/src/hooks/useLandingForm.ts
const [flightType, setFlightTypeRaw] = useState<FlightType>('domestic');

const setFlightType = useCallback((v: FlightType) => setFlightTypeRaw(v), []);

const flightTypeOptions: FlightType[] = useMemo(() => {
  if (!airport || !terminal) return [];
  const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
  if (!term) return [];
  // Nếu terminal chỉ có 1 loại → trả về empty (không cần selector)
  return term.flightTypes;
}, [airport, terminal]);

const showFlightTypeSelector = useMemo(() => {
  return flightTypeOptions.length > 1;
}, [flightTypeOptions]);
```

#### 2. Cập nhật `buildArrivalFormData`

```typescript
const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
  if (!airport || !terminal || !destination) return null;
  const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
  // Nếu chỉ 1 loại → dùng terminal.type thay vì flightTypes[0]
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

#### 3. Reset flight type khi đổi terminal

```typescript
const setTerminal = useCallback((id: TerminalId) => {
  setTerminalRaw(id);
  setDestinationRaw(null);
  // Reset flight type về default của terminal mới
  const term = AIRPORTS[airport!].terminals.find(t => t.id === id);
  setFlightTypeRaw(term?.flightTypes[0] ?? term?.type ?? 'domestic');
}, [airport]);
```

#### 4. Thêm UI FlightTypeSelector

**Component:** `web/src/components/Landing/FlightTypeSelector.tsx`

```typescript
interface FlightTypeSelectorProps {
  value: FlightType;
  onChange: (v: FlightType) => void;
  label?: string;
}

export function FlightTypeSelector({ value, onChange, label = 'Loại chuyến bay' }: FlightTypeSelectorProps) {
  return (
    <div className={styles.flightTypeSelector} role="radiogroup" aria-label={label}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name="flight-type"
          value="domestic"
          checked={value === 'domestic'}
          onChange={() => onChange('domestic')}
        />
        <span>✈️ Quốc nội</span>
      </label>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name="flight-type"
          value="international"
          checked={value === 'international'}
          onChange={() => onChange('international')}
        />
        <span>🌏 Quốc tế</span>
      </label>
    </div>
  );
}
```

**Styles:** Thêm vào `FlightTypeSelector.module.css` (hoặc dùng existing chip style)

**Vị trí:** Trong `SearchCard` (web landing form), hiển thị sau AirportPicker, chỉ khi `showFlightTypeSelector === true`

#### 5. Wiring trong SearchCard / LandingForm

```typescript
// Trong form render:
{showFlightTypeSelector && (
  <FlightTypeSelector
    value={flightType}
    onChange={setFlightType}
  />
)}
```

#### 6. Ảnh hưởng đến core

**File:** `core/calculate-trip.ts`

Hiện tại đã dùng `formData.flightType`:
```typescript
const exitMinutes = calculateExitTime(
  airportId,
  terminal,
  baggage,
  formData.flightType,  // ← đã đúng
);
```

Không cần thay đổi core vì `formData.flightType` giờ đã chính xác.

### Tóm tắt files thay đổi

| File | Hành động |
|------|-----------|
| `web/src/hooks/useLandingForm.ts` | Thêm state, logic, reset |
| `web/src/components/Landing/FlightTypeSelector.tsx` | Tạo mới |
| `web/src/components/Landing/FlightTypeSelector.module.css` | Tạo mới |
| `web/src/components/Landing/SearchCard.tsx` | Wire selector |
| `core/calculate-trip.ts` | Không thay đổi (đã dùng `formData.flightType`) |

---

## Feature H — Chuẩn hóa stop-id ↔ destination-id mapping (Medium)

### Mục tiêu
Thay mapping hardcode trong `ResultPage.tsx` bằng structured data trong `core/data/`, để maintain được và reuse ở nơi khác.

### Thiết kế

#### 1. Thêm `BusStop` type

**File:** `core/types/index.ts`

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
  stops: BusStop[];
  outboundStops: BusStop[];  // ordered array for outbound direction
  returnStops: BusStop[];   // ordered array for return direction
  destinationToStopId: Record<string, string>;  // destination.id → stop.id
}
```

#### 2. Tạo `core/data/route-maps/bus152.ts`

**File:** `core/data/route-maps/bus152.ts`

```typescript
import { BusRouteMap } from '../../types';

export const BUS_152_MAP: BusRouteMap = {
  routeNumber: '152',
  stops: [
    // ... copy từ Bus152Stops.ts outbound + return
  ],
  outboundStops: [/* copy outbound array */],
  returnStops: [/* copy return array */],
  destinationToStopId: {
    'q1': 'ben-thanh',
    'q3': 'le-lai',           // ← sửa: Q3 gần Lê Lai hơn Bến Thành
    'q5': 'tran-hung-dao',    // ← sửa: Q5 gần Trần Hưng Đạo hơn
    'binh-thanh': 'tran-hung-dao',  // ← sửa: Bình Thạnh gần Trần Hưng Đạo
    'phu-nhuan': 'tran-hung-dao',   // ← sửa: Phú Nhuận gần Trần Hưng Đạo
  },
};
```

**Mapping rationale:**
- `q1` → `ben-thanh`: Hub Bến Thành là điểm trung tâm Q1
- `q3` → `le-lai`: Lê Lai gần ranh giới Q3 (đi bộ 5-8 phút)
- `q5` → `tran-hung-dao`: Trần Hưng Đạo gần Q5 (đi bộ 8-10 phút)
- `binh-thanh` → `tran-hung-dao`: Bình Thạnh phía bắc, gần Trần Hưng Đạo
- `phu-nhuan` → `tran-hung-dao`: Phú Nhuận gần Trần Hưng Đạo

#### 3. Cập nhật `ResultPage.tsx`

**Trước:**
```typescript
const getDestinationStopId = (dest: string | null): string | undefined => {
  if (!dest) return undefined;
  const mapping152: Record<string, string> = {
    'ben-thanh': 'ben-thanh',
    'le-lai': 'le-lai',
    'tran-hung-dao': 'tran-hung-dao',
    'nguyen-van-cu': 'nguyen-van-cu',
    'san-bay-tsn': 'san-bay-tsn',
    'q1': 'ben-thanh',
    'q3': 'ben-thanh',        // ← sai
    'q5': 'ben-thanh',        // ← sai
    'binh-thanh': 'ben-thanh', // ← sai
    'phu-nhuan': 'ben-thanh',  // ← sai
  };
  // ...
};
```

**Sau:**
```typescript
import { BUS_152_MAP } from '@core/data/route-maps/bus152';

const getDestinationStopId = (dest: string | null): string | undefined => {
  if (!dest) return undefined;
  if (busRouteNumber !== '152') return undefined; // fallback
  return BUS_152_MAP.destinationToStopId[dest];
};
```

#### 4. Barrel export

**File:** `core/data/route-maps/index.ts`

```typescript
export { BUS_152_MAP } from './bus152';
```

**File:** `core/data/index.ts`

```typescript
export * from './route-maps';
```

### Tóm tắt files thay đổi

| File | Hành động |
|------|-----------|
| `core/types/index.ts` | Thêm `BusStop`, `BusRouteMap` interfaces |
| `core/data/route-maps/bus152.ts` | Tạo mới |
| `core/data/route-maps/index.ts` | Tạo mới |
| `core/data/index.ts` | Thêm export |
| `web/src/components/Result/ResultPage.tsx` | Thay hardcode bằng import từ core |
| `web/src/components/RouteMap/Bus152Stops.ts` | Có thể xóa (hoặc giữ lại cho TypeScript fallback) |

---

## Thứ tự implementation

1. **Feature F** — Sửa test fixture (1 dòng, không rủi ro)
2. **Feature E** — Flight type selector (UI mới + logic mới)
3. **Feature H** — Chuẩn hóa mapping (refactor data layer)

---

## Definition of Done

- [ ] Feature F: Test `ResultPage` pass
- [ ] Feature E: UI hiển thị selector khi T3, logic đúng cho T1/T2/T3
- [ ] Feature H: Map highlight đúng stop cho tất cả destinations
- [ ] Tất cả tests pass
- [ ] TypeScript compile không lỗi
- [ ] Commit riêng cho từng feature
