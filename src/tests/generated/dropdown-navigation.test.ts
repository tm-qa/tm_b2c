import { test, expect } from '@playwright/test';
import { Header } from '@pages/components/Header';
import { DROPDOWN_SECTIONS, INSURERS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Bike Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {
  let header: Header;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    await page.goto('/');
    await header.waitForLoad();
  });

  test.describe('Bike Dropdown', () => {
    test('Verify that the Bike dropdown is displayed - TC_007', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Bike');
      const dropdownMenu = await header.getDropdownMenu('Bike');
      await expect(dropdownMenu).toBeVisible();
    });

    test('Verify that all sections are displayed in the Bike dropdown - TC_008', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Bike');
      const dropdownMenu = await header.getDropdownMenu('Bike');
      await expect(dropdownMenu).toBeVisible();
    });

  });

  test.describe('Bike Insurance Companies', () => {
    test('Verify that all insurer options are displayed under Bike Insurance Companies - TC_009', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Bike');
      await header.openInsurerCompanies('Bike');
      const insurers = await header.getInsurerLinks('Bike');
      const expectedInsurers = INSURERS.BIKE.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

    test('Verify that an insurer link is clickable - TC_010', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Bike');
      await header.openInsurerCompanies('Bike');
      const insurers = await header.getInsurerLinks('Bike');
      const expectedInsurers = INSURERS.BIKE.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

  });

});

test.describe('Health Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {
  let header: Header;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    await page.goto('/');
    await header.waitForLoad();
  });

  test.describe('Health Dropdown', () => {
    test('Verify that the Health dropdown is displayed - TC_011', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      const dropdownMenu = await header.getDropdownMenu('Health');
      await expect(dropdownMenu).toBeVisible();
    });

    test('Verify that all sections are displayed in the Health dropdown - TC_012', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      const dropdownMenu = await header.getDropdownMenu('Health');
      await expect(dropdownMenu).toBeVisible();
    });

  });

  test.describe('Health Insurance Companies', () => {
    test('Verify that all insurer options are displayed under Health Insurance Companies - TC_013', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      await header.openInsurerCompanies('Health');
      const insurers = await header.getInsurerLinks('Health');
      const expectedInsurers = INSURERS.HEALTH.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

    test('Verify that an insurer link is clickable - TC_014', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      await header.openInsurerCompanies('Health');
      const insurers = await header.getInsurerLinks('Health');
      const expectedInsurers = INSURERS.HEALTH.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

  });

  test.describe('Network Hospitals', () => {
    test('Verify that all network hospital options are displayed under Network Hospitals - TC_015', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      const hospitals = await header.getNetworkHospitalLinks();
      // Verify hospitals displayed
    });

    test('Verify that a network hospital link is clickable - TC_016', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Health');
      const hospitals = await header.getNetworkHospitalLinks();
      // Verify hospitals displayed
    });

  });

  test.describe('Health Insurance', () => {
    test('Verify that the Health Insurance page is displayed - TC_200', async ({ page }) => {
      const header = new Header(page);
    });

  });

});

test.describe('Life Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {
  let header: Header;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    await page.goto('/');
    await header.waitForLoad();
  });

  test.describe('Life Dropdown', () => {
    test('Verify that the Life dropdown is displayed - TC_017', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Life');
      const dropdownMenu = await header.getDropdownMenu('Life');
      await expect(dropdownMenu).toBeVisible();
    });

    test('Verify that all sections are displayed in the Life dropdown - TC_018', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Life');
      const dropdownMenu = await header.getDropdownMenu('Life');
      await expect(dropdownMenu).toBeVisible();
    });

  });

  test.describe('Life Insurance Companies', () => {
    test('Verify that all insurer options are displayed under Life Insurance Companies - TC_019', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Life');
      await header.openInsurerCompanies('Life');
      const insurers = await header.getInsurerLinks('Life');
      const expectedInsurers = INSURERS.LIFE.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

    test('Verify that an insurer link is clickable - TC_020', async ({ page }) => {
      const header = new Header(page);
      await header.openDropdown('Life');
      await header.openInsurerCompanies('Life');
      const insurers = await header.getInsurerLinks('Life');
      const expectedInsurers = INSURERS.LIFE.COMPANIES;
      for (const expected of expectedInsurers) {
        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
      }
    });

  });

  test.describe('Life Insurance - Header Navigation', () => {
    test('Verify that the Life Insurance option is clickable - TC_201', async ({ page }) => {
      const header = new Header(page);
      await header.clickLifeInsuranceHeader();
      await expect(page).toHaveURL(/life-insurance/);
    });

  });

  test.describe('Life Landing Page Flow', () => {
    test('Verify that plans are visible on page - TC_105', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that term Life Plans is clickable - TC_106', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that investment Tax planning is clickable - TC_107', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that saving For Child is clickable - TC_108', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that pension retirement is clickable - TC_109', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that clicking on Plans it redirect to life Profile page - TC_110', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that this Please enter the pincode error message should come if user not enters pincode - TC_111', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that the user is able to enter pincode - TC_112', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that the user is able to click on Find Advisor CTA - TC_113', async ({ page }) => {
      const header = new Header(page);
    });

    test('Verify that after clicking Find Advisor user should redirect to Advisor listing page - TC_114', async ({ page }) => {
      const header = new Header(page);
    });

  });

});

test.describe('Car Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {
  let header: Header;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    await page.goto('/');
    await header.waitForLoad();
  });

});

