import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('query') query: string): Promise<any> {
    try {
      return this.searchService.search(query)
    } catch (error) {
      throw error
    }
  }
}
