import { injectable, inject } from 'inversify';
import { CommentModel } from './comment.entity.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentService } from './comment-service.interface.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.CommentModel) private model: typeof CommentModel,
    @inject(Component.OfferService) private offerService: OfferService
  ) {}

  public async create(dto: CreateCommentDto) {
    const comment = await this.model.create(dto);
    await comment.save();

    await this.offerService.incCommentCount(dto.offerId);

    this.logger.info(`Created comment for offer ${dto.offerId}`);
    return comment;
  }

  public async findByOfferId(offerId: string) {
    return this.model.find({ offerId })
      .sort({ createdAt: -1 })
      .limit(50)
      .exec();
  }
}
