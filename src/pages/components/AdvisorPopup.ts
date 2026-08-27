import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { SELECTORS } from '@config/constants';
import { TIMEOUTS } from '@config/constants';

export class AdvisorPopup extends BasePage {
  readonly container: Locator;
  readonly pincodeInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.locator(SELECTORS.ADVISOR_POPUP.CONTAINER);
    this.pincodeInput = page.locator(SELECTORS.ADVISOR_POPUP.PINCODE_INPUT);
    this.submitButton = page.locator(SELECTORS.ADVISOR_POPUP.SUBMIT_BUTTON);
    this.closeButton = page.locator(SELECTORS.ADVISOR_POPUP.CLOSE_BUTTON);
  }

  async waitForVisible(timeout: number = TIMEOUTS.MEDIUM) {
    await this.waitForElement(this.container, timeout);
  }

  async isPopupVisible(): Promise<boolean> {
    return await this.isVisible(this.container);
  }

  async enterPincode(pincode: string) {
    await this.waitForElement(this.pincodeInput);
    await this.fill(this.pincodeInput, pincode);
  }

  async getPincodeValue(): Promise<string> {
    return await this.pincodeInput.inputValue();
  }

  async verifySubmitDisabled() {
    await expect(this.submitButton).toBeDisabled({ timeout: TIMEOUTS.SHORT });
  }

  async verifySubmitEnabled() {
    await expect(this.submitButton).toBeEnabled({ timeout: TIMEOUTS.SHORT });
  }

  async clickSubmit() {
    await this.click(this.submitButton);
    await this.waitForLoad();
  }

  async close() {
    if (await this.isVisible(this.closeButton)) {
      await this.click(this.closeButton);
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(300);
  }

  async verifyValidationMessage(message: string) {
    const validationMsg = this.page.locator(SELECTORS.HOME_PAGE.VALIDATION_MESSAGE);
    await this.waitForElement(validationMsg);
    await this.expectContainText(validationMsg, message);
  }

  async waitForAdvisorListing() {
    await this.page.waitForURL(/\/find-advisor/, { timeout: TIMEOUTS.LONG });
  }
}