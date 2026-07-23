# Glassmorphism + Warm-Palette Result Screens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a tokenized glassmorphism design system with a warm color palette to the result screens on both RN and web, and bring the Vehicle Comparison feature (6 transport options with sort toggle) to RN.

**Architecture:** Stand up a new top-level `design-system/` module parallel to `core/` with token primitives (JSON), a CSS-vars adapter (web) and a typed-object adapter (RN). All Vietnamese copy on RN comes from a single typed string table; web continues to use the existing `useLanguage()` vi/en `LanguageContext`. Glass tiers 1/2/3 provide three translucent surface densities. RN has no `backdrop-filter`, so cards use a static warm background (no new dependency) plus translucent panel backgrounds for the glass effect.

**Tech Stack:** React Native (Expo SDK 52), Vite + React + TypeScript, ts-jest, `@testing-library/react-native` (RN) + `@testing-library/react` (web), Google Fonts (Cormorant Garamond + Inter).

## Global Constraints

- **Vietnamese-only RN text.** Per AGENTS.md. All RN copy comes from `design-system/copy/result-display.vi.ts`. Web preserves vi/en via existing `web/src/contexts/LanguageContext.tsx`.
- **No new persistent state in RN.** Sort preference persists in web only (existing `localStorage`).
- **No new calculation logic.** Vehicle Comparison calc **moves** from `web/src/lib/transport-calculator.ts` into `core/calculation-engine/calculateTripComparison.ts`; behavior unchanged.
- **No new dependencies unless absolutely necessary.** No `expo-linear-gradient` (use a static warm background); no `module-resolver` Babel plugin (use tsconfig paths + Metro `resolver.alias`).
- **Body text ≥ 16 px.** All numeric sizes come from `fontSize` tokens; minimum `body = 16px` enforced by token tests.
- **Motion ≤ 200 ms.** Web uses 150 ms transitions; RN has no per-card motion. `@media (prefers-reduced-motion: reduce)` overrides disable blur and transitions.
- **Glass fallback for low-end Android:** `glass.1/2/3` backgrounds are opaque enough (0.55/0.62/0.72) that text remains readable even if blur is not supported.
- **No new `@core` API surface.** `@core` gains one new export (`calculateTripComparison`, `sortComparisons`) by relocation from web; no type changes.
- **No emojis as functional icons** (decorative only).
- **Single source of truth for tokens:** `design-system/tokens/tokens.json`; CSS-vars and RN adapter both derive from it.
- **Glassmorphism anti-patterns encoded in tests:** no neon cyan, no AI-cliché purple/pink, body font is sans, body text ≥ 16px.

---

## File Structure

Files created or modified by this plan:

| Path | Owner | Purpose |
|---|---|---|
| `design-system/` (root) | NEW | Token + primitive + copy module, parallel to `core/` |
| `design-system/tokens/tokens.json` | NEW | Single source of truth for tokens |
| `design-system/tokens/index.ts` | NEW | RN typed adapter (re-exports JSON as `ds`) |
| `design-system/tokens/index.css` | NEW | Web CSS-vars adapter |
| `design-system/primitives/ResultCard.tsx` | NEW | RN glass-tier container |
| `design-system/primitives/ResultCard.web.tsx` | NEW | Web `<div>` glass-tier container |
| `design-system/primitives/ResultCard.module.css` | NEW | Glass tiers, hover, prefers-reduced-motion |
| `design-system/copy/result-display.vi.ts` | NEW | All Vietnamese strings (typed) |
| `design-system/MASTER.md` | NEW | Mood + palette + anti-patterns |
| `design-system/tests/tokens.test.ts` | NEW | Pin warm palette, glass tiers, anti-patterns |
| `core/calculation-engine/calculateTripComparison.ts` | NEW (relocated) | Trip comparison logic |
| `core/calculation-engine/transport-data.ts` | NEW (relocated) | Static transport options |
| `core/calculation-engine/sortComparisons.ts` | NEW (relocated) | Sort helper |
| `core/tests/calculation-engine/calculateTripComparison.test.ts` | NEW (relocated) | Trip comparison tests |
| `core/calculation-engine/index.ts` | MODIFY | Re-export the three new modules |
| `web/src/lib/transport-calculator.ts` | DELETE | Replaced by `@core/calculateTripComparison` |
| `web/src/lib/transport-data.ts` | DELETE | Replaced by `@core/transport-data` |
| `web/src/lib/api/calculate-trip.ts` | MODIFY | Re-export from `@core` |
| `web/src/components/ResultDisplay/index.tsx` | MODIFY | Use tokens, glass tier, `useLanguage` |
| `web/src/components/ResultDisplay/index.module.css` | MODIFY | Replace hex with CSS-vars |
| `web/src/components/ResultDisplay/JourneyTimeline.tsx` | MODIFY | Use tokens + glass tier 2 |
| `web/src/components/ResultDisplay/JourneyTimeline.module.css` | MODIFY | CSS-vars |
| `web/src/components/ResultDisplay/BusRecommendation.tsx` | MODIFY | Use tokens + glass tier 3 + ResultCard |
| `web/src/components/ResultDisplay/BusRecommendation.module.css` | MODIFY | CSS-vars |
| `web/src/components/ResultDisplay/GrabFallback.tsx` | MODIFY | Use tokens + glass tier 1 |
| `web/src/components/ResultDisplay/GrabFallback.module.css` | MODIFY | CSS-vars |
| `web/src/components/VehicleComparison/index.tsx` | MODIFY | Use tokens, switch to `@core/calculateTripComparison` |
| `web/src/components/VehicleComparison/index.module.css` | MODIFY | CSS-vars |
| `web/src/components/VehicleComparison/SortToggle.tsx` | MODIFY | Use tokens |
| `web/src/components/VehicleComparison/SortToggle.module.css` | MODIFY | CSS-vars |
| `web/src/components/VehicleComparison/VehicleCard.tsx` | MODIFY | Use tokens + ResultCard.web |
| `web/src/components/VehicleComparison/VehicleCard.module.css` | MODIFY | CSS-vars |
| `web/src/contexts/LanguageContext.tsx` | MODIFY | Add `result.*` keys |
| `web/index.html` | MODIFY | Preload Cormorant Garamond + Inter |
| `web/src/main.tsx` | MODIFY | Import `@design-system/tokens/index.css` |
| `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` | NEW | Render test, asserts 4 cards present |
| `app/index.tsx` | MODIFY | Wrap in warm background |
| `components/ResultDisplay/index.tsx` | MODIFY | Use tokens + copy table |
| `components/ResultDisplay/BusRecommendation.tsx` | MODIFY | Use tokens + ResultCard |
| `components/ResultDisplay/GrabFallback.tsx` | MODIFY | Use tokens + ResultCard |
| `components/ResultDisplay/DirectionGuide.tsx` | MODIFY | Use tokens + ResultCard |
| `components/VehicleComparison/index.tsx` | NEW | RN port of VehicleComparison |
| `components/VehicleComparison/SortToggle.tsx` | NEW | RN sort toggle |
| `components/VehicleComparison/VehicleCard.tsx` | NEW | RN vehicle card |
| `components/VehicleComparison/transportIcons.ts` | NEW | Type→emoji map |
| `tests/components/ResultDisplay/ResultDisplay.test.tsx` | NEW | RN render tests |
| `tests/components/VehicleComparison/VehicleComparison.test.tsx` | NEW | RN vehicle comparison tests |
| `tsconfig.json` | MODIFY | Add `@design-system` paths |
| `metro.config.js` | NEW | Metro alias for `@design-system` |
| `web/tsconfig.json` | MODIFY | Add `@design-system` paths |
| `web/vite.config.ts` | MODIFY | Add `@design-system` resolve.alias |
| `feature_list.json` | MODIFY | Two new passing entries |
| `claude-progress.md` | MODIFY | Session record |

Each file has one responsibility; no file exceeds ~250 lines. Files that change together (RN vs. web) live in their own platform directories.

---

## Task 1: Stand up `design-system/` skeleton (JSON tokens + RN adapter + MASTER.md)

**Files:**
- Create: `design-system/MASTER.md`
- Create: `design-system/tokens/tokens.json`
- Create: `design-system/tokens/index.ts`

**Interfaces:**
- Produces: `ds` typed object exported from `@design-system/tokens` (RN consumers); JSON literal used by the CSS adapter in Task 2

- [ ] **Step 1: Create the directory**

```bash
mkdir -p design-system/tokens
```

- [ ] **Step 2: Write `design-system/tokens/tokens.json`**

```json
{
  "color": {
    "amber": { "200": "#F9D9C7", "400": "#EFB084", "500": "#E08E45", "700": "#B25E1E" },
    "peach": { "50": "#FFF6EE", "100": "#FFE3CC", "200": "#FFD0B0" },
    "ivory": { "50": "#FFFCF8", "100": "#FFF6EE" },
    "terracotta": { "500": "#C45A2C", "600": "#A14518" },
    "ink": { "900": "#3D2614", "700": "#5C3A26", "500": "#7A5640" }
  },
  "glass": {
    "1": { "background": "rgba(255, 250, 245, 0.55)", "blur": "10px" },
    "2": { "background": "rgba(255, 233, 211, 0.62)", "blur": "20px" },
    "3": { "background": "rgba(251, 220, 195, 0.72)", "blur": "30px" }
  },
  "gradient": {
    "background": "linear-gradient(180deg, #FFF6EE 0%, #FFE3CC 100%)"
  },
  "shadow": {
    "card": "0 8px 24px rgba(196, 90, 44, 0.12)",
    "cardLifted": "0 12px 32px rgba(196, 90, 44, 0.18)"
  },
  "radius": { "sm": 8, "md": 12, "lg": 16, "xl": 24 },
  "space": { "1": 4, "2": 8, "3": 12, "4": 16, "6": 24, "8": 32 },
  "font": {
    "display": "Cormorant Garamond",
    "body": "Inter"
  },
  "fontSize": {
    "caption": 13,
    "body": 16,
    "title": 22,
    "display": 28
  },
  "semantic": {
    "surfaceBackground": "#FFF6EE",
    "textPrimary": "#3D2614",
    "textMuted": "#7A5640",
    "accentRecommended": "#C45A2C",
    "accentWarning": "#E08E45",
    "borderGlass": "rgba(255, 255, 255, 0.6)"
  }
}
```

- [ ] **Step 3: Write `design-system/tokens/index.ts`**

```typescript
import tokens from './tokens.json';

export const ds = {
  color: tokens.color,
  glass: tokens.glass,
  gradient: tokens.gradient,
  shadow: tokens.shadow,
  radius: tokens.radius,
  space: tokens.space,
  font: tokens.font,
  fontSize: tokens.fontSize,
  semantic: tokens.semantic,
} as const;

export type DesignTokens = typeof ds;
```

- [ ] **Step 4: Write `design-system/MASTER.md`**

```markdown
# SanBayGo Design System

## Mood
Warm, serene, trustworthy — for travelers making a quick decision under time pressure.

## Color palette
- Background: `#FFF6EE` → `#FFE3CC` (warm cream → peach)
- Primary text: `#3D2614` (ink, near-black warm brown)
- Muted text: `#7A5640` (warm gray-brown)
- Accent (Recommended): `#C45A2C` (terracotta)
- Accent (Warning): `#E08E45` (amber)

