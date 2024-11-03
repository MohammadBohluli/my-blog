import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty({ required: true, minLength: 5, maxLength: 100, type: String })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: true, minLength: 10, type: String })
  @IsOptional()
  @IsString()
  @MinLength(10)
  body: string;

  @ApiProperty({ required: true, enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
