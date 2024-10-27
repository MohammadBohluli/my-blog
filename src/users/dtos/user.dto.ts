import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserDto {
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
  email: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @Expose()
  username: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: Role,
    enum: Role,
    default: Role.USER,
    required: false,
  })
  @Expose()
  role: Role;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @Expose()
  isVerifiedEmail: boolean;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @Expose()
  updatedAt: string;
}
