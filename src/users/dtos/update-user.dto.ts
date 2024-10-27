import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    nullable: true,
    type: String,
    minLength: 3,
    maxLength: 30,
    example: 'my name',
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    required: false,
    type: String,
    minLength: 3,
    maxLength: 30,
    uniqueItems: true,
    example: 'myUsername',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @NotContains(' ', { message: 'username should not contain a space' })
  username: string;
}
