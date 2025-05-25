// // @ts-check
import { test, expect } from '@playwright/test';

test('Login to the site', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(process.env.DEFAULT_EMAIL);

  await page.locator('#signinPassword').fill(process.env.DEFAULT_PASSWORD);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('h1')).toHaveText('Garage', { timeout: 10000 });
});