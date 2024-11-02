import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { CategoriesService } from 'src/categories/services/categories.service';
import {
  Order,
  PaginationOptionDto,
} from 'src/common/dtos/pagiantion-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { slugify } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoriesService,
  ) {}

  async findById(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) throw new NotFoundException('article not found');

    return article;
  }

  async findAll(query: PaginationOptionDto) {
    const { limit, page, order } = query;

    const orderBy = order ? order : Order.DESC;

    const articles = await this.prisma.article.findMany({
      where: { status: Status.PUBLISHED },
      orderBy: { updatedAt: orderBy },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalCount = await this.prisma.article.count({
      where: { status: Status.PUBLISHED },
    });

    const pagination = new PaginationDto({ limit, page }, totalCount);

    return { articles, pagination };
  }

  async create(userId: number, createArticleDto: CreateArticleDto) {
    const { body, categories, title, status } = createArticleDto;

    const validatedCategories =
      await this.categoryService.validateCategories(categories);

    await this.prisma.article.create({
      data: {
        authorId: userId,
        status,
        body,
        title,
        slug: slugify(title),
        categories: {
          connect: validatedCategories.map(({ id }) => ({ id })),
        },
      },
    });
  }

  async update(articleId: number, updateArticleDto: UpdateArticleDto) {
    const { body, categories, title, status } = updateArticleDto;

    const validatedCategories = categories
      ? await this.categoryService.validateCategories(categories)
      : [];

    await this.prisma.article.update({
      where: { id: articleId },
      data: {
        body,
        status,
        title,
        slug: title ? slugify(title) : undefined,
        categories: { connect: validatedCategories.map(({ id }) => ({ id })) },
      },
    });
  }

  async delete(articleId: number) {
    await this.findById(articleId);
    await this.prisma.article.delete({ where: { id: articleId } });
  }
}
