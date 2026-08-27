import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { NavigationComponent } from '@pages/NavigationComponent';
import { BikeInsuranceProfilePage } from '@pages/BikeInsuranceProfilePage';
import { VehicleDetailsPage } from '@pages/VehicleDetailsPage';
import { PersonalDetailsPage } from '@pages/PersonalDetailsPage';

test.describe('Migrated Java/Selenium homepage and navigation suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('homepage loads with title and logo', async ({ page }) => {
    const home = new HomePage(page);
    await expect(page).toHaveTitle(/Turtlemint/i);
    await expect.poll(() => home.isLogoDisplayed()).toBe(true);
  });

  test('homepage exposes trust stats and advisor section', async ({ page }) => {
    const home = new HomePage(page);
    expect(await home.getStatsBlockCount()).toBeGreaterThan(0);
    expect(await home.isFindAdvisorSectionPresent()).toBe(true);
  });

  test('download app link uses onelink router', async ({ page }) => {
    const href = await new HomePage(page).getDownloadAppLinkHref();
    expect(href).toContain('onelink.me');
  });

  test('top navigation exposes all product lines', async ({ page }) => {
    const hrefs = await new NavigationComponent(page).getAllTopLevelNavHrefs();
    for (const product of ['car-insurance', 'bike-insurance', 'health-insurance', 'life-insurance']) {
      expect(hrefs.some(href => href.includes(product))).toBe(true);
    }
  });

  test('car insurance companies navigation resolves', async ({ page }) => {
    await new NavigationComponent(page).navigateToCarInsuranceCompanies();
    await expect(page).toHaveURL(/car-insurance-companies/i);
  });

  test('bike premium calculator navigation resolves', async ({ page }) => {
    await new NavigationComponent(page).navigateToBikePremiumCalculator();
    await expect(page).toHaveURL(/bike-insurance-calculator/i);
  });

  test('term insurance navigation resolves', async ({ page }) => {
    await new NavigationComponent(page).navigateToTermInsurance();
    await expect(page).toHaveURL(/term-insurance-plans/i);
  });

  test('footer exposes support links and no dead hrefs', async ({ page }) => {
    const footer = new HomePage(page).footer;
    expect(await footer.isLinkPresent('About Us')).toBe(true);
    expect(await footer.getSocialLinkCount()).toBeGreaterThanOrEqual(4);
    expect(await footer.getCustomerSupportPhoneHref()).toMatch(/^tel:1800/);
    expect(await footer.getCustomerSupportEmailHref()).toContain('support@turtlemint.com');
    for (const link of await footer.getLinks()) {
      expect(link.href.trim()).not.toMatch(/^#?$/);
    }
  });
});

for (const [name, click, expected] of [
  ['Bike', (home: HomePage) => home.clickBikeQuoteCta(), /two-wheeler|bike/i],
  ['Car', (home: HomePage) => home.clickCarQuoteCta(), /car-insurance|car-profile/i],
  ['Health', (home: HomePage) => home.clickHealthQuoteCta(), /health-insurance|health-profile/i],
] as const) {
  test.describe(`${name} insurance quote flow`, () => {
    test('quote CTA navigates to the product flow', async ({ page }) => {
      const home = new HomePage(page);
      await page.goto('/');
      const initial = page.url();
      const targetPage = await click(home);
      await expect.poll(() => targetPage.url()).not.toBe(initial);
      await expect(targetPage).toHaveURL(expected);
    });
  });
}

test.describe('Bike quote funnel page objects', () => {
  test.skip('new-bike flow proceeds through vehicle details', async ({ page }) => {
    const home = new HomePage(page);
    await page.goto('/');
    await home.clickBikeQuoteCta();
    const profile = new BikeInsuranceProfilePage(page);
    await profile.selectNewBikeFlow();
    await profile.clickContinue();
    const vehicle = new VehicleDetailsPage(page);
    await vehicle.selectMake('Honda');
    await vehicle.selectModel('Activa 6G');
    await vehicle.selectVariant('Standard');
    await vehicle.selectManufactureYear('2023');
    await vehicle.clickContinue();
    expect(await new PersonalDetailsPage(page).isGetQuotesButtonEnabled()).toBe(true);
  });
});
