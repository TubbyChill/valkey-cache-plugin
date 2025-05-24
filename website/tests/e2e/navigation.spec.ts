import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/docs',
  '/features',
  '/pricing'
];

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set a larger viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  for (const path of pages) {
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

  test('should have working navigation links', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    
    // Check if all navigation links are present and clickable
    for (const path of pages) {
      if (path === '/') continue; // Skip home page link
      
      const pathName = path.substring(1); // Remove leading slash
      const link = await page.getByRole('link', { name: new RegExp(pathName, 'i') }).first();
      await expect(link).toBeVisible();
      
      // Click the link
      await link.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      
      // Check if URL changed correctly (including language prefix)
      expect(page.url()).toContain(`/en${path}`);
      
      // Check if the page loaded without errors
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Go back to home page for next test
      await page.goto('http://localhost:3000/en');
    }
  });
}); 