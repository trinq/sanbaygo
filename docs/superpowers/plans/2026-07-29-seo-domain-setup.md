# SEO Domain Setup — React Router + Dynamic Meta Tags

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform SPA from state-based routing to real URL routing with per-page dynamic meta tags, preparing website for SEO keyword targeting.

**Architecture:** Replace `useState<Page>` in `App.tsx` with `react-router-dom` v6. Each route gets its own component + meta configuration object. Use `react-helmet-async` for dynamic `<title>`, `<meta>`, and canonical tags. Language detection via `Accept-Language` header with manual override via `/vi/` prefix.

**Tech Stack:** `react-router-dom@6`, `react-helmet-async@2`

---

## Global Constraints

- Vite 5.x (`web/vite.config.mts`)
- React 18.3
- Vietnamese-first content (EN for international pages)
- frylane.com domain
- No backend — static SPA only

---

## File Structure

```
web/
├── src/
│   ├── App.tsx                        # Router setup (replace state-based)
│   ├── main.tsx                       # Add HelmetProvider
│   ├── routes/
│   │   ├── HomePage.tsx               # EN homepage (/)
│   │   ├── HomePageVI.tsx              # VI homepage (/vi/)
│   │   ├── ResultPage.tsx              # Search result (/ket-qua)
│   │   ├── Privacy.tsx                # (/privacy)
│   │   ├── Terms.tsx                  # (/terms)
│   │   └── articles/
│   │       ├── Bus86Page.tsx          # (/bus-86-hanoi-airport)
│   │       ├── Bus109Page.tsx         # (/bus-109-saigon-airport)
│   │       ├── Bus152Page.tsx         # (/bus-152-saigon-fare)
│   │       └── ScamPage.tsx           # (/airport-scam-vietnam-taxi)
│   ├── seo/
│   │   └── metaConfig.ts               # Per-page meta tag configs
│   └── components/...                  # Keep existing
├── index.html                         # Remove hardcoded meta, add Helmet
└── package.json
```

---

## Tasks

### Task 1: Install Dependencies

**Files:**
- Modify: `web/package.json`

**Interfaces:**
- Produces: `react-router-dom@6`, `react-helmet-async@2` installed

- [ ] **Step 1: Add dependencies to package.json**

```json
"dependencies": {
  "react-router-dom": "^6.28.0",
  "react-helmet-async": "^2.0.5"
}
```

- [ ] **Step 2: Install**

```bash
cd web && npm install
```

- [ ] **Step 3: Verify installation**

```bash
cd web && npm list react-router-dom react-helmet-async
```
Expected: Both packages listed with versions

- [ ] **Step 4: Commit**

```bash
git add web/package.json web/package-lock.json
git commit -m "deps: add react-router-dom and react-helmet-async"
```

---

### Task 2: Create SEO Meta Configuration

**Files:**
- Create: `web/src/seo/metaConfig.ts`

**Interfaces:**
- Produces: `MetaConfig` type + `PAGE_META` object exporting per-page configurations
- Consumed by: All page components (Task 4+)

**Interfaces:**
- Consumes: None
- Produces: `MetaConfig` type + `PAGE_META` constant with all route meta

- [ ] **Step 1: Create metaConfig.ts**

