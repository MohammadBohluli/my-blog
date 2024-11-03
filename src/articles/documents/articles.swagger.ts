import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Order } from 'src/common/dtos/pagiantion-option.dto';
import { ArticleDto } from '../dtos/article.dto';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';

export const ApiFindAllArticleSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve All Published Articles',
      description: `Fetches a paginated list of all articles with a published status.
      Supports pagination and ordering for flexible retrieval.`,
    }),
    ApiOkResponse({
      description: `A list of all published articles, with pagination data if applicable.`,
    }),
    ApiQuery({
      name: 'page',
      required: false,
      description: `Page number for pagination (optional).`,
      type: Number,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: `Number of articles to display per page (optional).`,
      type: Number,
    }),
    ApiQuery({
      name: 'order',
      required: false,
      description: `Sorting order for the articles: ASC for ascending and DESC for descending (optional). default: DESC based on updatedAt`,
      enum: Order,
    }),
  );
};

export const ApiFindArticleSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find Article',
      description: `Fetches the details of a specific article by its unique ID.`,
    }),
    ApiOkResponse({
      type: ArticleDto,
      description: `Article has been successfully founded.`,
    }),
    ApiParam({
      name: 'articleId',
      required: true,
      description: `The unique identifier of the article to be retrieved.`,
      type: Number,
    }),
  );
};

export const ApiCreateArticleSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create Article',
      description: `Creates a new article.`,
    }),
    ApiCreatedResponse({
      type: ArticleDto,
      description: `Article has been successfully created.`,
    }),

    ApiBody({
      type: CreateArticleDto,
      description: `The data needed to create a new article.`,
    }),
  );
};

export const ApiUpdateArticleSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update Article',
      description: `Updates an existing article with new details based on the provided article ID.`,
    }),
    ApiOkResponse({
      type: ArticleDto,
      description: `Article has been successfully updated.`,
    }),
    ApiParam({
      name: 'articleId',
      required: true,
      description: `The unique identifier of the article to be updated.`,
      type: Number,
    }),
    ApiBody({
      type: UpdateArticleDto,
      description: `The data required to update the article.`,
    }),
  );
};

export const ApiDeleteArticleSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete Article',
      description: `Deletes an existing article based on the provided article ID.`,
    }),
    ApiOkResponse({
      description: `Article has been successfully deleted.`,
    }),
    ApiParam({
      name: 'articleId',
      required: true,
      description: `The unique identifier of the article to be deleted.`,
      type: Number,
    }),
  );
};

export const ApiUpdateArticleCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Add or Update a Category to an Article',
      description: `Associates an existing category with the specified article.
      This operation adds(or update) the given category to the article’s list of categories.`,
    }),
    ApiOkResponse({
      description: `Category successfully added to the article.`,
    }),
    ApiParam({
      name: 'articleId',
      required: true,
      description: `Unique identifier of the article to which the category will be added or updated.`,
      type: Number,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `Unique identifier of the category to be added or updated to the article.`,
      type: Number,
    }),
  );
};

export const ApiDeleteArticleCategorySwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete a Category from an Article',
      description: `Delete an existing category from the specified article.
      This operation delete the given category to the article’s list of categories.`,
    }),
    ApiOkResponse({
      description: `Category successfully deleted from the article.`,
    }),
    ApiParam({
      name: 'articleId',
      required: true,
      description: `Unique identifier of the article to which the category will be deleted.`,
      type: Number,
    }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: `Unique identifier of the category to be deleted to the article.`,
      type: Number,
    }),
  );
};
