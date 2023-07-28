import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Award } from './entites/award.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateAwardDto } from './dto/createAward.dto';
import { UpdateAwardDto } from './dto/updateAward.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class AwardService {
    constructor(
        private readonly imageService: ImageService,
        @InjectRepository(Award) private readonly awardRepository: Repository<Award>) {}


    async getAllAwards(): Promise<Award[]> {
        try {
            return await this.awardRepository.find({
                // relations: {
                //     //awardToBook: true,
                //     awardToAuthor: true,
                //     //awardToTranslator: true,
                // }
            })
        } catch (error) {
            throw error
        }
    }
    
    async getOneAward(slug: string): Promise<Award> {
        try {
            const award : Award = await this.awardRepository.findOneOrFail({
                where: {
                    slug: slug
                }
            })
            return award
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Award ${slug} is not found`)
            throw error
        }
    }

    async create(createAwardDto: CreateAwardDto, imageDto: CreateImageDto) : Promise<Award> {
        try {
            const award : Award = this.awardRepository.create(createAwardDto)
            award.badge = await this.imageService.create(imageDto)
            return this.awardRepository.save(award)
        } catch (error) {
            throw error
        }
    }

    async update(slug: string, updateAwardDto: UpdateAwardDto, imageDto: CreateImageDto): Promise<any> {
        try {
            const award : Award = await this.awardRepository.findOneOrFail({
                where: {
                    slug: slug
                },
                relations: {
                    badge: true
                }
            })
            if (imageDto)
                updateAwardDto.badge = await this.imageService.update(award.badge?.id ?? -1, imageDto)
            return await this.awardRepository.update(award.id, updateAwardDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Award ${slug} is not found`)
            throw error
        }
    }

    async delete(slug: string): Promise<Award> {
        try {
            const award: Award = await this.awardRepository.findOneOrFail({
                where: {
                    slug: slug
                }
            })
            return await this.awardRepository.softRemove(award)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Award ${slug} is not found`)
            throw error
        }
    }

    async findOneById(id: number) : Promise<Award> {
        try {
            return await this.awardRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Award ${id} is not found`)
            throw error
        }
    }

    async findOneByIdWithType(id: number, award_type: string) : Promise<Award> {
        try {
            return await this.awardRepository.findOneOrFail({
                where: {
                    id: id,
                    award_type: award_type
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Award ${id} is not found or the type is not correct`)
            throw error
        }
    }
}
