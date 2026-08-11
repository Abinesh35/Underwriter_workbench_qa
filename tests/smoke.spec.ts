import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { SubmissionPage } from '../pages/submission.page';

test.describe('Underwriter smoke coverage', () => {
  test('login to dashboard and validate summary added', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'password123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.open();
    await dashboardPage.expectSummaryCardsVisible();
  });

  test('submission journey generates and submits a full flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'password123');

    await page.goto('/property-rating');
    await page.getByTestId('primary-property').fill('Main Warehouse');
    await page.getByTestId('policy-number').fill('POL-100234');
    await page.getByTestId('premium').fill('15000');
    await page.getByTestId('next-btn').click();

    await page.goto('/common-information');
    await page.getByTestId('business-name').fill('Acme Manufacturing Co.');
    await page.getByTestId('agent-name').fill('Avery Johnson');
    await page.getByTestId('business-type').selectOption('Manufacturing');
    await page.getByTestId('state').selectOption('Texas');
    await page.getByTestId('country').selectOption('USA');
    await page.getByTestId('phone').fill('555-0101');
    await page.getByTestId('email').fill('agent@example.com');
    await page.getByTestId('address').fill('123 Market Street');
    await page.getByTestId('next-btn').click();

    await page.goto('/team-details');
    await page.getByTestId('team-name').fill('North Team');
    await page.getByTestId('reviewer').fill('Reviewer One');
    await page.getByTestId('approver').fill('Approver One');
    await page.getByTestId('risk-analyst').fill('Risk Analyst');
    await page.getByTestId('manager').fill('Manager One');
    await page.getByTestId('status').selectOption('Pending');
    await page.getByTestId('next-btn').click();

    const submissionPage = new SubmissionPage(page);
    await submissionPage.open();
    await submissionPage.generateSubmissionNumber();
    await submissionPage.submit();
    await submissionPage.expectSubmittedSuccess();

    await expect(page.getByTestId('submitted-number')).toBeVisible();
  });
});
