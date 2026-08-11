import { test as base } from '@playwright/test';

export type AppFixtures = {
  underwriterContext: {
    baseUrl: string;
  };
};

export const test = base.extend<AppFixtures>({
  underwriterContext: async ({}, use) => {
    await use({ baseUrl: process.env.BASE_URL || 'http://localhost:5173' });
  },
});

export { expect } from '@playwright/test';
