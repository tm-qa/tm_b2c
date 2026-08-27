import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { TIMEOUTS } from '@config/constants';

export class Footer extends BasePage {
  readonly container: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.locator('footer, [data-testid="footer"], .footer').first();
  }

  async waitForVisible(timeout: number = TIMEOUTS.MEDIUM) {
    await this.waitForElement(this.container, timeout);
  }

  async getLinks(): Promise<Array<{ text: string; href: string }>> {
    const links = this.container.locator('a');
    const elements = await links.all();
    const result = [];
    
    for (const element of elements) {
      const text = (await element.textContent())?.trim();
      const href = await element.getAttribute('href');
      if (text && href) {
        result.push({ text, href });
      }
    }
    return result;
  }

  async clickLink(linkText: string) {
    const link = this.container.locator('a').filter({ hasText: linkText }).first();
    await this.click(link);
    await this.waitForLoad();
  }

  async verifyLinks(section?: string) {
    const links = await this.getLinks();
    if (section) {
      const sectionLinks = links.filter(l => 
        l.text.toLowerCase().includes(section.toLowerCase()) ||
        l.href.toLowerCase().includes(section.toLowerCase())
      );
      if (sectionLinks.length === 0) {
        throw new Error(`No links found for section: ${section}`);
      }
      return sectionLinks;
    }
    return links;
  }
}