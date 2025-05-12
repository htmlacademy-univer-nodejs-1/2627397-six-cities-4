import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, unique: true }) public email!: string;
  @prop({ required: true }) public firstname!: string;
  @prop({ required: true }) public lastname!: string;
  @prop() public avatarUrl?: string;
  @prop() private password?: string;
  @prop({ required: true, enum: ['usual','pro'], default: 'usual' }) public type!: 'usual' | 'pro';

  public setPassword(raw: string, salt: string) {
    this.password = raw + salt;
  }

  public checkPassword(raw: string, salt: string): boolean {
  return this.password === raw + salt;
  }

}

export const UserModel = getModelForClass(UserEntity);
