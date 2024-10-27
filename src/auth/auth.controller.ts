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
import { User } from './decorators/current-user.decorator';
import {
  ApiChangePasswordSwagger,
  ApiForgotPasswordSwagger,
  ApiRefreshTokenSwagger,
  ApiResetPasswordSwagger,
  ApiSignInSwagger,
  ApiSignOutSwagger,
  ApiSignUpSwagger,
  ApiVerifyAccountSwagger,
} from './documents/auth.swagger';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { AuthService } from './services/authentication/auth.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { VerificationService } from './services/verification/verification.service';
import { CurrentUser } from './types/current-user.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly verificationdService: VerificationService,
  ) {}

  @ApiSignUpSwagger()
  @ResponsMessage(
    'user created successfully, verification email will be sent to the registered email address',
  )
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    await this.authService.signup(body);
  }

  @ApiSignInSwagger()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@User() user: CurrentUser) {
    const { accessToken, refreshToken } = await this.authService.signin(user);

    return { accessToken, refreshToken };
  }

  @ApiSignOutSwagger()
  @ResponsMessage('user signed out successfully.')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(@User() user: CurrentUser) {
    this.authService.signout(user.userId);
  }

  @ApiRefreshTokenSwagger()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@User() user: CurrentUser) {
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(user);

    return { accessToken, refreshToken };
  }

  @ApiVerifyAccountSwagger()
  @ResponsMessage('your account successfully verified')
  @Post('verify-account/:userId/:verificationCode')
  @HttpCode(HttpStatus.OK)
  async verifyAccount(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('verificationCode') verificationCode: string,
  ) {
    await this.verificationdService.verifyAccount(userId, verificationCode);
  }

  @ApiForgotPasswordSwagger()
  @ResponsMessage('a reset password link has been sent to your email.')
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.resetPasswordService.forgotPassword(body);
  }

  @ApiResetPasswordSwagger()
  @ResponsMessage('Your password has been successfully changed.')
  @Post('reset-password/:userId/:resetToken')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('resetToken') resetToken: string,
    @Body() body: ChangePasswordDto,
  ) {
    await this.resetPasswordService.resetPassword(userId, resetToken, body);
  }

  @ApiChangePasswordSwagger()
  @ResponsMessage('Your password has been successfully changed.')
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() body: ChangePasswordDto,
    @User() user: CurrentUser,
  ) {
    await this.resetPasswordService.changePassword(user.userId, body);
  }
}
