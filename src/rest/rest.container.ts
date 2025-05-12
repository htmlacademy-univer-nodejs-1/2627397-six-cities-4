import { Container } from 'inversify';
import { Component } from '../shared/types/component.enum.js';

import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database/index.js';

import { UserModel } from '../shared/modules/user/user.entity.js';
import { DefaultUserService } from '../shared/modules/user/default-user.service.js';

import { OfferModel } from '../shared/modules/offer/offer.entity.js';
import { DefaultOfferService } from '../shared/modules/offer/default-offer.service.js';
import { RestApplication } from './rest.application.js';

export function createAppContainer(): Container {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();

  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();


  container.bind(Component.UserModel).toConstantValue(UserModel);
  container.bind(Component.UserService).to(DefaultUserService).inSingletonScope();

  container.bind(Component.OfferModel).toConstantValue(OfferModel);
  container.bind(Component.OfferService).to(DefaultOfferService).inSingletonScope();

  return container;
}
