import { expect, test } from '@playwright/test';

const BASE = '/mamunknitwear';

test('contact page renders the form and fallback', async ({ page }) => {
  await page.goto(`${BASE}/contact-us/`);
  await expect(page.getByRole('heading', { level: 1, name: /Contact us/i })).toBeVisible();
  const form = page.getByTestId('contact-form');
  await expect(form).toBeVisible();
  await expect(form.getByLabel(/Your Name/)).toBeVisible();
  await expect(form.getByLabel(/Your Email/)).toBeVisible();
  await expect(form.getByLabel(/Your Message/)).toBeVisible();
  await expect(page.getByRole('link', { name: /info@mamunknitwear\.com/i }).first()).toBeVisible();
});

test('news archive lists all five posts', async ({ page }) => {
  await page.goto(`${BASE}/news-2/`);
  await expect(page.getByRole('heading', { level: 1, name: /News & updates/i })).toBeVisible();
  await expect(page.locator('.news-card')).toHaveCount(5);
  await expect(
    page.getByRole('link', { name: /Chairman of Mamun Knitwear Ltd/i }).first(),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Welcome to our website/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Iftar Mahfil 2016/i }).first()).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Launched new factory building/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Employee of the month award/i }).first(),
  ).toBeVisible();
});

test('a news post renders its body and metadata', async ({ page }) => {
  await page.goto(`${BASE}/chairman-of-mamun-knitwear-ltd-given-cip-status/`);
  await expect(
    page.getByRole('heading', { level: 1, name: /Chairman of Mamun Knitwear Ltd/i }),
  ).toBeVisible();
  await expect(page.getByText(/commercially important person/i).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /All news/i })).toBeVisible();
});

test('team profile pages render', async ({ page }) => {
  await page.goto(`${BASE}/team/mofizul-islam/`);
  await expect(page.getByRole('heading', { level: 1, name: /Mofizul Islam/i })).toBeVisible();
  await expect(page.getByText(/Chairman & Founder/i)).toBeVisible();
});

test('knitting page shows machine table', async ({ page }) => {
  await page.goto(`${BASE}/knitting-section/`);
  await expect(page.getByRole('heading', { level: 1, name: /Knitting Section/i })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Taiwan' }).first()).toBeVisible();
});

test('SEO meta and favicon are present', async ({ page }) => {
  await page.goto(`${BASE}/`);
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute('href', /mamunknitwear\/$/);
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute(
    'href',
    `${BASE}/favicon-32.png`,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
});
