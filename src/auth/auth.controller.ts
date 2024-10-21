import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponsMessage } from 'src/common/decorators/response-message.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { User } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { CurrentUser } from './types/current-user.type';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponsMessage('user created successfully')
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    await this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@User() user: CurrentUser) {
    const { accessToken, refreshToken } = await this.authService.signin(user);

    return { accessToken, refreshToken };
  }

  @ResponsMessage('sign out successfully')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(@User() user: CurrentUser) {
    this.authService.signout(user.userId);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@User() user: CurrentUser) {
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(user);

    return { accessToken, refreshToken };
  }

  @ResponsMessage('your account successfully verified')
  @Post('verify-account/:userId/:verificationCode')
  @HttpCode(HttpStatus.OK)
  async verifyAccount(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('verificationCode') verificationCode: string,
  ) {
    await this.authService.verifyAccount(userId, verificationCode);
  }

  @ResponsMessage('reset password link send to email')
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.authService.forgotPassword(body);
  }

  @Post('reset-password/:userId/:resetToken')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('resetToken') resetToken: string,
    @Body() body: ChangePasswordDto,
  ) {}
}
