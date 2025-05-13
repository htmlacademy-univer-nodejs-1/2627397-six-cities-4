import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public content!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public createdAt!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public offerId!: string;
}
