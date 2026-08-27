import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { Header } from '@pages/components/Header';
import { TIMEOUTS } from '@config/constants';

export class CarDashboard extends BasePage {
  readonly header: Header;
  readonly carInsuranceLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.carInsuranceLink = page.locator('a:has-text("Car Insurance"), [href*="car-insurance"]').first();
  }

  async goto() {
    await super.goto('/');
    await this.header.waitForLoad();
  }

  async openCarDropdown() {
    await this.header.openDropdown('Car');
    await this.page.waitForTimeout(500);
  }

  async getCarDropdownSections(): Promise<string[]> {
    await this.openCarDropdown();
    return await this.header.getDropdownSections('Car');
  }

  async getCarInsurerLinks(): Promise<string[]> {
    await this.openCarDropdown();
    return await this.header.getInsurerLinks('Car');
  }

  async clickCarInsurerLink(insurer: string) {
    await this.openCarDropdown();
    await this.header.clickInsurerLink('Car', insurer);
  }

  async clickCashlessGarageLink(garage: string) {
    await this.openCarDropdown();
    await this.header.clickCashlessGarageLink('Car', garage);
  }

  async getCashlessGarageLinks(): Promise<string[]> {
    await this.openCarDropdown();
    return await this.header.getCashlessGarageLinks();
  }

  async clickCarInsuranceHeader() {
    await this.carInsuranceLink.click();
    await this.waitForLoad();
  }
}