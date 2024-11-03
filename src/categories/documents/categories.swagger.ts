import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryDto } from '../dtos/category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export const ApiFindAllCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find All Categories',
      description: `Retrieves a list of all categories available.`,
    }),
    ApiOkResponse({
      type: CategoryDto,
      description: `successful response with an array of category objects.`,
    }),
  );
};

export const ApiFindCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find Category',
      description: `Fetches the details of a specific category by its unique ID.`,
    }),
    ApiOkResponse({
      type: CategoryDto,
      description: `Category has been successfully founded.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be retrieved.`,
      type: Number,
    }),
  );
};

export const ApiCreateCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create Category',
      description: `Creates a new category with the provided name. (just ADMIN users)`,
    }),
    ApiCreatedResponse({
      description: `Category has been successfully created.`,
    }),

    ApiBody({
      type: CreateCategoryDto,
      description: `The data needed to create a new category, including the category name.`,
    }),
  );
};

export const ApiUpdateCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update Category',
      description: `Updates an existing category with new details based on the provided category ID. (just ADMIN users)`,
    }),
    ApiOkResponse({
      description: `Category has been successfully updated.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be updated.`,
      type: Number,
    }),
    ApiBody({
      type: UpdateCategoryDto,
      description: `The data required to update the category. Note: name must be unique.`,
    }),
  );
};

export const ApiDeleteCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete Category',
      description: `Deletes an existing category based on the provided category ID. (just ADMIN users)`,
    }),
    ApiOkResponse({
      description: `Category has been successfully deleted.`,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `The unique identifier of the category to be deleted.`,
      type: Number,
    }),
  );
};
