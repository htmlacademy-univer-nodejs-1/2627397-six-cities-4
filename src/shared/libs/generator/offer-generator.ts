import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { OffersData } from '../../types/offers.data.type.js';

export class OfferGenerator {
  constructor(private readonly data: OffersData) {}

  private generateLocation(city: string): [number, number] {
    const [baseLat, baseLng] = this.data.location.coords[city];
    const { min, max } = this.data.location.radius;
    const radius = generateRandomValue(min, max, 3);
    return [
      +(baseLat + generateRandomValue(-radius, radius, 6)),
      +(baseLng + generateRandomValue(-radius, radius, 6))
    ];
  }

  generate(): string {
    const city = getRandomItem(this.data.cities);
    const [latitude, longitude] = this.generateLocation(city);

    return [
      getRandomItem(this.data.titles),
      getRandomItem(this.data.descriptions),
      new Date().toISOString(),
      city,
      getRandomItem(this.data.previewImages),
      [...this.data.images.items].sort(() => 0.5 - Math.random()).slice(0, this.data.images.count).join(';'),
      Math.random() > 0.5,
      Math.random() > 0.5,
      generateRandomValue(this.data.rating.min, this.data.rating.max, this.data.rating.precision),
      getRandomItem(this.data.types),
      generateRandomValue(this.data.bedrooms.min, this.data.bedrooms.max),
      generateRandomValue(this.data.adults.min, this.data.adults.max),
      generateRandomValue(this.data.price.min, this.data.price.max),
      [...this.data.goods].sort(() => 0.5 - Math.random()).slice(0, generateRandomValue(1, this.data.goods.length)).join(';'),
      getRandomItem(this.data.emails),
      getRandomItem(this.data.avatars),
      latitude,
      longitude
    ].join('\t');
  }
}