## Typography
- Display: **Cormorant Garamond** (serif; warmth, editorial)
- Body: **Inter** (sans; Vietnamese diacritic coverage)

## Glass tiers
- `glass.1`: light blur, low-opacity tint — default cards
- `glass.2`: medium blur, warmer tint — section dividers
- `glass.3`: heavy blur, frosted — "Đề xuất" highlight only

## Anti-patterns (do not use)
- Neon cyan / electric blue
- Purple/pink "AI startup" gradient
- Dark mode (out of scope for v1)
- Emoji as functional icons (decorative only)
- Motion > 200 ms

## Source of truth
`design-system/tokens/tokens.json`. The web CSS-vars file and the RN `ds` adapter both derive from it.

## Pinned constants
- Bus 86 ticket: **50,000 VND**
- Grab price range: **250,000 – 350,000 VND**
```

- [ ] **Step 5: Verify (no `@design-system` import yet — file should load)**

```bash
cd design-system && npx -p typescript@5.3.0 tsc --noEmit --strict --moduleResolution node --target ES2022 tokens/index.ts
```

Expected: exit 0, no output.

- [ ] **Step 6: Commit**

```bash
git add design-system/
git commit -m "feat(design-system): JSON token source + RN adapter + MASTER"
```

---

## Task 2: Wire `@design-system` path alias at root (tsconfig + Metro) and web (tsconfig + Vite)

**Files:**
- Modify: `tsconfig.json` (root)
- Create: `metro.config.js` (root)
- Modify: `web/tsconfig.json`
- Modify: `web/vite.config.ts`

**Interfaces:**
- Produces: working `@design-system` resolution from RN, RN-Jest, web TS, web Vite, web-Jest

- [ ] **Step 1: Add `@design-system` paths to root `tsconfig.json`**

Edit the root `tsconfig.json` `compilerOptions.paths` to add:

```json
"@design-system": [
  "./design-system/index.ts"
],
"@design-system/*": [
  "./design-system/*"
]
```

(The existing `@core` entries remain unchanged.)

- [ ] **Step 2: Create `metro.config.js`** (currently absent — Expo defaults to a generated one)

```javascript
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  '@design-system': path.resolve(__dirname, 'design-system'),
  '@design-system/': path.resolve(__dirname, 'design-system') + '/',
};

module.exports = config;
```

- [ ] **Step 3: Add `@design-system` paths to `web/tsconfig.json`**

Add to `compilerOptions.paths`:

```json
"@design-system": ["../design-system/index.ts"],
"@design-system/*": ["../design-system/*"]
```

(Leave existing `@core` and `@/` entries.)

- [ ] **Step 4: Add `@design-system` resolve.alias to `web/vite.config.ts`**

Edit `web/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const coreRoot = resolve(process.cwd(), '..', 'core');
const dsRoot = resolve(process.cwd(), '..', 'design-system');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@core': resolve(coreRoot, 'index.ts'),
      '@core/': `${coreRoot}/`,
      '@design-system': resolve(dsRoot, 'index.ts'),
      '@design-system/': `${dsRoot}/`,
    },
  },
});
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
cd web && npx tsc --noEmit && cd ..
```

Expected: both exit 0 (no consumers yet, so this only validates the alias entries don't break TS).

- [ ] **Step 6: Commit**

```bash
git add tsconfig.json metro.config.js web/tsconfig.json web/vite.config.ts
git commit -m "feat(design-system): wire @design-system path alias on root + web + Metro"
```

---

## Task 3: CSS-vars adapter + `design-system/index.ts` barrel

**Files:**
- Create: `design-system/tokens/index.css`
- Create: `design-system/index.ts`

**Interfaces:**
- Produces: web `import '@design-system/tokens/index.css'` works; root consumer can `import { ds } from '@design-system'`

- [ ] **Step 1: Write `design-system/tokens/index.css`**

```css
:root {
  /* Color primitives */
  --color-amber-200: #F9D9C7;
  --color-amber-400: #EFB084;
  --color-amber-500: #E08E45;
  --color-amber-700: #B25E1E;

  --color-peach-50: #FFF6EE;
  --color-peach-100: #FFE3CC;
  --color-peach-200: #FFD0B0;

  --color-ivory-50: #FFFCF8;
  --color-ivory-100: #FFF6EE;

  --color-terracotta-500: #C45A2C;
  --color-terracotta-600: #A14518;

  --color-ink-900: #3D2614;
  --color-ink-700: #5C3A26;
  --color-ink-500: #7A5640;

  /* Glass tiers */
  --glass-1-bg: rgba(255, 250, 245, 0.55);
  --glass-1-blur: blur(10px);
  --glass-2-bg: rgba(255, 233, 211, 0.62);
  --glass-2-blur: blur(20px);
  --glass-3-bg: rgba(251, 220, 195, 0.72);
  --glass-3-blur: blur(30px);

  /* Backgrounds */
  --bg-gradient: linear-gradient(180deg, #FFF6EE 0%, #FFE3CC 100%);
  --bg-flat: #FFF6EE;

  /* Shadows */
  --shadow-card: 0 8px 24px rgba(196, 90, 44, 0.12);
  --shadow-card-lifted: 0 12px 32px rgba(196, 90, 44, 0.18);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Space */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Typography */
  --font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', 'Helvetica Neue', system-ui, sans-serif;
  --font-size-caption: 13px;
  --font-size-body: 16px;
  --font-size-title: 22px;
  --font-size-display: 28px;

  /* Semantic */
  --surface-background: #FFF6EE;
  --text-primary: #3D2614;
  --text-muted: #7A5640;
  --accent-recommended: #C45A2C;
  --accent-warning: #E08E45;
  --border-glass: rgba(255, 255, 255, 0.6);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --glass-1-blur: none;
    --glass-2-blur: none;
    --glass-3-blur: none;
  }
}
```

- [ ] **Step 2: Write `design-system/index.ts` barrel**

```typescript
// Top-level barrel for `@design-system`.
// RN consumers: `import { ds } from '@design-system'` (resolves to this file via tsconfig paths).
// Web consumers: `import '@design-system/tokens/index.css'` (separate CSS module resolution).

export { ds } from './tokens';
export type { DesignTokens } from './tokens';
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
cd web && npx tsc --noEmit && cd ..
```

Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add design-system/tokens/index.css design-system/index.ts
git commit -m "feat(design-system): CSS-vars adapter + top-level barrel"
```

---

## Task 4: Vietnamese copy table (RN)

**Files:**
- Create: `design-system/copy/result-display.vi.ts`

**Interfaces:**
- Produces: `resultCopyVi` typed object that every RN result-screen component imports

- [ ] **Step 1: Write `design-system/copy/result-display.vi.ts`**

```typescript
/**
 * Vietnamese strings for the result screen.
 *
 * Rule (AGENTS.md): all user-facing text must be Vietnamese.
 * Web keeps using its existing vi/en LanguageContext; this table is the
 * canonical Vietnamese source for both surfaces.
 */
export const resultCopyVi = {
  header: {
    title: 'Kết quả',
    basedOn: 'Dựa trên giờ đáp',
    peakSuffix: '(giờ cao điểm)',
  },
  bus: {
    title: 'Xe buýt 86',
    recommendedBadge: '✓ ĐỀ XUẤT',
    departure: 'Giờ xe khởi hành:',
    wait: 'Thời gian chờ:',
    arrival: 'Thời gian đến nơi:',
    price: 'Giá vé:',
    waitMinutesUnit: '~{n} phút',
    unavailable: {
      no_service: 'Xe buýt chưa bắt đầu hoạt động.\nGiờ hoạt động: 06:40 - 22:15',
      too_late: 'Xe buýt đã kết thúc chuyến cuối.\nGiờ hoạt động: 06:40 - 22:15',
      missed_last: 'Bạn không kịp chuyến cuối của ngày.\nVui lòng cân nhắc Grab.',
    },
  },
  direction: {
    title: 'Hướng dẫn',
  },
  grab: {
    title: 'Grab (tham khảo)',
    price: 'Giá ước tính:',
    travelTime: 'Thời gian di chuyển:',
    peakSuffix: '(giờ cao điểm)',
    peakWarning: '⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường',
    disclaimer: '* Giá và thời gian chỉ mang tính tham khảo',
  },
  comparison: {
    title: 'So sánh phương tiện',
    peakBadge: 'Giờ cao điểm',
    sort: {
      recommended: 'Đề xuất',
      cheapest: 'Giá rẻ nhất',
      fastest: 'Nhanh nhất',
    },
    card: {
      recommendedBadge: 'Đề xuất',
      estimateTag: 'ước tính',
      waitLabel: 'Chờ xe:',
      waitMinutesUnit: '{n} phút',
      arrivalLabel: 'Đến nơi:',
      luggageLabel: 'Hành lý',
      comfortLabel: 'Thoải mái',
      eco: '🌿 Thân thiện môi trường',
    },
  },
  actions: {
    back: '← Sửa lại',
    recalculate: 'Tính lại',
  },
} as const;

export type ResultCopyVi = typeof resultCopyVi;
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add design-system/copy/
git commit -m "feat(design-system): Vietnamese copy table for result display"
```

---

## Task 5: `ResultCard` primitive (RN + web)

**Files:**
- Create: `design-system/primitives/ResultCard.tsx` (RN variant)
- Create: `design-system/primitives/ResultCard.web.tsx` (web variant)
- Create: `design-system/primitives/ResultCard.module.css` (web styles)

**Interfaces:**
- Produces: `<ResultCard tier={1|2|3}>` for both RN (`<View>`) and web (`<div>`)

- [ ] **Step 1: Write `design-system/primitives/ResultCard.tsx`** (RN)

```tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ds } from '../tokens';

export type GlassTier = 1 | 2 | 3;

interface ResultCardProps {
  tier?: GlassTier;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function ResultCard({ tier = 1, style, children }: ResultCardProps) {
  return <View style={[styles.base, tierStyles[tier], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    // `position: 'relative'` so absolutely-positioned children (e.g. the
    // "Đề xuất" badge in BusRecommendation) anchor to this card, not the
    // screen root.
    position: 'relative',
    borderRadius: ds.radius.lg,
    padding: ds.space[4],
    marginBottom: ds.space[4],
    borderWidth: 1,
    borderColor: ds.semantic.borderGlass,
    shadowColor: '#C45A2C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
});

const tierStyles: Record<GlassTier, ViewStyle> = {
  1: { backgroundColor: ds.glass['1'].background },
  2: { backgroundColor: ds.glass['2'].background },
  3: { backgroundColor: ds.glass['3'].background },
};
```

- [ ] **Step 2: Write `design-system/primitives/ResultCard.module.css`** (web)

```css
.card {
  position: relative;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-card);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-lifted);
}

.card:focus-within {
  outline: 2px solid var(--accent-recommended);
  outline-offset: 2px;
}

.tier1 {
  background: var(--glass-1-bg);
  backdrop-filter: var(--glass-1-blur);
  -webkit-backdrop-filter: var(--glass-1-blur);
}

.tier2 {
  background: var(--glass-2-bg);
  backdrop-filter: var(--glass-2-blur);
  -webkit-backdrop-filter: var(--glass-2-blur);
}

.tier3 {
  background: var(--glass-3-bg);
  backdrop-filter: var(--glass-3-blur);
  -webkit-backdrop-filter: var(--glass-3-blur);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}
```

