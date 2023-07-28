import { Injectable } from '@nestjs/common';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';

@Injectable()
export class SearchService {
    constructor(private readonly meilisearch: MeilisearchService) {}

    async search(query: string): Promise<any> {
        try {
            return await this.meilisearch.serach(query)
        } catch (error) {
            throw error
        }
    }
}
