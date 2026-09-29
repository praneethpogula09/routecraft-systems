import { test, expect, devices } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'https://praneethpogula09.github.io/routecraft-systems';
const pages = [
  '/',
  '/services.html',
  '/ai-voice-agents.html',
  '/web-development.html',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/terms.html',
];

for (const path of pages) {
  test(`${path} loads without serious accessibility defects`, async ({ page }) => {
    const consoleErrors = [];
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(v => ['serious', 'critical'].includes(v.impact || ''));
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    expect(consoleErrors.filter(error => !error.includes('favicon'))).toEqual([]);
  });
}

test('mobile navigation is keyboard operable', async ({ browser }) => {
  const context = await browser.newContext(devices['Pixel 5']);
  const page = await context.newPage();
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  const toggle = page.locator('.menu-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-navigation')).toHaveClass(/open/);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await context.close();
});

test('qualified inquiry form has production endpoint and labeled controls', async ({ page }) => {
  await page.goto(origin + '/contact.html', { waitUntil: 'networkidle' });
  const form = page.locator('#qualified-inquiry');
  await expect(form).toHaveAttribute('method', /post/i);
  await expect(form).toHaveAttribute('action', 'https://formsubmit.co/praneethpogula09@gmail.com');
  await expect(form.locator('input[name="_captcha"]')).toHaveValue('true');
  await expect(form.locator('input[name="_next"]')).toHaveValue(origin + '/thank-you.html');
  const unlabeled = await form.locator('input:not([type="hidden"]), select, textarea').evaluateAll(elements => elements.filter(el => !el.labels || el.labels.length === 0).map(el => el.id));
  expect(unlabeled).toEqual([]);
});
