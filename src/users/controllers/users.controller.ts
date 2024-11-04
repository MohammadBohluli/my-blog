import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/types/current-user.type';
import { Serializer } from 'src/common/interceptors/serialize.interceptor';
import {
  ApiDeleteProfileSwagger,
  ApiGetProfileSwagger,
  ApiUpdateUserSwagger,
} from '../documents/users.swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Serializer(UserDto)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiGetProfileSwagger()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: CurrentUser) {
    return this.userService.findById(user.userId);
  }

  @ApiUpdateUserSwagger()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateUser(@Body() body: UpdateUserDto, @User() user: CurrentUser) {
    return await this.userService.update(user.userId, body);
  }

  @ApiDeleteProfileSwagger()
  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteUser(@User() user: CurrentUser) {
    await this.userService.delete(user.userId);
  }
}
