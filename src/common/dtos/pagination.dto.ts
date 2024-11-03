import { ApiProperty } from '@nestjs/swagger';
import { PaginationOptionDto } from './pagiantion-option.dto';

export class PaginationDto {
  @ApiProperty({ type: Number })
  pageCount: number;

  @ApiProperty({ type: Number })
  itemCount: number;

  @ApiProperty({ nullable: true })
  previousPage: number | null;

  @ApiProperty({ type: Number })
  currentPage: number;

  @ApiProperty({ nullable: true })
  nextPage: number | null;

  constructor({ limit, page }: PaginationOptionDto, itemCount: number) {
    this.pageCount = Math.ceil(itemCount / limit);
    this.itemCount = itemCount;
    this.previousPage = page - 1 < 1 ? null : page - 1;
    this.currentPage = page;
    this.nextPage = page + 1 > this.pageCount ? null : page + 1;
  }
}
