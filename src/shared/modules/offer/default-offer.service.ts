import { injectable, inject } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { OfferModel, OfferEntity } from './offer.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.OfferModel) private model: typeof OfferModel
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
}