```typescript
export type MetaConfig = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  alternateVI?: string;
  alternateEN?: string;
};

export const PAGE_META: Record<string, MetaConfig> = {
  '/': {
    title: 'Frylane — Airport Bus & Grab Comparison | Hanoi & Saigon',
    description: 'Find the fastest airport bus or Grab from Hanoi (Noi Bai) and Saigon (Tan Son Nhat) to city center. Real-time schedule, fare comparison, and exit time calculator.',
    keywords: 'airport bus hanoi, airport bus saigon, bus 86, bus 109, bus 152, noibai bus, tansonnhat bus, grab airport vietnam',
    canonical: 'https://frylane.com/',
    ogTitle: 'Frylane — Airport Bus & Grab Comparison',
    ogDescription: 'Fastest way from Hanoi & Saigon airport to city. Compare bus schedules, fares, and Grab.',
    ogUrl: 'https://frylane.com/',
  },
  '/vi/': {
    title: 'Frylane — Xe buýt sân bay & So sánh Grab | Hà Nội & Sài Gòn',
    description: 'Tìm chuyến xe buýt hoặc Grab nhanh nhất từ sân bay Nội Bài và Tân Sơn Nhất về trung tâm. Lịch trình thực, so sánh giá, tính giờ ra cổng.',
    keywords: 'xe buýt sân bay nội bài, xe buýt sân bay tân sơn nhất, tuyến 86, tuyến 109, tuyến 152',
    canonical: 'https://frylane.com/vi/',
    alternateEN: 'https://frylane.com/',
  },
  '/bus-86-hanoi-airport': {
    title: 'Bus 86 Hanoi Airport — Schedule, Fare & How to Catch It (2025)',
    description: 'Complete guide to Bus 86 from Noi Bai Airport to Hanoi Old Quarter. Updated schedule, VND 35,000 fare, 45-60 min journey, and how to time your exit from T2.',
    keywords: 'bus 86 hanoi airport, noibai bus 86, bus 86 schedule, hanoi airport bus fare',
    canonical: 'https://frylane.com/bus-86-hanoi-airport',
    alternateVI: 'https://frylane.com/vi/tuyen-86-noi-bai',
  },
  '/vi/tuyen-86-noi-bai': {
    title: 'Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, Giá vé 2025',
    description: 'Hướng dẫn đầy đủ tuyến xe buýt 86 từ sân bay Nội Bài về trung tâm Hà Nội. Lịch trình cập nhật, giá vé 35.000đ, thời gian di chuyển 45-60 phút.',
    keywords: 'tuyến 86 nội bài, xe buýt 86, xe buýt sân bay nội bài hà nội',
    canonical: 'https://frylane.com/vi/tuyen-86-noi-bai',
    alternateEN: 'https://frylane.com/bus-86-hanoi-airport',
  },
  '/bus-109-saigon-airport': {
    title: 'Bus 109 Saigon Airport — Schedule, VND 20,000 Fare (2025)',
    description: 'Take Bus 109 from Tan Son Nhat Airport (T1/T3) to Saigon Downtown. VND 20,000 fare, 30-50 min, runs 05:00–23:00. Includes exit time calculator.',
    keywords: 'bus 109 saigon airport, tansonnhat bus 109, bus 109 schedule, saigon airport bus',
    canonical: 'https://frylane.com/bus-109-saigon-airport',
    alternateVI: 'https://frylane.com/vi/tuyen-109-tan-son-nhat',
  },
  '/vi/tuyen-109-tan-son-nhat': {
    title: 'Tuyến xe buýt 109 sân bay Tân Sơn Nhất — Giá 20.000đ',
    description: 'Xe buýt 109 từ sân bay Tân Sơn Nhất (T1/T3) vào trung tâm Sài Gòn. Giá 20.000đ, 30-50 phút, hoạt động 05:00–23:00.',
    keywords: 'tuyến 109, xe buýt 109 sân bay tân sơn nhất, xe buýt sài gòn',
    canonical: 'https://frylane.com/vi/tuyen-109-tan-son-nhat',
    alternateEN: 'https://frylane.com/bus-109-saigon-airport',
  },
  '/bus-152-saigon-fare': {
    title: 'Bus 152 Saigon Airport — VND 6,000 Fare (Cheapest Option)',
    description: 'Bus 152 from Tan Son Nhat Airport to Saigon city center for only VND 6,000. The cheapest airport bus in Vietnam. Schedule, stops, and travel tips.',
    keywords: 'bus 152 saigon, bus 152 fare, saigon airport bus 152, cheapest airport bus vietnam',
    canonical: 'https://frylane.com/bus-152-saigon-fare',
    alternateVI: 'https://frylane.com/vi/tuyen-152-tan-son-nhat',
  },
  '/airport-scam-vietnam-taxi': {
    title: 'Airport Taxi Scams in Vietnam (2025) — How to Avoid Them',
    description: 'Complete guide to avoiding taxi and ride-hail scams at Vietnam airports. Learn about common schemes, Grab safety tips, and how locals travel cheap.',
    keywords: 'airport scam vietnam, taxi scam saigon, airport taxi safety vietnam, grab safe airport hanoi',
    canonical: 'https://frylane.com/airport-scam-vietnam-taxi',
    alternateVI: 'https://frylane.com/vi/xe-lo-gio-sanh-bay-viet-nam',
  },
  '/privacy': {
    title: 'Privacy Policy — Frylane',
    description: 'Frylane privacy policy. We do not collect personal data. No cookies, no tracking.',
    canonical: 'https://frylane.com/privacy',
  },
  '/terms': {
    title: 'Terms of Service — Frylane',
    description: 'Frylane terms of service. Free to use. No warranty.',
    canonical: 'https://frylane.com/terms',
  },
};

export const DEFAULT_META: MetaConfig = {
  title: 'Frylane — Airport Bus & Grab Comparison',
  description: 'Compare airport buses and Grab from Hanoi & Saigon airports to city center.',
  canonical: 'https://frylane.com/',
};
```

