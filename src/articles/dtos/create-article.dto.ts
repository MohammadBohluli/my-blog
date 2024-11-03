import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true, minLength: 5, maxLength: 100, type: String })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: true, minLength: 10, type: String })
  @IsString()
  @MinLength(10)
  body: string;

  @ApiProperty({ required: true, enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    required: true,
    minimum: 1,
    type: [Number],
    example: '[1,2]',
    description: 'array of categoryId',
  })
  @IsArray()
  @ArrayMinSize(1)
  categories: number[];
}
