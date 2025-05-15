import { test as setup } from '@playwright/test';
import { LandingPage } from '../../poms/pages';

const authFile = 'storage/session-storage.json';

setup('Login and save storage state', async ({ page, baseURL }) => {
  const landingPage = new LandingPage(page);
  await page.goto(baseURL);

  const signInModal = await landingPage.clickSignInButton();
  await signInModal.executeLogin();

  await page.context().storageState({ path: authFile });
});