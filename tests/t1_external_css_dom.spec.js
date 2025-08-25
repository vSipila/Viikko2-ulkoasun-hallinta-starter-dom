import { test, expect } from '@playwright/test';

test('T1 (0p): ulkoinen CSS linkitetty, ei <style>-elementtejä tai inline-tyylejä', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('head link[rel="stylesheet"][href="styles.css"]')).toHaveCount(1);
  await expect(page.locator('style')).toHaveCount(0);
  const inlineCount = await page.locator('[style]').count();
  expect(inlineCount).toBe(0);
});
