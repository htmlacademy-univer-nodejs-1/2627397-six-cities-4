import express, { Express, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { DatabaseClient } from '../shared/libs/database/database-client.interface.js';
import { getMongoURI } from '../shared/utils/database.js';
import { BaseController } from '../shared/controller/base.controller.js';
import { ExceptionFilterInterface } from '../shared/exception-filter/exception-filter.interface.js';
import { resolve } from 'node:path';

@injectable()
export class RestApplication {
  private expressApp: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilterInterface) private readonly exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private readonly userController: BaseController,
    @inject(Component.OfferController) private readonly offerController: BaseController,
    @inject(Component.CommentController) private readonly commentController: BaseController,
  ) {
    this.expressApp = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initMiddleware() {
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
    this.expressApp.use(json());
    const staticDir = this.config.get('UPLOAD_DIRECTORY');
    this.expressApp.use('/static', express.static(resolve(staticDir)));
    this.logger.info('Middleware initialized');
  }

  private async _initRoutes() {
    this.logger.info('Initializing controllers...');
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/comments', this.commentController.router);
    this.logger.info('Controllers initialized.');
  }

  private async _initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters initialized');
  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);

    this.logger.info('Connecting to database…');
    await this._initDb();
    this.logger.info('Database connected');

    await this._initMiddleware();
    await this._initRoutes();
    await this._initExceptionFilters();

    this.expressApp.listen(this.config.get('PORT'), () => {
      this.logger.info(`Server started on port ${this.config.get('PORT')}`);
    });
  }
}
