# Website Design Specification — Frylane

**Ngày:** 2026-07-29
**Source:** `web/src/routes/HomePage.tsx`, `web/src/components/Landing/`

---

## 1. Tổng quan

Frylane là ứng dụng web tĩnh (SPA, không backend) giúp hành khách so sánh xe buýt công cộng và Grab để di chuyển từ sân bay Nội Bài (HAN) / Tân Sơn Nhất (SGN) về trung tâm Hà Nội / TP.HCM.

**Nguyên tắc thiết kế:**
- Một template duy nhất cho tất cả pages — đảm bảo nhất quán UX toàn site
- Mobile-first, responsive với Tailwind CSS
- Đa ngôn ngữ (VI / EN) qua `LanguageContext`
- SEO-friendly với `SEOHelmet` + JSON-LD schema trên mỗi route

---

## 2. Design Tokens (CSS)

### Màu sắc

| Token | Giá trị | Tailwind | Dùng cho |
|-------|---------|----------|----------|
| Primary | `#0284C7` | `text-primary` | CTA, accent, links |
| Ink | `#1E293B` | `text-ink` | Headings, body text |
| Ink Soft | `#64748B` | `text-ink-soft` | Subtitles, descriptions |
| Ink Quiet | `#94A3B8` | `text-ink-quiet` | Placeholders, hints |
| Surface Border | `#E2E8F0` | `border-surface-border` | Cards, dividers |
| Background | `#E6EFF6` | `bg-[#e6eff6]` | Page background |
| White Surface | `#FFFFFFCC` | `bg-white/80` | Cards với backdrop |
| Card Shadow | `0 4px 24px rgba(0,0,0,0.06)` | `shadow-card` | SearchCard |

> **Quy tắc nghiêm ngặt:** Không dùng mã màu hardcoded như `text-green-600`, `bg-gray-50`, `border-gray-200`. Luôn dùng design tokens hoặc Tailwind `emerald-*`/`slate-*` phù hợp với ngữ cảnh.

### Typography

| Style | Tailwind | Font weight | Dùng cho |
|-------|----------|-------------|----------|
| Display | `text-[clamp(2rem,5vw,3.5rem)] font-extrabold` | 800 | Hero headline |
| H1 | `text-3xl font-bold` | 700 | Page titles |
| H2 | `text-2xl font-bold` | 700 | Section headings |
| H3 | `text-xl font-semibold` | 600 | Sub-section headings |
| Body | mặc định | 400 | Nội dung văn bản |
| Small | `text-sm` | 400 | Captions, footnotes |
| Micro | `text-xs` | 400 | Labels nhỏ |

### Spacing

- Container max-width: `max-w-7xl` (landing), `max-w-3xl` (article content), `max-w-2xl` (legal pages)
- Section padding: `px-4 py-16` (mobile), `md:px-12`
- Card padding: `p-6`
- Gap: `gap-3` (tight), `gap-4` (normal), `gap-8` (sections), `gap-12` (major sections)

### Breakpoints

```
sm  : 640px  — Mobile landscape
md  : 768px  — Tablet
lg  : 1024px — Desktop
xl  : 1280px — Wide desktop
```

---

## 3. Layout Template (Single Source of Truth)

Tất cả pages sử dụng cùng một cấu trúc layout. Mỗi page chỉ thay đổi nội dung `children` / `<main>`.

```
┌─────────────────────────────────────────┐
│ Nav (BrandMark + EN/VN toggle)          │  ← always present
├─────────────────────────────────────────┤
│ [Page-specific content area]            │
│                                         │
│  - LandingPage: Hero + SearchCard + FAQ │
│  - Bus86Page : Article sections         │
│  - Privacy   : Max-w-2xl centered text   │
│  - Terms     : Max-w-2xl centered text   │
│  - Result    : Trip comparison results   │
│  - /vi/*     : Same as landing (VI)      │
│                                         │
├─────────────────────────────────────────┤
│ Footer (BrandMark + tagline + links)    │  ← always present
└─────────────────────────────────────────┘
```

### Template Wrapper Component

Tạo `web/src/components/Layout/PageLayout.tsx` làm template chuẩn:

