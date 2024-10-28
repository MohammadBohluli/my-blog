import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;
}
