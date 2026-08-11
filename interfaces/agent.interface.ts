export type AgentStatus = 'idle' | 'running' | 'success' | 'failed';

export interface AgentInput {
  requestId: string;
  source?: string;
  scope?: string[];
  metadata?: Record<string, unknown>;
}

export interface AgentResult<TOutput> {
  status: AgentStatus;
  generatedAt: string;
  output: TOutput;
  artifacts?: string[];
  confidence?: number;
}

export interface IAgent<TInput, TOutput> {
  run(input: TInput): Promise<AgentResult<TOutput>>;
}