```tsx
export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

**Tất cả pages** (`HomePage`, `HomePageVI`, `Privacy`, `Terms`, `Bus86Page`, `ResultRoute`) **đều wrap trong `<PageLayout>`**.

---

## 4. Component Inventory

### Navigation (`web/src/components/Landing/Nav.tsx`)

- Logo + brand name (left): `BrandMark` component
- Language toggle (right): button EN ↔ VN, sử dụng `useLanguage().setLanguage()`
- Style: `flex items-center justify-between px-4 py-4 lg:px-8`
- Border bottom: `border-surface-border`

### BrandMark (`web/src/components/Landing/BrandMark.tsx`)

- SVG icon (32x32, rounded rect `#0284C7`, white airplane)
- Text: `Frylane` (ink) + `Go` (primary accent) — cho phép accent rỗng ở EN
- Link về `/`

### Hero (`web/src/components/Landing/Hero.tsx`)

- Background: layered blur stack (5 layers):
  1. `<picture>` với srcSet responsive (480w, 960w, 1920w)
  2. Gradient `bg-gradient-to-r from-white/95 via-white/80 to-white/10` (desktop)
  3. Gradient `bg-gradient-to-b from-transparent via-white/20 to-white/90` (mobile)
  4. `bg-white/30 backdrop-blur-[2px]`
- Grid layout: `lg:grid-cols-12`, left col 7 (content), right col 5 (form)
- Content order: Pill → H1 → Subtitle → SocialProof → BenefitChips → HowItWorks

### Pill (`web/src/components/Landing/Pill.tsx`)

- `inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/70 px-4 py-1.5 text-sm font-semibold`
- Dot indicator: `h-2 w-2 rounded-full bg-primary`

### SocialProof (`web/src/components/Landing/SocialProof.tsx`)

- Icon: checkmark in green circle
- Badge text: "Miễn phí" / "Free"
- Tagline: "Không cần tải app, không cần đăng ký" / "No app to download, no account needed"

### BenefitChips (`web/src/components/Landing/BenefitChips.tsx`)

- 3 chips: Fast (Clock icon), Safe (ShieldCheck), Cheap (Wallet)
- Style: `rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5`
- Icon wrapper: `rounded-full bg-emerald-100 p-1.5`

### HowItWorks (`web/src/components/Landing/HowItWorks.tsx`)

- Section: `border-t border-surface-border pt-12`
- 3 steps: icon in circle + step number badge + label + description
- Layout: `grid gap-8 md:grid-cols-3`

### SearchCard (`web/src/components/Landing/SearchCard.tsx`)

- Container: `rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md`
- Fields (sử dụng sub-components): TimePicker, AirportPicker, TerminalPicker, FlightTypeSelector, DestinationChips, Stepper (people), BaggageChips
- CTA: `<CTAButton>` disabled khi `ready === false`
- Nhận props từ `useLandingForm` hook

### FAQ (`web/src/components/Landing/FAQ.tsx`)

- Max-width: `max-w-3xl`
- Style: accordion, `rounded-xl border border-surface-border bg-white`
- Icon chevron rotate khi open
- Nội dung từ `t.landing.faq`

### Footer (`web/src/components/Landing/Footer.tsx`)

- `border-t border-slate-200 px-6 py-6 md:px-12`
- Left: BrandMark (logo + text)
- Center: tagline
- Right: legal links (Terms, Privacy, Support)
- Tất cả link dùng `t.landing.*` translation keys

### SEOHelmet (`web/src/components/SEO/index.tsx`)

- Gọi trên mỗi route để set title, description, og:tags
- Config ở `web/src/seo/metaConfig.ts`

---

## 5. Routing & Pages

```
/                          → HomePage       (EN)
/vi/*                      → HomePageVI    (VI, same template)
/bus-86-hanoi-airport      → Bus86Page     (Article)
/ket-qua                   → ResultRoute   (Results)
/privacy                   → Privacy       (Legal)
/terms                     → Terms         (Legal)
/*                         → HomePage      (Fallback)
```

### Page Layout Patterns

| Page | Layout pattern |
|------|----------------|
| HomePage / HomePageVI | `<PageLayout><Hero><SearchCard>...</Hero><FAQ /><Footer /></PageLayout>` |
| Bus86Page | `<PageLayout><ArticleHero /><SearchCard /><ContentSections /><FAQ /><Footer /></PageLayout>` |
| Privacy / Terms | `<PageLayout><main max-w-2xl>{content}</main><Footer /></PageLayout>` |
| Result | `<PageLayout><ResultPage /></PageLayout>` |

---

## 6. Color Migration — Quy tắc thay thế

