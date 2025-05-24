import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', text: 'ValKey' },
  { path: '/pricing', text: 'Pricing' },
  { path: '/docs', text: 'Documentation' },
  { path: '/login', text: 'Log in' },
  { path: '/signup', text: 'Get Started' }
];

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set a larger viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  for (const { path } of pages) {
    test(`should load ${path} page`, async ({ page }) => {
      // Navigate to the page
      const response = await page.goto(`http://localhost:3000/en${path}`);
      
      // Check if the page loaded successfully
      expect(response?.status()).toBe(200);

      // Check if the page has a title
      const title = await page.title();
      expect(title).toBeTruthy();

      // Check if the main content area is visible
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();

      // Take a screenshot for visual reference
      await page.screenshot({ path: `./test-results/screenshots${path.replace('/', '-')}.png` });
    });
  }

  test('should have working navigation links in desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');
    
    // Check if all navigation links are present and clickable
    for (const { path, text } of pages) {
      if (path === '/') continue; // Skip home page link
      
      // Find the link by its text content
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      // Click the link and wait for navigation
      await link.click();
      await page.waitForLoadState('networkidle');
      
      // Check if URL changed correctly (including language prefix)
      const currentUrl = new URL(page.url());
      const pathWithoutLang = currentUrl.pathname.replace(/^\/[a-z]{2}/, '');
      expect(pathWithoutLang).toBe(path);
      
      // Check if the page loaded without errors
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Go back to home page for next test
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have working navigation links in mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');
    
    // Open mobile menu
    const menuButton = await page.getByRole('button', { name: 'Toggle menu' });
    await menuButton.click();
    
    // Check if all navigation links are present and clickable
    for (const { path, text } of pages) {
      if (path === '/') continue; // Skip home page link
      
      // Find the link by its text content
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      // Click the link and wait for navigation
      await link.click();
      await page.waitForLoadState('networkidle');
      
      // Check if URL changed correctly (including language prefix)
      const currentUrl = new URL(page.url());
      const pathWithoutLang = currentUrl.pathname.replace(/^\/[a-z]{2}/, '');
      expect(pathWithoutLang).toBe(path);
      
      // Check if the page loaded without errors
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Go back to home page and reopen menu for next test
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
      await menuButton.click();
    }
  });
}); 