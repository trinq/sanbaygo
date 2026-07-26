# SanBayGo Landing Page — Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:writing-plans after this spec is approved to break it into an implementation plan.

**Source request:** User pointed the Figma Make file `tOc15VZJFmy6tbIkC8E6S7` ("Thiết-kế-giao-diện-SanBayGo") at SanBayGo and asked: "Implement landing page này vào codebase SanBayGo phù hợp với tính năng hiện có."

**Status:** Draft awaiting code review and user approval.

---

## 1. Context (live state of the repo at HEAD = `d6d423e`)

| Surface | Current direction | Notes |
|---|---|---|
| `web/` | **Editorial-paper** (`design-system/tokens/tokens.ts`) | Warm paper background, signal-red `#D4321C` accent, Fraunces serif + JetBrains Mono, `BusTimetableSpine`, no shadows. Latest commit: `d6d423e redesign(web): editorial-paper direction with BusTimetableSpine`. |
| RN (`app/`) | Same editorial-paper direction (parallel effort) | Single-page form on the existing App route |
| `core/` | Shared business logic (data + calc-engine) | Unchanged in this spec |
| `design-system/` | Editorial-paper tokens (single source of truth) | Reuse, do not modify palette |

**The Figma Make file is a hero+search landing** (sky-blue primary, glass blur, Plus Jakarta Sans, amber accent, social-proof chips). It **conflicts** with the live editorial-paper direction on **every axis**. The user has decided (via `AskQuestion` answers):

1. Landing **replaces** the current form (no separate form route)
2. CTA `Tìm phương tiện` goes **directly to ResultDisplay** (no intermediate step)
3. Data loads from **`@core/data`** (no fabricated airports/destinations)
4. **Revert** the editorial-paper tokens/colors and rebuild in Figma style (sky-blue, glassmorphism, Plus Jakarta Sans) — chosen because the user wants the Figma design as-is
5. Implement on **both `web/` and `app/`** (shared layout)
6. RN uses **BlurView** (`expo-blur`) for the glass effect
7. Hero PNG comes from the Figma Make source (1 of 6 PNGs)

This spec records those decisions and the technical shape needed to implement them safely.

---

## 2. Problem Statement

The user shared a Figma Make file (a marketing landing page) and asked to integrate it. The current SanBayGo codebase is on an editorial-paper direction that the user has now decided to revert. A naive port would:

- Conflict with the existing design tokens and break every component that depends on them.
- Add a third visual direction in three days (Apple-minimal → editorial-paper → Figma-glassy-sky), creating churn for every consumer.
- Fabricate airports and destinations (Figma lists 5 airports + 5 destinations; SanBayGo only supports NoiBai → Hanoi), violating the `@core` data contract.
- Bypass `calculateResult()` and write a landing-only calculation path, fragmenting the business logic across two surfaces.

The spec below addresses each.

---

## 3. Solution

### 3.1 Visual direction (Figma as-is, verbatim)

Adopt the Figma Make visual direction verbatim. No design tokens are "translated" — the Figma design uses Tailwind utilities inline.

| Token / value | Source | Where it lands |
|---|---|---|
| `bg-primary` (sky-blue 500) → hover `bg-sky-700` | Figma `App.tsx` | Inline Tailwind classes |
| `text-primary`, `bg-slate-50/100/200/...`, `border-slate-200` | Figma | Inline |
| `bg-amber-300` (underline highlight on "nhanh nhất") | Figma | SVG inline |
| `bg-emerald-100/600` (benefit chip icons) | Figma | Inline |
| `font-family: 'Plus Jakarta Sans'` | Figma | `web/index.html` `<link>` + RN `expo-font` |
| Glass blur `backdrop-blur-md`, `mix-blend-overlay` | Figma | Tailwind on web; `BlurView` `Blur.Light` on RN |
| `rounded-xl` / `rounded-[1.5rem]` cards | Figma | Tailwind |
| `shadow-xl shadow-primary/30` on CTA | Figma | Tailwind |

**Anti-patterns explicitly excluded by user choice:** no warm-paper tokens, no signal-red, no editorial type. The existing `design-system/tokens/tokens.ts` (editorial-paper) is **superseded**, not coexisting. The `tokens-parity.test.ts` test must be rewritten against the new palette — see §6.

