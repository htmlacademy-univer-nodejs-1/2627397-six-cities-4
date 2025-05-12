import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(): void {
    console.log(chalk.blue(`
CLI
Пример запуска:
  six-cities --import ./mocks/offers.tsv

Команды:
  --version               выводит версию приложения
  --help                  показывает эту справку
  --import <path>         импортирует данные из TSV-файла
`));
  }
}
