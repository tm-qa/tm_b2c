import { test, expect } from '@playwright/test';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Raise a Claim - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('Raise a Claim Flow', () => {
    test('Verify that the user is able to click on the Raise a Claim CTA - TC_021', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the user is able to click on the "Raise a Claim" CTA.
    });

    test('Verify that the Download Now CTA is displayed on the Raise a Claim page - TC_022', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the "Download Now" CTA is displayed on the Raise a Claim page.
    });

    test('Verify that the user is able to click on the Download Now CTA - TC_023', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the user is able to click on the "Download Now" CTA.
    });

  });

  test.describe('Contact Support', () => {
    test('Verify that the customer contact number is displayed on the Raise a Claim page - TC_024', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the customer contact number is displayed on the Raise a Claim page.
    });

    test('Verify that the customer support email is displayed on the Raise a Claim page - TC_025', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the customer support email is displayed on the Raise a Claim page.
    });

    test('Verify that the customer is able to interact with the customer support contact number - TC_026', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the customer is able to interact with the customer support contact number.
    });

    test('Verify that the customer is able to interact with the support email - TC_027', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the customer is able to interact with the support email.
    });

  });

  test.describe('How it works', () => {
    test('Verify that the How it works section is displayed - TC_028', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the "How it works?" section is displayed.
    });

  });

  test.describe('Claims Settlement Benefits', () => {
    test('Verify that the Why Turtlemint Insurance for claims settlement section is displayed - TC_029', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that the "Why Turtlemint Insurance for claims settlement" section is displayed.
    });

  });

  test.describe('Customer Testimonials', () => {
    test('Verify that customer testimonials are displayed on the Raise A Claim page - TC_030', async ({ page }) => {
      await page.goto('/raise-claim/');
      // Verify that customer testimonials are displayed on the Raise A Claim page.
    });

  });

});
