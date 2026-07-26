import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 900, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test(`landing flow @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    // Hero renders — headline contains "nhanh nhất" (was "Cách nhanh nhất từ sân bay...")
    // The string also appears in the "Nhanh nhất" benefit chip, so use .first() to disambiguate.
    await expect(page.getByText(/nhanh nhất/i).first()).toBeVisible();

    // CTA disabled until fields are filled
    const cta = page.getByRole('button', { name: /Tìm phương tiện/i });
    await expect(cta).toBeDisabled();

    // Open departure dropdown and select NoiBai
    // The dropdown button shows "Chọn sân bay" placeholder; the option label is "Sân bay Nội Bài"
    await page.getByRole('button', { name: /Sân bay khởi hành|Chọn sân bay/i }).click();
    await page.getByRole('option', { name: /Sân bay Nội Bài/i }).click();

    // Pick the "Phố Cổ" destination chip.
    // The chip text is "Khu phố cổ" / "Old Quarter" — both contain "Phố Cổ" / "Old Quarter" case-insensitively.
    await page.getByRole('button', { name: /Phố Cổ|Old Quarter/i }).first().click();

    // CTA enabled now
    await expect(cta).toBeEnabled();

    // Submit
    await cta.click();

    // ResultDisplay renders — headline OR ride-hail footnote contains "Grab" / "Chuyến buýt"
    await expect(page.getByText(/Grab|Chuyến buýt/i).first()).toBeVisible();
  });
}
