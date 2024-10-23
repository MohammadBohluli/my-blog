import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Serializer } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from 'src/auth/types/current-user.type';
import { User } from 'src/auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Serializer(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.userService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateUser(@Body() body: UpdateUserDto, @User() user: CurrentUser) {
    await this.userService.update(user.userId, body);
  }
}
