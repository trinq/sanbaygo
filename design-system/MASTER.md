# SanBayGo Design System — MASTER

## Mood

Apple HIG-inspired. Calm, neutral, decisive. Single accent color rationed across CTAs, active state, recommended indicator, and brand mark only. No gradients, no glass, no warm tones, no purple/cyan.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--color-bg-page` | `#FAFAFA` | App page background |
| `--color-bg-card` | `#FFFFFF` | Card / grouped-list surface |
| `--color-bg-grouped` | `#F2F2F7` | Header strip, table header, icon containers |
| `--color-bg-sidebar` | `#F5F5F7` | Desktop sidebar rail |
| `--color-text-primary` | `#1C1C1E` | Body text |
| `--color-text-secondary` | `#8E8E93` | Subtitle, captions |
| `--color-text-tertiary` | `#C7C7CC` | Placeholder, disabled |
| `--color-separator` | `rgba(60, 60, 67, 0.12)` | Hairline divider |
| `--color-separator-strong` | `rgba(60, 60, 67, 0.20)` | Section divider |
| `--color-accent` | `#007AFF` | Single accent — CTA, brand, active |
| `--color-accent-pressed` | `#0051D5` | Hover/active CTA |
| `--color-accent-tint` | `rgba(0, 122, 255, 0.08)` | Recommended row fill |
| `--color-accent-tint-strong` | `rgba(0, 122, 255, 0.14)` | Active pill |
| `--color-warn` | `#FF9500` | Peak-hour indicator dot |
| `--color-warn-tint` | `rgba(255, 149, 0, 0.12)` | Warning note row icon container |

## Typography

System font: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif`.

| Token | px | Use |
|---|---|---|
| `--font-size-caption` | 11 | Eyebrow labels, table headers (uppercase tracked) |
| `--font-size-secondary` | 13 | Subtitle, note text |
| `--font-size-body` | 17 | Body, form values |
| `--font-size-section` | 22 | Section headings |
| `--font-size-display` | 28 | Card titles |
| `--font-size-hero` | 34 | Price display |
| `--font-size-page` | 40 | Page H1 |

## Spacing (8pt grid)

`--space-1: 4` · `--space-2: 8` · `--space-3: 12` · `--space-4: 16` · `--space-5: 24` · `--space-6: 32` · `--space-7: 48` · `--space-8: 64`.

## Radii

`--radius-sm: 8` · `--radius-md: 12` · `--radius-lg: 16` · `--radius-pill: 999`.

## Shadow

`--shadow-card: 0 1px 2px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.06)`
`--shadow-hero: 0 2px 12px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.04)`

## Anti-patterns (encoded in `tokens-parity.test.ts`)

- ❌ No `purple`, `magenta`, `cyan`, `neon` hex anywhere.
- ❌ No `gradient` keyword in CSS.
- ❌ No `backdrop-filter` / `blur` keyword.
- ❌ No `box-shadow` with `rgba(..., 0.3+)` (overly diffuse).
- ✅ All accent usage of `#007AFF` lives behind the `--color-accent*` tokens.
- ✅ All body font sizes ≥ 17 px.

> ⚠️ Open call: `--color-warn: #FF9500` (systemOrange) is warm; conflicting with "no warm tones". Resolved in Task 2.
