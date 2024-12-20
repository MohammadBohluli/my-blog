import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, MailModule],
  exports: [UsersService],
})
export class UsersModule {}
