import { test, expect } from '@playwright/test';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Become a POSP - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('POSP Navigation', () => {
    test('Verify that the user is able to click on the Become A POSP CTA - TC_031', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the user is able to click on the "Become A POSP" CTA.
    });

    test('Verify that the user is redirected to the Turtlemint Pro platform after clicking Become a POSP - TC_036', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the user is redirected to the Turtlemint Pro platform after clicking "Become a POSP".
    });

    test('Verify that the user is able to click on the SIGN UP CTA - TC_037', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the user is able to click on the "SIGN UP" CTA.
    });

    test('Verify that the user is able to click on the LOGIN CTA - TC_038', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the user is able to click on the "LOGIN" CTA.
    });

  });

  test.describe('TurtlemintPro Landing Page', () => {
    test('Verify that the TurtlemintPro introduction section is displayed - TC_032', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the TurtlemintPro introduction section is displayed.
    });

  });

  test.describe('Why Join TurtlemintPro', () => {
    test('Verify that the Why Join TurtlemintPro section is displayed - TC_033', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the "Why Join TurtlemintPro?" section is displayed.
    });

  });

  test.describe('Insurance Business Features', () => {
    test('Verify that the insurance business features are displayed - TC_034', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the insurance business features are displayed.
    });

  });

  test.describe('Partner Testimonials', () => {
    test('Verify that partner testimonials are displayed - TC_035', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that partner testimonials are displayed.
    });

  });

  test.describe('Mobile App Navigation', () => {
    test('Verify that the user is able to click on the Play StoreApp download link - TC_039', async ({ page }) => {
      await page.goto('/become-posp/');
      // Verify that the user is able to click on the Play Store/App download link.
    });

  });

});
