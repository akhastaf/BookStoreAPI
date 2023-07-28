import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Award } from './entites/award.entity';
import { ImageModule } from 'src/image/image.module';
import { AwardToAuthor } from './entites/awardAuthor.entity';
import { AwardToAuthorService } from './award-to-author/award-to-author.service';
import { Author } from 'src/author/entities/author.entity';
import { AwardToTranslatorService } from './award-to-translator/award-to-translator.service';
import { Translator } from 'src/translator/entites/translator.entity';
import { AwardToTranslator } from './entites/awardTranslator.entity';
import { AwardToBook } from './entites/awardBook.entity';
import { Book } from 'src/book/entites/book.entity';
import { AwardToBookService } from './award-to-book/award-to-book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Award, AwardToAuthor, AwardToTranslator, AwardToBook, Author, Translator, Book]), ImageModule],
  controllers: [AwardController],
  providers: [AwardService, AwardToAuthorService, AwardToTranslatorService, AwardToBookService],
  exports: [AwardService, AwardToAuthorService, AwardToTranslatorService, AwardToBookService]
})
export class AwardModule {}