| Hard-coded (Cũ) | Thay bằng (Mới) |
|-----------------|-----------------|
| `text-green-600` | `text-primary` |
| `bg-green-600` | `bg-primary` |
| `hover:bg-green-700` | `hover:bg-primary/90` |
| `bg-green-100` | `bg-emerald-100` hoặc `bg-primary/10` |
| `text-green-700` | `text-primary` |
| `bg-amber-50` | `bg-[#FFF7ED]` hoặc custom |
| `border-amber-200` | `border-orange-200` |
| `text-amber-700` | `text-orange-700` |
| `bg-blue-50` | `bg-blue-50` (chấp nhận) |
| `border-blue-200` | `border-blue-200` (chấp nhận) |
| `bg-gray-50` | `bg-slate-50` |
| `border-gray-200` | `border-surface-border` |
| `text-gray-500` | `text-ink-soft` |
| `text-gray-600` | `text-ink-soft` |
| `text-gray-700` | `text-ink` |

---

## 7. Responsive Strategy

### Mobile-first breakpoints

- **Default (mobile):** Single column, full-width sections, stacked layout
- **md (768px+):** Grid layouts activate, side-by-side content
- **lg (1024px+):** Full desktop layout với sidebar form slot

### Hero responsive

- Mobile: gradient fade bottom, form below hero content
- Desktop: gradient fade right, form in right column (lg:col-span-5)

### Article pages (Bus86Page)

- Table: `overflow-x-auto` scroll on mobile
- Stops grid: single column mobile, expand on larger screens

---

## 8. Internationalization (i18n)

- Singleton: `LanguageContext` provider in `App.tsx`
- Language state: `'vi' | 'en'`, default `'vi'`
- Translations: `LanguageContext.tsx` exports `t` object
- Access: `const { t } = useLanguage()`
- Nav language toggle: `setLanguage(language === 'vi' ? 'en' : 'vi')`
- Route `/vi/*` vẫn dùng `<LandingPage>` (form tự động dịch)

---

## 9. SEO Requirements

### Per-page requirements

| Page | Title pattern | Meta description | Schema |
|------|---------------|-----------------|--------|
| `/` | "FrylaneGo — Xe buýt & Grab từ sân bay" | "So sánh xe buýt 86 và Grab..." | WebApplication |
| `/bus-86-hanoi-airport` | "Bus 86 — Sân bay Nội Bài đến Phố Cổ" | "Lịch trình, giá vé, điểm dừng..." | FAQPage + Article |
| `/privacy` | "Chính sách bảo mật" | Static text | |
| `/terms` | "Điều khoản sử dụng" | Static text | |

### SEOHelmet component

- Set `<title>`, `<meta name="description">`, og:title, og:description
- Canonical URL
- Robots meta

---

## 10. Component hóa cần thực hiện

### Tạo mới

1. **`PageLayout.tsx`** — Wrapper template chuẩn (Nav + Footer)
2. **`ArticleLayout.tsx`** — Layout cho article pages (Nav + ArticleHero + Footer)

### Refactor Bus86Page

- Wrap trong `ArticleLayout`
- Thay màu hardcoded bằng design tokens
- Sử dụng `<SearchCard>` + `useLandingForm()` cho CTA section
- Sử dụng `<FAQ>` component
- Giữ nguyên nội dung (schedule, stops, travel time, FAQ schema)

### Refactor Privacy + Terms

- Wrap trong `PageLayout`
- Thêm `<Nav>` (đang thiếu)

### PageLayout component (proposed)

```tsx
// web/src/components/Layout/PageLayout.tsx
import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

### ArticleLayout component (proposed)

```tsx
// web/src/components/Layout/ArticleLayout.tsx
import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

---

## 11. File changes checklist

```
NEW:
  web/src/components/Layout/PageLayout.tsx
  web/src/components/Layout/ArticleLayout.tsx

MODIFY:
  web/src/routes/HomePage.tsx          — wrap PageLayout (already clean)
  web/src/routes/HomePageVI.tsx        — wrap PageLayout (already clean)
  web/src/routes/articles/Bus86Page.tsx — full refactor to template
  web/src/pages/Privacy.tsx            — add Nav (via PageLayout)
  web/src/pages/Terms.tsx              — add Nav (via PageLayout)
  web/src/App.tsx                     — ensure all routes wrapped consistently

CSS (tailwind config already has design tokens):
  No changes needed — tokens already defined
```

---

## 12. Priority

1. **Tạo PageLayout + ArticleLayout** — nền tảng template
2. **Refactor Bus86Page** — page quan trọng nhất (SEO article)
3. **Refactor Privacy + Terms** — đảm bảo có Nav
4. **Kiểm tra** — tất cả pages nhất quán với template
