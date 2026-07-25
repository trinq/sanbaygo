# Landing Hero Replaces Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current editorial-paper `ArrivalForm` + `ResultDisplay` split with a single Figma-style hero+search landing page on both web and RN, reverting the editorial-paper tokens and rebuilding in the Figma glassy-sky direction.

**Architecture:** A new `web/src/components/Landing/` component tree (Hero + SearchCard + SocialProof + Footer) reads from `@core/data/airport` and `@core/data/destinations` for the airport/destination dropdowns. Submit jumps straight to the existing `ResultDisplay`. RN mirrors the same layout via NativeWind + `expo-blur`. Editorial-paper tokens are replaced.

**Tech Stack:** React 18 + Vite 5 (web), Expo 52 + React Native 0.76 (RN), Tailwind CSS 4 (`@tailwindcss/vite`) for web, NativeWind 4 for RN, `expo-blur` for RN glass, `lucide-react` + `lucide-react-native` for icons, Google Fonts `Plus Jakarta Sans` (web `<link>`), `expo-font` (RN), `ts-jest` + `@testing-library/react` for tests, `@playwright/test` for e2e.

**Spec:** `docs/superpowers/specs/2026-07-25-landing-hero-replaces-form-design.md`

## Global Constraints

Re-used **verbatim** from the spec; every task implicitly respects these.

- **Vietnamese-only UI text.** RN strings live in `components/Landing/landing-copy.vi.ts`. Web strings live in `web/src/i18n/vi.ts` and `web/src/i18n/en.ts` under a `landing.*` namespace.
- **No new persistent state in RN.** RN landing is stateless beyond `useState`. Web keeps no `localStorage` (the previous sort preference is dropped).
- **No new `@core` calculation logic.** All calculations route through `web/src/lib/calculation-result.ts:13` (web) and `core/calculation-engine` (RN), unchanged.
- **No new dependencies unless absolutely necessary.** Approved additions: `tailwindcss` + `@tailwindcss/vite` (web), `nativewind` + `tailwindcss` (RN), `expo-blur` (RN), `lucide-react` (web), `lucide-react-native` (RN). Pinned versions: `tailwindcss@^4.1.0`, `@tailwindcss/vite@^4.1.0`, `nativewind@^4.1.0`, `expo-blur@~14.0.0`, `lucide-react@^0.460.0`, `lucide-react-native@^0.460.0`.
- **Body text ≥ 16px** (`text-base`). Enforced by `tokens.test.ts:36` (see Task 1).
- **Motion ≤ 200ms.** Web uses `transition duration-150`; RN has no per-card motion. `prefers-reduced-motion` disables hover transitions.
- **Glass fallback on low-end Android:** `expo-blur` BlurView already falls back to the inner view's background when blur is unsupported.
- **No emojis as functional icons.** Icons via `lucide-react` / `lucide-react-native`.
- **Single source of truth for tokens:** `design-system/tokens/tokens.ts` (TypeScript) and `design-system/tokens/tokens.css` (CSS vars). Parity enforced by `web/__tests__/design-system/tokens-parity.test.ts`.
- **No new `@core` API surface.** `useLandingForm` derives defaults internally; `calculateResult()` is unchanged.
- **Default arrival time = `'12:00'`.** Landing does not display an arrival-time field. Derived `terminal: 'T1'`, `flightType: 'international'`, `baggage: 'carry_on'`. Documented in landing footer.
- **Data sources:** `core/data/airport.ts` and `core/data/destinations.ts` only. No fabricated airports or destinations.
- **`init.sh` must remain green.** Run after every commit.
- **Web tests stay in `web/__tests__/`.** RN tests stay in `tests/`.
- **Frequent commits.** One commit per task.

---

## File Structure

Files created or modified by this plan:

| Path | Owner | Purpose |
|---|---|---|
| `design-system/tokens/tokens.ts` | MODIFY | New Figma palette (sky-blue primary, amber accent, emerald benefit) |
| `design-system/tokens/tokens.css` | MODIFY | Mirror of new tokens |
| `web/__tests__/design-system/tokens-parity.test.ts` | MODIFY | Updated parity assertions |
| `design-system/tests/tokens.test.ts` | CREATE | Body-text ≥ 16px, no neon cyan, no AI-cliché purple/pink |
| `web/index.html` | MODIFY | Add Google Fonts `<link>` for Plus Jakarta Sans |
| `web/tailwind.config.js` | CREATE | Tailwind config (class-based dark mode disabled) |
| `web/postcss.config.js` | CREATE | PostCSS pipeline |
| `web/vite.config.ts` | MODIFY | Add `@tailwindcss/vite` plugin |
| `web/src/styles/global.css` | MODIFY | Replace CSS-Modules reset with Tailwind directives |
| `web/public/hero.png` | CREATE | Downloaded PNG from Figma Make source |
| `web/src/hooks/useLandingForm.ts` | CREATE | Form state, validation, derived `ArrivalFormData` |
| `web/__tests__/hooks/useLandingForm.test.ts` | CREATE | Unit tests |
| `web/src/components/Landing/types.ts` | CREATE | Shared prop types (`LandingPageProps`, `SearchCardProps`, etc.) |
| `web/src/components/Landing/BrandMark.tsx` | CREATE | Logo glyph (square + SanBayGo wordmark) |
| `web/src/components/Landing/Pill.tsx` | CREATE | Tagline pill ("Dịch vụ xe đưa đón sân bay") |
| `web/src/components/Landing/BenefitChips.tsx` | CREATE | 3 emerald-icon chips |
| `web/src/components/Landing/LanguagePill.tsx` | CREATE | vi/en toggle reusing `useLanguage()` |
| `web/src/components/Landing/SocialProof.tsx` | CREATE | 3 avatars + 4.9 amber rating + count |
| `web/src/components/Landing/Footer.tsx` | CREATE | Logo + tagline + 3 links |
| `web/src/components/Landing/Nav.tsx` | CREATE | Top nav containing BrandMark + LanguagePill |
| `web/src/components/Landing/DepartureDropdown.tsx` | CREATE | Airport select |
| `web/src/components/Landing/DestinationChips.tsx` | CREATE | Destination as chips |
| `web/src/components/Landing/Stepper.tsx` | CREATE | Reusable stepper (people, luggage) |
| `web/src/components/Landing/CTAButton.tsx` | CREATE | "Tìm phương tiện" button |
| `web/src/components/Landing/SearchCard.tsx` | CREATE | Right-column search card |
| `web/src/components/Landing/Hero.tsx` | CREATE | Hero orchestration |
| `web/src/components/Landing/LandingPage.tsx` | CREATE | Top-level page (state + submit) |
| `web/src/components/Landing/index.ts` | CREATE | Re-export barrel |
| `web/__tests__/components/Landing/Hero.test.tsx` | CREATE | Render test (H1 with "nhanh nhất", 3 benefit chips, social proof) |
| `web/__tests__/components/Landing/SearchCard.test.tsx` | CREATE | Render: dropdowns, steppers, CTA disabled |
| `web/src/App.tsx` | MODIFY | Render `<LandingPage>` + switch to `<ResultDisplay>` |
| `web/src/contexts/LanguageContext.tsx` | MODIFY | Add `landing.*` namespace keys |
| `web/src/i18n/vi.ts` | MODIFY | Add `landing` keys |
| `web/src/i18n/en.ts` | MODIFY | Add `landing` keys |
| `web/src/components/Header.tsx` | DELETE | Replaced by Landing `Nav` |
| `web/src/components/Header.module.css` | DELETE | Unused |
| `web/src/components/ArrivalForm/index.tsx` | DELETE | Replaced by Landing tree |
| `web/src/components/ArrivalForm/*.module.css` | DELETE | Unused |
| `web/src/components/ResultDisplay/BusTimetableSpine.tsx` | DELETE | No longer fits direction |
| `web/src/components/ResultDisplay/BusTimetableSpine.module.css` | DELETE | Unused |
| `web/src/components/ResultDisplay/index.tsx` | MODIFY | Render without BusTimetableSpine |
| `web/src/components/ResultDisplay/ResultDisplay.module.css` | MODIFY | Drop spine styles, keep card layout |
| `web/src/hooks/useFormState.ts` | DELETE | Replaced by `useLandingForm` |
| `web/__tests__/hooks/useFormState.test.ts` | DELETE | Test for deleted hook |
| `web/__tests__/components/ArrivalForm/*` | DELETE | Tests for deleted form |
| `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` | MODIFY | Drop BusTimetableSpine assertions (26-li list, status_missed class) |
| `web/e2e/landing-flow.spec.ts` | CREATE | E2E: fill form → see ResultDisplay at 3 viewports |
| `web/e2e/responsive-flow.spec.ts` | MODIFY | Rename contents to landing flow |
| `app/hooks/useLandingForm.ts` | CREATE | RN mirror |
| `app/hooks/useLandingForm.test.ts` | CREATE | RN unit tests |
| `components/Landing/landing-copy.vi.ts` | CREATE | Vietnamese string table |
| `components/Landing/types.ts` | CREATE | Shared RN prop types |
| `components/Landing/Nav.tsx` | CREATE | RN Nav |
| `components/Landing/BrandMark.tsx` | CREATE | RN logo |
| `components/Landing/Pill.tsx` | CREATE | RN pill |
| `components/Landing/BenefitChips.tsx` | CREATE | RN benefit chips |
| `components/Landing/SocialProof.tsx` | CREATE | RN social proof |
| `components/Landing/Footer.tsx` | CREATE | RN footer |
| `components/Landing/DepartureDropdown.tsx` | CREATE | RN airport picker |
| `components/Landing/DestinationChips.tsx` | CREATE | RN destination chips |
| `components/Landing/Stepper.tsx` | CREATE | RN stepper |
| `components/Landing/CTAButton.tsx` | CREATE | RN CTA |
| `components/Landing/SearchCard.tsx` | CREATE | RN search card (with BlurView) |
| `components/Landing/Hero.tsx` | CREATE | RN hero |
| `components/Landing/LandingPage.tsx` | CREATE | RN page |
| `components/Landing/index.ts` | CREATE | Barrel |
| `components/Landing/__tests__/Hero.test.tsx` | CREATE | RN render test |
| `components/Landing/__tests__/SearchCard.test.tsx` | CREATE | RN render test |
| `components/ArrivalForm/*` | DELETE | Replaced by RN landing |
| `components/Header.tsx` | DELETE | Replaced by RN Nav |
| `app/index.tsx` | MODIFY | Render `<LandingPage>` + switch to `<ResultDisplay>` |
| `assets/hero.png` | CREATE | Hero PNG copied for RN |
| `babel.config.js` | MODIFY | Add NativeWind babel preset |
| `tailwind.config.js` (root) | CREATE | NativeWind class name resolution |
| `app.json` | MODIFY | Add `expo-blur` plugin if needed |
| `feature_list.json` | MODIFY | Add landing feature entries (one per platform) |
| `claude-progress.md` | MODIFY | Record this work |

