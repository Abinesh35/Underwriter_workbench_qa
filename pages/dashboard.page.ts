import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/dashboard');
  }

  async expectSummaryCardsVisible() {
    await this.page.getByTestId('card-total-policies').waitFor({ state: 'visible', timeout: 3000 });
    await this.page.getByTestId('card-pending-quotes').waitFor({ state: 'visible', timeout: 3000 });
    await this.page.getByTestId('card-completed-quotes').waitFor({ state: 'visible', timeout: 3000 });
    await this.page.getByTestId('card-renewals').waitFor({ state: 'visible', timeout: 3000 });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard$/);
    await expect(this.page.getByTestId('dashboard-page')).toBeVisible();
  }

  async logout() {
    const logout = this.logoutLocator();

    if ((await logout.count()) === 0 || !(await logout.first().isVisible())) {
      await this.openMenu();
    }

    await logout.first().click();
  }

  async expectAuthenticatedNavigationHidden() {
    await expect(this.page.getByTestId('dashboard-page')).toBeHidden();
    await expect(this.page.getByTestId('submissions-table')).toBeHidden();
  }

  private async openMenu() {
    const menu = this.firstMatching([
      this.page.getByRole('button', { name: /menu|navigation|sidebar/i }),
      this.page.getByTestId('hamburger-menu'),
      this.page.getByTestId('sidebar-toggle'),
      this.page.getByTestId('menu-button'),
    ]);

    await expect(menu).toBeVisible();
    await menu.click();
  }

  private logoutLocator() {
    return this.page
      .getByRole('button', { name: /log\s*out|logout|sign\s*out/i })
      .or(this.page.getByRole('menuitem', { name: /log\s*out|logout|sign\s*out/i }))
      .or(this.page.getByRole('link', { name: /log\s*out|logout|sign\s*out/i }))
      .or(this.page.getByTestId('logout-btn'))
      .or(this.page.getByTestId('logout-button'))
      .or(this.page.getByTestId('logout'));
  }

  private firstMatching(locators: Locator[]) {
    return locators.reduce((current, locator) => current.or(locator)).first();
  }
}
