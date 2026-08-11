export interface GraphEdgeDefinition {
  from: string;
  to: string;
  kind: string;
  confidence?: number;
}

export const graphDefinition: GraphEdgeDefinition[] = [
  { from: 'login', to: 'dashboard', kind: 'navigation', confidence: 1 },
  { from: 'dashboard', to: 'property-rating', kind: 'navigation', confidence: 1 },
  { from: 'property-rating', to: 'common-information', kind: 'navigation', confidence: 1 },
  { from: 'common-information', to: 'team-details', kind: 'navigation', confidence: 1 },
  { from: 'team-details', to: 'submission', kind: 'navigation', confidence: 1 },
  { from: 'common-information', to: 'excel-upload', kind: 'component', confidence: 0.98 },
  { from: 'common-information', to: 'json-upload', kind: 'component', confidence: 0.98 },
];
