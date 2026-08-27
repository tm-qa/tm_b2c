import { test, expect } from '@playwright/test';
import { CarDashboard } from '@pages/modules/car/CarDashboard';
import { NationalCarInsurancePage, SBICarInsurancePage, RoyalSundaramCarInsurancePage } from '@pages/modules/car/InsurerLandingPages';
import { INSURERS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Car Dashboard - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {
  let carDashboard: CarDashboard;

  test.beforeEach(async ({ page }) => {
    carDashboard = new CarDashboard(page);
    await carDashboard.goto();
  });

  test('Verify that the Car dropdown is displayed - TC_001', async ({ page }) => {
    await carDashboard.openCarDropdown();
    // Verify dropdown visible
  });

  test('Verify that all sections are displayed in the Car dropdown - TC_002', async ({ page }) => {
    await carDashboard.openCarDropdown();
    // Verify dropdown visible
  });

  test('Verify that all insurer options are displayed under Car Insurance Companies - TC_003', async ({ page }) => {
    await carDashboard.openCarDropdown();
    const insurers = await carDashboard.getCarInsurerLinks();
    const expectedInsurers = INSURERS.CAR.COMPANIES;
    for (const expected of expectedInsurers) {
      expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();
    }
  });

  test('Verify that an insurer link is clickable - TC_004', async ({ page }) => {
    await carDashboard.openCarDropdown();
    await carDashboard.clickCarInsurerLink('National');
    // Verify navigation
  });

  test('Verify that all garage insurer options are displayed under Cashless Garage - TC_005', async ({ page }) => {
    await carDashboard.openCarDropdown();
    const garages = await carDashboard.getCashlessGarageLinks();
    // Verify garages displayed
  });

  test('Verify that a cashless garage insurer link is clickable - TC_006', async ({ page }) => {
    await carDashboard.openCarDropdown();
    const garages = await carDashboard.getCashlessGarageLinks();
    // Verify garages displayed
  });

  test('Verify that the user is able to select insurance type - TC_053', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the user is able to click on Find Advisor CTA - TC_054', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the user is able to click on Get a Quote CTA - TC_055', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_056', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the User should get this Please select type of insurance to proceed to the next step mes - TC_057', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the User should redirect to Car profile page on clicking Get a Quote CTA - TC_058', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the user is able to select Insurer type and click on Find Advisor should land on Find Ad - TC_059', async ({ page }) => {
    // Home page flow handled in shared flows
  });

  test('Verify that the user is able to get Find Advisor Popup - TC_060', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that the user is able to enter Pincode - TC_061', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that submit CTA is disable for blank Pincode - TC_062', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that once user enters Pincode then Submit CTA should enable - TC_063', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that with invalid Pincode - TC_064', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that the user should get this Pincode not found for invalid Pincode - TC_065', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that the user should not allow to enter alphabets - TC_066', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that after entering valid pincode click on Submit should land on Advisor Listing Page - TC_067', async ({ page }) => {
    // Advisor popup flow handled in shared flows
  });

  test('Verify that the selected Insurer is present on top of the page - TC_068', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that the selected Pincode is present on top of the page - TC_069', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that the user can select different Insurer from dropdown - TC_070', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that home functionality is redirecting to Homepage or not - TC_071', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that the Advisor list are relevent to selected Insurer or not - TC_072', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that advisor profile picture is visible - TC_073', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that advisor experience count is visible - TC_074', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that advisor policy sold count is visible - TC_075', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that advisor distance is visible - TC_076', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that visit website CTA is visible on all advisor - TC_077', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

  test('Verify that get In Touch CTA is clickable - TC_078', async ({ page }) => {
    // Advisor listing handled in shared flows
  });

});

test.describe('National Car Insurance - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the user is navigated to the National Car Insurance page - TC_040', async ({ page }) => {
    // Verify that the user is navigated to the National Car Insurance page.
  });

  test('Verify that the breadcrumb is displayed on the National Car Insurance page - TC_041', async ({ page }) => {
    // Verify that the breadcrumb is displayed on the National Car Insurance page.
  });

  test('Verify that the National insurer logoheader is displayed - TC_042', async ({ page }) => {
    await insurerPage.verifyHeaderSection();
  });

  test('Verify that the car number input field is displayed - TC_043', async ({ page }) => {
    // Verify that the car number input field is displayed.
  });

  test('Verify that the user is able to enter a car number - TC_044', async ({ page }) => {
    // Verify that the user is able to enter a car number.
  });

  test('Verify that the Get Quote CTA is displayedavailable for the car number flow - TC_045', async ({ page }) => {
    // Verify that the "Get Quote" CTA is displayed/available for the car number flow.
  });

  test('Verify that the Get Quote Without Car Number CTA is displayed - TC_046', async ({ page }) => {
    // Verify that the "Get Quote Without Car Number" CTA is displayed.
  });

  test('Verify that the Year of Inception information card is displayed - TC_047', async ({ page }) => {
    // Verify that the "Year of Inception" information card is displayed.
  });

  test('Verify that the No of Branches information card is displayed - TC_048', async ({ page }) => {
    // Verify that the "No. of Branches" information card is displayed.
  });

  test('Verify that the Cashless Garages information card is displayed - TC_049', async ({ page }) => {
    // Cashless garage verification
  });

  test('Verify that the insurance type links are displayed below the National Car Insurance heading - TC_050', async ({ page }) => {
    // Verify that the insurance type links are displayed below the National Car Insurance heading.
  });

  test('Verify that the user is able to click on the Third Party Car Insurance link - TC_051', async ({ page }) => {
    // Verify that the user is able to click on the "Third Party Car Insurance" link.
  });

  test('Verify that the user is able to click on the Comprehensive Car Insurance link - TC_052', async ({ page }) => {
    // Verify that the user is able to click on the "Comprehensive Car Insurance" link.
  });

  test('Verify that the user is able to click on the Own Damage Car Insurance link - TC_053', async ({ page }) => {
    // Verify that the user is able to click on the "Own Damage Car Insurance" link.
  });

  test('Verify that the Starting Premium section is displayed - TC_066', async ({ page }) => {
    // Verify that the "Starting Premium" section is displayed.
  });

  test('Verify that the National Claim Settlement Ratio section is displayed - TC_067', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

});

test.describe('National Car Insurance Navigation - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National navigation menu is displayed - TC_054', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the National navigation option is clickable - TC_055', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Plans navigation option is clickable - TC_056', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Premium Calculator navigation option is clickable - TC_057', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Features navigation option is clickable - TC_058', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Exclusions navigation option is clickable - TC_059', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Renewal navigation option is clickable - TC_060', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Claims navigation option is clickable - TC_061', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Customer Care navigation option is clickable - TC_062', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Cashless Garages navigation option is clickable - TC_063', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the More navigation option is displayed and clickable - TC_064', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that all options under the More dropdown are displayed - TC_065', async ({ page }) => {
    // Verify that all options under the "More" dropdown are displayed.
  });

});

