import { Category, Status } from '@prisma/client';

export class ArticleDto {
  id: number;

  title: string;

  slug: string;

  body: string;

  status: Status;

  categories: Category[];

  authorId: number;
  createdAt: Date;

  updatedAt: Date;
}
