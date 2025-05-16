import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { HttpMethod } from '../../types/http-methods.enum.js';
import { fillDTO } from '../../helpers/common.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamOfferId } from '../../types/offer-param-id.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import { BaseController } from '../../controller/base.controller.js';
import { ValidateDtoMiddleware } from '../../middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../middlewares/document-exists.middleware.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offersService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
  }

  public async index({ query }: Request<unknown, unknown, unknown, { limit?: number }>, res: Response): Promise<void> {
    const limit = query.limit && !isNaN(+query.limit) ? +query.limit : 60;
    const offers = await this.offersService.find(limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offersService.create(body);
    this.created(res, fillDTO(OfferRdo, result, { groups: ['detailed'] }));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offersService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async update(
    { params, body }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offersService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer, { groups: ['detailed'] }));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offersService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer, { groups: ['detailed'] }));
  }

  public async getPremium(
    req: Request,
    res: Response
  ): Promise<void> {
    const { city } = req.query;
    const offers = await this.offersService.getPremium(city as string);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
