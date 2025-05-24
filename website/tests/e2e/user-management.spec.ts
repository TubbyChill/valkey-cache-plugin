import { test, expect, type Page } from '@playwright/test'

test.describe('User Management', () => {
  test('SuperAdmin can edit their profile settings', async ({ page }: { page: Page }) => {
    // Login as super admin
    await page.goto('/login')
    await page.fill('input[type="email"]', 'superAdminOliv@tubbychill.com')
    await page.fill('input[type="password"]', 'azpo')
    await page.click('button[type="submit"]')

    // Wait for dashboard to load
    await page.waitForURL('**/app/dashboard')
    
    // Navigate to settings
    await page.click('text=Settings')
    await page.waitForURL('**/app/settings')
    
    // Store original firstname
    const originalFirstname = await page.inputValue('input[name="firstname"]')
    const testFirstname = 'TestAdmin'
    
    // Change firstname
    await page.fill('input[name="firstname"]', testFirstname)
    await page.click('button:has-text("Save Changes")')
    
    // Wait for success message
    await page.waitForSelector('text=Profile updated successfully')
    
    // Verify changes
    await page.reload()
    expect(await page.inputValue('input[name="firstname"]')).toBe(testFirstname)
    
    // Revert changes
    await page.fill('input[name="firstname"]', originalFirstname)
    await page.click('button:has-text("Save Changes")')
    
    // Verify reversion
    await page.reload()
    expect(await page.inputValue('input[name="firstname"]')).toBe(originalFirstname)
  })

  test('Member can edit their profile in my-account', async ({ page }: { page: Page }) => {
    // Login as member
    await page.goto('/login')
    await page.fill('input[type="email"]', 'member@example.com')
    await page.fill('input[type="password"]', 'memberpass')
    await page.click('button[type="submit"]')

    // Navigate to my-account settings
    await page.goto('/my-account')
    await page.waitForURL('**/my-account')
    
    // Store original firstname
    const originalFirstname = await page.inputValue('input[name="firstname"]')
    const testFirstname = 'TestMember'
    
    // Change firstname
    await page.fill('input[name="firstname"]', testFirstname)
    await page.click('button:has-text("Save Changes")')
    
    // Wait for success message
    await page.waitForSelector('text=Profile updated successfully')
    
    // Verify changes
    await page.reload()
    expect(await page.inputValue('input[name="firstname"]')).toBe(testFirstname)
    
    // Revert changes
    await page.fill('input[name="firstname"]', originalFirstname)
    await page.click('button:has-text("Save Changes")')
    
    // Verify reversion
    await page.reload()
    expect(await page.inputValue('input[name="firstname"]')).toBe(originalFirstname)
  })
}) 