import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS } from '@config/constants';
import { SelfHealingAgent, HealingResult } from '@utils/self-healing-agent';

export class BasePage {
  readonly page: Page;
  readonly healingAgent: SelfHealingAgent;

  constructor(page: Page) {
    this.page = page;
    this.healingAgent = new SelfHealingAgent(page);
  }

  async goto(path: string = '') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.LONG });
    await this.waitForLoad();
  }

  async waitForLoad(timeout: number = TIMEOUTS.MEDIUM) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async findElement(elementKey: string, options?: { timeout?: number; required?: boolean }): Promise<HealingResult> {
    return await this.healingAgent.findElement(elementKey, undefined, options);
  }

  async findAllElements(elementKey: string): Promise<Locator[]> {
    return await this.healingAgent.findAllElements(elementKey);
  }

  async waitForElement(locator: Locator, timeout: number = TIMEOUTS.MEDIUM) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async clickWithHealing(elementKey: string, options?: { force?: boolean; timeout?: number }): Promise<boolean> {
    return await this.healingAgent.clickWithHealing(elementKey, options);
  }

  async click(locator: Locator, options?: { force?: boolean; timeout?: number }) {
    await locator.click({ force: options?.force, timeout: options?.timeout || TIMEOUTS.MEDIUM });
  }

  async hover(locator: Locator, timeout: number = TIMEOUTS.MEDIUM) {
    await locator.hover({ timeout });
  }

  async fillWithHealing(elementKey: string, value: string, options?: { timeout?: number }): Promise<boolean> {
    return await this.healingAgent.fillWithHealing(elementKey, value, options);
  }

  async fill(locator: Locator, value: string, timeout: number = TIMEOUTS.MEDIUM) {
    await locator.fill(value, { timeout });
  }

  async selectOption(locator: Locator, value: string, timeout: number = TIMEOUTS.MEDIUM) {
    await locator.selectOption(value, { timeout });
  }

  async getText(locator: Locator, timeout: number = TIMEOUTS.MEDIUM): Promise<string> {
    await this.waitForElement(locator, timeout);
    return (await locator.textContent())?.trim() || '';
  }

  async getAttribute(locator: Locator, attribute: string, timeout: number = TIMEOUTS.MEDIUM): Promise<string | null> {
    await this.waitForElement(locator, timeout);
    return await locator.getAttribute(attribute);
  }

  async isVisible(locator: Locator, timeout: number = TIMEOUTS.SHORT): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isHidden(locator: Locator, timeout: number = TIMEOUTS.SHORT): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async expectVisible(locator: Locator, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(locator).toBeVisible({ timeout });
  }

  async expectHidden(locator: Locator, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(locator).toBeHidden({ timeout });
  }

  async expectText(locator: Locator, expectedText: string, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(locator).toHaveText(expectedText, { timeout });
  }

  async expectContainText(locator: Locator, expectedText: string, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(locator).toContainText(expectedText, { timeout });
  }

  async expectURL(urlPattern: string | RegExp, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(this.page).toHaveURL(urlPattern, { timeout });
  }

  async expectTitle(titlePattern: string | RegExp, timeout: number = TIMEOUTS.MEDIUM) {
    await expect(this.page).toHaveTitle(titlePattern, { timeout });
  }

  async waitForURL(urlPattern: string | RegExp, timeout: number = TIMEOUTS.MEDIUM) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(name: string) {
    return await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    const elements = await locator.all();
    const texts: string[] = [];
    for (const element of elements) {
      const text = (await element.textContent())?.trim();
      if (text) texts.push(text);
    }
    return texts;
  }

  async getAllHrefs(locator: Locator): Promise<string[]> {
    const elements = await locator.all();
    const hrefs: string[] = [];
    for (const element of elements) {
      const href = await element.getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  async retryAction<T>(action: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < retries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        if (i < retries - 1) {
          await this.page.waitForTimeout(delay);
        }
      }
    }
    throw lastError!;
  }

  async healAndClick(elementKey: string, fallbackSelector?: string): Promise<boolean> {
    const result = await this.clickWithHealing(elementKey);
    if (!result && fallbackSelector) {
      try {
        await this.page.locator(fallbackSelector).click({ timeout: TIMEOUTS.MEDIUM });
        return true;
      } catch {
        return false;
      }
    }
    return result;
  }

  async healAndFill(elementKey: string, value: string, fallbackSelector?: string): Promise<boolean> {
    const result = await this.fillWithHealing(elementKey, value);
    if (!result && fallbackSelector) {
      try {
        await this.page.locator(fallbackSelector).fill(value, { timeout: TIMEOUTS.MEDIUM });
        return true;
      } catch {
        return false;
      }
    }
    return result;
  }

  async waitForWithHealing(elementKey: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout?: number): Promise<boolean> {
    return await this.healingAgent.waitForWithHealing(elementKey, state, timeout);
  }

  printHealingReport(): void {
    this.healingAgent.printHealingReport();
  }

  getHealingStats() {
    return this.healingAgent.getHealingStats();
  }
}