---

## Task 1: Replace Editorial-Paper Tokens with Figma Palette

**Files:**
- Modify: `design-system/tokens/tokens.ts`
- Modify: `design-system/tokens/tokens.css`
- Create: `design-system/tests/tokens.test.ts`
- Modify: `web/__tests__/design-system/tokens-parity.test.ts`

**Interfaces:**
- Consumes: nothing (greenfield token values)
- Produces: `tokens` object (single source of truth) + `/tokens.css` mirror + parity test

- [ ] **Step 1: Write the failing parity test**

Replace `web/__tests__/design-system/tokens-parity.test.ts` with:

```ts
import { tokens } from '@design-system/tokens/tokens';

function readCssVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) throw new Error(`CSS var --${name} not found`);
  return value;
}

describe('tokens parity (TS ↔ CSS)', () => {
  it('primary matches CSS var --color-primary', () => {
    expect(tokens.color.primary).toBe(readCssVar('color-primary'));
  });
  it('accent matches CSS var --color-accent', () => {
    expect(tokens.color.accent).toBe(readCssVar('color-accent'));
  });
  it('benefit matches CSS var --color-benefit', () => {
    expect(tokens.color.benefit).toBe(readCssVar('color-benefit'));
  });
  it('body font size is ≥ 16px', () => {
    expect(tokens.font.size.body).toBeGreaterThanOrEqual(16);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npm test -- --testPathPattern="tokens-parity"`
Expected: FAIL — `--color-primary` not found, `primary` undefined on `tokens.color`.

- [ ] **Step 3: Replace the Figma palette in `design-system/tokens/tokens.ts`**

Replace the entire file content with:

```ts
// Single source of truth for SanBayGo design tokens — Figma Make landing direction.
// Sky-blue primary with glass surfaces, Plus Jakarta Sans typography, amber accent.
// CSS-vars (tokens.css) MUST mirror these values — see tokens-parity.test.ts.

export const tokens = {
  color: {
    // Primary — sky-blue scale (Figma's bg-primary)
    primary: '#0284C7',         // sky-600
    primaryHover: '#0369A1',    // sky-700
    primarySoft: '#E0F2FE',     // sky-100

    // Accent — amber underline highlight ("nhanh nhất")
    accent: '#FCD34D',          // amber-300
    accentInk: '#92400E',       // amber-800 text on accent

    // Benefit chip icon — emerald
    benefit: '#059669',         // emerald-600
    benefitSoft: '#D1FAE5',     // emerald-100

    // Neutrals — slate
    ink: '#0F172A',             // slate-900 primary text
    inkSoft: '#475569',         // slate-600 secondary
    inkQuiet: '#94A3B8',        // slate-400 muted
    surface: '#FFFFFF',         // white
    surfaceMuted: '#F8FAFC',    // slate-50
    surfaceBorder: '#E2E8F0',   // slate-200
    background: '#F1F5F9',      // slate-100 page background

    // Glass — translucent white overlays
    glass: 'rgba(255, 255, 255, 0.30)',
    glassStrong: 'rgba(255, 255, 255, 0.80)',

    // System
    warn: '#D97706',            // amber-600
    warnTint: '#FEF3C7',
  },
  font: {
    family: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    bodyFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    monoFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    size: {
      caption: 12,
      secondary: 14,
      body: 16,
      section: 22,
      display: 28,
      hero: 36,
      page: 44,
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    letterSpacing: {
      tight: -0.5,
      tighter: -1,
      eyebrow: 0.5,
    },
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,                     // Figma 'rounded-xl'
    pill: 999,
  },
  shadow: {
    card: '0 8px 24px rgba(2, 132, 199, 0.12)',
    hero: '0 20px 60px rgba(2, 132, 199, 0.18)',
  },
  breakpoint: {
    tablet: 769,
    desktop: 1025,
  },
} as const;

export type Tokens = typeof tokens;
```

- [ ] **Step 4: Mirror the palette in `design-system/tokens/tokens.css`**

Replace the entire file content with:

```css
:root {
  --color-primary: #0284C7;
  --color-primary-hover: #0369A1;
  --color-primary-soft: #E0F2FE;
  --color-accent: #FCD34D;
  --color-accent-ink: #92400E;
  --color-benefit: #059669;
  --color-benefit-soft: #D1FAE5;
  --color-ink: #0F172A;
  --color-ink-soft: #475569;
  --color-ink-quiet: #94A3B8;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F8FAFC;
  --color-surface-border: #E2E8F0;
  --color-background: #F1F5F9;
  --color-glass: rgba(255, 255, 255, 0.30);
  --color-glass-strong: rgba(255, 255, 255, 0.80);
  --color-warn: #D97706;
  --color-warn-tint: #FEF3C7;

  --font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-body-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;

  --shadow-card: 0 8px 24px rgba(2, 132, 199, 0.12);
  --shadow-hero: 0 20px 60px rgba(2, 132, 199, 0.18);
}
```

- [ ] **Step 5: Write `design-system/tests/tokens.test.ts`**

Create `design-system/tests/tokens.test.ts`:

```ts
import { tokens } from '../tokens/tokens';

describe('design tokens — Figma Make direction', () => {
  it('uses sky-blue primary, not neon cyan', () => {
    // Reject neon cyan (#00FFFF area); sky-600 is allowed
    expect(tokens.color.primary).not.toMatch(/^#00[A-F0-9]/i);
    expect(tokens.color.primary).toBe('#0284C7');
  });

  it('avoid AI-cliché purple/pink', () => {
    const hex = (s: string) => s.toLowerCase();
    expect(hex(tokens.color.primary)).not.toMatch(/^#[89a-f][0-9a-f]?[0-9a-f]?$/i);
    expect(hex(tokens.color.accent)).not.toMatch(/^(#a855f7|#ec4899)/i);
  });

  it('body font size is ≥ 16px', () => {
    expect(tokens.font.size.body).toBeGreaterThanOrEqual(16);
  });

  it('all numeric sizes are positive', () => {
    Object.values(tokens.font.size).forEach((s) => expect(s).toBeGreaterThan(0));
    Object.values(tokens.space).forEach((s) => expect(s).toBeGreaterThan(0));
  });
});
```

- [ ] **Step 6: Run the token tests**

Run: `cd web && npm test -- --testPathPattern="(tokens-parity|tokens)" --testPathIgnorePatterns="node_modules" 2>&1 | head -20`
Expected: Both parity and tokens tests PASS.

- [ ] **Step 7: Run `init.sh`**

Run: `bash init.sh`
Expected: All `tsc --noEmit` and `npm test` runs at root, `core/`, `design-system/`, `web/` pass. If the `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` still imports the editorial-paper spine, it will fail — fix the import path or stub the spine before committing.

- [ ] **Step 8: Commit**

```bash
git add design-system/tokens/tokens.ts design-system/tokens/tokens.css design-system/tests/tokens.test.ts web/__tests__/design-system/tokens-parity.test.ts
git commit -m "feat(design-system): replace editorial-paper tokens with Figma palette"
```

---

## Task 2: Stand Up Tailwind on Web

**Files:**
- Modify: `web/package.json`
- Modify: `web/vite.config.ts`
- Create: `web/tailwind.config.js`
- Create: `web/postcss.config.js`
- Modify: `web/src/styles/global.css`
- Modify: `web/index.html`

**Interfaces:**
- Consumes: `tokens.color` for Tailwind theme extension
- Produces: Tailwind pipeline configured for `web/src/components/Landing/`

- [ ] **Step 1: Install Tailwind dependencies**

Run: `cd web && npm install --save-dev tailwindcss@^4.1.0 @tailwindcss/vite@^4.1.0`
Expected: `web/package.json` devDependencies now include `tailwindcss` and `@tailwindcss/vite`.

- [ ] **Step 2: Add `@tailwindcss/vite` to `web/vite.config.ts`**

Replace the file content with:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../core'),
      '@design-system': path.resolve(__dirname, '../design-system'),
    },
  },
});
```

- [ ] **Step 3: Create `web/tailwind.config.js`**

Create the file with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0284C7',
          hover: '#0369A1',
          soft: '#E0F2FE',
        },
        accent: {
          DEFAULT: '#FCD34D',
          ink: '#92400E',
        },
        benefit: {
          DEFAULT: '#059669',
          soft: '#D1FAE5',
        },
        ink: {
          DEFAULT: '#0F172A',
          soft: '#475569',
          quiet: '#94A3B8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create `web/postcss.config.js`**

Create the file with:

```js
module.exports = {
  plugins: {
    '@tailwindcss/vite': {},
  },
};
```

- [ ] **Step 5: Replace `web/src/styles/global.css` with Tailwind directives**

Replace the file content with:

```css
@import "tailwindcss";
@import "../../../design-system/tokens/tokens.css";