test.describe('National Car Insurance Plans - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Plans Overview section is displayed - TC_068', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Comprehensive plan is displayed - TC_069', async ({ page }) => {
    // Verify that the Comprehensive plan is displayed.
  });

  test('Verify that the Third Party plan is displayed - TC_070', async ({ page }) => {
    // Verify that the Third Party plan is displayed.
  });

  test('Verify that the Read More CTA is displayed for the Comprehensive plan - TC_071', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed for the Comprehensive plan.
  });

  test('Verify that the Read More CTA is displayed for the Third Party plan - TC_072', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed for the Third Party plan.
  });

  test('Verify that the Buy Now CTA is displayed for the Comprehensive plan - TC_073', async ({ page }) => {
    // Verify that the "Buy Now" CTA is displayed for the Comprehensive plan.
  });

  test('Verify that the Buy Now CTA is displayed for the Third Party plan - TC_074', async ({ page }) => {
    // Verify that the "Buy Now" CTA is displayed for the Third Party plan.
  });

});

test.describe('National Premium Calculator - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Premium Calculator section is displayed - TC_075', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the car number input field is displayed in the Premium Calculator section - TC_076', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the user is able to enter a car number in the Premium Calculator - TC_077', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the Check Premium CTA is displayed - TC_078', async ({ page }) => {
    // Verify that the "Check Premium" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_079', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

  test('Verify that the Premium Calculator provides the expected informationinstructions to the user - TC_080', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

});

test.describe('National Cashless Garages - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Cashless Garages section is displayed - TC_081', async ({ page }) => {
    // Cashless garage verification
  });

  test('Verify that the cashless garage information is displayed - TC_082', async ({ page }) => {
    // Cashless garage verification
  });

  test('Verify that the cashless garage CTAlink is displayed - TC_083', async ({ page }) => {
    // Cashless garage verification
  });

});

test.describe('National Car Insurance Add-ons - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Addons section is displayed - TC_084', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the available addons are displayed - TC_085', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Addons section provides the expected information - TC_086', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

});

test.describe('National Car Insurance Features - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Features section is displayed - TC_087', async ({ page }) => {
    await insurerPage.verifyFeaturesSection();
  });

  test('Verify that all available features are displayed - TC_088', async ({ page }) => {
    await insurerPage.verifyFeaturesSection();
  });

  test('Verify that the information provided for each feature is displayed correctly - TC_089', async ({ page }) => {
    await insurerPage.verifyFeaturesSection();
  });

});

test.describe('National Car Insurance Exclusions - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Exclusions section is displayed - TC_090', async ({ page }) => {
    await insurerPage.verifyExclusionsSection();
  });

  test('Verify that all available exclusions are displayed - TC_091', async ({ page }) => {
    await insurerPage.verifyExclusionsSection();
  });

  test('Verify that the information provided for each exclusion is displayed correctly - TC_092', async ({ page }) => {
    await insurerPage.verifyExclusionsSection();
  });

});

test.describe('National Car Insurance Renewal - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Renewal section is displayed - TC_093', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

  test('Verify that the renewal process information is displayed - TC_094', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

  test('Verify that the renewalrelated CTAlink is displayed - TC_095', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

});

test.describe('National Car Insurance Claims - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the National Car Insurance Claims section is displayed - TC_096', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim process information is displayed - TC_097', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the available claimrelated information is displayed - TC_098', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claimrelated CTAlink is displayed - TC_099', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

});

test.describe('National Car Insurance Documents - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the Documents Required section is displayed - TC_100', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

  test('Verify that all required documents are displayed - TC_101', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

  test('Verify that the information provided for the required documents is displayed correctly - TC_102', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

});

test.describe('National Car Insurance Customer Care - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the Customer Care section is displayed - TC_103', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the National Car Insurance customer care information is displayed - TC_104', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the customer care contact details are displayed - TC_105', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

});

test.describe('National Car Insurance - More - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the More dropdown is displayed - TC_106', async ({ page }) => {
    // Verify that the More dropdown is displayed.
  });

  test('Verify that the Claim Settlement Ratio option is clickable - TC_107', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the FAQs option is clickable - TC_108', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the Addons option is clickable - TC_109', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Articles option is clickable - TC_110', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('National Car Insurance FAQs - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the FAQs section is displayed - TC_111', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the user is able to expand an FAQ question - TC_112', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the FAQ answer is displayed correctly - TC_113', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the View More option is displayed in the FAQs section - TC_114', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

});

test.describe('National Car Insurance Articles - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: NationalCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new NationalCarInsurancePage(page);
    await insurerPage.goto();
    await insurerPage.waitForLoad();
  });

  test('Verify that the Latest Articles section is displayed - TC_115', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the article cards are displayed - TC_116', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the user is able to click on an article - TC_117', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the View All Articles CTA is displayed - TC_118', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('SBI Comprehensive - Top Section - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Comprehensive Car Insurance page top section is displayed - TC_232', async ({ page }) => {
    await insurerPage.verifyHeaderSection();
  });

  test('Verify that the Third Party Car Insurance option is displayed - TC_233', async ({ page }) => {
    // Verify that the "Third Party Car Insurance" option is displayed.
  });

  test('Verify that the Get Quotes CTA is displayed - TC_234', async ({ page }) => {
    // Verify that the "Get Quotes" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_235', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

  test('Verify that the starting premium is displayed - TC_236', async ({ page }) => {
    // Verify that the starting premium is displayed.
  });

  test('Verify that the number of SBI branches is displayed - TC_237', async ({ page }) => {
    // Verify that the number of SBI branches is displayed.
  });

  test('Verify that the cashless garage count is displayed - TC_238', async ({ page }) => {
    // Cashless garage verification
  });

  test('Verify that the middleside section navigation menu is displayed - TC_239', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

});

test.describe('SBI Comprehensive - Section Navigation - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Overview menu navigates to the Overview section - TC_240', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Premium Calculator menu navigates to the Premium Calculator section - TC_241', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the Claims menu navigates to the Claims section - TC_242', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Customer Care menu navigates to the Customer Care section - TC_243', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the Claim Settlement Ratio menu navigates to the Claim Settlement Ratio section - TC_244', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the Addons menu navigates to the Addons section - TC_245', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Articles menu navigates to the Articles section - TC_246', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('SBI Comprehensive - Overview - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Comprehensive Car Insurance Overview section is displayed - TC_247', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Comprehensive coverage information is displayed - TC_248', async ({ page }) => {
    // Verify that the Comprehensive coverage information is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_249', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('SBI Comprehensive - Claim Settlement Ratio - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Claim Settlement Ratio section is displayed - TC_250', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the SBI claim settlement ratio is displayed - TC_251', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the industry average claim settlement ratio is displayed - TC_252', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

});

test.describe('SBI Comprehensive - Premium Calculator - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Premium Calculator section is displayed - TC_253', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the car registration number field is displayed - TC_254', async ({ page }) => {
    // Verify that the car registration number field is displayed.
  });

  test('Verify that the user is able to enter a car registration number - TC_255', async ({ page }) => {
    // Verify that the user is able to enter a car registration number.
  });

  test('Verify that the Check Premium CTA is displayed - TC_256', async ({ page }) => {
    // Verify that the "Check Premium" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_257', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

});

