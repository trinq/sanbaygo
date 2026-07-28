# Bus 152 Route Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add metro-style route map visualization to ResultPage showing Bus 152 stops with draw-line animation and destination highlighting.

**Architecture:** Pure SVG component with CSS animations. Grid-based stop positioning for metro aesthetic. Expandable section wrapper with direction toggle.

**Tech Stack:** React, CSS Modules, SVG, TypeScript

---

## Global Constraints

- **Language:** Vietnamese for all user-facing text
- **Styling:** CSS Modules (no Tailwind)
- **Animation:** CSS @keyframes only, no external animation library
- **Bus 152 ticket price:** 5,000 VND (hardcoded from existing data)

---

## File Structure

```
web/src/components/RouteMap/
├── RouteMap.tsx           # Main component
├── RouteMap.module.css    # Styles + animations
├── Bus152Stops.ts         # Stop data (17 stops x 2 directions)
├── types.ts               # TypeScript interfaces
└── index.ts               # Export

Modified:
├── web/src/components/Result/ResultPage.tsx      # Add ExpandableRouteSection
└── web/src/components/Result/ResultPage.module.css # Add wrapper styles
```

---

## Task 1: Create RouteMap Types

**Files:**
- Create: `web/src/components/RouteMap/types.ts`
- Test: N/A (types only)

**Interfaces:**
- Produces:
  ```typescript
  interface BusStop {
    id: string;
    name: string;
    isHub: boolean;
    isTerminal: boolean;
    position: { x: number; y: number };
  }

  type RouteDirection = 'outbound' | 'return';

  interface RouteMapProps {
    direction: RouteDirection;
    selectedStopId?: string;
    onDirectionChange: (dir: RouteDirection) => void;
  }
  ```

- [ ] **Step 1: Create types.ts**

```typescript
export interface BusStop {
  id: string;
  name: string;
  isHub: boolean;
  isTerminal: boolean;
  position: { x: number; y: number };
}

export type RouteDirection = 'outbound' | 'return';

export interface RouteMapProps {
  direction: RouteDirection;
  selectedStopId?: string;
  onDirectionChange: (dir: RouteDirection) => void;
}
```

- [ ] **Step 2: Commit**

```bash
git add web/src/components/RouteMap/types.ts
git commit -m "feat: add RouteMap types"
```

---

## Task 2: Create Bus152Stops Data

**Files:**
- Create: `web/src/components/RouteMap/Bus152Stops.ts`
- Test: N/A (static data)

**Interfaces:**
- Produces:
  ```typescript
  export const BUS_152_STOPS: {
    outbound: BusStop[];
    return: BusStop[];
  }
  ```

- [ ] **Step 1: Create Bus152Stops.ts with 17 outbound stops**

```typescript
import { BusStop } from './types';

export const outboundStops: BusStop[] = [
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', isHub: false, isTerminal: true, position: { x: 0, y: 0 } },
  { id: 'duong-9a', name: 'Đường 9A', isHub: false, isTerminal: false, position: { x: 1, y: 0 } },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', isHub: false, isTerminal: false, position: { x: 2, y: 0 } },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', isHub: false, isTerminal: false, position: { x: 3, y: 0 } },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', isHub: false, isTerminal: false, position: { x: 4, y: 0 } },
  { id: 'ben-thanh', name: 'Bến Thành', isHub: true, isTerminal: false, position: { x: 4, y: 1 } },
  { id: 'le-lai', name: 'Lê Lai', isHub: false, isTerminal: false, position: { x: 4, y: 2 } },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', isHub: false, isTerminal: false, position: { x: 3, y: 2 } },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng Tám', isHub: false, isTerminal: false, position: { x: 3, y: 3 } },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', isHub: false, isTerminal: false, position: { x: 2, y: 3 } },
  { id: 'pasteur', name: 'Pasteur', isHub: false, isTerminal: false, position: { x: 2, y: 4 } },
  { id: 'vo-thi-sau', name: 'Võ Thị Sáu', isHub: false, isTerminal: false, position: { x: 1, y: 4 } },
  { id: 'nam-ky-khoi-nghia', name: 'Nam Kỳ Khởi Nghĩa', isHub: false, isTerminal: false, position: { x: 1, y: 5 } },
  { id: 'nguyen-van-troi', name: 'Nguyễn Văn Trỗi', isHub: false, isTerminal: false, position: { x: 0, y: 5 } },
  { id: 'phan-dinh-giot', name: 'Phan Đình Giót', isHub: false, isTerminal: false, position: { x: 0, y: 6 } },
  { id: 'truong-son', name: 'Trường Sơn', isHub: false, isTerminal: false, position: { x: 0, y: 7 } },
  { id: 'sgn-t3', name: 'SGN T3', isHub: true, isTerminal: true, position: { x: 0, y: 8 } },
];
```

