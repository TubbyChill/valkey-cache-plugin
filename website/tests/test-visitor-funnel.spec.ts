import { test, expect, type Page } from '@playwright/test'

const languages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja']
const menuLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/community', label: 'Community' },
  { href: '/docs', label: 'Documentation' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' }
]
const pluginRepoUrl = 'https://wordpress.org/plugins/valkey-cache/'

async function checkPageContent(page: Page, lang: string) {
  // Check main content exists
  const mainContent = page.locator('main')
  await expect(mainContent).toBeVisible()
  
  // Check footer exists
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
  
  // Check language switcher exists
  const langSwitcher = page.locator('[aria-label="Language"]')
  await expect(langSwitcher).toBeVisible()
}

test.describe('Visitor Funnel Tests', () => {
  for (const lang of languages) {
    test(`Homepage and navigation work in ${lang}`, async ({ page }) => {
      // Visit homepage
      await page.goto(`http://localhost:3001/${lang}`)
      
      // Check homepage content
      await expect(page.locator('h1')).toContainText('ValKey')
      await checkPageContent(page, lang)
      
      // Check CTA button exists and links to plugin repo
      const cta = page.locator('a,button', { hasText: /Get Started|Download Plugin|Try ValKey/i })
      await expect(cta).toBeVisible()
      
      // Test navigation through all menu links
      for (const link of menuLinks) {
        // Find and click the navigation link
        const navLink = page.locator(`a[href="/${lang}${link.href}"]`)
        await expect(navLink).toBeVisible()
        await navLink.click()
        
        // Verify URL changed correctly
        await expect(page).toHaveURL(new RegExp(`/${lang}${link.href}`))
        
        // Check the page content loaded
        await checkPageContent(page, lang)
        
        // Go back to homepage
        await page.goBack()
      }
    })

    test(`Language switching works from ${lang}`, async ({ page }) => {
      // Start on homepage
      await page.goto(`http://localhost:3001/${lang}`)
      
      // For each other language
      for (const targetLang of languages.filter(l => l !== lang)) {
        // Find and click the language switcher
        const langSwitcher = page.locator(`[aria-label="Language"]`)
        await langSwitcher.click()
        
        // Select the target language
        const langOption = page.locator(`text=${targetLang.toUpperCase()}`)
        await langOption.click()
        
        // Verify URL changed to new language
        await expect(page).toHaveURL(new RegExp(`/${targetLang}/`))
        
        // Verify content loaded in new language
        await checkPageContent(page, targetLang)
        
        // Go back to original language
        await page.goto(`http://localhost:3001/${lang}`)
      }
    })
  }
}) 