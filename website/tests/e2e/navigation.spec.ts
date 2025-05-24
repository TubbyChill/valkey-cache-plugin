import { test, expect } from '@playwright/test';

const mainPages = [
  { path: '/', text: 'ValKey' },
  { path: '/pricing', text: 'Pricing' },
  { path: '/docs', text: 'Documentation' },
  { path: '/signup', text: 'Get Started' }
];

const productFeatures = [
  { path: '/features/performance', text: 'Performance' },
  { path: '/features/efficiency', text: 'Memory Efficiency' },
  { path: '/features/community', text: 'Community Support' }
];

const solutions = [
  { path: '/solutions/wordpress', text: 'WordPress Plugin' },
  { path: '/solutions/enterprise', text: 'Enterprise' },
  { path: '/solutions/cloud', text: 'Cloud Hosting' }
];

const resources = [
  { path: '/docs', text: 'Documentation' },
  { path: '/blog', text: 'Blog' },
  { path: '/support', text: 'Support' },
  { path: '/pro', text: 'Start Free Trial' }
];

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set a larger viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  // Test main navigation pages
  for (const { path, text } of mainPages) {
    test(`should load ${path} page`, async ({ page }) => {
      // Navigate to the page
      await page.goto(`http://localhost:3000/en${path}`);
      await page.waitForLoadState('networkidle');
      
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

  test('should have working Products dropdown menu in desktop view', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');

    // Open Products dropdown
    const productsButton = await page.getByRole('button', { name: 'Products' });
    await productsButton.click();

    // Test Core Features links
    for (const { path, text } of productFeatures) {
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        link.click()
      ]);
      
      expect(page.url()).toContain(`/en${path}`);
      
      // Go back and reopen dropdown
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
      await productsButton.click();
    }

    // Test Solutions links
    for (const { path, text } of solutions) {
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        link.click()
      ]);
      
      expect(page.url()).toContain(`/en${path}`);
      
      // Go back and reopen dropdown
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
      await productsButton.click();
    }

    // Test Resources links
    for (const { path, text } of resources) {
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        link.click()
      ]);
      
      expect(page.url()).toContain(`/en${path}`);
      
      // Go back and reopen dropdown
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
      await productsButton.click();
    }
  });

  test('should have working navigation links in desktop view', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');
    
    // Check if all navigation links are present and clickable
    for (const { path, text } of mainPages) {
      if (path === '/') continue; // Skip home page link
      
      // Find the link by its text content
      const link = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(link).toBeVisible();
      
      // Click the link and wait for navigation
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        link.click()
      ]);
      
      // Check if URL changed correctly (including language prefix)
      expect(page.url()).toContain(`/en${path}`);
      
      // Check if the page loaded without errors
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Go back to home page for next test
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have working navigation links in mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const menuButton = await page.getByRole('button', { name: 'Toggle menu' });
    await menuButton.click();
    
    // Check if all navigation links are present and clickable
    for (const { path, text } of mainPages) {
      if (path === '/') continue; // Skip home page link
      
      // Find the link or button by its text content
      const element = await page.getByRole('link', { name: text, exact: true }).first();
      await expect(element).toBeVisible();
      
      // Click the element and wait for navigation
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        element.click()
      ]);
      
      // Check if URL changed correctly (including language prefix)
      expect(page.url()).toContain(`/en${path}`);
      
      // Check if the page loaded without errors
      const mainContent = await page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Go back to home page and reopen menu for next test
      await page.goto('http://localhost:3000/en');
      await page.waitForLoadState('networkidle');
      await menuButton.click();
    }
  });

  test('should open login modal when clicking login button', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');

    // Click login button
    const loginButton = await page.getByRole('button', { name: 'Log in', exact: true }).first();
    await loginButton.click();

    // Check if modal is visible
    const modal = await page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Check modal content
    await expect(page.getByText('Log in to your account')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const menuButton = await page.getByRole('button', { name: 'Toggle menu' });
    await menuButton.click();

    // Click login button in mobile menu
    const mobileLoginButton = await page.getByRole('button', { name: 'Log in', exact: true }).first();
    await mobileLoginButton.click();

    // Check if modal is visible
    await expect(modal).toBeVisible();

    // Check modal content
    await expect(page.getByText('Log in to your account')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });
}); 