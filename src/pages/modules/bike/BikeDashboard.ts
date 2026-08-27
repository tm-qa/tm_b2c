import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { Header } from '@pages/components/Header';
import { DropdownMenu } from '@pages/components/DropdownMenu';
import { TIMEOUTS } from '@config/constants';

export class BikeDashboard extends BasePage {
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

  async openBikeDropdown() {
    await this.header.openDropdown('Bike');
    await this.dropdownMenu.waitForVisible();
  }

  async getBikeDropdownSections(): Promise<string[]> {
    await this.openBikeDropdown();
    return await this.dropdownMenu.getSections();
  }

  async getBikeInsurerLinks(): Promise<string[]> {
    await this.openBikeDropdown();
    return await this.dropdownMenu.getInsurerLinks('Bike Insurance Companies');
  }

  async clickBikeInsurerLink(insurer: string) {
    await this.openBikeDropdown();
    await this.dropdownMenu.clickInsurerLink('Bike Insurance Companies', insurer);
  }
}