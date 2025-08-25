import { test, expect } from '@playwright/test';

test('T6: .box — padding, border ja margin kaikki > 0 (computed)', async ({ page }) => {
  await page.goto('/');
  const sums = await page.evaluate(() => {
    const el = document.querySelector('.box');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const px = v => parseFloat(v || '0');
    return {
      padding: px(cs.paddingTop) + px(cs.paddingRight) + px(cs.paddingBottom) + px(cs.paddingLeft),
      border: px(cs.borderTopWidth) + px(cs.borderRightWidth) + px(cs.borderBottomWidth) + px(cs.borderLeftWidth),
      margin: px(cs.marginTop) + px(cs.marginRight) + px(cs.marginBottom) + px(cs.marginLeft),
    };
  });
  expect(sums).not.toBeNull();
  expect(sums.padding).toBeGreaterThan(0);
  expect(sums.border).toBeGreaterThan(0);
  expect(sums.margin).toBeGreaterThan(0);
});
