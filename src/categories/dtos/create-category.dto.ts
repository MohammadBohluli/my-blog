import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    uniqueItems: true,
    minLength: 3,
    maxLength: 50,
    nullable: false,
    example: 'my category',
  })
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;
}
