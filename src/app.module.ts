import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import jwtConfig from 'config/jwt.config';

import jwtRefreshConfig from 'config/jwt-refresh.config';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { VerificationModule } from './verification/verification.module';
import mailConfig from 'config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, jwtConfig, jwtRefreshConfig, mailConfig],
    }),
    PrismaModule,
    ArticlesModule,
    AuthModule,
    UsersModule,
    MailModule,
    VerificationModule,
  ],
})
export class AppModule {}
