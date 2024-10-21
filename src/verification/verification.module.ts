import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VerificationService } from './verification.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
