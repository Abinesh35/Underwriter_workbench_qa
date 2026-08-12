import { expect, type Locator, type Page } from '@playwright/test';

export class SubmissionPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/submission');
  }

  async generateSubmissionNumber() {
    await this.page.getByTestId('generate-submission-number-btn').click();
  }

  async submit() {
    await this.page.getByTestId('submit-btn').click();
  }

  async expectSubmittedSuccess() {
    await this.page.getByTestId('submission-success').waitFor({ state: 'visible', timeout: 5000 });
  }

  async openExistingSubmission(policyNumber = 'POL-100234') {
    const submissionRow = this.page.getByRole('row').filter({ hasText: policyNumber }).first();

    if ((await submissionRow.count()) > 0) {
      await expect(submissionRow).toBeVisible();
      const openAction = submissionRow
        .getByRole('button', { name: /open|view|details/i })
        .or(submissionRow.getByRole('link', { name: /open|view|details/i }))
        .first();

      if ((await openAction.count()) > 0) {
        await openAction.click();
        return;
      }

      await submissionRow.click();
      return;
    }

    await this.page.getByText(policyNumber).first().click();
  }

  async captureSubmissionId() {
    const submissionId = await this.firstVisible([
      this.page.getByTestId('submission-id'),
      this.page.getByTestId('submitted-number'),
      this.page.getByLabel(/submission id|submission number/i),
    ]);

    if (await this.isEditableField(submissionId)) {
      return (await submissionId.inputValue()).trim();
    }

    return (await submissionId.innerText()).trim();
  }

  async clickEdit() {
    await this.page.getByRole('button', { name: /^edit$/i }).click();
  }

  async expectSubmissionId(submissionId: string) {
    if (this.page.url().includes(encodeURIComponent(submissionId))) {
      expect(this.page.url()).toContain(encodeURIComponent(submissionId));
      return;
    }

    await expect(this.page.getByText(submissionId).first()).toBeVisible();
  }

  private async firstVisible(locators: Locator[]) {
    for (const locator of locators) {
      if ((await locator.count()) > 0 && (await locator.first().isVisible())) {
        return locator.first();
      }
    }

    throw new Error('Unable to find a visible submission ID locator.');
  }

  private async isEditableField(locator: Locator) {
    const tagName = await locator.evaluate((element) => element.tagName.toLowerCase());
    return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
  }
}
