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

    test('fills the form, sees comparison, sees detail', async ({ page }) => {
      await page.goto('/');

      // Terminal: chip buttons with text "Nội Bài · T1" / "Nội Bài · T2"
      // Use regex that matches either language (Vietnamese default; English if user toggled)
      await page.getByRole('button', { name: /Nội Bài · T1|Noi Bai · T1|T1/i }).first().click();

      // Destination: <select> with option values "old-quarter" / "ba-dinh" / "tay-ho"
      await page.locator('select').first().selectOption({ value: 'old-quarter' });

      // Baggage: <select> with option values "carry_on" / "checked"
      await page.locator('select').nth(1).selectOption({ value: 'carry_on' });

      // Calculate: "Tìm phương tiện phù hợp →" / "Find a ride →"
      await page.getByRole('button', { name: /Tìm phương tiện|Find a ride/i }).click();

      // Result display: shows all 3 transport option families
      // Use .first() because Sidebar (desktop only) also contains "Bus 86",
      // and Grab/Be/Xanh SM cards all match "/Grab/i" / "/Taxi/i".
      await expect(page.getByText(/Xe buýt 86|Bus 86/i).first()).toBeVisible();
      await expect(page.getByText(/Taxi/i).first()).toBeVisible();
      await expect(page.getByText(/Grab/i).first()).toBeVisible();
    });
  });
}
