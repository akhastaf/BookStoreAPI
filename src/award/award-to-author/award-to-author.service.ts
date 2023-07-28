import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwardToSubjectDtoClass } from 'src/award/dto/awardToSubjectDtoClass';
import { Repository } from 'typeorm';
import { AwardToAuthor } from '../entites/awardAuthor.entity';
import { Author } from 'src/author/entities/author.entity';
import { AwardService } from '../award.service';

@Injectable()
export class AwardToAuthorService {
    constructor(
        private readonly awardService: AwardService,
        @InjectRepository(AwardToAuthor) private readonly awardToAuthorRepository: Repository<AwardToAuthor>,
        @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    ) {}




    async create(awards: AwardToSubjectDtoClass[], author_id: number): Promise<AwardToAuthor[]> {
        try {
            const author = await this.authorRepository.findOneOrFail({
                where: {
                    id: author_id
                }
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToAuthor: AwardToAuthor = this.awardToAuthorRepository.create(award)
                awardToAuthor.author = author
                awardToAuthor.award = await this.awardService.findOneByIdWithType(award.award_id, 'author')
                return await this.awardToAuthorRepository.save(awardToAuthor)
            }))
        } catch (error) {
            throw error
        }
    }
    
    
    async update(awards: AwardToSubjectDtoClass[], author_id: number): Promise<AwardToAuthor[]> {
        try {
            const author = await this.authorRepository.findOneOrFail({
                where: {
                    id: author_id
                }
            })
            const awardsToAuthor : AwardToAuthor[] = await this.awardToAuthorRepository.find({
                where: {
                    author: {
                        id: author.id
                    }
                },
                relations: {
                    author: true
                }
            })
            awardsToAuthor.forEach(async (award) => {
                await this.awardToAuthorRepository.softDelete(award.id)
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToAuthor: AwardToAuthor = this.awardToAuthorRepository.create(award)
                awardToAuthor.author = author
                awardToAuthor.award = await this.awardService.findOneByIdWithType(award.award_id, 'author')
                return await this.awardToAuthorRepository.save(awardToAuthor)
            }))
        } catch (error) {
            throw error
        }
    }
}
