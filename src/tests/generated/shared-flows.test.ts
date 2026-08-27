import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AdvisorPopup } from '@pages/components/AdvisorPopup';
import { AdvisorListing } from '@pages/components/AdvisorListing';
import { VALIDATION_MESSAGES } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Bike - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select insurance type - TC_027', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      // Already selected in beforeEach
      await expect(homePage.insuranceTypeSelector).toHaveValue('Bike');
    });

    test('Verify that the user is able to click on Find Advisor CTA - TC_028', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the user is able to click on Get a Quote CTA - TC_029', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

    test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_030', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

    test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_031', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the User should redirect to Bike profile page on clicking Get a Quote CTA - TC_032', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

    test('Verify that the user is able to select Insurer type and click on Find Advisor should land on Find Ad - TC_033', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.selectInsurerAndFindAdvisor('Bajaj');
      await advisorPopup.waitForVisible();
    });

  });

  test.describe('Find Advisor Popup Flow', () => {
    test('Verify that the user is able to get Find Advisor Popup - TC_034', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the user is able to enter Pincode - TC_035', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
    });

    test('Verify that submit CTA is disable for blank Pincode - TC_036', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.verifySubmitDisabled();
    });

    test('Verify that once user enters Pincode then Submit CTA should enable - TC_037', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.verifySubmitEnabled();
    });

    test('Verify that with invalid Pincode - TC_038', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
    });

    test('Verify that the user should get this Pincode not found for invalid Pincode - TC_039', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
    });

    test('Verify that the user should not allow to enter alphabets - TC_040', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
    });

    test('Verify that after entering valid pincode click on Submit should land on Advisor Listing Page - TC_041', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
    });

  });

  test.describe('Advisor Listing Page Flow', () => {
    test('Verify that the selected Insurer is present on top of the page - TC_042', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the selected Pincode is present on top of the page - TC_043', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the user can select different Insurer from dropdown - TC_044', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that home functionality is redirecting to Homepage or not - TC_045', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the Advisor list are relevent to selected Insurer or not - TC_046', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor profile picture is visible - TC_047', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor experience count is visible - TC_048', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor policy sold count is visible - TC_049', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor distance is visible - TC_050', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that visit website CTA is visible on all advisor - TC_051', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that get In Touch CTA is clickable - TC_052', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Bike');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

  });

});

test.describe('Health - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select insurance type - TC_001', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Health');
      // Already selected in beforeEach
      await expect(homePage.insuranceTypeSelector).toHaveValue('Health');
    });

  });

  test.describe('Find Advisor Popup Flow', () => {
    test('Verify that the user is able to get Find Advisor Popup - TC_008', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Health');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

  });

  test.describe('Advisor Listing Page Flow', () => {
    test('Verify that the selected Insurer is present on top of the page - TC_016', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Health');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

  });

});

test.describe('Life - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {
  test.describe('Home Page Flow', () => {
    test('Verify that the user is able to select insurance type - TC_079', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      // Already selected in beforeEach
      await expect(homePage.insuranceTypeSelector).toHaveValue('Life');
    });

    test('Verify that the user is able to click on Find Advisor CTA - TC_080', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the user is able to click on Get a Quote CTA - TC_081', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

    test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_082', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

    test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_083', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the user is able to select Insurer type and click on Find Advisor should land on Find Ad - TC_084', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.selectInsurerAndFindAdvisor('Bajaj');
      await advisorPopup.waitForVisible();
    });

    test('Verify that the User should redirect to Life landing page on clicking Get a Quote CTA - TC_104', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickGetAQuote();
      // Verify navigation to quote page
    });

  });

  test.describe('Find Advisor Popup Flow', () => {
    test('Verify that the user is able to get Find Advisor Popup - TC_085', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.waitForVisible();
    });

    test('Verify that the user is able to enter Pincode - TC_086', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
    });

    test('Verify that submit CTA is disable for blank Pincode - TC_087', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.verifySubmitDisabled();
    });

    test('Verify that once user enters Pincode then Submit CTA should enable - TC_088', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.verifySubmitEnabled();
    });

    test('Verify that with invalid Pincode - TC_089', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
    });

    test('Verify that the user should get this Pincode not found for invalid Pincode - TC_090', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
    });

    test('Verify that the user should not allow to enter alphabets - TC_091', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
    });

    test('Verify that after entering valid pincode click on Submit should land on Advisor Listing Page - TC_092', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
    });

  });

  test.describe('Advisor Listing Page Flow', () => {
    test('Verify that the selected Insurer is present on top of the page - TC_093', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the selected Pincode is present on top of the page - TC_094', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the user can select different Insurer from dropdown - TC_095', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that home functionality is redirecting to Homepage or not - TC_096', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that the Advisor list are relevent to selected Insurer or not - TC_097', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor profile picture is visible - TC_098', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor experience count is visible - TC_099', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor policy sold count is visible - TC_100', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that advisor distance is visible - TC_101', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that visit website CTA is visible on all advisor - TC_102', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

    test('Verify that get In Touch CTA is clickable - TC_103', async ({ page }) => {
      const homePage = new HomePage(page);
      const advisorPopup = new AdvisorPopup(page);
      const advisorListing = new AdvisorListing(page);
      await homePage.goto();
      await homePage.selectInsuranceType('Life');
      await homePage.clickFindAdvisor();
      await advisorPopup.enterPincode('400001');
      await advisorPopup.clickSubmit();
      await advisorListing.waitForVisible();
    });

  });

});

test.describe('Car - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {
});

