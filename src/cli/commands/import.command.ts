import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { getMongoURI } from '../../shared/utils/database.js';
import { createAppContainer } from '../../rest/rest.container.js';
import { Component } from '../../shared/types/component.enum.js';
import { DatabaseClient } from '../../shared/libs/database/database-client.interface.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { HousingType } from '../../shared/modules/offer/offer.entity.js';
import { Ref }         from '@typegoose/typegoose';
import { UserEntity }  from '../../shared/modules/user/user.entity.js';
import { RestSchema } from '../../shared/libs/config/rest.schema.js';
import { Config } from '../../shared/libs/config/config.interface.js';


export class ImportCommand implements Command {
  private dbClient: DatabaseClient;
  private userService: UserService;
  private offerService: OfferService;
  private readonly config: Config<RestSchema>;

  constructor() {
    const container = createAppContainer();
    this.dbClient     = container.get<DatabaseClient>(Component.DatabaseClient);
    this.userService  = container.get<UserService>(Component.UserService);
    this.offerService = container.get<OfferService>(Component.OfferService);
    this.config = container.get<Config<RestSchema>>(Component.Config);
  }

  public getName() {
    return '--import';
  }

  public async execute(
    filePath: string
  ): Promise<void> {
 
    const uri = getMongoURI(this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'))

    await this.dbClient.connect(uri);

    const reader = new TSVFileReader(filePath.trim());
    reader.on('line', async (line: string, resolve: () => void) => {
      const cols = line.trim().split('\t');

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
        _,
        bedroomsStr,
        maxAdultsStr,
        priceStr,
        goodsStr,
        userIdStr,
        latitudeStr,
        longitudeStr
      ] = cols;

      const user = await this.userService.findById(userIdStr);
      if (!user) {
        console.warn(`User with id=${userIdStr} not found. Skipping offer "${title}".`);
        return resolve();
      }

      await this.offerService.create({
        title,
        description,
        postDate: new Date(createdAtStr),
        city,
        previewImage,
        images: imagesStr.split(';'),
        isPremium: isPremiumStr === 'true',
        isFavorite: isFavoriteStr === 'true',
        rating: Number(ratingStr),
        type: cols[9] as HousingType,
        bedrooms: Number(bedroomsStr),
        maxAdults: Number(maxAdultsStr),
        price: Number(priceStr),
        goods: goodsStr.split(';'),
        userId: user._id as Ref<UserEntity>,
        commentCount: 0,
        latitude: Number(latitudeStr),
        longitude: Number(longitudeStr)
      });

      resolve();
    });

    reader.on('end', async (total: number) => {
      console.log(`Imported ${total} offers`);
      await this.dbClient.disconnect();
    });

    try {
      await reader.read();
    } catch (err) {
      console.error(`Import failed: ${(err as Error).message}`);
    }
  }
}
