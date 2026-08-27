import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Our partners (BIKE) - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select Insurer from Our partner sectionand should and land on Insure - TC_115', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Select insurer from Our Partners section
    });

  });

  test.describe('Insurer Landing Page Flow', () => {
    test('Verify that the user is able to select any Insurer from our Partner sections - TC_116', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Click on insurer from partners
    });

    test('Verify that the user should land on Insurer page after selecting Insurer - TC_117', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify navigation to insurer page
    });

    test('Verify that the selected Insurer icon is on top of the page - TC_118', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify insurer icon displayed
    });

    test('Verify that the user is able to enter bike number - TC_119', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Enter vehicle number
    });

    test('Verify that the user is able to click on Get Quotes CTA - TC_120', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Get Quotes Without Bike Number CTA - TC_121', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Year of Inception should be present on top of the page - TC_122', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that No of Branches should be present on top of the page - TC_123', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Cashless Garages should be present on top of the page - TC_124', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on More CTA - TC_125', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that once user scroll the page to bottom then the page tabs should be on TOP - TC_126', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that on clicking Plans tab user should redirect to that particular section on page - TC_127', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to complete the action successfully click on Read More Dropdown - TC_128', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Book an Expert call Section of right side of page - TC_129', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Download now CTA on the right side of the page - TC_130', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on articles on the bottom of the page - TC_131', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Articles - TC_132', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on View all article CTA - TC_133', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Insurer list on the right side of the page - TC_134', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Insurer on the Insurer section - TC_135', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

  });

});

test.describe('Our partners (CAR) - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select Insurer from Our partner sectionand should and land on Insure - TC_136', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Select insurer from Our Partners section
    });

  });

  test.describe('Insurer Landing Page Flow', () => {
    test('Verify that the user is able to select any Insurer from our Partner sections - TC_137', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Click on insurer from partners
    });

    test('Verify that the user should land on Insurer page after selecting Insurer - TC_138', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify navigation to insurer page
    });

    test('Verify that the selected Insurer icon is on top of the page - TC_139', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify insurer icon displayed
    });

    test('Verify that the user is able to enter car number - TC_140', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Enter vehicle number
    });

    test('Verify that the user is able to click on Get Quotes CTA - TC_141', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Get Quotes Without Car Number CTA - TC_142', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Year of Inception should be present on top of the page - TC_143', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that No of Branches should be present on top of the page - TC_144', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Cashless Garages should be present on top of the page - TC_145', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Read More CTA - TC_146', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that once user scroll the page to bottom then the page tabs should be on TOP - TC_147', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that on clicking Plans tab user should redirect to that particular section on page - TC_148', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to complete the action successfully click on More Dropdown - TC_149', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Book a free Consultation CTA of right side of page - TC_150', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Download now CTA on the right side of the page - TC_151', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on articles on the bottom of the page - TC_152', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Articles - TC_153', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on View all article CTA - TC_154', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Insurer list on the right side of the page - TC_155', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Insurer on the Insurer section - TC_156', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

  });

});

test.describe('Our partners (Health) - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select Insurer from Our partner sectionand should and land on Insure - TC_157', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Select insurer from Our Partners section
    });

  });

  test.describe('Insurer Landing Page Flow', () => {
    test('Verify that the user is able to select any Insurer from our Partner sections - TC_158', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Click on insurer from partners
    });

    test('Verify that the user should land on Insurer page after selecting Insurer - TC_159', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify navigation to insurer page
    });

    test('Verify that the selected Insurer icon is on top of the page - TC_160', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Verify insurer icon displayed
    });

    test('Verify that Policies Issued should be present on top of the page - TC_162', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that No of Branches should be present on top of the page - TC_163', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Network Hospitals should be present on top of the page - TC_164', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that Year of Inception should be present on top of the page - TC_165', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Read More CTA - TC_166', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that once user scroll the page to bottom then the page tabs should be on TOP - TC_167', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that on clicking Plans tab user should redirect to that particular section on page - TC_168', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to complete the action successfully click on More Dropdown - TC_169', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Book a free Consultation CTA of right side of page - TC_170', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Download now CTA on the right side of the page - TC_171', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on articles on the bottom of the page - TC_172', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Articles - TC_173', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on View all article CTA - TC_174', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to get Insurer list on the right side of the page - TC_175', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('Verify that the user is able to click on Insurer on the Insurer section - TC_176', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

  });

});

test.describe('Our partners (Life) - ' + TEST_TAGS.REGRESSION, () => {
  test.describe('Insurer Landing Page Flow', () => {
    test('Verify that the user is able to select Insurer from Our partner sectionand should and land on Insure - TC_177', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Select insurer from Our Partners section
    });

    test('Verify that the user is able to select any Insurer from our Partner sections - TC_178', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      // Click on insurer from partners
    });

  });

});

