import { expect, test } from '@playwright/test'

test('Click on Click Me button', async ({ page }) => {
  await page.goto('/Ajax-Loader/index.html')
  await page.locator('#button1').click()
  await expect(page.locator('#myModalClick h4')).toBeVisible()
})
