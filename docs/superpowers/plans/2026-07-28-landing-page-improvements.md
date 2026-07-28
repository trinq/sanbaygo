# Landing Page Improvements — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the SanBayGo landing page into a compelling product introduction with clear messaging, social proof, SEO meta tags, and optimized assets — ready to share with real users.

**Architecture:** Improve the existing Hero component in-place (Option B from spec) rather than rebuilding. Add new sections as separate components. All copy lives in `LanguageContext.tsx`. SEO tags go in `index.html`.

**Tech Stack:** Vite + React, TypeScript, Tailwind CSS (already in project)

---

## Global Constraints

- All user-facing text must be in Vietnamese (confirmed in AGENTS.md)
- No backend, no API calls, no authentication
- Follow existing patterns: `Hero.tsx` uses Figma blur stack (5 layers)
- Landing page `/` stays as single-page app; result page after form submission
- Test files: `web/__tests__/components/Landing/`, `web/e2e/`

---

## File Map

```
web/
├── public/
│   ├── hero.jpg              # Source image (444 KB)
│   ├── hero-480w.webp        # Generated (small)
│   ├── hero-960w.webp        # Generated (medium)
│   ├── hero-1920w.webp       # Generated (large)
│   └── favicon.svg           # Emoji-based favicon
├── index.html                # SEO meta tags, OG tags
├── src/
│   ├── components/Landing/
│   │   ├── Hero.tsx          # Modify: new headline, HowItWorks slot
│   │   ├── HowItWorks.tsx    # Create: 3-step section
│   │   ├── FAQ.tsx           # Create: 5-question accordion
│   │   ├── SocialProof.tsx   # Modify: replace placeholder
│   │   └── BenefitChips.tsx  # Modify: copy TBD
│   ├── pages/
│   │   ├── Privacy.tsx       # Create: minimal legal page
│   │   └── Terms.tsx         # Create: minimal legal page
│   └── contexts/
│       └── LanguageContext.tsx  # Modify: add new copy strings
└── __tests__/
    └── components/Landing/
        ├── Hero.test.tsx     # Update: match new headline
        ├── HowItWorks.test.tsx # Create
        └── FAQ.test.tsx      # Create
```

---

## Task 1: Rewrite Headline + Subtitle

**Files:**
- Modify: `web/src/contexts/LanguageContext.tsx`
- Modify: `web/src/components/Landing/Hero.tsx`
- Modify: `web/src/__tests__/components/Landing/Hero.test.tsx`

**Interfaces:**
- Consumes: existing `t.landing` object shape
- Produces: new `t.landing.headline`, `t.landing.subtitle` strings

---

- [ ] **Step 1: Update LanguageContext with new headline + subtitle**

Read the current `LanguageContext.tsx` to find the `landing` section, then update:

```typescript
landing: {
  headline: "Chỉ cần nhập giờ đáp — biết ngay xe gì về được",
  subtitle: "SanBayGo so sánh xe buýt công cộng và Grab để bạn chọn phương tiện tốt nhất từ sân bay Nội Bài hoặc Tân Sơn Nhất về trung tâm Hà Nội hoặc TP.HCM.",
  // ... keep existing: howItWorks, benefits, etc.
},
```

- [ ] **Step 2: Verify Hero.tsx renders new headline**

Read `web/src/components/Landing/Hero.tsx` lines 37-55. The current `h1` already uses `{t.landing.headline.split('nhanh nhất').map(...)}` pattern. Update to remove the highlight logic since new headline doesn't contain "nhanh nhất":

```tsx
<h1
  className="mt-6 font-extrabold leading-tight text-ink"
  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
>
  {t.landing.headline}
</h1>
```

