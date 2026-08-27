import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class PersonalDetailsPage extends BasePage {
  readonly nameInput: Locator;
  readonly mobileInput: Locator;
  readonly emailInput: Locator;
  readonly pincodeInput: Locator;
  readonly getQuotesButton: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[name*="name" i]:not([name*="username" i])').first();
    this.mobileInput = page.locator('input[name*="mobile" i], input[type="tel"]').first();
    this.emailInput = page.locator('input[type="email"], input[name*="email" i]').first();
    this.pincodeInput = page.locator('input[name*="pincode" i], input[name*="pin" i]').first();
    this.getQuotesButton = page.getByRole('button', { name: /get quote/i }).first();
    this.termsCheckbox = page.locator('input[type="checkbox"]').first();
  }
  async enterName(value: string) { await this.nameInput.fill(value); }
  async enterMobile(value: string) { await this.mobileInput.fill(value); }
  async enterEmail(value: string) { await this.emailInput.fill(value); }
  async enterPincode(value: string) { await this.pincodeInput.fill(value); }
  async acceptTerms() { if (await this.termsCheckbox.count()) await this.termsCheckbox.check(); }
  async submitGetQuotes() { await this.getQuotesButton.click(); }
  async isGetQuotesButtonEnabled() { return this.getQuotesButton.isEnabled(); }
}
