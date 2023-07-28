import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Promotion } from './entites/promotion.entity';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePromotionDto } from './dto/updatePromotion.dto';
import { PromotionImagePipe } from './pipe/promotion.pipe';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  async getAllPromotions(): Promise<Promotion[]> {
    try {
      return await this.promotionService.getAllPromotions()
    } catch (error) {
      throw error
    }
  }
  
  @Get('active')
  async getActivePromotions(): Promise<Promotion[]> {
    try {
      return await this.promotionService.getActviePromotions()
    } catch (error) {
      throw error
    }
  }
  
  @Get(':id')
  async getOnePromotion(@Param('id', ParseIntPipe) id: number): Promise<Promotion> {
    try {
      return await this.promotionService.getOnePromotion(id)
    } catch (error) {
      throw error
    }
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createPromotionDto: CreatePromotionDto,
    @UploadedFile(new PromotionImagePipe()) imagesDto: CreateImageDto[]): Promise<Promotion> {
    try {
      return await this.promotionService.create(createPromotionDto, imagesDto)
    } catch (error) {
      throw error
    }
  }
  
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Body() updatePromotionDto: UpdatePromotionDto,
    @Param('id', ParseIntPipe) id: number, 
    @UploadedFile('image', new PromotionImagePipe()) imagesDto: CreateImageDto[]): Promise<any> 
  {
    try {
      return await this.promotionService.update(id, updatePromotionDto, imagesDto)
    } catch (error) {
      throw error
    }
  }
  
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Promotion> {
    try {
      return await this.promotionService.delete(id)
    } catch (error) {
      throw error
    }
  }
}
