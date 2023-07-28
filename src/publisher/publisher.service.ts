import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entites/publisher.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { ImageService } from 'src/image/image.service';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';

@Injectable()
export class PublisherService {
    constructor(
        private readonly meilisearchService: MeilisearchService,
        private readonly imageService: ImageService,
        @InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>) {}

    async getAllPublishers() : Promise<Publisher[]> {
        try {
            return await this.publisherRepository.find({
                relations: {
                    image: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getOnePublisher(slug: string): Promise<Publisher> {
        try {
            console.log('slug', slug)
            return await this.publisherRepository.findOneOrFail({
                where: {
                    slug: slug
                },
                relations:{
                    image: true,
                    books: true
                }
            })
        } catch (error) {
            console.log(error)
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Publisher : ${slug} not found`)
            throw error
        }
    }

    async create(createPublisherDto: CreatePublisherDto, imageDto: CreateImageDto) : Promise<Publisher> {
        try {
            const publisher: Publisher = this.publisherRepository.create(createPublisherDto)
            const image = await this.imageService.create(imageDto)
            publisher.image = image
            const publisherSaved: Publisher = await this.publisherRepository.save(publisher)
            const publisherDoc = await this.publisherRepository.findOneOrFail({
                where: {
                    id: publisherSaved.id
                },
                relations:{
                    image: true,
                    books: true
                }
            })
            await this.meilisearchService.createPublisher(publisher)
            return publisherDoc
        } catch (error) {
            throw error
        }
    }

    async update(slug: string, updatePublisherDto: UpdatePublisherDto, imageDto: CreateImageDto): Promise<Publisher> {
        try {
            const publisher: Publisher = await this.publisherRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    image: true
                }
            })
            if (imageDto) {
                const image = await this.imageService.update(publisher.image?.id ?? -1, imageDto)
                updatePublisherDto.image = image
            }
            await this.publisherRepository.update(publisher.id, updatePublisherDto)
            const publisherDoc: Publisher = await this.publisherRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    image: true
                }
            })
            await this.meilisearchService.createPublisher(publisherDoc)
            return publisherDoc
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Publisher : ${slug} not found`)
            throw error
        }
    }

    async delete(slug: string): Promise<Publisher> {
        try {
            const publisher: Publisher = await this.publisherRepository.findOneOrFail({
                where: {
                    slug: slug
                },
                relations: {
                    image: true,
                    books: true
                }
            })
            await this.meilisearchService.deleteDoc(publisher.id, 'publisher')
            return await this.publisherRepository.softRemove(publisher)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Publisher : ${slug} not found`)
            throw error
        }
    }

    async findOneById(id: number): Promise<Publisher> {
        try {
            return await this.publisherRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Publisher: ${id} not found`)
            throw error
        }
    }
}
