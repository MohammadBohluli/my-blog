import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendUserConfirmation(user: User, verificationCode: string) {
    const text = `Verification code: http://localhost:3000/auth/verify-account/${user.id}/${verificationCode}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: `Hello ${user.username}, Wellcome`,
      text,
    });
  }
}
