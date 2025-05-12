import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}
  
  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const deletedOffer = await this.offerModel.findByIdAndDelete(offerId).exec();
    if (!deletedOffer) {
      this.logger.warn(`Offer with id ${offerId} not found for delete.`);
    } else {
      this.logger.info(`Offer with id ${offerId} deleted.`);
    }
    return deletedOffer;
  }

  public async getDetailsInfo(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      this.logger.warn(`Offer with id ${offerId} not found.`);
      return null;
    }
    this.logger.info(`Retrieved details for offer with id ${offerId}.`);
    return offer;
  }

  public async getFavorite(): Promise<DocumentType<OfferEntity>[]> {
    const favoriteOffers = await this.offerModel.find({ isFavorite: true }).exec();
    this.logger.info(`Retrieved ${favoriteOffers.length} favorite offers.`);
    return favoriteOffers;
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({
      ...dto,
      host: dto.host,
      postDate: new Date(dto.createdAt),
    });

    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limitCount = count ?? 10;
    return this.offerModel
      .find()
      .sort({ createdAt: 1 })
      .limit(limitCount)
      .exec();
  }

  public async updateById(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(dto.id, dto, { new: true }).exec();
  }

  public async getPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ isPremium: true }).exec();
  }

  public async calculateRating(rating: number, newRating: number, countRating: number, offerId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(
      offerId,
      { rating: (newRating + rating) / countRating },
      { new: true }
    ).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      throw new Error('Offer not found');
    }

    offer.commentCount += 1;
    await offer.save();

    this.logger.info(`Incremented comment count for offer ${offerId}. New count: ${offer.commentCount}`);
    return offer;
  }
}
