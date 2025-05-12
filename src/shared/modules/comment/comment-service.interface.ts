import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(dto: Partial<CommentEntity>): Promise<DocumentType<CommentEntity>>;
  findById(id: string): Promise<DocumentType<CommentEntity> | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
