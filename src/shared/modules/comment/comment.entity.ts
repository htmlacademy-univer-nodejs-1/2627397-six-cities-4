import { prop, modelOptions, defaultClasses, Ref, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

@modelOptions({ schemaOptions: { collection: 'comments', timestamps: true } })
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true }) public content!: string;
  @prop({ required: true }) public rating!: number;
  @prop({ ref: UserEntity, required: true }) public userId!: Ref<UserEntity>;
  @prop({ ref: OfferEntity, required: true }) public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
