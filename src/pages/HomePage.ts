import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { Header } from '@pages/components/Header';
import { AdvisorPopup } from '@pages/components/AdvisorPopup';
import { AdvisorListing } from '@pages/components/AdvisorListing';
import { Footer } from '@pages/components/Footer';
import { SELECTORS } from '@config/constants';
import { TIMEOUTS } from '@config/constants';

export class HomePage extends BasePage {
  readonly header: Header;
  readonly advisorPopup: AdvisorPopup;
  readonly advisorListing: AdvisorListing;
  readonly footer: Footer;
  readonly insuranceTypeSelector: Locator;
  readonly findAdvisorCTA: Locator;
  readonly getQuoteCTA: Locator;
  readonly insurerSelector: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.advisorPopup = new AdvisorPopup(page);
    this.advisorListing = new AdvisorListing(page);
    this.footer = new Footer(page);
    this.insuranceTypeSelector = page.locator(SELECTORS.HOME_PAGE.INSURANCE_TYPE_SELECTOR);
    this.findAdvisorCTA = page.locator(SELECTORS.HOME_PAGE.FIND_ADVISOR_CTA);
    this.getQuoteCTA = page.locator(SELECTORS.HOME_PAGE.GET_QUOTE_CTA);
    this.insurerSelector = page.locator(SELECTORS.HOME_PAGE.INSURER_SELECTOR);
  }

  async goto() {
    await super.goto('/');
    await this.header.waitForLoad();
  }

  async waitForLoad() {
    await this.waitForElement(this.insuranceTypeSelector);
    await this.waitForElement(this.findAdvisorCTA);
    await this.waitForElement(this.getQuoteCTA);
  }

  async selectInsuranceType(type: 'Car' | 'Bike' | 'Health' | 'Life') {
    await this.waitForElement(this.insuranceTypeSelector);
    await this.selectOption(this.insuranceTypeSelector, type);
    await this.page.waitForTimeout(500);
  }

  async clickFindAdvisor() {
    await this.waitForElement(this.findAdvisorCTA);
    await this.click(this.findAdvisorCTA);
    await this.advisorPopup.waitForVisible();
  }

  async clickGetAQuote() {
    await this.waitForElement(this.getQuoteCTA);
    await this.click(this.getQuoteCTA);
    await this.waitForLoad();
  }

  async selectInsurer(insurer: string) {
    await this.waitForElement(this.insurerSelector);
    await this.selectOption(this.insurerSelector, insurer);
  }

  async selectInsurerAndFindAdvisor(insurer: string) {
    await this.selectInsurer(insurer);
    await this.clickFindAdvisor();
  }

  async verifyValidationMessage(message: string) {
    const validationMsg = this.page.locator(SELECTORS.HOME_PAGE.VALIDATION_MESSAGE);
    await this.waitForElement(validationMsg);
    await this.expectContainText(validationMsg, message);
  }

  async verifyNoInsuranceValidation() {
    await this.verifyValidationMessage('Please select type of insurance');
  }

  async verifyAdvisorPopupOpens() {
    await this.advisorPopup.waitForVisible();
    return this.advisorPopup.isPopupVisible();
  }
}