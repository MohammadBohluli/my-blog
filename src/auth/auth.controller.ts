import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
