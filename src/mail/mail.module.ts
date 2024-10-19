import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MailerOptions> => ({
        transport: {
          host: configService.get<string>('mailHost'),
          port: configService.get<number>('mailPort'),
          secure: configService.get<boolean>('mailSecure'),
          auth: {
            user: configService.get<string>('mailUser'),
            pass: configService.get<string>('mailPassword'),
          },
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
