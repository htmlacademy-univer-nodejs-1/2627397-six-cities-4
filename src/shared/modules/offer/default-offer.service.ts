import { injectable, inject } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { OfferModel, OfferEntity } from './offer.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentModel } from '../comment/comment.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.OfferModel) private model: typeof OfferModel,
    @inject(Component.CommentModel) private commentModel: typeof CommentModel
  ) {}

  public async create(dto: Partial<OfferEntity>) {
    const offer = new this.model(dto);
    await offer.save();
    this.logger.info(`Offer created: ${offer.title}`);
    return offer;
  }

  public async findById(id: string) {
    return this.model.findById(id).exec();
  }

  public async updateRating(offerId: string) {
    const offer = await this.model.findById(offerId).exec();
    if (!offer) {
      throw new Error('Offer not found');
    }

    const reviews = await this.commentModel.find({ offerId });
    const rating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    offer.rating = rating;

    await offer.save();
    this.logger.info(`New rating for offer ${offerId}: ${rating}`);
  }

  public async incCommentCount(offerId: string) {
    const offer = await this.model.findById(offerId).exec();
    if (!offer) {
      throw new Error('Offer not found');
    }

    offer.commentCount += 1;

    await offer.save();

    this.logger.info(`Inc comment count for offer ${offerId}. New count: ${offer.commentCount}`);
    return offer;
  }
}
