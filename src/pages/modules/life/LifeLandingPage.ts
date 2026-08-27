import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { Header } from '@pages/components/Header';
import { SELECTORS } from '@config/constants';
import { LIFE_LANDING_PLANS } from '@config/test-data';
import { TIMEOUTS } from '@config/constants';

export class LifeLandingPage extends BasePage {
  readonly header: Header;
  readonly heroSection: Locator;
  readonly calculatorCTA: Locator;
  readonly planCards: Locator;
  readonly testimonials: Locator;
  readonly companyLogos: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.heroSection = page.locator(SELECTORS.LIFE_LANDING.HERO_SECTION);
    this.calculatorCTA = page.locator(SELECTORS.LIFE_LANDING.CALCULATOR_CTA);
    this.planCards = page.locator(SELECTORS.LIFE_LANDING.PLAN_CARDS);
    this.testimonials = page.locator(SELECTORS.LIFE_LANDING.TESTIMONIALS);
    this.companyLogos = page.locator(SELECTORS.LIFE_LANDING.COMPANY_LOGOS);
  }

  async goto() {
    await super.goto('/life-insurance/');
    await this.waitForLoad();
  }

  async waitForLoad() {
    await this.waitForElement(this.heroSection);
  }

  async verifyHeroSection() {
    await this.expectVisible(this.heroSection);
    const title = await this.heroSection.locator('h1').first().textContent();
    if (!title?.toLowerCase().includes('life insurance')) {
      throw new Error('Hero section does not contain Life Insurance title');
    }
  }

  async verifyCalculatorCTA() {
    await this.expectVisible(this.calculatorCTA);
    const href = await this.calculatorCTA.getAttribute('href');
    if (!href?.includes('calculator')) {
      throw new Error('Calculator CTA does not link to calculator');
    }
  }

  async clickCalculatorCTA() {
    await this.click(this.calculatorCTA);
    await this.waitForLoad();
  }

  async verifyPlanCards() {
    await this.expectVisible(this.planCards.first());
    const cards = await this.planCards.all();
    
    if (cards.length === 0) {
      throw new Error('No plan cards found');
    }

    const foundPlans = [];
    for (const card of cards) {
      const text = await card.textContent();
      for (const plan of LIFE_LANDING_PLANS) {
        if (text?.toLowerCase().includes(plan.toLowerCase())) {
          foundPlans.push(plan);
        }
      }
    }

    for (const expectedPlan of LIFE_LANDING_PLANS) {
      if (!foundPlans.includes(expectedPlan)) {
        throw new Error(`Plan "${expectedPlan}" not found in plan cards. Found: ${foundPlans.join(', ')}`);
      }
    }
    return foundPlans;
  }

  async clickPlanCard(planName: string) {
    const card = this.planCards.filter({ hasText: planName }).first();
    await this.click(card);
    await this.waitForLoad();
  }

  async verifyTestimonials() {
    await this.expectVisible(this.testimonials);
    const testimonialItems = this.testimonials.locator('[data-testid="testimonial-item"], .testimonial-item');
    const count = await testimonialItems.count();
    if (count === 0) {
      throw new Error('No testimonials found');
    }
    return count;
  }

  async verifyCompanyLogos() {
    await this.expectVisible(this.companyLogos);
    const logos = this.companyLogos.locator('img, [data-testid="company-logo"]');
    const count = await logos.count();
    if (count === 0) {
      throw new Error('No company logos found');
    }
    return count;
  }

  async clickLifeInsuranceHeader() {
    await this.header.clickLifeInsuranceHeader();
  }

  async verifyFooterLinks() {
    const footer = this.page.locator('footer, [data-testid="footer"], .footer').first();
    const links = footer.locator('a');
    const count = await links.count();
    if (count === 0) {
      throw new Error('No footer links found');
    }
    return count;
  }
}