- [ ] **Step 2: Add return stops**

```typescript
export const returnStops: BusStop[] = [
  { id: 'sgn-t3', name: 'SGN T3', isHub: true, isTerminal: true, position: { x: 0, y: 0 } },
  { id: 'truong-son', name: 'Trường Sơn', isHub: false, isTerminal: false, position: { x: 1, y: 0 } },
  { id: 'tran-quoc-hoan', name: 'Trần Quốc Hoàn', isHub: false, isTerminal: false, position: { x: 2, y: 0 } },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', isHub: false, isTerminal: false, position: { x: 3, y: 0 } },
  { id: 'nguyen-van-troi-r', name: 'Nguyễn Văn Trỗi', isHub: false, isTerminal: false, position: { x: 4, y: 0 } },
  { id: 'nam-ky-khoi-nghia-r', name: 'Nam Kỳ Khởi Nghĩa', isHub: false, isTerminal: false, position: { x: 4, y: 1 } },
  { id: 'ham-nghi', name: 'Hàm Nghi', isHub: false, isTerminal: false, position: { x: 4, y: 2 } },
  { id: 'ben-thanh-r', name: 'Bến Thành', isHub: true, isTerminal: false, position: { x: 4, y: 3 } },
  { id: 'tran-hung-dao-r', name: 'Trần Hưng Đạo', isHub: false, isTerminal: false, position: { x: 3, y: 3 } },
  { id: 'nguyen-van-cu-r', name: 'Nguyễn Văn Cừ', isHub: false, isTerminal: false, position: { x: 2, y: 3 } },
  { id: 'duong-ba-trac-r', name: 'Dương Bá Trạc', isHub: false, isTerminal: false, position: { x: 1, y: 3 } },
  { id: 'duong-9a-r', name: 'Đường 9A', isHub: false, isTerminal: false, position: { x: 1, y: 4 } },
  { id: 'kdc-trung-son-r', name: 'KDC Trung Sơn', isHub: false, isTerminal: true, position: { x: 1, y: 5 } },
];
```

- [ ] **Step 3: Export combined data**

```typescript
export const BUS_152_STOPS = {
  outbound: outboundStops,
  return: returnStops,
};
```

- [ ] **Step 4: Commit**

```bash
git add web/src/components/RouteMap/Bus152Stops.ts
git commit -m "feat: add Bus 152 stops data for both directions"
```

---

## Task 3: Create RouteMap CSS Module

**Files:**
- Create: `web/src/components/RouteMap/RouteMap.module.css`
- Modified: N/A

- [ ] **Step 1: Create CSS with design tokens**

```css
.root {
  --brand-primary: #F97316;
  --brand-dark: #EA580C;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --bg-surface: #FFFFFF;
  --bg-muted: #F8FAFC;
  
  --stop-size-base: 12px;
  --stop-size-hub: 16px;
  --stop-size-destination: 20px;
  --line-stroke-width: 3px;
  --vertical-gap: 48px;
}

.wrapper {
  background: var(--bg-surface);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
}

.expandButton {
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-muted);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.expandButton:hover {
  background: #EEF2F7;
}

.expandButton svg {
  transition: transform 0.3s;
}

.expandButton[data-expanded="true"] svg {
  transform: rotate(180deg);
}

.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.content[data-expanded="true"] {
  max-height: 600px;
}

.directionToggle {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid #E2E8F0;
}

.directionButton {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.directionButton[data-active="true"] {
  background: var(--brand-primary);
  color: white;
  border: none;
}

.directionButton[data-active="false"] {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid #E2E8F0;
}

.mapContainer {
  padding: 24px;
  overflow-x: auto;
}

.svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 200px;
}

.stopDot {
  fill: var(--brand-primary);
  transition: r 0.2s;
}

.stopDotHub {
  fill: white;
  stroke: var(--brand-primary);
  stroke-width: 2;
}

.stopDotTerminal {
  fill: var(--brand-dark);
}

.stopDotDestination {
  fill: var(--brand-primary);
  animation: pulse 2s ease-in-out infinite;
}

.stopLine {
  stroke: var(--brand-primary);
  stroke-width: var(--line-stroke-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.stopLineAnimated {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawLine 0.8s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

.stopLabel {
  font-size: 13px;
  fill: var(--text-primary);
  font-weight: 500;
}

.stopLabelHub {
  font-size: 14px;
  font-weight: 600;
  fill: var(--text-primary);
}

@media (max-width: 480px) {
  .stopLabel {
    font-size: 11px;
  }
  
  .stopLabelHub {
    font-size: 12px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add web/src/components/RouteMap/RouteMap.module.css
git commit -m "feat: add RouteMap styles with animations"
```

