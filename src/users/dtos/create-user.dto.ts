import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
