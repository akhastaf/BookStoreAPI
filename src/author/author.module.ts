import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { ImageModule } from 'src/image/image.module';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';
import { AwardModule } from 'src/award/award.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), ImageModule, MeilisearchModule, AwardModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService]
})
export class AuthorModule {}
