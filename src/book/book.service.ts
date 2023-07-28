import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entites/book.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';
import { CreateBookDto } from './dto/createBook.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { AuthorService } from 'src/author/author.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { TranslatorService } from 'src/translator/translator.service';
import { Image } from 'src/image/entites/image.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entites/category.entity';
import { SerieService } from 'src/serie/serie.service';
import { AwardToBook } from 'src/award/entites/awardBook.entity';
import { async } from 'rxjs';
import { AwardService } from 'src/award/award.service';
import { Award, AWARD_TYPE } from 'src/award/entites/award.entity';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';
import { AwardToBookService } from 'src/award/award-to-book/award-to-book.service';

@Injectable()
export class BookService {
    constructor(
        private readonly authorService: AuthorService,
        private readonly publisherService: PublisherService,
        private readonly translatorService: TranslatorService,
        private readonly imageService: ImageService,
        private readonly categoryService: CategoryService,
        private readonly serieService: SerieService,
        private readonly awardService: AwardService,
        private readonly meilisearchService: MeilisearchService,
        private readonly awardToBookService: AwardToBookService,
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>) {}


    async getAllBooks(): Promise<Book[]> {
        try {
            return await this.bookRepository.find({
                relations: {
                    // image: true,
                    images: true,
                    authors: true,
                    translators: true,
                    publishers: true,
                    awardsToBook: true,
                    serie: true,
                    categories: true
                }
            })
        } catch (error) {
            throw error
        }
    }


    async getOneBook(slug: string): Promise<Book> {
        try {
            return await this.bookRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    // image: true,
                    // images: true,
                    authors: true,
                    translators: true,
                    publishers: true,
                    awardsToBook: true,
                    serie: true,
                    categories: true,
                    reviews: true
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`book: ${slug} is not found`)
            throw error
        }
    }

    async create(createBookDto: CreateBookDto, imagesDto: CreateImageDto[]): Promise<Book> {
        try {
            console.log(createBookDto)
            const { authors, translators, publishers, categories, serie, awards, ...bookData } = createBookDto
            const book: Book = this.bookRepository.create(bookData)
            console.log(awards)
            book.authors = await Promise.all(
                authors.map(async (authorId) => {
                  return await this.authorService.findOneById(authorId);
                }),
              )
            book.translators = await Promise.all(
                translators.map(async (authorId) => {
                  return await this.translatorService.findOneById(authorId);
                }),
              )
            book.publishers = await Promise.all(
                publishers.map(async (authorId) => {
                 return await this.publisherService.findOneById(authorId);
                }),
              )
            book.categories = await Promise.all(
                categories.map(async (authorId) => {
                 return await this.categoryService.findOneById(authorId);
                }),
              )
            if (bookData.is_in_series) {
                book.serie = await this.serieService.findOneById(serie)
                console.log(serie)
                if (book.serie.numberOfBooks < book.series_order)
                    throw new BadRequestException(`series_order must betwen 1 and ${book.serie.numberOfBooks}`)
            }
            if (imagesDto.length >= 1)
                book.images = await this.imageService.createFromArray(imagesDto)
            const bookSaved : Book = await this.bookRepository.save(book)
            if (awards.length)
                await this.awardToBookService.create(awards, bookSaved.id)
            await this.meilisearchService.createBook(bookSaved)
            return await this.getOneBook(bookSaved.slug)
        } catch (error) {
            throw error
        }
    }

    async delete(slug: string): Promise<Book> {
        try {
            const book: Book = await this.bookRepository.findOneOrFail({
                where: {
                    slug: slug
                }
            })
            await this.meilisearchService.deleteDoc(book.id, 'book')
            return await this.bookRepository.softRemove(book)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`book: ${slug} is not found`)
            throw error
        }
    }


    async findOneById(id: number): Promise<Book> {
        try {
            return this.bookRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`book: ${id} is not found`)
            throw error
        }
    }
}
