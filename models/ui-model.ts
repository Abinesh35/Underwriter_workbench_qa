export interface UiPageModel {
  name: string;
  route: string;
  testIds: string[];
}

export interface UiComponentModel {
  name: string;
  belongsToPage: string;
  locators: string[];
}

export const uiModel: UiPageModel[] = [
  { name: 'Login', route: '/', testIds: ['login-page', 'login-form', 'username', 'password', 'login-btn'] },
  { name: 'Dashboard', route: '/dashboard', testIds: ['dashboard-page', 'submissions-table', 'new-submission-btn'] },
  { name: 'Property Rating', route: '/property-rating', testIds: ['property-rating-page', 'property-rating-form'] },
  { name: 'Common Information', route: '/common-information', testIds: ['common-information-page', 'common-information-form'] },
  { name: 'Team Details', route: '/team-details', testIds: ['team-details-page', 'team-details-form'] },
  { name: 'Submission', route: '/submission', testIds: ['submission-page', 'submit-btn', 'generate-submission-number-btn'] },
];