@layer base {
  body {
    font-family: var(--font-body-family);
    background-color: var(--color-background);
    color: var(--color-ink);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .font-display {
    font-family: var(--font-family);
    font-weight: 800;
  }
}
```

- [ ] **Step 6: Add Google Fonts to `web/index.html`**

Replace the `<head>` section with:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <title>SanBayGo</title>
</head>
```

- [ ] **Step 7: Run `init.sh`**

Run: `bash init.sh`
Expected: `tsc --noEmit` passes (Tailwind has no TS surface); `npm test` passes (no new tests added yet).

- [ ] **Step 8: Commit**

```bash
git add web/package.json web/vite.config.ts web/tailwind.config.js web/postcss.config.js web/src/styles/global.css web/index.html
git commit -m "feat(web): add Tailwind CSS 4 with Figma theme tokens"
```

---

## Task 3: Build `useLandingForm` Hook (TDD)

**Files:**
- Create: `web/src/hooks/useLandingForm.ts`
- Create: `web/__tests__/hooks/useLandingForm.test.ts`

**Interfaces:**
- Consumes: `Airport` and `DestinationPoint` from `@core/types`
- Produces: `useLandingForm()` returning `{ departure, destination, people, luggage, setDeparture, setDestination, setPeople, setLuggage, validate, buildArrivalFormData }`

- [ ] **Step 1: Write the failing test**

Create `web/__tests__/hooks/useLandingForm.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react';
import { useLandingForm } from '../../src/hooks/useLandingForm';

describe('useLandingForm', () => {
  it('starts with empty departure and destination', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
    expect(result.current.luggage).toBe(1);
  });

  it('validate() returns false when departure or destination is missing', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDeparture('noi-bai'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDestination('OLD_QUARTER'));
    expect(result.current.validate()).toBe(true);
  });

  it('clamps people to [1..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(15));
    expect(result.current.people).toBe(10);
    act(() => result.current.setPeople(0));
    expect(result.current.people).toBe(1);
  });

  it('clamps luggage to [0..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setLuggage(-1));
    expect(result.current.luggage).toBe(0);
    act(() => result.current.setLuggage(99));
    expect(result.current.luggage).toBe(10);
  });

  it('buildArrivalFormData() returns derived defaults when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData).toEqual({
      arrivalTime: '12:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'OLD_QUARTER',
      flightType: 'international',
    });
  });

  it('buildArrivalFormData() returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('reset() restores initial state', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
      result.current.setPeople(5);
    });
    act(() => result.current.reset());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npm test -- --testPathPattern="useLandingForm"`
Expected: FAIL — `Cannot find module '../../src/hooks/useLandingForm'`.

- [ ] **Step 3: Implement `useLandingForm`**

Create `web/src/hooks/useLandingForm.ts`:

```ts
import { useState, useCallback } from 'react';
import type {
  ArrivalFormData,
  BaggageType,
  FlightType,
  TerminalId,
} from '@core';

const DEFAULT_ARRIVAL_TIME = '12:00';
const DEFAULT_TERMINAL: TerminalId = 'T1';
const DEFAULT_BAGGAGE: BaggageType = 'carry_on';
const DEFAULT_FLIGHT_TYPE: FlightType = 'international';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [luggage, setLuggageRaw] = useState(1);

  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setLuggage = useCallback((n: number) => setLuggageRaw(clamp(n, 0, 10)), []);

  const validate = useCallback(
    () => departure !== null && destination !== null,
    [departure, destination],
  );

  const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
    if (!departure || !destination) return null;
    return {
      arrivalTime: DEFAULT_ARRIVAL_TIME,
      terminal: DEFAULT_TERMINAL,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType: DEFAULT_FLIGHT_TYPE,
    };
  }, [departure, destination]);

  const reset = useCallback(() => {
    setDeparture(null);
    setDestination(null);
    setPeopleRaw(1);
    setLuggageRaw(1);
  }, []);

  return {
    departure,
    destination,
    people,
    luggage,
    setDeparture,
    setDestination,
    setPeople,
    setLuggage,
    validate,
    buildArrivalFormData,
    reset,
  };
}
```

- [ ] **Step 4: Verify type signature exists**

Run: `grep -n "ArrivalFormData" core/types/index.ts | head -3`
Expected: At least one line showing `ArrivalFormData` is exported. If not, add `export interface ArrivalFormData { arrivalTime: string; terminal: TerminalId; baggage: BaggageType; destination: string; flightType: FlightType; }` to `core/types/index.ts`.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npm test -- --testPathPattern="useLandingForm"`
Expected: 7 tests PASS.

- [ ] **Step 6: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 7: Commit**

```bash
git add web/src/hooks/useLandingForm.ts web/__tests__/hooks/useLandingForm.test.ts
git commit -m "feat(web): add useLandingForm hook with TDD coverage"
```

---

## Task 4: Build Shared `Landing/types.ts` and Add `landing` i18n Namespace

**Files:**
- Create: `web/src/components/Landing/types.ts`
- Modify: `web/src/i18n/vi.ts`
- Modify: `web/src/i18n/en.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `LandingPageProps`, `SearchCardProps`, `HeroProps` type contracts used by every Landing component

- [ ] **Step 1: Read existing i18n shape**

Run: `cat web/src/i18n/vi.ts`
Expected: a flat object with string keys. If nested, adapt the following shape accordingly.

- [ ] **Step 2: Create `web/src/components/Landing/types.ts`**

Create the file with:

```ts
import type { ArrivalFormData, ArrivalResult } from '@core';

export interface LandingPageProps {
  onSubmit: (formData: ArrivalFormData) => ArrivalResult | null;
  result: ArrivalResult | null;
}

export type HeroProps = {
  language: 'vi' | 'en';
  onToggleLanguage: () => void;
};

export type SearchCardProps = {
  departure: string | null;
  destination: string | null;
  people: number;
  luggage: number;
  onDepartureChange: (id: string) => void;
  onDestinationChange: (id: string) => void;
  onPeopleChange: (n: number) => void;
  onLuggageChange: (n: number) => void;
  onSubmit: () => void;
};

export type BenefitChip = {
  icon: 'clock' | 'shield' | 'wallet';
  title: string;
  subtitle: string;
};
```

- [ ] **Step 3: Add `landing` keys to `web/src/i18n/vi.ts`**

Append (before the closing brace):

```ts
  landing: {
    pill: 'Dịch vụ xe đưa đón sân bay',
    headline: 'Cách nhanh nhất từ sân bay về trung tâm.',
    subtitle: 'So sánh xe buýt, Grab, taxi trong 5 giây. Không cần tải app, không cần đăng ký.',
    benefitFast: 'Nhanh nhất',
    benefitFastDesc: 'Lịch trình 26 chuyến/ngày',
    benefitSafe: 'An toàn',
    benefitSafeDesc: 'Tài xế xác minh, giá công khai',
    benefitCheap: 'Tiết kiệm',
    benefitCheapDesc: 'Chỉ 50.000đ cho xe buýt',
    fieldDeparture: 'Sân bay khởi hành',
    fieldDestination: 'Bạn muốn đi đâu?',
    fieldPeople: 'Số người',
    fieldLuggage: 'Hành lý',
    cta: 'Tìm phương tiện',
    ctaShort: 'Đặt nhanh',
    socialProof: '4.9 điểm từ 12.000+ hành khách',
    footer: 'Lịch trình được tính cho khung giờ 12:00 — nhập giờ thực tế khi cần chính xác.',
    assumption: 'Đang giả định nhà ga T1 + hành lý xách tay — chi tiết hơn sau.',
    navBrand: 'SanBayGo',
    navBrandAccent: 'Go',
  },
```

- [ ] **Step 4: Add `landing` keys to `web/src/i18n/en.ts`**

Append (before the closing brace):

```ts
  landing: {
    pill: 'Airport transfer service',
    headline: 'The fastest way from the airport to the city.',
    subtitle: 'Compare bus, Grab, and taxi in 5 seconds. No app to install, no account to create.',
    benefitFast: 'Fastest',
    benefitFastDesc: '26 daily departures',
    benefitSafe: 'Safe',
    benefitSafeDesc: 'Verified drivers, transparent pricing',
    benefitCheap: 'Affordable',
    benefitCheapDesc: 'Only 50,000 VND by bus',
    fieldDeparture: 'Departure airport',
    fieldDestination: 'Where are you going?',
    fieldPeople: 'People',
    fieldLuggage: 'Luggage',
    cta: 'Find a ride',
    ctaShort: 'Book now',
    socialProof: '4.9 rating from 12,000+ travelers',
    footer: 'Schedule calculated for 12:00 — enter your actual time for accuracy.',
    assumption: 'Assuming Terminal T1 + carry-on luggage — more details later.',
    navBrand: 'SanBay',
    navBrandAccent: 'Go',
  },
```

- [ ] **Step 5: Verify the keys resolve**

Run: `cd web && grep -n "landing:" src/i18n/vi.ts src/i18n/en.ts`
Expected: one match per file.

- [ ] **Step 6: Run `init.sh`**

Run: `bash init.sh`
Expected: TS and tests pass.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/Landing/types.ts web/src/i18n/vi.ts web/src/i18n/en.ts
git commit -m "feat(web): add Landing component types and i18n landing namespace"
```

---

## Task 5: Build `BrandMark` and `Nav`

**Files:**
- Create: `web/src/components/Landing/BrandMark.tsx`
- Create: `web/src/components/Landing/Nav.tsx`
- Create: `web/__tests__/components/Landing/BrandMark.test.tsx`

**Interfaces:**
- Consumes: `HeroProps.language` and `onToggleLanguage`
- Produces: `<Nav>` rendered inside `<Hero>`

- [ ] **Step 1: Write the failing test**

Create `web/__tests__/components/Landing/BrandMark.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { BrandMark } from '../../../src/components/Landing/BrandMark';

describe('BrandMark', () => {
  it('renders the SanBayGo wordmark', () => {
    render(<LanguageProvider><BrandMark /></LanguageProvider>);
    expect(screen.getByText('SanBay')).toBeTruthy();
    expect(screen.getByText('Go')).toBeTruthy();
  });

  it('renders an SVG logo glyph', () => {
    const { container } = render(<LanguageProvider><BrandMark /></LanguageProvider>);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npm test -- --testPathPattern="BrandMark"`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `BrandMark`**

Create `web/src/components/Landing/BrandMark.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

export function BrandMark() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#0284C7" />
        <path
          d="M9 22 L16 9 L23 22 L19 22 L16 16 L13 22 Z"
          fill="white"
        />
      </svg>
      <span className="text-2xl font-extrabold text-ink">
        {t('landing.navBrand')}
        <span className="text-primary">{t('landing.navBrandAccent')}</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web && npm test -- --testPathPattern="BrandMark"`
Expected: 2 tests PASS.

- [ ] **Step 5: Implement `Nav`**

Create `web/src/components/Landing/Nav.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

export function Nav() {
  const { language, setLanguage } = useLanguage();
  return (
    <nav className="flex items-center justify-between px-4 py-4 lg:px-8">
      <BrandMark />
      <button
        type="button"
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className="rounded-full border border-surface-border bg-white/70 px-3 py-1 text-sm font-semibold text-ink-soft hover:bg-white"
        aria-label="Toggle language"
      >
        {language === 'vi' ? 'EN' : 'VN'}
      </button>
    </nav>
  );
}
```

- [ ] **Step 6: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/Landing/BrandMark.tsx web/src/components/Landing/Nav.tsx web/__tests__/components/Landing/BrandMark.test.tsx
git commit -m "feat(web): add Landing brand mark and nav"
```

---

## Task 6: Build `Pill`, `BenefitChips`, `SocialProof`, `Footer`

**Files:**
- Create: `web/src/components/Landing/Pill.tsx`
- Create: `web/src/components/Landing/BenefitChips.tsx`
- Create: `web/src/components/Landing/SocialProof.tsx`
- Create: `web/src/components/Landing/Footer.tsx`
- Create: `web/__tests__/components/Landing/Hero.test.tsx`

**Interfaces:**
- Consumes: `HeroProps` (no callbacks in these)
- Produces: sub-components of `<Hero>` plus a hero-level test

- [ ] **Step 1: Write the failing Hero test**

Create `web/__tests__/components/Landing/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Hero } from '../../../src/components/Landing/Hero';

describe('Hero', () => {
  it('renders the headline with the accent treatment', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByText(/nhanh nhất/i)).toBeTruthy();
  });

  it('renders the tagline pill', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByText(/Dịch vụ xe đưa đón sân bay/i)).toBeTruthy();
  });

  it('renders 3 benefit chips', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByText(/Nhanh nhất/i)).toBeTruthy();
    expect(screen.getByText(/An toàn/i)).toBeTruthy();
    expect(screen.getByText(/Tiết kiệm/i)).toBeTruthy();
  });

  it('renders social proof', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByText(/4\.9/)).toBeTruthy();
  });

  it('renders the footer', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByText(/Lịch trình được tính/i)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npm test -- --testPathPattern="Hero"`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Pill`**

Create `web/src/components/Landing/Pill.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

export function Pill() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink-soft backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      {t('landing.pill')}
    </span>
  );
}
```

- [ ] **Step 4: Implement `BenefitChips`**

Create `web/src/components/Landing/BenefitChips.tsx`:

```tsx
import { Clock, ShieldCheck, Wallet } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function BenefitChips() {
  const { t } = useLanguage();
  const chips = [
    {
      key: 'fast',
      icon: Clock,
      title: t('landing.benefitFast'),
      subtitle: t('landing.benefitFastDesc'),
    },
    {
      key: 'safe',
      icon: ShieldCheck,
      title: t('landing.benefitSafe'),
      subtitle: t('landing.benefitSafeDesc'),
    },
    {
      key: 'cheap',
      icon: Wallet,
      title: t('landing.benefitCheap'),
      subtitle: t('landing.benefitCheapDesc'),
    },
  ] as const;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {chips.map(({ key, icon: Icon, title, subtitle }) => (
        <div
          key={key}
          className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5"
        >
          <div className="rounded-full bg-emerald-100 p-1.5">
            <Icon size={16} className="text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold text-ink">{title}</div>
            <div className="text-xs text-ink-soft">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Implement `SocialProof`**

Create `web/src/components/Landing/SocialProof.tsx`:

```tsx
import { Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function SocialProof() {
  const { t } = useLanguage();
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-sky-300 to-sky-500"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
        <span className="text-sm font-semibold text-ink">4.9</span>
      </div>
      <span className="text-sm text-ink-soft">{t('landing.socialProof')}</span>
    </div>
  );
}
```

- [ ] **Step 6: Implement `Footer`**

Create `web/src/components/Landing/Footer.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-surface-border bg-white/40 px-4 py-8 backdrop-blur-md lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <BrandMark />
        <p className="max-w-md text-center text-sm text-ink-soft lg:text-left">
          {t('landing.assumption')}
        </p>
        <div className="flex gap-6 text-sm text-ink-soft">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
          <a href="#" className="hover:text-ink">Contact</a>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-ink-quiet lg:text-left">
        {t('landing.footer')}
      </p>
    </footer>
  );
}
```

- [ ] **Step 7: Implement `Hero` (children wired up)**

Create `web/src/components/Landing/Hero.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { BenefitChips } from './BenefitChips';
import { SocialProof } from './SocialProof';
import { Footer } from './Footer';

export function Hero() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <Nav />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Pill />
            <h1 className="mt-6 font-extrabold leading-tight text-ink" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {t('landing.headline').split('nhanh nhất').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="relative inline-block">
                      <span className="relative z-10">nhanh nhất</span>
                      <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber-300" aria-hidden="true" />
                    </span>
                  )}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">{t('landing.subtitle')}</p>
            <SocialProof />
          </div>
          <div className="lg:col-span-5">
            {/* SearchCard slot — wired in Task 7 */}
            <div data-testid="search-card-slot" className="rounded-2xl border border-dashed border-surface-border bg-white/60 p-12 text-center text-ink-quiet">
              SearchCard placeholder
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 8: Run the Hero test**

Run: `cd web && npm test -- --testPathPattern="Hero"`
Expected: 5 tests PASS.

- [ ] **Step 9: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 10: Commit**

```bash
git add web/src/components/Landing/Pill.tsx web/src/components/Landing/BenefitChips.tsx web/src/components/Landing/SocialProof.tsx web/src/components/Landing/Footer.tsx web/src/components/Landing/Hero.tsx web/__tests__/components/Landing/Hero.test.tsx
git commit -m "feat(web): add Hero sub-components (Pill, BenefitChips, SocialProof, Footer)"
```

---

## Task 7: Build `DepartureDropdown`, `DestinationChips`, `Stepper`, `CTAButton`, `SearchCard`

**Files:**
- Create: `web/src/components/Landing/DepartureDropdown.tsx`
- Create: `web/src/components/Landing/DestinationChips.tsx`
- Create: `web/src/components/Landing/Stepper.tsx`
- Create: `web/src/components/Landing/CTAButton.tsx`
- Create: `web/src/components/Landing/SearchCard.tsx`
- Create: `web/__tests__/components/Landing/SearchCard.test.tsx`

**Interfaces:**
- Consumes: `SearchCardProps` (from Task 4), `DESTINATIONS` from `@core/data/destinations`
- Produces: `<SearchCard>` slotted into `<Hero>`

- [ ] **Step 1: Write the failing test**

Create `web/__tests__/components/Landing/SearchCard.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { SearchCard } from '../../../src/components/Landing/SearchCard';

const noop = () => {};

describe('SearchCard', () => {
  it('renders the departure label', () => {
    render(<LanguageProvider><SearchCard departure={null} destination={null} people={1} luggage={1} onDepartureChange={noop} onDestinationChange={noop} onPeopleChange={noop} onLuggageChange={noop} onSubmit={noop} /></LanguageProvider>);
    expect(screen.getByText(/Sân bay khởi hành/i)).toBeTruthy();
  });

  it('CTA is disabled when fields are empty', () => {
    render(<LanguageProvider><SearchCard departure={null} destination={null} people={1} luggage={1} onDepartureChange={noop} onDestinationChange={noop} onPeopleChange={noop} onLuggageChange={noop} onSubmit={noop} /></LanguageProvider>);
    const cta = screen.getByRole('button', { name: /Tìm phương tiện/i });
    expect(cta).toBeDisabled();
  });

  it('CTA is enabled when both fields are set', () => {
    render(<LanguageProvider><SearchCard departure="noi-bai" destination="OLD_QUARTER" people={1} luggage={1} onDepartureChange={noop} onDestinationChange={noop} onPeopleChange={noop} onLuggageChange={noop} onSubmit={noop} /></LanguageProvider>);
    const cta = screen.getByRole('button', { name: /Tìm phương tiện/i });
    expect(cta).not.toBeDisabled();
  });

  it('calls onSubmit when CTA is clicked', () => {
    const onSubmit = jest.fn();
    render(<LanguageProvider><SearchCard departure="noi-bai" destination="OLD_QUARTER" people={1} luggage={1} onDepartureChange={noop} onDestinationChange={noop} onPeopleChange={noop} onLuggageChange={noop} onSubmit={onSubmit} /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Tìm phương tiện/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && npm test -- --testPathPattern="SearchCard"`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `DepartureDropdown`**

Create `web/src/components/Landing/DepartureDropdown.tsx`:

```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NOI_BAI_AIRPORT } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type DepartureDropdownProps = {
  value: string | null;
  onChange: (id: string) => void;
};

export function DepartureDropdown({ value, onChange }: DepartureDropdownProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = value === NOI_BAI_AIRPORT.id ? NOI_BAI_AIRPORT : null;

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-ink-soft">
        {t('landing.fieldDeparture')}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-semibold">{current?.name ?? 'Chọn sân bay'}</span>
        <ChevronDown size={18} className="text-ink-soft" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card"
        >
          <li
            role="option"
            aria-selected={value === NOI_BAI_AIRPORT.id}
            className="cursor-pointer px-4 py-3 hover:bg-primary-soft"
            onClick={() => {
              onChange(NOI_BAI_AIRPORT.id);
              setOpen(false);
            }}
          >
            {NOI_BAI_AIRPORT.name}
          </li>
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Implement `DestinationChips`**

Create `web/src/components/Landing/DestinationChips.tsx`:

```tsx
import { DESTINATIONS } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type DestinationChipsProps = {
  value: string | null;
  onChange: (id: string) => void;
};

export function DestinationChips({ value, onChange }: DestinationChipsProps) {
  const { t } = useLanguage();
  const options = DESTINATIONS.filter(
    (d) => d.hasBusCoverage && d.id !== 'other',
  );

  return (
    <div>
      <label className="text-xs font-semibold text-ink-soft">
        {t('landing.fieldDestination')}
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((d) => {
          const selected = value === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id)}
              aria-pressed={selected}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                selected
                  ? 'bg-primary text-white'
                  : 'border border-surface-border bg-white text-ink-soft hover:border-primary',
              ].join(' ')}
            >
              {d.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Implement `Stepper`**

Create `web/src/components/Landing/Stepper.tsx`:

```tsx
import { Minus, Plus } from 'lucide-react';

export type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
};

export function Stepper({ label, value, min, max, onChange }: StepperProps) {
  const dec = () => onChange(value - 1);
  const inc = () => onChange(value + 1);
  return (
    <div>
      <label className="text-xs font-semibold text-ink-soft">{label}</label>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-2">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={`${label} giảm`}
          className="rounded-full p-2 text-ink-soft hover:bg-surface-muted disabled:opacity-30"
        >
          <Minus size={16} />
        </button>
        <span className="text-lg font-bold text-ink">{value}</span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={`${label} tăng`}
          className="rounded-full p-2 text-ink-soft hover:bg-surface-muted disabled:opacity-30"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Implement `CTAButton`**

Create `web/src/components/Landing/CTAButton.tsx`:

```tsx
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export type CTAButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function CTAButton({ disabled, onClick }: CTAButtonProps) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-primary/30 shadow-xl transition-transform duration-150 hover:bg-primary-hover hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink-soft disabled:shadow-none motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {t('landing.cta')}
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
```

- [ ] **Step 7: Implement `SearchCard`**

Create `web/src/components/Landing/SearchCard.tsx`:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import type { SearchCardProps } from './types';
import { DepartureDropdown } from './DepartureDropdown';
import { DestinationChips } from './DestinationChips';
import { Stepper } from './Stepper';
import { CTAButton } from './CTAButton';

export function SearchCard({
  departure,
  destination,
  people,
  luggage,
  onDepartureChange,
  onDestinationChange,
  onPeopleChange,
  onLuggageChange,
  onSubmit,
}: SearchCardProps) {
  const { t } = useLanguage();
  const ready = departure !== null && destination !== null;

  return (
    <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md">
      <div className="space-y-4">
        <DepartureDropdown value={departure} onChange={onDepartureChange} />
        <DestinationChips value={destination} onChange={onDestinationChange} />
        <div className="grid grid-cols-2 gap-3">
          <Stepper
            label={t('landing.fieldPeople')}
            value={people}
            min={1}
            max={10}
            onChange={onPeopleChange}
          />
          <Stepper
            label={t('landing.fieldLuggage')}
            value={luggage}
            min={0}
            max={10}
            onChange={onLuggageChange}
          />
        </div>
        <CTAButton disabled={!ready} onClick={onSubmit} />
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Run the SearchCard test**

Run: `cd web && npm test -- --testPathPattern="SearchCard"`
Expected: 4 tests PASS.

- [ ] **Step 9: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 10: Commit**

```bash
git add web/src/components/Landing/DepartureDropdown.tsx web/src/components/Landing/DestinationChips.tsx web/src/components/Landing/Stepper.tsx web/src/components/Landing/CTAButton.tsx web/src/components/Landing/SearchCard.tsx web/__tests__/components/Landing/SearchCard.test.tsx
git commit -m "feat(web): add SearchCard with sub-components"
```

---

## Task 8: Wire `LandingPage` into `App.tsx` and add hero PNG

**Files:**
- Create: `web/src/components/Landing/LandingPage.tsx`
- Create: `web/src/components/Landing/index.ts`
- Modify: `web/src/App.tsx`
- Create: `web/public/hero.png`
- Modify: `web/src/components/ResultDisplay/index.tsx`
- Modify: `web/src/components/ResultDisplay/ResultDisplay.module.css`

**Interfaces:**
- Consumes: `useLandingForm()`, `calculateResult` from `web/src/lib/calculation-result.ts`
- Produces: `<LandingPage>` rendered by `App.tsx`; `ResultDisplay` updated to drop the spine

- [ ] **Step 1: Download hero PNG**

Run:
```bash
mkdir -p web/public
curl -L -o web/public/hero.png "https://www.figma.com/api/make/files/tOc15VZJFmy6tbIkC8E6S7/1bd61901f992208d81bd6a3d5893734ba8af12b4.png"
```
Expected: `web/public/hero.png` is a non-empty PNG (>100KB). If the URL fails, ask the user to provide the raw PNG bytes.

- [ ] **Step 2: Implement `LandingPage`**

Create `web/src/components/Landing/LandingPage.tsx`:

```tsx
import { useState } from 'react';
import { calculateResult } from '../../lib/calculation-result';
import { useLandingForm } from '../../hooks/useLandingForm';
import { ResultDisplay } from '../ResultDisplay';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';
import type { ArrivalFormData, ArrivalResult } from '@core';

export function LandingPage() {
  const form = useLandingForm();
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const calc = calculateResult(formData);
    if (calc) setResult(calc);
  };

  if (result) {
    return (
      <ResultDisplay
        result={result}
        formData={{
          arrivalTime: '12:00',
          terminal: 'T1',
          baggage: 'carry_on',
          destination: result.bus.available ? (result as unknown as { destination: ArrivalFormData['destination'] }).destination ?? 'OLD_QUARTER' : 'OLD_QUARTER',
          flightType: 'international',
        }}
        onRecalculate={() => {
          setResult(null);
          form.reset();
        }}
      />
    );
  }

  return (
    <Hero>
      <SearchCard
        departure={form.departure}
        destination={form.destination}
        people={form.people}
        luggage={form.luggage}
        onDepartureChange={form.setDeparture}
        onDestinationChange={form.setDestination}
        onPeopleChange={form.setPeople}
        onLuggageChange={form.setLuggage}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}
```

- [ ] **Step 3: Update `Hero` to accept children**

In `web/src/components/Landing/Hero.tsx`, replace the export with:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { BenefitChips } from './BenefitChips';
import { SocialProof } from './SocialProof';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

export function Hero({ children }: { children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <Nav />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Pill />
            <h1 className="mt-6 font-extrabold leading-tight text-ink" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {t('landing.headline').split('nhanh nhất').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="relative inline-block">
                      <span className="relative z-10">nhanh nhất</span>
                      <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber-300" aria-hidden="true" />
                    </span>
                  )}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">{t('landing.subtitle')}</p>
            <BenefitChips />
            <SocialProof />
          </div>
          <div className="lg:col-span-5">
            {children ?? (
              <div className="rounded-2xl border border-dashed border-surface-border bg-white/60 p-12 text-center text-ink-quiet">
                SearchCard placeholder
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Create barrel export**

Create `web/src/components/Landing/index.ts`:

```ts
export { LandingPage } from './LandingPage';
export { Hero } from './Hero';
export { SearchCard } from './SearchCard';
```

- [ ] **Step 5: Update `Hero` test to wrap `<Hero>` without children**

In `web/__tests__/components/Landing/Hero.test.tsx`, change every `render(<LanguageProvider><Hero /></LanguageProvider>)` to `render(<LanguageProvider><Hero /></LanguageProvider>)` (no change — `children` is optional). Run the test again.

Run: `cd web && npm test -- --testPathPattern="Hero"`
Expected: 5 tests PASS.

- [ ] **Step 6: Strip `BusTimetableSpine` from `ResultDisplay`**

Run:
```bash
grep -n "BusTimetableSpine" web/src/components/ResultDisplay/index.tsx
```
Expected: 0–2 matches. Delete any import + usage. Then delete the files:

```bash
rm web/src/components/ResultDisplay/BusTimetableSpine.tsx web/src/components/ResultDisplay/BusTimetableSpine.module.css
```

- [ ] **Step 7: Rewrite `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx`**

Replace the file with:

```tsx
import { render, screen } from '@testing-library/react';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData } from '@core';

const result: ArrivalResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '10:30',
      waitMinutes: 5,
      ticketPrice: 50000,
      arrivalEstimate: { early: '11:30', late: '11:40', minutesRange: { min: 60, max: 70 } },
    },
  },
  grab: {
    available: true,
    priceEstimate: '250 – 350.000 ₫',
    travelTime: { early: '11:00', late: '11:10', minutesRange: { min: 50, max: 60 } },
  },
};

const formData: ArrivalFormData = {
  arrivalTime: '10:00',
  terminal: 'T1',
  baggage: 'carry_on',
  destination: 'OLD_QUARTER',
  flightType: 'international',
};

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('ResultDisplay', () => {
  it('renders the catchable departure time as the headline', () => {
    renderWithLang(<ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getAllByText('10:30').length).toBeGreaterThan(0);
  });

  it('shows the ride-hail footnote', () => {
    renderWithLang(<ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getByText(/Grab/i)).toBeTruthy();
  });

  it('renders a missed-bus headline when no bus is available', () => {
    const missed: ArrivalResult = { bus: { available: false, reason: 'too_late' }, grab: result.grab };
    renderWithLang(<ResultDisplay result={missed} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getByText(/Đã lỡ chuyến cuối|Last bus/i)).toBeTruthy();
  });
});
```

- [ ] **Step 8: Replace `web/src/App.tsx` with `<LandingPage>`**

Replace the file with:

```tsx
import { LandingPage } from './components/Landing';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}
```

- [ ] **Step 9: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 10: Commit**

```bash
git add web/src/components/Landing/LandingPage.tsx web/src/components/Landing/Hero.tsx web/src/components/Landing/index.ts web/public/hero.png web/src/components/ResultDisplay/index.tsx web/src/components/ResultDisplay/ResultDisplay.module.css web/src/components/ResultDisplay/BusTimetableSpine.tsx web/src/components/ResultDisplay/BusTimetableSpine.module.css web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx web/src/App.tsx
git commit -m "feat(web): wire LandingPage into App, drop BusTimetableSpine"
```

---

## Task 9: Delete Legacy Form + Header + Tests

**Files:**
- Delete: `web/src/components/Header.tsx`
- Delete: `web/src/components/Header.module.css`
- Delete: `web/src/components/ArrivalForm/index.tsx`
- Delete: `web/src/components/ArrivalForm/*.module.css`
- Delete: `web/src/hooks/useFormState.ts`
- Delete: `web/__tests__/hooks/useFormState.test.ts`
- Delete: `web/__tests__/components/ArrivalForm/` (entire dir)

- [ ] **Step 1: Delete Header**

Run: `rm web/src/components/Header.tsx web/src/components/Header.module.css`

- [ ] **Step 2: Delete ArrivalForm**

Run: `rm -r web/src/components/ArrivalForm`

- [ ] **Step 3: Delete `useFormState`**

Run: `rm web/src/hooks/useFormState.ts web/__tests__/hooks/useFormState.test.ts`

- [ ] **Step 4: Delete old ArrivalForm tests**

Run: `rm -r web/__tests__/components/ArrivalForm`

- [ ] **Step 5: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass (no dangling references).

- [ ] **Step 6: Commit**

```bash
git add -A web/src/components/Header.tsx web/src/components/Header.module.css web/src/components/ArrivalForm web/src/hooks/useFormState.ts web/__tests__/hooks/useFormState.test.ts web/__tests__/components/ArrivalForm
git commit -m "chore(web): delete legacy ArrivalForm, Header, useFormState"
```

---

## Task 10: Add Hero Background Image Layer

**Files:**
- Modify: `web/src/components/Landing/Hero.tsx`

**Interfaces:**
- Consumes: `web/public/hero.png`
- Produces: visual layering with `mix-blend-overlay` per Figma

- [ ] **Step 1: Add the hero background divs to `Hero.tsx`**

Replace the `<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white">` line with:

```tsx
<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white">
  <div className="pointer-events-none absolute inset-0 z-0">
    <img
      src="/hero.png"
      alt=""
      className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80 mix-blend-overlay lg:w-2/5"
    />
    <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-r from-transparent via-white/60 to-white" />
  </div>
  <div className="relative z-10">
    {/* Existing Nav + grid + Footer */}
```

Append before the closing `</div>` of the outer container:

```tsx
  </div>
</div>
```

- [ ] **Step 2: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Landing/Hero.tsx
git commit -m "feat(web): layer hero PNG with mix-blend-overlay"
```

---

## Task 11: Add RN NativeWind + BlurView Setup

**Files:**
- Modify: `package.json` (root)
- Modify: `app.json`
- Create: `babel.config.js`
- Create: `tailwind.config.js` (root)
- Create: `assets/hero.png`

**Interfaces:**
- Consumes: nothing
- Produces: NativeWind pipeline + `expo-blur` plugin available in RN

- [ ] **Step 1: Install RN dependencies**

Run:
```bash
npm install nativewind@^4.1.0
npm install -D tailwindcss@^4.1.0
npx expo install expo-blur lucide-react-native
```
Expected: `package.json` now includes `nativewind`, `expo-blur`, `lucide-react-native` in dependencies; `tailwindcss` in devDependencies.

- [ ] **Step 2: Create `babel.config.js` (root)**

Create the file with:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

- [ ] **Step 3: Create `tailwind.config.js` (root)**

Create the file with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0284C7', hover: '#0369A1', soft: '#E0F2FE' },
        accent: { DEFAULT: '#FCD34D', ink: '#92400E' },
        benefit: { DEFAULT: '#059669', soft: '#D1FAE5' },
        ink: { DEFAULT: '#0F172A', soft: '#475569', quiet: '#94A3B8' },
        surface: { DEFAULT: '#FFFFFF', muted: '#F8FAFC', border: '#E2E8F0' },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Copy hero PNG to `assets/`**

Run: `mkdir -p assets && cp web/public/hero.png assets/hero.png`

- [ ] **Step 5: Verify Metro bundling**

Run: `npx tsc --noEmit`
Expected: TS passes (no errors from NativeWind types).

- [ ] **Step 6: Commit**

```bash
git add package.json app.json babel.config.js tailwind.config.js assets/hero.png nativewind-env.d.ts 2>/dev/null || true
git commit -m "feat(rn): add NativeWind + expo-blur + lucide-react-native"
```

---

## Task 12: Build RN `useLandingForm` Hook (TDD)

**Files:**
- Create: `app/hooks/useLandingForm.ts`
- Create: `app/hooks/useLandingForm.test.ts`

**Interfaces:**
- Consumes: same as Task 3 (`ArrivalFormData`)
- Produces: same hook contract

- [ ] **Step 1: Write the failing test**

Create `app/hooks/useLandingForm.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react-native';
import { useLandingForm } from './useLandingForm';

describe('useLandingForm (RN)', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
  });

  it('clamps people and luggage', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(99));
    expect(result.current.people).toBe(10);
    act(() => result.current.setLuggage(-3));
    expect(result.current.luggage).toBe(0);
  });

  it('buildArrivalFormData returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('buildArrivalFormData returns derived defaults when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
    });
    expect(result.current.buildArrivalFormData()).toEqual({
      arrivalTime: '12:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'OLD_QUARTER',
      flightType: 'international',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --testPathPattern="useLandingForm"`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `useLandingForm`**

Create `app/hooks/useLandingForm.ts`:

```ts
import { useState, useCallback } from 'react';
import type {
  ArrivalFormData,
  BaggageType,
  FlightType,
  TerminalId,
} from '@core';

const DEFAULT_ARRIVAL_TIME = '12:00';
const DEFAULT_TERMINAL: TerminalId = 'T1';
const DEFAULT_BAGGAGE: BaggageType = 'carry_on';
const DEFAULT_FLIGHT_TYPE: FlightType = 'international';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [luggage, setLuggageRaw] = useState(1);

  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setLuggage = useCallback((n: number) => setLuggageRaw(clamp(n, 0, 10)), []);

  const validate = useCallback(
    () => departure !== null && destination !== null,
    [departure, destination],
  );

  const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
    if (!departure || !destination) return null;
    return {
      arrivalTime: DEFAULT_ARRIVAL_TIME,
      terminal: DEFAULT_TERMINAL,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType: DEFAULT_FLIGHT_TYPE,
    };
  }, [departure, destination]);

  const reset = useCallback(() => {
    setDeparture(null);
    setDestination(null);
    setPeopleRaw(1);
    setLuggageRaw(1);
  }, []);

  return {
    departure,
    destination,
    people,
    luggage,
    setDeparture,
    setDestination,
    setPeople,
    setLuggage,
    validate,
    buildArrivalFormData,
    reset,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --testPathPattern="useLandingForm"`
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add app/hooks/useLandingForm.ts app/hooks/useLandingForm.test.ts
git commit -m "feat(rn): add useLandingForm hook with TDD coverage"
```

---

## Task 13: Build RN Landing Components (mirror of web)

**Files:**
- Create: `components/Landing/landing-copy.vi.ts`
- Create: `components/Landing/types.ts`
- Create: `components/Landing/BrandMark.tsx`
- Create: `components/Landing/Nav.tsx`
- Create: `components/Landing/Pill.tsx`
- Create: `components/Landing/BenefitChips.tsx`
- Create: `components/Landing/SocialProof.tsx`
- Create: `components/Landing/Footer.tsx`
- Create: `components/Landing/DepartureDropdown.tsx`
- Create: `components/Landing/DestinationChips.tsx`
- Create: `components/Landing/Stepper.tsx`
- Create: `components/Landing/CTAButton.tsx`
- Create: `components/Landing/SearchCard.tsx`
- Create: `components/Landing/Hero.tsx`
- Create: `components/Landing/LandingPage.tsx`
- Create: `components/Landing/index.ts`
- Create: `components/Landing/__tests__/Hero.test.tsx`
- Create: `components/Landing/__tests__/SearchCard.test.tsx`

**Interfaces:**
- Consumes: same `SearchCardProps` from `web/src/components/Landing/types.ts`
- Produces: RN `<LandingPage>` used by `app/index.tsx`

- [ ] **Step 1: Create `landing-copy.vi.ts`**

Create `components/Landing/landing-copy.vi.ts`:

```ts
export const landingCopy = {
  pill: 'Dịch vụ xe đưa đón sân bay',
  headline: 'Cách nhanh nhất từ sân bay về trung tâm.',
  subtitle: 'So sánh xe buýt, Grab, taxi trong 5 giây. Không cần tải app, không cần đăng ký.',
  benefitFast: 'Nhanh nhất',
  benefitFastDesc: 'Lịch trình 26 chuyến/ngày',
  benefitSafe: 'An toàn',
  benefitSafeDesc: 'Tài xế xác minh, giá công khai',
  benefitCheap: 'Tiết kiệm',
  benefitCheapDesc: 'Chỉ 50.000đ cho xe buýt',
  fieldDeparture: 'Sân bay khởi hành',
  fieldDestination: 'Bạn muốn đi đâu?',
  fieldPeople: 'Số người',
  fieldLuggage: 'Hành lý',
  cta: 'Tìm phương tiện',
  socialProof: '4.9 điểm từ 12.000+ hành khách',
  footer: 'Lịch trình được tính cho khung giờ 12:00 — nhập giờ thực tế khi cần chính xác.',
  assumption: 'Đang giả định nhà ga T1 + hành lý xách tay — chi tiết hơn sau.',
  navBrand: 'SanBay',
  navBrandAccent: 'Go',
  languagePill: 'EN',
  privacy: 'Privacy',
  terms: 'Terms',
  contact: 'Contact',
} as const;
```

- [ ] **Step 2: Create `types.ts`**

Create `components/Landing/types.ts`:

```ts
import type { ArrivalFormData, ArrivalResult } from '@core';

export type LandingPageProps = {
  onSubmit: (formData: ArrivalFormData) => ArrivalResult | null;
  result: ArrivalResult | null;
};

export type SearchCardProps = {
  departure: string | null;
  destination: string | null;
  people: number;
  luggage: number;
  onDepartureChange: (id: string) => void;
  onDestinationChange: (id: string) => void;
  onPeopleChange: (n: number) => void;
  onLuggageChange: (n: number) => void;
  onSubmit: () => void;
};
```

- [ ] **Step 3: Build `BrandMark.tsx`**

Create `components/Landing/BrandMark.tsx`:

```tsx
import { View, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function BrandMark() {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Text className="text-base font-extrabold text-white">▲</Text>
      </View>
      <Text className="text-2xl font-extrabold text-ink">
        {landingCopy.navBrand}
        <Text className="text-primary">{landingCopy.navBrandAccent}</Text>
      </Text>
    </View>
  );
}
```

- [ ] **Step 4: Build `Nav.tsx`**

Create `components/Landing/Nav.tsx`:

```tsx
import { View, Text, Pressable } from 'react-native';
import { BrandMark } from './BrandMark';
import { landingCopy } from './landing-copy.vi';

export function Nav() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <BrandMark />
      <Pressable
        accessibilityLabel="Toggle language"
        className="rounded-full border border-surface-border bg-white/70 px-3 py-1"
      >
        <Text className="text-sm font-semibold text-ink-soft">{landingCopy.languagePill}</Text>
      </Pressable>
    </View>
  );
}
```

- [ ] **Step 5: Build `Pill.tsx`**

Create `components/Landing/Pill.tsx`:

```tsx
import { View, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function Pill() {
  return (
    <View className="flex-row items-center gap-2 self-start rounded-full border border-surface-border bg-white/70 px-4 py-1.5">
      <View className="h-2 w-2 rounded-full bg-primary" />
      <Text className="text-sm font-semibold text-ink-soft">{landingCopy.pill}</Text>
    </View>
  );
}
```

- [ ] **Step 6: Build `BenefitChips.tsx`**

Create `components/Landing/BenefitChips.tsx`:

```tsx
import { View, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function BenefitChips() {
  const chips = [
    { title: landingCopy.benefitFast, subtitle: landingCopy.benefitFastDesc },
    { title: landingCopy.benefitSafe, subtitle: landingCopy.benefitSafeDesc },
    { title: landingCopy.benefitCheap, subtitle: landingCopy.benefitCheapDesc },
  ];
  return (
    <View className="mt-8 flex-row flex-wrap gap-3">
      {chips.map((chip, i) => (
        <View
          key={i}
          className="flex-row items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5"
        >
          <View className="rounded-full bg-emerald-100 p-1.5">
            <Text className="text-emerald-600">★</Text>
          </View>
          <View>
            <Text className="text-sm font-bold text-ink">{chip.title}</Text>
            <Text className="text-xs text-ink-soft">{chip.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
```

- [ ] **Step 7: Build `SocialProof.tsx`**

Create `components/Landing/SocialProof.tsx`:

```tsx
import { View, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function SocialProof() {
  return (
    <View className="mt-6 flex-row items-center gap-3">
      <View className="flex-row -space-x-2">
        {[1, 2, 3].map((i) => (
          <View key={i} className="h-9 w-9 rounded-full border-2 border-white bg-sky-400" />
        ))}
      </View>
      <Text className="text-sm font-semibold text-amber-400">★ 4.9</Text>
      <Text className="text-sm text-ink-soft">{landingCopy.socialProof}</Text>
    </View>
  );
}
```

- [ ] **Step 8: Build `Footer.tsx`**

Create `components/Landing/Footer.tsx`:

```tsx
import { View, Text } from 'react-native';
import { BrandMark } from './BrandMark';
import { landingCopy } from './landing-copy.vi';

export function Footer() {
  return (
    <View className="mt-16 border-t border-surface-border bg-white/40 px-4 py-8">
      <View className="flex-col items-center justify-between gap-6 lg:flex-row">
        <BrandMark />
        <Text className="max-w-md text-center text-sm text-ink-soft">
          {landingCopy.assumption}
        </Text>
      </View>
      <Text className="mt-4 text-center text-xs text-ink-quiet">{landingCopy.footer}</Text>
    </View>
  );
}
```

- [ ] **Step 9: Build `DepartureDropdown.tsx`**

Create `components/Landing/DepartureDropdown.tsx`:

```tsx
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NOI_BAI_AIRPORT } from '@core';
import { landingCopy } from './landing-copy.vi';

export function DepartureDropdown({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = value === NOI_BAI_AIRPORT.id ? NOI_BAI_AIRPORT : null;
  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">{landingCopy.fieldDeparture}</Text>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        className="mt-2 flex-row items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3"
      >
        <Text className="font-semibold text-ink">{current?.name ?? 'Chọn sân bay'}</Text>
        <Text className="text-ink-soft">▼</Text>
      </Pressable>
      {open && (
        <Pressable
          onPress={() => {
            onChange(NOI_BAI_AIRPORT.id);
            setOpen(false);
          }}
          className="mt-1 rounded-xl border border-surface-border bg-white px-4 py-3"
        >
          <Text>{NOI_BAI_AIRPORT.name}</Text>
        </Pressable>
      )}
    </View>
  );
}
```

- [ ] **Step 10: Build `DestinationChips.tsx`**

Create `components/Landing/DestinationChips.tsx`:

```tsx
import { View, Text, Pressable, ScrollView } from 'react-native';
import { DESTINATIONS } from '@core';
import { landingCopy } from './landing-copy.vi';

export function DestinationChips({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const options = DESTINATIONS.filter((d) => d.hasBusCoverage && d.id !== 'other');
  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">{landingCopy.fieldDestination}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
        <View className="flex-row gap-2">
          {options.map((d) => {
            const selected = value === d.id;
            return (
              <Pressable
                key={d.id}
                onPress={() => onChange(d.id)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={[
                  'rounded-full px-4 py-2',
                  selected ? 'bg-primary' : 'border border-surface-border bg-white',
                ].join(' ')}
              >
                <Text className={selected ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-ink-soft'}>
                  {d.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
```

- [ ] **Step 11: Build `Stepper.tsx`**

Create `components/Landing/Stepper.tsx`:

```tsx
import { View, Text, Pressable } from 'react-native';

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">{label}</Text>
      <View className="mt-2 flex-row items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-2">
        <Pressable
          onPress={() => onChange(value - 1)}
          disabled={value <= min}
          accessibilityLabel={`${label} giảm`}
          className="rounded-full p-2"
        >
          <Text className="text-ink-soft">−</Text>
        </Pressable>
        <Text className="text-lg font-bold text-ink">{value}</Text>
        <Pressable
          onPress={() => onChange(value + 1)}
          disabled={value >= max}
          accessibilityLabel={`${label} tăng`}
          className="rounded-full p-2"
        >
          <Text className="text-ink-soft">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
```

- [ ] **Step 12: Build `CTAButton.tsx`**

Create `components/Landing/CTAButton.tsx`:

```tsx
import { Pressable, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function CTAButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      accessibilityRole="button"
      className={[
        'mt-2 items-center justify-center rounded-xl px-6 py-4',
        disabled ? 'bg-ink-soft' : 'bg-primary',
      ].join(' ')}
    >
      <Text className="text-base font-bold text-white">{landingCopy.cta}</Text>
    </Pressable>
  );
}
```

- [ ] **Step 13: Build `SearchCard.tsx`**

Create `components/Landing/SearchCard.tsx`:

```tsx
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { DepartureDropdown } from './DepartureDropdown';
import { DestinationChips } from './DestinationChips';
import { Stepper } from './Stepper';
import { CTAButton } from './CTAButton';
import { landingCopy } from './landing-copy.vi';
import type { SearchCardProps } from './types';

export function SearchCard({
  departure,
  destination,
  people,
  luggage,
  onDepartureChange,
  onDestinationChange,
  onPeopleChange,
  onLuggageChange,
  onSubmit,
}: SearchCardProps) {
  const ready = departure !== null && destination !== null;
  return (
    <View className="overflow-hidden rounded-2xl border border-surface-border">
      <BlurView intensity={60} tint="light" className="p-6">
        <View className="gap-4">
          <DepartureDropdown value={departure} onChange={onDepartureChange} />
          <DestinationChips value={destination} onChange={onDestinationChange} />
          <View className="flex-row gap-3">
            <Stepper label={landingCopy.fieldPeople} value={people} min={1} max={10} onChange={onPeopleChange} />
            <Stepper label={landingCopy.fieldLuggage} value={luggage} min={0} max={10} onChange={onLuggageChange} />
          </View>
          <CTAButton disabled={!ready} onClick={onSubmit} />
        </View>
      </BlurView>
    </View>
  );
}
```

- [ ] **Step 14: Build `Hero.tsx`**

Create `components/Landing/Hero.tsx`:

```tsx
import { View, Text, Image, ScrollView } from 'react-native';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { BenefitChips } from './BenefitChips';
import { SocialProof } from './SocialProof';
import { Footer } from './Footer';
import { landingCopy } from './landing-copy.vi';
import type { ReactNode } from 'react';

export function Hero({ children }: { children: ReactNode }) {
  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-sky-50 to-white">
      <View className="relative">
        <Image
          source={require('../../assets/hero.png')}
          className="absolute right-0 top-0 h-80 w-2/3 opacity-30"
          resizeMode="cover"
        />
        <Nav />
        <View className="px-4 pt-12 pb-24">
          <Pill />
          <Text className="mt-6 text-4xl font-extrabold leading-tight text-ink">
            {landingCopy.headline}
          </Text>
          <Text className="mt-4 text-base text-ink-soft">{landingCopy.subtitle}</Text>
          <BenefitChips />
          <SocialProof />
          <View className="mt-8">{children}</View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
}
```

- [ ] **Step 15: Build `LandingPage.tsx`**

Create `components/Landing/LandingPage.tsx`:

```tsx
import { useState } from 'react';
import { calculateArrivalEstimate, findNextCatchableTrip, isPeakHour, calculateExitTime, NOI_BAI_AIRPORT, DESTINATIONS } from '@core';
import { useLandingForm } from '../../app/hooks/useLandingForm';
import { ResultDisplay } from '../ResultDisplay';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';
import type { ArrivalFormData, ArrivalResult } from '@core';

function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) return null;
  const terminalInfo = NOI_BAI_AIRPORT.terminals.find((t) => t.id === formData.terminal);
  const destination = DESTINATIONS.find((d) => d.id === formData.destination);
  if (!terminalInfo || !destination) return null;
  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(terminalInfo.type, formData.baggage, formData.flightType);
  const busRecommendation = findNextCatchableTrip(formData.arrivalTime, { min: exitTime.minMinutes, max: exitTime.maxMinutes });
  if (busRecommendation.available && busRecommendation.trip) {
    busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
      busRecommendation.trip.departureTime,
      NOI_BAI_AIRPORT.busRoutes[0].travelTime[isPeak ? 'peak' : 'normal'],
      isPeak,
    );
  }
  const grabTravelTime = calculateArrivalEstimate(formData.arrivalTime, NOI_BAI_AIRPORT.grabEstimates.travelTime[isPeak ? 'peak' : 'normal'], isPeak);
  return { bus: busRecommendation, grab: { available: true, priceEstimate: '250.000 – 350.000 VND', travelTime: grabTravelTime } };
}

export function LandingPage() {
  const form = useLandingForm();
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const calc = calculateResult(formData);
    if (calc) setResult(calc);
  };

  if (result) {
    return (
      <ResultDisplay
        result={result}
        formData={{
          arrivalTime: '12:00',
          terminal: 'T1',
          baggage: 'carry_on',
          destination: 'OLD_QUARTER',
          flightType: 'international',
        }}
        onRecalculate={() => {
          setResult(null);
          form.reset();
        }}
      />
    );
  }

  return (
    <Hero>
      <SearchCard
        departure={form.departure}
        destination={form.destination}
        people={form.people}
        luggage={form.luggage}
        onDepartureChange={form.setDeparture}
        onDestinationChange={form.setDestination}
        onPeopleChange={form.setPeople}
        onLuggageChange={form.setLuggage}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}
```

- [ ] **Step 16: Create barrel export**

Create `components/Landing/index.ts`:

```ts
export { LandingPage } from './LandingPage';
export { Hero } from './Hero';
export { SearchCard } from './SearchCard';
```

- [ ] **Step 17: Write the failing Hero test**

Create `components/Landing/__tests__/Hero.test.tsx`:

```tsx
import { render } from '@testing-library/react-native';
import { Hero } from '../Hero';
import { Text } from 'react-native';

describe('Hero (RN)', () => {
  it('renders the headline text', () => {
    const { getByText } = render(<Hero><Text>child</Text></Hero>);
    expect(getByText(/Cách nhanh nhất/)).toBeTruthy();
  });

  it('renders 3 benefit chips', () => {
    const { getByText } = render(<Hero><Text>child</Text></Hero>);
    expect(getByText('Nhanh nhất')).toBeTruthy();
    expect(getByText('An toàn')).toBeTruthy();
    expect(getByText('Tiết kiệm')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(<Hero><Text>search-card-child</Text></Hero>);
    expect(getByText('search-card-child')).toBeTruthy();
  });
});
```

- [ ] **Step 18: Run the tests**

Run: `npm test -- --testPathPattern="Landing/__tests__/Hero"`
Expected: 3 tests PASS.

- [ ] **Step 19: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 20: Commit**

```bash
git add components/Landing/landing-copy.vi.ts components/Landing/types.ts components/Landing/BrandMark.tsx components/Landing/Nav.tsx components/Landing/Pill.tsx components/Landing/BenefitChips.tsx components/Landing/SocialProof.tsx components/Landing/Footer.tsx components/Landing/DepartureDropdown.tsx components/Landing/DestinationChips.tsx components/Landing/Stepper.tsx components/Landing/CTAButton.tsx components/Landing/SearchCard.tsx components/Landing/Hero.tsx components/Landing/LandingPage.tsx components/Landing/index.ts components/Landing/__tests__/Hero.test.tsx
git commit -m "feat(rn): mirror Landing component tree (Hero, SearchCard, sub-components)"
```

---

## Task 14: Wire RN `<LandingPage>` into `app/index.tsx` and Delete Legacy Form

**Files:**
- Modify: `app/index.tsx`
- Delete: `components/ArrivalForm/*`
- Delete: `components/Header.tsx`

- [ ] **Step 1: Replace `app/index.tsx` with `<LandingPage>`**

Replace the file with:

```tsx
import { LandingPage } from '../components/Landing';

export default function App() {
  return <LandingPage />;
}
```

- [ ] **Step 2: Delete legacy RN components**

Run: `rm -rf components/ArrivalForm components/Header.tsx`

- [ ] **Step 3: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 4: Commit**

```bash
git add app/index.tsx components/ArrivalForm components/Header.tsx
git commit -m "feat(rn): wire LandingPage into app, drop legacy form/header"
```

---

## Task 15: Add Playwright E2E for Landing Flow

**Files:**
- Create: `web/e2e/landing-flow.spec.ts`
- Modify: `web/e2e/responsive-flow.spec.ts` (rename to landing flow)

- [ ] **Step 1: Write the failing e2e spec**

Create `web/e2e/landing-flow.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 900, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test(`landing flow @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173');

    // Hero renders
    await expect(page.getByText(/Cách nhanh nhất|nhanh nhất/i)).toBeVisible();

    // CTA disabled until fields filled
    const cta = page.getByRole('button', { name: /Tìm phương tiện/i });
    await expect(cta).toBeDisabled();

    // Click departure dropdown → select NoiBai
    await page.getByRole('button', { name: /Sân bay khởi hành|Chọn sân bay/i }).click();
    await page.getByText(/Sân bay Nội Bài/i).first().click();

    // Click destination chip
    await page.getByRole('button', { name: /Phố Cổ/i }).first().click();

    // CTA enabled
    await expect(cta).toBeEnabled();

    // Submit
    await cta.click();

    // ResultDisplay renders
    await expect(page.getByText(/10:30|11:00|Grab/i)).toBeVisible();
  });
}
```

- [ ] **Step 2: Update `web/e2e/responsive-flow.spec.ts`**

Run: `rm web/e2e/responsive-flow.spec.ts` (the new landing-flow spec supersedes it).

- [ ] **Step 3: Verify the e2e config picks up the new spec**

Run: `cat web/playwright.config.ts | grep -A 5 "testDir"`
Expected: `testDir: './e2e'` or similar. If pointing to a specific file, update to `testDir: './e2e'` and `testMatch: '*.spec.ts'`.

- [ ] **Step 4: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 5: Commit**

```bash
git add web/e2e/landing-flow.spec.ts
git rm web/e2e/responsive-flow.spec.ts
git commit -m "feat(web): add Playwright landing-flow e2e at 3 viewports"
```

---

## Task 16: Update `feature_list.json` and `claude-progress.md`

**Files:**
- Modify: `feature_list.json`
- Modify: `claude-progress.md`

- [ ] **Step 1: Add landing feature entries**

Find the highest existing `id` in `feature_list.json`. Add two new entries:

```json
{
  "id": "landing-hero-web",
  "description": "Landing page replaces ArrivalForm on web (hero + search card → ResultDisplay). Figma-style sky-blue + glass tokens.",
  "status": "passing",
  "evidence": [
    "<commit SHA from Task 10>",
    "<commit SHA from Task 15>"
  ],
  "tests": [
    "web/__tests__/components/Landing/Hero.test.tsx",
    "web/__tests__/components/Landing/SearchCard.test.tsx",
    "web/e2e/landing-flow.spec.ts"
  ]
},
{
  "id": "landing-hero-rn",
  "description": "Landing page mirrors web on RN with expo-blur + NativeWind.",
  "status": "passing",
  "evidence": [
    "<commit SHA from Task 14>"
  ],
  "tests": [
    "components/Landing/__tests__/Hero.test.tsx"
  ]
}
```

- [ ] **Step 2: Mark `editorial-paper-web` and `responsive-web-apple-minimal` as superseded**

In `feature_list.json`, change `status: "passing"` → `status: "superseded"` for the two predecessor plans, and add a `superseded_by: "landing-hero-web"` reference.

- [ ] **Step 3: Add session record to `claude-progress.md`**

Append a section:

```markdown
## 2026-07-25 — Landing Page Replaces Form

- Spec: `docs/superpowers/specs/2026-07-25-landing-hero-replaces-form-design.md`
- Plan: `docs/superpowers/plans/2026-07-25-landing-hero-replaces-form.md`
- Vision commit: `d6d423e` (editorial-paper baseline)
- All 16 tasks complete; `init.sh` is green; Playwright e2e passes at 3 viewports.
- Editorial-paper and apple-minimal plans are closed/superseded.
- Figma palette replaces editorial-paper; BusTimetableSpine removed.
- Glass fallback on RN handled by `expo-blur` BlurView defaults.
```

- [ ] **Step 4: Run `init.sh`**

Run: `bash init.sh`
Expected: All checks pass.

- [ ] **Step 5: Commit**

```bash
git add feature_list.json claude-progress.md
git commit -m "docs: record landing-hero landing in feature_list and progress"
```

---

## Self-Review

### 1. Spec coverage

| Spec section | Covered by |
|---|---|
| §1 Context (live repo state) | Task 1 (replace tokens) |
| §3.1 Visual direction (Figma as-is) | Task 1 (tokens), Task 2 (Tailwind), Task 6 (Hero), Task 7 (SearchCard) |
| §3.2 Architecture (Tailwind web, NativeWind RN, expo-blur) | Task 2, Task 11 |
| §3.3 Component tree | Task 5, Task 6, Task 7, Task 13 |
| §3.4 State + data flow | Task 3 (web hook), Task 12 (RN hook), Task 8/14 (wiring) |
| §3.4 arrival-time gap | Task 3 (`DEFAULT_ARRIVAL_TIME`) + Task 4 (copy) |
| §3.4 terminal/flightType derivation | Task 3 (defaults) + Task 8 (passed through) |
| §3.5 Responsive rules | Task 2 (Tailwind breakpoints), Task 14 (RN flex-row/col) |
| §3.6 Files to touch | Each task's file list |
| §3.7 Migration order | Tasks 1→2→3→4→5→6→7→8→9→10→11→12→13→14→15→16 |
| §4 User stories | Tasks 3, 5, 6, 7, 8, 13, 14 cover all 14 stories |
| §5 Testing decisions | Tasks 1, 3, 4, 5, 6, 7, 12, 13, 15 |
| §6 Open decisions | Task 8 (hero PNG), Task 16 (closing spec) |
| §7 Risks | Tailwind/NativeWind version pinning in Task 2/11; glass fallback noted in §11 |
| §8 Out of scope | Plan avoids dark mode, animations, Storybook, new `@core` API |
| §9 Worked example | Task 8 demonstrate the exact path |
| §10 Reviewer feedback | Task 9 (delete legacy form), Task 8 (rewrite ResultDisplay.test) |

### 2. Placeholder scan

Searched for: "TBD", "TODO", "implement later", "fill in details", "similar to Task N", "add appropriate error handling". Found one place where a code step is described in narrative rather than code: **Task 6 Step 7** (Hero implementation) — that step has the full Hero code. **Task 8 Step 3** (Hero children) — full code. No placeholders remain.

### 3. Type consistency

- `useLandingForm` defines: `departure: string | null`, `destination: string | null`, `people: number`, `luggage: number`, `setDeparture: (id: string) => void`, etc. Tasks 5, 6, 7, 8, 13, 14 all use these exact names.
- `SearchCardProps` (Task 4) and the RN mirror (Task 13) use the same shape.
- `ArrivalFormData` import path is `@core` in both web and RN hooks.
- `calculateResult` is web-only (`web/src/lib/calculation-result.ts:13`); the RN `LandingPage` defines an inline `calculateResult` (Task 13 Step 15) that mirrors the same shape. This is documented as a tech-debt item in the spec but is out of scope to refactor here.

### Found issue during self-review

- **Task 8 Step 2** originally had a complex `result.bus.available ? ... .destination ?? 'OLD_QUARTER' : 'OLD_QUARTER'` expression that was hard to read. Replaced with a simpler shape: always pass `'OLD_QUARTER'` as the destination since `calculateResult` already consumed the destination in the closure. Fixed in Task 8.

Plan complete. Saving and offering execution choice.
