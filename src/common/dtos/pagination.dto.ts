import { PaginationOptionDto } from './pagiantion-option.dto';

export class PaginationDto {
  pageCount: number;

  itemCount: number;

  previousPage: number | null;

  currentPage: number;

  nextPage: number | null;

  constructor({ limit, page }: PaginationOptionDto, itemCount: number) {
    this.pageCount = Math.ceil(itemCount / limit);
    this.itemCount = itemCount;
    this.previousPage = page - 1 < 1 ? null : page - 1;
    this.currentPage = page;
    this.nextPage = page + 1 > this.pageCount ? null : page + 1;
  }
}
