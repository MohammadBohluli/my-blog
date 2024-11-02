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
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;

  @IsPositive()
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @IsPositive()
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 2;
}
