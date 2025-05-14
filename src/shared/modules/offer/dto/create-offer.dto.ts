import { IsString, IsNumber, IsBoolean, IsArray, IsInt, IsIn, IsMongoId, Length, Min, Max, ArrayMinSize, ArrayMaxSize, IsDateString, IsLatitude, IsLongitude } from 'class-validator';

const GOODS_LIST = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export class CreateOfferDto {
  @IsString()
  @Length(10, 100)
  title!: string;

  @IsString()
  @Length(20, 1024)
  description!: string;

  @IsDateString()
  createdAt!: string;

  @IsString()
  @IsIn(CITIES)
  city!: string;

  @IsString()
  previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  images!: string[];

  @IsBoolean()
  isPremium!: boolean;

  @IsBoolean()
  isFavorite!: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @IsIn(['apartment', 'house', 'room', 'hotel'])
  type!: string;

  @IsInt()
  @Min(1)
  @Max(8)
  bedrooms!: number;

  @IsInt()
  @Min(1)
  @Max(10)
  maxAdults!: number;

  @IsInt()
  @Min(100)
  @Max(100000)
  price!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(GOODS_LIST, { each: true })
  goods!: string[];

  @IsMongoId()
  host!: string;

  @IsNumber()
  @IsLatitude()
  latitude!: number;

  @IsNumber()
  @IsLongitude()
  longitude!: number;
}
