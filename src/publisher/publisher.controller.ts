import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { Publisher } from './entites/publisher.entity';
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublisherImagePipe } from './pipes/publisher.pipe';
import { CreateImageDto } from 'src/image/dto/createImage.dto';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  async getAllPublisher(): Promise<Publisher[]> {
    try {
      return await this.publisherService.getAllPublishers()
    } catch (error) {
      throw error
    }
  }

  @Get(':slug')
  async getOnePublisher(@Param('slug') slug: string) : Promise<Publisher> {
    try {
      return await this.publisherService.getOnePublisher(slug)
    } catch (error) {
      throw error 
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createPublisherDto: CreatePublisherDto, @UploadedFile(new PublisherImagePipe()) image: CreateImageDto) : Promise<Publisher> {
    try {
      return await this.publisherService.create(createPublisherDto, image)
    } catch (error) {
      throw error
    }
  }
  
  @Put(':slug')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Body() updatePublisherDto: UpdatePublisherDto, @Param('slug') slug: string, @UploadedFile(new PublisherImagePipe()) image: CreateImageDto) : Promise<Publisher> {
    try {
      return await this.publisherService.update(slug, updatePublisherDto, image)
    } catch (error) {
      throw error
    }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Publisher> {
    try {
      return await this.publisherService.delete(slug)
    } catch (error) {
      throw error
    }
  }
}
