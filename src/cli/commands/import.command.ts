import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { getMongoURI } from '../../shared/utils/database.js';
import { createAppContainer } from '../../rest/rest.container.js';
import { Component } from '../../shared/types/component.enum.js';
import { DatabaseClient } from '../../shared/libs/database/database-client.interface.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { HousingType } from '../../shared/modules/offer/offer.entity.js';
import { RestSchema } from '../../shared/libs/config/rest.schema.js';
import { Config } from '../../shared/libs/config/config.interface.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private readonly config: Config<RestSchema>;

  constructor() {
    const container = createAppContainer();
    this.databaseClient = container.get<DatabaseClient>(Component.DatabaseClient);
    this.userService = container.get<UserService>(Component.UserService);
    this.offerService = container.get<OfferService>(Component.OfferService);
    this.config = container.get<Config<RestSchema>>(Component.Config);
  }

  private async saveOffer(line: string): Promise<void> {
    const [
      title,
      description,
      createdAtStr,
      city,
      previewImage,
      imagesStr,
      isPremiumStr,
      isFavoriteStr,
      ratingStr,
      type,
      bedroomsStr,
      maxAdultsStr,
      priceStr,
      goodsStr,
      userEmail,
      _,
      latitudeStr,
      longitudeStr
    ] = line.trim().split('\t');

    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      console.warn(chalk.yellow(`User with email=${userEmail} not found. Skipping offer "${title}".`));
      return;
    }

    await this.offerService.create({
      title,
      description,
      city,
      previewImage,
      images: imagesStr.split(';'),
      isPremium: isPremiumStr === 'true',
      isFavorite: isFavoriteStr === 'true',
      rating: Number(ratingStr),
      type: type as HousingType,
      bedrooms: Number(bedroomsStr),
      maxAdults: Number(maxAdultsStr),
      price: Number(priceStr),
      goods: goodsStr.split(';'),
      host: user.id,
      commentCount: 0,
      latitude: Number(latitudeStr),
      longitude: Number(longitudeStr),
      createdAt: createdAtStr,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filePath: string): Promise<void> {
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(uri);

    const reader = new TSVFileReader(filePath.trim());
    let importedCount = 0;

    reader.on('line', async (line: string) => {
      try {
        await this.saveOffer(line);
        importedCount++;
      } catch (error) {
        console.error(chalk.red(`Error processing line: ${line}`));
        console.error(chalk.red(error));
      }
    });

    reader.on('end', async () => {
      console.log(chalk.green(`Successfully imported ${importedCount} offers.`));
      await this.databaseClient.disconnect();
    });

    try {
      await reader.read();
    } catch (error) {
      console.error(chalk.red(`Failed to import data from file: ${filePath}`));
      console.error(chalk.red(error));
    }
  }
}