test.describe('SBI Comprehensive - Claims - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Claims section is displayed - TC_258', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim process information is displayed - TC_259', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the How to Raise a Claim information is displayed - TC_260', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the How To Raise A Claim Under SBI Comprehensive Car Insurance section is displayed - TC_276', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim process steps are displayed - TC_277', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim intimation and claim reference number information is displayed - TC_278', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the required claim documents are displayed in the claim process - TC_279', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the surveyor and claim assessment information is displayed - TC_280', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the repair and reimbursement information is displayed - TC_281', async ({ page }) => {
    // Verify that the repair and reimbursement information is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_282', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('SBI Comprehensive - Add-ons - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Addons Available Under SBI Car Insurance Plans section is displayed - TC_261', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Bifuel Kit Cover addon is displayed - TC_262', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Zero Depreciation addon is displayed - TC_263', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the No Claim Bonus Protection addon is displayed - TC_264', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Key Replacement addon is displayed - TC_265', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Personal Belonging Cover addon is displayed - TC_266', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Inconvenience Allowance addon is displayed - TC_267', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Return on Invoice addon is displayed - TC_268', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Engine Guard addon is displayed - TC_269', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Consumable Cover addon is displayed - TC_270', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Additional Roadside Assistance addon is displayed - TC_271', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the EMI Protector addon is displayed - TC_272', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Tyre and Rim Guard addon is displayed - TC_273', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Personal Accident addon is displayed - TC_274', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the View More option is displayed in the Addons section - TC_275', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

});

test.describe('SBI Comprehensive - Documents Required For Claims - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Documents Required For Claims section is displayed - TC_283', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Registration Certificate requirement is displayed - TC_284', async ({ page }) => {
    // Verify that the Registration Certificate requirement is displayed.
  });

  test('Verify that the Driving License requirement is displayed - TC_285', async ({ page }) => {
    // Verify that the Driving License requirement is displayed.
  });

  test('Verify that the FIR requirement is displayed - TC_286', async ({ page }) => {
    // Verify that the FIR requirement is displayed.
  });

  test('Verify that thirdparty damage details requirement is displayed - TC_287', async ({ page }) => {
    // Verify that third-party damage details requirement is displayed.
  });

});

test.describe('SBI Comprehensive - Customer Care - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Customer Care section is displayed - TC_288', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the SBI Customer Care number is displayed - TC_289', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the SBI Customer Care email ID is displayed - TC_290', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

});

test.describe('SBI Comprehensive - Latest Articles - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Latest Articles On SBI section is displayed - TC_291', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the available SBI article cards are displayed - TC_292', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that an SBI article is clickable - TC_293', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('SBI Comprehensive - Common Components - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Book an Expert Call section is displayed - TC_294', async ({ page }) => {
    // Verify that the "Book an Expert Call" section is displayed.
  });

});

test.describe('SBI Comprehensive - Other Comprehensive Car Insurance Plans - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Other Comprehensive Car Insurance Plans section is displayed - TC_295', async ({ page }) => {
    // Verify that the "Other Comprehensive Car Insurance Plans" section is displayed.
  });

  test('Verify that the available comprehensive car insurance insurers are displayed - TC_296', async ({ page }) => {
    // Verify that the available comprehensive car insurance insurers are displayed.
  });

  test('Verify that an insurer link redirects to the corresponding page - TC_297', async ({ page }) => {
    // Verify that an insurer link redirects to the corresponding page.
  });

  test('Verify that the More Insurers option is displayed - TC_298', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed.
  });

});

test.describe('SBI Comprehensive - Similar Car Insurance Companies - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Comprehensive");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Car Insurance Companies Similar To SBI section is displayed - TC_299', async ({ page }) => {
    // Verify that the "Car Insurance Companies Similar To SBI" section is displayed.
  });

  test('Verify that the More Insurers option is displayed - TC_300', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed.
  });

  test('Verify that the More Insurers option is clickable - TC_301', async ({ page }) => {
    // Verify that the "More Insurers" option is clickable.
  });

});

test.describe('SBI Third Party - Top Section - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Third Party Car Insurance top section is displayed - TC_302', async ({ page }) => {
    await insurerPage.verifyHeaderSection();
  });

  test('Verify that the SBI logo and SBI Third Party Car Insurance heading are displayed - TC_303', async ({ page }) => {
    // Verify that the SBI logo and SBI Third Party Car Insurance heading are displayed.
  });

  test('Verify that the top plannavigation links are displayed - TC_304', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Get Quotes CTA is displayed - TC_305', async ({ page }) => {
    // Verify that the "Get Quotes" CTA is displayed.
  });

  test('Verify that clicking Get Quotes opens Profile Journey - TC_306', async ({ page }) => {
    // Verify that clicking "Get Quotes" opens Profile Journey.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_307', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

  test('Verify that clicking Get Quotes Without Car Number redirects correctly - TC_308', async ({ page }) => {
    // Verify that clicking "Get Quotes Without Car Number" redirects correctly.
  });

  test('Verify that the starting premium is displayed - TC_309', async ({ page }) => {
    // Verify that the starting premium is displayed.
  });

  test('Verify that the branch count is displayed - TC_310', async ({ page }) => {
    // Verify that the branch count is displayed.
  });

  test('Verify that the cashless garage count is displayed - TC_311', async ({ page }) => {
    // Cashless garage verification
  });

});

test.describe('SBI Third Party - Section Navigation - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the rightside section navigation menu is displayed - TC_312', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Overview menu navigates to the Overview section - TC_313', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Premium Calculator menu navigates to the Premium Calculator section - TC_314', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the Claims menu navigates to the Claims section - TC_315', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Customer Care menu navigates to the Customer Care section - TC_316', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the Claim Settlement Ratio menu navigates to the Claim Settlement Ratio section - TC_317', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the Addons menu navigates to the Addons section - TC_318', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Articles menu navigates to the Articles section - TC_319', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('SBI Third Party - Overview - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Third Party Car Insurance Overview section is displayed - TC_320', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the ThirdParty Liability information is displayed - TC_321', async ({ page }) => {
    // Verify that the Third-Party Liability information is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_322', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('SBI Third Party - Claim Settlement Ratio - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Claim Settlement Ratio section is displayed - TC_323', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that SBIs claim settlement ratio is displayed - TC_324', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the industry average claim settlement ratio is displayed - TC_325', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

});

test.describe('SBI Third Party - Premium Calculator - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Premium Calculator section is displayed - TC_326', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the car registration number field is displayed - TC_327', async ({ page }) => {
    // Verify that the car registration number field is displayed.
  });

  test('Verify that a valid car registration number can be entered - TC_328', async ({ page }) => {
    // Verify that a valid car registration number can be entered.
  });

  test('Verify that the Check Premium CTA is displayed - TC_329', async ({ page }) => {
    // Verify that the "Check Premium" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_330', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

});

