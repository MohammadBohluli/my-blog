import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class ArticleCategoryDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  articleId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  categoryId: number;
}
