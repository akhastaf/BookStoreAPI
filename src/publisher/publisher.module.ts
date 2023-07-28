import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entites/publisher.entity';
import { ImageModule } from 'src/image/image.module';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher]), ImageModule, MeilisearchModule],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService]
})
export class PublisherModule {}
