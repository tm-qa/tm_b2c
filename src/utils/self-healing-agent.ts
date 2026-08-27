import { Page, Locator, FrameLocator } from '@playwright/test';
import { TIMEOUTS, SELECTORS } from '@config/constants';

export interface SelectorStrategy {
  name: string;
  selector: string;
  priority: number;
}

export interface HealingResult {
  success: boolean;
  locator?: Locator;
  strategyUsed?: SelectorStrategy;
  attempts: number;
  error?: string;
}

export class SelfHealingAgent {
  private page: Page;
  private strategies: Map<string, SelectorStrategy[]> = new Map();
  private healingStats: Map<string, { success: number; failed: number; strategiesUsed: Map<string, number> }> = new Map();

  constructor(page: Page) {
    this.page = page;
    this.initializeDefaultStrategies();
  }

  private initializeDefaultStrategies(): void {
    // Use constants as first priority, then fallback strategies (all XPath)
    this.strategies.set('dropdown-menu', [
      { name: 'constants-dropdown', selector: SELECTORS.DROPDOWN.CONTAINER, priority: 1 },
      { name: 'role-menu', selector: '//*[@role="menu"]', priority: 2 },
      { name: 'visible-ul', selector: '//ul | //nav//ul', priority: 3 },
    ]);

    this.strategies.set('dropdown-section', [
      { name: 'constants-section', selector: SELECTORS.DROPDOWN.SECTION, priority: 1 },
      { name: 'heading', selector: '//h3 | //h4 | //*[contains(@class, "section-title")]', priority: 2 },
      { name: 'any-div', selector: '//div[contains(text(), "Insurance")] | //div[contains(text(), "Companies")]', priority: 3 },
    ]);

    this.strategies.set('insurer-link', [
      { name: 'constants-insurer', selector: SELECTORS.DROPDOWN.INSURER_LINK, priority: 1 },
      { name: 'anchor-known', selector: '//a[contains(text(), "National")] | //a[contains(text(), "HDFC")] | //a[contains(text(), "Bajaj")] | //a[contains(text(), "ICICI")] | //a[contains(text(), "TATA")]', priority: 2 },
      { name: 'any-anchor', selector: '//ul//li//a | //*[contains(@class, "dropdown-section")]//a', priority: 3 },
    ]);

    this.strategies.set('cashless-garage-link', [
      { name: 'constants-garage', selector: SELECTORS.DROPDOWN.CASHLESS_GARAGE_LINK, priority: 1 },
      { name: 'anchor-text', selector: '//a[contains(text(), "Garage")] | //a[contains(text(), "Cashless")]', priority: 2 },
    ]);

    this.strategies.set('network-hospital-link', [
      { name: 'constants-hospital', selector: SELECTORS.DROPDOWN.NETWORK_HOSPITAL_LINK, priority: 1 },
      { name: 'anchor-text', selector: '//a[contains(text(), "Hospital")] | //a[contains(text(), "Network")]', priority: 2 },
    ]);

    this.strategies.set('advisor-popup', [
      { name: 'constants-popup', selector: SELECTORS.ADVISOR_POPUP.CONTAINER, priority: 1 },
      { name: 'role-dialog', selector: '//*[@role="dialog"]', priority: 2 },
      { name: 'overlay', selector: '//*[contains(@class, "modal-overlay")] | //*[contains(@class, "popup-overlay")]', priority: 3 },
    ]);

    this.strategies.set('pincode-input', [
      { name: 'constants-pincode', selector: SELECTORS.ADVISOR_POPUP.PINCODE_INPUT, priority: 1 },
      { name: 'type-number', selector: '//input[@type="number" and @maxlength="6"]', priority: 2 },
      { name: 'any-input', selector: '//*[contains(@class, "modal")]//input | //*[contains(@class, "popup")]//input', priority: 3 },
    ]);

    this.strategies.set('submit-button', [
      { name: 'constants-submit', selector: SELECTORS.ADVISOR_POPUP.SUBMIT_BUTTON, priority: 1 },
      { name: 'type-submit', selector: '//button[@type="submit"]', priority: 2 },
      { name: 'text-submit', selector: '//button[contains(text(), "Submit")] | //button[contains(text(), "Find")]', priority: 3 },
      { name: 'primary-btn', selector: '//*[contains(@class, "btn-primary")] | //*[contains(@class, "btn-submit")] | //*[contains(@class, "primary-button")]', priority: 4 },
    ]);

    // Dropdown navigation elements
    this.strategies.set('car-dropdown', [
      { name: 'constants-car', selector: SELECTORS.HEADER.CAR_DROPDOWN, priority: 1 },
      { name: 'fallback', selector: '//nav//a[contains(text(), "Car")] | //header//a[contains(text(), "Car")]', priority: 2 },
    ]);

    this.strategies.set('bike-dropdown', [
      { name: 'constants-bike', selector: SELECTORS.HEADER.BIKE_DROPDOWN, priority: 1 },
      { name: 'fallback', selector: '//nav//a[contains(text(), "Bike")] | //header//a[contains(text(), "Bike")]', priority: 2 },
    ]);

    this.strategies.set('health-dropdown', [
      { name: 'constants-health', selector: SELECTORS.HEADER.HEALTH_DROPDOWN, priority: 1 },
      { name: 'fallback', selector: '//nav//a[contains(text(), "Health")] | //header//a[contains(text(), "Health")]', priority: 2 },
    ]);

    this.strategies.set('life-dropdown', [
      { name: 'constants-life', selector: SELECTORS.HEADER.LIFE_DROPDOWN, priority: 1 },
      { name: 'fallback', selector: '//nav//a[contains(text(), "Life")] | //header//a[contains(text(), "Life")]', priority: 2 },
    ]);

    this.strategies.set('find-advisor-cta', [
      { name: 'constants-cta', selector: SELECTORS.HOME_PAGE.FIND_ADVISOR_CTA, priority: 1 },
      { name: 'text-button', selector: '//button[contains(text(), "Find Advisor")]', priority: 2 },
      { name: 'link-text', selector: '//a[contains(text(), "Find Advisor")]', priority: 3 },
      { name: 'class-btn', selector: '//*[contains(@class, "find-advisor-btn")] | //*[contains(@class, "btn-find-advisor")]', priority: 4 },
    ]);

    this.strategies.set('get-quote-cta', [
      { name: 'constants-cta', selector: SELECTORS.HOME_PAGE.GET_QUOTE_CTA, priority: 1 },
      { name: 'text-button', selector: '//button[contains(text(), "Get a Quote")]', priority: 2 },
      { name: 'link-text', selector: '//a[contains(text(), "Get a Quote")]', priority: 3 },
    ]);

    this.strategies.set('insurance-type-select', [
      { name: 'constants-select', selector: SELECTORS.HOME_PAGE.INSURANCE_TYPE_SELECTOR, priority: 1 },
      { name: 'name-attr', selector: '//select[@name="insuranceType"]', priority: 2 },
      { name: 'id-attr', selector: '//*[@id="insurance-type" or @id="insuranceType"]', priority: 3 },
      { name: 'any-select', selector: '//select', priority: 4 },
    ]);

    this.strategies.set('insurer-select', [
      { name: 'constants-select', selector: SELECTORS.HOME_PAGE.INSURER_SELECTOR, priority: 1 },
      { name: 'name-attr', selector: '//select[@name="insurer"]', priority: 2 },
      { name: 'id-attr', selector: '//*[@id="insurer"]', priority: 3 },
    ]);

    this.strategies.set('validation-message', [
      { name: 'constants-message', selector: SELECTORS.HOME_PAGE.VALIDATION_MESSAGE, priority: 1 },
      { name: 'class-error', selector: '//*[contains(@class, "error-message")] | //*[contains(@class, "validation-message")] | //*[contains(@class, "text-danger")]', priority: 2 },
      { name: 'role-alert', selector: '//*[@role="alert"]', priority: 3 },
      { name: 'any-error', selector: '//*[contains(@class, "error")] | //*[contains(@class, "invalid-feedback")] | //*[contains(@class, "form-error")]', priority: 4 },
    ]);

    this.strategies.set('advisor-listing', [
      { name: 'constants-listing', selector: SELECTORS.ADVISOR_LISTING.CONTAINER, priority: 1 },
      { name: 'class-listing', selector: '//*[contains(@class, "advisor-listing")] | //*[contains(@class, "advisors-list")]', priority: 2 },
      { name: 'container', selector: '//*[contains(@class, "advisors-container")] | //*[@data-advisors]', priority: 3 },
    ]);

    this.strategies.set('advisor-card', [
      { name: 'constants-card', selector: SELECTORS.ADVISOR_LISTING.ADVISOR_CARD, priority: 1 },
      { name: 'class-card', selector: '//*[contains(@class, "advisor-card")] | //*[contains(@class, "advisor-item")]', priority: 2 },
      { name: 'article', selector: '//article[contains(@class, "advisor")] | //*[contains(@class, "advisor-profile")]', priority: 3 },
      { name: 'any-div', selector: '//*[contains(@class, "advisor-listing")]//div | //*[contains(@class, "advisors-list")]//div', priority: 4 },
    ]);

    this.strategies.set('hero-section', [
      { name: 'constants-hero', selector: SELECTORS.LIFE_LANDING.HERO_SECTION, priority: 1 },
      { name: 'class-hero', selector: '//*[contains(@class, "hero-section")] | //*[contains(@class, "hero")] | //*[contains(@class, "banner")]', priority: 2 },
      { name: 'first-section', selector: '//main//section[1] | //*[contains(@class, "page-header")]', priority: 3 },
    ]);

    this.strategies.set('calculator-cta', [
      { name: 'constants-cta', selector: SELECTORS.LIFE_LANDING.CALCULATOR_CTA, priority: 1 },
      { name: 'text-link', selector: '//a[contains(text(), "Calculate")] | //a[contains(text(), "Premium Calculator")]', priority: 2 },
      { name: 'button-calc', selector: '//button[contains(text(), "Calculate")]', priority: 3 },
    ]);

    this.strategies.set('plan-cards', [
      { name: 'constants-card', selector: SELECTORS.LIFE_LANDING.PLAN_CARDS, priority: 1 },
      { name: 'class-card', selector: '//*[contains(@class, "plan-card")] | //*[contains(@class, "insurance-plan")]', priority: 2 },
      { name: 'card-element', selector: '//*[contains(@class, "card") and contains(text(), "Term")] | //*[contains(@class, "card") and contains(text(), "ULIP")]', priority: 3 },
    ]);

    this.strategies.set('testimonials', [
      { name: 'constants-testimonial', selector: SELECTORS.LIFE_LANDING.TESTIMONIALS, priority: 1 },
      { name: 'class-testimonial', selector: '//*[contains(@class, "testimonials")] | //*[contains(@class, "testimonials-carousel")] | //*[contains(@class, "reviews")]', priority: 2 },
      { name: 'carousel', selector: '//*[contains(@class, "carousel")] | //*[contains(@class, "slider")] | //*[contains(@class, "swiper")]', priority: 3 },
    ]);

    this.strategies.set('company-logos', [
      { name: 'constants-logos', selector: SELECTORS.LIFE_LANDING.COMPANY_LOGOS, priority: 1 },
      { name: 'class-logos', selector: '//*[contains(@class, "company-logos")] | //*[contains(@class, "partner-logos")] | //*[contains(@class, "insurer-logos")]', priority: 2 },
      { name: 'logo-images', selector: '//img[contains(@alt, "logo")] | //*[contains(@class, "logo")]//img', priority: 3 },
    ]);

    this.strategies.set('life-insurance-header', [
      { name: 'constants-header', selector: SELECTORS.HEADER.LIFE_DROPDOWN, priority: 1 },
      { name: 'nav-text', selector: '//nav//*[contains(text(), "Life Insurance")]', priority: 2 },
      { name: 'link-text', selector: '//a[contains(text(), "Life Insurance")]', priority: 3 },
      { name: 'nav-link', selector: '//nav//a[contains(@href, "life")]', priority: 4 },
    ]);
  }

