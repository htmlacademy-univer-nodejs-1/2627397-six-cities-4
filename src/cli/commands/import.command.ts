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

      console.log(chalk.green(`Импортировано предложений: ${offers.length}`));
      offers.forEach((o, i) => {
        console.log(chalk.gray(`${i + 1}.`), o.title);
      });
    } catch (err: any) {
      console.error(chalk.red(`Не удалось прочитать файл: ${err.message}`));
    }
  }
}
