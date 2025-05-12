import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';

export class VersionCommand implements Command {
  getName(): string {
    return '--version';
  }

  execute(): void {
    const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
    console.log(chalk.green(`v${pkg.version}`));
  }
}