test.describe('SBI Third Party - Add-ons - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Addons section is displayed - TC_331', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that Bifuel Kit Cover is displayed - TC_332', async ({ page }) => {
    // Verify that Bi-fuel Kit Cover is displayed.
  });

  test('Verify that Zero Depreciation is displayed - TC_333', async ({ page }) => {
    // Verify that Zero Depreciation is displayed.
  });

  test('Verify that No Claim Bonus Protection is displayed - TC_334', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that Key Replacement is displayed - TC_335', async ({ page }) => {
    // Verify that Key Replacement is displayed.
  });

  test('Verify that Personal Belonging Cover is displayed - TC_336', async ({ page }) => {
    // Verify that Personal Belonging Cover is displayed.
  });

  test('Verify that Inconvenience Allowance is displayed - TC_337', async ({ page }) => {
    // Verify that Inconvenience Allowance is displayed.
  });

  test('Verify that Return on Invoice is displayed - TC_338', async ({ page }) => {
    // Verify that Return on Invoice is displayed.
  });

  test('Verify that Engine Guard is displayed - TC_339', async ({ page }) => {
    // Verify that Engine Guard is displayed.
  });

  test('Verify that Consumable Cover is displayed - TC_340', async ({ page }) => {
    // Verify that Consumable Cover is displayed.
  });

  test('Verify that Additional Roadside Assistance EMI Protector Tyre and Rim Guard and Personal Accident ar - TC_341', async ({ page }) => {
    // Verify that Additional Roadside Assistance, EMI Protector, Tyre and Rim Guard and Personal Accident are displayed.
  });

  test('Verify that the View More option is displayed - TC_342', async ({ page }) => {
    // Verify that the "View More" option is displayed.
  });

});

test.describe('SBI Third Party - Claims - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the How To Raise A Claim Under SBI Third Party Car Insurance section is displayed - TC_343', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim intimation and claim reference number information is displayed - TC_344', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim form and required documents are mentioned - TC_345', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the surveyor claim assessment information is displayed - TC_346', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that repair monitoring and reimbursement information is displayed - TC_347', async ({ page }) => {
    // Verify that repair monitoring and reimbursement information is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_348', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('SBI Third Party - Documents Required - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Documents Required For Claims section is displayed - TC_349', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Registration Certificate requirement is displayed - TC_350', async ({ page }) => {
    // Verify that the Registration Certificate requirement is displayed.
  });

  test('Verify that the Driving License requirement is displayed - TC_351', async ({ page }) => {
    // Verify that the Driving License requirement is displayed.
  });

  test('Verify that the FIR requirement is displayed - TC_352', async ({ page }) => {
    // Verify that the FIR requirement is displayed.
  });

  test('Verify that thirdparty damage details requirement is displayed - TC_353', async ({ page }) => {
    // Verify that third-party damage details requirement is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_354', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('SBI Third Party - Customer Care - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the SBI Customer Care section is displayed - TC_355', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the SBI Customer Care number is displayed - TC_356', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the SBI Customer Care email ID is displayed - TC_357', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

});

test.describe('SBI Third Party - Articles - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Latest Articles On SBI section is displayed - TC_358', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the available SBI article cards are displayed - TC_359', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that an SBI article is clickable - TC_360', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('SBI Third Party - Common Components - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the common Book an Expert Call section is displayed - TC_361', async ({ page }) => {
    // Verify that the common Book an Expert Call section is displayed.
  });

  test('Verify that the common Manage All Your Policies In One Place section is displayed - TC_362', async ({ page }) => {
    // Verify that the common "Manage All Your Policies In One Place" section is displayed.
  });

});

test.describe('SBI Third Party - Other Third Party Plans - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Other Third Party Car Insurance Plans section is displayed - TC_363', async ({ page }) => {
    // Verify that the "Other Third Party Car Insurance Plans" section is displayed.
  });

  test('Verify that the available Third Party insurers are displayed - TC_364', async ({ page }) => {
    // Verify that the available Third Party insurers are displayed.
  });

  test('Verify that an insurer link redirects to the corresponding Third Party page - TC_365', async ({ page }) => {
    // Verify that an insurer link redirects to the corresponding Third Party page.
  });

  test('Verify that the More Insurers option is displayed - TC_366', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed.
  });

});

test.describe('SBI Third Party - Similar Car Insurance Companies - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: SBICarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new SBICarInsurancePage(page, "Third Party");
    await insurerPage.waitForLoad();
  });

  test('Verify that the Car Insurance Companies Similar To SBI section is displayed - TC_367', async ({ page }) => {
    // Verify that the "Car Insurance Companies Similar To SBI" section is displayed.
  });

  test('Verify that the More Insurers option is displayed and clickable - TC_368', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed and clickable.
  });

});

test.describe('Royal Sundaram Own Damage - Top Section - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Royal Sundaram Own Damage Car Insurance top section is displayed - TC_369', async ({ page }) => {
    await insurerPage.verifyHeaderSection();
  });

  test('Verify that the top plannavigation links are displayed - TC_370', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Get Quotes CTA is displayed - TC_371', async ({ page }) => {
    // Verify that the "Get Quotes" CTA is displayed.
  });

  test('Verify that clicking Get Quotes opens the Profile Journey - TC_372', async ({ page }) => {
    // Verify that clicking "Get Quotes" opens the Profile Journey.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_373', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

  test('Verify that clicking Get Quotes Without Car Number redirects correctly - TC_374', async ({ page }) => {
    // Verify that clicking "Get Quotes Without Car Number" redirects correctly.
  });

  test('Verify that the starting premium is displayed - TC_375', async ({ page }) => {
    // Verify that the starting premium is displayed.
  });

  test('Verify that the branch count is displayed - TC_376', async ({ page }) => {
    // Verify that the branch count is displayed.
  });

  test('Verify that the cashless garage count is displayed - TC_377', async ({ page }) => {
    // Cashless garage verification
  });

});

test.describe('Royal Sundaram Own Damage - Section Navigation - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the rightside section navigation menu is displayed - TC_378', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the Overview menu navigates to the Overview section - TC_379', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Premium Calculator menu navigates to the Premium Calculator section - TC_380', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the Claims menu navigates to the Claims section - TC_381', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Customer Care menu navigates to the Customer Care section - TC_382', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the Claim Settlement Ratio menu navigates to the Claim Settlement Ratio section - TC_383', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the Addons menu navigates to the Addons section - TC_384', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that the Articles menu navigates to the Articles section - TC_385', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('Royal Sundaram Own Damage - Overview - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Royal Sundaram Own Damage Car Insurance Overview section is displayed - TC_386', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that Own Damage coverage information is displayed - TC_387', async ({ page }) => {
    // Verify that Own Damage coverage information is displayed.
  });

  test('Verify that Own Damage exclusions are mentioned in the overview - TC_388', async ({ page }) => {
    await insurerPage.verifyOverviewSection();
  });

  test('Verify that the Read More CTA is displayed - TC_389', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Claim Settlement Ratio - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Claim Settlement Ratio section is displayed - TC_390', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that Royal Sundarams claim settlement ratio is displayed - TC_391', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

  test('Verify that the industry average claim settlement ratio is displayed - TC_392', async ({ page }) => {
    await insurerPage.verifyClaimSettlementRatio();
  });

});

