import { test, expect } from '@playwright/test';

// Run with: npx playwright test seo.spec.ts --project=chromium
// (firefox/webkit not yet verified against dev server in CI)

test.describe('SEO Routes', () => {
  const BASE = 'http://localhost:5173';

  test('homepage has correct meta tags', async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Frylane/);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);
  });

  test('bus-86 article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Bus 86.*Hanoi/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('bus-86-hanoi-airport');
  });

  test('vi homepage has Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/`, { waitUntil: 'networkidle' });
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

  test('sitemap.xml contains all article pages', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    const urls = [
      'bus-109-saigon-airport',
      'bus-152-saigon-fare',
      'airport-scam-vietnam-taxi',
      'vi/tuyen-109-tan-son-nhat',
      'vi/tuyen-152-tan-son-nhat',
      'vi/xe-lo-gio-sanh-bay-viet-nam',
    ];
    for (const url of urls) {
      expect(content).toContain(url);
    }
  });

  test('hreflang tags present on bus-86 page', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('FAQ schema is present on bus-86 page', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });

  // ── Missing routes (App.tsx wiring) ──────────────────────────────────

  test('bus-109 article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-saigon-airport`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Bus 109.*Saigon/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('bus-109-saigon-airport');
  });

  test('bus-152 article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/bus-152-saigon-fare`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Bus 152.*Saigon/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('bus-152-saigon-fare');
  });

  test('VI bus-109 page loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-109-tan-son-nhat`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Tuyến.*109/i);
  });

  test('VI bus-152 page loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Tuyến.*152/i);
  });

  test('scam article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/airport-scam-vietnam-taxi`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Scam/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('airport-scam-vietnam-taxi');
  });

  test('VI scam page loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-lo-gio-sanh-bay-viet-nam`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/xe lừa|lừa đảo|Scam/i);
  });

  test('bus-109 has FAQ schema', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-saigon-airport`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });

  test('bus-152 has FAQ schema', async ({ page }) => {
    await page.goto(`${BASE}/bus-152-saigon-fare`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });

  test('bus-109 has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-saigon-airport`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('bus-152 has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/bus-152-saigon-fare`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  // ── Bus 109 vs 152 comparison article ─────────────────────────────────────

  test('bus-109-vs-152 article page loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Bus 109 vs 152/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('bus-109-vs-152-tan-son-nhat');
  });

  test('bus-109-vs-152 has FAQ schema', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('bus-109-vs-152 has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('vi bus-109-vs-152 article page loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-buyt-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/109.*152/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('xe-buyt-109-vs-152-tan-son-nhat');
  });

  test('vi bus-109-vs-152 has FAQ schema', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-buyt-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('vi bus-109-vs-152 has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-buyt-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN bus-109-vs-152 page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/xe-buyt-109-vs-152-tan-son-nhat"]');
    await expect(viLink).toBeVisible();
  });

  test('VI bus-109-vs-152 page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-buyt-109-vs-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/bus-109-vs-152-tan-son-nhat"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains bus-109-vs-152 routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('bus-109-vs-152-tan-son-nhat');
    expect(content).toContain('xe-buyt-109-vs-152-tan-son-nhat');
  });

  // ── ArticleNav language switcher ─────────────────────────────────────────

  test('EN bus-86 page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/bus-86-hanoi-airport`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/tuyen-86-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('EN bus-109 page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/bus-109-saigon-airport`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/tuyen-109-tan-son-nhat"]');
    await expect(viLink).toBeVisible();
  });

  test('EN bus-152 page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/bus-152-saigon-fare`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/tuyen-152-tan-son-nhat"]');
    await expect(viLink).toBeVisible();
  });

  test('EN scam page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/airport-scam-vietnam-taxi`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/xe-lo-gio-sanh-bay-viet-nam"]');
    await expect(viLink).toBeVisible();
  });

  // ── Grab vs Bus Hanoi (kw-7-grab-vs-bus-han) ────────────────────────────

  test('grab vs bus hanoi article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/grab-vs-bus-hanoi-airport`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Grab vs Bus 86.*Hanoi Airport.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('grab-vs-bus-hanoi-airport');
  });

  test('grab vs bus hanoi article has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/grab-vs-bus-hanoi-airport`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('grab vs bus hanoi article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/grab-vs-bus-hanoi-airport`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('grab vs bus hanoi has internal links', async ({ page }) => {
    await page.goto(`${BASE}/grab-vs-bus-hanoi-airport`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    // Expect at least 2 internal links to existing articles
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI grab vs bus hanoi article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/grab-vs-xe-buyt-noi-bai`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Grab.*Bus|xe buýt.*Grab|Grab.*xe buýt/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('grab-vs-xe-buyt-noi-bai');
  });

  test('VI grab vs bus hanoi article has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/grab-vs-xe-buyt-noi-bai`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('VI grab vs bus hanoi article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/grab-vs-xe-buyt-noi-bai`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN grab vs bus hanoi page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/grab-vs-bus-hanoi-airport`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/grab-vs-xe-buyt-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('VI grab vs bus hanoi page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/grab-vs-xe-buyt-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/grab-vs-bus-hanoi-airport"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains grab vs bus hanoi routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('grab-vs-bus-hanoi-airport');
    expect(content).toContain('grab-vs-xe-buyt-noi-bai');
  });

  // ── Late night bus article (kw-18-8pm-arrival) ──────────────────────────────────

  test('late night bus article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-bus`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/8 PM.*Hanoi Airport.*Bus Still Running.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('hanoi-airport-late-night-bus');
  });

  test('late night bus has FAQ schema with 5 questions', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-bus`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });

  test('VI bus-109 page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-109-tan-son-nhat`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/bus-109-saigon-airport"]');
    await expect(enLink).toBeVisible();
  });

  test('VI bus-152 page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-152-tan-son-nhat`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/bus-152-saigon-fare"]');
    await expect(enLink).toBeVisible();
  });

  test('VI bus-86 page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-86-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/bus-86-hanoi-airport"]');
    await expect(enLink).toBeVisible();
  });

  test('VI scam page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-lo-gio-sanh-bay-viet-nam`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/airport-scam-vietnam-taxi"]');
    await expect(enLink).toBeVisible();
  });

  // ── Exit time article (kw-17-t2-exit-time) ─────────────────────────────────

  test('exit time article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/noibai-t2-exit-time`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Noi Bai T2.*2026/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('noibai-t2-exit-time');
  });

  test('exit time article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/noibai-t2-exit-time`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('exit time article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/noibai-t2-exit-time`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('exit time article has interactive calculator', async ({ page }) => {
    await page.goto(`${BASE}/noibai-t2-exit-time`, { waitUntil: 'networkidle' });
    // Calculator must render with at least one interactive input
    const calculator = page.locator('[data-testid="exit-time-calculator"]');
    await expect(calculator).toBeVisible();
    // Check for terminal selector (label in English version)
    const terminalLabel = page.locator('legend', { hasText: 'Terminal' });
    await expect(terminalLabel).toBeVisible();
  });

  test('VI exit time article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/thoi-gian-ra-cuong-t2-noi-bai`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Thời gian.*T2.*Nội Bài/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('thoi-gian-ra-cuong-t2-noi-bai');
  });

  test('VI exit time article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/thoi-gian-ra-cuong-t2-noi-bai`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('VI exit time article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/thoi-gian-ra-cuong-t2-noi-bai`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN exit time page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/noibai-t2-exit-time`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/thoi-gian-ra-cuong-t2-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('VI exit time page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/thoi-gian-ra-cuong-t2-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/noibai-t2-exit-time"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains exit time routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('noibai-t2-exit-time');
    expect(content).toContain('thoi-gian-ra-cuong-t2-noi-bai');
  });

  test('article pages do NOT have toggle button (EN/VN)', async ({ page }) => {
    const articlePages = [
      '/bus-86-hanoi-airport',
      '/bus-109-saigon-airport',
      '/bus-152-saigon-fare',
      '/bus-109-vs-152-tan-son-nhat',
      '/airport-scam-vietnam-taxi',
      '/vi/tuyen-109-tan-son-nhat',
      '/vi/tuyen-152-tan-son-nhat',
      '/vi/tuyen-86-noi-bai',
      '/vi/xe-buyt-109-vs-152-tan-son-nhat',
      '/vi/xe-lo-gio-sanh-bay-viet-nam',
      '/noibai-airport-first-time-guide',
      '/vi/noi-bai-lan-dau-di',
    ];
    for (const path of articlePages) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      const toggle = page.locator('nav button[aria-label="Toggle language"]');
      await expect(toggle).toHaveCount(0, { message: `${path} should not have toggle button` });
    }
  });

  // ── Luggage fee article (kw-16-luggage-fee) ───────────────────────────────

  test('luggage fee article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/airport-bus-luggage-fee-vietnam`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Vietnam Airport Bus Luggage Fees.*Bus 86.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('airport-bus-luggage-fee-vietnam');
  });

  test('luggage fee article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/airport-bus-luggage-fee-vietnam`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('luggage fee article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/airport-bus-luggage-fee-vietnam`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN luggage fee page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/airport-bus-luggage-fee-vietnam`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/phi-hanh-ly-xe-buyt-san-bay"]');
    await expect(viLink).toBeVisible();
  });

  test('VI luggage fee article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/phi-hanh-ly-xe-buyt-san-bay`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Phi hành lý|Xe buýt sân bay/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('phi-hanh-ly-xe-buyt-san-bay');
  });

  test('VI luggage fee article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/phi-hanh-ly-xe-buyt-san-bay`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('VI luggage fee article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/phi-hanh-ly-xe-buyt-san-bay`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('VI luggage fee page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/phi-hanh-ly-xe-buyt-san-bay`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/airport-bus-luggage-fee-vietnam"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains luggage fee routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('airport-bus-luggage-fee-vietnam');
    expect(content).toContain('phi-hanh-ly-xe-buyt-san-bay');
  });

  // ── Grab safe Reddit trust article (kw-14-grab-safe-reddit) ────────────────

  test('grab safe article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/is-grab-safe-hanoi-airport`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Is Grab Safe at Hanoi Airport\?.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('is-grab-safe-hanoi-airport');
  });

  test('grab safe article has FAQ schema with 5 questions', async ({ page }) => {
    await page.goto(`${BASE}/is-grab-safe-hanoi-airport`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(5);
  });

  test('grab safe article has internal links', async ({ page }) => {
    await page.goto(`${BASE}/is-grab-safe-hanoi-airport`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href*="bus-86"]').count();
    expect(links).toBeGreaterThan(0);
  });

  // ── kw-5-cheapest-han: cheapest way from Hanoi Airport (2026) ──────────────

  test('cheapest way hanoi airport loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-hanoi-airport`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Hanoi Airport: Bus vs Grab.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('cheapest-way-hanoi-airport');
  });

  test('cheapest way hanoi airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-hanoi-airport`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('cheapest way hanoi airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-hanoi-airport`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('cheapest way hanoi airport has internal links', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-hanoi-airport`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI cheapest way hanoi airport loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Cách rẻ|Sân bay Nội Bài/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('cach-re-nhat-san-bay-noi-bai');
  });

  test('VI cheapest way hanoi airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('VI cheapest way hanoi airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN cheapest way hanoi airport page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-hanoi-airport`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/cach-re-nhat-san-bay-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('VI cheapest way hanoi airport page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/cheapest-way-hanoi-airport"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains cheapest way hanoi airport routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('cheapest-way-hanoi-airport');
    expect(content).toContain('cach-re-nhat-san-bay-noi-bai');
  });

  // ── kw-6-cheapest-sgn: cheapest way from Saigon Airport to District 1 ─────

  test('cheapest way saigon airport to district 1 loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-saigon-airport-district-1`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Saigon Airport to District 1.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('cheapest-way-saigon-airport-district-1');
  });

  test('cheapest way saigon airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-saigon-airport-district-1`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('cheapest way saigon airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-saigon-airport-district-1`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('cheapest way saigon airport has internal links', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-saigon-airport-district-1`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI cheapest way saigon airport loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-sai-gon`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Cách rẻ|Sân bay Sài Gòn|Tân Sơn Nhất/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('cach-re-nhat-san-bay-sai-gon');
  });

  test('VI cheapest way saigon airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-sai-gon`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('VI cheapest way saigon airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-sai-gon`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN cheapest way saigon airport page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/cheapest-way-saigon-airport-district-1`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/cach-re-nhat-san-bay-sai-gon"]');
    await expect(viLink).toBeVisible();
  });

  test('VI cheapest way saigon airport page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-re-nhat-san-bay-sai-gon`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/cheapest-way-saigon-airport-district-1"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains cheapest way saigon airport routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('cheapest-way-saigon-airport-district-1');
    expect(content).toContain('cach-re-nhat-san-bay-sai-gon');
  });

  // ── Article vs Homepage fallback ─────────────────────────────────────────

  test('/vi/tuyen-86-noi-bai renders dedicated article, not homepage', async ({ page }) => {
    await page.goto(`${BASE}/vi/tuyen-86-noi-bai`, { waitUntil: 'networkidle' });
    const h1 = await page.locator('h1').first().textContent();
    expect(h1).not.toBeNull();
    // Article hero H1 — either English "Bus 86" or Vietnamese "Tuyến ... 86"
    expect(h1).toMatch(/Bus 86|Tuyến.*86|sân bay Nội Bài/i);
    // The homepage's calculator form (arrivalTime input with this exact label)
    // must not be the primary content
    const arrivalLabel = await page.locator('label:has-text("Arrival time")').count();
    expect(arrivalLabel).toBe(0);
  });

  // ── kw-12-han-hoan-kiem: Hanoi Airport to Hoan Kiem Lake ─────────────────

  test('hoan kiem article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-to-hoan-kiem-lake`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Hoan Kiem.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('hanoi-airport-to-hoan-kiem-lake');
  });

  test('hoan kiem article has FAQ schema with 6 questions', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-to-hoan-kiem-lake`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('hoan kiem article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-to-hoan-kiem-lake`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('hoan kiem article has internal links', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-to-hoan-kiem-lake`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI hoan kiem article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/san-bay-noi-bai-den-ho-hoan-kiem`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Hoàn Kiếm|Sân bay Nội Bài/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('san-bay-noi-bai-den-ho-hoan-kiem');
  });

  test('VI hoan kiem article has FAQ schema with 6 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/san-bay-noi-bai-den-ho-hoan-kiem`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('VI hoan kiem article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/san-bay-noi-bai-den-ho-hoan-kiem`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN hoan kiem page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-to-hoan-kiem-lake`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/san-bay-noi-bai-den-ho-hoan-kiem"]');
    await expect(viLink).toBeVisible();
  });

  test('VI hoan kiem page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/san-bay-noi-bai-den-ho-hoan-kiem`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/hanoi-airport-to-hoan-kiem-lake"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains hoan kiem routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('hanoi-airport-to-hoan-kiem-lake');
    expect(content).toContain('san-bay-noi-bai-den-ho-hoan-kiem');
  });

  // ── kw-15-late-night-han: Late Night Hanoi Airport Transfer (22:00–05:00) ──

  test('late night hanoi transfer article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-transfer`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Hanoi Airport Late Night.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('hanoi-airport-late-night-transfer');
  });

  test('late night hanoi transfer has FAQ schema with 6 questions', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-transfer`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('late night hanoi transfer has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-transfer`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('late night hanoi transfer has internal links', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-transfer`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI late night hanoi transfer article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/di-chuyen-dem-khuya-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/di chuyển|Mới Bài|khuya/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('di-chuyen-dem-khuya-san-bay-noi-bai');
  });

  test('VI late night hanoi transfer has FAQ schema with 6 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/di-chuyen-dem-khuya-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(6);
  });

  test('VI late night hanoi transfer has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/di-chuyen-dem-khuya-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN late night hanoi transfer page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/hanoi-airport-late-night-transfer`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/di-chuyen-dem-khuya-san-bay-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('VI late night hanoi transfer page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/di-chuyen-dem-khuya-san-bay-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/hanoi-airport-late-night-transfer"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains late night hanoi transfer routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('hanoi-airport-late-night-transfer');
    expect(content).toContain('di-chuyen-dem-khuya-san-bay-noi-bai');
  });

  // ── kw-19-noibai-first-time: First time at Noi Bai Airport ──────────────────

  test('noibai first time article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/noibai-airport-first-time-guide`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/First Time at Noi Bai Airport.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('noibai-airport-first-time-guide');
  });

  test('noibai first time article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/noibai-airport-first-time-guide`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('noibai first time article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/noibai-airport-first-time-guide`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('noibai first time article has internal links', async ({ page }) => {
    await page.goto(`${BASE}/noibai-airport-first-time-guide`, { waitUntil: 'networkidle' });
    const links = await page.locator('a[href^="/"]').all();
    const internalLinks = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        internalLinks.push(href);
      }
    }
    expect(internalLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('VI noibai first time article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/noi-bai-lan-dau-di`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Nội Bài|lần đầu|sân bay/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('noi-bai-lan-dau-di');
  });

  test('VI noibai first time article has FAQ schema with 8 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/noi-bai-lan-dau-di`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(8);
  });

  test('VI noibai first time article has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/noi-bai-lan-dau-di`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN noibai first time page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/noibai-airport-first-time-guide`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/noi-bai-lan-dau-di"]');
    await expect(viLink).toBeVisible();
  });

  test('VI noibai first time page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/noi-bai-lan-dau-di`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/noibai-airport-first-time-guide"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains noibai first time routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('noibai-airport-first-time-guide');
    expect(content).toContain('noi-bai-lan-dau-di');
  });

  // ── kw-11-how-to-get-han: How to Get from Hanoi Airport to City Center ─────

  test('how to get hanoi airport article loads with correct title', async ({ page }) => {
    await page.goto(`${BASE}/how-to-get-from-hanoi-airport-to-city`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/How to Get from Hanoi Airport to City.*2026/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('how-to-get-from-hanoi-airport-to-city');
  });

  test('how to get hanoi airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/how-to-get-from-hanoi-airport-to-city`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('how to get hanoi airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/how-to-get-from-hanoi-airport-to-city`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('how to get hanoi airport is hub page with links to child articles', async ({ page }) => {
    await page.goto(`${BASE}/how-to-get-from-hanoi-airport-to-city`, { waitUntil: 'networkidle' });
    const childLinks = [
      '/bus-86-hanoi-airport',
      '/grab-vs-bus-hanoi-airport',
      '/cheapest-way-hanoi-airport',
      '/hanoi-airport-to-hoan-kiem-lake',
    ];
    for (const childPath of childLinks) {
      const link = page.locator(`a[href="${childPath}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test('VI how to get hanoi airport article loads with Vietnamese title', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-di-tu-sanh-bay-noi-bai`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Cách đi|Sân bay Nội Bài/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('cach-di-tu-sanh-bay-noi-bai');
  });

  test('VI how to get hanoi airport has FAQ schema with 7 questions', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-di-tu-sanh-bay-noi-bai`, { waitUntil: 'networkidle' });
    const faqSchema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(faqSchema ?? '{}');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(7);
  });

  test('VI how to get hanoi airport has hreflang tags', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-di-tu-sanh-bay-noi-bai`, { waitUntil: 'networkidle' });
    const hreflangEN = await page.locator('link[hreflang="en"]').count();
    const hreflangVI = await page.locator('link[hreflang="vi"]').count();
    expect(hreflangEN).toBeGreaterThan(0);
    expect(hreflangVI).toBeGreaterThan(0);
  });

  test('EN how to get hanoi airport page has link to VI counterpart', async ({ page }) => {
    await page.goto(`${BASE}/how-to-get-from-hanoi-airport-to-city`, { waitUntil: 'networkidle' });
    const viLink = page.locator('nav a[href="/vi/cach-di-tu-sanh-bay-noi-bai"]');
    await expect(viLink).toBeVisible();
  });

  test('VI how to get hanoi airport page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/cach-di-tu-sanh-bay-noi-bai`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/how-to-get-from-hanoi-airport-to-city"]');
    await expect(enLink).toBeVisible();
  });

  test('sitemap.xml contains how to get hanoi airport routes', async ({ page }) => {
    await page.goto(`${BASE}/sitemap.xml`);
    const content = await page.content();
    expect(content).toContain('how-to-get-from-hanoi-airport-to-city');
    expect(content).toContain('cach-di-tu-sanh-bay-noi-bai');
  });
});
