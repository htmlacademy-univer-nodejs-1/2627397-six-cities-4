export class CommandParser {
  static parse(argv: string[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    let current: string | null = null;

    for (const arg of argv) {
      if (arg.startsWith('--')) {
        current = arg;
        result[current] = [];
      } else if (current) {
        result[current].push(arg);
      }
    }
    return result;
  }
}
