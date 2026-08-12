import { test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';

test.describe('Authentication coverage', () => {
  test('should logout successfully and redirect the user to the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectLoaded();

    await dashboardPage.logout();

    await loginPage.expectLoaded();
    await dashboardPage.expectAuthenticatedNavigationHidden();

    await dashboardPage.open();
    await loginPage.expectLoaded();
    await dashboardPage.expectAuthenticatedNavigationHidden();
  });
});
