import { prop, modelOptions, defaultClasses, Ref, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

export enum HousingType { Apartment = 'apartment', House = 'house', Room = 'room', Hotel = 'hotel' }

const GOODS_LIST = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

@modelOptions({ schemaOptions: { collection: 'offers', timestamps: true } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 10, maxlength: 100 }) public title!: string;
  @prop({ required: true, minlength: 20, maxlength: 1024 }) public description!: string;
  @prop({ required: true }) public postDate!: Date;
  @prop({ required: true, enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] }) public city!: string;
  @prop({ required: true }) public previewImage!: string;
  @prop({ required: true, type: () => [String], validate: [(arr: string[]) => arr.length === 6, 'Images must contain exactly 6 items'] }) public images!: string[];
  @prop({ required: true }) public isPremium!: boolean;
  @prop({ required: true }) public isFavorite!: boolean;
  @prop({ required: true, min: 1, max: 5 }) public rating!: number;
  @prop({ required: true, enum: Object.values(HousingType) }) public type!: HousingType;
  @prop({ required: true, min: 1, max: 8 }) public bedrooms!: number;
  @prop({ required: true, min: 1, max: 10 }) public maxAdults!: number;
  @prop({ required: true, min: 100, max: 100000 }) public price!: number;
  @prop({ required: true, type: () => [String], enum: GOODS_LIST }) public goods!: string[];
  @prop({ ref: UserEntity, required: true }) public host!: Ref<UserEntity>;
  @prop({ required: true }) public commentCount!: number;
  @prop({ required: true }) public latitude!: number;
  @prop({ required: true }) public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
