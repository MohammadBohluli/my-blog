import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/types/current-user.type';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { IsAuthorOrAdminGuard } from '../guards/is-owner-or-admin/is-author-or-admin.guard';
import { ArticlesService } from '../services/articles.service';
import { ResponsMessage } from 'src/common/decorators/response-message.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get('/')
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':articleId')
  async find(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.findById(articleId);
  }

  @ResponsMessage('article has been successfully created.')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() body: CreateArticleDto, @User() user: CurrentUser) {
    await this.articleService.create(user.userId, body);
  }

  @ResponsMessage('article has been successfully updated.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @Patch(':articleId')
  async update(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() body: UpdateArticleDto,
  ) {
    await this.articleService.update(articleId, body);
  }

  @ResponsMessage('article has been successfully deleted.')
  @UseGuards(JwtAuthGuard, IsAuthorOrAdminGuard)
  @Delete(':articleId')
  async delete(@Param('articleId', ParseIntPipe) articleId: number) {
    await this.articleService.delete(articleId);
  }
}
