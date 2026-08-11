import { BaseAgent } from './base-agent';

export interface ImpactInput {
  requestId: string;
  changedUiComponents?: string[];
  metadata?: Record<string, unknown>;
}

export interface ImpactOutput {
  impactedPages: string[];
  impactedPageObjects: string[];
  affectedTestCases: string[];
  risk: 'low' | 'medium' | 'high';
}

export class ImpactAnalysisAgent extends BaseAgent<ImpactInput, ImpactOutput> {
  constructor() {
    super('Impact Analysis Agent');
  }

  protected async execute(input: ImpactInput): Promise<ImpactOutput> {
    const impactedPages = input.changedUiComponents?.includes('Submission')
      ? ['Submission', 'Dashboard']
      : ['Property Rating', 'Common Information', 'Team Details'];

    return {
      impactedPages,
      impactedPageObjects: ['SubmissionPage', 'DashboardPage'],
      affectedTestCases: ['login-smoke', 'submission-submit-flow'],
      risk: 'medium',
    };
  }
}
