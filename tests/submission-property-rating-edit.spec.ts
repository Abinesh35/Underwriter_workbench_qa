import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PropertyRatingPage } from '../pages/property-rating.page';
import { SubmissionPage } from '../pages/submission.page';

test.describe('Submission Property Rating edit coverage', () => {
  test('should display existing Property Rating values when editing a submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    const submissionPage = new SubmissionPage(page);
    await submissionPage.open();
    await expect(page.getByTestId('submission-page')).toBeVisible();

    await submissionPage.openExistingSubmission();
    const submissionId = await submissionPage.captureSubmissionId();

    await submissionPage.clickEdit();

    const propertyRatingPage = new PropertyRatingPage(page);
    await propertyRatingPage.expectLoaded();
    await propertyRatingPage.expectValues({
      effectiveDate: '01/01/2026',
      expirationDate: '01/01/2027',
      renewalStatus: 'New',
      primaryProperty: 'Main Warehouse',
      policyNumber: 'POL-100234',
      quoteStatus: 'Completed',
      premium: '15000',
      coverageType: 'Property',
    });

    await submissionPage.expectSubmissionId(submissionId);
  });
});
