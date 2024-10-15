import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    return { accessToken, refreshToken, userId: req.user.userId };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@Req() req) {
    await this.authService.signout(req.user.userId);
    return { message: 'you are sign out successfuly' };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user,
    );

    return { accessToken, refreshToken };
  }
}
