import { test as base, expect } from '@playwright/test';
import { GaragePage, LandingPage } from '../poms/pages'; 
import fs from 'fs';


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