---

## Task 4: Create RouteMap Component

**Files:**
- Create: `web/src/components/RouteMap/RouteMap.tsx`
- Test: N/A (visual component)

- [ ] **Step 1: Create RouteMap.tsx with SVG rendering**

```typescript
import React, { useMemo } from 'react';
import { RouteMapProps } from './types';
import { BUS_152_STOPS } from './Bus152Stops';
import styles from './RouteMap.module.css';

const UNIT = 60; // pixels per grid unit
const PADDING = 50;

export const RouteMap: React.FC<RouteMapProps> = ({
  direction,
  selectedStopId,
  onDirectionChange,
}) => {
  const stops = direction === 'outbound' ? BUS_152_STOPS.outbound : BUS_152_STOPS.return;
  
  const { pathD, dots } = useMemo(() => {
    // Calculate SVG path connecting all stops
    const pathPoints = stops.map(s => ({
      x: PADDING + s.position.x * UNIT,
      y: PADDING + s.position.y * UNIT,
    }));
    
    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      
      // Horizontal then vertical (or vice versa)
      if (prev.y !== curr.y) {
        d += ` L ${prev.x} ${curr.y}`;
      }
      d += ` L ${curr.x} ${curr.y}`;
    }
    
    // Create dot data with calculated positions
    const dots = stops.map((stop, idx) => ({
      ...stop,
      x: pathPoints[idx].x,
      y: pathPoints[idx].y,
      isSelected: stop.id === selectedStopId,
    }));
    
    return { pathD: d, dots };
  }, [stops, selectedStopId]);
  
  // Calculate SVG dimensions
  const maxX = Math.max(...dots.map(d => d.x));
  const maxY = Math.max(...dots.map(d => d.y));
  const width = maxX + PADDING + 120; // Extra for labels
  const height = maxY + PADDING;
  
  return (
    <div className={styles.wrapper}>
      <button 
        className={styles.expandButton}
        onClick={() => onDirectionChange(direction === 'outbound' ? 'return' : 'outbound')}
      >
        {direction === 'outbound' ? 'Hướng đi: KDC Trung Sơn → SGN T3' : 'Hướng về: SGN T3 → KDC Trung Sơn'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div className={styles.content} data-expanded={true}>
        <div className={styles.directionToggle}>
          <button 
            className={styles.directionButton}
            data-active={direction === 'outbound'}
            onClick={() => onDirectionChange('outbound')}
          >
            Hướng đi
          </button>
          <button 
            className={styles.directionButton}
            data-active={direction === 'return'}
            onClick={() => onDirectionChange('return')}
          >
            Hướng về
          </button>
        </div>
        
        <div className={styles.mapContainer}>
          <svg 
            className={styles.svg}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Animated path */}
            <path 
              d={pathD} 
              className={`${styles.stopLine} ${styles.stopLineAnimated}`}
            />
            
            {/* Stop dots and labels */}
            {dots.map((dot, idx) => {
              const dotSize = dot.isSelected 
                ? 10 // will scale with animation
                : dot.isHub || dot.isTerminal 
                  ? 8 
                  : 6;
              
              let dotClass = styles.stopDot;
              if (dot.isSelected) dotClass = styles.stopDotDestination;
              else if (dot.isTerminal) dotClass = styles.stopDotTerminal;
              else if (dot.isHub) dotClass = styles.stopDotHub;
              
              // Position label to the right for left-side stops, left for right-side
              const labelX = dot.x > width / 2 ? dot.x - 8 : dot.x + 8;
              const labelAnchor = dot.x > width / 2 ? 'end' : 'start';
              
              return (
                <g key={dot.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.isSelected ? 10 : dotSize}
                    className={dotClass}
                    style={{ 
                      transformOrigin: `${dot.x}px ${dot.y}px`,
                      animation: dot.isSelected ? 'pulse 2s ease-in-out infinite' : undefined
                    }}
                  />
                  <text
                    x={labelX}
                    y={dot.y + 4}
                    textAnchor={labelAnchor}
                    className={dot.isHub ? styles.stopLabelHub : styles.stopLabel}
                  >
                    {dot.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create index.ts**

```typescript
export { RouteMap } from './RouteMap';
export type { RouteMapProps, BusStop, RouteDirection } from './types';
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/RouteMap/RouteMap.tsx web/src/components/RouteMap/index.ts
git commit -m "feat: add RouteMap component with SVG metro-style visualization"
```

---

## Task 5: Integrate RouteMap into ResultPage

**Files:**
- Modify: `web/src/components/Result/ResultPage.tsx`
- Modify: `web/src/components/Result/ResultPage.module.css`

- [ ] **Step 1: Read current ResultPage.tsx**

Read the file to understand current structure and imports.

- [ ] **Step 2: Add state for route direction**

```typescript
const [routeDirection, setRouteDirection] = useState<'outbound' | 'return'>('outbound');
```

- [ ] **Step 3: Add RouteMap import**

```typescript
import { RouteMap } from '../RouteMap';
```

- [ ] **Step 4: Find where to add RouteMap (after bus card)**

Find the section where bus recommendation is displayed, add RouteMap below:

```typescript
{result.bus && (
  <>
    <div className={styles.busCard}>
      {/* existing bus card content */}
    </div>
    <RouteMap 
      direction={routeDirection}
      selectedStopId={getDestinationStopId(formData.destination)}
      onDirectionChange={setRouteDirection}
    />
  </>
)}
```

- [ ] **Step 5: Create helper function to map destination to stopId**

```typescript
const destinationToStopMap: Record<string, string> = {
  'ben-thanh': 'ben-thanh',
  'le-lai': 'le-lai',
  'tran-hung-dao': 'tran-hung-dao',
  'nguyen-van-cu': 'nguyen-van-cu',
  'sgn-t3': 'sgn-t3',
};

