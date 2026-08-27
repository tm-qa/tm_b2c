import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { SELECTORS } from '@config/constants';
import { TIMEOUTS } from '@config/constants';

export class AdvisorListing extends BasePage {
  readonly container: Locator;
  readonly advisorCards: Locator;
  readonly filterSpecialization: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.locator(SELECTORS.ADVISOR_LISTING.CONTAINER);
    this.advisorCards = page.locator(SELECTORS.ADVISOR_LISTING.ADVISOR_CARD);
    this.filterSpecialization = page.locator(SELECTORS.ADVISOR_LISTING.FILTER_SPECIALIZATION);
  }

  async waitForVisible(timeout: number = TIMEOUTS.LONG) {
    await this.waitForElement(this.container, timeout);
  }

  async verifyAdvisorsDisplayed(minCount: number = 1) {
    await this.waitForVisible();
    const count = await this.advisorCards.count();
    if (count < minCount) {
      throw new Error(`Expected at least ${minCount} advisor(s), found ${count}`);
    }
    return count;
  }

  async getAdvisorDetails(): Promise<Array<{ name: string; specialization: string; experience: string }>> {
    const cards = await this.advisorCards.all();
    const details = [];
    
    for (const card of cards) {
      const name = await card.locator('[data-testid="advisor-name"], .advisor-name, h3, h4').first().textContent();
      const specialization = await card.locator('[data-testid="advisor-specialization"], .advisor-specialization').first().textContent();
      const experience = await card.locator('[data-testid="advisor-experience"], .advisor-experience').first().textContent();
      
      details.push({
        name: name?.trim() || '',
        specialization: specialization?.trim() || '',
        experience: experience?.trim() || '',
      });
    }
    return details;
  }

  async verifyAdvisorDetails() {
    const details = await this.getAdvisorDetails();
    for (const advisor of details) {
      if (!advisor.name) {
        throw new Error('Advisor name not found');
      }
    }
    return details;
  }

  async filterBySpecialization(specialization: string) {
    await this.waitForElement(this.filterSpecialization);
    await this.selectOption(this.filterSpecialization, specialization);
    await this.waitForLoad();
  }

  async getFilterOptions(): Promise<string[]> {
    const options = await this.filterSpecialization.locator('option').all();
    const values = [];
    for (const option of options) {
      const value = await option.getAttribute('value');
      if (value) values.push(value);
    }
    return values;
  }

  async clickAdvisor(advisorName: string) {
    const card = this.advisorCards.filter({ hasText: advisorName }).first();
    await this.click(card);
    await this.waitForLoad();
  }
}