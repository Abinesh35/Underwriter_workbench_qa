import { BaseAgent } from './base-agent';
import { KnowledgeGraph } from '../../knowledge-graph/knowledge-graph';

export interface UiAgentInput {
  requestId: string;
  source: string;
  metadata?: Record<string, unknown>;
}

export interface UiModelOutput {
  pages: string[];
  components: string[];
  navigation: string[];
  coverage: string;
}

export class UiAgent extends BaseAgent<UiAgentInput, UiModelOutput> {
  constructor(private readonly graph: KnowledgeGraph) {
    super('UI Agent');
  }

  protected async execute(input: UiAgentInput): Promise<UiModelOutput> {
    const pages = ['Login', 'Dashboard', 'Property Rating', 'Common Information', 'Team Details', 'Submission'];
    const components = ['LoginForm', 'DashboardCards', 'SubmissionsTable', 'PropertyRatingForm', 'CommonInformationForm', 'TeamDetailsForm', 'SubmissionSummary'];
    const navigation = ['/login', '/dashboard', '/property-rating', '/common-information', '/team-details', '/submission'];

    pages.forEach((page) => {
      this.graph.registerNode({ id: page.toLowerCase().replace(/\s+/g, '-'), type: 'page', name: page });
    });

    components.forEach((component) => {
      this.graph.registerNode({ id: component.toLowerCase().replace(/\s+/g, '-'), type: 'component', name: component });
    });

    navigation.forEach((route, index) => {
      const targetPage = pages[index];
      this.graph.addRelationship(targetPage.toLowerCase().replace(/\s+/g, '-'), `navigation-${index}`, 'navigation-map', 1);
    });

    return {
      pages,
      components,
      navigation,
      coverage: 'login -> dashboard -> underwriting submission pages',
    };
  }
}