### 3.2 Architecture

| Layer | Web (`web/`) | RN (`app/`) |
|---|---|---|
| Style tech | **Tailwind CSS 4** via `@tailwindcss/vite` (newly added — `package.json` + `vite.config.ts` + `src/styles/global.css` directives) | **NativeWind 4** (matching Tailwind utility class names); babel preset added to `babel.config.js` |
| Hero | `<div>` + `<img>` + Tailwind gradient layers | `<View>` + `<ImageBackground>` + `<LinearGradient>` (RN has no CSS gradient utility natively — `expo-linear-gradient` is the standard solution) |
| Glass card | `bg-white/80 backdrop-blur-md` | `<BlurView intensity={60} tint="light">` from `expo-blur` |
| Icons | `lucide-react` (used in Figma) | `lucide-react-native` |
| Font | `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">` in `web/index.html` | `expo-font` + `Font.loadAsync({ 'PlusJakartaSans-ExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf') })` |
| Hero asset | `web/public/hero.png` (1 PNG downloaded from Figma Make source) | `assets/hero.png` (same file copied into Expo) |

### 3.3 Component tree (shared between web and RN)

```
<LandingPage>                              — orchestrates state + submit
├── <Hero>
│   ├── <Nav>
│   │   ├── <BrandMark> (square + 'SanBay'/'Go')
│   │   └── <LanguagePill>                  — reuses LanguageContext (web) / hardcoded 'VN' (RN)
│   ├── <HeroBackground>
│   │   ├── <img / ImageBackground src={hero.png}>  with `mix-blend-overlay`
│   │   ├── <GradientLayer1> (right-fade white)
│   │   ├── <GradientLayer2> (bottom-fade white, mobile only)
│   │   └── <GlassBackdrop> (white/30 backdrop-blur)
│   └── <HeroContent> (grid: 12-col on desktop, stack on mobile)
│       ├── <LeftCol>
│       │   ├── <PillBadge> "Dịch vụ xe đưa đón sân bay"
│       │   ├── <H1> "Cách **nhanh nhất** từ sân bay về trung tâm."
│       │   ├── <Subtitle> (slate-600 lg)
│       │   └── <BenefitChips> (3 emerald-icon chips)
│       └── <RightCol> (max-w-[460px])
│           └── <SearchCard>
│               ├── <DepartureDropdown>      — options from @core/data/airport
│               ├── <DestinationChips>       — options from @core/data/destinations
│               ├── <PeopleStepper>          — clamp [1..10]
│               ├── <LuggageStepper>         — clamp [0..10]
│               └── <CTAButton>              — disabled until valid
└── <SocialProof>                            — 3 avatars + 4.9 amber badge + count
└── <Footer>                                 — logo + tagline + 3 links
```

### 3.4 State + data flow

`useLandingForm()` hook (one in `web/src/hooks/`, one in `app/hooks/`, identical contract):

| Field | Type | Source / Validation |
|---|---|---|
| `departure` | `string \| null` (Airport id) | **REQUIRED**. Options come from `core/data/airport.ts` `airports` array — note the actual type is `Airport` with `id: string` (no `AirportId` named type). RN filters terminals by `flightType` automatically. Web keeps full airport list (the only current option is NoiBai, exported as `NOI_BAI_AIRPORT`). |
| `destination` | `string \| null` (Destination id) | **REQUIRED**. Options come from `core/data/destinations.ts` filtered to `hasBusCoverage === true`, excluding `'other'`. Note the actual type is `DestinationPoint` with `id: string` (no `DestinationId` named type). |
| `people` | `1..10` (default 1) | Stepper |
| `luggage` | `0..10` (default 1) | Stepper |
| `terminal` | `TerminalId` (`'T1' \| 'T2'`) | **Derived** from selected airport's terminals — defaults to T1 if airport has it (always true for NoiBai). |
| `flightType` | `'domestic' \| 'international'` | **Derived** from selected airport's terminals — default `'domestic'`, switches to `'international'` if T1 is selected (per `core/data/airport.ts:10` T1 has `flightTypes: ['domestic','international']`, default international since most Nội Bài flights are international). |
| `arrivalTime` | `'HH:mm'` | **Derived** — see "arrival time gap" below |

