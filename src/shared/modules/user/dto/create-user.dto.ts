import { IsEmail, IsString, IsOptional, Length, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
    email!: string;

  @IsString()
  @Length(1, 50)
    firstname!: string;

  @IsString()
  @Length(1, 50)
    lastname!: string;

  @IsOptional()
  @IsString()
    avatarUrl?: string;

  @IsString()
  @Length(6, 100)
    password!: string;

  @IsIn(['usual', 'pro'])
    type!: 'usual' | 'pro';
}
