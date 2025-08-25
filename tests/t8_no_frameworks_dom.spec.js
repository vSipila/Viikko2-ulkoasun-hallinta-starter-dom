import { test, expect } from '@playwright/test';

test('T8 (0p): ei CSS-frameworkeja viittauksissa', async ({ page }) => {
  await page.goto('/');
  const banned = ['bootstrap', 'tailwind', 'bulma', 'foundation', 'materialize', 'semantic'];
  const html = await page.content();
  const lower = html.toLowerCase();
  const found = banned.find(k => lower.includes(k));
  expect(found).toBeUndefined();
});
