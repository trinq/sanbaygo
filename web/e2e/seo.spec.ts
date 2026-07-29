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

  test('VI scam page has link to EN counterpart', async ({ page }) => {
    await page.goto(`${BASE}/vi/xe-lo-gio-sanh-bay-viet-nam`, { waitUntil: 'networkidle' });
    const enLink = page.locator('nav a[href="/airport-scam-vietnam-taxi"]');
    await expect(enLink).toBeVisible();
  });

  test('article pages do NOT have toggle button (EN/VN)', async ({ page }) => {
    const articlePages = [
      '/bus-86-hanoi-airport',
      '/bus-109-saigon-airport',
      '/bus-152-saigon-fare',
      '/airport-scam-vietnam-taxi',
      '/vi/tuyen-109-tan-son-nhat',
      '/vi/tuyen-152-tan-son-nhat',
      '/vi/xe-lo-gio-sanh-bay-viet-nam',
    ];
    for (const path of articlePages) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      const toggle = page.locator('nav button[aria-label="Toggle language"]');
      await expect(toggle).toHaveCount(0, { message: `${path} should not have toggle button` });
    }
  });
});
