import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { Header } from '@pages/components/Header';
import { DropdownMenu } from '@pages/components/DropdownMenu';
import { TIMEOUTS } from '@config/constants';

export class HealthDashboard extends BasePage {
  readonly header: Header;
  readonly dropdownMenu: DropdownMenu;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.dropdownMenu = new DropdownMenu(page);
  }

  async goto() {
    await super.goto('/');
    await this.header.waitForLoad();
  }

  async openHealthDropdown() {
    await this.header.openDropdown('Health');
    await this.dropdownMenu.waitForVisible();
  }

  async getHealthDropdownSections(): Promise<string[]> {
    await this.openHealthDropdown();
    return await this.dropdownMenu.getSections();
  }

  async getHealthInsurerLinks(): Promise<string[]> {
    await this.openHealthDropdown();
    return await this.dropdownMenu.getInsurerLinks('Health Insurance Companies');
  }

  async clickHealthInsurerLink(insurer: string) {
    await this.openHealthDropdown();
    await this.dropdownMenu.clickInsurerLink('Health Insurance Companies', insurer);
  }

  async getNetworkHospitalLinks(): Promise<string[]> {
    await this.openHealthDropdown();
    return await this.dropdownMenu.getNetworkHospitalLinks();
  }

  async clickNetworkHospitalLink(hospital: string) {
    await this.openHealthDropdown();
    await this.header.clickNetworkHospitalLink(hospital);
  }
}