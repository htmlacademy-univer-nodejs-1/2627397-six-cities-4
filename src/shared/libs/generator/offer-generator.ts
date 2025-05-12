import { generateRandomValue, getRandomItem, getRandomItems, getRandomBoolean } from '../../utils/random.js';
import { OffersData } from '../../types/offers.data.type.js';

export class OfferGenerator {
  constructor(private data: OffersData) {}

  generate(): string {
    const title = getRandomItem(this.data.titles);
    const description = getRandomItem(this.data.descriptions);
    const createdAt = new Date().toISOString();
    const city = getRandomItem(this.data.cities);
    const previewImage = getRandomItem(this.data.previewImages);
    const images = getRandomItems(this.data.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(1, 5, 1);
    const type = getRandomItem(this.data.types);
    const bedrooms = generateRandomValue(1, 8);
    const maxAdults = generateRandomValue(1, 10);
    const price = generateRandomValue(100, 100000);
    const goods = getRandomItems(this.data.goods).join(';');
    const email = getRandomItem(this.data.emails);
    const avatarUrl = getRandomItem(this.data.avatars);
    const latitude = generateRandomValue(48.85661, 53.550341, 6);
    const longitude = generateRandomValue(2.351499, 10.000654, 6);

    return [
      title,
      description,
      createdAt,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      email,
      avatarUrl,
      latitude,
      longitude
    ].join('\t');
  }
}
