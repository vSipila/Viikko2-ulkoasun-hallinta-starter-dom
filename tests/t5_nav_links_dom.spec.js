import { test, expect } from '@playwright/test';

test('T5: navissa vähintään 2 linkkiä (a[href])', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href]')).toHaveCount(2);
});
