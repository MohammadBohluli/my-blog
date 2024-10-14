import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import jwtConfig from 'config/jwt.config';

import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, jwtConfig],
    }),
    PrismaModule,
    ArticlesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
