import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsInt, IsIn, IsMongoId, Length } from 'class-validator';

export class UpdateOfferDto {
  @IsMongoId()
    id!: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
    title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 1024)
    description?: string;

  @IsOptional()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city?: string;

  @IsOptional()
  @IsString()
    previewImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
    images?: string[];

  @IsOptional()
  @IsBoolean()
    isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
    isFavorite?: boolean;

  @IsOptional()
  @IsNumber()
    rating?: number;

  @IsOptional()
  @IsIn(['apartment', 'house', 'room', 'hotel'])
    type?: string;

  @IsOptional()
  @IsInt()
    bedrooms?: number;

  @IsOptional()
  @IsInt()
    maxAdults?: number;

  @IsOptional()
  @IsNumber()
    price?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
    goods?: string[];

  @IsOptional()
  @IsNumber()
    latitude?: number;

  @IsOptional()
  @IsNumber()
    longitude?: number;
}
