export const locatorCatalog = {
  login: {
    username: '[data-testid="username"]',
    password: '[data-testid="password"]',
    loginButton: '[data-testid="login-btn"]',
    error: '[data-testid="login-error"]',
  },
  dashboard: {
    page: '[data-testid="dashboard-page"]',
    refresh: '[data-testid="refresh-dashboard"]',
    newSubmission: '[data-testid="new-submission-btn"]',
    table: '[data-testid="submissions-table"]',
  },
  submission: {
    page: '[data-testid="submission-page"]',
    submitButton: '[data-testid="submit-btn"]',
    generateNumberButton: '[data-testid="generate-submission-number-btn"]',
    success: '[data-testid="submission-success"]',
  },
};
