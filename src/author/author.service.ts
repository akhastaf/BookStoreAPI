import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { ImageService } from 'src/image/image.service';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';
import { AwardToAuthorService } from 'src/award/award-to-author/award-to-author.service';

@Injectable()
export class AuthorService {
    constructor(
        private readonly meilisearchService: MeilisearchService,
        private readonly imageService: ImageService,
        private readonly awardToAuthorService: AwardToAuthorService,
        @InjectRepository(Author) private readonly authorRepository: Repository<Author>,) {}
    
    async getAllAuthors(): Promise<Author[]> {
        try {
            return await this.authorRepository.find({
                relations: {
                    books: true,
                    image: true,
                    awardsToAuthor: true
                }
            })
        } catch (error) {
            throw error
        }
    }
    
    
    async create(createAuthorDto: CreateAuthorDto, imageDto: CreateImageDto): Promise<Author> {
        try {
            const { awards, ...authorData} = createAuthorDto
            const author = this.authorRepository.create(authorData)
            author.image = await this.imageService.create(imageDto)
            const authorSaved = await this.authorRepository.save(author)
            if (awards.length) 
                await this.awardToAuthorService.create(awards, authorSaved.id)
            await this.meilisearchService.createAuthor(authorSaved)
            return await this.getOneAuthor(authorSaved.slug)
        } catch (error) {
            throw error
        }
    }
    
    async getOneAuthor(slug: string): Promise<Author> {
        try {
            return await this.authorRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    books: true,
                    image: true,
                    awardsToAuthor: true
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Author: ${slug} not found`)
            throw error
        }
    }

    async update(updateAuthorDto: UpdateAuthorDto, slug: string, imageDto: CreateImageDto) : Promise<Author> {
        try {
            const { awards, ...authorData} = updateAuthorDto
            const author = await this.authorRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    image: true,
                    awardsToAuthor: true
                }
            })
            if (imageDto)
                authorData.image = await this.imageService.update(author.image?.id ?? -1, imageDto)
            Object.assign(author, authorData)
            const authorUpdated: Author = await this.authorRepository.save(author)
            if (awards.length)
                await this.awardToAuthorService.update(awards, author.id)
            await this.meilisearchService.createAuthor(authorUpdated)
            return await this.getOneAuthor(authorUpdated.slug)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Author: ${slug} not found`)
            throw error
        }
    }

    async delete(slug : string): Promise<Author> {
        try {
            const author = await this.authorRepository.findOneOrFail({
                where: {
                    slug
                }
            })
            await this.meilisearchService.deleteDoc(author.id, 'author')
            return this.authorRepository.softRemove(author)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Author: ${slug} not found`)
            throw error
        }
    }

    async findOneById(id: number): Promise<Author> {
        try {
            return await this.authorRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Author: ${id} not found`)
            throw error
        }
    }
}