import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import jwtConfig from 'src/config/jwt.config';
import mailConfig from 'src/config/mail.config';
import { ArticlesModule } from './articles/module/articles.module';
import { AuthModule } from './auth/module/auth.module';
import { CategoriesModule } from './categories/module/categories.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/module/users.module';

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
    CategoriesModule,
  ],
})
export class AppModule {}