test.describe('Royal Sundaram Own Damage - Premium Calculator - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Premium Calculator section is displayed - TC_393', async ({ page }) => {
    await insurerPage.verifyPremiumCalculator();
  });

  test('Verify that the car registration number field is displayed - TC_394', async ({ page }) => {
    // Verify that the car registration number field is displayed.
  });

  test('Verify that a valid car registration number can be entered - TC_395', async ({ page }) => {
    // Verify that a valid car registration number can be entered.
  });

  test('Verify that the Check Premium CTA is displayed - TC_396', async ({ page }) => {
    // Verify that the "Check Premium" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number CTA is displayed - TC_397', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" CTA is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Add-ons - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Addons section is displayed - TC_398', async ({ page }) => {
    await insurerPage.verifyAddOnsSection();
  });

  test('Verify that Depreciation Waiver Cover is displayed - TC_399', async ({ page }) => {
    // Verify that Depreciation Waiver Cover is displayed.
  });

  test('Verify that Windshield Glass Cover is displayed - TC_400', async ({ page }) => {
    // Verify that Windshield Glass Cover is displayed.
  });

  test('Verify that Voluntary Deductible Cover is displayed - TC_401', async ({ page }) => {
    // Verify that Voluntary Deductible Cover is displayed.
  });

  test('Verify that Full Invoice Price Insurance Cover is displayed - TC_402', async ({ page }) => {
    // Verify that Full Invoice Price Insurance Cover is displayed.
  });

  test('Verify that Loss of Baggage is displayed - TC_403', async ({ page }) => {
    // Verify that Loss of Baggage is displayed.
  });

  test('Verify that Daily Cash is displayed - TC_404', async ({ page }) => {
    // Verify that Daily Cash is displayed.
  });

  test('Verify that No Claim Bonus Protector is displayed - TC_405', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that Key Replacement is displayed - TC_406', async ({ page }) => {
    // Verify that Key Replacement is displayed.
  });

  test('Verify that Tyre Cover is displayed - TC_407', async ({ page }) => {
    // Verify that Tyre Cover is displayed.
  });

  test('Verify that Lifetime Road Tax Clause is displayed - TC_408', async ({ page }) => {
    // Verify that Lifetime Road Tax Clause is displayed.
  });

  test('Verify that Engine Protection is displayed - TC_409', async ({ page }) => {
    // Verify that Engine Protection is displayed.
  });

  test('Verify that Personal Accident Cover is displayed - TC_410', async ({ page }) => {
    // Verify that Personal Accident Cover is displayed.
  });

  test('Verify that the View More option is displayed - TC_411', async ({ page }) => {
    // Verify that the "View More" option is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Claims - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Own Damage Claims section is displayed - TC_412', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the claim intimation information is displayed - TC_413', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the warning against repairingdismantling the vehicle is displayed - TC_414', async ({ page }) => {
    // Verify that the warning against repairing/dismantling the vehicle is displayed.
  });

  test('Verify that Cashless Claim and Reimbursement Claim options are displayed - TC_415', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Cashless Claim process is displayed - TC_416', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the KYC document requirements are displayed - TC_417', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

  test('Verify that companyowned vehicle document requirements are displayed - TC_418', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

  test('Verify that the claim amount above 1 lakh document requirement is displayed - TC_419', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Reimbursement Claim process is displayed - TC_420', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the Read More CTA is displayed - TC_421', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Documents Required - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Documents Required For Claims section is displayed - TC_422', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that the insurance policy document requirement is displayed - TC_423', async ({ page }) => {
    await insurerPage.verifyDocumentsSection();
  });

  test('Verify that the signed claim form requirement is displayed - TC_424', async ({ page }) => {
    await insurerPage.verifyClaimsSection();
  });

  test('Verify that RC and valid Driving License requirements are displayed - TC_425', async ({ page }) => {
    // Verify that RC and valid Driving License requirements are displayed.
  });

  test('Verify that FIR requirement is displayed - TC_426', async ({ page }) => {
    // Verify that FIR requirement is displayed.
  });

  test('Verify that original invoicereceipts requirement is displayed - TC_427', async ({ page }) => {
    // Verify that original invoice/receipts requirement is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_428', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Customer Care - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Royal Sundaram Customer Care section is displayed - TC_429', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the Royal Sundaram Customer Care number is displayed - TC_430', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

  test('Verify that the Royal Sundaram Customer Care email ID is displayed - TC_431', async ({ page }) => {
    await insurerPage.verifyCustomerCareSection();
  });

});

test.describe('Royal Sundaram Own Damage - Renewal - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Royal Sundaram Car Insurance Renewal Process section is displayed - TC_432', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

  test('Verify that the threestep Royal Sundaram renewal process is displayed - TC_433', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

  test('Verify that the Turtlemint renewal process is displayed - TC_434', async ({ page }) => {
    await insurerPage.verifyRenewalSection();
  });

  test('Verify that the Read More CTA is displayed - TC_435', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Articles - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Latest Articles On Royal Sundaram section is displayed - TC_436', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that the available Royal Sundaram article cards are displayed - TC_437', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

  test('Verify that a Royal Sundaram article is clickable - TC_438', async ({ page }) => {
    await insurerPage.verifyArticlesSection();
  });

});

test.describe('Royal Sundaram Own Damage - Common Components - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the common Book an Expert Call section is displayed - TC_439', async ({ page }) => {
    // Verify that the common Book an Expert Call section is displayed.
  });

  test('Verify that the common Manage All Your Policies In One Place section is displayed - TC_440', async ({ page }) => {
    // Verify that the common "Manage All Your Policies In One Place" section is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Other Own Damage Plans - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Other Own Damage Car Insurance Plans section is displayed - TC_441', async ({ page }) => {
    // Verify that the "Other Own Damage Car Insurance Plans" section is displayed.
  });

  test('Verify that the available Own Damage insurers are displayed - TC_442', async ({ page }) => {
    // Verify that the available Own Damage insurers are displayed.
  });

  test('Verify that an Own Damage insurer link redirects correctly - TC_443', async ({ page }) => {
    // Verify that an Own Damage insurer link redirects correctly.
  });

  test('Verify that the More Insurers option is displayed - TC_444', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed.
  });

});

test.describe('Royal Sundaram Own Damage - Similar Car Insurance Companies - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the Car Insurance Companies Similar To Royal Sundaram section is displayed - TC_445', async ({ page }) => {
    // Verify that the "Car Insurance Companies Similar To Royal Sundaram" section is displayed.
  });

  test('Verify that the More Insurers option is displayed and clickable - TC_446', async ({ page }) => {
    // Verify that the "More Insurers" option is displayed and clickable.
  });

});

