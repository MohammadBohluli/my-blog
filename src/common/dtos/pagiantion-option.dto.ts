import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
export class PaginationOptionDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsPositive()
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 2,
  })
  @IsPositive()
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 2;
}
