import { expect, type Locator, type Page } from '@playwright/test';

export type PropertyRatingValues = {
  effectiveDate: string;
  expirationDate: string;
  renewalStatus: string;
  primaryProperty: string;
  policyNumber: string;
  quoteStatus: string;
  premium: string;
  coverageType: string;
};

export class PropertyRatingPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/property-rating/);
    await expect(this.page.getByTestId('property-rating-page')).toBeVisible();
  }

  async expectValues(values: PropertyRatingValues) {
    await expect(this.field('effective-date')).toHaveValue(values.effectiveDate);
    await expect(this.field('expiration-date')).toHaveValue(values.expirationDate);
    await this.expectDropdownValue('renewal-status', values.renewalStatus);
    await expect(this.field('primary-property')).toHaveValue(values.primaryProperty);
    await expect(this.field('policy-number')).toHaveValue(values.policyNumber);
    await this.expectDropdownValue('quote-status', values.quoteStatus);
    await expect(this.field('premium')).toHaveValue(values.premium);
    await this.expectDropdownValue('coverage-type', values.coverageType);
  }

  private field(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  private async expectDropdownValue(testId: string, expectedText: string) {
    const field = this.field(testId);
    await expect(field).toBeVisible();

    const tagName = await field.evaluate((element) => element.tagName.toLowerCase());
    if (tagName === 'select') {
      await expect(field.locator('option:checked')).toHaveText(expectedText);
      return;
    }

    await expect(field).toHaveValue(expectedText);
  }
}
