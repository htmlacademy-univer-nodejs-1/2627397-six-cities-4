import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { DocumentExists } from '../../types/document-exists.interface.js';

export interface UserService extends DocumentExists {
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateAvatar(userId: string, avatarUrl: string): Promise<UserEntity | null>;
}
