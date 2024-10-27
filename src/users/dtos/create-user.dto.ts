import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    uniqueItems: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 3,
    maxLength: 30,
    uniqueItems: true,
    example: 'myUsername',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @NotContains(' ', { message: 'username should not contain space' })
  username: string;

  @ApiProperty({
    required: false,
    type: String,
    minLength: 3,
    maxLength: 30,
    nullable: true,
    example: 'my name',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({ required: true, type: String, minLength: 8, maxLength: 12 })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
