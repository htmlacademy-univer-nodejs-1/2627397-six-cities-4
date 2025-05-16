import { injectable, inject } from 'inversify';
import { UserService } from './user-service.interface.js';
import { UserModel, UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email }).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto, salt);

    const result = await this.userModel.create(user) as DocumentType<UserEntity>;

    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  public async updateAvatar(userId: string, avatarUrl: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return null;
    }

    user.avatarUrl = avatarUrl;
    await user.save();
    return user as DocumentType<UserEntity>;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.userModel.exists({ _id: documentId })) !== null;
  }
}
