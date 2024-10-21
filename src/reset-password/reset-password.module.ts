import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ResetPasswordService],
  imports: [PrismaModule],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
