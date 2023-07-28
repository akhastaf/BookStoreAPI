import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/entites/book.entity';
import { Repository } from 'typeorm';
import { AwardToBook } from '../entites/awardBook.entity';
import { AwardService } from '../award.service';
import { AwardToSubjectDtoClass } from '../dto/awardToSubjectDtoClass';

@Injectable()
export class AwardToBookService {
    constructor(
        private readonly awardService: AwardService,
        @InjectRepository(AwardToBook) private readonly awardToBookRepository: Repository<AwardToBook>,
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    ) {}




    async create(awards: AwardToSubjectDtoClass[], book_id: number): Promise<AwardToBook[]> {
        try {
            const book = await this.bookRepository.findOneOrFail({
                where: {
                    id: book_id
                }
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToBook: AwardToBook = this.awardToBookRepository.create(award)
                awardToBook.book = book
                awardToBook.award = await this.awardService.findOneByIdWithType(award.award_id, 'book')
                return await this.awardToBookRepository.save(awardToBook)
            }))
        } catch (error) {
            throw error
        }
    }
    
    
    async update(awards: AwardToSubjectDtoClass[], book_id: number): Promise<AwardToBook[]> {
        try {
            const book = await this.bookRepository.findOneOrFail({
                where: {
                    id: book_id
                }
            })
            const awardsToBook : AwardToBook[] = await this.awardToBookRepository.find({
                where: {
                    book: {
                        id: book.id
                    }
                },
                relations: {
                    book: true
                }
            })
            awardsToBook.forEach(async (award) => {
                await this.awardToBookRepository.softDelete(award.id)
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToBook: AwardToBook = this.awardToBookRepository.create(award)
                awardToBook.book = book
                awardToBook.award = await this.awardService.findOneByIdWithType(award.award_id, 'book')
                return await this.awardToBookRepository.save(awardToBook)
            }))
        } catch (error) {
            throw error
        }
    }
}