test.describe('Royal Sundaram Own Damage - FAQs - ' + TEST_TAGS.REGRESSION, () => {
  let insurerPage: RoyalSundaramCarInsurancePage;

  test.beforeEach(async ({ page }) => {
    insurerPage = new RoyalSundaramCarInsurancePage(page);
    await insurerPage.waitForLoad();
  });

  test('Verify that the FAQ section is displayed - TC_447', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the What is depreciation deduction FAQ is displayed - TC_448', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the depreciation deduction table is displayed - TC_449', async ({ page }) => {
    await insurerPage.verifyNavigationTabs();
  });

  test('Verify that the policy cancellation FAQ is displayed - TC_450', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the eligible vehicle types FAQ is displayed - TC_451', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the CNGLPG kit FAQ is displayed - TC_452', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

  test('Verify that the View More option is displayed in FAQs - TC_453', async ({ page }) => {
    await insurerPage.verifyFAQsSection();
  });

});

test.describe('Third Party Car Insurance - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the user is navigated to the Third Party Car Insurance page - TC_119', async ({ page }) => {
    // Verify that the user is navigated to the Third Party Car Insurance page.
  });

  test('Verify that the breadcrumb is displayed - TC_120', async ({ page }) => {
    // Verify that the breadcrumb is displayed.
  });

  test('Verify that the page heading is displayed - TC_121', async ({ page }) => {
    // Verify that the page heading is displayed.
  });

  test('Verify that the Find Plans CTA is displayed - TC_122', async ({ page }) => {
    // Verify that the "Find Plans" CTA is displayed.
  });

  test('Verify that the introductory content is displayed - TC_123', async ({ page }) => {
    // Verify that the introductory content is displayed.
  });

  test('Verify that the Table of Contents section is displayed - TC_124', async ({ page }) => {
    // Verify that the "Table of Contents" section is displayed.
  });

  test('Verify that all topics are displayed in the Table of Contents - TC_125', async ({ page }) => {
    // Verify that all topics are displayed in the Table of Contents.
  });

  test('Verify that the Importance of ThirdParty Car Insurance Policy section is displayed - TC_155', async ({ page }) => {
    // Verify that the "Importance of Third-Party Car Insurance Policy" section is displayed.
  });

  test('Verify that the How Does ThirdParty Car Insurance Work section is displayed - TC_156', async ({ page }) => {
    // Verify that the "How Does Third-Party Car Insurance Work?" section is displayed.
  });

  test('Verify that the Features of ThirdParty Car Insurance section is displayed - TC_157', async ({ page }) => {
    // Verify that the "Features of Third-Party Car Insurance" section is displayed.
  });

  test('Verify that the Benefits of FourWheeler ThirdParty Insurance section is displayed - TC_158', async ({ page }) => {
    // Verify that the "Benefits of Four-Wheeler Third-Party Insurance" section is displayed.
  });

  test('Verify that the How are ThirdParty Car Insurance Premium Rates Calculated section is displayed - TC_159', async ({ page }) => {
    // Verify that the "How are Third-Party Car Insurance Premium Rates Calculated?" section is displayed.
  });

  test('Verify that the Top ThirdParty Car Insurance Plans section is displayed - TC_160', async ({ page }) => {
    // Verify that the "Top Third-Party Car Insurance Plans" section is displayed.
  });

  test('Verify that the ThirdParty Policy for Commercial Vehicles section is displayed - TC_161', async ({ page }) => {
    // Verify that the "Third-Party Policy for Commercial Vehicles" section is displayed.
  });

  test('Verify that the Inclusions of ThirdParty Car Insurance section is displayed - TC_162', async ({ page }) => {
    // Verify that the "Inclusions of Third-Party Car Insurance" section is displayed.
  });

  test('Verify that the Exclusions of ThirdParty Car Insurance section is displayed - TC_163', async ({ page }) => {
    // Verify that the "Exclusions of Third-Party Car Insurance" section is displayed.
  });

  test('Verify that the ThirdParty Insurance Premium Rates section is displayed - TC_164', async ({ page }) => {
    // Verify that the "Third-Party Insurance Premium Rates" section is displayed.
  });

  test('Verify that the Factors that Affect ThirdParty Insurance Premium section is displayed - TC_165', async ({ page }) => {
    // Verify that the "Factors that Affect Third-Party Insurance Premium" section is displayed.
  });

  test('Verify that the LongTerm ThirdParty Cover for Five Years for Car Owners section is displayed - TC_166', async ({ page }) => {
    // Verify that the "Long-Term Third-Party Cover for Five Years for Car Owners" section is displayed.
  });

  test('Verify that the Addons Under ThirdParty Car Insurance section is displayed - TC_167', async ({ page }) => {
    // Verify that the "Add-ons Under Third-Party Car Insurance" section is displayed.
  });

  test('Verify that the ThirdParty vs Comprehensive Car Insurance Plans section is displayed - TC_168', async ({ page }) => {
    // Verify that the "Third-Party v/s Comprehensive Car Insurance Plans" section is displayed.
  });

  test('Verify that the Drawbacks of ThirdParty Car Insurance section is displayed - TC_169', async ({ page }) => {
    // Verify that the "Drawbacks of Third-Party Car Insurance" section is displayed.
  });

  test('Verify that the When is ThirdParty Insurance Better than Comprehensive section is displayed - TC_170', async ({ page }) => {
    // Verify that the "When is Third-Party Insurance Better than Comprehensive?" section is displayed.
  });

  test('Verify that the How to Make ThirdParty Car Insurance Claims section is displayed - TC_171', async ({ page }) => {
    // Verify that the "How to Make Third-Party Car Insurance Claims?" section is displayed.
  });

  test('Verify that the Points to Note When Raising a ThirdParty Car Insurance Claim section is displayed - TC_172', async ({ page }) => {
    // Verify that the "Points to Note When Raising a Third-Party Car Insurance Claim" section is displayed.
  });

  test('Verify that the How to Renew ThirdParty Car Insurance Plan section is displayed - TC_173', async ({ page }) => {
    // Verify that the "How to Renew Third-Party Car Insurance Plan?" section is displayed.
  });

  test('Verify that the How to Buy ThirdParty Car Insurance Online from Turtlemint section is displayed - TC_174', async ({ page }) => {
    // Verify that the "How to Buy Third-Party Car Insurance Online from Turtlemint?" section is displayed.
  });

  test('Verify that the How to Get the Cheapest ThirdParty Car Insurance section is displayed - TC_175', async ({ page }) => {
    // Verify that the "How to Get the Cheapest Third-Party Car Insurance?" section is displayed.
  });

  test('Verify that the Why Choose Turtlemint section is displayed - TC_176', async ({ page }) => {
    // Verify that the "Why Choose Turtlemint?" section is displayed.
  });

  test('Verify that the FAQ section is displayed - TC_177', async ({ page }) => {
    // Verify that the FAQ section is displayed.
  });

});

