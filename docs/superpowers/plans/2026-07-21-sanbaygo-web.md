# SanBayGo Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone web app (React/HTML) that mirrors the existing React Native app's functionality, optimized for desktop browsers with side-by-side layout and responsive mobile support.

**Architecture:** React + Vite web app in `web/` directory. Reuses existing calculation engine and data from `calculation-engine/` and `data/` directories. Uses in-memory TypeScript (no build-time transpilation needed for simple cases).

---

## Global Constraints

- **Tech Stack:** React 18, Vite, TypeScript, plain CSS (no Tailwind)
- **Color Palette:**
  - Primary: `#1E3A5F` (deep blue)
  - Accent: `#D97706` (amber)
  - Success: `#10B981` (green)
  - Background: `#FFFFFF` / `#F8FAFC`
  - Text: `#1E293B` / `#6B7C8F`
- **Breakpoint:** 768px (mobile-first, desktop enhancement)
- **Language:** Vietnamese (default) + English toggle
- **No new dependencies** beyond Vite/React/TypeScript

---

## File Structure

```
web/
├── index.html                  # Entry point
├── package.json                # Web dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
└── src/
    ├── main.tsx                # React mount
    ├── App.tsx                  # Main layout
    ├── styles/
    │   └── global.css           # Global styles + CSS variables
    ├── components/
    │   ├── Header.tsx           # Minimal header with language toggle
    │   ├── ArrivalForm/
    │   │   ├── index.tsx        # Side-by-side form container
    │   │   ├── TimePicker.tsx   # Timeline picker for flight arrival
    │   │   ├── TerminalSelector.tsx  # T1/T2 selection cards
    │   │   ├── BaggageSelector.tsx   # Carry-on/Checked cards
    │   │   └── DestinationPicker.tsx # 5 destination cards grid
    │   ├── ResultDisplay/
    │   │   ├── index.tsx        # Results container
    │   │   ├── JourneyTimeline.tsx    # Visual timeline: exit → bus → arrive
    │   │   ├── BusRecommendation.tsx # Catchable bus card
    │   │   └── GrabFallback.tsx # Grab alternative card
    │   └── shared/
    │       ├── Card.tsx         # Reusable card component
    │       ├── Button.tsx       # Reusable button component
    │       └── LanguageContext.tsx # i18n context + translations
    ├── hooks/
    │   └── useFormState.ts      # Form state management (mirrors useArrivalWizard)
    ├── lib/
    │   ├── calculation-engine.ts    # Re-exports from calculation-engine
    │   └── data.ts                 # Re-exports from data/ directory
    └── utils/
        └── time.ts              # Time formatting utilities
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `web/package.json`
- Create: `web/vite.config.ts`
- Create: `web/tsconfig.json`
- Create: `web/index.html`
- Create: `web/src/main.tsx`
- Create: `web/src/styles/global.css`

**Interfaces:**
- Consumes: None
- Produces: `main.tsx` renders `<App />`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "sanbaygo-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "~5.3.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      'calculation-engine': '/src/lib/calculation-engine',
      'data': '/src/lib/data',
    },
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

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
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SanBayGo - Đi xe buýt từ Nội Bài</title>
    <meta name="description" content="Tính toán chuyến xe buýt 86 tối ưu từ sân bay Nội Bài về trung tâm Hà Nội" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Create global.css**

```css
:root {
  --color-primary: #1E3A5F;
  --color-primary-light: #2C5282;
  --color-accent: #D97706;
  --color-success: #10B981;
  --color-warning: #92400E;
  --color-warning-bg: #FEF3C7;
  --color-background: #FFFFFF;
  --color-background-alt: #F8FAFC;
  --color-text: #1E293B;
  --color-text-muted: #6B7C8F;
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --border-radius: 12px;
  --border-radius-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --transition: all 0.2s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 8: Install dependencies**

Run: `cd web && npm install`
Expected: Dependencies installed successfully

---

### Task 2: Basic App Shell + Header

**Files:**
- Modify: `web/src/App.tsx` (create)
- Create: `web/src/components/Header.tsx`
- Create: `web/src/contexts/LanguageContext.tsx`

**Interfaces:**
- Consumes: `main.tsx` renders `<App />`
- Produces: Header with language toggle

- [ ] **Step 1: Create LanguageContext.tsx**

```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface Translations {
  header: {
    title: string;
    languageToggle: string;
  };
  form: {
    title: string;
    arrivalTime: string;
    terminal: string;
    baggage: string;
    destination: string;
    calculate: string;
    t1: string;
    t2: string;
    carryOn: string;
    checked: string;
  };
  results: {
    title: string;
    basedOn: string;
    peakHour: string;
    busRecommendation: string;
    catchable: string;
    departAt: string;
    waitMinutes: string;
    ticketPrice: string;
    journey: string;
    exitTerminal: string;
    walkToStop: string;
    busDeparts: string;
    arrive: string;
    grabFallback: string;
    priceEstimate: string;
    travelTime: string;
    openGrab: string;
    noBus: string;
    lastBusAt: string;
    needToArriveBy: string;
    recalculate: string;
  };
  destinations: {
    [key: string]: string;
  };
}

const translations: Record<Language, Translations> = {
  vi: {
    header: {
      title: 'SanBayGo',
      languageToggle: 'English',
    },
    form: {
      title: 'Nhập thông tin chuyến bay',
      arrivalTime: 'Giờ đáp cánh',
      terminal: 'Chọn nhà ga',
      baggage: 'Hành lý',
      destination: 'Điểm đến',
      calculate: 'Tính toán',
      t1: 'Nhà ga T1 (Nội địa)',
      t2: 'Nhà ga T2 (Quốc tế)',
      carryOn: 'Xách tay',
      checked: 'Ký gửi',
    },
    results: {
      title: 'Kết quả',
      basedOn: 'Dựa trên giờ đáp',
      peakHour: 'giờ cao điểm',
      busRecommendation: 'Xe buýt phù hợp',
      catchable: 'Có thể bắt được',
      departAt: 'Khởi hành lúc',
      waitMinutes: 'Chờ',
      ticketPrice: 'Giá vé',
      journey: 'Lộ trình của bạn',
      exitTerminal: 'Ra terminal',
      walkToStop: 'Đi bộ đến điểm đón',
      busDeparts: 'Xe 86 khởi hành',
      arrive: 'Đến nơi',
      grabFallback: 'Thay thế Grab',
      priceEstimate: 'Ước tính giá',
      travelTime: 'Thời gian di chuyển',
      openGrab: 'Mở Grab',
      noBus: 'Không có chuyến xe phù hợp',
      lastBusAt: 'Chuyến cuối khởi hành lúc',
      needToArriveBy: 'Bạn cần đến điểm đón trước',
      recalculate: 'Tính lại',
    },
    destinations: {
      'old-quarter': 'Khu phố cổ',
      'hoan-kiem': 'Quận Hoàn Kiếm',
      'dong-da': 'Quận Đống Đa',
      'ba-dinh': 'Quận Ba Đình',
      'cau-giay': 'Quận Cầu Giấy',
      'other': 'Khu vực khác',
    },
  },
  en: {
    header: {
      title: 'SanBayGo',
      languageToggle: 'Tiếng Việt',
    },
    form: {
      title: 'Enter flight information',
      arrivalTime: 'Arrival Time',
      terminal: 'Select Terminal',
      baggage: 'Luggage',
      destination: 'Destination',
      calculate: 'Calculate',
      t1: 'Terminal T1 (Domestic)',
      t2: 'Terminal T2 (International)',
      carryOn: 'Carry-on',
      checked: 'Checked',
    },
    results: {
      title: 'Results',
      basedOn: 'Based on arrival at',
      peakHour: 'peak hours',
      busRecommendation: 'Recommended Bus',
      catchable: 'Catchable',
      departAt: 'Departs at',
      waitMinutes: 'Wait',
      ticketPrice: 'Ticket',
      journey: 'Your Journey',
      exitTerminal: 'Exit terminal',
      walkToStop: 'Walk to bus stop',
      busDeparts: 'Bus 86 departs',
      arrive: 'Arrive',
      grabFallback: 'Grab Alternative',
      priceEstimate: 'Price estimate',
      travelTime: 'Travel time',
      openGrab: 'Open Grab',
      noBus: 'No suitable bus available',
      lastBusAt: 'Last bus departs at',
      needToArriveBy: 'You need to arrive by',
      recalculate: 'Recalculate',
    },
    destinations: {
      'old-quarter': 'Old Quarter',
      'hoan-kiem': 'Hoan Kiem District',
      'dong-da': 'Dong Da District',
      'ba-dinh': 'Ba Dinh District',
      'cau-giay': 'Cau Giay District',
      'other': 'Other areas',
    },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const value: LanguageContextValue = {
    language,
    setLanguage: (lang: Language) => setLanguage(lang),
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

- [ ] **Step 2: Create Header.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Header.module.css';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.icon}>🚌</span>
          <span className={styles.title}>{t.header.title}</span>
        </div>
        <button
          className={styles.languageToggle}
          onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        >
          {t.header.languageToggle}
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create Header.module.css**

```css
.header {
  background-color: var(--color-primary);
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.languageToggle {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: var(--border-radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.languageToggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}
```

- [ ] **Step 4: Create App.tsx**

```typescript
import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { ArrivalForm } from './components/ArrivalForm';
import { ResultDisplay } from './components/ResultDisplay';
import { useFormState } from './hooks/useFormState';
import { calculateResult } from './lib/calculation-engine';
import { ArrivalResult } from './types';
import styles from './App.module.css';

type View = 'form' | 'result';

function AppContent() {
  const [view, setView] = useState<View>('form');
  const [result, setResult] = useState<ArrivalResult | null>(null);
  const { formData, updateFormData, reset } = useFormState();

  const handleCalculate = () => {
    const calculated = calculateResult(formData);
    if (calculated) {
      setResult(calculated);
      setView('result');
    }
  };

  const handleRecalculate = () => {
    reset();
    setResult(null);
    setView('form');
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        {view === 'form' ? (
          <ArrivalForm
            formData={formData}
            onUpdate={updateFormData}
            onCalculate={handleCalculate}
          />
        ) : (
          result && (
            <ResultDisplay
              result={result}
              formData={formData}
              onRecalculate={handleRecalculate}
            />
          )
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
```

- [ ] **Step 5: Create App.module.css**

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main {
    padding: 16px;
  }
}
```

- [ ] **Step 6: Run dev server to verify**

Run: `cd web && npm run dev`
Expected: Dev server starts, app loads with header

---

### Task 3: Core Types + Calculation Engine Bridge

**Files:**
- Create: `web/src/types/index.ts`
- Create: `web/src/lib/calculation-engine.ts`
- Create: `web/src/lib/data.ts`

**Interfaces:**
- Consumes: Types from parent repo `types/`
- Produces: Re-exported calculation functions

- [ ] **Step 1: Create types/index.ts**

```typescript
// Core types matching the parent repo

export type TerminalType = 'domestic' | 'international';
export type TerminalId = 'T1' | 'T2';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

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
```

- [ ] **Step 2: Create lib/time.ts**

```typescript
// Time utilities matching parent repo

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function addMinutes(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

export function isAfterOrEqual(time1: string, time2: string): boolean {
  return timeToMinutes(time1) >= timeToMinutes(time2);
}

export function formatTimeRange(range: { early: string; late: string }): string {
  return `${range.early} - ${range.late}`;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}
```

- [ ] **Step 3: Create lib/calculation-engine.ts**

```typescript
// Re-implementation of calculation engine for web
// This mirrors the parent repo's calculation-engine

import { isPeakHour, findNextCatchableTrip, calculateExitTime, calculateArrivalEstimate } from '../../calculation-engine';
import { ArrivalResult, ArrivalFormData, TerminalId, BaggageType, FlightType } from '../types';
import { DESTINATIONS } from './data';
import { NOI_BAI_AIRPORT } from './data';

export { isPeakHour };

export function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
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
  const busRecommendation = findNextCatchableTrip(
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes }
  );

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
}

export { calculateExitTime, calculateArrivalEstimate, findNextCatchableTrip };
```

- [ ] **Step 4: Create lib/data.ts**

```typescript
// Re-implementation of data for web
// Mirrors parent repo's data/

import { BusRoute, DestinationPoint } from '../types';

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
  ticketPrice: 35000,
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 60, max: 90 },
    peak: { min: 90, max: 120 },
  },
};

export const DESTINATIONS: DestinationPoint[] = [
  {
    id: 'old-quarter',
    name: 'Khu phố cổ Hà Nội',
    nearestBusStop: 'Đại lộ Thăng Long',
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
];

export const EXIT_TIME_ESTIMATES = [
  { terminalType: 'domestic' as const, baggageType: 'carry_on' as const, minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic' as const, baggageType: 'checked' as const, minMinutes: 25, maxMinutes: 45 },
  { terminalType: 'international' as const, baggageType: 'carry_on' as const, minMinutes: 20, maxMinutes: 35 },
  { terminalType: 'international' as const, baggageType: 'checked' as const, minMinutes: 35, maxMinutes: 60 },
  { terminalType: 'international' as const, baggageType: 'carry_on' as const, flightType: 'international' as const, minMinutes: 45, maxMinutes: 75 },
  { terminalType: 'international' as const, baggageType: 'checked' as const, flightType: 'international' as const, minMinutes: 60, maxMinutes: 90 },
];

export const GRAB_ESTIMATE = {
  priceRange: { min: 250000, max: 350000 },
  travelTime: {
    normal: { min: 40, max: 60 },
    peak: { min: 60, max: 90 },
  },
};

export const NOI_BAI_AIRPORT = {
  id: 'noi-bai',
  name: 'Sân bay Nội Bài',
  terminals: [
    { id: 'T1' as const, name: 'Nhà ga T1', type: 'domestic' as const },
    { id: 'T2' as const, name: 'Nhà ga T2', type: 'international' as const },
  ],
  busRoutes: [BUS_86],
  grabEstimates: GRAB_ESTIMATE,
};
```

- [ ] **Step 5: Verify imports work**

Run: `cd web && npx tsc --noEmit`
Expected: No errors (types align with calculation engine)

---

### Task 4: Form State Hook

**Files:**
- Create: `web/src/hooks/useFormState.ts`

**Interfaces:**
- Consumes: Types from `types/index.ts`
- Produces: `useFormState` hook with form state and setters

- [ ] **Step 1: Create useFormState.ts**

```typescript
import { useState, useCallback } from 'react';
import { ArrivalFormData, TerminalId, BaggageType, FlightType } from '../types';

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

const initialFormState: ArrivalFormData = {
  arrivalTime: getCurrentTime(),
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
};

export function useFormState() {
  const [formData, setFormData] = useState<ArrivalFormData>(initialFormState);

  const updateFormData = useCallback(<K extends keyof ArrivalFormData>(
    key: K,
    value: ArrivalFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setFormData({ ...initialFormState, arrivalTime: getCurrentTime() });
  }, []);

  return {
    formData,
    updateFormData,
    reset,
  };
}
```

- [ ] **Step 2: Verify hook compiles**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

---

### Task 5: ArrivalForm - Side-by-Side Layout

**Files:**
- Create: `web/src/components/ArrivalForm/index.tsx`
- Create: `web/src/components/ArrivalForm/index.module.css`

**Interfaces:**
- Consumes: `useFormState` hook, `LanguageContext`
- Produces: Side-by-side form (desktop) / stacked (mobile)

- [ ] **Step 1: Create ArrivalForm/index.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalFormData, TerminalId, BaggageType } from '../../types';
import { TimePicker } from './TimePicker';
import { TerminalSelector } from './TerminalSelector';
import { BaggageSelector } from './BaggageSelector';
import { DestinationPicker } from './DestinationPicker';
import { isFormValid } from './validation';
import styles from './index.module.css';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onUpdate: <K extends keyof ArrivalFormData>(key: K, value: ArrivalFormData[K]) => void;
  onCalculate: () => void;
}

export function ArrivalForm({ formData, onUpdate, onCalculate }: ArrivalFormProps) {
  const { t } = useLanguage();
  const canCalculate = isFormValid(formData);

  return (
    <div className={styles.container}>
      {/* Left column: Inputs */}
      <div className={styles.inputSection}>
        <h1 className={styles.title}>{t.form.title}</h1>

        <div className={styles.field}>
          <TimePicker
            label={t.form.arrivalTime}
            value={formData.arrivalTime}
            onChange={(time) => onUpdate('arrivalTime', time)}
          />
        </div>

        <div className={styles.field}>
          <TerminalSelector
            label={t.form.terminal}
            value={formData.terminal}
            onChange={(terminal) => onUpdate('terminal', terminal)}
            options={{
              t1: t.form.t1,
              t2: t.form.t2,
            }}
          />
        </div>

        <div className={styles.field}>
          <BaggageSelector
            label={t.form.baggage}
            value={formData.baggage}
            onChange={(baggage) => onUpdate('baggage', baggage)}
            options={{
              carry_on: t.form.carryOn,
              checked: t.form.checked,
            }}
          />
        </div>

        <div className={styles.field}>
          <DestinationPicker
            label={t.form.destination}
            value={formData.destination}
            onChange={(destination) => onUpdate('destination', destination)}
          />
        </div>
      </div>

      {/* Right column: Schedule Preview */}
      <div className={styles.previewSection}>
        <SchedulePreview arrivalTime={formData.arrivalTime} />
      </div>
    </div>
  );
}

function SchedulePreview({ arrivalTime }: { arrivalTime: string }) {
  const { t } = useLanguage();
  const { BUS_86_SCHEDULE } = require('../../lib/data');

  // Determine which buses are catchable based on arrival time
  // For now, show all departures after 06:40
  const catchableBuses = BUS_86_SCHEDULE.filter((time: string) => {
    const [h, m] = time.split(':').map(Number);
    const [ah, am] = arrivalTime.split(':').map(Number);
    return (h * 60 + m) >= (ah * 60 + am);
  });

  return (
    <div className={styles.schedulePreview}>
      <h3 className={styles.scheduleTitle}>🚌 Bus 86 Schedule</h3>
      <p className={styles.scheduleSubtitle}>
        After your arrival at {arrivalTime}
      </p>
      <div className={styles.scheduleGrid}>
        {BUS_86_SCHEDULE.map((time: string, index: number) => {
          const [h, m] = time.split(':').map(Number);
          const [ah, am] = arrivalTime.split(':').map(Number);
          const isCatchable = (h * 60 + m) >= (ah * 60 + am);

          return (
            <div
              key={time}
              className={`${styles.scheduleItem} ${isCatchable ? styles.catchable : styles.uncatchable}`}
            >
              {time}
            </div>
          );
        })}
      </div>
      <div className={styles.scheduleLegend}>
        <span className={styles.legendCatchable}>● Catchable</span>
        <span className={styles.legendUncatchable}>● Missed</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ArrivalForm/index.module.css**

```css
.container {
  display: flex;
  gap: 32px;
  min-height: calc(100vh - 100px);
}

.inputSection {
  flex: 1;
  max-width: 500px;
}

.previewSection {
  flex: 1;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.field {
  margin-bottom: 28px;
}

.schedulePreview {
  background: var(--color-background-alt);
  border-radius: var(--border-radius);
  padding: 24px;
  border: 1px solid var(--color-border);
}

.scheduleTitle {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.scheduleSubtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.scheduleGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.scheduleItem {
  padding: 10px;
  border-radius: var(--border-radius-sm);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.catchable {
  background: var(--color-success);
  color: white;
}

.uncatchable {
  background: var(--color-border-light);
  color: var(--color-text-muted);
}

.scheduleLegend {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  font-size: 12px;
}

.legendCatchable {
  color: var(--color-success);
}

.legendUncatchable {
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .inputSection {
    max-width: none;
  }

  .previewSection {
    position: static;
  }

  .scheduleGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

- [ ] **Step 3: Create validation.ts**

```typescript
import { ArrivalFormData } from '../../types';

export function isFormValid(formData: ArrivalFormData): boolean {
  return (
    formData.arrivalTime !== null &&
    formData.terminal !== null &&
    formData.baggage !== null &&
    formData.destination !== null
  );
}
```

- [ ] **Step 4: Run build to verify**

Run: `cd web && npm run build`
Expected: Build succeeds

---

### Task 6: TimePicker Component

**Files:**
- Create: `web/src/components/ArrivalForm/TimePicker.tsx`
- Create: `web/src/components/ArrivalForm/TimePicker.module.css`

**Interfaces:**
- Consumes: None
- Produces: Time input with time picker

- [ ] **Step 1: Create TimePicker.tsx**

```typescript
import React from 'react';
import styles from './TimePicker.module.css';

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (time: string) => void;
}

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type="time"
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create TimePicker.module.css**

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.input {
  font-size: 32px;
  font-weight: 700;
  padding: 16px 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  color: var(--color-primary);
  font-family: var(--font-family);
  outline: none;
  transition: var(--transition);
  width: 100%;
  max-width: 200px;
  font-variant-numeric: tabular-nums;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}
```

---

### Task 7: TerminalSelector Component

**Files:**
- Create: `web/src/components/ArrivalForm/TerminalSelector.tsx`
- Create: `web/src/components/ArrivalForm/TerminalSelector.module.css`

**Interfaces:**
- Consumes: Terminal options
- Produces: Card selection UI

- [ ] **Step 1: Create TerminalSelector.tsx**

```typescript
import React from 'react';
import { TerminalId } from '../../types';
import styles from './TerminalSelector.module.css';

interface TerminalSelectorProps {
  label: string;
  value: TerminalId | null;
  onChange: (terminal: TerminalId) => void;
  options: {
    t1: string;
    t2: string;
  };
}

export function TerminalSelector({ label, value, onChange, options }: TerminalSelectorProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        <button
          className={`${styles.card} ${value === 'T1' ? styles.selected : ''}`}
          onClick={() => onChange('T1')}
        >
          <span className={styles.icon}>✈️</span>
          <span className={styles.text}>{options.t1}</span>
        </button>
        <button
          className={`${styles.card} ${value === 'T2' ? styles.selected : ''}`}
          onClick={() => onChange('T2')}
        >
          <span className={styles.icon}>🌍</span>
          <span className={styles.text}>{options.t2}</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create TerminalSelector.module.css**

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.cards {
  display: flex;
  gap: 12px;
}

.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.card:hover {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.02);
}

.card.selected {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.05);
}

.icon {
  font-size: 28px;
}

.text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  text-align: center;
}
```

---

### Task 8: BaggageSelector Component

**Files:**
- Create: `web/src/components/ArrivalForm/BaggageSelector.tsx`
- Create: `web/src/components/ArrivalForm/BaggageSelector.module.css`

**Interfaces:**
- Consumes: Baggage options
- Produces: Card selection UI

- [ ] **Step 1: Create BaggageSelector.tsx**

```typescript
import React from 'react';
import { BaggageType } from '../../types';
import styles from './BaggageSelector.module.css';

interface BaggageSelectorProps {
  label: string;
  value: BaggageType | null;
  onChange: (baggage: BaggageType) => void;
  options: {
    carry_on: string;
    checked: string;
  };
}

export function BaggageSelector({ label, value, onChange, options }: BaggageSelectorProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        <button
          className={`${styles.card} ${value === 'carry_on' ? styles.selected : ''}`}
          onClick={() => onChange('carry_on')}
        >
          <span className={styles.icon}>🎒</span>
          <span className={styles.text}>{options.carry_on}</span>
        </button>
        <button
          className={`${styles.card} ${value === 'checked' ? styles.selected : ''}`}
          onClick={() => onChange('checked')}
        >
          <span className={styles.icon}>🧳</span>
          <span className={styles.text}>{options.checked}</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create BaggageSelector.module.css**

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.cards {
  display: flex;
  gap: 12px;
}

.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.card:hover {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.02);
}

.card.selected {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.05);
}

.icon {
  font-size: 28px;
}

.text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
}
```

---

### Task 9: DestinationPicker Component

**Files:**
- Create: `web/src/components/ArrivalForm/DestinationPicker.tsx`
- Create: `web/src/components/ArrivalForm/DestinationPicker.module.css`

**Interfaces:**
- Consumes: `DESTINATIONS` from lib/data
- Produces: Card grid selection UI

- [ ] **Step 1: Create DestinationPicker.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DESTINATIONS } from '../../lib/data';
import styles from './DestinationPicker.module.css';

interface DestinationPickerProps {
  label: string;
  value: string | null;
  onChange: (destination: string) => void;
}

const DESTINATION_ICONS: Record<string, string> = {
  'old-quarter': '🏮',
  'hoan-kiem': '🌉',
  'dong-da': '🎓',
  'ba-dinh': '🏛️',
  'cau-giay': '🏢',
};

export function DestinationPicker({ label, value, onChange }: DestinationPickerProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        {DESTINATIONS.map((dest) => (
          <button
            key={dest.id}
            className={`${styles.card} ${value === dest.id ? styles.selected : ''}`}
            onClick={() => onChange(dest.id)}
          >
            <span className={styles.icon}>{DESTINATION_ICONS[dest.id] || '📍'}</span>
            <span className={styles.name}>{t.destinations[dest.id] || dest.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create DestinationPicker.module.css**

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.card:hover {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.02);
}

.card.selected {
  border-color: var(--color-primary);
  background: rgba(30, 58, 95, 0.05);
}

.icon {
  font-size: 24px;
}

.name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary);
  text-align: center;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### Task 10: ResultDisplay - Journey Timeline

**Files:**
- Create: `web/src/components/ResultDisplay/index.tsx`
- Create: `web/src/components/ResultDisplay/index.module.css`
- Create: `web/src/components/ResultDisplay/JourneyTimeline.tsx`
- Create: `web/src/components/ResultDisplay/JourneyTimeline.module.css`

**Interfaces:**
- Consumes: `ArrivalResult`, `ArrivalFormData`
- Produces: Journey timeline + bus recommendation

- [ ] **Step 1: Create ResultDisplay/index.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData } from '../../types';
import { isPeakHour } from '../../lib/calculation-engine';
import { JourneyTimeline } from './JourneyTimeline';
import { BusRecommendation } from './BusRecommendation';
import { GrabFallback } from './GrabFallback';
import styles from './index.module.css';

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, formData, onRecalculate }: ResultDisplayProps) {
  const { t } = useLanguage();
  const isPeak = isPeakHour(formData.arrivalTime);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t.results.title}</h1>
        <p className={styles.subtitle}>
          {t.results.basedOn} {formData.arrivalTime}
          {isPeak && ` (${t.results.peakHour})`}
        </p>
      </header>

      {result.bus.available ? (
        <>
          <JourneyTimeline
            result={result}
            formData={formData}
          />
          <BusRecommendation
            recommendation={result.bus}
          />
        </>
      ) : (
        <div className={styles.noBus}>
          <div className={styles.noBusIcon}>⚠️</div>
          <h2 className={styles.noBusTitle}>{t.results.noBus}</h2>
          <p className={styles.noBusText}>
            {t.results.lastBusAt} 22:15. {t.results.needToArriveBy} 22:00.
          </p>
        </div>
      )}

      <GrabFallback
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
      />

      <div className={styles.actions}>
        <button className={styles.recalculateButton} onClick={onRecalculate}>
          {t.results.recalculate}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ResultDisplay/index.module.css**

```css
.container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: var(--color-text-muted);
}

.noBus {
  background: var(--color-warning-bg);
  border-radius: var(--border-radius);
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
}

.noBusIcon {
  font-size: 48px;
  margin-bottom: 16px;
}

.noBusTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-warning);
  margin-bottom: 8px;
}