**The arrival time gap (FIX):** Figma has no "arrival time" field — the landing is purely airport→destination. The current `calculateResult()` (in `web/src/lib/calculation-result.ts:13`) requires `arrivalTime: string`, `terminal: TerminalId`, `baggage: BaggageType`, `destination: string`, `flightType: FlightType`. To make the landing submit work without making the user type a time, the spec uses:

- **Decision: Default arrival time = `12:00`** (midday, before peak). `useLandingForm` exposes this as a constant. The CTA footer line reads `"Lịch trình được tính cho khung giờ 12:00 — nhập giờ thực tế khi cần chính xác"`. The pre-computed result is correct for `12:00`; it is **not** adjusted for "now" — this is an honest default, not a fake time.

**The terminal/flightType derivation gap (FIX):** Since the landing has no terminal or baggage UI, `useLandingForm` derives them:
- `terminal`: from `NOI_BAI_AIRPORT.terminals[0].id` → `'T1'`
- `flightType`: from `NOI_BAI_AIRPORT.terminals[0].flightTypes[1] ?? 'domestic'` → `'international'` for T1 (since `flightTypes: ['domestic','international']`)
- `baggage`: hardcoded to `'carry_on'` (the most common case)

These are **NOT** parameters the user picks in v1 of the landing. This is documented as a known limitation in the landing footer: `"Đang giả định nhà ga T1 + hành lý xách tay — chi tiết hơn sau"`.

**Submit handler:**
```ts
// in useLandingForm
const onSubmit = () => {
  if (!departure || !destination) return null;
  return {
    arrivalTime: '12:00',
    terminal: 'T1' as TerminalId,
    baggage: 'carry_on' as BaggageType,
    destination,
    flightType: 'international' as FlightType,
  };
};
```