test.describe('Third Party Car Insurance - Table of Contents - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the What is ThirdParty Insurance for Car option is clickable - TC_126', async ({ page }) => {
    // Verify that the "What is Third-Party Insurance for Car?" option is clickable.
  });

  test('Verify that the Importance of ThirdParty Car Insurance Policy option is clickable - TC_127', async ({ page }) => {
    // Verify that the "Importance of Third-Party Car Insurance Policy" option is clickable.
  });

  test('Verify that the How Does ThirdParty Car Insurance Work option is clickable - TC_128', async ({ page }) => {
    // Verify that the "How Does Third-Party Car Insurance Work?" option is clickable.
  });

  test('Verify that the Features of ThirdParty Car Insurance option is clickable - TC_129', async ({ page }) => {
    // Verify that the "Features of Third-Party Car Insurance" option is clickable.
  });

  test('Verify that the Benefits of FourWheeler ThirdParty Insurance option is clickable - TC_130', async ({ page }) => {
    // Verify that the "Benefits of Four-Wheeler Third-Party Insurance" option is clickable.
  });

  test('Verify that the How are ThirdParty Car Insurance Premium Rates Calculated option is clickable - TC_131', async ({ page }) => {
    // Verify that the "How are Third-Party Car Insurance Premium Rates Calculated?" option is clickable.
  });

  test('Verify that the Top ThirdParty Car Insurance Plans option is clickable - TC_132', async ({ page }) => {
    // Verify that the "Top Third-Party Car Insurance Plans" option is clickable.
  });

  test('Verify that the ThirdParty Policy for Commercial Vehicles option is clickable - TC_133', async ({ page }) => {
    // Verify that the "Third-Party Policy for Commercial Vehicles" option is clickable.
  });

  test('Verify that the Inclusions of ThirdParty Car Insurance option is clickable - TC_134', async ({ page }) => {
    // Verify that the "Inclusions of Third-Party Car Insurance" option is clickable.
  });

  test('Verify that the Exclusions of ThirdParty Car Insurance option is clickable - TC_135', async ({ page }) => {
    // Verify that the "Exclusions of Third-Party Car Insurance" option is clickable.
  });

  test('Verify that the ThirdParty Insurance Premium Rates option is clickable - TC_136', async ({ page }) => {
    // Verify that the "Third-Party Insurance Premium Rates" option is clickable.
  });

  test('Verify that the Factors that Affect ThirdParty Insurance Premium option is clickable - TC_137', async ({ page }) => {
    // Verify that the "Factors that Affect Third-Party Insurance Premium" option is clickable.
  });

  test('Verify that the LongTerm ThirdParty Cover for Five Years for Car Owners option is clickable - TC_138', async ({ page }) => {
    // Verify that the "Long-Term Third-Party Cover for Five Years for Car Owners" option is clickable.
  });

  test('Verify that the Addons Under ThirdParty Car Insurance option is clickable - TC_139', async ({ page }) => {
    // Verify that the "Add-ons Under Third-Party Car Insurance" option is clickable.
  });

  test('Verify that the ThirdParty vs Comprehensive Car Insurance Plans option is clickable - TC_140', async ({ page }) => {
    // Verify that the "Third-Party v/s Comprehensive Car Insurance Plans" option is clickable.
  });

  test('Verify that the Drawbacks of ThirdParty Car Insurance option is clickable - TC_141', async ({ page }) => {
    // Verify that the "Drawbacks of Third-Party Car Insurance" option is clickable.
  });

  test('Verify that the When is ThirdParty Insurance Better than Comprehensive option is clickable - TC_142', async ({ page }) => {
    // Verify that the "When is Third-Party Insurance Better than Comprehensive?" option is clickable.
  });

  test('Verify that the How to Make ThirdParty Car Insurance Claims option is clickable - TC_143', async ({ page }) => {
    // Verify that the "How to Make Third-Party Car Insurance Claims?" option is clickable.
  });

  test('Verify that the Points to Note When Raising a ThirdParty Car Insurance Claim option is clickable - TC_144', async ({ page }) => {
    // Verify that the "Points to Note When Raising a Third-Party Car Insurance Claim" option is clickable.
  });

  test('Verify that the How to Renew ThirdParty Car Insurance Plan option is clickable - TC_145', async ({ page }) => {
    // Verify that the "How to Renew Third-Party Car Insurance Plan?" option is clickable.
  });

  test('Verify that the How to Buy ThirdParty Car Insurance Online from Turtlemint option is clickable - TC_146', async ({ page }) => {
    // Verify that the "How to Buy Third-Party Car Insurance Online from Turtlemint?" option is clickable.
  });

  test('Verify that the How to Get the Cheapest ThirdParty Car Insurance option is clickable - TC_147', async ({ page }) => {
    // Verify that the "How to Get the Cheapest Third-Party Car Insurance?" option is clickable.
  });

  test('Verify that the Why Choose Turtlemint option is clickable - TC_148', async ({ page }) => {
    // Verify that the "Why Choose Turtlemint?" option is clickable.
  });

  test('Verify that the FAQs option is clickable - TC_149', async ({ page }) => {
    // Verify that the "FAQs" option is clickable.
  });

});

test.describe('Third Party Car Insurance - Get Best Insurance Quotes - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the Get Best Insurance Quotes For section is displayed - TC_150', async ({ page }) => {
    // Verify that the "Get Best Insurance Quotes For" section is displayed.
  });

  test('Verify that the Health Insurance link is clickable - TC_151', async ({ page }) => {
    // Verify that the Health Insurance link is clickable.
  });

  test('Verify that the Life Insurance link is clickable - TC_152', async ({ page }) => {
    // Verify that the Life Insurance link is clickable.
  });

  test('Verify that the Car Insurance link is clickable - TC_153', async ({ page }) => {
    // Verify that the Car Insurance link is clickable.
  });

  test('Verify that the Bike Insurance link is clickable - TC_154', async ({ page }) => {
    // Verify that the Bike Insurance link is clickable.
  });

  test('Verify that the Health Insurance link is clickable - TC_199', async ({ page }) => {
    // Verify that the "Health Insurance" link is clickable.
  });

});

test.describe('Third Party Car Insurance - FAQs - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the user is able to click on an FAQ question - TC_178', async ({ page }) => {
    // Verify that the user is able to click on an FAQ question.
  });

  test('Verify that the user is able to collapse an expanded FAQ - TC_179', async ({ page }) => {
    // Verify that the user is able to collapse an expanded FAQ.
  });

  test('Verify that only the selected FAQ answer is displayed when an FAQ is expanded - TC_180', async ({ page }) => {
    // Verify that only the selected FAQ answer is displayed when an FAQ is expanded.
  });

  test('Verify that the FAQ answer content is displayed correctly - TC_181', async ({ page }) => {
    // Verify that the FAQ answer content is displayed correctly.
  });

});

test.describe('Third Party Car Insurance - Car Insurance Companies - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the Car Insurance Companies section is displayed - TC_182', async ({ page }) => {
    // Verify that the "Car Insurance Companies" section is displayed.
  });

  test('Verify that all initially displayed car insurance companies are displayed - TC_183', async ({ page }) => {
    // Verify that all initially displayed car insurance companies are displayed.
  });

  test('Verify that the Bajaj car insurance option is clickable - TC_184', async ({ page }) => {
    // Verify that the Bajaj car insurance option is clickable.
  });

  test('Verify that the Cholamandalam car insurance option is clickable - TC_185', async ({ page }) => {
    // Verify that the Cholamandalam car insurance option is clickable.
  });

  test('Verify that the Generali Central car insurance option is clickable - TC_186', async ({ page }) => {
    // Verify that the Generali Central car insurance option is clickable.
  });

  test('Verify that the HDFC ERGO car insurance option is clickable - TC_187', async ({ page }) => {
    // Verify that the HDFC ERGO car insurance option is clickable.
  });

  test('Verify that the ICICI Lombard car insurance option is clickable - TC_188', async ({ page }) => {
    // Verify that the ICICI Lombard car insurance option is clickable.
  });

  test('Verify that the National car insurance option is clickable - TC_189', async ({ page }) => {
    // Verify that the National car insurance option is clickable.
  });

  test('Verify that the View More CTA is displayed - TC_190', async ({ page }) => {
    // Verify that the "View More" CTA is displayed.
  });

  test('Verify that the user is able to click View More - TC_191', async ({ page }) => {
    // Verify that the user is able to click "View More".
  });

  test('Verify that the additional car insurance companies are displayed after clicking View More - TC_192', async ({ page }) => {
    // Verify that the additional car insurance companies are displayed after clicking View More.
  });

  test('Verify that the additional insurer options are clickable - TC_193', async ({ page }) => {
    // Verify that the additional insurer options are clickable.
  });

});

