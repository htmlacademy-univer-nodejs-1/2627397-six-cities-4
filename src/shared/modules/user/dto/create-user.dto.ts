import { IsEmail, IsString, IsOptional, Length, IsIn, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(1, 15)
  name!: string;

  @IsOptional()
  @IsString()
  @Matches(/\.(jpg|png)$/i, { message: 'Avatar must be a .jpg or .png image' })
  avatarUrl?: string;

  @IsString()
  @Length(6, 12)
  password!: string;

  @IsIn(['usual', 'pro'])
  type!: 'usual' | 'pro';
}