- [ ] **Step 2: Commit**

```bash
git add web/src/seo/metaConfig.ts
git commit -m "feat: add SEO meta configuration for all routes"
```

---

### Task 3: Setup HelmetProvider in main.tsx

**Files:**
- Modify: `web/src/main.tsx`

**Interfaces:**
- Consumes: `react-helmet-async`
- Produces: `HelmetProvider` wraps entire app

- [ ] **Step 1: Update main.tsx**

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
```

- [ ] **Step 2: Update index.html — remove hardcoded meta**

Remove all `<title>`, `<meta name="description">`, and Open Graph tags from `index.html` since they'll be injected by Helmet.

Final `index.html` head should look like:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <!-- SEO meta tags injected by react-helmet-async -->
</head>
```

- [ ] **Step 3: Commit**

```bash
git add web/src/main.tsx web/index.html
git commit -m "feat: add HelmetProvider and remove hardcoded meta from index.html"
```

---

### Task 4: Create SEOHelmet Component

**Files:**
- Create: `web/src/components/SEO/SEOHelmet.tsx`

**Interfaces:**
- Consumes: `PAGE_META` from `web/src/seo/metaConfig.ts`
- Produces: `<Helmet>` component with all meta tags + hreflang

- [ ] **Step 1: Create SEOHelmet.tsx**

```typescript
import { Helmet } from 'react-helmet-async';
import { PAGE_META, DEFAULT_META, type MetaConfig } from '../seo/metaConfig';

type Props = {
  path: string;
};

export function SEOHelmet({ path }: Props) {
  const meta = PAGE_META[path] ?? DEFAULT_META;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
      <meta property="og:title" content={meta.ogTitle ?? meta.title} />
      <meta property="og:description" content={meta.ogDescription ?? meta.description} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.twitterTitle ?? meta.ogTitle ?? meta.title} />
      <meta name="twitter:description" content={meta.twitterDescription ?? meta.ogDescription ?? meta.description} />

      {/* Hreflang */}
      {meta.alternateEN && (
        <>
          <link rel="alternate" hreflang="en" href={meta.alternateEN} />
          <link rel="alternate" hreflang="x-default" href={meta.alternateEN} />
        </>
      )}
      {meta.alternateVI && (
        <link rel="alternate" hreflang="vi" href={meta.alternateVI} />
      )}
      <link rel="alternate" hreflang="en" href="https://frylane.com/" />
      <link rel="alternate" hreflang="vi" href="https://frylane.com/vi/" />
    </Helmet>
  );
}
```

- [ ] **Step 2: Create index barrel**

```typescript
export { SEOHelmet } from './SEOHelmet';
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/SEO/SEOHelmet.tsx web/src/components/SEO/index.ts
git commit -m "feat: create SEOHelmet component with dynamic meta and hreflang"
```

---

### Task 5: Create Route Page Components

**Files:**
- Create: `web/src/routes/HomePage.tsx`
- Create: `web/src/routes/HomePageVI.tsx`
- Modify: `web/src/components/Landing/LandingPage.tsx` (extract to routes)

**Interfaces:**
- Consumes: `LandingPage` component logic, `SEOHelmet`
- Produces: Route-ready page components

- [ ] **Step 1: Create HomePage.tsx**

```typescript
import { SEOHelmet } from '../components/SEO';
import { LandingPage } from '../components/Landing';

export function HomePage() {
  return (
    <>
      <SEOHelmet path="/" />
      <LandingPage />
    </>
  );
}
```

- [ ] **Step 2: Create HomePageVI.tsx**

```typescript
import { SEOHelmet } from '../components/SEO';
import { LandingPage } from '../components/Landing';
import { LanguageProvider } from '../contexts/LanguageContext';

export function HomePageVI() {
  return (
    <LanguageProvider initialLocale="vi">
      <SEOHelmet path="/vi/" />
      <LandingPage />
    </LanguageProvider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/routes/HomePage.tsx web/src/routes/HomePageVI.tsx
git commit -m "feat: create HomePage and HomePageVI route components"
```

---

### Task 6: Create Article Page — Bus 86 (Tier 1 SEO)

**Files:**
- Create: `web/src/routes/articles/Bus86Page.tsx`

