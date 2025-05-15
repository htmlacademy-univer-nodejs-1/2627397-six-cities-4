import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public price!: number;

  @Expose()
  public title!: string;

  @Expose()
  public type!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  public createdAt!: string;

  @Expose({ groups: ['detailed'] })
  public description!: string;

  @Expose({ groups: ['detailed'] })
  public images!: string[];

  @Expose({ groups: ['detailed'] })
  public bedrooms!: number;

  @Expose({ groups: ['detailed'] })
  public maxAdults!: number;

  @Expose({ groups: ['detailed'] })
  public goods!: string[];

  @Expose({ groups: ['detailed'] })
  public host!: string;

  @Expose({ groups: ['detailed'] })
  public latitude!: number;

  @Expose({ groups: ['detailed'] })
  public longitude!: number;
}
