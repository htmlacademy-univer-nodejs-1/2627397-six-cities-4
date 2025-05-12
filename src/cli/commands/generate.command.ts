import { Command } from './command.interface.js';
import got from 'got';
import { createWriteStream } from 'node:fs';
import { OfferGenerator } from '../../shared/libs/generator/offer-generator.js';
import { OffersData } from '../../shared/types/offers.data.type.js';

export class GenerateCommand implements Command {
  getName(): string {
    return '--generate';
  }

  async execute(...parameters: string[]): Promise<void> {
    const [countStr, filepath, url] = parameters;
    const count = Number(countStr);

    if (!count || !filepath || !url) {
      console.log('Укажите все аргументы: --generate <count> <filepath> <url>');
      return;
    }

    try {
      const response = await got.get(url).json<OffersData>();
      const generator = new OfferGenerator(response);
      const fileStream = createWriteStream(filepath, { flags: 'w' });

      for (let i = 0; i < count; i++) {
        const offer = generator.generate();
        fileStream.write(`${offer }\n`);
      }

      fileStream.end(() => {
        console.log(`Сгенерировано ${count} предложений в файл ${filepath}`);
      });
    } catch (error) {
      console.error('Ошибка во время генерации предложений:', error);
    }
  }
}
