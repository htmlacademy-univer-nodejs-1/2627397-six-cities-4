import { injectable, inject } from 'inversify';
import { CommentModel } from './comment.entity.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultCommentService {
  constructor(
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.CommentModel) private model: typeof CommentModel,
    @inject(Component.OfferService) private offerService: OfferService
  ) {}

  public async createComment(dto: { text: string, rating: number, offerId: string, authorId: string }) {
    const comment = new this.model({
      text: dto.text,
      postDate: new Date(),
      rating: dto.rating,
      offerId: dto.offerId,
      author: dto.authorId
    });

    await comment.save();

    await this.offerService.incCommentCount(dto.offerId);

    this.logger.info(`Created comment for offer ${dto.offerId}`);
    return comment;
  }
}
