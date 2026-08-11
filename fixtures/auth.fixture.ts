import { test as base } from '@playwright/test';

export type AutomationFixtures = {
  loginFromFixture: () => Promise<void>;
};

export const test = base.extend<AutomationFixtures>({
  loginFromFixture: async ({ page }, use) => {
    await page.goto('/');
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password123');
    await page.getByTestId('login-btn').click();
    await page.getByTestId('dashboard-page').waitFor({ state: 'visible', timeout: 5000 });

    await use(async () => {
      await page.goto('/dashboard');
    });
  },
});

export { expect } from '@playwright/test';
