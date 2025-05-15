import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as crypto from 'node:crypto';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
export class UserEntity extends defaultClasses.TimeStamps {
  private readonly salt!: string;

  @prop({
    required: true,
    unique: true,
    match: [/^.+@.+$/, 'Email must be valid']
  })
  public email!: string;

  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name!: string;

  @prop()
  public avatarUrl?: string;

  @prop({
    required: true,
    minlength: 64,
    maxlength: 64
  })
  private password!: string;

  @prop({ required: true, enum: ['usual', 'pro'], default: 'usual' })
  public type!: 'usual' | 'pro';

  constructor(dto: CreateUserDto, salt: string) {
    super();
    this.salt = salt;
    this.email = dto.email;
    this.name = dto.name;
    this.type = dto.type;
    this.setPassword(dto.password);
  }

  public setPassword(password: string) {
    this.password = crypto
      .createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
  }

  public verifyPassword(password: string) {
    const hashPassword = crypto
      .createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
