import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({ body, path, method }: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Validation error: ${this.formatValidationErrors(errors)}`,
        `${method} ${path}`
      );
    }

    next();
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors
      .map((error) => Object.values(error.constraints || {}))
      .flat()
      .join(', ');
  }
}
