import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { generateExpireTime, generateRandomCode } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountVerificationDto } from './dtos/account-verification.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class VerificationService {
  constructor(
    private readonly prisma: PrismaService,
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

  async sendVerificationCode(user: User) {
    const expiresAt = generateExpireTime(5);
    const verificationCode = generateRandomCode();

    await this.updateByUserId(user.id, { verificationCode, expiresAt });

    setImmediate(async () => {
      await this.mailService.sendUserConfirmation(user, verificationCode);
    });
  }
}
