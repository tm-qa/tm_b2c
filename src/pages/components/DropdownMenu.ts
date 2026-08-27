import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { SELECTORS } from '@config/constants';
import { TIMEOUTS } from '@config/constants';

export class DropdownMenu extends BasePage {
  readonly container: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.locator(SELECTORS.DROPDOWN.CONTAINER);
  }

  async waitForVisible(timeout: number = TIMEOUTS.MEDIUM) {
    await this.waitForElement(this.container, timeout);
  }

  async getSections(): Promise<string[]> {
    const sections = this.container.locator(SELECTORS.DROPDOWN.SECTION);
    return await this.getAllTexts(sections);
  }

  async getSectionLocator(sectionName: string): Promise<Locator> {
    return this.container.locator(SELECTORS.DROPDOWN.SECTION).filter({ hasText: sectionName });
  }

  async getInsurerLinks(sectionName: string): Promise<string[]> {
    const section = await this.getSectionLocator(sectionName);
    const links = section.locator(SELECTORS.DROPDOWN.INSURER_LINK);
    return await this.getAllTexts(links);
  }

  async getCashlessGarageLinks(): Promise<string[]> {
    const section = await this.getSectionLocator('Cashless Garage');
    const links = section.locator(SELECTORS.DROPDOWN.CASHLESS_GARAGE_LINK);
    return await this.getAllTexts(links);
  }

  async getNetworkHospitalLinks(): Promise<string[]> {
    const section = await this.getSectionLocator('Network Hospitals');
    const links = section.locator(SELECTORS.DROPDOWN.NETWORK_HOSPITAL_LINK);
    return await this.getAllTexts(links);
  }

  async clickLink(sectionName: string, linkText: string) {
    const section = await this.getSectionLocator(sectionName);
    const link = section.locator('a').filter({ hasText: linkText });
    await this.click(link);
    await this.waitForLoad();
  }

  async clickInsurerLink(sectionName: string, insurerName: string) {
    const section = await this.getSectionLocator(sectionName);
    const link = section.locator(SELECTORS.DROPDOWN.INSURER_LINK).filter({ hasText: insurerName });
    await this.click(link);
    await this.waitForLoad();
  }

  async isMenuVisible(): Promise<boolean> {
    return await this.isVisible(this.container);
  }

  async close() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }
}