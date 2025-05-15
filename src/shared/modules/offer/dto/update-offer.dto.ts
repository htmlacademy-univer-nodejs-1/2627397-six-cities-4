import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsInt, IsIn, Length, Min, Max, ArrayMinSize, ArrayMaxSize } from 'class-validator';

const GOODS_LIST = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(10, 100)
    title?: string;

  @IsOptional()
  @IsString()
  @Length(20, 1024)
    description?: string;

  @IsOptional()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city?: string;

  @IsOptional()
  @IsString()
    previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
    images?: string[];

  @IsOptional()
  @IsBoolean()
    isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
    isFavorite?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(5)
    rating?: number;

  @IsOptional()
  @IsIn(['apartment', 'house', 'room', 'hotel'])
    type?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
    bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
    maxAdults?: number;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(100000)
    price?: number;

  @IsOptional()
  @IsArray()
  @IsIn(GOODS_LIST, { each: true })
    goods?: string[];

  @IsOptional()
  @IsNumber()
    latitude?: number;

  @IsOptional()
  @IsNumber()
    longitude?: number;
}
