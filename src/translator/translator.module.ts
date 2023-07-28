import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translator } from './entites/translator.entity';
import { ImageModule } from 'src/image/image.module';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';
import { AwardModule } from 'src/award/award.module';

@Module({
  imports: [TypeOrmModule.forFeature([Translator]), ImageModule, MeilisearchModule, AwardModule],
  controllers: [TranslatorController],
  providers: [TranslatorService],
  exports: [TranslatorService]
  
})
export class TranslatorModule {}
