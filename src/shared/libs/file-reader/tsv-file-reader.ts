import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { City, HousingType, Offer } from '../../types/offer.type.js';

export class TSVFileReader implements FileReader<Offer> {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('Read file with read() first');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => {
        const fields = line.split('\t');
        return {
          title:       fields[0],
          description: fields[1],
          createdAt:   fields[2],
          city:        fields[3] as City,
          previewImage:fields[4],
          images:      fields[5].split(';'),
          isPremium:   fields[6] === 'true',
          isFavorite:  fields[7] === 'true',
          rating:      parseFloat(fields[8]),
          type:        fields[9] as HousingType,
          bedrooms:    parseInt(fields[10], 10),
          maxAdults:   parseInt(fields[11], 10),
          price:       parseInt(fields[12], 10),
          goods:       fields[13].split(';'),
          email:       fields[14],
          avatarUrl:   fields[15],
          latitude:    parseFloat(fields[16]),
          longitude:   parseFloat(fields[17]),
        } as Offer;
      });
  }
}
