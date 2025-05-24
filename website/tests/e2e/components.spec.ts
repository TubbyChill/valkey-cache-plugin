import { test, expect } from '@playwright/test';

test.describe('UI Components Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('contact form submission', async ({ page }) => {
    await page.goto('http://localhost:3000/en/contact');

    // Fill out the contact form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Subject').fill('Test Subject');
    await page.getByLabel('Message').fill('This is a test message');

    // Submit form
    await page.getByRole('button', { name: 'Send Message' }).click();

    // Check for success toast
    await expect(page.getByRole('status').or(page.getByText('Success'))).toBeVisible({ timeout: 10000 });
  });

  test('blog post interaction', async ({ page }) => {
    await page.goto('http://localhost:3000/en/blog');

    // Check if blog posts are loaded
    const posts = page.locator('article');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(0);

    // Test blog post card interaction
    const firstPost = posts.first();
    await expect(firstPost).toBeVisible();
    const postLink = firstPost.locator('a').first();
    const href = await postLink.getAttribute('href');
    await postLink.click();

    // Verify navigation to post detail (with language prefix)
    await expect(page).toHaveURL(new RegExp(`http://localhost:3000/en/blog/.*`));
  });

  test('pricing table comparison', async ({ page }) => {
    await page.goto('http://localhost:3000/en/pricing');

    // Check pricing table structure
    const pricingSection = page.getByRole('region', { name: 'Pricing Plans' });
    await expect(pricingSection).toBeVisible();

    // Check for pricing tiers
    const pricingTiers = pricingSection.locator('.pricing-tier');
    const tierCount = await pricingTiers.count();
    expect(tierCount).toBeGreaterThan(0);

    // Test CTA buttons
    const ctaButtons = page.getByRole('link', { name: /get started|try|buy/i });
    const ctaCount = await ctaButtons.count();
    expect(ctaCount).toBeGreaterThan(0);
  });

  test('documentation search', async ({ page }) => {
    await page.goto('http://localhost:3000/en/docs');

    // Check search functionality
    const searchInput = page.getByPlaceholder(/search/i).or(page.getByRole('searchbox'));
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill('configuration');

    // Wait for search results
    await page.waitForTimeout(1000); // Wait for debounce
    const searchResults = page.getByRole('link', { name: /configuration/i }).first();
    await expect(searchResults).toBeVisible({ timeout: 10000 });

    // Verify search result content
    const resultText = await searchResults.textContent();
    expect(resultText?.toLowerCase()).toContain('configuration');
  });

  test('accessibility checks', async ({ page }) => {
    // Test homepage accessibility
    await page.goto('http://localhost:3000/en');
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check for image alt texts
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for ARIA labels on interactive elements
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      expect(ariaLabel || text).toBeTruthy();
    }
  });

  test('SEO metadata', async ({ page }) => {
    const pages = ['/', '/about', '/blog', '/contact', '/docs', '/features', '/pricing'];

    for (const path of pages) {
      await page.goto(`http://localhost:3000/en${path}`);
      await page.waitForLoadState('networkidle');

      // Check meta title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeLessThan(70);

      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeLessThan(160);

      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    }
  });

  test('responsive design', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1280, height: 720 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('http://localhost:3000/en');

      // Check navigation menu behavior
      const menuButton = page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('[aria-label="Toggle menu"]'));
      const navigation = page.getByRole('navigation');
      
      if (viewport.width < 768) {
        // Mobile: Menu should be collapsed and have a button
        await expect(menuButton).toBeVisible({ timeout: 10000 });
        await menuButton.click();
        await expect(navigation).toBeVisible();
      } else {
        // Desktop: Menu should be visible without a button
        await expect(navigation).toBeVisible();
      }
    }
  });
}); 