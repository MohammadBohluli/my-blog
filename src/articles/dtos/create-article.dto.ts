import { Status } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(10)
  body: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsArray()
  @ArrayMinSize(1)
  categories: number[];
}
