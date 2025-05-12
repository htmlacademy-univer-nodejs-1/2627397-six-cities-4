import {injectable} from 'inversify';
import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Route } from '../types/route.interface.js';
import { BaseControllerInterface } from './base-controller.interface.js';
import asyncHandler from 'express-async-handler';
import { Logger } from '../libs/logger/index.js';

@injectable()
export abstract class BaseController implements BaseControllerInterface {
  private readonly _router: Router;
  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(this: BaseController, route: Route) {
    this._router[route.method](route.path, asyncHandler(route.handler.bind(this)));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}