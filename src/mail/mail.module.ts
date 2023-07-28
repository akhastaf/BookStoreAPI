import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => (
      {
      transport: {
        host: 'us2.smtp.mailhostbox.com',//configService.get('SMTP_HOST'),
        //secureConnection: true,
        // secure: true,
        port: 25,
        auth: {
          user: configService.get('SMTP_USER'),
          pass: configService.get('SMTP_PASSSWORD'),
        }
      },
      defaults: {
        from: configService.get('SMTP_DEFAULT_EMAIL'),
      },
      template: {
        dir: join(__dirname, configService.get('SMTP_TEMPLATE_DIR')),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }  
    }),
  }), ConfigModule],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
