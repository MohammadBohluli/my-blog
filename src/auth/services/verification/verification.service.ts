import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AccountVerificationDto } from 'src/auth/dtos/account-verification.dto';
import {
  generateExpireTime,
  generateRandomCode,
  isExpiredTime,
} from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async findByUserId(userId: number) {
    const account = await this.prisma.accountVerification.findUnique({
      where: { userId },
      select: {
        expiresAt: true,
        verificationCode: true,
      },
    });

    if (!account) throw new NotFoundException('not found user account');

    return account;
  }

  async updateByUserId(
    userId: number,
    accountVerification: AccountVerificationDto,
  ) {
    const { verificationCode, expiresAt } = accountVerification;

    const account = await this.prisma.accountVerification.update({
      where: { userId },
      data: { verificationCode, expiresAt },
    });

    if (!account) throw new NotFoundException('not found user account');
  }

  async verifyAccount(userId: number, verificationCode: string) {
    const { verificationCode: code, expiresAt } =
      await this.findByUserId(userId);

    if (
      code != verificationCode ||
      (expiresAt != null && !isExpiredTime(expiresAt))
    ) {
      await this.updateByUserId(userId, {
        verificationCode: null,
        expiresAt: null,
      });
      throw new UnauthorizedException('invalid verification code');
    } else {
      await this.userService.activeAccount(userId);
      await this.updateByUserId(userId, {
        verificationCode: null,
        expiresAt: null,
      });
    }
  }

  async sendVerificationCode(user: User) {
    const expiresAt = generateExpireTime(5);
    const verificationCode = generateRandomCode();

    await this.updateByUserId(user.id, { verificationCode, expiresAt });

    setImmediate(async () => {
      await this.mailService.sendUserConfirmation(user, verificationCode);
    });
  }
}
