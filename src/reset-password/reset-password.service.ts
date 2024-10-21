import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly prisma: PrismaService) {}

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
}
