import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
  NotEquals,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @NotContains(' ', { message: 'username should not contain a space' })
  username: string;
}
