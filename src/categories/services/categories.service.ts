import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(categoryId: number) {
    return await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    });
  }

  async findByName(categoryName: string) {
    return await this.prisma.category.findUnique({
      where: { name: categoryName },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    });
  }

  async ensureCategoryExistsById(categoryId: number) {
    const category = await this.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
  }

  async ensureCategoryDoesNotExistByName(categoryName: string) {
    const category = await this.findByName(categoryName);
    if (category) {
      throw new ConflictException(`Category '${categoryName}' already exists.`);
    }
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    await this.ensureCategoryDoesNotExistByName(name);

    await this.prisma.category.create({
      data: { name },
    });
  }

  async updateById(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;

    await this.ensureCategoryExistsById(categoryId);
    await this.ensureCategoryDoesNotExistByName(name);

    await this.prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });
  }

  async deleteById(categoryId: number) {
    await this.ensureCategoryExistsById(categoryId);

    await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async existingCategories(categoryListId: number[]) {
    return await this.prisma.category.findMany({
      where: {
        id: { in: categoryListId },
      },
      select: { id: true },
    });
  }

  async validateCategories(categoriesIds: number[]) {
    const existingCategories = await this.existingCategories(categoriesIds);

    const existingCategoryIds = existingCategories.map(
      (category) => category.id,
    );

    const invalidCategoryIds = categoriesIds.filter(
      (id) => !existingCategoryIds.includes(id),
    );

    if (invalidCategoryIds.length > 0) {
      throw new BadRequestException(
        `The following category IDs do not exist: ${invalidCategoryIds.join(', ')}`,
      );
    }

    return existingCategories;
  }
}