  registerStrategy(elementKey: string, strategies: SelectorStrategy[]): void {
    this.strategies.set(elementKey, strategies.sort((a, b) => a.priority - b.priority));
  }

  async findElement(elementKey: string, context?: Page | FrameLocator, options?: { timeout?: number; required?: boolean }): Promise<HealingResult> {
    const strategies = this.strategies.get(elementKey);
    const target = context || this.page;
    const timeout = options?.timeout || TIMEOUTS.MEDIUM;
    const startTime = Date.now();

    if (!strategies || strategies.length === 0) {
      return { success: false, attempts: 0, error: `No strategies registered for ${elementKey}` };
    }

    this.recordAttempt(elementKey);

    for (const strategy of strategies) {
      try {
        const locator = target.locator(strategy.selector);
        
        if (await locator.count() > 0) {
          await locator.first().waitFor({ state: 'visible', timeout: Math.min(timeout, 5000) });
          
          this.recordSuccess(elementKey, strategy.name);
          return {
            success: true,
            locator: locator.first(),
            strategyUsed: strategy,
            attempts: 1,
          };
        }
      } catch (error) {
        continue;
      }
    }

    const error = `All ${strategies.length} strategies failed for ${elementKey} after ${Date.now() - startTime}ms`;
    this.recordFailure(elementKey);
    
    if (options?.required) {
      throw new Error(error);
    }
    
    return { success: false, attempts: strategies.length, error };
  }

