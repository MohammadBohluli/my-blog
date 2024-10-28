import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @Expose()
  updatedAt: Date;
}
