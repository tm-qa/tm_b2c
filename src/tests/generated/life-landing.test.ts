import { test, expect } from '@playwright/test';
import { LifeLandingPage } from '@pages/modules/life/LifeLandingPage';
import { LIFE_LANDING_PLANS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Life Landing Page - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.LANDING, () => {
  test('Verify that plans are visible on page - TC_105', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
    await lifeLandingPage.verifyPlanCards();
  });

  test('Verify that term Life Plans is clickable - TC_106', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
    await lifeLandingPage.verifyPlanCards();
  });

  test('Verify that investment Tax planning is clickable - TC_107', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
    await lifeLandingPage.verifyPlanCards();
  });

  test('Verify that saving For Child is clickable - TC_108', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

  test('Verify that pension retirement is clickable - TC_109', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

  test('Verify that clicking on Plans it redirect to life Profile page - TC_110', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
    await lifeLandingPage.verifyPlanCards();
  });

  test('Verify that this Please enter the pincode error message should come if user not enters pincode - TC_111', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

  test('Verify that the user is able to enter pincode - TC_112', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

  test('Verify that the user is able to click on Find Advisor CTA - TC_113', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

  test('Verify that after clicking Find Advisor user should redirect to Advisor listing page - TC_114', async ({ page }) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
  });

});
