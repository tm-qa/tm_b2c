import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

/** Shared marketing-site navigation component migrated from Selenium's NavigationComponent. */
export class NavigationComponent extends BasePage {
  readonly carMenu: Locator;
  readonly bikeMenu: Locator;
  readonly healthMenu: Locator;
  readonly lifeMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.carMenu = page.locator('a[href$="/car-insurance/"], a:has-text("Car Insurance")').first();
    this.bikeMenu = page.locator('a[href$="/bike-insurance/"], a:has-text("Bike Insurance")').first();
    this.healthMenu = page.locator('a[href$="/health-insurance/"], a:has-text("Health Insurance")').first();
    this.lifeMenu = page.locator('a[href$="/life-insurance/"], a:has-text("Life Insurance")').first();
  }

  async hoverOverCarMenu() { await this.carMenu.hover(); }
  async hoverOverBikeMenu() { await this.bikeMenu.hover(); }
  async hoverOverHealthMenu() { await this.healthMenu.hover(); }
  async hoverOverLifeMenu() { await this.lifeMenu.hover(); }

  private async clickMenuItem(menu: Locator, text: string) {
    await menu.hover();
    await this.page.getByRole('link', { name: text, exact: true }).click();
  }

  async navigateToCarInsuranceCompanies() { await this.clickMenuItem(this.carMenu, 'Car Insurance Companies'); }
  async navigateToCompareCarInsurance() { await this.clickMenuItem(this.carMenu, 'Compare Car Insurance'); }
  async navigateToBikePremiumCalculator() { await this.clickMenuItem(this.bikeMenu, 'Bike Insurance Premium Calculator'); }
  async navigateToHealthPremiumCalculator() { await this.clickMenuItem(this.healthMenu, 'Premium Calculator'); }
  async navigateToTermInsurance() { await this.clickMenuItem(this.lifeMenu, 'Term Insurance'); }

  async getAllTopLevelNavHrefs(): Promise<string[]> {
    const hrefs = await this.page.locator('nav a, header a').evaluateAll(links =>
      links.map(link => link.getAttribute('href')).filter((href): href is string => !!href && href.trim() !== '')
    );
    return [...new Set(hrefs)];
  }
}
