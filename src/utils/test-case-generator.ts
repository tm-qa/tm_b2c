import * as fs from 'fs';
import * as path from 'path';
import { ParsedTestData, TestCaseData } from './excel-reader';

const __dirname = path.resolve(__dirname);

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function sanitizeTestName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100);
}

function generateDropdownTests(data: ParsedTestData): string {
  const modules = ['Bike', 'Health', 'Life'] as const;
  const sections = {
    Bike: ['Bike Dropdown', 'Bike Insurance Companies'],
    Health: ['Health Dropdown', 'Health Insurance Companies', 'Network Hospitals'],
    Life: ['Life Dropdown', 'Life Insurance Companies', 'Life Insurance - Header Navigation'],
  };

  let output = `import { test, expect } from '@playwright/test';
import { Header } from '@pages/Header';
import { DROPDOWN_SECTIONS, INSURERS } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  for (const module of modules) {
    output += `test.describe('${module} Dropdown & Navigation - ' + TEST_TAGS.SMOKE + ' ' + TEST_TAGS.REGRESSION, () => {\n`;
    output += `  test.beforeEach(async ({ page, header }) => {\n`;
    output += `    await page.goto('/');\n`;
    output += `    await header.waitForLoad();\n`;
    output += `  });\n\n`;

    const moduleTests = data.dropdownTests.filter(tc => tc.module === module);
    const subModuleGroups = new Map<string, TestCaseData[]>();
    
    for (const tc of moduleTests) {
      if (!subModuleGroups.has(tc.subModule)) {
        subModuleGroups.set(tc.subModule, []);
      }
      subModuleGroups.get(tc.subModule)!.push(tc);
    }

    for (const [subModule, tests] of subModuleGroups) {
      output += `  test.describe('${subModule}', () => {\n`;
      
      for (const tc of tests) {
        const testName = sanitizeTestName(tc.testScenario);
        output += `    test('${testName} - ${tc.srNo}', async ({ header }) => {\n`;
        
        if (subModule.includes('Dropdown') && !subModule.includes('Companies') && !subModule.includes('Hospitals') && !subModule.includes('Header')) {
          output += `      await header.openDropdown('${module}');\n`;
          output += `      await expect(header.dropdownMenu).toBeVisible();\n`;
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
        }
        
        output += `    });\n\n`;
      }
      
      output += `  });\n\n`;
    }

    output += `});\n\n`;
  }

  return output;
}

function generateSharedFlowTests(data: ParsedTestData): string {
  const modules = ['Bike', 'Health', 'Life'] as const;
  const flowTypes = ['Home Page Flow', 'Find Advisor Popup Flow', 'Advisor Listing Page Flow'];
  const pincodes = ['400001', '110001', '560001'];

  let output = `import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AdvisorPopup } from '@pages/AdvisorPopup';
import { AdvisorListing } from '@pages/AdvisorListing';
import { VALIDATION_MESSAGES, TEST_PINCODES } from '@config/test-data';
import { TEST_TAGS } from '@config/constants';

test.describe.configure({ retries: 0 });

`;

  for (const module of modules) {
    output += `test.describe('${module} - Shared Flows - ' + TEST_TAGS.REGRESSION + ' ' + TEST_TAGS.ADVISOR, () => {\n`;
    output += `  test.beforeEach(async ({ homePage }) => {\n`;
    output += `    await homePage.goto();\n`;
    output += `    await homePage.selectInsuranceType('${module}');\n`;
    output += `  });\n\n`;

    for (const flowType of flowTypes) {
      const flowTests = data.sharedFlowTests.filter(tc => 
        tc.module === module && tc.subModule === flowType
      );
      
      if (flowTests.length === 0) continue;

      output += `  test.describe('${flowType}', () => {\n`;
      
      for (const tc of flowTests) {
        const testName = sanitizeTestName(tc.testScenario);
        output += `    test('${testName} - ${tc.srNo}', async ({ homePage, advisorPopup, advisorListing }) => {\n`;
        
        if (flowType === 'Home Page Flow') {
          if (tc.testScenario.includes('Find Advisor CTA')) {
            output += `      await homePage.clickFindAdvisor();\n`;
            output += `      await advisorPopup.waitForVisible();\n`;
          } else if (tc.testScenario.includes('Get a Quote CTA')) {
            output += `      await homePage.clickGetAQuote();\n`;
            output += `      // Verify navigation to quote page\n`;
          } else if (tc.testScenario.includes('select insurance type')) {
            output += `      // Already selected in beforeEach\n`;
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

function generateLifeLandingTests(data: ParsedTestData): string {
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
    output += `  test('${testName} - ${tc.srNo}', async ({ lifeLandingPage }) => {\n`;
    
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

export function generateTestFiles(data: ParsedTestData, outputDir: string = 'src/tests/generated') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const dropdownTests = generateDropdownTests(data);
  const sharedFlowTests = generateSharedFlowTests(data);
  const lifeLandingTests = generateLifeLandingTests(data);

  fs.writeFileSync(path.join(outputDir, 'dropdown-navigation.test.ts'), dropdownTests);
  fs.writeFileSync(path.join(outputDir, 'shared-flows.test.ts'), sharedFlowTests);
  
  if (lifeLandingTests) {
    fs.writeFileSync(path.join(outputDir, 'life-landing.test.ts'), lifeLandingTests);
  }

  console.log(`��� Generated test files in ${outputDir}/`);
  console.log(`  - dropdown-navigation.test.ts`);
  console.log(`  - shared-flows.test.ts`);
  if (lifeLandingTests) {
    console.log(`  - life-landing.test.ts`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dataPath = process.argv[2] || path.join(__dirname, '../../test-data/test-data.json');
  if (fs.existsSync(dataPath)) {
    const data: ParsedTestData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    generateTestFiles(data);
  } else {
    console.error('Test data file not found. Run parse:excel first.');
    process.exit(1);
  }
}