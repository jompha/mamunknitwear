import { expect, test } from '@playwright/test';

const BASE = '/mamunknitwear';

const NAV_ITEMS: Array<[label: string, href: string]> = [
  ['Home', '/'],
  ['About us', '/about-us-2/'],
  ['Services', '/services/'],
  ['News', '/news-2/'],
  ['Contact us', '/contact-us/'],
];

const SERVICES_ITEMS: Array<[label: string, href: string]> = [
  ['Knitting', '/knitting-section/'],
  ['Digital Printing', '/digital-printing/'],
  ['Sewing', '/sewing-section/'],
];

test('home page renders hero and branding', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page).toHaveTitle(/Mamun Knitwear Ltd/);
  await expect(
    page.getByRole('heading', { level: 1, name: /Manufacturing excellence/i }),
  ).toBeVisible();
  await expect(page.getByText(/100% Export Oriented/i).first()).toBeVisible();
});

test('navigation links all resolve to 200', async ({ page }) => {
  await page.goto(`${BASE}/`);
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const [label, href] of NAV_ITEMS) {
    const link = nav.getByRole('link', { name: label });
    await expect(link).toBeVisible();
    const response = await page.request.get(`${BASE}${href === '/' ? '/' : href}`);
    expect(response.ok(), `${label} at ${href} should return 200`).toBeTruthy();
  }
});

test('services submenu lists knitting, digital printing and sewing', async ({ page }) => {
  await page.goto(`${BASE}/`);
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const services = nav.getByRole('link', { name: 'Services' });
  await expect(services).toBeVisible();
  await services.hover();
  for (const [label, href] of SERVICES_ITEMS) {
    const link = nav.getByRole('link', { name: label });
    await expect(link).toBeVisible();
    const response = await page.request.get(`${BASE}${href}`);
    expect(response.ok(), `${label} at ${href} should return 200`).toBeTruthy();
  }
});

test('navigation works on mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/`);
  await page.locator('[data-nav-toggle]').click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'About us' })).toBeVisible();
  await nav.getByRole('link', { name: 'About us' }).click();
  await expect(page).toHaveURL(/\/about-us-2\/$/);
  await expect(page.getByRole('heading', { level: 1, name: /About us/i })).toBeVisible();
});

test('every migrated page returns 200', async ({ page }) => {
  const paths = [
    '/',
    '/about-us-2/',
    '/services/',
    '/knitting-section/',
    '/digital-printing/',
    '/sewing-section/',
    '/news-2/',
    '/contact-us/',
    '/hello-world/',
    '/chairman-of-mamun-knitwear-ltd-given-cip-status/',
    '/iftar-mahfil-2016/',
    '/responsible-to-environment/',
    '/the-engineering-of-today/',
    '/team/mofizul-islam/',
    '/team/mamunur-rashid-2/',
  ];
  for (const path of paths) {
    const response = await page.request.get(`${BASE}${path}`);
    expect(response.ok(), `${path} should return 200`).toBeTruthy();
  }
});

test('unknown path serves the custom 404 page', async ({ page }) => {
  await page.goto(`${BASE}/this-page-does-not-exist/`);
  await expect(page.getByRole('heading', { level: 1, name: /Page not found/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to home/i })).toBeVisible();
});
