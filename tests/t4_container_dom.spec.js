import { test, expect } from '@playwright/test';

test('T4: .container — max-width ch, margin: 0 auto, padding > 0 (CSSOM)', async ({ page }) => {
  await page.goto('/');
  // 1) löydä viimeinen .container-sääntö ja tarkista että max-width käyttää ch-yksikköä
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
      } catch(e) {}
    }
    return /\d+\s*ch\b/i.test(value);
  });
  expect(hasCh).toBeTruthy();

  // 2) margin auto + padding > 0 (computed)
  const ok = await page.evaluate(() => {
    const el = document.querySelector('.container');
    if (!el) return false;
    const cs = getComputedStyle(el);
    const ml = cs.marginLeft, mr = cs.marginRight;
    const paddingSum = ['Top','Right','Bottom','Left']
      .map(k => parseFloat(cs['padding' + k] || '0'))
      .reduce((a,b)=>a+b,0);
    return ml === 'auto' && mr === 'auto' && paddingSum > 0;
  });
  expect(ok).toBeTruthy();
});
