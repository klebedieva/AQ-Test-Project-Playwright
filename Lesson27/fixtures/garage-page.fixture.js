import { test as base, expect } from '@playwright/test';
import { GaragePage, LandingPage } from '../poms/pages'; 
import fs from 'fs';


// export const test = base.extend({
//   garagePage: async ({ page, baseURL }, use) => {
//     const landingPage = new LandingPage(page);
//     const garagePage = new GaragePage(page);


//     await page.goto(baseURL);
//     const signInModal = await landingPage.clickSignInButton();
//     await signInModal.executeLogin(); 
//     await garagePage.openPage(); 

//     // for test
//     await use(garagePage);
//   }
// });

// export { expect } from '@playwright/test';


const STORAGE_PATH = 'storage/session-storage.json';

export const test = base.extend({
  garagePage: async ({ browser }, use) => {
    if (!fs.existsSync(STORAGE_PATH)) {
      throw new Error(`Storage state file not found at ${STORAGE_PATH}. Run "npm run setup" first.`);
    }
    const context = await browser.newContext({ storageState: STORAGE_PATH });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await garagePage.openPage(); 
    await use(garagePage);

    await context.close();
  }
});
export { expect };
