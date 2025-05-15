import { test, expect } from '../fixtures/garage-page.fixture.js';

test('User is already logged in and can access garage', async ({ garagePage }) => {
  const page = garagePage.page;

  // Check: user is already logged in (Sign In button should not be visible)
  const signInButton = page.getByRole('button', { name: 'Sign In' });
  await expect(signInButton).toHaveCount(0);

  // Check: user is on the correct page
  await expect(page).toHaveURL(/\/panel\/garage/);

  // Check: "Add car" button is visible
  await expect(garagePage.addCarButton).toBeVisible();

  // Click the "Add car" button
  await garagePage.addCarButton.click();

  // Check: modal title "Add a car" is visible
  const modalTitle = page.locator('h4.modal-title', { hasText: 'Add a car' });
  await expect(modalTitle).toBeVisible();
});
