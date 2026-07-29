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
});
