import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Header } from '../pages/components/Header';
import { DropdownMenu } from '../pages/components/DropdownMenu';
import { AdvisorPopup } from '../pages/components/AdvisorPopup';
import { AdvisorListing } from '../pages/components/AdvisorListing';
import { BikeDashboard } from '../pages/modules/bike/BikeDashboard';
import { HealthDashboard } from '../pages/modules/health/HealthDashboard';
import { LifeLandingPage } from '../pages/modules/life/LifeLandingPage';

type TestFixtures = {
  homePage: HomePage;
  header: Header;
  dropdownMenu: DropdownMenu;
  advisorPopup: AdvisorPopup;
  advisorListing: AdvisorListing;
  bikeDashboard: BikeDashboard;
  healthDashboard: HealthDashboard;
  lifeLandingPage: LifeLandingPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }: { page: Page }, use: (arg: HomePage) => Promise<void>) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  header: async ({ page }: { page: Page }, use: (arg: Header) => Promise<void>) => {
    const header = new Header(page);
    await use(header);
  },

  dropdownMenu: async ({ page }: { page: Page }, use: (arg: DropdownMenu) => Promise<void>) => {
    const dropdownMenu = new DropdownMenu(page);
    await use(dropdownMenu);
  },

  advisorPopup: async ({ page }: { page: Page }, use: (arg: AdvisorPopup) => Promise<void>) => {
    const advisorPopup = new AdvisorPopup(page);
    await use(advisorPopup);
  },

  advisorListing: async ({ page }: { page: Page }, use: (arg: AdvisorListing) => Promise<void>) => {
    const advisorListing = new AdvisorListing(page);
    await use(advisorListing);
  },

  bikeDashboard: async ({ page }: { page: Page }, use: (arg: BikeDashboard) => Promise<void>) => {
    const bikeDashboard = new BikeDashboard(page);
    await bikeDashboard.goto();
    await use(bikeDashboard);
  },

  healthDashboard: async ({ page }: { page: Page }, use: (arg: HealthDashboard) => Promise<void>) => {
    const healthDashboard = new HealthDashboard(page);
    await healthDashboard.goto();
    await use(healthDashboard);
  },

  lifeLandingPage: async ({ page }: { page: Page }, use: (arg: LifeLandingPage) => Promise<void>) => {
    const lifeLandingPage = new LifeLandingPage(page);
    await lifeLandingPage.goto();
    await use(lifeLandingPage);
  },
});

export { expect } from '@playwright/test';