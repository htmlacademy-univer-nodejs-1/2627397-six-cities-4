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
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.UserModel) private model: typeof UserModel
  ) {}

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.model.findOne({ email }).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.model.findById(id).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new this.model({
      email: dto.email,
      firstname: dto.firstname,
      lastname: dto.lastname,
      avatarUrl: dto.avatarUrl,
      type: dto.type
    } as UserEntity);
    user.setPassword(dto.password, salt);
    await user.save();
    this.logger.info(`User created: ${user.email}`);
    return user;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existing = await this.findByEmail(dto.email);
    return existing ?? this.create(dto, salt);
  }
}