The calling `<LandingPage>` consumes the returned shape and passes it to `calculateResult(formData)` from `web/src/lib/calculation-result.ts`. On RN, the equivalent is `core/calculation-engine` wired in the same way (currently `web/src/lib/calculation-result.ts` should move to `core/calculation-engine/web-orchestration.ts` in a separate refactor ticket — **out of scope** for this spec; for now, RN's landing mirrors the same shape).

### 3.5 Responsive rules

Reuse `useViewport()` from `web/src/hooks/useViewport.ts` (375 / 900 / 1280 px breakpoints, mobile/tablet/desktop). For RN, copy the same logic into `app/hooks/useViewport.ts` (or expose via `@core/hooks` — see §6).

- **Mobile (≤ 768px):** hero stacks vertically; search card moves below text; brand mark visible in TopBar.
- **Tablet (769–1024px):** single-column hero, search card centered at `max-w-[640px]`.
- **Desktop (≥ 1025px):** 12-col grid; search card `lg:col-span-5` right-aligned.

### 3.6 Files to touch

**Web (`web/`):**
- ADD `web/tailwind.config.js`
- ADD `web/postcss.config.js`
- MODIFY `web/vite.config.ts` (add `@tailwindcss/vite`)
- MODIFY `web/index.html` (Google Fonts link)
- MODIFY `web/src/styles/global.css` (replace with Tailwind directives)
- ADD `web/src/components/Landing/{Hero,SearchCard,Pill,BenefitChips,SocialProof,Footer,BrandMark,LanguagePill,DepartureDropdown,DestinationChips,PeopleStepper,LuggageStepper,CTAButton}.tsx` (Tailwind-only, no CSS Modules)
- ADD `web/src/hooks/useLandingForm.ts`
- ADD `web/src/hooks/useLandingForm.test.ts` (validation, submit, dispatch)
- ADD `web/src/components/Landing/Hero.test.tsx` (renders H1 + benefit chips + CTA disabled until valid)
- MODIFY `web/src/App.tsx` (no more Header/ArrivalForm/ResultDisplay split; render `<LandingPage>` + switch to `<ResultDisplay>` on submit)
- DELETE `web/src/components/Header.tsx`, `web/src/components/Header.module.css` (replaced by Landing `Nav`)
- DELETE `web/src/components/ArrivalForm/` (entire dir)
- DELETE `web/src/components/ResultDisplay/BusTimetableSpine.tsx` + `.module.css` (no longer fits the glassy direction)
- DELETE `web/src/hooks/useFormState.ts` (replaced by `useLandingForm`)
- DELETE `web/__tests__/hooks/useFormState.test.ts` (test for deleted hook)
- DELETE `web/__tests__/components/ArrivalForm/` (entire test dir)
- MODIFY `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` (rewrite assertions to no longer depend on `BusTimetableSpine` — drop the 26-departure `ol` assertion at lines 44-50; keep the catchable-departure headline test)
- ADD `web/__tests__/components/Landing/` (new test dir)
- MODIFY `web/src/contexts/LanguageContext.tsx` (add `landing.*` namespace keys)
- MODIFY `web/e2e/responsive-flow.spec.ts` (test new landing flow)
- ADD `web/public/hero.png` (download 1 of the 6 PNGs in Figma Make source)

**Test file inventory after migration:**
- DELETE: `web/__tests__/hooks/useFormState.test.ts`, `web/__tests__/components/ArrivalForm/`, `web/src/hooks/useFormState.ts`
- ADD: `web/__tests__/components/Landing/Hero.test.tsx`, `web/__tests__/components/Landing/SearchCard.test.tsx`, `web/__tests__/hooks/useLandingForm.test.ts`
- MODIFY: `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` (drop BusTimetableSpine assertions; keep core result rendering)
- KEEP: `web/__tests__/hooks/useViewport.test.ts`, `web/__tests__/design-system/tokens-parity.test.ts` (parity test rewritten — see design-system section)

**RN (`app/`, `components/`):**
- MODIFY `app/index.tsx` (replace form-wizard with `<LandingPage>` → `<ResultDisplay>`)
- ADD `components/Landing/*` mirror of the web components, in NativeWind style
- ADD `app/hooks/useLandingForm.ts`
- ADD `babel.config.js` NativeWind preset
- ADD `tailwind.config.js` (root) for NativeWind class name resolution
- DELETE `components/ArrivalForm/*`
- DELETE `components/Header.tsx` (Landing has its own Nav)
- ADD `assets/hero.png` (same PNG copied)
- MODIFY `tests/landing-flow.test.tsx` (new)

**Design system (`design-system/`):**
- MODIFY `design-system/tokens/tokens.ts` — REPLACE palette (delete paper/ink, add sky/amber/emerald)
- MODIFY `design-system/tokens/tokens.css` — mirror
- MODIFY `design-system/MASTER.md` — rewrite
- MODIFY `web/__tests__/design-system/tokens-parity.test.ts` — update expected pairs
- DELETE `web/__tests__/design-system/` parity test (only meaningful for Figma palette if Figma design system gets its own tokens) OR replace

### 3.7 Migration order (in implementation plan)

1. Stand up Tailwind in `web/` (zero-config Vite plugin)
2. Add hero PNG to `web/public/` + `assets/`
3. Update `design-system/tokens/tokens.{ts,css}` to new palette + parity test
4. Build `useLandingForm` with test (TDD)
5. Build `SearchCard` with test (TDD: validation, dropdown close-on-outside-click, stepper clamps)
6. Build `Hero` + child components (Pill, BenefitChips, BrandMark, LanguagePill)
7. Wire `<LandingPage>` into `web/src/App.tsx`, remove legacy form/header
8. Re-run `bash init.sh` — must stay green
9. Mirror on RN (NativeWind + BlurView)
10. Update Playwright e2e spec

---

## 4. User Stories

### A. Landing as primary surface
1. As a passenger landing on SanBayGo, I want to see a hero with the value proposition immediately, so I understand what the app does.
2. As a passenger, I want to pick departure airport and destination in 3 taps, so I can quickly find a trip.
3. As a passenger, I want the search button to be visually prominent, so I know what to do next.
4. As a passenger, I want to see trust signals (rating, recent bookings), so I trust the service.

### B. Form fidelity to core data
5. As a user, I want the airport list to match `@core/data/airport.ts`, so the dropdown auto-populates when new airports are added.
6. As a user, I want destinations to come from `@core/data/destinations.ts`, so I don't see fake locations.
7. As a user, I want the result page to use the existing calculation engine, so results are consistent across web and RN.

### C. Visual identity
8. As a brand owner, I want the Figma design shipped as designed, so marketing and product stay aligned.
9. As a user on mobile, I want glass blur to fall back gracefully on devices that can't blur, so the form remains legible.
10. As a user with `prefers-reduced-motion: reduce`, I want hover/scroll transitions disabled, so I'm not distracted.

### D. Accessibility & quality
11. As a keyboard user, I want all interactive elements reachable via Tab with visible focus states.
12. As a screen reader user, I want Vietnamese labels in `accessibilityLabel` (RN) / `aria-label` (web).
13. As a user on a low-end Android, I want glass cards to be readable even without blur (i.e., background color must carry the contrast).
14. As a user, I want the screen legible on 360 dp (small Android) up to 1440 px (wide desktop) without overflow.

---

## 5. Testing Decisions

### What makes a good test

- **External behavior only.** Tests assert on rendered content (Vietnamese strings, button enabled/disabled state, validation messages) — not on Tailwind class names.
- **One test per component, one per edge case.**

### Test surface

| Module | Test type | Notes |
|---|---|---|
| `web/src/hooks/useLandingForm.test.ts` | Unit | Validation: empty departure/destination → button disabled. Submit with both set → calls `calculateResult` with derived fields. |
| `web/src/components/Landing/SearchCard.test.tsx` | Render | Renders departure dropdown, destination chips, 2 steppers, CTA. CTA is `disabled` when fields empty. |
| `web/src/components/Landing/Hero.test.tsx` | Render | Renders H1 with "nhanh nhất", subtitle, 3 benefit chips, social proof, footer. |
| `web/e2e/landing-flow.spec.ts` | Playwright | At each of 3 viewports, fill the form → see ResultDisplay |
| RN `app/hooks/useLandingForm.test.ts` | Unit | Same as web |
| RN `components/Landing/Hero.test.tsx` | Render | Same as web |
| `design-system/tests/tokens-parity.test.ts` | Unit | Updated: TS ↔ CSS parity for sky/amber/emerald palette |

### Definition of Done (per AGENTS.md)

- All tests pass (`npm test` at root, `cd web && npm test`)
- TypeScript compiles (`npx tsc --noEmit` at root, `cd web && npx tsc --noEmit`, `cd design-system && npx tsc --noEmit`)
- `bash init.sh` is green
- All Vietnamese UI strings come from the `landing.*` namespace in `LanguageContext.tsx` (web) or the existing `result-display.vi.ts` style table (RN)
- One feature entry added to `feature_list.json` per platform
- One commit per platform: `feat(web): landing hero replaces form`, `feat(rn): landing hero replaces form`

---

## 6. Open Decisions (need user input before plan)

1. **Hero PNG source:** which of the 6 PNGs in Figma Make source should be downloaded? **Default:** first hash (`1bd61901f992208d81bd6a3d5893734ba8af12b4.png`). User may pick another by name.
2. **Glassmorphism + warm spec (`08-glassmorphism-warm-result-screen.md`):** Should that spec be cancelled/closed, or does it still have a future? **Default:** closed, replaced by this spec.

Other previously-open items (default arrival time, terminal/flightType derivation) are now resolved — see §3.4 "The arrival time gap" and "The terminal/flightType derivation gap" callouts.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Reverting `design-system/tokens/tokens.ts` breaks every component that already imports it | Comprehensive `tokens-parity.test.ts` rewrite + grep audit + cross-platform grep before commit |
| Tailwind on RN requires NativeWind babel preset; RN webpack/metro needs re-bundling | NativeWind 4 has stable Expo 52 support per its README; if it fails, fall back to per-platform StyleSheet |
| `expo-blur` is not installed | `npx expo install expo-blur` is the standard add; it adds ~30KB |
| Figma PNG may be licensed restrictively | The PNGs are visually generated by Figma Make; if licensing is unclear, fall back to a self-generated abstract gradient (no Unsplash hot-link) |
| Unsplash hot-link in Figma is unstable | Already replaced with the downloaded PNG — no Unsplash URL in shipped code |
| `useViewport` shape diverges between web and RN | If extraction to `@core/hooks/useViewport` is desired, do it as a separate plan ticket |

---

## 8. Out of Scope

- Vehicle Comparison redesign (already on web via `@core`, untouched)
- Dark mode for the new landing (the Figma design is light only)
- New calculation logic (no `@core` API change)
- Storybook for the new components (rendered snapshots are sufficient)
- Multi-language RN (stays Vietnamese per AGENTS.md)
- Form persistence / deep linking to Grab app
- Animation library beyond Tailwind transitions / RN `LayoutAnimation`
- Visual regression tooling (Percy / Chromatic / Loki)

---

## 9. Worked example — happy path

Given form: departure `Sân bay Nội Bài (HAN)`, destination `Phố Cổ, Hà Nội`, people `1`, luggage `1`.

1. `useLandingForm.validate()` returns `true` (both required fields set).
2. CTA `Tìm phương tiện` becomes enabled.
3. User clicks CTA → `onSubmit()` returns:
   ```ts
   {
     arrivalTime: '12:00',
     terminal: 'T1',
     baggage: 'carry_on',
     destination: 'OLD_QUARTER',
     flightType: 'international',
   }
   ```
4. `<LandingPage>` passes this shape to `calculateResult(formData)` in `web/src/lib/calculation-result.ts:13`.
5. `calculateResult()` returns `ArrivalResult` (bus recommendation + grab estimate).
6. `setResult(calc)` → React swaps `<LandingPage>` for `<ResultDisplay>`.
7. `<ResultDisplay>` (existing component, with `BusTimetableSpine` already deleted per §3.6) renders BusRecommendation, GrabFallback, DirectionGuide, and VehicleComparison cards.

---

## 10. Reviewer feedback applied

This draft was reviewed by a code-reviewer subagent before user approval. The reviewer caught the following issues, all fixed inline:

### Critical issues fixed
1. **Missing test deletions in §3.6** — `web/src/hooks/useFormState.ts` and `web/__tests__/hooks/useFormState.test.ts` were not listed for deletion. **Fixed:** added to §3.6 with rationale; also added `BusTimetableSpine` cleanup rationale for `ResultDisplay.test.tsx` (the test at lines 44–50 asserts on the 26-departure `ol` element that the spec deletes).
2. **Wrong type names in §3.4** — `useLandingForm` referenced `AirportId` and `DestinationId`, neither of which exist in `core/types/index.ts` (only `id: string` on `Airport` and `DestinationPoint`). **Fixed:** types corrected to `string` with a note explaining the actual contract.
3. **Contradiction in §3.4 worked example** — the example used `terminal: 'T1'` + `flightType: 'domestic'`, contradicting `core/data/airport.ts:10` where T1's `flightTypes: ['domestic', 'international']` (the default is `international` since most Nội Bài flights are international). **Fixed:** terminal/flightType/baggage derivation now explicit in §3.4, with the worked example updated to match.

### Important issues noted
1. **Three direction swaps in three days** (Apple-minimal → editorial-paper → Figma-glass). Acknowledged. Mitigation: the spec records this as a known churn risk; future direction changes should consolidate via a single ADR before re-implementation.
2. **`init.sh` tsc check** — Tailwind + NativeWind version reconciliation is required before commit. Mitigation: pin versions in `package.json` (`@tailwindcss/vite` ^4.1.x, `nativewind` ^4.x, `tailwindcss` ^4.1.x) and verify `bash init.sh` is green before each commit.
3. **Glass fallback on low-end Android** — the `expo-blur` `BlurView` already falls back to a translucent panel on devices without blur support; no extra work needed.

### Minor issues fixed
- §6 open decisions reduced from 4 to 1 (the PNG choice is decided by the "download the first PNG" default; default-arrival-time is now resolved to `'12:00'`).

---

## Reviewer checklist

- [ ] Confirm user wants to revert editorial-paper direction in favor of Figma's glassy-sky direction
- [ ] Confirm `web/public/hero.png` and `assets/hero.png` will receive a downloaded PNG from Figma Make
- [ ] Confirm `useViewport` extraction to `@core/hooks` is acceptable (currently scope says duplicate across platforms)
- [ ] Confirm the default arrival time `'12:00'` + derived terminal T1 + derived flightType international is acceptable for v1
- [ ] Confirm `web/src/lib/calculation-result.ts` stays web-only in this spec (RN landing mirrors its shape in a follow-up refactor)
