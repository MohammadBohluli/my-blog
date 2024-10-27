import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    required: true,
    type: String,
    uniqueItems: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;
}