const getDestinationStopId = (destination: string | null): string | undefined => {
  if (!destination) return undefined;
  return destinationToStopMap[destination];
};
```

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Result/ResultPage.tsx
git commit -m "feat: integrate RouteMap into ResultPage"
```

---

## Task 6: Add Expandable Behavior

**Files:**
- Modify: `web/src/components/RouteMap/RouteMap.tsx`

- [ ] **Step 1: Add collapsed/expanded state**

```typescript
const [isExpanded, setIsExpanded] = useState(false);
```

- [ ] **Step 2: Toggle expand on button click**

```typescript
<button 
  className={styles.expandButton}
  onClick={() => setIsExpanded(!isExpanded)}
  data-expanded={isExpanded}
>
  Xem lộ trình tuyến 152
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</button>
```

- [ ] **Step 3: Apply collapsed state to content**

```typescript
<div className={styles.content} data-expanded={isExpanded}>
```

- [ ] **Step 4: Reset animation when expanding**

Add key prop to SVG to trigger animation replay:

```typescript
<svg 
  key={isExpanded ? 'expanded' : 'collapsed'}
  ...
/>
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/RouteMap/RouteMap.tsx
git commit -m "feat: add expandable behavior to RouteMap"
```

---

## Task 7: Verify Build and Test

**Files:**
- N/A

- [ ] **Step 1: Run TypeScript check**

```bash
cd web && npx tsc --noEmit
```

- [ ] **Step 2: Run dev server and verify visually**

```bash
cd web && npm run dev
```

- [ ] **Step 3: Test all states**

- [ ] Expand/collapse works
- [ ] Direction toggle switches routes
- [ ] Animation plays on expand
- [ ] Mobile responsive

- [ ] **Step 4: Commit any fixes**

---

## Self-Review Checklist

- [ ] Spec coverage: All 10 design questions addressed
- [ ] No placeholders (TBD, TODO)
- [ ] Type consistency: Props flow correctly between tasks
- [ ] TDD: Tests mentioned for external behavior only
- [ ] Vietnamese text: All UI labels in Vietnamese

---

## Execution Options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?
