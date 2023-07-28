import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entites/discount.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/createDiscount.dto';
import { UpdateDiscountDto } from './dto/upadatDiscount.dto';

@Injectable()
export class DiscountService {
    constructor(@InjectRepository(Discount) private readonly discountRepository: Repository<Discount>) {}

    async getAllDiscounts(): Promise<Discount[]> {
        try {
            return this.discountRepository.find()
        } catch (error) {
            throw error
        }
    }

    async getDiscount(id: number): Promise<Discount> {
        try {
            return await this.discountRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Discount : ${id} not found`)
            throw error
        }
    }

    async create(createDiscountDto: CreateDiscountDto) : Promise<Discount> {
        try {
            const discount: Discount = this.discountRepository.create(createDiscountDto)
            return this.discountRepository.save(discount)
        } catch (error) {
            throw error
        }
    }
    
    async update(id: number, updateDiscountDto: UpdateDiscountDto) : Promise<any> {
        try {
            const discount : Discount = await this.discountRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
            return await this.discountRepository.update(discount.id, updateDiscountDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Discount : ${id} not found`)
            throw error
        }
    }

    async delete(id: number): Promise<Discount> {
        try {
            const discount: Discount = await this.discountRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
            return await this.discountRepository.softRemove(discount)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Discount : ${id} not found`)
            throw error
        }
    }
}
