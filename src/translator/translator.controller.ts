import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { Translator } from './entites/translator.entity';
import { CreateTranslatorDto } from './dto/createTranslator.dto';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { TranslatorImagePipe } from './pipes/trasnlator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTranslatorDto } from './dto/updateTranslator.dto';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Get()
  async getAllTranslators(): Promise<Translator[]> {
    try {
      return await this.translatorService.getAllTranslators()
    } catch (error) {
      throw error
    }
  }


  @Get(':slug')
  async getOneTranslator(@Param('slug') slug: string): Promise<Translator> {
    try {
      return await this.translatorService.getOneTranslator(slug)
    } catch (error) {
      throw error
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createTranslatorDto: CreateTranslatorDto,
        @UploadedFile(new TranslatorImagePipe()) imageDto: CreateImageDto): Promise<Translator> {
    try {
      return await this.translatorService.create(createTranslatorDto, imageDto)
    } catch (error) {
      throw error
    }
  }

  @Put(':slug')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('slug') slug: string,
    @Body() updateTranslatorDto: UpdateTranslatorDto,
    @UploadedFile(new TranslatorImagePipe()) imageDto: CreateImageDto) : Promise<any> {
      try {
        return await this.translatorService.update(slug, updateTranslatorDto, imageDto)
      } catch (error) {
        throw error
      }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) : Promise<Translator> {
    try {
      return await this.translatorService.delete(slug)
    } catch (error) {
      throw error
    }
  }
}
