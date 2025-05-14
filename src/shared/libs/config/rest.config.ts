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
      throw new Error('Не удалось загрузить .env файл');
    }

    try {
      configRestSchema.load({});
      configRestSchema.validate({ allowed: 'strict', output: this.logger.info });
    } catch (error) {
      const err = error as Error;
      const missingVars = err.message.match(/[A-Z_]+(?=:)/g) || [];
      throw new Error(`Отсутствуют переменные окружения: ${missingVars.join(', ')}\n`);
    }

    this.config = configRestSchema.getProperties();
    this.logger.debug('Конфигурация успешно загружена');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
