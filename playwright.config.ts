import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const BASE_URL = process.env.BASE_URL || 'https://www.turtlemintinsurance.com/';
const PINCODES = process.env.PINCODES?.split(',') || ['400001', '110001', '560001'];
const IS_CI = !!process.env.CI;

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: IS_CI ? 2 : 0,
  workers: IS_CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: IS_CI ? 'on-first-retry' : 'on',
    screenshot: IS_CI ? 'only-on-failure' : 'on',
    video: IS_CI ? 'retain-on-failure' : 'on',
    actionTimeout: 15000,
    navigationTimeout: 30000,
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
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: undefined,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
});