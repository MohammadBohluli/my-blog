import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/types/current-user.type';
import { ResponsMessage } from 'src/common/decorators/response-message.decorator';
import { PaginationOptionDto } from 'src/common/dtos/pagiantion-option.dto';
import { Serializer } from 'src/common/interceptors/serialize.interceptor';
import {
  ApiCreateArticleSwagger,
  ApiDeleteArticleCategorySwagger,
  ApiDeleteArticleSwagger,
  ApiFindAllArticleSwagger,
  ApiFindArticleSwagger,
  ApiUpdateArticleCategorySwagger,
  ApiUpdateArticleSwagger,
} from '../documents/articles.swagger';
import { ArticleCategoryDto } from '../dtos/article-category.dto';
import { ArticleDto } from '../dtos/article.dto';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { IsAuthorOrAdminGuard } from '../guards/is-owner-or-admin/is-author-or-admin.guard';
import { ArticlesService } from '../services/articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @ApiFindAllArticleSwagger()
  @Get()
  async findAll(@Query() query: PaginationOptionDto) {
    return await this.articleService.findAll(query);
  }

  @Serializer(ArticleDto)
  @ApiFindArticleSwagger()
  @Get(':articleId')
  async find(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.findById(articleId);
  }

  @ApiCreateArticleSwagger()
  @Serializer(ArticleDto)
  @ResponsMessage('article has been successfully created.')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateArticleDto, @User() user: CurrentUser) {
    return await this.articleService.create(user.userId, body);
  }

  @ApiUpdateArticleSwagger()
  @Serializer(ArticleDto)
  @ResponsMessage('article has been successfully updated.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @Patch(':articleId')
  async update(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() body: UpdateArticleDto,
  ) {
    return await this.articleService.update(articleId, body);
  }

  @ApiDeleteArticleSwagger()
  @ResponsMessage('article has been successfully deleted.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @Delete(':articleId')
  async delete(@Param('articleId', ParseIntPipe) articleId: number) {
    await this.articleService.delete(articleId);
  }

  @ApiDeleteArticleCategorySwagger()
  @ResponsMessage('article category has been successfully deleted.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @Delete(':articleId/categories/:categoryId')
  async deleteArticleCategory(@Param() params: ArticleCategoryDto) {
    await this.articleService.deleteArticleCategory(params);
  }

  @ApiUpdateArticleCategorySwagger()
  @ResponsMessage('article category has been successfully updated.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':articleId/categories/:categoryId')
  async updateArticleCategory(@Param() params: ArticleCategoryDto) {
    await this.articleService.updateArticleCategory(params);
  }
}
