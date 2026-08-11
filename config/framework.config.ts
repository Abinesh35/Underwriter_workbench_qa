export const frameworkConfig = {
  app: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5173',
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
  },
  test: {
    defaultTimeout: Number(process.env.TEST_TIMEOUT || 30000),
    smokeCoverage: ['login', 'dashboard', 'submission-flow'],
  },
  reporting: {
    htmlReportPath: 'reports/html-report',
    jsonReportPath: 'reports/test-results.json',
    junitReportPath: 'reports/junit.xml',
    screenshotPath: 'screenshots',
    videoPath: 'videos',
    tracePath: 'trace',
  },
  security: {
    loginUsername: process.env.LOGIN_USERNAME || 'admin',
    loginPassword: process.env.LOGIN_PASSWORD || 'password123',
  },
};
