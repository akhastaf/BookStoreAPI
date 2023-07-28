import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SerieService } from './serie.service';
import { Serie } from './entities/serie.entity';
import { CreateSerieDto } from './dto/createSerie.dto';
import { UpdateSerieDto } from './dto/updateSerie.dto';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Get()
  async getAllSeries(): Promise<Serie[]> {
    try {
      return await this.serieService.getAllSeries()
    } catch (error) {
      throw error
    }
  }

  @Get(':slug')
  async getOneSerie(@Param('slug') slug: string): Promise<Serie> {
    try {
      return await this.serieService.getOneSerie(slug)
    } catch (error) {
      throw error
    }
  }
  
  @Post()
  async create(@Body() createSerieDto: CreateSerieDto): Promise<Serie> {
    try {
      return await this.serieService.create(createSerieDto)
    } catch (error) {
      throw error
    }
  }
  
  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() updateSerieDto: UpdateSerieDto): Promise<any> {
    try {
      return await this.serieService.update(slug, updateSerieDto)
    } catch (error) {
      throw error
    }
  }
  
  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Serie> {
    try {
      return await this.serieService.delete(slug)
    } catch (error) {
      throw error
    }
  }


}
