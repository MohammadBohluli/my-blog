import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    await this.mailService.sendMail({
      to: user.email,
      subject: `Hello ${user.username}, Welcome to my blog`,
      text: `this is test mail ${token}`,
    });
  }
}
