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
