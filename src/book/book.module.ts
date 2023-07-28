import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entites/book.entity';
import { ImageModule } from 'src/image/image.module';
import { AuthorModule } from 'src/author/author.module';
import { PublisherModule } from 'src/publisher/publisher.module';
import { TranslatorModule } from 'src/translator/translator.module';
import { SerieModule } from 'src/serie/serie.module';
import { CategoryModule } from 'src/category/category.module';
import { AwardToBook } from 'src/award/entites/awardBook.entity';
import { AwardModule } from 'src/award/award.module';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, AwardToBook]),
    MeilisearchModule,
    ImageModule,
    AuthorModule,
    PublisherModule,
    TranslatorModule,
    SerieModule,
    CategoryModule,
    AwardModule,
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
