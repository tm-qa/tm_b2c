import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { TIMEOUTS } from '@config/constants';

export class InsurerLandingPage extends BasePage {
  readonly pageTitle: Locator;
  readonly headerSection: Locator;
  readonly navigationTabs: Locator;
  readonly overviewSection: Locator;
  readonly claimSettlementRatio: Locator;
  readonly premiumCalculator: Locator;
  readonly addOnsSection: Locator;
  readonly claimsSection: Locator;
  readonly documentsSection: Locator;
  readonly customerCareSection: Locator;
  readonly articlesSection: Locator;
  readonly commonComponents: Locator;
  readonly otherPlansSection: Locator;
  readonly similarCompaniesSection: Locator;
  readonly faqsSection: Locator;
  readonly renewalSection: Locator;
  readonly featuresSection: Locator;
  readonly exclusionsSection: Locator;
  readonly addonsSection: Locator;

  constructor(page: Page, private insurerName: string) {
    super(page);
    this.pageTitle = page.locator('h1, .page-title, [data-testid="page-title"]').first();
    this.headerSection = page.locator('.header-section, .insurer-header, [data-testid="insurer-header"]').first();
    this.navigationTabs = page.locator('.nav-tabs, .section-navigation, [data-testid="section-nav"]');
    this.overviewSection = page.locator('#overview, .overview-section, [data-testid="overview"]');
    this.claimSettlementRatio = page.locator('#claim-settlement, .claim-settlement, [data-testid="claim-settlement"]');
    this.premiumCalculator = page.locator('#premium-calculator, .premium-calculator, [data-testid="premium-calculator"]');
    this.addOnsSection = page.locator('#addons, .addons-section, [data-testid="addons"]');
    this.claimsSection = page.locator('#claims, .claims-section, [data-testid="claims"]');
    this.documentsSection = page.locator('#documents, .documents-section, [data-testid="documents"]');
    this.customerCareSection = page.locator('#customer-care, .customer-care, [data-testid="customer-care"]');
    this.articlesSection = page.locator('#articles, .articles-section, [data-testid="articles"]');
    this.commonComponents = page.locator('.common-components, [data-testid="common-components"]');
    this.otherPlansSection = page.locator('.other-plans, [data-testid="other-plans"]');
    this.similarCompaniesSection = page.locator('.similar-companies, [data-testid="similar-companies"]');
    this.faqsSection = page.locator('#faqs, .faqs-section, [data-testid="faqs"]');
    this.renewalSection = page.locator('#renewal, .renewal-section, [data-testid="renewal"]');
    this.featuresSection = page.locator('#features, .features-section, [data-testid="features"]');
    this.exclusionsSection = page.locator('#exclusions, .exclusions-section, [data-testid="exclusions"]');
    this.addonsSection = page.locator('#addons, .addons-section, [data-testid="addons"]');
  }

  async waitForLoad() {
    await this.waitForElement(this.pageTitle, TIMEOUTS.MEDIUM);
  }

  async verifyInsurerTitle(expectedName: string) {
    const title = await this.pageTitle.textContent();
    if (!title?.toLowerCase().includes(expectedName.toLowerCase())) {
      throw new Error(`Page title doesn't contain "${expectedName}". Found: ${title}`);
    }
  }

  async verifyHeaderSection() {
    await this.expectVisible(this.headerSection);
  }

  async verifyNavigationTabs() {
    await this.expectVisible(this.navigationTabs.first());
    const tabs = await this.navigationTabs.all();
    if (tabs.length === 0) {
      throw new Error('No navigation tabs found');
    }
    return tabs.length;
  }

  async clickNavigationTab(tabName: string) {
    const tab = this.navigationTabs.locator(`:has-text("${tabName}")`).first();
    await this.click(tab);
    await this.waitForLoad();
  }

  async verifyOverviewSection() {
    await this.expectVisible(this.overviewSection);
    const content = await this.overviewSection.textContent();
    if (!content || content.trim().length < 10) {
      throw new Error('Overview section is empty');
    }
  }

  async verifyClaimSettlementRatio() {
    await this.expectVisible(this.claimSettlementRatio);
  }

  async verifyPremiumCalculator() {
    await this.expectVisible(this.premiumCalculator);
    const calculateBtn = this.premiumCalculator.locator('button:has-text("Calculate"), a:has-text("Calculate")').first();
    if (await calculateBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.click(calculateBtn);
      await this.waitForLoad();
    }
  }

  async verifyAddOnsSection() {
    await this.expectVisible(this.addOnsSection);
    const addons = await this.addOnsSection.locator('.addon-item, [data-testid="addon-item"]').all();
    if (addons.length === 0) {
      console.warn('No addon items found');
    }
    return addons.length;
  }

  async verifyClaimsSection() {
    await this.expectVisible(this.claimsSection);
  }

  async verifyDocumentsSection() {
    await this.expectVisible(this.documentsSection);
  }

  async verifyCustomerCareSection() {
    await this.expectVisible(this.customerCareSection);
  }

  async verifyArticlesSection() {
    await this.expectVisible(this.articlesSection);
    const articles = await this.articlesSection.locator('article, .article-item, [data-testid="article"]').all();
    return articles.length;
  }

  async verifyCommonComponents() {
    await this.expectVisible(this.commonComponents);
  }

  async verifyOtherPlansSection() {
    await this.expectVisible(this.otherPlansSection);
  }

  async verifySimilarCompaniesSection() {
    await this.expectVisible(this.similarCompaniesSection);
  }

  async verifyFAQsSection() {
    await this.expectVisible(this.faqsSection);
    const faqs = await this.faqsSection.locator('.faq-item, [data-testid="faq-item"]').all();
    return faqs.length;
  }

  async verifyRenewalSection() {
    await this.expectVisible(this.renewalSection);
  }

  async verifyFeaturesSection() {
    await this.expectVisible(this.featuresSection);
  }

  async verifyExclusionsSection() {
    await this.expectVisible(this.exclusionsSection);
  }

  async clickAddOn(addonName: string) {
    const addon = this.addOnsSection.locator(`:has-text("${addonName}")`).first();
    await this.click(addon);
    await this.waitForLoad();
  }

  async clickOtherPlan(planName: string) {
    const plan = this.otherPlansSection.locator(`:has-text("${planName}")`).first();
    await this.click(plan);
    await this.waitForLoad();
  }

  async clickSimilarCompany(companyName: string) {
    const company = this.similarCompaniesSection.locator(`:has-text("${companyName}")`).first();
    await this.click(company);
    await this.waitForLoad();
  }
}

export class NationalCarInsurancePage extends InsurerLandingPage {
  constructor(page: Page) {
    super(page, 'National Car Insurance');
  }
}

export class SBICarInsurancePage extends InsurerLandingPage {
  constructor(page: Page, private type: 'Comprehensive' | 'Third Party') {
    super(page, `SBI ${type} Car Insurance`);
  }
}

export class RoyalSundaramCarInsurancePage extends InsurerLandingPage {
  constructor(page: Page) {
    super(page, 'Royal Sundaram Own Damage Car Insurance');
  }
}