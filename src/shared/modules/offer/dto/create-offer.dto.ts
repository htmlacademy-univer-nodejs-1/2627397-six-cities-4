import { IsString, IsNumber, IsBoolean, IsArray, IsInt, IsIn, IsMongoId, Length } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @Length(1, 255)
    title!: string;

  @IsString()
  @Length(1, 1024)
    description!: string;

  @IsNumber()
    price!: number;

  @IsIn(['apartment', 'house', 'room', 'hotel'])
    type!: 'apartment' | 'house' | 'room' | 'hotel';

  @IsBoolean()
    isPremium!: boolean;

  @IsBoolean()
    isFavorite!: boolean;

  @IsNumber()
    rating!: number;

  @IsString()
    createdAt!: string;

  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city!: string;

  @IsString()
    previewImage!: string;

  @IsArray()
  @IsString({ each: true })
    images!: string[];

  @IsArray()
  @IsString({ each: true })
    goods!: string[];

  @IsInt()
    bedrooms!: number;

  @IsInt()
    maxAdults!: number;

  @IsMongoId()
    host!: string;

  @IsInt()
    commentCount!: number;

  @IsNumber()
    latitude!: number;

  @IsNumber()
    longitude!: number;
}
