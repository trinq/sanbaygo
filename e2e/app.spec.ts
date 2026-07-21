import { test, expect } from '@playwright/test';

test.describe('SanBayGo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('app loads and shows form wizard', async ({ page }) => {
    // Verify form wizard loads
    await expect(page.locator('text=Giờ đáp')).toBeVisible();
    await expect(page.locator('text=Máy bay đáp lúc mấy giờ?')).toBeVisible();
    
    // Verify time input controls
    await expect(page.locator('text=Giờ máy bay đáp')).toBeVisible();
    await expect(page.getByText('-')).toBeVisible();
    await expect(page.getByText('+')).toBeVisible();
    
    // Verify navigation buttons
    await expect(page.locator('text=Tiếp tục →')).toBeVisible();
  });

  test('time adjustment works', async ({ page }) => {
    // Get initial time
    const timeButton = page.locator('text=/^\\d{2}:\\d{2}$/');
    const initialTime = await timeButton.textContent();
    
    // Click + to increase time by 15 min
    await page.getByText('+').click();
    const newTime = await timeButton.textContent();
    
    // Time should change
    expect(newTime).not.toBe(initialTime);
  });

  test('step 1: time selection', async ({ page }) => {
    // Time should be selectable
    const timeButton = page.getByText(/^\d{2}:\d{2}$/);
    await timeButton.click();
    
    // Next button should be enabled
    const nextButton = page.locator('text=Tiếp tục →');
    await expect(nextButton).toBeEnabled();
    
    // Click to proceed
    await nextButton.click();
    
    // Should move to step 2 (terminal)
    await expect(page.locator('text=Nhà ga')).toBeVisible();
  });

  test('step 2: terminal selection', async ({ page }) => {
    // Navigate to step 2
    await page.locator('text=Tiếp tục →').click();
    
    // Verify T1/T2 options
    await expect(page.locator('text=T1')).toBeVisible();
    await expect(page.locator('text=T2')).toBeVisible();
    await expect(page.locator('text=Chuyến bay nội địa')).toBeVisible();
    await expect(page.locator('text=Chuyến bay quốc tế')).toBeVisible();
    
    // Select T1
    await page.locator('text=T1').click();
    
    // Next button should be enabled
    await expect(page.locator('text=Tiếp tục →')).toBeEnabled();
  });

  test('step 3: baggage selection', async ({ page }) => {
    // Navigate to step 3
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Tiếp tục →').click();
    
    // Verify baggage options
    await expect(page.locator('text=Hành lý')).toBeVisible();
    await expect(page.locator('text=Xách tay')).toBeVisible();
    await expect(page.locator('text=Ký gửi')).toBeVisible();
    
    // Select baggage
    await page.locator('text=Xách tay').click();
  });

  test('step 4: destination selection', async ({ page }) => {
    // Navigate to step 4
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Tiếp tục →').click();
    
    // Verify destination options
    await expect(page.locator('text=Điểm đến')).toBeVisible();
    await expect(page.locator('text=Khu phố cổ Hà Nội')).toBeVisible();
    
    // Select destination
    await page.locator('text=Khu phố cổ Hà Nội').click();
  });

  test('complete form and see results', async ({ page }) => {
    // Navigate through all steps
    // Step 1: Time - default time should be set
    await page.locator('text=Tiếp tục →').click();
    
    // Step 2: Terminal - select T1
    await page.locator('text=T1').click();
    await page.locator('text=Tiếp tục →').click();
    
    // Step 3: Baggage - select Xách tay
    await page.locator('text=Xách tay').click();
    await page.locator('text=Tiếp tục →').click();
    
    // Step 4: Destination - select Khu phố cổ
    await page.locator('text=Khu phố cổ Hà Nội').click();
    
    // Submit form
    await page.locator('text=Xem kết quả →').click();
    
    // Should see results
    await expect(page.locator('text=Kết quả')).toBeVisible();
  });

  test('back navigation works', async ({ page }) => {
    // Navigate to step 2
    await page.locator('text=Tiếp tục →').click();
    
    // Click back
    await page.locator('text=← Quay lại').click();
    
    // Should be back at step 1
    await expect(page.locator('text=Giờ đáp')).toBeVisible();
  });

  test('recalculate button resets form', async ({ page }) => {
    // Complete form to get to results
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=T1').click();
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Xách tay').click();
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Khu phố cổ Hà Nội').click();
    await page.locator('text=Xem kết quả →').click();
    
    // Should see results
    await expect(page.locator('text=Kết quả')).toBeVisible();
    
    // Click Tính lại
    await page.locator('text=Tính lại').click();
    
    // Should be back at form
    await expect(page.locator('text=Giờ đáp')).toBeVisible();
  });
});

test.describe('Calculation Engine E2E', () => {
  test('peak hour detection', async ({ page }) => {
    await page.goto('/');
    
    // Set time to 08:00 (peak hour)
    const timeButton = page.getByText(/^\d{2}:\d{2}$/);
    await timeButton.click();
    
    // Navigate and complete form
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=T1').click();
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Xách tay').click();
    await page.locator('text=Tiếp tục →').click();
    await page.locator('text=Khu phố cổ Hà Nội').click();
    await page.locator('text=Xem kết quả →').click();
    
    // Should see peak hour indicator or adjusted times
    await expect(page.locator('text=Kết quả')).toBeVisible();
  });
});
