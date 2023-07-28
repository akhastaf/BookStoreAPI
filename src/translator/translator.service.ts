import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Translator } from './entites/translator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';
import { CreateTranslatorDto } from './dto/createTranslator.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { Image } from 'src/image/entites/image.entity';
import { UpdateTranslatorDto } from './dto/updateTranslator.dto';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';
import { AwardToTranslator } from 'src/award/entites/awardTranslator.entity';
import { AwardToTranslatorService } from 'src/award/award-to-translator/award-to-translator.service';

@Injectable()
export class TranslatorService {
    constructor(
        private readonly imageService: ImageService,
        private readonly awardToTranslatorService: AwardToTranslatorService,
        private readonly meilisearchService: MeilisearchService,
        @InjectRepository(Translator) private readonly translatorRepository: Repository<Translator>
    ) {}

    async getAllTranslators(): Promise<Translator[]> {
        try {
            return await this.translatorRepository.find({
                relations: {
                    image: true,
                    awardsToTranslator: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getOneTranslator(slug : string): Promise<Translator> {
        try {
            const translator = await this.translatorRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    image: true,
                    books: true,
                    awardsToTranslator: true
                }
            })
            return translator
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Translator: ${slug} not found`)
            throw error
        }
    }

    async create(createTranslatorDto: CreateTranslatorDto, imageDto: CreateImageDto): Promise<Translator> {
        try {
            const { awards, ...translatorData} = createTranslatorDto
            const translator: Translator = this.translatorRepository.create(translatorData)
            translator.image = await this.imageService.create(imageDto)
            const translatorSaved: Translator = await this.translatorRepository.save(translator)
            if (awards.length) 
                await this.awardToTranslatorService.create(awards, translatorSaved.id)
            await this.meilisearchService.createTranslator(translatorSaved)
            return await this.getOneTranslator(translatorSaved.slug)
        } catch (error) {
            throw error
        }
    }

    async update(slug: string, updateTranslatorDto: UpdateTranslatorDto, imageDto: CreateImageDto): Promise<Translator> {
        try {
            const { awards, ...translatorData} = updateTranslatorDto
            const translator: Translator = await this.translatorRepository.findOneOrFail({
                where: {
                    slug
                },
                relations: {
                    image: true,
                    awardsToTranslator: true
                }
            })
            if (imageDto)
                translatorData.image = await this.imageService.update(translator.image?.id ?? -1, imageDto)
            
            Object.assign(translator, translatorData)
            const translatorUpdated: Translator = await this.translatorRepository.save(translator)
            if (awards.length)
                await this.awardToTranslatorService.update(awards, translatorUpdated.id)
            await this.meilisearchService.createTranslator(translatorUpdated)
            return await this.getOneTranslator(translator.slug)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Translator : ${slug} not found`)
            throw error
        }
    }

    async delete(slug: string) : Promise<Translator> {
        try {
            const translator = await this.translatorRepository.findOneOrFail({
                where:{
                    slug
                },
                relations: {
                    image: true,
                    awardsToTranslator: true
                }
            })
            await this.meilisearchService.deleteDoc(translator.id, 'translator')
            return await this.translatorRepository.softRemove(translator)
        } catch (error) {
            throw error
        }
    }

    async findOneById(id: number): Promise<Translator> {
        try {
            return await this.translatorRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Translator: ${id} not found`)
            throw error
        }
    }
}
