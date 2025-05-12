import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/offer.type.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filePath?: string): void {
    if (!filePath) {
      console.error(chalk.red('Укажите путь до TSV-файла'));
      return;
    }

    try {
      const reader = new TSVFileReader(filePath);
      reader.read();
      const offers: Offer[] = reader.toArray();

      console.log(
        chalk.green(`Импортировано предложений: ${offers.length}`)
      );
      offers.forEach((offer, index) => {
        console.log(chalk.gray(`${index + 1}.`), offer.title);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`Не удалось прочитать файл: ${error.message}`));
      } else {
        console.error(chalk.red('Неизвестная ошибка при чтении файла'));
      }
    }
  }
}