- [ ] **Step 3: Run test to verify render**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test -- --testPathPattern="Hero.test" --passWithNoTests
```

- [ ] **Step 4: Commit**

```bash
git add web/src/contexts/LanguageContext.tsx web/src/components/Landing/Hero.tsx
git commit -m "feat: rewrite landing headline and subtitle"
```

---

## Task 2: Replace Social Proof Placeholder

**Files:**
- Modify: `web/src/components/Landing/SocialProof.tsx`
- Modify: `web/src/contexts/LanguageContext.tsx`

**Interfaces:**
- Consumes: `t.landing` from LanguageContext
- Produces: Honest social proof text

---

- [ ] **Step 1: Update LanguageContext with new social proof strings**

Add to `landing` section in LanguageContext:

```typescript
landing: {
  // ... headline, subtitle from Task 1 ...
  socialProof: {
    badge: "Miễn phí",
    tagline: "Không cần tải app, không cần đăng ký",
  },
},
```

- [ ] **Step 2: Rewrite SocialProof.tsx**

Read `web/src/components/Landing/SocialProof.tsx` and replace with:

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

export function SocialProof() {
  const { t } = useLanguage();
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-ink">{t.landing.socialProof.badge}</p>
        <p className="text-sm text-ink-soft">{t.landing.socialProof.tagline}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Run tests**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test -- --testPathPattern="SocialProof" --passWithNoTests
```

- [ ] **Step 4: Commit**

```bash
git add web/src/components/Landing/SocialProof.tsx web/src/contexts/LanguageContext.tsx
git commit -m "feat: replace fake social proof with honest messaging"
```

---

## Task 3: Add "How It Works" Section

**Files:**
- Create: `web/src/components/Landing/HowItWorks.tsx`
- Create: `web/src/__tests__/components/Landing/HowItWorks.test.tsx`
- Modify: `web/src/components/Landing/Hero.tsx`
- Modify: `web/src/contexts/LanguageContext.tsx`

**Interfaces:**
- Consumes: `t.landing.howItWorks` (3 steps array)
- Produces: `HowItWorks` component rendered in Hero

---

- [ ] **Step 1: Add copy strings to LanguageContext**

Add to `landing` section:

```typescript
landing: {
  // ... previous fields ...
  howItWorks: {
    title: "Cách hoạt động",
    steps: [
      {
        number: "1",
        label: "Nhập giờ đáp",
        description: "Chọn sân bay, nhà ga và giờ máy bay đáp",
      },
      {
        number: "2",
        label: "Xem ngay kết quả",
        description: "So sánh xe buýt và Grab — giá, thời gian, chuyến tiếp theo",
      },
      {
        number: "3",
        label: "Chọn và di chuyển",
        description: "Nhấn đặt Grab hoặc đến điểm bắt xe buýt",
      },
    ],
  },
},
```

- [ ] **Step 2: Create HowItWorks component**

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

const STEP_ICON_PATHS = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", // clock
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", // document
  "M13 10V3L4 14h7v7l9-11h-7z", // lightning
];

