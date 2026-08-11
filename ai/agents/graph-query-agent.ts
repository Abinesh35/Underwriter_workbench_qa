import { BaseAgent } from './base-agent';
import { KnowledgeGraph } from '../../knowledge-graph/knowledge-graph';

export interface GraphQueryInput {
  requestId: string;
  source: string;
  query: string;
}

export interface GraphQueryOutput {
  answer: string;
  traceability: string[];
}

export class GraphQueryAgent extends BaseAgent<GraphQueryInput, GraphQueryOutput> {
  constructor(private readonly graph: KnowledgeGraph) {
    super('Graph Query Agent');
  }

  protected async execute(input: GraphQueryInput): Promise<GraphQueryOutput> {
    const nodes = this.graph.snapshot();
    return {
      answer: `Knowledge graph resolved: ${input.query} with ${nodes.nodes.length} registered entities and ${nodes.relationships.length} relationships.`,
      traceability: ['login-flow', 'dashboard-overview', 'submission-flow'],
    };
  }
}