  async findAllElements(elementKey: string, context?: Page | FrameLocator): Promise<Locator[]> {
    const strategies = this.strategies.get(elementKey);
    const target = context || this.page;

    if (!strategies) return [];

    for (const strategy of strategies) {
      try {
        const locators = target.locator(strategy.selector);
        const count = await locators.count();
        
        if (count > 0) {
          this.recordSuccess(elementKey, strategy.name);
          const elements: Locator[] = [];
          for (let i = 0; i < count; i++) {
            elements.push(locators.nth(i));
          }
          return elements;
        }
      } catch {
        continue;
      }
    }

    return [];
  }

  async clickWithHealing(elementKey: string, options?: { force?: boolean; timeout?: number }): Promise<boolean> {
    const result = await this.findElement(elementKey, undefined, { required: false });
    
    if (result.success && result.locator) {
      try {
        await result.locator.click({ force: options?.force, timeout: options?.timeout || TIMEOUTS.MEDIUM });
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  }

  async fillWithHealing(elementKey: string, value: string, options?: { timeout?: number }): Promise<boolean> {
    const result = await this.findElement(elementKey, undefined, { required: false });
    
    if (result.success && result.locator) {
      try {
        await result.locator.fill(value, { timeout: options?.timeout || TIMEOUTS.MEDIUM });
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  }

  async waitForWithHealing(elementKey: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout?: number): Promise<boolean> {
    const result = await this.findElement(elementKey, undefined, { required: false, timeout });
    
    if (result.success && result.locator) {
      try {
        await result.locator.waitFor({ state, timeout: timeout || TIMEOUTS.MEDIUM });
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  }

  private recordAttempt(elementKey: string): void {
    if (!this.healingStats.has(elementKey)) {
      this.healingStats.set(elementKey, { success: 0, failed: 0, strategiesUsed: new Map() });
    }
    this.healingStats.get(elementKey)!.failed++;
  }

  private recordSuccess(elementKey: string, strategyName: string): void {
    if (!this.healingStats.has(elementKey)) {
      this.healingStats.set(elementKey, { success: 0, failed: 0, strategiesUsed: new Map() });
    }
    const stats = this.healingStats.get(elementKey)!;
    stats.success++;
    stats.failed = Math.max(0, stats.failed - 1);
    stats.strategiesUsed.set(strategyName, (stats.strategiesUsed.get(strategyName) || 0) + 1);
  }

  private recordFailure(elementKey: string): void {
    if (!this.healingStats.has(elementKey)) {
      this.healingStats.set(elementKey, { success: 0, failed: 0, strategiesUsed: new Map() });
    }
    this.healingStats.get(elementKey)!.failed++;
  }

  getHealingStats(): Record<string, { successRate: number; totalAttempts: number; strategiesUsed: Record<string, number> }> {
    const stats: Record<string, any> = {};
    
    for (const [key, value] of this.healingStats) {
      const total = value.success + value.failed;
      stats[key] = {
        successRate: total > 0 ? (value.success / total * 100).toFixed(1) : 0,
        totalAttempts: total,
        strategiesUsed: Object.fromEntries(value.strategiesUsed),
      };
    }
    
    return stats;
  }

  printHealingReport(): void {
    const stats = this.getHealingStats();
    console.log('\n🔧 Self-Healing Agent Report');
    console.log('============================');
    
    for (const [element, data] of Object.entries(stats)) {
      console.log(`\n${element}:`);
      console.log(`  Success Rate: ${data.successRate}%`);
      console.log(`  Total Attempts: ${data.totalAttempts}`);
      console.log(`  Strategies Used:`);
      for (const [strategy, count] of Object.entries(data.strategiesUsed)) {
        console.log(`    ${strategy}: ${count} times`);
      }
    }
  }

  resetStats(): void {
    this.healingStats.clear();
  }
}

export function createSelfHealingAgent(page: Page): SelfHealingAgent {
  return new SelfHealingAgent(page);
}