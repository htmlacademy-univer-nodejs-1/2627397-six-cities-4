import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<any>,
  ) {}

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
  }
}