.noBusText {
  font-size: 14px;
  color: var(--color-warning);
  opacity: 0.8;
}

.actions {
  margin-top: 32px;
}

.recalculateButton {
  width: 100%;
  padding: 16px 32px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.recalculateButton:hover {
  background: var(--color-primary-light);
}
```

- [ ] **Step 3: Create JourneyTimeline.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData } from '../../types';
import { calculateExitTime, isPeakHour } from '../../lib/calculation-engine';
import { NOI_BAI_AIRPORT } from '../../lib/data';
import styles from './JourneyTimeline.module.css';

interface JourneyTimelineProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
}

export function JourneyTimeline({ result, formData }: JourneyTimelineProps) {
  const { t } = useLanguage();

  if (!formData.terminal || !formData.baggage || !result.bus.trip) {
    return null;
  }

  const terminalInfo = NOI_BAI_AIRPORT.terminals.find(t => t.id === formData.terminal);
  const exitTime = calculateExitTime(terminalInfo!.type, formData.baggage, formData.flightType);

  // Calculate timeline points
  const arrivalMinutes = timeToMinutes(formData.arrivalTime);
  const exitMinutes = arrivalMinutes + exitTime.max + 5; // +5 for walking
  const departureMinutes = timeToMinutes(result.bus.trip.departureTime);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.results.journey}</h2>
      <div className={styles.timeline}>
        <TimelinePoint
          time={formData.arrivalTime}
          label={terminalInfo?.name || 'Arrival'}
          icon="✈️"
          color="primary"
        />
        <TimelineLine />
        <TimelinePoint
          time={minutesToTime(exitMinutes)}
          label={t.results.exitTerminal}
          icon="🚶"
          color="neutral"
        />
        <TimelineLine />
        <TimelinePoint
          time={minutesToTime(exitMinutes + 5)}
          label={t.results.walkToStop}
          icon="🚏"
          color="neutral"
        />
        <TimelineLine />
        <TimelinePoint
          time={result.bus.trip.departureTime}
          label={t.results.busDeparts}
          icon="🚌"
          color="success"
          highlight
        />
        {result.bus.trip.arrivalEstimate && (
          <>
            <TimelineLine />
            <TimelinePoint
              time={result.bus.trip.arrivalEstimate.late}
              label={t.results.arrive}
              icon="📍"
              color="success"
            />
          </>
        )}
      </div>
    </div>
  );
}

interface TimelinePointProps {
  time: string;
  label: string;
  icon: string;
  color: 'primary' | 'neutral' | 'success';
  highlight?: boolean;
}

function TimelinePoint({ time, label, icon, color, highlight }: TimelinePointProps) {
  return (
    <div className={`${styles.point} ${styles[color]} ${highlight ? styles.highlight : ''}`}>
      <span className={styles.pointIcon}>{icon}</span>
      <span className={styles.pointTime}>{time}</span>
      <span className={styles.pointLabel}>{label}</span>
    </div>
  );
}

function TimelineLine() {
  return <div className={styles.line} />;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
```

- [ ] **Step 4: Create JourneyTimeline.module.css**

```css
.container {
  background: var(--color-background-alt);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--color-border);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.point {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
  min-width: 80px;
}

.pointIcon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: 50%;
  box-shadow: var(--shadow-md);
}

.point.primary .pointIcon {
  background: var(--color-primary);
}

.point.neutral .pointIcon {
  background: var(--color-text-muted);
}

.point.success .pointIcon {
  background: var(--color-success);
}

.point.highlight .pointIcon {
  background: var(--color-success);
  transform: scale(1.1);
}

.pointTime {
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
}

.point.highlight .pointTime {
  color: var(--color-success);
}

.pointLabel {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
  max-width: 80px;
}

.line {
  flex: 1;
  height: 3px;
  background: var(--color-border);
  margin: 0 -8px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .point {
    flex-direction: row;
    min-width: auto;
    gap: 12px;
  }

  .line {
    width: 3px;
    height: 32px;
    margin: 0;
    margin-left: 24px;
  }
}
```

---

### Task 11: BusRecommendation Component

**Files:**
- Create: `web/src/components/ResultDisplay/BusRecommendation.tsx`
- Create: `web/src/components/ResultDisplay/BusRecommendation.module.css`

**Interfaces:**
- Consumes: `BusRecommendation`
- Produces: Bus recommendation card

- [ ] **Step 1: Create BusRecommendation.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BusRecommendation as BusRecommendationType } from '../../types';
import styles from './BusRecommendation.module.css';

