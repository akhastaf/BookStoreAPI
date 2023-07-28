import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entites/promotion.entity';
import { EntityNotFoundError, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/updatePromotion.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class PromotionService {
    constructor(
        private readonly imageService: ImageService,
        @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>) {}

    
    async getActviePromotions(): Promise<Promotion[]> {
        try {
            const currentDate = new Date();
            return await this.promotionRepository.find({
                relations: ['images'],
                where: {
                    active: true,
                    start_date: LessThanOrEqual(currentDate),
                    end_date: MoreThanOrEqual(currentDate)
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getAllPromotions(): Promise<Promotion[]> {
        try {
            return await this.promotionRepository.find({
                relations: ['images']
            })
        } catch (error) {
            throw error
        }
    }

    async getOnePromotion(id: number): Promise<Promotion> {
        try {
            return await this.promotionRepository.findOneOrFail({
                where: {
                    id: id
                },
                relations: ['images']
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`promotion ${id} is not found`)
            throw error
        }
    }

    async create(createPromotionDto: CreatePromotionDto, imagesDto: CreateImageDto[]): Promise<Promotion> {
        try {
            const promotion: Promotion = this.promotionRepository.create(createPromotionDto)
            promotion.images = await this.imageService.createFromArray(imagesDto)
            return await this.promotionRepository.save(promotion)
        } catch (error) {
            throw error
        }
    }

    async update(id: number, updatePromotionDto: UpdatePromotionDto, imagesDto: CreateImageDto[]): Promise<any> {
        try {
            const promotion: Promotion = await this.promotionRepository.findOneOrFail({
                where: {
                    id: id
                },
                relations: ['images']
            })
            // if (imageDto)
            //     updatePromotionDto.image = await this.imageService.createFromArray(promotion.image?.id ?? -1, imageDto)
            return await this.promotionRepository.update(promotion.id, updatePromotionDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`promotion ${id} is not found`)
            throw error
        }
    }

    async delete(id: number): Promise<Promotion> {
        try {
            const promotion: Promotion = await this.promotionRepository.findOneOrFail({
                where: {
                    id: id
                },
                relations: ['images']
            })
            return await this.promotionRepository.softRemove(promotion)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`promotion ${id} is not found`)
            throw error
        }
    }
}