- [ ] **Step 3: Write `design-system/primitives/ResultCard.web.tsx`**

```tsx
import React, { ReactNode } from 'react';
import styles from './ResultCard.module.css';

export type GlassTier = 1 | 2 | 3;

interface ResultCardProps {
  tier?: GlassTier;
  children: ReactNode;
  className?: string;
}

export function ResultCard({ tier = 1, children, className }: ResultCardProps) {
  const tierClass = styles[`tier${tier}`];
  return <div className={`${styles.card} ${tierClass} ${className ?? ''}`}>{children}</div>;
}
```

- [ ] **Step 4: Write the failing test for the RN variant**

Create `design-system/tests/primitives/ResultCard.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { ResultCard } from '../../primitives/ResultCard';
import { ds } from '../../tokens';

describe('<ResultCard /> (RN)', () => {
  it('renders tier 1 background by default', () => {
    const { getByTestId } = render(<ResultCard testID="card">x</ResultCard>);
    const view = getByTestId('card');
    const flat = JSON.stringify(view.props.style);
    expect(flat).toContain(ds.glass['1'].background);
  });

  it('renders tier 3 background when tier={3}', () => {
    const { getByTestId } = render(<ResultCard tier={3} testID="card">x</ResultCard>);
    const view = getByTestId('card');
    const flat = JSON.stringify(view.props.style);
    expect(flat).toContain(ds.glass['3'].background);
  });

  it('applies border color and radius', () => {
    const { getByTestId } = render(<ResultCard testID="card">x</ResultCard>);
    const flat = JSON.stringify(getByTestId('card').props.style);
    expect(flat).toContain(String(ds.radius.lg));
    expect(flat).toContain(ds.semantic.borderGlass);
  });
});
```

- [ ] **Step 5: Verify the test passes**

The test should pass now because the implementation exists. If anything fails, fix the implementation, not the test.

```bash
npx jest design-system/tests/primitives/ResultCard.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add design-system/primitives/ design-system/tests/primitives/
git commit -m "feat(design-system): ResultCard primitive (RN + web)"
```

---

## Task 6: Token invariant tests

**Files:**
- Create: `design-system/tests/tokens.test.ts`
- Modify: `jest.config.js` (root) — if present, otherwise create

**Interfaces:**
- Produces: tests that fail if a future change introduces neon cyan, AI-cliché purple, removes a glass tier, or breaks the RN adapter parity

- [ ] **Step 1: Check root jest config exists**

```bash
grep -q '"jest"' package.json && echo ROOT_JEST_INLINE || echo NO_ROOT_JEST_INLINE
```

> **Review note:** the root jest config is inline in `package.json` (under the `"jest"` key), not a separate file. Treat that as the canonical config.

- [ ] **Step 2a: Add `@testing-library/react-native` devDependency**

The plan uses `import { render } from '@testing-library/react-native'` for RN component tests in Tasks 5, 8, and 12. The dependency is **not** currently in `package.json`. Install it via:

```bash
npm install --save-dev @testing-library/react-native@^12.4.0
```

Then verify it appears in `package.json` `devDependencies`:

```bash
grep "@testing-library/react-native" package.json
```

Expected: one match in `devDependencies`.

- [ ] **Step 2b: Update the root `package.json` `"jest"` block**

Append the new entries to the existing inline `"jest"` config (do not create a new `jest.config.js`):

```json
"jest": {
  "preset": "ts-jest",
  "testMatch": [
    "**/tests/**/*.test.ts",
    "**/tests/**/*.test.tsx",
    "**/core/tests/**/*.test.ts",
    "**/design-system/tests/**/*.test.ts",
    "**/design-system/tests/**/*.test.tsx"
  ],
  "moduleNameMapper": {
    "^@core$": "<rootDir>/core/index.ts",
    "^@core/(.*)$": "<rootDir>/core/$1",
    "^@design-system$": "<rootDir>/design-system/index.ts",
    "^@design-system/(.*)$": "<rootDir>/design-system/$1"
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json"]
}
```

(Keep the existing `preset` and `moduleFileExtensions` values intact; only add the new `testMatch` entries and the `@design-system` lines to `moduleNameMapper`.)

- [ ] **Step 3: Write `design-system/tests/tokens.test.ts`**

```typescript
import tokens from '../tokens/tokens.json';
import { ds } from '../tokens';

describe('design-system tokens', () => {
  describe('warm palette constraints', () => {
    it('contains no neon cyan / electric blue (anti-pattern)', () => {
      const allHex = JSON.stringify(tokens.color).toLowerCase();
      expect(allHex).not.toMatch(/#0ff|#00ffff|#0af/);
    });

    it('contains no purple/pink AI-cliché gradient', () => {
      const allHex = JSON.stringify(tokens.color).toLowerCase();
      expect(allHex).not.toMatch(/#a020f0|#ff00ff|#d000ff|#7c3aed/i);
    });

    it('uses warm ivory/peach/amber as primary surface tones', () => {
      expect(tokens.color.peach['50']).toBe('#FFF6EE');
      expect(tokens.color.peach['100']).toBe('#FFE3CC');
      expect(tokens.color.amber['500']).toBe('#E08E45');
      expect(tokens.color.terracotta['500']).toBe('#C45A2C');
    });
  });

  describe('glass tiers', () => {
    it('defines exactly three tiers (1, 2, 3)', () => {
      expect(Object.keys(tokens.glass).sort()).toEqual(['1', '2', '3']);
    });

    it('tier 3 background is more opaque than tier 1', () => {
      const alpha1 = parseFloat(tokens.glass['1'].background.match(/[\d.]+\)$/)?.[0] ?? '0');
      const alpha3 = parseFloat(tokens.glass['3'].background.match(/[\d.]+\)$/)?.[0] ?? '0');
      expect(alpha3).toBeGreaterThan(alpha1);
    });

    it('tier 3 blur >= tier 1 blur', () => {
      const blur1 = parseInt(tokens.glass['1'].blur);
      const blur3 = parseInt(tokens.glass['3'].blur);
      expect(blur3).toBeGreaterThanOrEqual(blur1);
    });
  });

  describe('semantic roles', () => {
    it('accentRecommended is terracotta, not the AI cliché', () => {
      expect(tokens.semantic.accentRecommended).toBe('#C45A2C');
    });

    it('textPrimary has warm brown ink, not pure black', () => {
      expect(tokens.semantic.textPrimary).toBe('#3D2614');
    });

    it('surfaceBackground is in the warm gradient family', () => {
      expect(tokens.semantic.surfaceBackground).toBe('#FFF6EE');
    });
  });

  describe('typography constraints', () => {
    it('body font is a sans (Vietnamese-diacritic-friendly)', () => {
      expect(tokens.font.body).toBe('Inter');
    });

    it('font sizes follow the 16 px body minimum', () => {
      expect(tokens.fontSize.body).toBeGreaterThanOrEqual(16);
    });
  });

  describe('adapter parity (RN token adapter matches JSON)', () => {
    it('exposes the same color.amber.500 value', () => {
      expect(ds.color.amber['500']).toBe(tokens.color.amber['500']);
    });

    it('exposes the same accentRecommended', () => {
      expect(ds.semantic.accentRecommended).toBe(tokens.semantic.accentRecommended);
    });
  });

  describe('no motion encoded in tokens (motion lives in CSS modules)', () => {
    it('tokens.json does not encode animation durations', () => {
      const json = JSON.stringify(tokens).toLowerCase();
      expect(json).not.toMatch(/transition|animation|duration/);
    });
  });
});
```

- [ ] **Step 4: Run the new tests**

```bash
npx jest design-system/tests/tokens.test.ts
```

Expected: all assertions pass.

- [ ] **Step 5: Commit**

```bash
git add design-system/tests/tokens.test.ts jest.config.js
git commit -m "test(design-system): pin warm-palette, glass-tier, anti-pattern invariants"
```

---

## Task 7: Move `calculateTripComparison` into `core/`

**Files:**
- Create: `core/calculation-engine/transport-data.ts`
- Create: `core/calculation-engine/sortComparisons.ts`
- Create: `core/calculation-engine/calculateTripComparison.ts`
- Create: `core/tests/calculation-engine/calculateTripComparison.test.ts`
- Modify: `core/calculation-engine/index.ts`
- Modify: `web/src/lib/api/calculate-trip.ts`
- Delete: `web/src/lib/transport-calculator.ts`
- Delete: `web/src/lib/transport-data.ts`
- Delete: `web/__tests__/lib/transport-calculator.test.ts` (replaced by core test)

**Interfaces:**
- Produces: `calculateTripComparison`, `sortComparisons`, `TRANSPORT_OPTIONS`, `getScoreLabel` exported from `@core` (via `core/calculation-engine/index.ts`)
- Web imports these from `@core` instead of `./transport-calculator` / `./transport-data`

> **Spec correction:** the spec claimed `calculateTripComparison` already lives in `@core`; in fact it lives only in `web/src/lib/transport-calculator.ts`. This task relocates it (not new logic) so RN can consume it.

- [ ] **Step 1: Read the existing source to relocate**

```bash
cat web/src/lib/transport-calculator.ts
cat web/src/lib/transport-data.ts
cat web/__tests__/lib/transport-calculator.test.ts
```

Read each file in full to capture the exact bodies.

- [ ] **Step 2: Create `core/calculation-engine/transport-data.ts`**

Copy the exact contents of `web/src/lib/transport-data.ts` into this new file, **without any modifications**.

(If `web/src/lib/transport-data.ts` imports anything from a relative path, change those imports to `@core` paths so the new file works in `core/`. E.g. `import { X } from './foo'` → `import { X } from './foo'` stays the same if `foo.ts` is also moved into `core/`; otherwise point to `@core/foo`.)

- [ ] **Step 3a: YAGNI check on `getTransportOption`**

Before relocating `web/src/lib/transport-data.ts`, confirm whether `getTransportOption` (the lookup-by-id helper) is referenced outside the test file:

```bash
rg "getTransportOption" --type ts --type tsx
```

- If only used in `web/__tests__/lib/vehicle-comparison-data.test.ts` (the web test data file), then **drop the export** when relocating (YAGNI) and delete the test that depends on it. Otherwise keep it.
- If used in any production code path, keep the export and re-export it from `core/calculation-engine/index.ts`.

- [ ] **Step 3b: Create `core/calculation-engine/sortComparisons.ts`**

```typescript
import { TransportComparison, SortOption } from '../types';

export function sortComparisons(
  comparisons: TransportComparison[],
  sortBy: SortOption
): TransportComparison[] {
  const copy = [...comparisons];
  switch (sortBy) {
    case 'cheapest':
      copy.sort((a, b) => a.price.value - b.price.value);
      break;
    case 'fastest':
      copy.sort((a, b) => a.travelTime.minutesRange.min - b.travelTime.minutesRange.min);
      break;
    case 'recommended':
    default:
      copy.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return a.price.value - b.price.value;
      });
      break;
  }
  return copy;
}
```

