import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MeiliSearch, { MeiliSearchApiError } from 'meilisearch';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entites/book.entity';
import { Publisher } from 'src/publisher/entites/publisher.entity';
import { Translator } from 'src/translator/entites/translator.entity';

@Injectable()
export class MeilisearchService {
    private readonly meiliSearchClient: MeiliSearch;
    constructor(private readonly configService: ConfigService) {
        this.meiliSearchClient = new MeiliSearch({
            host: this.configService.get('MEILI_HOST'),
            apiKey: this.configService.get('MEILI_MASTER_KEY'),
        })
        this.meiliSearchClient.createIndex('book')
        this.meiliSearchClient.createIndex('author')
        this.meiliSearchClient.createIndex('translator')
        this.meiliSearchClient.createIndex('publisher')
    }


    async serach(query: string ) : Promise<any> {
        try {
            const hits = await this.meiliSearchClient.multiSearch({
                queries: [
                    { indexUid: 'book', q: query},
                    { indexUid: 'author', q: query},
                    { indexUid: 'translator', q: query},
                    { indexUid: 'publisher', q: query},
                    // { indexUid: 'award', q: query},
                ]
            })
            return hits
        } catch (error) {
            if (error instanceof MeiliSearchApiError)
                throw new InternalServerErrorException(error.message)
            throw error
        }
    }


    async createBook(book: Book): Promise<any> {
        try {
            const index = this.meiliSearchClient.index('book')
            return await index.addDocuments([{
                id: book.id,
                slug: book.slug,
                title: book.title,
                description: book.description,
                authors: book.authors.map((author) => author.name),
                translators: book.translators.map((translator) => translator.name),
                publishers: book.publishers.map((publisher) => publisher.name),
                categories: book.categories.map((category) => category.name),
                //awards: book?.awardsToBook.map((award) => award?.award?.name),
                images: book.images.map((image) => image.file_path)                
            }])
        } catch (error) {
            throw error
        }
    }
    async createAuthor(author: Author): Promise<any> {
        try {
            const index = this.meiliSearchClient.index('author')
            const authorDoc = {
                id: author.id,
                slug: author.slug,
                title: author.name,
                biography: author.biography,
                image: author?.image.file_path
            }
            return await index.addDocuments([authorDoc])
        } catch (error) {
            throw error
        }
    }
    async createTranslator(translator: Translator): Promise<any> {
        try {
            const index = this.meiliSearchClient.index('translator')
            return await index.addDocuments([{
                id: translator.id,
                slug: translator.slug,
                title: translator.name,
                biography: translator.biography,
                image: translator.image.file_path
            }])
        } catch (error) {
            throw error
        }
    }
    async createPublisher(publisher: Publisher): Promise<any> {
        try {
            const index = this.meiliSearchClient.index('publisher')
            return await index.addDocuments([{
                id: publisher.id,
                slug: publisher.slug,
                title: publisher.name,
                description: publisher.description,
                image: publisher.image.file_path 
            }])
        } catch (error) {
            throw error
        }
    }

    async deleteDoc(id: string | number, indexName: string ) : Promise<any> {
        try {
            const index = this.meiliSearchClient.index(indexName)
            return await index.deleteDocument(id)
        } catch (error) {
            throw error
        }
    }
}
