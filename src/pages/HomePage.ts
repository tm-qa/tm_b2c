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

  async isLogoDisplayed() {
    return this.page.locator('img[alt*="Turtlemint" i], header img').first().isVisible().catch(() => false);
  }

  async getPageTitle() { return this.page.title(); }
  async getCurrentUrl() { return this.page.url(); }
  async isFindAdvisorSectionPresent() {
    return this.page.getByText(/find nearby advisor/i).first().isVisible().catch(() => false);
  }
  async getStatsBlockCount() {
    return this.page.getByText(/trained insurance advisors|happy customers|policies sold/i).count();
  }
  async getDownloadAppLinkHref() {
    return this.page.locator('a[href*="onelink.me" i], a').filter({ hasText: /download turtlemint app/i }).first().getAttribute('href');
  }
  async clickRaiseClaim() {
    await this.page.getByRole('link', { name: /raise a claim/i }).first().click();
  }

  private async clickQuote(selector: string): Promise<Page> {
    const link = this.page.locator(selector).first();
    const popupPromise = this.page.waitForEvent('popup', { timeout: 3000 }).catch(() => null);
    await link.click();
    const popup = await popupPromise;
    const targetPage = popup ?? this.page;
    await targetPage.waitForLoadState('domcontentloaded').catch(() => undefined);
    return targetPage;
  }
  async clickBikeQuoteCta() { return this.clickQuote('a[href*="two-wheeler-insurance/two-wheeler-profile"]'); }
  async clickCarQuoteCta() { return this.clickQuote('a[href*="car-insurance/car-profile"]'); }
  async clickHealthQuoteCta() { return this.clickQuote('a[href*="health-insurance/health-profile"]'); }
  async clickTermQuoteCta() { return this.clickQuote('a[href*="life-insurance/profile/term"]'); }
}