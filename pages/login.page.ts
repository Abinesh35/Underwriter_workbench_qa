import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username = process.env.LOGIN_USERNAME || 'admin', password = process.env.LOGIN_PASSWORD || 'password123') {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByTestId('login-btn').click();
    await this.page.getByTestId('dashboard-page').waitFor({ state: 'visible', timeout: 5000 });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/(?:login)?$/);
    await expect(this.page.getByTestId('login-page')).toBeVisible();
    await expect(this.page.getByLabel('Username')).toBeVisible();
  }

  async assertError(message: string) {
    await expect(this.page.getByTestId('login-error')).toContainText(message);
  }
}
