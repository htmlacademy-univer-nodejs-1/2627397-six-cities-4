import { prop, modelOptions, defaultClasses, Ref, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

export enum HousingType { Apartment = 'apartment', House = 'house', Room = 'room', Hotel = 'hotel' }

@modelOptions({ schemaOptions: { collection: 'offers', timestamps: true } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true }) public title!: string;
  @prop({ required: true }) public description!: string;
  @prop({ required: true }) public postDate!: Date;
  @prop({ required: true, enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] }) public city!: string;
  @prop({ required: true }) public previewImage!: string;
  @prop({ required: true, type: () => [String] }) public images!: string[];
  @prop({ required: true }) public isPremium!: boolean;
  @prop({ required: true }) public isFavorite!: boolean;
  @prop({ required: true }) public rating!: number;
  @prop({ required: true, enum: Object.values(HousingType) }) public type!: HousingType;
  @prop({ required: true }) public bedrooms!: number;
  @prop({ required: true }) public maxAdults!: number;
  @prop({ required: true }) public price!: number;
  @prop({ required: true, type: () => [String] }) public goods!: string[];
  @prop({ ref: UserEntity, required: true }) public host!: Ref<UserEntity>;
  @prop({ required: true }) public commentCount!: number;
  @prop({ required: true }) public latitude!: number;
  @prop({ required: true }) public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
