import { test, expect } from '@playwright/test';

test('T2: :root CSS-muuttujat ovat olemassa ja var(--...) käytössä jossain säännössä', async ({ page }) => {
  await page.goto('/');
  const hasRootVar = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    // etsi jokin --muuttuja, jolla on ei-tyhjä arvo
    for (const ss of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(ss.cssRules || [])) {
          if (rule.selectorText === ':root') {
            for (const name of Array.from(rule.style)) {
              if (name.startsWith('--') && rootStyle.getPropertyValue(name).trim() !== '') return true;
            }
          }
        }
      } catch(e) { /* ulkopuolinen stylesheet estää cssRules-lukemisen */ }
    }
    return false;
  });
  expect(hasRootVar).toBeTruthy();

  const usesVar = await page.evaluate(() => {
    for (const ss of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(ss.cssRules || [])) {
          const style = rule.style;
          if (!style) continue;
          for (const name of Array.from(style)) {
            const val = style.getPropertyValue(name);
            if (val && val.includes('var(')) return true;
          }
        }
      } catch(e) {}
    }
    return false;
  });
  expect(usesVar).toBeTruthy();
});
