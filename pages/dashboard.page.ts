import { type Page } from '@playwright/test';

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
}
