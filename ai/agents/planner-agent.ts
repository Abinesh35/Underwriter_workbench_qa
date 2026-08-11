import { BaseAgent } from './base-agent';

export interface PlannerAgentInput {
  requestId: string;
  source: string;
  requirements?: string[];
}

export interface PlannerAgentOutput {
  smoke: string[];
  regression: string[];
  executionPlan: string[];
}

export class PlannerAgent extends BaseAgent<PlannerAgentInput, PlannerAgentOutput> {
  constructor() {
    super('Planner Agent');
  }

  protected async execute(input: PlannerAgentInput): Promise<PlannerAgentOutput> {
    return {
      smoke: ['login-validation', 'dashboard-overview', 'submission-success'],
      regression: ['submission-flow', 'upload-json', 'upload-excel', 'dashboard-refresh'],
      executionPlan: ['login', 'dashboard', 'coverage forms', 'submission review', 'submission submit'],
    };
  }
}