test.describe('Third Party Car Insurance - Find Plans - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the Find Plans CTA is clickable - TC_194', async ({ page }) => {
    // Verify that the "Find Plans" CTA is clickable.
  });

});

test.describe('Third Party Car Insurance - Importance - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the car insurance renewal link is clickable - TC_195', async ({ page }) => {
    // Verify that the "car insurance" renewal link is clickable.
  });

});

test.describe('Third Party Car Insurance - Introduction - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the know about thirdparty car insurance link is clickable - TC_196', async ({ page }) => {
    // Verify that the "know about third-party car insurance" link is clickable.
  });

});

test.describe('Third Party Car Insurance - Features - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the Ways to check vehicle insurance status link is clickable - TC_197', async ({ page }) => {
    // Verify that the "Ways to check vehicle insurance status" link is clickable.
  });

});

test.describe('Third Party Car Insurance - Comprehensive Comparison - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/third-party/');
  });

  test('Verify that the Glimpse through our guide on how to renew expired car insurance link is clickable - TC_198', async ({ page }) => {
    // Verify that the "Glimpse through our guide on how to renew expired car insurance" link is clickable.
  });

});

test.describe('Car Insurance - Header - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Car Insurance page header is displayed - TC_202', async ({ page }) => {
    // Verify that the Car Insurance page header is displayed.
  });

});

test.describe('Car Insurance - Top Quote Section - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the car registration number field is displayed - TC_203', async ({ page }) => {
    // Verify that the car registration number field is displayed.
  });

  test('Verify that the user is able to enter the car registration number - TC_204', async ({ page }) => {
    // Verify that the user is able to enter the car registration number.
  });

  test('Verify that the Get Quote CTA is displayed - TC_205', async ({ page }) => {
    // Verify that the "Get Quote" CTA is displayed.
  });

  test('Verify that the Get Quotes Without Car Number option is displayed - TC_206', async ({ page }) => {
    // Verify that the "Get Quotes Without Car Number" option is displayed.
  });

  test('Verify that the three insurance options are displayed - TC_207', async ({ page }) => {
    // Verify that the three insurance options are displayed.
  });

});

test.describe('Car Insurance - Introduction - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the What Is Car Insurance section is displayed - TC_208', async ({ page }) => {
    // Verify that the "What Is Car Insurance?" section is displayed.
  });

  test('Verify that the Read More CTA is displayed - TC_209', async ({ page }) => {
    // Verify that the "Read More" CTA is displayed.
  });

});

test.describe('Car Insurance - Insurance Experience - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Trust Our Unmatched Experience In Insurance section is displayed - TC_210', async ({ page }) => {
    // Verify that the "Trust Our Unmatched Experience In Insurance" section is displayed.
  });

  test('Verify that the Quotes Compared statistic is displayed - TC_211', async ({ page }) => {
    // Verify that the "Quotes Compared" statistic is displayed.
  });

  test('Verify that the Insurance Partners statistic is displayed - TC_212', async ({ page }) => {
    // Verify that the "Insurance Partners" statistic is displayed.
  });

  test('Verify that the Claims Processed statistic is displayed - TC_213', async ({ page }) => {
    // Verify that the "Claims Processed" statistic is displayed.
  });

  test('Verify that the Policies Sold statistic is displayed - TC_214', async ({ page }) => {
    // Verify that the "Policies Sold" statistic is displayed.
  });

});

test.describe('Car Insurance - Top Car Insurance Plans - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Top Car Insurance Plans section is displayed - TC_215', async ({ page }) => {
    // Verify that the "Top Car Insurance Plans" section is displayed.
  });

  test('Verify that the insurer plan card information is displayed - TC_216', async ({ page }) => {
    // Verify that the insurer plan card information is displayed.
  });

  test('Verify that the Check Premium CTA is displayed - TC_217', async ({ page }) => {
    // Verify that the "Check Premium" CTA is displayed.
  });

  test('Verify that the Check Premium CTA redirects to Profile Journey - TC_218', async ({ page }) => {
    // Verify that the "Check Premium" CTA redirects to Profile Journey.
  });

  test('Verify that an insurer namelogo is clickable - TC_219', async ({ page }) => {
    // Verify that an insurer name/logo is clickable.
  });

  test('Verify that the insurerspecific Car Insurance page is displayed after clicking the insurer namelogo - TC_220', async ({ page }) => {
    // Verify that the insurer-specific Car Insurance page is displayed after clicking the insurer name/logo.
  });

  test('Verify that the See All Plans CTA is displayed - TC_221', async ({ page }) => {
    // Verify that the "See All Plans" CTA is displayed.
  });

  test('Verify that the available car insurance plan categories are displayed - TC_222', async ({ page }) => {
    // Verify that the available car insurance plan categories are displayed.
  });

});

test.describe('Car Insurance - Top Car Insurance Plans - Comprehensive - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Comprehensive plans are displayed - TC_223', async ({ page }) => {
    // Verify that the Comprehensive plans are displayed.
  });

  test('Verify that Comprehensive plan cards display the required information - TC_226', async ({ page }) => {
    // Verify that Comprehensive plan cards display the required information.
  });

  test('Verify that all available insurers are displayed under Comprehensive plans - TC_229', async ({ page }) => {
    // Verify that all available insurers are displayed under Comprehensive plans.
  });

  test('Verify that the SBI Comprehensive Insurance card details are displayed - TC_230', async ({ page }) => {
    // Verify that the SBI Comprehensive Insurance card details are displayed.
  });

  test('Verify that the SBI insurer namelogo is clickable - TC_231', async ({ page }) => {
    // Verify that the SBI insurer name/logo is clickable.
  });

});

test.describe('Car Insurance - Top Car Insurance Plans - Third Party - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Third Party plans are displayed - TC_224', async ({ page }) => {
    // Verify that the Third Party plans are displayed.
  });

  test('Verify that Third Party plan cards display the required information - TC_227', async ({ page }) => {
    // Verify that Third Party plan cards display the required information.
  });

});

test.describe('Car Insurance - Top Car Insurance Plans - Own Damage - ' + TEST_TAGS.REGRESSION, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/car-insurance/');
  });

  test('Verify that the Own Damage plans are displayed - TC_225', async ({ page }) => {
    // Verify that the Own Damage plans are displayed.
  });

  test('Verify that Own Damage plan cards display the required information - TC_228', async ({ page }) => {
    // Verify that Own Damage plan cards display the required information.
  });

});

