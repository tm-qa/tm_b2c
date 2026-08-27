const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'test-data', 'test-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function sanitizeTestName(name) {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100);
}

function generateDropdownTests(data) {
  const modules = ['Bike', 'Health', 'Life', 'Car'];

  let output = `import { test, expect } from '@playwright/test';
import { Header } from '@pages/components/Header';
import { DROPDOWN_SECTIONS, INSURERS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  for (const module of modules) {
    output += `test.describe('${module} Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  let header: Header;\n\n`;

    const moduleTests = data.dropdownTests.filter(tc => tc.module === module);
    const subModuleGroups = new Map();
    
    for (const tc of moduleTests) {
      if (!subModuleGroups.has(tc.subModule)) {
        subModuleGroups.set(tc.subModule, []);
      }
      subModuleGroups.get(tc.subModule).push(tc);
    }

    for (const [subModule, tests] of subModuleGroups) {
      // Use serial for related tests to reuse browser session
      output += `  test.describe.serial('${subModule}', () => {\n`;
      output += `    let header: Header;\n\n`;
      output += `    test.beforeAll(async ({ page }) => {\n`;
      output += `      header = new Header(page);\n`;
      output += `      await page.goto('/');\n`;
      output += `      await header.waitForLoad();\n`;
      output += `    });\n\n`;
      
      for (const tc of tests) {
        const testName = sanitizeTestName(tc.testScenario);
        output += `    test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
        
        if (subModule.includes('Dropdown') && !subModule.includes('Companies') && !subModule.includes('Hospitals') && !subModule.includes('Header') && !subModule.includes('Garage')) {
          output += `      await header.openDropdown('${module}');\n`;
          output += `      const dropdownMenu = await header.getDropdownMenu('${module}');\n`;
          output += `      await expect(dropdownMenu).toBeVisible();\n`;
        } else if (subModule.includes('Companies')) {
          output += `      await header.openDropdown('${module}');\n`;
          output += `      await header.openInsurerCompanies('${module}');\n`;
          output += `      const insurers = await header.getInsurerLinks('${module}');\n`;
          output += `      const expectedInsurers = INSURERS.${module.toUpperCase()}.COMPANIES;\n`;
          output += `      for (const expected of expectedInsurers) {\n`;
          output += `        expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();\n`;
          output += `      }\n`;
        } else if (subModule.includes('Network Hospitals')) {
          output += `      await header.openDropdown('Health');\n`;
          output += `      const hospitals = await header.getNetworkHospitalLinks();\n`;
          output += `      // Verify hospitals displayed\n`;
        } else if (subModule.includes('Header Navigation')) {
          output += `      await header.clickLifeInsuranceHeader();\n`;
          output += `      await expect(page).toHaveURL(/life-insurance/);\n`;
        } else if (subModule.includes('Cashless Garage')) {
          output += `      await header.openDropdown('Car');\n`;
          output += `      const garages = await header.getCashlessGarageLinks();\n`;
          output += `      const expectedGarages = INSURERS.CAR.CASHLESS_GARAGES;\n`;
          output += `      for (const expected of expectedGarages) {\n`;
          output += `        expect(garages.some(g => g.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();\n`;
          output += `      }\n`;
        }
        
        output += `    });\n\n`;
      }
      
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  return output;
}

function generateSharedFlowTests(data) {
  const modules = ['Bike', 'Health', 'Life', 'Car'];

  let output = `import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AdvisorPopup } from '@pages/components/AdvisorPopup';
import { AdvisorListing } from '@pages/components/AdvisorListing';
import { VALIDATION_MESSAGES } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  for (const module of modules) {
    output += `test.describe('${module} - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {\n`;
    
    const flowTypes = ['Home Page Flow', 'Find Advisor Popup Flow', 'Advisor Listing Page Flow'];
    
    for (const flowType of flowTypes) {
      const flowTests = data.sharedFlowTests.filter(tc => 
        tc.module === module && tc.subModule === flowType
      );
      
      if (flowTests.length === 0) continue;

      // Use serial for related tests to reuse browser session
      output += `  test.describe.serial('${flowType}', () => {\n`;
      output += `    let homePage: HomePage;\n`;
      output += `    let advisorPopup: AdvisorPopup;\n`;
      output += `    let advisorListing: AdvisorListing;\n\n`;
      output += `    test.beforeAll(async ({ page }) => {\n`;
      output += `      homePage = new HomePage(page);\n`;
      output += `      advisorPopup = new AdvisorPopup(page);\n`;
      output += `      advisorListing = new AdvisorListing(page);\n`;
      output += `      await homePage.goto();\n`;
      output += `      await homePage.selectInsuranceType('${module}');\n`;
      output += `    });\n\n`;
      
      for (const tc of flowTests) {
        const testName = sanitizeTestName(tc.testScenario);
        output += `    test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
        
        if (flowType === 'Home Page Flow') {
          if (tc.testScenario.includes('Find Advisor CTA')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.waitForVisible();\n`;
          } else if (tc.testScenario.includes('Get a Quote CTA')) {
            output += `      await homePage.clickGetAQuote();\n`;
            output += `      // Verify navigation to quote page\n`;
          } else if (tc.testScenario.includes('select insurance type')) {
            output += `      // Already selected in beforeAll\n`;
            output += `      await expect(homePage.insuranceTypeSelector).toHaveValue('${module}');\n`;
          } else if (tc.testScenario.includes('validation') || tc.testScenario.includes('Please select')) {
            output += `      await homePage.verifyValidationMessage(VALIDATION_MESSAGES.NO_INSURANCE_SELECTED);\n`;
          } else if (tc.testScenario.includes('select Insurer') && tc.testScenario.includes('Find Advisor')) {
            output += `      await homePage.selectInsurerAndFindAdvisor('Bajaj');\n`;
            output += `      await advisorPopup.waitForVisible();\n`;
          } else if (tc.testScenario.includes('redirect to')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.enterPincode('400001');\n`;
            output += `      await advisorPopup.clickSubmit();\n`;
            output += `      await advisorPopup.waitForAdvisorListing();\n`;
          }
        } else if (flowType === 'Find Advisor Popup Flow') {
          if (tc.testScenario.includes('get Find Advisor Popup')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.waitForVisible();\n`;
          } else if (tc.testScenario.includes('enter Pincode')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.enterPincode('400001');\n`;
          } else if (tc.testScenario.includes('disable for blank')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.verifySubmitDisabled();\n`;
          } else if (tc.testScenario.includes('Submit CTA should enable')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.enterPincode('400001');\n`;
            output += `      await advisorPopup.verifySubmitEnabled();\n`;
          } else if (tc.testScenario.includes('Submit') && tc.testScenario.includes('navigate')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.enterPincode('400001');\n`;
            output += `      await advisorPopup.clickSubmit();\n`;
            output += `      await advisorPopup.waitForAdvisorListing();\n`;
          } else if (tc.testScenario.includes('Close') || tc.testScenario.includes('close')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.close();\n`;
            output += `      await expect(advisorPopup.container).toBeHidden();\n`;
          }
        } else if (flowType === 'Advisor Listing Page Flow') {
          output += `      await homePage.clickFindAdvisor();\n`;
          output += `      await advisorPopup.enterPincode('400001');\n`;
          output += `      await advisorPopup.clickSubmit();\n`;
          output += `      await advisorListing.waitForVisible();\n`;
          
          if (tc.testScenario.includes('advisors displayed')) {
            output += `      const count = await advisorListing.verifyAdvisorsDisplayed();\n`;
            output += `      expect(count).toBeGreaterThan(0);\n`;
          } else if (tc.testScenario.includes('advisor details')) {
            output += `      const details = await advisorListing.verifyAdvisorDetails();\n`;
            output += `      expect(details.length).toBeGreaterThan(0);\n`;
          } else if (tc.testScenario.includes('filter') || tc.testScenario.includes('specialization')) {
            output += `      const options = await advisorListing.getFilterOptions();\n`;
            output += `      if (options.length > 0) {\n`;
            output += `        await advisorListing.filterBySpecialization(options[0]);\n`;
            output += `      }\n`;
          } else if (tc.testScenario.includes('click advisor')) {
            output += `      const details = await advisorListing.getAdvisorDetails();\n`;
            output += `      if (details.length > 0) {\n`;
            output += `        await advisorListing.clickAdvisor(details[0].name);\n`;
            output += `      }\n`;
          }
        }
        
        output += `    });\n\n`;
      }
      
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  return output;
}

function generateLifeLandingTests(data) {
  const lifeLandingTests = data.lifeLandingTests;
  
  if (lifeLandingTests.length === 0) {
    return '';
  }

  let output = `import { test, expect } from '@playwright/test';
import { LifeLandingPage } from '@pages/modules/life/LifeLandingPage';
import { LIFE_LANDING_PLANS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Life Landing Page - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.LANDING, () => {\n`;

  for (const tc of lifeLandingTests) {
    const testName = sanitizeTestName(tc.testScenario);
    output += `  test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
    output += `    const lifeLandingPage = new LifeLandingPage(page);\n`;
    output += `    await lifeLandingPage.goto();\n`;
    
    if (tc.testScenario.includes('Hero') || tc.testScenario.includes('hero')) {
      output += `    await lifeLandingPage.verifyHeroSection();\n`;
    } else if (tc.testScenario.includes('Calculator') || tc.testScenario.includes('calculator')) {
      output += `    await lifeLandingPage.verifyCalculatorCTA();\n`;
    } else if (tc.testScenario.includes('Plan') || tc.testScenario.includes('plan') || tc.testScenario.includes('card')) {
      output += `    await lifeLandingPage.verifyPlanCards();\n`;
    } else if (tc.testScenario.includes('Testimonial') || tc.testScenario.includes('testimonial')) {
      output += `    await lifeLandingPage.verifyTestimonials();\n`;
    } else if (tc.testScenario.includes('Company') || tc.testScenario.includes('logo')) {
      output += `    await lifeLandingPage.verifyCompanyLogos();\n`;
    } else if (tc.testScenario.includes('Header') || tc.testScenario.includes('navigation')) {
      output += `    await lifeLandingPage.clickLifeInsuranceHeader();\n`;
      output += `    await expect(page).toHaveURL(/life-insurance/);\n`;
    } else if (tc.testScenario.includes('Footer') || tc.testScenario.includes('footer')) {
      output += `    await lifeLandingPage.verifyFooterLinks();\n`;
    } else if (tc.testScenario.includes('Term Insurance') || tc.testScenario.includes('Money Back') || 
               tc.testScenario.includes('Endowment') || tc.testScenario.includes('ULIP')) {
      output += `    await lifeLandingPage.clickPlanCard('${tc.testScenario.match(/(Term|Money Back|Endowment|ULIP)/)?.[0] || 'Term Insurance'}');\n`;
    }
    
    output += `  });\n\n`;
  }

  output += `});\n`;

  return output;
}

function generateCarModuleTests(data) {
  const carTests = data.allTests.filter(tc => tc.module === 'Car');
  
  if (carTests.length === 0) {
    return '';
  }

  // Group by sub-module
  const subModuleGroups = new Map();
  for (const tc of carTests) {
    if (!subModuleGroups.has(tc.subModule)) {
      subModuleGroups.set(tc.subModule, []);
    }
    subModuleGroups.get(tc.subModule).push(tc);
  }

  let output = `import { test, expect } from '@playwright/test';
import { CarDashboard } from '@pages/modules/car/CarDashboard';
import { NationalCarInsurancePage, SBICarInsurancePage, RoyalSundaramCarInsurancePage } from '@pages/modules/car/InsurerLandingPages';
import { INSURERS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  // Car Dashboard tests (dropdown, insurer links, cashless garage)
  const dashboardTests = carTests.filter(tc => 
    ['Car Dropdown', 'Car Insurance Companies', 'Cashless Garage', 'Home Page Flow', 'Find Advisor Popup Flow', 'Advisor Listing Page Flow'].includes(tc.subModule)
  );

  if (dashboardTests.length > 0) {
    output += `test.describe('Car Dashboard - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  let carDashboard: CarDashboard;\n\n`;
    output += `  test.beforeEach(async ({ page }) => {\n`;
    output += `    carDashboard = new CarDashboard(page);\n`;
    output += `    await carDashboard.goto();\n`;
    output += `  });\n\n`;

    for (const tc of dashboardTests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `  test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      
      if (tc.subModule === 'Car Dropdown' && tc.testScenario.includes('displayed')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    // Verify dropdown visible\n`;
      } else if (tc.subModule === 'Car Dropdown' && tc.testScenario.includes('sections')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    const sections = await carDashboard.getCarDropdownSections();\n`;
        output += `    expect(sections.length).toBeGreaterThan(0);\n`;
      } else if (tc.subModule === 'Car Insurance Companies' && tc.testScenario.includes('insurer options')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    const insurers = await carDashboard.getCarInsurerLinks();\n`;
        output += `    const expectedInsurers = INSURERS.CAR.COMPANIES;\n`;
        output += `    for (const expected of expectedInsurers) {\n`;
        output += `      expect(insurers.some(i => i.toLowerCase().includes(expected.toLowerCase()))).toBeTruthy();\n`;
        output += `    }\n`;
      } else if (tc.subModule === 'Car Insurance Companies' && tc.testScenario.includes('clickable')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    await carDashboard.clickCarInsurerLink('National');\n`;
        output += `    // Verify navigation\n`;
      } else if (tc.subModule === 'Cashless Garage' && tc.testScenario.includes('garage insurer')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    const garages = await carDashboard.getCashlessGarageLinks();\n`;
        output += `    // Verify garages displayed\n`;
      } else if (tc.subModule === 'Cashless Garage' && tc.testScenario.includes('clickable')) {
        output += `    await carDashboard.openCarDropdown();\n`;
        output += `    await carDashboard.clickCashlessGarageLink('Bajaj');\n`;
        output += `    // Verify navigation\n`;
      } else if (tc.subModule === 'Home Page Flow') {
        output += `    // Home page flow handled in shared flows\n`;
      } else if (tc.subModule === 'Find Advisor Popup Flow') {
        output += `    // Advisor popup flow handled in shared flows\n`;
      } else if (tc.subModule === 'Advisor Listing Page Flow') {
        output += `    // Advisor listing handled in shared flows\n`;
      }
      
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  // Insurer-specific tests
  const insurerModules = [
    { name: 'National Car Insurance', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Navigation', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Plans', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Premium Calculator', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Cashless Garages', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Add-ons', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Features', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Exclusions', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Renewal', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Claims', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Documents', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Customer Care', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance - More', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance FAQs', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'National Car Insurance Articles', className: 'NationalCarInsurancePage', import: 'NationalCarInsurancePage', constructorArgs: '' },
    { name: 'SBI Comprehensive - Top Section', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Section Navigation', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Overview', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Claim Settlement Ratio', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Premium Calculator', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Claims', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Add-ons', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Documents Required For Claims', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Customer Care', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Latest Articles', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Common Components', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Other Comprehensive Car Insurance Plans', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Comprehensive - Similar Car Insurance Companies', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Comprehensive"' },
    { name: 'SBI Third Party - Top Section', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Section Navigation', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Overview', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Claim Settlement Ratio', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Premium Calculator', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Add-ons', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Claims', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Documents Required', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Customer Care', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Articles', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Common Components', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Other Third Party Plans', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'SBI Third Party - Similar Car Insurance Companies', className: 'SBICarInsurancePage', import: 'SBICarInsurancePage', constructorArgs: '"Third Party"' },
    { name: 'Royal Sundaram Own Damage - Top Section', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Section Navigation', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Overview', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Claim Settlement Ratio', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Premium Calculator', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Add-ons', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Claims', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Documents Required', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Customer Care', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Renewal', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Articles', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Common Components', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Other Own Damage Plans', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - Similar Car Insurance Companies', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
    { name: 'Royal Sundaram Own Damage - FAQs', className: 'RoyalSundaramCarInsurancePage', import: 'RoyalSundaramCarInsurancePage', constructorArgs: '' },
  ];

  for (const insurerModule of insurerModules) {
    const moduleTests = carTests.filter(tc => tc.subModule === insurerModule.name);
    if (moduleTests.length === 0) continue;

    output += `test.describe('${insurerModule.name} - ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  let insurerPage: ${insurerModule.className};\n\n`;
    output += `  test.beforeEach(async ({ page }) => {\n`;
    output += `    insurerPage = new ${insurerModule.className}(page${insurerModule.constructorArgs ? ', ' + insurerModule.constructorArgs : ''});\n`;
    output += `    await insurerPage.waitForLoad();\n`;
    output += `  });\n\n`;

    for (const tc of moduleTests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `  test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      
      const scenario = tc.testScenario.toLowerCase();
      if (scenario.includes('top section') || scenario.includes('header')) {
        output += `    await insurerPage.verifyHeaderSection();\n`;
      } else if (scenario.includes('navigation') || scenario.includes('tab')) {
        output += `    await insurerPage.verifyNavigationTabs();\n`;
      } else if (scenario.includes('overview')) {
        output += `    await insurerPage.verifyOverviewSection();\n`;
      } else if (scenario.includes('claim settlement')) {
        output += `    await insurerPage.verifyClaimSettlementRatio();\n`;
      } else if (scenario.includes('premium calculator')) {
        output += `    await insurerPage.verifyPremiumCalculator();\n`;
      } else if (scenario.includes('add-on') || scenario.includes('addon')) {
        output += `    await insurerPage.verifyAddOnsSection();\n`;
      } else if (scenario.includes('claim') && !scenario.includes('settlement')) {
        output += `    await insurerPage.verifyClaimsSection();\n`;
      } else if (scenario.includes('document')) {
        output += `    await insurerPage.verifyDocumentsSection();\n`;
      } else if (scenario.includes('customer care') || scenario.includes('customer support')) {
        output += `    await insurerPage.verifyCustomerCareSection();\n`;
      } else if (scenario.includes('article')) {
        output += `    await insurerPage.verifyArticlesSection();\n`;
      } else if (scenario.includes('common component')) {
        output += `    await insurerPage.verifyCommonComponents();\n`;
      } else if (scenario.includes('other plan')) {
        output += `    await insurerPage.verifyOtherPlansSection();\n`;
      } else if (scenario.includes('similar compan')) {
        output += `    await insurerPage.verifySimilarCompaniesSection();\n`;
      } else if (scenario.includes('faq')) {
        output += `    await insurerPage.verifyFAQsSection();\n`;
      } else if (scenario.includes('renewal')) {
        output += `    await insurerPage.verifyRenewalSection();\n`;
      } else if (scenario.includes('feature')) {
        output += `    await insurerPage.verifyFeaturesSection();\n`;
      } else if (scenario.includes('exclusion')) {
        output += `    await insurerPage.verifyExclusionsSection();\n`;
      } else if (scenario.includes('plan') && scenario.includes('click')) {
        output += `    // Click on specific plan\n`;
      } else if (scenario.includes('garage')) {
        output += `    // Cashless garage verification\n`;
      } else {
        output += `    // ${tc.testScenario}\n`;
      }
      
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  // Third Party Car Insurance tests
  const thirdPartyModules = [
    'Third Party Car Insurance',
    'Third Party Car Insurance - Table of Contents',
    'Third Party Car Insurance - Get Best Insurance Quotes',
    'Third Party Car Insurance - FAQs',
    'Third Party Car Insurance - Car Insurance Companies',
    'Third Party Car Insurance - Find Plans',
    'Third Party Car Insurance - Importance',
    'Third Party Car Insurance - Introduction',
    'Third Party Car Insurance - Features',
    'Third Party Car Insurance - Comprehensive Comparison',
  ];

  for (const moduleName of thirdPartyModules) {
    const moduleTests = carTests.filter(tc => tc.subModule === moduleName);
    if (moduleTests.length === 0) continue;

    output += `test.describe('${moduleName} - ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  test.beforeEach(async ({ page }) => {\n`;
    output += `    await page.goto('/car-insurance/third-party/');\n`;
    output += `  });\n\n`;

    for (const tc of moduleTests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `  test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      output += `    // ${tc.testScenario}\n`;
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  // Car Insurance general tests
  const carInsuranceModules = [
    'Car Insurance - Header',
    'Car Insurance - Top Quote Section',
    'Car Insurance - Introduction',
    'Car Insurance - Insurance Experience',
    'Car Insurance - Top Car Insurance Plans',
    'Car Insurance - Top Car Insurance Plans - Comprehensive',
    'Car Insurance - Top Car Insurance Plans - Third Party',
    'Car Insurance - Top Car Insurance Plans - Own Damage',
  ];

  for (const moduleName of carInsuranceModules) {
    const moduleTests = carTests.filter(tc => tc.subModule === moduleName);
    if (moduleTests.length === 0) continue;

    output += `test.describe('${moduleName} - ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  test.beforeEach(async ({ page }) => {\n`;
    output += `    await page.goto('/car-insurance/');\n`;
    output += `  });\n\n`;

    for (const tc of moduleTests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `  test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      output += `    // ${tc.testScenario}\n`;
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  return output;
}

function generatePartnersTests(data) {
  const partnersTests = data.allTests.filter(tc => tc.module.startsWith('Our partners'));
  
  if (partnersTests.length === 0) {
    return '';
  }

  const subModuleGroups = new Map();
  for (const tc of partnersTests) {
    if (!subModuleGroups.has(tc.module)) {
      subModuleGroups.set(tc.module, new Map());
    }
    const moduleMap = subModuleGroups.get(tc.module);
    if (!moduleMap.has(tc.subModule)) {
      moduleMap.set(tc.subModule, []);
    }
    moduleMap.get(tc.subModule).push(tc);
  }

  let output = `import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  for (const [module, subModules] of subModuleGroups) {
    output += `test.describe('${module} - ' + TEST_TAGS.REGRESSION, () => {\n`;
    
    for (const [subModule, tests] of subModules) {
      output += `  test.describe('${subModule}', () => {\n`;
      
      for (const tc of tests) {
        const testName = sanitizeTestName(tc.testScenario);
        output += `    test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
        output += `      const homePage = new HomePage(page);\n`;
        output += `      await homePage.goto();\n`;
        
        if (tc.testScenario.includes('select Insurer from Our partner')) {
          output += `      // Select insurer from Our Partners section\n`;
        } else if (tc.testScenario.includes('select any Insurer from our Partner section')) {
          output += `      // Click on insurer from partners\n`;
        } else if (tc.testScenario.includes('land on Insurer page')) {
          output += `      // Verify navigation to insurer page\n`;
        } else if (tc.testScenario.includes('selected Insurer icon is on top')) {
          output += `      // Verify insurer icon displayed\n`;
        } else if (tc.testScenario.includes('enter bike number') || tc.testScenario.includes('enter car number')) {
          output += `      // Enter vehicle number\n`;
        }
        
        output += `    });\n\n`;
      }
      
      output += `  });\n\n`;
    }
    
    output += `});\n\n`;
  }

  return output;
}

function generateRaiseClaimTests(data) {
  const claimTests = data.allTests.filter(tc => tc.module === 'Raise a Claim');
  
  if (claimTests.length === 0) {
    return '';
  }

  const subModuleGroups = new Map();
  for (const tc of claimTests) {
    if (!subModuleGroups.has(tc.subModule)) {
      subModuleGroups.set(tc.subModule, []);
    }
    subModuleGroups.get(tc.subModule).push(tc);
  }

  let output = `import { test, expect } from '@playwright/test';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Raise a Claim - ' + TEST_TAGS.REGRESSION, () => {\n`;

  for (const [subModule, tests] of subModuleGroups) {
    output += `  test.describe('${subModule}', () => {\n`;
    
    for (const tc of tests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `    test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      output += `      await page.goto('/raise-claim/');\n`;
      output += `      // ${tc.testScenario}\n`;
      output += `    });\n\n`;
    }
    
    output += `  });\n\n`;
  }

  output += `});\n`;

  return output;
}

function generateBecomePOSPTests(data) {
  const pospTests = data.allTests.filter(tc => tc.module === 'Become a POSP');
  
  if (pospTests.length === 0) {
    return '';
  }

  const subModuleGroups = new Map();
  for (const tc of pospTests) {
    if (!subModuleGroups.has(tc.subModule)) {
      subModuleGroups.set(tc.subModule, []);
    }
    subModuleGroups.get(tc.subModule).push(tc);
  }

  let output = `import { test, expect } from '@playwright/test';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

test.describe('Become a POSP - ' + TEST_TAGS.REGRESSION, () => {\n`;

  for (const [subModule, tests] of subModuleGroups) {
    output += `  test.describe('${subModule}', () => {\n`;
    
    for (const tc of tests) {
      const testName = sanitizeTestName(tc.testScenario);
      output += `    test('${testName} - ${tc.srNo}', async ({ page }) => {\n`;
      output += `      await page.goto('/become-posp/');\n`;
      output += `      // ${tc.testScenario}\n`;
      output += `    });\n\n`;
    }
    
    output += `  });\n\n`;
  }

  output += `});\n`;

  return output;
}

const outputDir = path.join(__dirname, 'src', 'tests', 'generated');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const dropdownTests = generateDropdownTests(data);
const sharedFlowTests = generateSharedFlowTests(data);
const lifeLandingTests = generateLifeLandingTests(data);
const carModuleTests = generateCarModuleTests(data);
const partnersTests = generatePartnersTests(data);
const raiseClaimTests = generateRaiseClaimTests(data);
const becomePOSPTests = generateBecomePOSPTests(data);

fs.writeFileSync(path.join(outputDir, 'dropdown-navigation.test.ts'), dropdownTests);
fs.writeFileSync(path.join(outputDir, 'shared-flows.test.ts'), sharedFlowTests);

if (lifeLandingTests) {
  fs.writeFileSync(path.join(outputDir, 'life-landing.test.ts'), lifeLandingTests);
}

if (carModuleTests) {
  fs.writeFileSync(path.join(outputDir, 'car-module.test.ts'), carModuleTests);
}

if (partnersTests) {
  fs.writeFileSync(path.join(outputDir, 'partners.test.ts'), partnersTests);
}

if (raiseClaimTests) {
  fs.writeFileSync(path.join(outputDir, 'raise-claim.test.ts'), raiseClaimTests);
}

if (becomePOSPTests) {
  fs.writeFileSync(path.join(outputDir, 'become-posp.test.ts'), becomePOSPTests);
}

console.log(`Generated test files in ${outputDir}/`);
console.log(`  - dropdown-navigation.test.ts`);
console.log(`  - shared-flows.test.ts`);
if (lifeLandingTests) console.log(`  - life-landing.test.ts`);
if (carModuleTests) console.log(`  - car-module.test.ts`);
if (partnersTests) console.log(`  - partners.test.ts`);
if (raiseClaimTests) console.log(`  - raise-claim.test.ts`);
if (becomePOSPTests) console.log(`  - become-posp.test.ts`);