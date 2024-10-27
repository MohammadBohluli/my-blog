import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    required: true,
    type: String,
    uniqueItems: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 8,
    default: 'password',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