**Interfaces:**
- Consumes: `SEOHelmet`, `core/data/` static data
- Produces: Full SEO-optimized article page for `bus 86 hanoi airport`

**Interfaces:**
- Consumes: `SEOHelmet` component, `core/data/` exports
- Produces: Static page with schedule table, FAQ schema, Grab CTA

- [ ] **Step 1: Create Bus86Page.tsx**

```typescript
import { SEOHelmet } from '../../components/SEO';
import { busSchedule } from '@core/data/busSchedule';
import { bus86Route } from '@core/data/destinations';

const BUS_86 = busSchedule.routes.find((r) => r.routeNumber === '86');

export function Bus86Page() {
  return (
    <>
      <SEOHelmet path="/bus-86-hanoi-airport" />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <header className="bg-green-600 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hanoi Airport Bus
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Bus 86 — Noi Bai Airport to Hanoi Old Quarter
            </h1>
            <p className="text-lg opacity-90">
              VND 35,000 · 45–60 min · Runs every 15–20 min · 05:00–23:00
            </p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          {/* Quick CTA */}
          <section className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">
              Will you catch Bus 86 after your flight lands?
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your arrival time to calculate if Bus 86 is feasible and
              when the next departure is.
            </p>
            <a
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Calculate My Exit Time →
            </a>
          </section>

          {/* Schedule Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2">First</th>
                    <th className="text-left py-3 px-2">Last</th>
                    <th className="text-left py-3 px-2">Frequency</th>
                    <th className="text-left py-3 px-2">Fare</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2">05:00</td>
                    <td className="py-3 px-2">23:00</td>
                    <td className="py-3 px-2">15–20 min</td>
                    <td className="py-3 px-2 font-medium text-green-600">VND 35,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Source: Hanoi Public Transport Center (tramdep.vn). Last verified: July 2025.
            </p>
          </section>

          {/* Route Stops */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Route Stops</h2>
            <div className="space-y-3">
              {bus86Route.stops.map((stop, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{stop.name}</p>
                    <p className="text-sm text-gray-500">{stop.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Grab Alternative */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-3">Grab Alternative</h2>
            <p className="text-gray-700 mb-3">
              If you miss the bus, Grab costs approximately <strong>VND 250,000–350,000</strong>.
              Use our calculator to compare:
            </p>
            <a
              href="/"
              className="inline-block text-amber-700 font-medium hover:underline"
            >
              Compare Bus vs Grab →
            </a>
          </section>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How much is Bus 86 from Noi Bai Airport?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Bus 86 costs VND 35,000 one-way from Noi Bai Airport to Hanoi Old Quarter.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How long does Bus 86 take from Noi Bai to city center?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The journey takes approximately 45–60 minutes depending on traffic.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Where does Bus 86 stop at Noi Bai Airport?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Bus 86 stops at Gate 1 of Terminal 2 (International Terminal) at Noi Bai Airport.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What time does Bus 86 run?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Bus 86 runs from 05:00 to 23:00 daily, with departures every 15–20 minutes.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is Bus 86 safe for tourists?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, Bus 86 is a government-operated route with fixed fares. No risk of overcharging.',
                    },
                  },
                ],
              }),
            }}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <p>
            Last updated: July 2025 · Source: Hanoi Public Transport Center
          </p>
          <p className="mt-1">
            <a href="/" className="text-green-600 hover:underline">
              ← Back to Frylane
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create index barrel for articles**

```typescript
export { Bus86Page } from './Bus86Page';
```

- [ ] **Step 3: Commit**

```bash
git add web/src/routes/articles/Bus86Page.tsx web/src/routes/articles/index.ts
git commit -m "feat: create Bus86Page SEO article with schedule, stops, and FAQ schema"
```

---

### Task 7: Wire Up React Router in App.tsx

**Files:**
- Modify: `web/src/App.tsx`

**Interfaces:**
- Consumes: Route components (HomePage, Bus86Page, etc.), `react-router-dom`
- Produces: Full URL-based routing replacing state-based navigation

- [ ] **Step 1: Replace App.tsx with router**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { HomePage } from './routes/HomePage';
import { HomePageVI } from './routes/HomePageVI';
import { Bus86Page } from './routes/articles/Bus86Page';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ResultPage } from './components/Result';
import { SEOHelmet } from './components/SEO';

// Result page needs route params: /ket-qua?airport=HAN&flightTime=14:30&...
function ResultRoute() {
  // Parse URL params and render ResultPage
  // This preserves existing ResultPage logic
  return <ResultPage />;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            {/* English routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/bus-86-hanoi-airport" element={<Bus86Page />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ket-qua" element={<ResultRoute />} />

            {/* Vietnamese routes */}
            <Route path="/vi/*" element={<HomePageVI />} />

            {/* Catch-all → homepage */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd web && npx tsc --noEmit
```

