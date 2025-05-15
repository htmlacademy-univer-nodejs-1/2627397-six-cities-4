import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { createErrorObject } from '../helpers/common.js';
import { HttpError } from '../errors/http-error.js';
import { Logger } from '../libs/logger/logger.interface.js';
import { Component } from '../types/component.enum.js';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  private handleHttpError(error: HttpError, req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${req.method} ${req.path}] ${error.detail}: ${error.httpStatusCode} — ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${req.method} ${req.path}] Internal error: ${error.message}`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject('Internal Server Error'));
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }
    this.handleOtherError(error, req, res, next);
  }
}
