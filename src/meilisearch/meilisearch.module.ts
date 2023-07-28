import { Module } from '@nestjs/common';
import { MeilisearchService } from './meilisearch.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [ConfigModule],
  providers: [MeilisearchService],
  exports: [MeilisearchService]
})
export class MeilisearchModule {}
