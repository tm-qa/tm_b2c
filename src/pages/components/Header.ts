import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { SELECTORS } from '@config/constants';
import { DROPDOWN_SECTIONS, INSURERS } from '@config/test-data';
import { TIMEOUTS } from '@config/constants';

export class Header extends BasePage {
  readonly carDropdown: Locator;
  readonly bikeDropdown: Locator;
  readonly healthDropdown: Locator;
  readonly lifeDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.carDropdown = page.locator(SELECTORS.HEADER.CAR_DROPDOWN);
    this.bikeDropdown = page.locator(SELECTORS.HEADER.BIKE_DROPDOWN);
    this.healthDropdown = page.locator(SELECTORS.HEADER.HEALTH_DROPDOWN);
    this.lifeDropdown = page.locator(SELECTORS.HEADER.LIFE_DROPDOWN);
  }

  async waitForLoad() {
    // Wait for at least one dropdown to be visible (more resilient)
    const dropdowns = [this.carDropdown, this.bikeDropdown, this.healthDropdown, this.lifeDropdown];
    for (const dropdown of dropdowns) {
      try {
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        return; // At least one dropdown is visible, page is loaded
      } catch {
        // Try next dropdown
      }
    }
    // If none found, try healing agent
    await this.waitForWithHealing('dropdown-menu');
  }

  async openDropdown(module: 'Car' | 'Bike' | 'Health' | 'Life') {
    const elementKey = `${module.toLowerCase()}-dropdown`;
    await this.healAndClick(elementKey, SELECTORS.HEADER[`${module.toUpperCase()}_DROPDOWN` as keyof typeof SELECTORS.HEADER]);
    await this.page.waitForTimeout(500);
  }

  async clickDropdown(module: 'Car' | 'Bike' | 'Health' | 'Life') {
    const elementKey = `${module.toLowerCase()}-dropdown`;
    await this.healAndClick(elementKey, SELECTORS.HEADER[`${module.toUpperCase()}_DROPDOWN` as keyof typeof SELECTORS.HEADER]);
    await this.page.waitForTimeout(500);
  }

  private getDropdownLocator(module: 'Car' | 'Bike' | 'Health' | 'Life'): Locator {
    switch (module) {
      case 'Car': return this.carDropdown;
      case 'Bike': return this.bikeDropdown;
      case 'Health': return this.healthDropdown;
      case 'Life': return this.lifeDropdown;
    }
  }

  async getDropdownMenu(module: 'Car' | 'Bike' | 'Health' | 'Life'): Promise<Locator> {
    await this.openDropdown(module);
    const result = await this.findElement('dropdown-menu');
    if (result.success && result.locator) {
      return result.locator;
    }
    // Fallback to constants
    return this.page.locator(SELECTORS.DROPDOWN.CONTAINER).first();
  }

  async getDropdownSections(module: 'Car' | 'Bike' | 'Health' | 'Life'): Promise<string[]> {
    const menu = await this.getDropdownMenu(module);
    const sections = menu.locator(SELECTORS.DROPDOWN.SECTION);
    return await this.getAllTexts(sections);
  }

  async verifyDropdownSections(module: 'Car' | 'Bike' | 'Health' | 'Life') {
    const actualSections = await this.getDropdownSections(module);
    const moduleKey = module.toUpperCase() as keyof typeof DROPDOWN_SECTIONS;
    const expectedSections = DROPDOWN_SECTIONS[moduleKey];
    
    for (const expected of expectedSections) {
      const found = actualSections.some(actual => 
        actual.toLowerCase().includes(expected.toLowerCase())
      );
      if (!found) {
        throw new Error(`Section "${expected}" not found in ${module} dropdown. Found: ${actualSections.join(', ')}`);
      }
    }
    return actualSections;
  }

  async openInsurerCompanies(module: 'Car' | 'Bike' | 'Health' | 'Life') {
    const menu = await this.getDropdownMenu(module);
    const sectionName = module === 'Life' ? 'Life Insurance Companies' : `${module} Insurance Companies`;
    const section = menu.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: sectionName });
    await this.waitForElement(section);
    return section;
  }

  async getInsurerLinks(module: 'Car' | 'Bike' | 'Health' | 'Life'): Promise<string[]> {
    const section = await this.openInsurerCompanies(module);
    const links = section.locator(SELECTORS.DROPDOWN.INSURER_LINK);
    return await this.getAllTexts(links);
  }

  async verifyInsurerLinks(module: 'Car' | 'Bike' | 'Health' | 'Life') {
    const actualInsurers = await this.getInsurerLinks(module);
    const moduleKey = module.toUpperCase() as keyof typeof INSURERS;
    const expectedInsurers = INSURERS[moduleKey].COMPANIES;
    
    for (const expected of expectedInsurers) {
      const found = actualInsurers.some(actual => 
        actual.toLowerCase().includes(expected.toLowerCase())
      );
      if (!found) {
        throw new Error(`Insurer "${expected}" not found in ${module} dropdown. Found: ${actualInsurers.join(', ')}`);
      }
    }
    return actualInsurers;
  }

  async clickInsurerLink(module: 'Car' | 'Bike' | 'Health' | 'Life', insurerName: string) {
    const section = await this.openInsurerCompanies(module);
    const link = section.locator(SELECTORS.DROPDOWN.INSURER_LINK).filter({ hasText: insurerName });
    await this.click(link);
    await this.waitForLoad();
  }

  async clickCashlessGarageLink(module: 'Car', garageName: string) {
    await this.openDropdown('Car');
    const menu = this.page.locator(SELECTORS.DROPDOWN.CONTAINER);
    const section = menu.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: 'Cashless Garage' });
    const link = section.locator(SELECTORS.DROPDOWN.CASHLESS_GARAGE_LINK).filter({ hasText: garageName });
    await this.click(link);
    await this.waitForLoad();
  }

  async getCashlessGarageLinks(): Promise<string[]> {
    await this.openDropdown('Car');
    const menu = this.page.locator(SELECTORS.DROPDOWN.CONTAINER);
    const section = menu.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: 'Cashless Garage' });
    const links = section.locator(SELECTORS.DROPDOWN.CASHLESS_GARAGE_LINK);
    return await this.getAllTexts(links);
  }

  async clickNetworkHospitalLink(hospitalName: string) {
    await this.openDropdown('Health');
    const menu = this.page.locator(SELECTORS.DROPDOWN.CONTAINER);
    const section = menu.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: 'Network Hospitals' });
    const link = section.locator(SELECTORS.DROPDOWN.NETWORK_HOSPITAL_LINK).filter({ hasText: hospitalName });
    await this.click(link);
    await this.waitForLoad();
  }

  async getNetworkHospitalLinks(): Promise<string[]> {
    await this.openDropdown('Health');
    const menu = this.page.locator(SELECTORS.DROPDOWN.CONTAINER);
    const section = menu.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: 'Network Hospitals' });
    const links = section.locator(SELECTORS.DROPDOWN.NETWORK_HOSPITAL_LINK);
    return await this.getAllTexts(links);
  }

  async clickLifeInsuranceHeader() {
    const link = this.page.locator('[data-testid="life-insurance-header"], nav >> text="Life Insurance"').first();
    await this.click(link);
    await this.waitForLoad();
  }
}