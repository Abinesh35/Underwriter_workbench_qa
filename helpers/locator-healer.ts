export class LocatorHealer {
  private readonly history = new Map<string, { selector: string; confidence: number; lastSeenAt: string }>();

  register(selector: string, page: string, confidence = 1): void {
    this.history.set(`${page}:${selector}`, { selector, confidence, lastSeenAt: new Date().toISOString() });
  }

  get(selector: string, page: string): { selector: string; confidence: number } | undefined {
    const entry = this.history.get(`${page}:${selector}`);
    if (!entry) {
      return undefined;
    }

    return {
      selector: entry.selector,
      confidence: entry.confidence,
    };
  }

  healingReport(): string[] {
    return Array.from(this.history.values()).map((entry) => `${entry.selector} confidence=${entry.confidence}`);
  }
}
