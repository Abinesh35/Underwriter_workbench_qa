export type GraphNodeType = 'page' | 'component' | 'business-flow' | 'locator' | 'test' | 'requirement' | 'agent';

export interface KnowledgeGraphNode {
  id: string;
  type: GraphNodeType;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface GraphRelationship {
  from: string;
  to: string;
  kind: string;
  confidence?: number;
}

export class KnowledgeGraph {
  private nodes = new Map<string, KnowledgeGraphNode>();
  private edges: GraphRelationship[] = [];

  registerNode(node: KnowledgeGraphNode): void {
    this.nodes.set(node.id, node);
  }

  addRelationship(from: string, to: string, kind: string, confidence = 1): void {
    this.edges.push({ from, to, kind, confidence });
  }

  queryByPage(pageName: string): GraphRelationship[] {
    const pageId = `${pageName.toLowerCase().replace(/\s+/g, '-')}`;
    return this.edges.filter((edge) => edge.from === pageId || edge.to === pageId);
  }

  getCoverage(): string[] {
    return Array.from(this.nodes.values()).map((node) => node.name);
  }

  snapshot(): { nodes: KnowledgeGraphNode[]; relationships: GraphRelationship[] } {
    return {
      nodes: Array.from(this.nodes.values()),
      relationships: this.edges,
    };
  }
}
