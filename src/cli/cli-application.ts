import { Command } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';

export class CLIApplication {
  private commands = new Map<string, Command>();
  private readonly defaultCommand = '--help';

  register(command: Command): void {
    const name = command.getName();
    if (this.commands.has(name)) {
      throw new Error(`Command "${name}" already registered`);
    }
    this.commands.set(name, command);
  }

  run(argv: string[]): void {
    const parsed = CommandParser.parse(argv);
    const [cmd] = Object.keys(parsed);
    const command = this.commands.get(cmd ?? this.defaultCommand)
                  ?? this.commands.get(this.defaultCommand)!;
    const params = parsed[cmd!] ?? [];
    command.execute(...params);
  }
}
