// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

const baseUrl =
  process.env.PLATFORM === 'local'
    ? process.env.BASE_URL_LOCAL
    : process.env.PLATFORM === 'dev'
      ? process.env.BASE_URL_DEV
      : process.env.BASE_URL_PROD || process.env.BASE_URL_DEV || process.env.BASE_URL_LOCAL || 'http://localhost:3000';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: 'tests/assets/{arg}{ext}',
  snapshotDir: '__snapshots__',
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never'}],
    ['list'] // Shows real-time results in console
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup:
        require.resolve(
            './tests/auth/global.setup.js'
        ),
        
  use: {
    headless: true,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    storageState: 'playwright/.auth/user.json',

    baseURL: baseUrl,
    actionTimeout: 60000,
    navigationTimeout: 90000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  expect: {
    timeout: 10000, // Global timeout for assertions (10 seconds)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // // SignIn project
    // {
    //     name: 'signIn',

    //     testMatch: /.*signInTest\.spec\.js/,
    // },

    // // Create Organization project
    // {
    //     name: 'create-organization',

    //     testMatch: /.*createOrganization\.spec\.js/,

    //     dependencies: ['signIn'],
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

