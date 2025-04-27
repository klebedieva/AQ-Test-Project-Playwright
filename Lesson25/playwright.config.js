// @ts-check
import { defineConfig, devices } from '@playwright/test';
const dotenv = require('dotenv');
const fs = require('fs');

const ENV_NAME = process.env.ENV || 'qauto';
const envPath = `.env.${ENV_NAME}`;

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`Env file is loaded: ${envPath}`);
} else {
  console.error(`Env file "${envPath}" is not found.`);
  process.exit(1);
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
