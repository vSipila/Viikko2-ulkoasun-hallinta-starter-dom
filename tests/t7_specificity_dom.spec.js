import { test, expect } from '@playwright/test';

function rgbTuple(s) {
  const m = s && s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
}

test('T7: .title.strong yliajaa .title (eri väri, computed)', async ({ page }) => {
  await page.goto('/');
  const c1 = await page.locator('.title').first().evaluate(el => getComputedStyle(el).color);
  const c2 = await page.locator('.title.strong').first().evaluate(el => getComputedStyle(el).color);
  const a = rgbTuple(c1);
  const b = rgbTuple(c2);
  expect(a).not.toBeNull();
  expect(b).not.toBeNull();
  expect(a.join(',')).not.toBe(b.join(','));
});
