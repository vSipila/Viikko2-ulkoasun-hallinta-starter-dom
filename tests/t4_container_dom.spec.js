import { test, expect } from '@playwright/test';

test('T4: .container — max-width ch, keskitys marginaaleilla, padding > 0 (CSSOM + computed)', async ({ page }) => {
  await page.goto('/');

  // 1) max-width on määritetty ch-yksiköllä CSS-säännössä
  const hasCh = await page.evaluate(() => {
    let value = '';
    for (const ss of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(ss.cssRules || [])) {
          if (rule.selectorText === '.container') {
            const v = rule.style.getPropertyValue('max-width') || '';
            if (v) value = v.trim(); // viimeisin voittaa
          }
        }
      } catch (e) { /* ignore cross-origin */ }
    }
    return /\d+\s*ch\b/i.test(value);
  });
  expect(hasCh).toBeTruthy();

  // 2) Keskitys ja padding > 0 lasketuista arvoista
  const ok = await page.evaluate(() => {
    const el = document.querySelector('.container');
    if (!el) return false;
    const cs = getComputedStyle(el);
    const ml = parseFloat(cs.marginLeft || '0');
    const mr = parseFloat(cs.marginRight || '0');
    const centered = Math.abs(ml - mr) < 0.5 && ml > 0 && mr > 0;

    const paddingSum = ['Top','Right','Bottom','Left']
      .map(k => parseFloat(cs['padding' + k] || '0'))
      .reduce((a, b) => a + b, 0);

    return centered && paddingSum > 0;
  });
  expect(ok).toBeTruthy();
});
