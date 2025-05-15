import { IsString, Length, IsInt, Min, Max, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(5, 1024)
    content!: string;

  @IsInt()
  @Min(1)
  @Max(5)
    rating!: number;

  @IsMongoId()
    userId!: string;

  @IsMongoId()
    offerId!: string;
}
