import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Offer } from '../../shared/types/offer.type.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(filePath?: string): Promise<void> {
    if (!filePath) {
      console.error(chalk.red('Укажите путь до TSV-файла'));
      return;
    }

    const reader = new TSVFileReader(filePath);
    let count = 0;

    reader.on('line', (line: string) => {
      const fields = line.split('\t');
      const offer: Offer = {
        title: fields[0],
        description: fields[1],
        createdAt: fields[2],
        city: fields[3] as Offer['city'],
        previewImage: fields[4],
        images: fields[5].split(';'),
        isPremium: fields[6] === 'true',
        isFavorite: fields[7] === 'true',
        rating: Number(fields[8]),
        type: fields[9] as Offer['type'],
        bedrooms: Number(fields[10]),
        maxAdults: Number(fields[11]),
        price: Number(fields[12]),
        goods: fields[13].split(';'),
        email: fields[14],
        avatarUrl: fields[15],
        latitude: Number(fields[16]),
        longitude: Number(fields[17]),
      };
      count++;
      console.log(chalk.gray(`${count}.`), offer.title);
    });

    reader.on('end', (total: number) => {
      console.log(chalk.green(`Импортировано предложений: ${total}`));
    });

    try {
      await reader.read();
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`Не удалось прочитать файл: ${error.message}`));
      } else {
        console.error(chalk.red('Неизвестная ошибка при чтении файла'));
      }
    }
  }
}
