import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import {
  generateExpireTime,
  generateRandomCode,
  isExpiredTime,
} from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordService } from 'src/reset-password/reset-password.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { VerificationService } from 'src/verification/verification.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { SigninDto } from './dtos/signin.dto';
import { CurrentUser } from './types/current-user.type';
import { AuthJwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
    private readonly mailService: MailService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  async signout(userId: number) {
    await this.usersService.updateHashRefreshToken(userId, null);
  }

  async signin(user: CurrentUser) {
    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashRefreshToken(
      user.userId,
      hashRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(user: CurrentUser) {
    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashRefreshToken(
      user.userId,
      hashRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  async validateUser(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('user not found');

    if (!user.isActive) {
      await this.verificationService.sendVerificationCode(user);
      throw new UnauthorizedException(
        'your account not active, activation code send to email',
      );
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      throw new UnauthorizedException('invalid credentials');

    return { userId: user.id, role: user.role };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('invalid refresh token');

    const isValidRefreshToken = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!isValidRefreshToken)
      throw new UnauthorizedException('invalid refresh token');

    return { userId: user.id, role: user.role };
  }

  async generateTokens(user: CurrentUser) {
    const payload: AuthJwtPayload = { userId: user.userId, role: user.role };

    const optionsRefreshToken: JwtSignOptions = {
      secret: this.configService.getOrThrow('refreshSecret'),
      expiresIn: this.configService.getOrThrow('refreshExpiresIn'),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, optionsRefreshToken),
    ]);

    return { accessToken, refreshToken };
  }

  async verifyAccount(userId: number, verificationCode: string) {
    const { verificationCode: code, expiresAt } =
      await this.verificationService.findByUserId(userId);

    if (code != verificationCode || !isExpiredTime(expiresAt)) {
      await this.verificationService.updateByUserId(userId, {
        verificationCode: null,
        expiresAt: null,
      });
      throw new UnauthorizedException('invalid verification code');
    } else {
      await this.usersService.activeAccount(userId);
      await this.verificationService.updateByUserId(userId, {
        verificationCode: null,
        expiresAt: null,
      });
    }
  }

  async sendResetPasswordCode(user: User) {
    const resetToken = generateRandomCode();
    const expiresAt = generateExpireTime(1);

    this.mailService.sendResetPasswordCode(user, resetToken);
    await this.usersService.updateResetPassword(user.id, {
      resetToken,
      expiresAt,
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new NotFoundException('user with this email was not found');

    if (!user.isActive || !user.isVerifiedEmail)
      throw new ForbiddenException('your account not verified');

    await this.sendResetPasswordCode(user);
  }

  async resetPassword(
    userId: number,
    resetToken: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { newPassword } = changePasswordDto;

    const { resetToken: token, expiresAt } =
      await this.resetPasswordService.findByUserId(userId);

    if (token != resetToken || !isExpiredTime(expiresAt)) {
      await this.resetPasswordService.updateByUserId(userId, {
        resetToken: null,
        expiresAt: null,
      });
      throw new BadRequestException('invalid token');
    } else {
      await this.usersService.updatePassword(userId, newPassword);
      // TODO: null refresh token
      await this.resetPasswordService.updateByUserId(userId, {
        resetToken: null,
        expiresAt: null,
      });
    }
  }
}
// async verifyAccount(userId: number, verificationCode: string) {

//   if (code != verificationCode || !isExpiredTime(expiresAt)) {
//     await this.verificationService.updateByUserId(userId, {
//       verificationCode: null,
//       expiresAt: null,
//     });
//     throw new UnauthorizedException('invalid verification code');
//   } else {
//     await this.usersService.activeAccount(userId);
//     await this.verificationService.updateByUserId(userId, {
//       verificationCode: null,
//       expiresAt: null,
//     });
//   }
// }
