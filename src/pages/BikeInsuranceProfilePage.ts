import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class BikeInsuranceProfilePage extends BasePage {
  readonly registrationNumberInput: Locator;
  readonly newBikeToggle: Locator;
  readonly continueButton: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    super(page);
    this.registrationNumberInput = page.locator('input[name*="registration" i], input[id*="registration" i], input[placeholder*="registration" i]').first();
    this.newBikeToggle = page.getByText(/new bike|don't know/i).first();
    this.continueButton = page.getByRole('button', { name: /continue|proceed/i }).first();
    this.validationError = page.locator('[class*="error" i], [class*="invalid" i], [role="alert"]').first();
  }

  async enterRegistrationNumber(regNo: string) { await this.registrationNumberInput.fill(regNo); }
  async selectNewBikeFlow() { await this.newBikeToggle.click(); }
  async clickContinue() { await this.continueButton.click(); }
  async isValidationErrorShown() { return this.validationError.isVisible().catch(() => false); }
  async getValidationErrorText() { return (await this.validationError.textContent())?.trim() ?? ''; }
}
