import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as crypto from 'crypto';
import { inject } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { RestConfig } from '../../libs/config/rest.config.js';

@modelOptions({ 
  schemaOptions: { 
    collection: 'users',
    timestamps: true 
  } 
})
export class UserEntity extends defaultClasses.TimeStamps {
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
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12']
  })
  private password!: string;

  @prop({ required: true, enum: ['usual', 'pro'], default: 'usual' })
  public type!: 'usual' | 'pro';

  constructor(dto: CreateUserDto, @inject(Component.Config) private readonly config: RestConfig) {
    super();
    this.email = dto.email;
    this.name = dto.name;
    this.type = dto.type;
    this.setPassword(dto.password);
  }

  public setPassword(password: string) {
    const salt = this.config.get('SALT');
    this.password = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');
  }

  public verifyPassword(password: string) {
    const salt = this.config.get('SALT');
    const hashPassword = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