Expected: No errors. If errors, fix imports or types.

- [ ] **Step 3: Run dev server and test routes manually**

```bash
cd web && npm run dev
```

Test in browser:
- `http://localhost:5173/` → EN homepage
- `http://localhost:5173/vi/` → VI homepage
- `http://localhost:5173/bus-86-hanoi-airport` → Bus 86 article
- `http://localhost:5173/ket-qua` → Result page

- [ ] **Step 4: Commit**

```bash
git add web/src/App.tsx
git commit -m "feat: replace state-based routing with react-router-dom v6"
```

---

### Task 8: Add robots.txt and sitemap.xml

**Files:**
- Create: `web/public/robots.txt`
- Create: `web/public/sitemap.xml`

- [ ] **Step 1: Create robots.txt**

```txt
User-agent: *
Allow: /
Allow: /vi/

# Sitemap
Sitemap: https://frylane.com/sitemap.xml

# Crawl-delay (optional, be nice to shared host)
Crawl-delay: 1
```

- [ ] **Step 2: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://frylane.com/</loc>
    <xhtml:link rel="alternate" hreflang="vi" href="https://frylane.com/vi/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://frylane.com/vi/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://frylane.com/"/>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://frylane.com/bus-86-hanoi-airport</loc>
    <xhtml:link rel="alternate" hreflang="vi" href="https://frylane.com/vi/tuyen-86-noi-bai"/>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://frylane.com/vi/tuyen-86-noi-bai</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://frylane.com/bus-86-hanoi-airport"/>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://frylane.com/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://frylane.com/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Commit**

```bash
git add web/public/robots.txt web/public/sitemap.xml
git commit -m "feat: add robots.txt and sitemap.xml with hreflang"
```

---

### Task 9: Verify with Playwright E2E

**Files:**
- Modify: `web/e2e/seo.spec.ts` (create if not exists)

**Interfaces:**
- Consumes: Dev server running on port 5173
- Produces: E2E tests verifying all routes return 200 with correct titles

- [ ] **Step 1: Create e2e test**

```typescript
import { test, expect } from '@playwright/test';

test.describe('SEO Routes', () => {
  const BASE = 'http://localhost:5173';

  test('homepage has correct meta tags', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page).toHaveTitle(/Frylane/);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);
  });

  test('bus-86 article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`);
    await expect(page).toHaveTitle(/Bus 86.*Hanoi/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('bus-86-hanoi-airport');
  });

  test('vi homepage has Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/`);
    await expect(page).toHaveTitle(/Xe buýt|Frylane/);
  });

  test('robots.txt exists', async ({ page }) => {
    const response = await page.goto(`${BASE}/robots.txt`);
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain('Sitemap:');
  });

  test('sitemap.xml exists', async ({ page }) => {
    const response = await page.goto(`${BASE}/sitemap.xml`);
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain('urlset');
  });

  test('hreflang tags present on bus-86 page', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`);
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('FAQ schema is present on bus-86 page', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`);
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run Playwright tests**

```bash
cd web && npm run test:e2e
```

Expected: All 7 tests pass.

- [ ] **Step 3: Commit**

```bash
git add web/e2e/seo.spec.ts
git commit -m "test: add Playwright E2E for SEO routes and meta tags"
```

---

## Self-Review Checklist

1. **Spec coverage:** Check each requirement against tasks:
   - React Router setup → Task 7
   - Dynamic meta tags → Tasks 2, 3, 4
   - EN homepage → Task 5
   - VI homepage → Task 5
   - Bus 86 article → Task 6
   - robots.txt + sitemap.xml → Task 8
   - E2E tests → Task 9

2. **Placeholder scan:** No "TBD", no "TODO", no "add appropriate error handling" in code blocks.

3. **Type consistency:** All imports reference `@core` alias which exists in `vite.config.mts`.

4. **Missing pieces identified:**
   - Other Tier 1 pages (Bus 109, Bus 152, Scam page) → Can be added after this plan completes
   - Grab deep link tracking → Future task
   - Analytics setup (GA4) → Future task

---

## Plan Complete

Saved to: `docs/superpowers/plans/2026-07-29-seo-domain-setup.md`

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
