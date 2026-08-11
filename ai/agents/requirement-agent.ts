import { BaseAgent } from './base-agent';
import { KnowledgeGraph } from '../../knowledge-graph/knowledge-graph';

export interface RequirementAgentInput {
  requestId: string;
  source: string;
  markdown?: string;
  metadata?: Record<string, unknown>;
}

export interface RequirementOutput {
  requirements: string[];
  businessFlow: string[];
  acceptanceCriteria: string[];
}

export class RequirementAgent extends BaseAgent<RequirementAgentInput, RequirementOutput> {
  constructor(private readonly graph: KnowledgeGraph) {
    super('Requirement Agent');
  }

  protected async execute(input: RequirementAgentInput): Promise<RequirementOutput> {
    const requirements = [
      'Authenticated user can log in to the underwriting dashboard',
      'Dashboard shows policy, pending, completed, and renewal cards',
      'Users can move through Property Rating, Common Information, and Team Details',
      'Users can upload Excel or JSON payloads and populate forms',
      'Users can generate a submission number and submit a quote',
    ];

    const businessFlow = ['login', 'dashboard', 'property-rating', 'common-information', 'team-details', 'submission'];
    const acceptanceCriteria = ['Login with admin / password123', 'Submission renders a success confirmation', 'Submission can be persisted through the mock API'];

    requirements.forEach((item, index) => {
      this.graph.registerNode({ id: `requirement-${index}-${item}`, type: 'requirement', name: item });
    });

    return {
      requirements,
      businessFlow,
      acceptanceCriteria,
    };
  }
}
