import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';
import { CreateSerieDto } from './dto/createSerie.dto';
import { UpdateSerieDto } from './dto/updateSerie.dto';

@Injectable()
export class SerieService {
    constructor (@InjectRepository(Serie) private readonly serieRepository: Repository<Serie>,
        private readonly imageService: ImageService) {}


    async getAllSeries(): Promise<Serie[]> {
        try {
            return await this.serieRepository.find({
                relations: {
                    books: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getOneSerie(slug : string): Promise<Serie> {
        try {
            return await this.serieRepository.findOneOrFail({
                where: {
                    slug
                },
                relations:{
                    books: true
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Serie: ${slug} not found`)
            throw error
        }
    }


    async create(createSerieDto: CreateSerieDto): Promise<Serie> {
        try {
            const serie: Serie = this.serieRepository.create(createSerieDto)
            return this.serieRepository.save(serie)
        } catch (error) {
            throw error
        }
    }

    async update(slug: string, updateSerieDto: UpdateSerieDto): Promise<any> {
        try {
            const serie: Serie = await this.serieRepository.findOneOrFail({
                where: {
                    slug
                }
            })
            return await this.serieRepository.update(serie.id, updateSerieDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
            throw new NotFoundException(`Serie: ${slug} not found`)
            throw error
        }
    }
    
    async delete(slug: string): Promise<Serie> {
        try {
            const serie: Serie = await this.serieRepository.findOneOrFail({
                where: {
                    slug
                }
            })
            return await this.serieRepository.softRemove(serie)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Serie: ${slug} not found`)
            throw error
        }
    }


    async findOneById(id: number): Promise<Serie> {
        try {
            console.log(id)
            return await this.serieRepository.findOneOrFail({
                where: {
                    id: id ?? -1
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Serie : ${id}`)
            throw error
        }   
    }
}
