import { IsString, IsNumber, IsBoolean, IsArray, IsInt, IsIn, IsMongoId, Length, Min, Max, ArrayMinSize, ArrayMaxSize } from 'class-validator';

const GOODS_LIST = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

export class CreateOfferDto {
  @IsString()
  @Length(10, 100)
  title!: string;

  @IsString()
  @Length(20, 1024)
  description!: string;

  @IsNumber()
  @Min(100)
  @Max(100000)
  price!: number;

  @IsIn(['apartment', 'house', 'room', 'hotel'])
  type!: 'apartment' | 'house' | 'room' | 'hotel';

  @IsBoolean()
  isPremium!: boolean;

  @IsBoolean()
  isFavorite!: boolean;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  createdAt!: string;

  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
  city!: string;

  @IsString()
  previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  images!: string[];

  @IsArray()
  @IsIn(GOODS_LIST, { each: true })
  goods!: string[];

  @IsInt()
  @Min(1)
  @Max(8)
  bedrooms!: number;

  @IsInt()
  @Min(1)
  @Max(10)
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
