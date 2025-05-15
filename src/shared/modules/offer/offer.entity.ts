import { prop, modelOptions, defaultClasses, Ref, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

export enum HousingType { Apartment = 'apartment', House = 'house', Room = 'room', Hotel = 'hotel' }

@modelOptions({ schemaOptions: { collection: 'offers', timestamps: true } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: 10,
    maxlength: 100
  })
  public title!: string;

  @prop({
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  public description!: string;

  @prop({
    required: true,
    default: Date.now
  })
  public postDate!: Date;

  @prop({
    required: true,
    enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']
  })
  public city!: string;

  @prop({ required: true })
  public previewImage!: string;

  @prop({
    required: true,
    type: () => [String],
    validate: [(arr: string[]) => arr.length === 6, 'Images must contain exactly 6 items']
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: (v: number) => !isNaN(v) && Number.isFinite(v) && v >= 1 && v <= 5,
      message: 'Rating must be between 1 and 5'
    }
  })
  public rating!: number;

  @prop({
    required: true,
    enum: Object.values(HousingType)
  })
  public type!: HousingType;

  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
    validate: {
      validator: (v: number) => Number.isInteger(v),
      message: 'Price must be an integer'
    }
  })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    validate: [(arr: string[]) => arr.length >= 1, 'At least one good must be specified']
  })
  public goods!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public host!: Ref<UserEntity>;

  @prop({
    required: true,
    default: 0
  })
  public commentCount!: number;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= -90 && v <= 90,
      message: 'Latitude must be between -90 and 90'
    }
  })
  public latitude!: number;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= -180 && v <= 180,
      message: 'Longitude must be between -180 and 180'
    }
  })
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
