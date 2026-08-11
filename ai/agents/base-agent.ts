import { IAgent, AgentInput, AgentResult } from '../../interfaces/agent.interface';

export abstract class BaseAgent<TInput extends AgentInput, TOutput> implements IAgent<TInput, TOutput> {
  protected readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  async run(input: TInput): Promise<AgentResult<TOutput>> {
    try {
      const output = await this.execute(input);
      return {
        status: 'success',
        generatedAt: new Date().toISOString(),
        output,
        confidence: 0.95,
      };
    } catch (error) {
      return {
        status: 'failed',
        generatedAt: new Date().toISOString(),
        output: undefined as unknown as TOutput,
        artifacts: [`${this.name}: ${(error as Error).message}`],
        confidence: 0,
      };
    }
  }

  protected abstract execute(input: TInput): Promise<TOutput>;
}
