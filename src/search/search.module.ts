import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';

@Module({
  imports: [MeilisearchModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