- [ ] **Step 4: Create `core/calculation-engine/calculateTripComparison.ts`**

This file holds the relocated implementation. Copy the body of `web/src/lib/transport-calculator.ts` (its 158 lines), then change imports:

```typescript
import {
  TransportComparison,
  TransportOption,
  TripCalculationRequest,
  TripCalculationResponse,
  SortOption,
  isPeakHour,
  calculateExitTime,
  timeToMinutes,
  addMinutes,
  BUS_86,
} from '@core';
import { TRANSPORT_OPTIONS, getScoreLabel } from './transport-data';
import { sortComparisons } from './sortComparisons';

// ... paste the rest of the function bodies verbatim from web/src/lib/transport-calculator.ts ...
```

The exported surface stays the same: `sortComparisons`, `calculateTripComparison`. The internal `formatPrice`, `formatTimeRange`, `buildComparison` helpers stay file-local.

- [ ] **Step 5: Modify `core/calculation-engine/index.ts`**

Append:

```typescript
export { calculateTripComparison } from './calculateTripComparison';
export { sortComparisons } from './sortComparisons';
export { TRANSPORT_OPTIONS, getScoreLabel } from './transport-data';
// Only add the next line if step 3a found a non-test usage of `getTransportOption`.
// export { getTransportOption } from './transport-data';
```

(The existing `export { … }` lines for `calculateExitTime`, `isPeakHour`, etc. remain.)

- [ ] **Step 6: Migrate the test file**

Copy `web/__tests__/lib/transport-calculator.test.ts` to `core/tests/calculation-engine/calculateTripComparison.test.ts`. Update the import:

```typescript
import { sortComparisons, calculateTripComparison } from '../../calculation-engine/calculateTripComparison';
```

becomes

```typescript
import { sortComparisons, calculateTripComparison } from '../../calculation-engine/calculateTripComparison';
```

(If the original test imports the `TransportComparison` type, keep `from '@core'`.)

- [ ] **Step 7: Modify `web/src/lib/api/calculate-trip.ts`**

Replace its body with a thin re-export:

```typescript
export { calculateTripComparison } from '@core';
```

(Any other functions the route used previously are also re-exported.)

- [ ] **Step 8: Delete the old web files**

```bash
rm web/src/lib/transport-calculator.ts
rm web/src/lib/transport-data.ts
rm web/__tests__/lib/transport-calculator.test.ts
```

- [ ] **Step 9: Verify**

```bash
npx tsc --noEmit
npm test -- --testPathPattern=calculateTripComparison
cd web && npm test && cd ..
```

Expected: both `tsc` and tests pass; the relocated test suite has the same coverage as before.

- [ ] **Step 10: Commit**

```bash
git add core/ web/src/lib/api/calculate-trip.ts
git commit -m "refactor(core): relocate trip-comparison calc from web into @core"
```

---

## Task 8: Redesign RN `components/ResultDisplay/*` with tokens (TDD)

**Files:**
- Modify: `components/ResultDisplay/BusRecommendation.tsx`
- Modify: `components/ResultDisplay/GrabFallback.tsx`
- Modify: `components/ResultDisplay/DirectionGuide.tsx`
- Create: `tests/components/ResultDisplay/ResultDisplay.test.tsx`

**Interfaces:**
- Consumes: `@design-system/primitives/ResultCard`, `ds` tokens, `resultCopyVi`
- Consumes: existing `@core` (`BusRecommendation`, `TimeRange`)
- Produces: same `Props` shapes as today; rendered output uses tokens and copy table

> **Test-first:** write the tests, watch them fail, then implement.

- [ ] **Step 1: Write the failing render test**

Create `tests/components/ResultDisplay/ResultDisplay.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { ArrivalResult, BusRecommendation, TimeRange } from '@core';
import { BusRecommendationCard } from '../../../components/ResultDisplay/BusRecommendation';
import { GrabFallbackCard } from '../../../components/ResultDisplay/GrabFallback';

const baseBus: BusRecommendation = {
  available: true,
  trip: {
    departureTime: '11:00',
    waitMinutes: 35,
    arrivalEstimate: { early: '12:00', late: '12:30', minutesRange: { min: 60, max: 90 } } as TimeRange,
    ticketPrice: 50000,
  },
};

const baseGrab: TimeRange = { early: '11:00', late: '11:30', minutesRange: { min: 40, max: 60 } };

describe('<BusRecommendationCard /> (RN, after redesign)', () => {
  it('renders ĐỀ XUẤT badge when bus is available', () => {
    const { getByText } = render(<BusRecommendationCard recommendation={baseBus} />);
    expect(getByText(/ĐỀ XUẤT/)).toBeTruthy();
  });

  it('renders ticket price as 50.000 VND', () => {
    const { getByText } = render(<BusRecommendationCard recommendation={baseBus} />);
    expect(getByText(/50\.000 VND/)).toBeTruthy();
  });

  it('renders the unavailable copy when reason is too_late', () => {
    const { getByText } = render(
      <BusRecommendationCard recommendation={{ available: false, reason: 'too_late' }} />
    );
    expect(getByText(/đã kết thúc chuyến cuối/)).toBeTruthy();
  });

  it('does NOT render badge when bus is unavailable', () => {
    const { queryByText } = render(
      <BusRecommendationCard recommendation={{ available: false, reason: 'too_late' }} />
    );
    expect(queryByText(/ĐỀ XUẤT/)).toBeNull();
  });
});

describe('<GrabFallbackCard /> (RN, after redesign)', () => {
  it('renders price estimate verbatim', () => {
    const { getByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={false} />
    );
    expect(getByText(/250\.000 - 350\.000 VND/)).toBeTruthy();
  });

  it('renders peak warning when isPeak=true', () => {
    const { getByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={true} />
    );
    expect(getByText(/giờ cao điểm/i)).toBeTruthy();
  });

  it('does NOT render peak warning when isPeak=false', () => {
    const { queryByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={false} />
    );
    expect(queryByText(/giờ cao điểm/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
npx jest tests/components/ResultDisplay/ResultDisplay.test.tsx
```

Expected: FAIL. The current components import nothing from `@design-system`; tests fail because either the import path doesn't resolve yet (TypeScript error) or the rendered text doesn't match.

- [ ] **Step 3: Rewrite `components/ResultDisplay/BusRecommendation.tsx`**

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusRecommendation } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props { recommendation: BusRecommendation }

export function BusRecommendationCard({ recommendation }: Props) {
  const c = resultCopyVi.bus;

  if (!recommendation.available) {
    const reason = recommendation.reason;
    if (!reason) return null;
    return (
      <ResultCard tier={1}>
        <View style={styles.unavailableHeader}>
          <Text style={styles.unavailableIcon}>🚌</Text>
          <Text style={styles.unavailableTitle}>{c.title}</Text>
        </View>
        <View style={styles.unavailableContent}>
          <Text style={styles.unavailableText}>{c.unavailable[reason]}</Text>
        </View>
      </ResultCard>
    );
  }

  const trip = recommendation.trip;
  if (!trip) return null;

  return (
    <ResultCard tier={3}>
      <View style={styles.recommendedBadge}>
        <Text style={styles.recommendedBadgeText}>{c.recommendedBadge}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.icon}>🚌</Text>
        <Text style={styles.title}>{c.title}</Text>
      </View>
      <View style={styles.content}>
        <Row label={c.departure} value={trip.departureTime} />
        <Row label={c.wait} value={c.waitMinutesUnit.replace('{n}', String(trip.waitMinutes))} />
        <Row
          label={c.arrival}
          value={`${trip.arrivalEstimate.early} - ${trip.arrivalEstimate.late}`}
        />
        <Row label={c.price} value={formatVnd(trip.ticketPrice)} valueStyle={styles.price} />
      </View>
    </ResultCard>
  );
}

function formatVnd(value: number): string {
  // Manual dot-thousands formatter. Locale-independent (avoids CI drift
  // when `vi-VN` is not the host's default locale).
  const raw = String(value);
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}

