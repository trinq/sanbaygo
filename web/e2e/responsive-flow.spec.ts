import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 900, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
] as const;

for (const vp of VIEWPORTS) {
  test.describe(`responsive flow @ ${vp.name} (${vp.width}px)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    test('fills the form, sees the timetable spine, sees the ride-hail footnote', async ({ page }) => {
      await page.goto('/');

      // Terminal: tag button "Nội Bài · T1" / "Nội Bài · T2"
      await page.getByRole('button', { name: /Nội Bài · T1|Noi Bai · T1/i }).first().click();

      // Destination: tag button "Phố Cổ" / "Old Quarter"
      await page.getByRole('button', { name: /Phố Cổ|Old Quarter/i }).first().click();

      // Baggage: tag button "Xách tay" / "Carry-on"
      await page.getByRole('button', { name: /Xách tay|Carry-on/i }).first().click();

      // Calculate: "Xem các chuyến buýt kế tiếp" / "Find a ride"
      await page.getByRole('button', { name: /Xem các chuyến buýt|Find a ride/i }).click();

      // Result display: the spine list should have 26 departures, and the
      // ride-hail footnote should be visible.
      const departures = await page.locator('ol li').count();
      expect(departures).toBe(26);
      await expect(page.getByText(/Grab/i).first()).toBeVisible();
    });
  });
}