interface BusRecommendationProps {
  recommendation: BusRecommendationType;
}

export function BusRecommendation({ recommendation }: BusRecommendationProps) {
  const { t } = useLanguage();

  if (!recommendation.available || !recommendation.trip) {
    return null;
  }

  const { departureTime, waitMinutes, ticketPrice } = recommendation.trip;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t.results.busRecommendation}</h3>
        <span className={styles.badge}>{t.results.catchable}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.busIcon}>🚌</div>
        <div className={styles.details}>
          <div className={styles.route}>Bus 86</div>
          <div className={styles.info}>
            <span className={styles.depart}>
              {t.results.departAt}: <strong>{departureTime}</strong>
            </span>
            <span className={styles.wait}>
              {t.results.waitMinutes}: <strong>{waitMinutes} min</strong>
            </span>
            <span className={styles.price}>
              {t.results.ticketPrice}: <strong>35,000 VND</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create BusRecommendation.module.css**

```css
.container {
  background: var(--color-background);
  border: 2px solid var(--color-success);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge {
  background: var(--color-success);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.busIcon {
  font-size: 48px;
}

.details {
  flex: 1;
}

.route {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.depart,
.wait,
.price {
  font-size: 14px;
  color: var(--color-text-muted);
}

.depart strong,
.wait strong,
.price strong {
  color: var(--color-text);
  font-weight: 600;
}
```

