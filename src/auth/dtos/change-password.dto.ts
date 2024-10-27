import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ required: true, type: String, default: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  newPassword: string;
}
