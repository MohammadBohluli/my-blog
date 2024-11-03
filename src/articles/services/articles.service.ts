import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { CategoriesService } from 'src/categories/services/categories.service';
import {
  Order,
  PaginationOptionDto,
} from 'src/common/dtos/pagiantion-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { slugify } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleCategoryDto } from '../dtos/article-category.dto';
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
      include: {
        categories: { select: { id: true, name: true } },
        author: true,
      },
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

    return await this.prisma.article.create({
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
      include: { categories: true, author: true },
    });
  }

  async update(articleId: number, updateArticleDto: UpdateArticleDto) {
    const { body, title, status } = updateArticleDto;

    return await this.prisma.article.update({
      where: { id: articleId },
      data: {
        body,
        status,
        title,
        slug: title ? slugify(title) : undefined,
      },
      include: { categories: true, author: true },
    });
  }

  async delete(articleId: number) {
    await this.findById(articleId);
    await this.prisma.article.delete({ where: { id: articleId } });
  }

  async deleteArticleCategory(articleCategoryDto: ArticleCategoryDto) {
    const { articleId, categoryId } = articleCategoryDto;

    const article = await this.findById(articleId);
    const category = await this.categoryService.findById(categoryId);
    if (!category) throw new NotFoundException('category not found');

    const categoriesId = article.categories.map((cat) => cat.id);
    if (!categoriesId.includes(categoryId)) {
      throw new NotFoundException(
        'The specified category is not associated with this article',
      );
    }

    if (
      article.categories.length === 1 &&
      article.categories[0].id === categoryId
    ) {
      throw new BadRequestException(
        'An article must have at least one category.',
      );
    }

    await this.prisma.article.update({
      where: { id: articleId },
      data: { categories: { disconnect: { id: categoryId } } },
    });
  }

  async updateArticleCategory(articleCategoryDto: ArticleCategoryDto) {
    const { articleId, categoryId } = articleCategoryDto;

    await this.findById(articleId);
    const category = await this.categoryService.findById(categoryId);
    if (!category) throw new NotFoundException('category not found');

    await this.prisma.article.update({
      where: { id: articleId },
      data: { categories: { connect: { id: categoryId } } },
    });
  }
}
