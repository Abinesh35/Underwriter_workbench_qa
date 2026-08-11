import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(config.projects[0].use.baseURL || 'http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 5000 });
  await browser.close();
}

export default globalSetup;
