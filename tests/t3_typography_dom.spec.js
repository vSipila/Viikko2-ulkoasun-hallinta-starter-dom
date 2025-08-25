import { test, expect } from '@playwright/test';

test('T3: body line-height >= 1.4 (unitless tai px ok)', async ({ page }) => {
  await page.goto('/');
  const ratio = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    const fs = parseFloat(cs.fontSize || '16');
    const raw = cs.lineHeight;
    if (!raw) return 0;
    if (raw === 'normal') return 1.2;
    if (raw.endsWith('px')) return parseFloat(raw) / fs;
    const n = parseFloat(raw);
    return isNaN(n) ? 0 : n;
  });
  expect(ratio).toBeGreaterThanOrEqual(1.4);
});
