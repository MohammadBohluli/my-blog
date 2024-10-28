import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ResponsMessage } from 'src/common/decorators/response-message.decorator';
import {
  ApiCreateCategorySwagger,
  ApiDeleteCategorySwagger,
  ApiFindAllCategorySwagger,
  ApiFindCategorySwagger,
  ApiUpdateCategorySwagger,
} from '../documents/categories.swagger';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiFindAllCategorySwagger()
  @Get('/')
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiFindCategorySwagger()
  @Get(':categoryId')
  async find(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = await this.categoriesService.findById(categoryId);
    if (!category) throw new NotFoundException('category not found.');
    return category;
  }

  @ApiCreateCategorySwagger()
  @Roles('ADMIN')
  @ResponsMessage('category has been successfully created.')
  @Post('/')
  async create(@Body() body: CreateCategoryDto) {
    await this.categoriesService.create(body);
  }

  @ApiUpdateCategorySwagger()
  @Roles('ADMIN')
  @ResponsMessage('category has been successfully updated.')
  @Patch(':categoryId')
  async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() body: UpdateCategoryDto,
  ) {
    await this.categoriesService.updateById(categoryId, body);
  }

  @ApiDeleteCategorySwagger()
  @Roles('ADMIN')
  @ResponsMessage('category has been successfully deleted.')
  @Delete(':categoryId')
  async delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    await this.categoriesService.deleteById(categoryId);
  }
}
