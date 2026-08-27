import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class VehicleDetailsPage extends BasePage {
  readonly makeDropdownTrigger: Locator;
  readonly modelDropdownTrigger: Locator;
  readonly variantDropdownTrigger: Locator;
  readonly manufactureYearDropdownTrigger: Locator;
  readonly previousInsurerDropdownTrigger: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.makeDropdownTrigger = page.locator('[id*="make" i], [name*="make" i]').first();
    this.modelDropdownTrigger = page.locator('[id*="model" i], [name*="model" i]').first();
    this.variantDropdownTrigger = page.locator('[id*="variant" i], [name*="variant" i]').first();
    this.manufactureYearDropdownTrigger = page.locator('[id*="year" i], [name*="year" i]').first();
    this.previousInsurerDropdownTrigger = page.locator('[id*="insurer" i], [name*="insurer" i]').first();
    this.continueButton = page.getByRole('button', { name: /continue/i }).first();
  }

  private async selectFromCustomDropdown(trigger: Locator, visibleText: string) {
    await trigger.click();
    await this.page.getByRole('option', { name: visibleText, exact: true }).or(
      this.page.locator('li, [role="option"]').filter({ hasText: visibleText }).first()
    ).click();
  }
  async selectMake(value: string) { await this.selectFromCustomDropdown(this.makeDropdownTrigger, value); }
  async selectModel(value: string) { await this.selectFromCustomDropdown(this.modelDropdownTrigger, value); }
  async selectVariant(value: string) { await this.selectFromCustomDropdown(this.variantDropdownTrigger, value); }
  async selectManufactureYear(value: string) { await this.selectFromCustomDropdown(this.manufactureYearDropdownTrigger, value); }
  async selectPreviousInsurer(value: string) { await this.selectFromCustomDropdown(this.previousInsurerDropdownTrigger, value); }
  async selectMakeNative(value: string) { await this.makeDropdownTrigger.selectOption({ label: value }); }
  async clickContinue() { await this.continueButton.click(); }
}