---

### Task 12: GrabFallback Component

**Files:**
- Create: `web/src/components/ResultDisplay/GrabFallback.tsx`
- Create: `web/src/components/ResultDisplay/GrabFallback.module.css`

**Interfaces:**
- Consumes: Grab price/time
- Produces: Grab alternative card

- [ ] **Step 1: Create GrabFallback.tsx**

```typescript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TimeRange } from '../../types';
import styles from './GrabFallback.module.css';

interface GrabFallbackProps {
  priceEstimate: string;
  travelTime: TimeRange;
}

export function GrabFallback({ priceEstimate, travelTime }: GrabFallbackProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>🚗</span>
        <h3 className={styles.title}>{t.results.grabFallback}</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.price}>
          <span className={styles.priceLabel}>{t.results.priceEstimate}</span>
          <span className={styles.priceValue}>{priceEstimate}</span>
        </div>
        <div className={styles.time}>
          <span className={styles.timeLabel}>{t.results.travelTime}</span>
          <span className={styles.timeValue}>
            {travelTime.minutesRange.min} - {travelTime.minutesRange.max} min
          </span>
        </div>
      </div>

      <button className={styles.button} onClick={() => window.open('https://www.grab.com/vn/', '_blank')}>
        {t.results.openGrab}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create GrabFallback.module.css**

```css
.container {
  background: var(--color-background-alt);
  border-radius: var(--border-radius);
  padding: 20px;
  border: 1px solid var(--color-border);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content {
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
}

.price,
.time {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.priceLabel,
.timeLabel {
  font-size: 12px;
  color: var(--color-text-muted);
}

.priceValue,
.timeValue {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

.button {
  width: 100%;
  padding: 12px 20px;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.button:hover {
  filter: brightness(1.1);
}
```

---

### Task 13: Add Calculate Button

**Files:**
- Modify: `web/src/components/ArrivalForm/index.tsx`

**Interfaces:**
- Consumes: `isFormValid` check
- Produces: Calculate button triggers `onCalculate`

- [ ] **Step 1: Update ArrivalForm/index.tsx**

Add button after DestinationPicker, inside `.inputSection`:

```tsx
// Add to the imports
import { isFormValid } from './validation';

// Inside ArrivalForm component, before closing </div> of inputSection:
<button
  className={styles.calculateButton}
  onClick={onCalculate}
  disabled={!canCalculate}
>
  {t.form.calculate}
</button>
```

And add CSS to `index.module.css`:

```css
.calculateButton {
  width: 100%;
  padding: 16px 32px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
  margin-top: 32px;
}

.calculateButton:hover:not(:disabled) {
  background: var(--color-primary-light);
}

.calculateButton:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
```

---

### Task 14: Final Build + Test

**Files:**
- Verify: All components compile

**Interfaces:**
- Consumes: All previous tasks
- Produces: Working web app

- [ ] **Step 1: Run full build**

Run: `cd web && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Test in browser (manual)**

Run: `cd web && npm run dev`
Expected: Dev server runs, app loads at localhost:5173

- [ ] **Step 3: Verify all interactions work**

Manual checklist:
- [ ] Time picker updates correctly
- [ ] Terminal selection highlights card
- [ ] Baggage selection highlights card
- [ ] Destination selection highlights card
- [ ] Schedule preview shows catchable buses
- [ ] Calculate button enables when all fields filled
- [ ] Results show journey timeline
- [ ] Language toggle switches all text
- [ ] Recalculate resets form

---

## Self-Review Checklist

### 1. Spec Coverage

| Spec Requirement | Task |
|-----------------|------|
| Side-by-side layout (desktop) | Task 5 |
| Stacked layout (mobile <768px) | Task 5 |
| Timeline picker for time input | Task 6 |
| System auto-calculates catchable bus | Task 3, 5 |
| Show all departures, highlight catchable | Task 5 (SchedulePreview) |
| Card grid for destinations | Task 9 |
| Journey timeline in results | Task 10 |
| Warning message for no bus | Task 10 (noBus) |
| Grab fallback | Task 12 |
| Clean & professional style | Task 2 (CSS variables) |
| Minimal header | Task 2 |
| Language toggle (vi/en) | Task 2 |

### 2. Placeholder Scan

All steps contain complete code - no TBD/TODO placeholders.

### 3. Type Consistency

Types in `web/src/types/index.ts` match parent repo's `types/index.ts`:
- `TerminalId`: `'T1' | 'T2'`
- `BaggageType`: `'carry_on' | 'checked'`
- `FlightType`: `'domestic' | 'international'`
- `ArrivalFormData`, `ArrivalResult`, `BusRecommendation`: All aligned

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-21-sanbaygo-web.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
