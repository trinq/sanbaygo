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
});