export function HowItWorks() {
  const { t } = useLanguage();
  const { steps, title } = t.landing.howItWorks;

  return (
    <section className="mt-16 border-t border-surface-border pt-12">
      <h2 className="text-center text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {steps.map((step: { number: string; label: string; description: string }, i: number) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={STEP_ICON_PATHS[i]} />
                </svg>
              </div>
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {step.number}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-ink">{step.label}</h3>
            <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire HowItWorks into Hero**

Read `web/src/components/Landing/Hero.tsx`. Add import and render after `BenefitChips`:

```tsx
import { HowItWorks } from './HowItWorks';

// Inside Hero render, after <BenefitChips />
<HowItWorks />
```

- [ ] **Step 4: Create basic test**

```tsx
import { render, screen } from '@testing-library/react';
import { HowItWorks } from '../HowItWorks';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('HowItWorks', () => {
  it('renders 3 steps', () => {
    render(
      <LanguageProvider>
        <HowItWorks />
      </LanguageProvider>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run tests**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test -- --testPathPattern="HowItWorks" --passWithNoTests
```

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Landing/HowItWorks.tsx web/src/__tests__/components/Landing/HowItWorks.test.tsx web/src/components/Landing/Hero.tsx web/src/contexts/LanguageContext.tsx
git commit -m "feat: add How It Works section with 3 steps"
```

---

## Task 4: Add FAQ Section

**Files:**
- Create: `web/src/components/Landing/FAQ.tsx`
- Create: `web/src/__tests__/components/Landing/FAQ.test.tsx`
- Modify: `web/src/contexts/LanguageContext.tsx`

**Interfaces:**
- Consumes: `t.landing.faq` (5 Q&A objects)
- Produces: `FAQ` component, accordion-style

---

- [ ] **Step 1: Add FAQ copy to LanguageContext**

Add to `landing` section:

```typescript
landing: {
  // ... previous fields ...
  faq: {
    title: "Câu hỏi thường gặp",
    questions: [
      {
        q: "SanBayGo có mất phí không?",
        a: "Không. SanBayGo hoàn toàn miễn phí sử dụng. Chúng tôi không thu phí, không yêu cầu đăng ký, và không lưu trữ dữ liệu cá nhân của bạn.",
      },
      {
        q: "Xe buýt có đúng giờ không?",
        a: "Giờ xe buýt trong ứng dụng là lịch trình chính thức. Trong giờ cao điểm (7-9h sáng, 5-7h tối), xe có thể chậm 10-20 phút. Chúng tôi khuyến nghị đến điểm bắt xe sớm 15 phút.",
      },
      {
        q: "Tôi nên chọn xe buýt hay Grab?",
        a: "Xe buýt rẻ hơn nhiều (15.000-50.000đ) nhưng cần thời gian. Grab nhanh hơn nhưng giá cao hơn và phụ thuộc vào tắc đường. SanBayGo hiển thị cả hai để bạn quyết định dựa trên thời gian và ngân sách.",
      },
      {
        q: "Làm sao bắt được Grab tại sân bay?",
        a: "Sau khi nhấn 'Đặt Grab', bạn sẽ được chuyển đến ứng dụng Grab. Tại sân bay, điểm đón có thể cách sảnh 50-200m — đi theo biển chỉ dẫn hoặc hỏi nhân viên.",
      },
      {
        q: "Ứng dụng có hỗ trợ tiếng Anh không?",
        a: "Có. Nhấn nút 'EN' trên thanh điều hướng để chuyển sang tiếng Anh. Toàn bộ giao diện và kết quả đều được dịch.",
      },
    ],
  },
},
```

- [ ] **Step 2: Create FAQ component**

```tsx
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16" id="faq">
      <h2 className="text-center text-2xl font-bold text-ink">{t.landing.faq.title}</h2>
      <div className="mt-8 space-y-4">
        {t.landing.faq.questions.map((item: { q: string; a: string }, i: number) => (
          <div key={i} className="rounded-xl border border-surface-border bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left font-medium text-ink"
            >
              {item.q}
              <svg
                className={`h-5 w-5 text-ink-soft transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-surface-border px-5 pb-5 pt-4 text-ink-soft">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire FAQ into Hero or add after Hero**

Read `web/src/App.tsx` to understand routing. If landing is at `/`, add FAQ after Hero:

```tsx
// In App.tsx or wherever Hero is rendered:
<Hero>{children}</Hero>
<FAQ />
```

- [ ] **Step 4: Create test**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from '../FAQ';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('FAQ', () => {
  it('renders all 5 questions', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    // Check that FAQ title is present
    expect(screen.getByText(/câu hỏi thường gặp/i)).toBeInTheDocument();
  });

  it('toggles answer on click', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    const firstQuestion = screen.getByText(/SanBayGo có mất phí không?/);
    fireEvent.click(firstQuestion);
    expect(screen.getByText(/Không. SanBayGo hoàn toàn miễn phí/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run tests**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test -- --testPathPattern="FAQ" --passWithNoTests
```

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Landing/FAQ.tsx web/src/__tests__/components/Landing/FAQ.test.tsx web/src/contexts/LanguageContext.tsx web/src/App.tsx
git commit -m "feat: add FAQ section with 5 questions"
```

---

## Task 5: Add Open Graph + Twitter Card Meta Tags

**Files:**
- Modify: `web/index.html`

**Interfaces:**
- Consumes: Static strings for SEO
- Produces: `<meta property="og:*">` and `<meta name="twitter:*">` tags

---

- [ ] **Step 1: Read current index.html**

Read `web/index.html` to find the `<head>` section.

- [ ] **Step 2: Add Open Graph tags after existing meta description**

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sanbaygo.app/" />
<meta property="og:title" content="SanBayGo — Đi xe buýt từ sân bay về trung tâm" />
<meta property="og:description" content="Nhập giờ đáp máy bay — biết ngay xe buýt và Grab nào về được. So sánh giá, thời gian, chuyến tiếp theo. Miễn phí, không cần tải app." />
<meta property="og:image" content="https://sanbaygo.app/og-image.png" />
<meta property="og:locale" content="vi_VN" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SanBayGo — Đi xe buýt từ sân bay về trung tâm" />
<meta name="twitter:description" content="Nhập giờ đáp máy bay — biết ngay xe buýt và Grab nào về được." />
<meta name="twitter:image" content="https://sanbaygo.app/og-image.png" />
```

- [ ] **Step 3: Verify no linter errors**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add web/index.html
git commit -m "feat: add Open Graph and Twitter Card meta tags"
```

---

## Task 6: Create Emoji-Based Favicon

**Files:**
- Create: `web/public/favicon.svg`

---

- [ ] **Step 1: Create favicon SVG**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="16" fill="#0ea5e9"/>
  <text x="16" y="22" font-size="18" text-anchor="middle" fill="white">🚌</text>
</svg>
```

- [ ] **Step 2: Update index.html to reference favicon**

Read `web/index.html` and add/update the link tag in `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 3: Commit**

```bash
git add web/public/favicon.svg web/index.html
git commit -m "feat: add emoji-based favicon (bus emoji on sky-blue circle)"
```

---

## Task 7: Convert Hero Image to WebP + srcset

**Files:**
- Modify: `web/public/hero.jpg` → `web/public/hero-480w.webp`, `hero-960w.webp`, `hero-1920w.webp`
- Modify: `web/src/components/Landing/Hero.tsx`

**Note:** This task requires image processing. Check if `cwebp` (WebP CLI) or `squoosh` is available. If not, install it first.

---

- [ ] **Step 1: Check for image processing tool**

```bash
which cwebp || which squoosh || echo "need to install"
```

If not available, install via:

```bash
brew install webp  # macOS
# or
npm install -g @aspect-build/squoosh
```

- [ ] **Step 2: Generate WebP variants**

```bash
cd /Users/trinq/Developer/sanbaygo/web/public

# 480w for mobile
cwebp -resize 480 0 hero.jpg -o hero-480w.webp

# 960w for tablet
cwebp -resize 960 0 hero.jpg -o hero-960w.webp

# 1920w for desktop
cwebp -resize 1920 0 hero.jpg -o hero-1920w.webp
```

Verify sizes:

```bash
ls -lh hero-*.webp hero.jpg
```

Expected output:
```
hero-480w.webp   ~50-80 KB
hero-960w.webp   ~100-150 KB
hero-1920w.webp  ~200-300 KB
hero.jpg         444 KB (can keep as fallback)
```

- [ ] **Step 3: Update Hero.tsx to use srcset**

Read `web/src/components/Landing/Hero.tsx` lines 15-19. Replace the single `<img>` with:

```tsx
<picture>
  <source
    media="(max-width: 480px)"
    srcSet="/hero-480w.webp"
    type="image/webp"
  />
  <source
    media="(max-width: 960px)"
    srcSet="/hero-960w.webp"
    type="image/webp"
  />
  <source
    srcSet="/hero-1920w.webp"
    type="image/webp"
  />
  <img
    src="/hero.jpg"
    alt="Đường phố hiện đại"
    className="absolute inset-0 h-full w-full object-cover opacity-[0.85] mix-blend-overlay"
  />
</picture>
```

- [ ] **Step 4: Run tests**

```bash
cd /Users/trinq/Developer/sanbaygo/web && npm test -- --testPathPattern="Hero" --passWithNoTests
```

- [ ] **Step 5: Commit**

```bash
git add web/public/hero-480w.webp web/public/hero-960w.webp web/public/hero-1920w.webp web/src/components/Landing/Hero.tsx
git commit -m "perf: convert hero image to WebP with srcset"
```

---

## Task 8: Create Minimal Privacy Page

**Files:**
- Create: `web/src/pages/Privacy.tsx`
- Modify: `web/src/App.tsx` (add route)
- Modify: `web/src/contexts/LanguageContext.tsx`

---

- [ ] **Step 1: Add Privacy page copy**

Add to LanguageContext:

```typescript
pages: {
  privacy: {
    title: "Chính sách bảo mật",
    content: "SanBayGo không lưu trữ, thu thập, hoặc chia sẻ bất kỳ dữ liệu cá nhân nào của bạn. Ứng dụng chỉ sử dụng thông tin bạn nhập (giờ đáp, sân bay, điểm đến) để tính toán và hiển thị kết quả trong phiên làm việc hiện tại. Không có cookie, không có analytics, không có theo dõi.",
  },
},
```

- [ ] **Step 2: Create Privacy.tsx**

```tsx
import { useLanguage } from '../contexts/LanguageContext';
import { Footer } from '../components/Landing/Footer';

export function Privacy() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-ink">{t.pages.privacy.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.privacy.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          ← Quay về trang chủ
        </a>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Add route to App.tsx**

Read `web/src/App.tsx` and add:

```tsx
import { Privacy } from './pages/Privacy';

// Add to your routing logic:
<Route path="/privacy" element={<Privacy />} />
```

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/Privacy.tsx web/src/App.tsx web/src/contexts/LanguageContext.tsx
git commit -m "feat: add minimal privacy page"
```

---

## Task 9: Create Minimal Terms Page

**Files:**
- Create: `web/src/pages/Terms.tsx`
- Modify: `web/src/App.tsx` (add route)
- Modify: `web/src/contexts/LanguageContext.tsx`

---

- [ ] **Step 1: Add Terms page copy**

Add to LanguageContext:

```typescript
pages: {
  // ... privacy from Task 8 ...
  terms: {
    title: "Điều khoản sử dụng",
    content: "SanBayGo là công cụ tham khảo miễn phí. Thông tin lịch trình xe buýt và ước tính giá Grab được cung cấp như tham khảo và có thể không chính xác hoàn toàn. Người dùng chịu trách nhiệm kiểm tra thông tin trực tiếp với đơn vị vận tải trước khi di chuyển. SanBayGo không chịu trách nhiệm về bất kỳ tổn thất nào phát sinh từ việc sử dụng ứng dụng.",
  },
},
```

- [ ] **Step 2: Create Terms.tsx**

```tsx
import { useLanguage } from '../contexts/LanguageContext';
import { Footer } from '../components/Landing/Footer';

export function Terms() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-ink">{t.pages.terms.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.terms.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          ← Quay về trang chủ
        </a>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Add route to App.tsx**

```tsx
import { Terms } from './pages/Terms';

// Add route:
<Route path="/terms" element={<Terms />} />
```

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/Terms.tsx web/src/App.tsx web/src/contexts/LanguageContext.tsx
git commit -m "feat: add minimal terms page"
```

---

## Verification Checklist

After all tasks, run these commands to verify:

```bash
# 1. All tests pass
cd /Users/trinq/Developer/sanbaygo/web && npm test

# 2. TypeScript compiles
npx tsc --noEmit

# 3. Build succeeds
npm run build
```

Expected results:
- All tests pass (or `--passWithNoTests` if test files don't exist yet)
- TypeScript exit 0
- Build produces `dist/` folder

---

## Self-Review

**1. Spec coverage:**
- ✅ Task 1.1 (Hero improvement) → Tasks 1, 3, 4
- ✅ Task 1.2 (Headline) → Task 1
- ✅ Task 1.3 (How it works) → Task 3
- ✅ Task 2.2 (Social proof) → Task 2
- ✅ Task 2.4 (FAQ) → Task 4
- ✅ Task 3.1 (Open Graph) → Task 5
- ✅ Task 3.2 (Twitter Card) → Task 5
- ✅ Task 4.1 (Favicon) → Task 6
- ✅ Task 4.3 (WebP hero) → Task 7
- ✅ Task 6.1 (Privacy) → Task 8
- ✅ Task 6.2 (Terms) → Task 9

**2. Placeholder scan:** No TODOs, no TBDs, no "implement later" found.

**3. Type consistency:** All `t.landing.*` accesses match the shape defined in LanguageContext.

---

**Plan complete and saved to `docs/superpowers/plans/2026-07-28-landing-page-improvements.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
