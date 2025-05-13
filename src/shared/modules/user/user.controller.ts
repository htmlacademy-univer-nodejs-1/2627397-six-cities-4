import { Config } from '../../libs/config/config.interface.js';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { HttpMethod } from '../../types/http-methods.enum.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user-service.interface.js';
import { Request, Response } from 'express';
import { UserRdo } from './rdo/user.rdo.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { BaseController } from '../../controller/base.controller.js';
import { HttpError } from '../../errors/http-error.js';
import { ValidateDtoMiddleware } from '../../middlewares/validate-dto.middleware.js';
import { UploadFileMiddleware } from '../../middlewares/upload-file.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../middlewares/document-exists.middleware.js';
import { ParamUserId } from '../../types/user-param-id.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({
      path: '/avatar/:userId',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async uploadAvatar(
    req: Request<ParamUserId>,
    res: Response
  ): Promise<void> {
    const { userId } = req.params;
    if (!req.file) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
      return;
    }
    const updatedUser = await this.userService.updateAvatar(userId, `/static/${req.file.filename}`);
    res.status(StatusCodes.CREATED).json({ avatarUrl: updatedUser?.avatarUrl });
  }
}