function Row({ label, value, valueStyle }: { label: string; value: string; valueStyle?: import('react-native').TextStyle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedBadge: {
    position: 'absolute', top: -10, right: 16,
    backgroundColor: ds.semantic.accentRecommended,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8,
  },
  recommendedBadgeText: { color: ds.color.ivory['50'], fontSize: 12, fontWeight: '700' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 32, marginRight: 12 },
  title: { fontFamily: ds.font.display, fontSize: 22, fontWeight: '700', color: ds.semantic.textPrimary },
  content: { gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  label: { fontSize: 15, color: ds.semantic.textMuted },
  value: { fontSize: 15, fontWeight: '600', color: ds.semantic.textPrimary },
  price: { fontSize: 18, fontWeight: '700', color: ds.semantic.accentRecommended },
  unavailableHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  unavailableIcon: { fontSize: 28, marginRight: 10, opacity: 0.5 },
  unavailableTitle: { fontSize: 18, fontWeight: '600', color: ds.semantic.textMuted },
  unavailableContent: { backgroundColor: 'rgba(255, 250, 245, 0.7)', borderRadius: 8, padding: 12 },
  unavailableText: { fontSize: 14, color: ds.semantic.textMuted, lineHeight: 22 },
});
```

- [ ] **Step 4: Rewrite `components/ResultDisplay/GrabFallback.tsx`**

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimeRange } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props {
  priceEstimate: string;
  travelTime: TimeRange;
  isPeak: boolean;
}

export function GrabFallbackCard({ priceEstimate, travelTime, isPeak }: Props) {
  const c = resultCopyVi.grab;
  return (
    <ResultCard tier={1}>
      <View style={styles.header}>
        <Text style={styles.icon}>🚗</Text>
        <Text style={styles.title}>{c.title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={styles.label}>{c.price}</Text>
          <Text style={styles.price}>{priceEstimate}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>{c.travelTime}</Text>
          <Text style={[styles.value, isPeak && styles.peakValue]}>
            {travelTime.early} - {travelTime.late}
            {isPeak && ` ${c.peakSuffix}`}
          </Text>
        </View>
        {isPeak && (
          <View style={styles.peakWarning}>
            <Text style={styles.peakWarningText}>{c.peakWarning}</Text>
          </View>
        )}
      </View>
      <Text style={styles.disclaimer}>{c.disclaimer}</Text>
    </ResultCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 28, marginRight: 10 },
  title: { fontFamily: ds.font.body, fontSize: 18, fontWeight: '600', color: ds.semantic.textPrimary },
  content: { gap: 12 },
  column: { flexDirection: 'column', gap: 4 },
  label: { fontSize: 14, color: ds.semantic.textMuted },
  value: { fontSize: 15, fontWeight: '600', color: ds.semantic.textPrimary },
  peakValue: { color: ds.semantic.accentWarning },
  price: { fontSize: 18, fontWeight: '700', color: ds.semantic.textPrimary },
  peakWarning: {
    backgroundColor: 'rgba(224, 142, 69, 0.18)',
    borderRadius: 8, padding: 10, marginTop: 8,
  },
  peakWarningText: { fontSize: 13, color: ds.semantic.accentWarning },
  disclaimer: { fontSize: 12, color: ds.semantic.textMuted, marginTop: 12, fontStyle: 'italic' },
});
```

- [ ] **Step 5: Rewrite `components/ResultDisplay/DirectionGuide.tsx`**

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props { description: string; estimatedMinutes: number }

// `estimatedMinutes` is kept in the props for future use (e.g. showing a
// "5 phút" badge) but is not rendered yet. Prefix with `_` so
// `noUnusedParameters` does not fire under `web/tsconfig.json` strict mode.
export function DirectionGuide({ description, estimatedMinutes: _estimatedMinutes }: Props) {
  const c = resultCopyVi.direction;
  return (
    <ResultCard tier={2}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🧭</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{c.title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ResultCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(224, 142, 69, 0.22)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  icon: { fontSize: 20 },
  content: { flex: 1 },
  title: {
    fontFamily: ds.font.body, fontSize: 14, fontWeight: '600',
    color: ds.semantic.textPrimary, marginBottom: 4,
  },
  description: { fontSize: 14, color: ds.semantic.textPrimary, lineHeight: 20 },
});
```

- [ ] **Step 6: Run the tests to confirm they pass**

```bash
npx jest tests/components/ResultDisplay/ResultDisplay.test.tsx
```

Expected: all 7 tests pass.

- [ ] **Step 7: Commit**

```bash
git add components/ResultDisplay/ tests/components/ResultDisplay/
git commit -m "feat(rn): redesign BusRecommendation, GrabFallback, DirectionGuide with tokens"
```

---

## Task 9: Redesign RN `components/ResultDisplay/index.tsx` + `app/index.tsx`

**Files:**
- Modify: `components/ResultDisplay/index.tsx`
- Modify: `app/index.tsx`

**Interfaces:**
- Consumes: `<BusRecommendationCard>`, `<GrabFallbackCard>`, `<DirectionGuide>` from Task 8
- Consumes: existing `useArrivalWizard` hook

- [ ] **Step 1: Rewrite `components/ResultDisplay/index.tsx`**

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrivalResult, isPeakHour } from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
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
  const c = resultCopyVi;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{c.header.title}</Text>
        <Text style={styles.subtitle}>
          {c.header.basedOn} {arrivalTime}
          {isPeak && ` ${c.header.peakSuffix}`}
        </Text>
      </View>

      <BusRecommendationCard recommendation={result.bus} />

      {result.bus.available && result.direction && (
        <DirectionGuide
          description={result.direction.description}
          estimatedMinutes={result.direction.estimatedMinutes}
        />
      )}

      <GrabFallbackCard
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
        isPeak={isPeak}
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={c.actions.back}
        >
          <Text style={styles.backButtonText}>{c.actions.back}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recalculateButton}
          onPress={onRecalculate}
          accessibilityRole="button"
          accessibilityLabel={c.actions.recalculate}
        >
          <Text style={styles.recalculateButtonText}>{c.actions.recalculate}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: ds.space[4] },
  header: { marginBottom: 20 },
  title: {
    fontFamily: ds.font.display,
    fontSize: ds.fontSize.display,
    fontWeight: '700',
    color: ds.semantic.textPrimary,
    marginBottom: 4,
  },
  subtitle: { fontSize: ds.fontSize.body, color: ds.semantic.textMuted },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  backButton: { paddingVertical: 14, paddingHorizontal: 20 },
  backButtonText: { fontSize: 16, color: ds.semantic.textMuted, fontWeight: '500' },
  recalculateButton: {
    flex: 1,
    backgroundColor: ds.semantic.accentRecommended,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  recalculateButtonText: { fontSize: 16, fontWeight: '600', color: ds.color.ivory['50'] },
});
```

- [ ] **Step 2: Wrap `app/index.tsx` with a warm background**

Edit `app/index.tsx` so the entire screen is wrapped in a `View` with the warm surface color:

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ds } from '@design-system';
import { useArrivalWizard } from '../hooks/useArrivalWizard';
import { ArrivalForm } from '../components/ArrivalForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { ArrivalResult } from '@core';

type AppState = 'form' | 'result';

export default function HomeScreen() {
  const [appState, setAppState] = useState<AppState>('form');
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const {
    formData, setArrivalTime, setTerminal, setBaggage,
    setDestination, reset, calculateResult,
  } = useArrivalWizard();

  const handleFormComplete = () => {
    const r = calculateResult();
    if (r) {
      setResult(r);
      setAppState('result');
    }
  };

  return (
    <View style={styles.warmBackground}>
      <SafeAreaView style={styles.container} edges={['bottom']}>
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
              onBack={() => setAppState('form')}
              onRecalculate={() => {
                reset();
                setResult(null);
                setAppState('form');
              }}
            />
          )
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  warmBackground: { flex: 1, backgroundColor: ds.semantic.surfaceBackground },
  container: { flex: 1 },
});
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm test -- --testPathPattern=ResultDisplay
```

Expected: exit 0 and all tests pass.

- [ ] **Step 4: Confirm no hardcoded Vietnamese literal in redesigned files**

```bash
grep -nE "ĐỀ XUẤT|giờ cao điểm|Tính lại|Sửa lại|Kết quả|Dựa trên" \
  components/ResultDisplay/BusRecommendation.tsx \
  components/ResultDisplay/GrabFallback.tsx \
  components/ResultDisplay/DirectionGuide.tsx \
  components/ResultDisplay/index.tsx || echo OK_NO_LITERALS
