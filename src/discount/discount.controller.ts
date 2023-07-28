import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './entites/discount.entity';
import { CreateDiscountDto } from './dto/createDiscount.dto';
import { UpdateDiscountDto } from './dto/upadatDiscount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  async getAllDiscounts(): Promise<Discount[]> {
    try {
      return this.discountService.getAllDiscounts()
    } catch (error) {
      throw error
    }
  }
  
  @Get(':id')
  async getDiscount(@Param('id', ParseIntPipe) id: number): Promise<Discount> {
    try {
      return this.discountService.getDiscount(id)
    } catch (error) {
      throw error
    }
  }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) : Promise<Discount> {
    try {
      return this.discountService.create(createDiscountDto)
    } catch (error) {
      throw error
    }
  }

  @Put(':id')
  async update(@Body() updateDiscountDto: UpdateDiscountDto, @Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return this.discountService.update(id, updateDiscountDto)
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Discount> {
    try {
      return this.discountService.delete(id)
    } catch (error) {
      throw error
    }
  }
}
