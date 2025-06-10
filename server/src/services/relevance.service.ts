export class RelevanceService {
  private irrelevantCount = new Map<string, number>();

  constructor(
    private readonly THRESHOLD: number = 0.4,
    private readonly MAX_WARNINGS: number = 3,
    private readonly jokes: string[] = [],
  ) {}

  public getIrrelevantJoke(
    userKey: string,
    docs: Array<{ score?: number }>,
  ): string | undefined {
    const hasRelevant = docs.some((d) => (d.score ?? 0) >= this.THRESHOLD);
    if (hasRelevant) {
      this.irrelevantCount.set(userKey, 0);
      return undefined;
    }

    const next = (this.irrelevantCount.get(userKey) ?? 0) + 1;
    this.irrelevantCount.set(userKey, next);

    if (next >= this.MAX_WARNINGS) {
      const joke = this.jokes[Math.floor(Math.random() * this.jokes.length)];
      this.irrelevantCount.set(userKey, 0);
      return joke;
    }
    return undefined;
  }
}
