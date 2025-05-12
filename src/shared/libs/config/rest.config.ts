import { inject, injectable } from 'inversify';
import dotenv from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/logger.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = dotenv.config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('Configuration file successfully parsed');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
