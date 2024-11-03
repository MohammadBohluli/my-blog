import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/categories/dtos/category.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class ArticleDto {
  @ApiProperty({ required: false })
  @Expose()
  id: number;

  @ApiProperty({ required: false })
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  slug: string;

  @ApiProperty({ required: false })
  @Expose()
  body: string;

  @ApiProperty({ required: false })
  @Expose()
  status: Status;

  @ApiProperty({ required: false, type: [CategoryDto] })
  @Type(() => CategoryDto)
  @Expose()
  categories: CategoryDto[];

  @ApiProperty({ required: false })
  @Type(() => UserDto)
  @Expose()
  author: UserDto;

  @ApiProperty({ required: false })
  @Expose()
  createdAt: Date;

  @ApiProperty({ required: false })
  @Expose()
  updatedAt: Date;
}
