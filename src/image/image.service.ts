import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entites/image.entity';
import { CreateImageDto } from './dto/createImage.dto';
import sharp from 'sharp';
import { uuid } from 'uuidv4';
import { join } from 'path';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>,) {}

    async create(createImageDto : CreateImageDto) : Promise<Image>{
        try {
            const image = this.imageRepository.create(createImageDto)
            return this.imageRepository.save(image)
        } catch (error) {
            throw error
        }
    }

    async update(id: number, createImageDto: CreateImageDto): Promise<Image> {
        try {
            const image = await this.imageRepository.findOne({
                where: {
                    id: id
                }
            })
            if (image === null)
                return this.create(createImageDto)
            const imageToUpdated = Object.assign(image, createImageDto)
            await this.imageRepository.update(image.id, createImageDto)
            return await this.imageRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            throw error
        }
    }

    async createFromArray(imagesDto : CreateImageDto[]): Promise<Image[]> {
        try {
            const images : Image[] = this.imageRepository.create(imagesDto)
            return await this.imageRepository.save(images)
        } catch (error) {
            throw error
        }
    }
}
