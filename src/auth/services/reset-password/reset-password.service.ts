import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ChangePasswordDto } from 'src/auth/dtos/change-password.dto';
import { ForgotPasswordDto } from 'src/auth/dtos/forgot-password.dto';
import { ResetPasswordDto } from 'src/auth/dtos/reset-password.dto';
import {
  generateExpireTime,
  generateRandomCode,
  isExpiredTime,
} from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
  ) {}

  async updateByUserId(userId: number, resetPasswordDto: ResetPasswordDto) {
    const { resetToken, expiresAt } = resetPasswordDto;

    return await this.prisma.resetPassword.update({
      where: { userId },
      data: { resetToken, expiresAt },
    });
  }

  async findByUserId(userId: number) {
    const user = await this.prisma.resetPassword.findUnique({
      where: { userId },
      select: { resetToken: true, expiresAt: true },
    });
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async sendResetPasswordCode(user: User) {
    const resetToken = generateRandomCode();
    const expiresAt = generateExpireTime(1);

    this.mailService.sendResetPasswordCode(user, resetToken);
    await this.userService.updateResetPassword(user.id, {
      resetToken,
      expiresAt,
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userService.findByEmail(email);
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

    const { resetToken: token, expiresAt } = await this.findByUserId(userId);

    if (
      token != resetToken ||
      (expiresAt != null && !isExpiredTime(expiresAt))
    ) {
      await this.updateByUserId(userId, {
        resetToken: null,
        expiresAt: null,
      });
      throw new BadRequestException('invalid token');
    } else {
      await this.changePassword(userId, { newPassword });

      await this.updateByUserId(userId, {
        resetToken: null,
        expiresAt: null,
      });
    }
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const { newPassword } = changePasswordDto;

    await this.userService.updatePassword(userId, newPassword);
    await this.userService.updateHashRefreshToken(userId, null);
  }
}
