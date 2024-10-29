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

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  body: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  categories: number[];
}
