import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.env.dev',
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
