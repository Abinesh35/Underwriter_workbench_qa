import { type Page } from '@playwright/test';

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
}