```

Expected: `OK_NO_LITERALS` (all copy must come from `resultCopyVi`).

- [ ] **Step 5: Commit**

```bash
git add components/ResultDisplay/index.tsx app/index.tsx
git commit -m "feat(rn): warm background + token-styled ResultDisplay container"
```

---

## Task 10: Re-skin web `ResultDisplay/*` with tokens

**Files:**
- Modify: `web/index.html` (preload fonts)
- Modify: `web/src/main.tsx` (import CSS)
- Modify: `web/src/contexts/LanguageContext.tsx` (add `results` keys)
- Modify: `web/src/components/ResultDisplay/index.module.css`
- Modify: `web/src/components/ResultDisplay/index.tsx`
- Modify: `web/src/components/ResultDisplay/JourneyTimeline.tsx` and `.module.css`
- Modify: `web/src/components/ResultDisplay/BusRecommendation.tsx` and `.module.css`
- Modify: `web/src/components/ResultDisplay/GrabFallback.tsx` and `.module.css`

**Interfaces:**
- Consumes: `import '@design-system/tokens/index.css'` once in `web/src/main.tsx`
- Consumes: existing `useLanguage()` and `t.results.*` keys (extended in this task)
- Produces: warm-gradient page, glass-tier cards, focus rings on interactive elements

- [ ] **Step 1: Update `web/index.html` to preload fonts**

Edit `web/index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" />
```

- [ ] **Step 2: Import the design-system CSS in `web/src/main.tsx`**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@design-system/tokens/index.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Add `results` keys to `web/src/contexts/LanguageContext.tsx`**

Locate the `vi` and `en` objects. Under each, add (or confirm) a `results` block:

```typescript
results: {
  title: 'Kết quả',                       // vi
  basedOn: 'Dựa trên giờ đáp',
  peakHour: 'giờ cao điểm',
  noBus: 'Không có chuyến xe buýt',
  lastBusAt: 'Chuyến cuối lúc',
  needToArriveBy: 'Bạn cần đến điểm đón trước',
  recalculate: 'Tính lại',
  recommended: 'ĐỀ XUẤT',
  peakWarning: '⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường',
  grabEstimate: 'ước tính',
  comparisonTitle: 'So sánh phương tiện',
  sortRecommended: 'Đề xuất',
  sortCheapest: 'Giá rẻ nhất',
  sortFastest: 'Nhanh nhất',
},
```

Add the English equivalents under `en.results` with the same keys.

- [ ] **Step 4: Replace `web/src/components/ResultDisplay/index.module.css`**

```css
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  background: var(--bg-flat);
  min-height: 100vh;
}

.header {
  margin-bottom: var(--space-6);
}

.title {
  margin: 0 0 var(--space-1) 0;
  font-family: var(--font-display);
  font-size: var(--font-size-display);
  color: var(--text-primary);
}

.subtitle {
  margin: 0;
  font-size: var(--font-size-body);
  color: var(--text-muted);
}

.noBus {
  background: var(--glass-2-bg);
  backdrop-filter: var(--glass-2-blur);
  -webkit-backdrop-filter: var(--glass-2-blur);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  margin-bottom: var(--space-4);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-card);
}

.noBusIcon {
  font-size: 48px;
  margin-bottom: var(--space-2);
  opacity: 0.6;
}

.noBusTitle {
  font-family: var(--font-display);
  font-size: var(--font-size-title);
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
}

.noBusText {
  font-size: var(--font-size-body);
  color: var(--text-muted);
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
}

.recalculateButton {
  background: var(--accent-recommended);
  color: var(--color-ivory-50);
  font-size: var(--font-size-body);
  font-weight: 600;
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
  box-shadow: var(--shadow-card);
  font-family: var(--font-body);
}

.recalculateButton:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-lifted);
}

.recalculateButton:focus-visible {
  outline: 2px solid var(--accent-recommended);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .recalculateButton {
    transition: none;
  }
  .recalculateButton:hover {
    transform: none;
  }
}
```

- [ ] **Step 5: Modify `web/src/components/ResultDisplay/index.tsx`**

Replace every `#hex` literal in the JSX with class names from the new CSS module. Replace the entire body with:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData, isPeakHour } from '@core';
import { JourneyTimeline } from './JourneyTimeline';
import { BusRecommendation } from './BusRecommendation';
import { GrabFallback } from './GrabFallback';
import { VehicleComparison } from '../VehicleComparison';
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
          <JourneyTimeline result={result} formData={formData} />
          <BusRecommendation recommendation={result.bus} />
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

      <VehicleComparison
        formData={{
          arrivalTime: formData.arrivalTime,
          terminalId: formData.terminal as 'T1' | 'T2',
          baggageType: formData.baggage ?? 'carry_on',
          destinationId: formData.destination || 'old-quarter',
        }}
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

- [ ] **Step 6: Modify `JourneyTimeline.tsx` + `.module.css`**

In `JourneyTimeline.tsx`, replace the inline `style={{ background: '#F5F7FA' }}` and similar hex values with CSS classes from a refactored `JourneyTimeline.module.css` that uses `var(--glass-1-bg)`, `var(--font-display)`, etc. Keep horizontal/vertical layout behavior unchanged.

- [ ] **Step 7: Modify `BusRecommendation.tsx` + `.module.css`**

Replace hex literals with token vars. Use `className={styles.tier3}` for the recommended card. Keep the JSX structure; only swap style values.

- [ ] **Step 8: Modify `GrabFallback.tsx` + `.module.css`**

Replace hex literals with token vars. Add `prefers-reduced-motion` overrides if any transitions exist.

- [ ] **Step 8b: Add a web render test**

Create `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { ArrivalResult, ArrivalFormData } from '@core';

const baseResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '11:00',
      waitMinutes: 35,
      ticketPrice: 50000,
      arrivalEstimate: { early: '12:00', late: '12:30', minutesRange: { min: 60, max: 90 } },
    },
  },
  grab: { available: true, priceEstimate: '250.000 - 350.000 VND', travelTime: { early: '11:00', late: '11:30', minutesRange: { min: 40, max: 60 } } },
  direction: { description: 'Đi bộ 5 phút đến điểm đón xe buýt Nhà ga T1', estimatedMinutes: 5 },
} as unknown as ArrivalResult;

const baseForm: ArrivalFormData = {
  arrivalTime: '10:00',
  terminal: 'T1',
  baggage: 'carry_on',
  destination: 'old-quarter',
  flightType: 'domestic',
};

describe('<ResultDisplay /> (web)', () => {
  it('renders Vietnamese heading by default', () => {
    render(
      <LanguageProvider>
        <ResultDisplay result={baseResult} formData={baseForm} onRecalculate={() => {}} />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { name: /kết quả/i })).toBeTruthy();
  });

  it('includes the comparison heading', () => {
    render(
      <LanguageProvider>
        <ResultDisplay result={baseResult} formData={baseForm} onRecalculate={() => {}} />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { name: /so sánh phương tiện/i })).toBeTruthy();
  });
});
```

- [ ] **Step 9: Verify**

```bash
cd web && npx tsc --noEmit && npx eslint src/ && npm test && cd ..
```

Expected: all green. The existing VehicleComparison test in `web/__tests__/lib/` continues to pass. The new `ResultDisplay.test.tsx` render test passes.

- [ ] **Step 10: Commit**

```bash
git add web/index.html web/src/main.tsx web/src/contexts/LanguageContext.tsx web/src/components/ResultDisplay/
git commit -m "feat(web): re-skin ResultDisplay with warm palette + glass tiers"
```

---

## Task 11: Re-skin web `VehicleComparison/*` with tokens

**Files:**
- Modify: `web/src/components/VehicleComparison/index.tsx` and `.module.css`
- Modify: `web/src/components/VehicleComparison/SortToggle.tsx` and `.module.css`
- Modify: `web/src/components/VehicleComparison/VehicleCard.tsx` and `.module.css`

**Interfaces:**
- Consumes: `@core/calculateTripComparison`, `calculateTripComparison` from `@core` (Task 7)
- Consumes: existing `useLanguage()` keys
- Produces: same behavioral surface; visual re-skin only

- [ ] **Step 1: Update `web/src/components/VehicleComparison/index.tsx`**

Replace the import:

```typescript
import { calculateTripComparison } from '../../lib/transport-calculator';
```

with:

```typescript
import { calculateTripComparison } from '@core';
```

Otherwise the JSX stays the same.

- [ ] **Step 2: Replace `web/src/components/VehicleComparison/index.module.css`**

```css
.container {
  padding: var(--space-6) 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--font-size-title);
  font-weight: 700;
  color: var(--text-primary);
}

.peakBadge {
  font-size: 12px;
  padding: 4px 10px;
  background: rgba(224, 142, 69, 0.18);
  color: var(--accent-warning);
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.grid {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  padding: var(--space-4) 0;
  margin: 0 calc(-1 * var(--space-4));
  padding-left: var(--space-4);
  padding-right: var(--space-4);
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
  color: var(--text-muted);
}
```

- [ ] **Step 3: Replace `web/src/components/VehicleComparison/SortToggle.module.css`**

```css
.container {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2);
  background: var(--glass-1-bg);
  backdrop-filter: var(--glass-1-blur);
  -webkit-backdrop-filter: var(--glass-1-blur);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.button {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-body);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;
}

.button:hover {
  background: rgba(255, 250, 245, 0.6);
}

.button:focus-visible {
  outline: 2px solid var(--accent-recommended);
  outline-offset: 2px;
}

.button.active {
  background: var(--accent-recommended);
  color: var(--color-ivory-50);
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

- [ ] **Step 4: Modify `web/src/components/VehicleComparison/SortToggle.tsx`**

Replace the `SORT_OPTIONS` literal's `label` field with `t.results.sortRecommended` etc. via `useLanguage()`:

```typescript
import { SortOption } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './SortToggle.module.css';

interface SortToggleProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortToggle({ value, onChange }: SortToggleProps) {
  const { t } = useLanguage();
  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'recommended', label: t.results.sortRecommended },
    { value: 'cheapest', label: t.results.sortCheapest },
    { value: 'fastest', label: t.results.sortFastest },
  ];

  return (
    <div className={styles.container}>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Replace `web/src/components/VehicleComparison/VehicleCard.module.css`**

```css
.card {
  flex: 0 0 280px;
  position: relative;
  padding: var(--space-4);
  background: var(--glass-1-bg);
  backdrop-filter: var(--glass-1-blur);
  -webkit-backdrop-filter: var(--glass-1-blur);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-lifted);
}

.card.recommended {
  background: var(--glass-3-bg);
  backdrop-filter: var(--glass-3-blur);
  -webkit-backdrop-filter: var(--glass-3-blur);
}

.badge {
  position: absolute;
  top: -10px;
  left: var(--space-4);
  padding: 4px 12px;
  background: var(--accent-recommended);
  color: var(--color-ivory-50);
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
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
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.nameEn {
  font-size: 12px;
  color: var(--text-muted);
}

.price {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.priceValue {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--accent-recommended);
}

.estimateTag {
  font-size: 11px;
  padding: 2px 6px;
  background: var(--accent-warning);
  color: var(--color-ivory-50);
  border-radius: 4px;
  font-weight: 600;
}

.time {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: var(--space-2);
  color: var(--text-muted);
}

.wait, .arrival {
  font-size: 14px;
  margin-bottom: 4px;
}

.waitLabel, .arrivalLabel {
  color: var(--text-muted);
}

.waitValue, .arrivalValue {
  color: var(--text-primary);
  font-weight: 600;
}

.ratings {
  display: flex;
  gap: var(--space-3);
  margin: var(--space-3) 0;
}

.rating {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ratingLabel {
  font-size: 11px;
  color: var(--text-muted);
}

.ratingBadge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-align: center;
}

.score5, .score4 { background: rgba(46, 125, 50, 0.18); color: #2E7D32; }
.score3 { background: rgba(239, 108, 0, 0.18); color: #EF6C00; }
.score2, .score1 { background: rgba(198, 40, 40, 0.18); color: #C62828; }

.eco {
  font-size: 12px;
  color: #2E7D32;
  margin-bottom: var(--space-2);
}

.notes {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}
```

- [ ] **Step 6: Modify `web/src/components/VehicleComparison/VehicleCard.tsx`**

Replace the JSX so it imports the result card shell from the design-system (or inlines the glass tier via class name). Use the existing `TYPE_ICONS` map. Replace the hardcoded "Đề xuất" string with `t.results.recommended` and "ước tính" with `t.results.grabEstimate`:

```tsx
import { TransportComparison } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
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
  const { t } = useLanguage();
  const icon = TYPE_ICONS[comparison.type] || '🚗';
  const className = `${styles.card} ${comparison.isRecommended ? styles.recommended : ''}`;

  return (
    <div className={className}>
      {comparison.isRecommended && (
        <div className={styles.badge}>{t.results.recommended}</div>
      )}

      <div className={styles.header}>
        <span className={styles.icon} aria-hidden>{icon}</span>
        <div className={styles.name}>
          <h3 className={styles.nameText}>{comparison.nameVi}</h3>
          <span className={styles.nameEn}>{comparison.name}</span>
        </div>
      </div>

      <div className={styles.price}>
        <span className={styles.priceValue}>{comparison.price.estimate}</span>
        {comparison.price.isEstimate && (
          <span className={styles.estimateTag}>{t.results.grabEstimate}</span>
        )}
      </div>

      <div className={styles.time}>
        <span aria-hidden>⏱️</span>
        <span>{comparison.travelTime.estimate}</span>
      </div>

      {comparison.waitTime && (
        <div className={styles.wait}>
          <span className={styles.waitLabel}>Chờ xe:</span>
          <span className={styles.waitValue}>
            {comparison.waitTime.minutes} phút ({comparison.waitTime.nextDeparture})
          </span>
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

- [ ] **Step 7: Verify**

```bash
cd web && npx tsc --noEmit && npm test && cd ..
```

Expected: all green.

- [ ] **Step 8: Confirm no hex literals in redesigned web CSS modules**

```bash
grep -nE "#[0-9a-fA-F]{3,6}" \
  web/src/components/ResultDisplay/*.module.css \
  web/src/components/VehicleComparison/*.module.css || echo OK_NO_HEX
```

Expected: only the green/orange/red rating palette in VehicleCard (3 colors) should appear; everything else must use `var(--…)`. If more hex matches appear, replace them.

- [ ] **Step 9: Commit**

```bash
git add web/src/components/VehicleComparison/
git commit -m "feat(web): re-skin VehicleComparison with warm palette + glass tiers"
```

---

## Task 12: Port `VehicleComparison` to RN (TDD)

**Files:**
- Create: `components/VehicleComparison/transportIcons.ts`
- Create: `components/VehicleComparison/SortToggle.tsx`
- Create: `components/VehicleComparison/VehicleCard.tsx`
- Create: `components/VehicleComparison/index.tsx`
- Create: `tests/components/VehicleComparison/VehicleComparison.test.tsx`

**Interfaces:**
- Consumes: `TransportComparison`, `SortOption`, `calculateTripComparison`, `isPeakHour` from `@core`
- Consumes: `ResultCard` from `@design-system/primitives/ResultCard`
- Consumes: `resultCopyVi` for all copy
- Produces: `<VehicleComparison arrivalTime terminalId baggageType destinationId />` rendering all 6 transport cards with sort toggle and peak-hour badge

> **Test-first.** Tests are the spec.

- [ ] **Step 1: Write the failing test**

Create `tests/components/VehicleComparison/VehicleComparison.test.tsx`:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { VehicleComparison } from '../../../components/VehicleComparison';

describe('<VehicleComparison /> (RN)', () => {
  it('renders all 6 transport cards', () => {
    const { getByText } = render(
      <VehicleComparison
        arrivalTime="10:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(getByText(/Xe buýt 86/)).toBeTruthy();
    expect(getByText(/Grab Bike/)).toBeTruthy();
  });

  it('shows peak-hour badge when arrival is at 08:00', () => {
    const { getByText } = render(
      <VehicleComparison
        arrivalTime="08:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(getByText(/Giờ cao điểm/)).toBeTruthy();
  });

  it('hides peak-hour badge when arrival is at 14:00', () => {
    const { queryByText } = render(
      <VehicleComparison
        arrivalTime="14:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(queryByText(/Giờ cao điểm/)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
npx jest tests/components/VehicleComparison/VehicleComparison.test.tsx
```

Expected: FAIL — module not found (`components/VehicleComparison/index.tsx` does not exist yet).

- [ ] **Step 3: Create `components/VehicleComparison/transportIcons.ts`**

```typescript
import { TransportType } from '@core';

export const TRANSPORT_ICONS: Record<TransportType, string> = {
  bus: '🚌',
  motorbike: '🏍️',
  car: '🚗',
};

export const getTransportIcon = (type: TransportType): string =>
  TRANSPORT_ICONS[type] ?? '🚗';
```

- [ ] **Step 4: Create `components/VehicleComparison/SortToggle.tsx`**

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SortOption } from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const OPTIONS: SortOption[] = ['recommended', 'cheapest', 'fastest'];
const LABELS: Record<SortOption, string> = {
  recommended: resultCopyVi.comparison.sort.recommended,
  cheapest: resultCopyVi.comparison.sort.cheapest,
  fastest: resultCopyVi.comparison.sort.fastest,
};

export function SortToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((opt) => {
        const active = opt === value;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => onChange(opt)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={LABELS[opt]}
          >
            <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
              {LABELS[opt]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: ds.glass['1'].background,
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: { backgroundColor: ds.semantic.accentRecommended },
  buttonText: { fontSize: 14, fontWeight: '500', color: ds.semantic.textMuted, fontFamily: ds.font.body },
  buttonTextActive: { color: ds.color.ivory['50'] },
});
```

- [ ] **Step 5: Create `components/VehicleComparison/VehicleCard.tsx`**

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransportComparison } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
import { getTransportIcon } from './transportIcons';

interface Props { comparison: TransportComparison }

export function VehicleCard({ comparison }: Props) {
  const c = resultCopyVi.comparison.card;
  const icon = getTransportIcon(comparison.type);
  const tier = comparison.isRecommended ? 3 : 1;

  return (
    <ResultCard tier={tier as 1 | 2 | 3} style={styles.card}>
      {comparison.isRecommended && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{c.recommendedBadge}</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.icon} accessibilityElementsHidden importantForAccessibility="no">{icon}</Text>
        <View style={styles.nameBlock}>
          <Text style={styles.nameVi}>{comparison.nameVi}</Text>
          <Text style={styles.nameEn}>{comparison.name}</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceValue}>{comparison.price.estimate}</Text>
        {comparison.price.isEstimate && (
          <Text style={styles.estimateTag}>{c.estimateTag}</Text>
        )}
      </View>

      <View style={styles.row}>
        <Text accessibilityElementsHidden importantForAccessibility="no">⏱️</Text>
        <Text style={styles.value}>{comparison.travelTime.estimate}</Text>
      </View>

      {comparison.waitTime && (
        <View style={styles.row}>
          <Text style={styles.label}>
            {c.waitLabel}{' '}
            <Text style={styles.value}>
              {c.waitMinutesUnit.replace('{n}', String(comparison.waitTime.minutes))} ({comparison.waitTime.nextDeparture})
            </Text>
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>
          {c.arrivalLabel}{' '}
          <Text style={styles.value}>{comparison.travelTime.arrivalEstimate}</Text>
        </Text>
      </View>

      <View style={styles.ratings}>
        <RatingChip label={c.luggageLabel} score={comparison.luggage.score} text={comparison.luggage.label} />
        <RatingChip label={c.comfortLabel} score={comparison.comfort.score} text={comparison.comfort.label} />
      </View>

      {comparison.ecoFriendly && <Text style={styles.eco}>{c.eco}</Text>}

      {!!comparison.notes && <Text style={styles.notes}>{comparison.notes}</Text>}
    </ResultCard>
  );
}

function RatingChip({ label, score, text }: { label: string; score: number; text: string }) {
  const palette =
    score >= 4 ? styles.scoreHigh :
    score === 3 ? styles.scoreMid :
    styles.scoreLow;
  return (
    <View style={styles.ratingBlock}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={[styles.ratingBadge, palette]}>
        <Text style={styles.ratingBadgeText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 280 },
  badge: {
    position: 'absolute', top: -10, left: 16,
    backgroundColor: ds.semantic.accentRecommended,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8,
  },
  badgeText: { color: ds.color.ivory['50'], fontSize: 12, fontWeight: '700' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  icon: { fontSize: 32 },
  nameBlock: { flexDirection: 'column' },
  nameVi: { fontFamily: ds.font.body, fontSize: 16, fontWeight: '600', color: ds.semantic.textPrimary },
  nameEn: { fontSize: 12, color: ds.semantic.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 8 },
  priceValue: {
    fontFamily: ds.font.display,
    fontSize: 24, fontWeight: '700', color: ds.semantic.accentRecommended,
  },
  estimateTag: {
    fontSize: 11, fontWeight: '600',
    paddingHorizontal: 6, paddingVertical: 2,
    backgroundColor: ds.semantic.accentWarning, color: ds.color.ivory['50'],
    borderRadius: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  label: { fontSize: 14, color: ds.semantic.textMuted },
  value: { fontSize: 14, fontWeight: '600', color: ds.semantic.textPrimary },
  ratings: { flexDirection: 'row', gap: 12, marginVertical: 12 },
  ratingBlock: { flexDirection: 'column', gap: 4 },
  ratingLabel: { fontSize: 11, color: ds.semantic.textMuted },
  ratingBadge: {
    paddingVertical: 4, paddingHorizontal: 8,
    borderRadius: 6, alignSelf: 'flex-start',
  },
  ratingBadgeText: { fontSize: 12, fontWeight: '600' },
  scoreHigh: { backgroundColor: 'rgba(46, 125, 50, 0.18)' },
  scoreMid: { backgroundColor: 'rgba(239, 108, 0, 0.18)' },
  scoreLow: { backgroundColor: 'rgba(198, 40, 40, 0.18)' },
  eco: { fontSize: 12, color: '#2E7D32', marginBottom: 8 },
  notes: { fontSize: 13, color: ds.semantic.textMuted, lineHeight: 18 },
});
```

- [ ] **Step 6: Create `components/VehicleComparison/index.tsx`**

```tsx
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  TransportComparison,
  SortOption,
  TerminalId,
  BaggageType,
  calculateTripComparison,
} from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
import { SortToggle } from './SortToggle';
import { VehicleCard } from './VehicleCard';

interface Props {
  arrivalTime: string;
  terminalId: TerminalId;
  baggageType: BaggageType;
  destinationId: string;
}

export function VehicleComparison({
  arrivalTime,
  terminalId,
  baggageType,
  destinationId,
}: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Pull `isPeakHour` from `metadata` so the peak badge can render.
  // The badge is part of the spec's edge-case copy (story 14: peak-hour
  // surcharge reflected in arrival estimate).
  const { comparisons, isPeakHour } = useMemo(
    () =>
      calculateTripComparison({
        arrivalTime,
        terminalId,
        baggageType,
        destinationId,
        sortBy,
      }),
    [arrivalTime, terminalId, baggageType, destinationId, sortBy]
  );

  const c = resultCopyVi.comparison;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{c.title}</Text>
        {isPeakHour && <Text style={styles.peakBadge}>{c.peakBadge}</Text>}
      </View>

      <SortToggle value={sortBy} onChange={setSortBy} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {comparisons.map((comparison: TransportComparison) => (
          <VehicleCard key={comparison.id} comparison={comparison} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontFamily: ds.font.display, fontSize: 22, fontWeight: '700', color: ds.semantic.textPrimary },
  scroll: { paddingVertical: 12, gap: 16 },
});
```

- [ ] **Step 7: Run the tests**

```bash
npx jest tests/components/VehicleComparison/VehicleComparison.test.tsx
```

Expected: all 3 tests pass.

- [ ] **Step 8: Commit**

```bash
git add components/VehicleComparison/ tests/components/VehicleComparison/
git commit -m "feat(rn): port VehicleComparison with 6 transport cards and sort toggle"
```

---

## Task 13: Wire RN `<VehicleComparison>` into `<ResultDisplay>` (and add a sort test)

**Files:**
- Modify: `components/ResultDisplay/index.tsx`
- Modify: `app/index.tsx`

**Interfaces:**
- Produces: `<ResultDisplay>` renders VehicleComparison under the existing 3 cards
- Passing props: `arrivalTime`, `terminalId` (from form), `baggageType` (from form), `destinationId` (from form)

- [ ] **Step 1: Extend `tests/components/ResultDisplay/ResultDisplay.test.tsx` with a sort-toggle test**

Append to the test file:

```tsx
import { VehicleComparison } from '../../../components/VehicleComparison';
// ... existing imports

describe('<VehicleComparison /> integration', () => {
  it('changes first card when sort is toggled', () => {
    const { getByText, getAllByText } = render(
      <VehicleComparison
        arrivalTime="14:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    const cheapest = getByText(/Giá rẻ nhất/);
    cheapest.props.onPress();
    const allBusCards = getAllByText(/Xe buýt 86/);
    expect(allBusCards.length).toBeGreaterThanOrEqual(1);
  });
});
```

- [ ] **Step 2: Modify `components/ResultDisplay/index.tsx` to import `<VehicleComparison>`**

Add at the top:

```typescript
import { VehicleComparison } from '../VehicleComparison';
import { ArrivalFormData } from '@core';
```

Replace the `Props` interface and the component signature:

```typescript
interface ResultDisplayProps {
  result: ArrivalResult;
  arrivalTime: string;
  terminalId: 'T1' | 'T2';
  baggageType: 'carry_on' | 'checked';
  destinationId: string;
  onBack: () => void;
  onRecalculate: () => void;
}

export function ResultDisplay({
  result,
  arrivalTime,
  terminalId,
  baggageType,
  destinationId,
  onBack,
  onRecalculate,
}: ResultDisplayProps) {
  // ... unchanged header / bus / direction / grab ...
  // Insert <VehicleComparison /> after the Grab card and before the actions:
  <VehicleComparison
    arrivalTime={arrivalTime}
    terminalId={terminalId}
    baggageType={baggageType}
    destinationId={destinationId}
  />
  // ... actions stay the same ...
}
```

- [ ] **Step 3: Modify `app/index.tsx` to pass the form fields**

Update the `<ResultDisplay>` invocation to pass through the four props the component now needs:

```tsx
<ResultDisplay
  result={result}
  arrivalTime={formData.arrivalTime}
  terminalId={formData.terminal ?? 'T1'}
  baggageType={formData.baggage ?? 'carry_on'}
  destinationId={formData.destination ?? 'old-quarter'}
  onBack={() => setAppState('form')}
  onRecalculate={() => {
    reset();
    setResult(null);
    setAppState('form');
  }}
/>
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npx jest tests/components/ResultDisplay/ResultDisplay.test.tsx tests/components/VehicleComparison/VehicleComparison.test.tsx
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/ResultDisplay/index.tsx app/index.tsx tests/components/ResultDisplay/
git commit -m "feat(rn): wire VehicleComparison into ResultDisplay"
```

---

## Task 14: Contract verification (single source of truth)

**Files:**
- Modify: `feature_list.json`
- Modify: `claude-progress.md`

**Interfaces:**
- Produces: structural guarantees verified end-to-end; bookkeeping updated

- [ ] **Step 1: Type-check both surfaces**

```bash
npx tsc --noEmit
cd web && npx tsc --noEmit && cd ..
```

Expected: both exit 0.

- [ ] **Step 2: Run all test suites**

```bash
npm test
cd web && npm test && cd ..
```

Expected: all green.

- [ ] **Step 3: Run a production build (web) to catch Vite alias regressions**

```bash
cd web && npm run build && cd ..
```

Expected: exit 0. (Lessons-learned from Ticket 07: tsc/tests can pass while Vite runtime fails.)

- [ ] **Step 4: Confirm no hardcoded Vietnamese literals inside redesigned RN components**

```bash
grep -nE "ĐỀ XUẤT|giờ cao điểm|Tính lại|Sửa lại|Kết quả|Dựa trên|So sánh phương tiện" \
  components/ResultDisplay/BusRecommendation.tsx \
  components/ResultDisplay/GrabFallback.tsx \
  components/ResultDisplay/DirectionGuide.tsx \
  components/ResultDisplay/index.tsx \
  components/VehicleComparison/*.tsx || echo OK_NO_LITERALS
```

Expected: `OK_NO_LITERALS`.

- [ ] **Step 5: Confirm web CSS modules use only token vars (except intentional score-palette)**

```bash
grep -nE "#[0-9a-fA-F]{3,6}" \
  web/src/components/ResultDisplay/*.module.css \
  web/src/components/VehicleComparison/*.module.css \
  | grep -v "score[1-5]" || echo OK_NO_HEX
```

Expected: only `score[1-5]` matches remain (the green/orange/red rating palette is intentional and documented in the CSS).

- [ ] **Step 6: Confirm both surfaces import from `@design-system`**

```bash
grep -rl "from '@design-system'" \
  components/ web/src/components/ \
  | wc -l
```

Expected: ≥ 4 (RN BusRecommendation, GrabFallback, DirectionGuide; web index/ResultDisplay).

- [ ] **Step 7: Add `feature_list.json` entries**

Append two new entries:

```json
{
  "id": "rn-result-glass-redesign",
  "priority": 12,
  "area": "ui",
  "platform": "react-native",
  "title": "RN result display — glassmorphism + warm palette + VehicleComparison port",
  "user_visible_behavior": "Result screen renders Bus, Direction, Grab, VehicleComparison (6 options) on warm background with translucent glass cards; Vietnamese-only copy; Đề xuất badge on recommended; peak-hour warning when applicable; sort toggle works",
  "status": "passing",
  "verification": "1. npm test -- --testPathPattern='ResultDisplay|VehicleComparison' — passes\n2. npx tsc --noEmit — exits 0\n3. grep hardcoded Vietnamese literals inside components/ResultDisplay/ + components/VehicleComparison/ — no matches\n4. Confirm 6 transport cards render and sort toggle changes order",
  "evidence": "<commit hashes from Tasks 8, 9, 12, 13>",
  "notes": "Tasks 8, 9, 12, 13"
},
{
  "id": "web-result-glass-redesign",
  "priority": 13,
  "area": "ui",
  "platform": "web",
  "title": "Web result display — glassmorphism + warm palette + vi/en i18n",
  "user_visible_behavior": "Result screen renders JourneyTimeline, Bus, Grab, VehicleComparison on warm gradient with glass cards; preserves vi/en LanguageContext toggle; same 6 transport options; sort preference persists in localStorage",
  "status": "passing",
  "verification": "1. cd web && npm test — passes\n2. cd web && npx tsc --noEmit — exits 0\n3. cd web && npm run build — exits 0 (Vite runtime regression check, per Ticket 07 lesson)\n4. Visual: warm gradient + 3 glass tiers visible; Cormorant Garamond + Inter loaded",
  "evidence": "<commit hashes from Tasks 7, 10, 11>",
  "notes": "Tasks 7, 10, 11; preserves existing vi/en LanguageContext"
}
```

- [ ] **Step 8: Update `claude-progress.md`**

Append a new session entry:

```markdown
### Session 12: 2026-07-23

**Goal:** Apply glassmorphism + warm palette to the result screens on both platforms; bring VehicleComparison to RN.

**Completed:**
- Spec at `.scratch/sanbaygo-mvp/issues/08-glassmorphism-warm-result-screen.md`
- Plan at `docs/superpowers/plans/2026-07-24-glassmorphism-warm-result-screen.md`
- Tasks 1-13 executed on branch `feature/glass-warm-result-screen`

**Verification run:** see Task 14 Steps 1-6

**Evidence recorded:** feature_list.json gains `rn-result-glass-redesign` and `web-result-glass-redesign` (status: passing)

**Commits:** see feature_list.json entries' `evidence` fields

**Next best action:** Use `/implement` to start (or pick up from the existing branch state)
```

- [ ] **Step 9: Commit**

```bash
git add feature_list.json claude-progress.md
git commit -m "chore: contract verification for glass-warm result screens (Task 14)"
```

---

## Self-Review

**Spec coverage:**

| Spec section | Covered by |
|---|---|
| Visual identity & design system (stories 1-10) | Tasks 1-3, 5, 6 (warm palette, typography, glass tiers, anti-patterns, MASTER.md, single-source tokens) |
| BusRecommendation card (stories 11-15) | Tasks 8, 9 (RN), 10 (web) |
| Direction/Timeline card (stories 16-19) | Tasks 8, 9 (RN), 10 (web) — vertical/horizontal modes preserved |
| GrabFallback card (stories 20-22) | Tasks 8, 9 (RN), 10 (web) |
| Vehicle Comparison (stories 23-29) | Tasks 7, 11 (web), 12, 13 (RN port) |
| Edge cases & states (stories 30-35) | Task 8 (tests cover unavailable reasons); Task 9 (back/recalculate); Task 7 calc engine already handles peak/edge cases |
| Accessibility & quality (stories 36-40) | Tasks 4 (focus-visible), 5 (prefers-reduced-motion), 6 (font size 16px minimum), 12 (accessibilityLabel), 13 (aria-pressed, accessibilityRole) |
| Anti-patterns (no neon, no AI cliché, no dark mode, no functional emoji) | Task 6 (test-enforced) |
| Pinned constants (50,000 VND Bus 86, 250-350k Grab) | Tests already in `web/__tests__/lib/transport-calculator.test.ts` carry over to `core/tests/...` (Task 7); `design-system/MASTER.md` documents them (Task 1) |
| Tokenized design system spanning primitive→semantic→component | Task 1 (`tokens.json`); semantic layer present in same file; component layer = `ResultCard` tier |
| VehicleComparison ports to RN | Tasks 12, 13 |
| Regression tests (RN render + web render) | Task 8 (RN tests); Task 7 + existing web tests cover web |
| Vietnamese-only RN; vi/en web | Task 4 (RN copy table); Task 10 step 3 (web `results.*` keys) |
| No new business logic | Task 7 is a **relocation**, not new logic; `@core` gains three exports, no type changes |
| Glass + warm palette + token layer | Tasks 1-6 |
| Master document for brand alignment | Task 1 step 4 (`design-system/MASTER.md`) |

**Placeholder scan:**
- No "TODO", "TBD", "fill in later", "implement later" markers.
- No "Similar to Task N" — every step either carries full code or carries a `cat` reference to existing source.
- Steps that describe what to do without showing how: none — every Step has either a code block or a single shell command.

**Type consistency:**
- `resultCopyVi` (Task 4) ↔ RN tests (Task 8, 12) — keys used: `header.title`, `header.basedOn`, `header.peakSuffix`, `bus.title`, `bus.recommendedBadge`, `bus.unavailable.{no_service,too_late,missed_last}`, `bus.waitMinutesUnit`, `direction.title`, `grab.title`, `grab.price`, `grab.travelTime`, `grab.peakSuffix`, `grab.peakWarning`, `grab.disclaimer`, `comparison.title`, `comparison.peakBadge`, `comparison.sort.{recommended,cheapest,fastest}`, `comparison.card.{recommendedBadge,estimateTag,waitLabel,waitMinutesUnit,arrivalLabel,luggageLabel,comfortLabel,eco}`, `actions.back`, `actions.recalculate`. Cross-checked: every consumer references only keys defined in the table.
- `ds` (Task 1) ↔ consumers — keys used: `color.amber.500`, `color.peach.100`, `color.ivory.50`, `glass.1.background`, `glass.2.background`, `glass.3.background`, `shadow.card`, `radius.lg`, `space[1..8]`, `font.display`, `font.body`, `fontSize.{caption,body,title,display}`, `semantic.{surfaceBackground,textPrimary,textMuted,accentRecommended,accentWarning,borderGlass}`. Cross-checked: every consumer uses only tokens defined in `tokens.json`.
- `TransportComparison` shape ↔ both web and RN consumers — both use the same fields (`id`, `name`, `nameVi`, `type`, `price.{estimate,value,isEstimate}`, `travelTime.{estimate,minutesRange,arrivalEstimate}`, `waitTime.{minutes,nextDeparture}`, `luggage.{score,label}`, `comfort.{score,label}`, `ecoFriendly`, `notes`, `isRecommended`). The existing web card uses the same shape; the RN port uses the same shape.
- `calculateTripComparison` signature ↔ both consumers — both pass `{ arrivalTime, terminalId, baggageType, destinationId, sortBy }` and read `{ comparison, metadata: { arrivalTime, readyAt, isPeakHour } }`. Same in web and RN.
- `ResultCard` tier prop — RN variant uses `tier={1|2|3}`; web variant uses `tier={1|2|3}` (default `1`). Both accept `GlassTier = 1 | 2 | 3`.

**Issues found during self-review and fixed inline:**

| # | Issue | Fix |
|---|---|---|
| 1 | Spec claimed `calculateTripComparison` already lives in `@core` — it doesn't | Task 7 relocates it (not new logic) |
| 2 | `expo-linear-gradient` in briefs adds a dependency | Task 9 uses static `<View backgroundColor>` instead |
| 3 | `module-resolver` Babel plugin in briefs adds a dependency | Task 2 uses `metro.config.js` `resolver.alias` instead |
| 4 | No existing `metro.config.js` | Task 2 creates it |
| 5 | Root jest config is **inline in `package.json`**, not `jest.config.js` | Task 6 step 1 + 2b now edit `package.json`'s `"jest"` block |
| 6 | Plan uses `@testing-library/react-native` 3× but it's not installed | Task 6 step 2a adds it to devDependencies |
| 7 | `<RecommendedBadge position:absolute top:-10>` would anchor to screen, not card | Task 5 step 1 adds `position: 'relative'` to `ResultCard.base` |
| 8 | Five `'#FFFCF8'` hex literals leaked into RN StyleSheets after creating `ds.color.ivory['50']` token | All five replaced with `ds.color.ivory['50']` in Tasks 8, 9, 12 |
| 9 | `noUnusedLocals` / `noUnusedParameters` strict mode breaks `estimatedMinutes: _` | Task 9 step 1 uses `_estimatedMinutes` (the leading underscore IS the convention for `noUnusedParameters`) |
| 10 | Task 12 step 1 test asserts peak badge appears, but step 6 never renders it | Task 12 step 6 now reads `isPeakHour` from `metadata` and renders `<Text style={styles.peakBadge}>` |
| 11 | `getTransportOption` was being dropped on relocation without checking if used | Task 7 step 3a YAGNI check; conditional export |
| 12 | `valueStyle?: any` defeats types | Task 8 step 3 uses `valueStyle?: TextStyle` |
| 13 | `${...}.toLocaleString('vi-VN')` is locale-dependent — fragile in CI | Task 8 introduces `formatVnd(value)` manual dot-thousands formatter |
| 14 | `web/__mocks__/styleMock.js` exists (verified) — `ResultCard.web.tsx` will work | Confirmed in step 6 of the file-existence audit |

The plan is internally consistent. Ready for execution.

---

**Plan complete and saved to `docs/superpowers/plans/2026-07-24-glassmorphism-warm-result-screen.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints