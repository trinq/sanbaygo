# Clarity Landing Page Design

## Concept

**Subject:** AI writing assistant landing page
**Audience:** General users seeking better everyday writing
**Single job:** Convert visitors to sign up or learn more

## Design Direction: Ultra-Minimalist Apple-Inspired

The design embraces **radical restraint** — letting typography, whitespace, and subtle motion do the heavy lifting. Think Apple's product pages: not what's there that matters, but what's *not* there.

---

## Color Palette

### Light Mode
| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FAFAF9` | Warm off-white (not pure white) |
| Surface | `#FFFFFF` | Cards, elevated elements |
| Text Primary | `#1C1917` | Headlines, body |
| Text Secondary | `#78716C` | Captions, hints |
| Accent | `#18181B` | CTA button |
| Border | `#E7E5E4` | Subtle dividers only |

### Dark Mode
| Role | Hex | Usage |
|------|-----|-------|
| Background | `#09090B` | Near-black |
| Surface | `#18181B` | Cards |
| Text Primary | `#FAFAF9` | Headlines, body |
| Text Secondary | `#A8A29E` | Captions, hints |
| Accent | `#FAFAF9` | CTA button (inverted) |
| Border | `#27272A` | Subtle dividers |

---

## Typography

**Display:** Inter (weight 600-700)
**Body:** Inter (weight 400-500)

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Hero Headline | 72px / 4.5rem | 700 | 1.05 |
| Hero Sub | 20px | 400 | 1.5 |
| Section Title | 48px / 3rem | 600 | 1.1 |
| Feature Title | 20px | 600 | 1.3 |
| Feature Body | 16px | 400 | 1.6 |
| Nav | 14px | 500 | 1 |

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                    Features  Pricing  Sign In  │  ← Nav (minimal)
├─────────────────────────────────────────────────────────┤
│                                                         │
│                                                         │
│                     Clarity                             │  ← Hero (centered)
│            Write with perfect clarity                   │
│                                                         │
│                   [Get Started]                          │  ← Single CTA
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│    │ Feature │  │ Feature │  │ Feature │               │  ← Feature Cards
│    │    1    │  │    2    │  │    3    │               │     (3 columns)
│    └─────────┘  └─────────┘  └─────────┘               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   [Sign Up CTA]                          │  ← Final CTA
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Spacing System (8px base):**
- Section padding: 120px vertical
- Content max-width: 1120px
- Card gap: 24px
- Element gap: 16px

---

## Signature Element

**The whitespace itself.** The hero headline is massive but surrounded by generous margins that make it feel *intentional* rather than aggressive. The page breathes.

---

## Component States

### Navigation
- Default: Text only, subtle hover opacity
- Hover: 60% opacity
- Mobile: Hamburger menu (minimal)

### CTA Button
- Default: Black/white fill, no border
- Hover: Scale 1.02, subtle shadow
- Active: Scale 0.98
- Transition: 200ms ease

### Feature Cards
- Default: No border, transparent background
- Hover: Very subtle shadow lift (0 4px 20px rgba(0,0,0,0.06))
- Icon: Single color, 24px

### Dark Mode Toggle
- Sun/Moon icon in nav
- Smooth color transition on toggle (300ms)

---

## Motion Philosophy

Minimal, purposeful animation:
- Page load: Hero text fades in (400ms, ease-out)
- Scroll: Features fade up on intersection (staggered 100ms)
- Hover: Micro-interactions only (150-200ms)
- Dark mode: Color transition (300ms)

**Respect `prefers-reduced-motion`: all animations disabled when set.**

---

## Anti-Patterns to Avoid

- ❌ Gradient backgrounds
- ❌ Glassmorphism or blur effects
- ❌ Colorful accent gradients
- ❌ Decorative illustrations
- ❌ Heavy shadows or borders
- ❌ Multiple CTAs competing for attention
- ❌ Carousels or sliders
