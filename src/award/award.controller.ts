import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AwardService } from './award.service';
import { Award } from './entites/award.entity';
import { CreateAwardDto } from './dto/createAward.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { AwardImagePipe } from './pipe/awardImage.pipe';
import { UpdateAwardDto } from './dto/updateAward.dto';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Get()
  async getAllAwards(): Promise<Award[]> {
    try {
      return await this.awardService.getAllAwards()
    } catch (error) {
      throw error
    }
  }

  @Get(':slug')
  async getOneAward(@Param('slug') slug: string): Promise<Award> {
    try {
      return await this.awardService.getOneAward(slug)
    } catch (error) {
      throw error
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('badge'))
  async create(@Body() createAwardDto: CreateAwardDto, @UploadedFile(new AwardImagePipe()) badge: CreateImageDto): Promise<Award> {
    try {
      return await this.awardService.create(createAwardDto, badge)
    } catch (error) {
      throw error
    }
  }

  @Put(':slug')
  @UseInterceptors(FileInterceptor('badge'))
  async update(@Param('slug') slug: string,@Body() updateAwardDto: UpdateAwardDto, @UploadedFile(new AwardImagePipe()) badge: CreateImageDto): Promise<any> {
    try {
      return await this.awardService.update(slug, updateAwardDto, badge)
    } catch (error) {
      throw error
    }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Award> {
    try {
      return await this.awardService.delete(slug)
    } catch (error) {
      throw error
    }
  }
}
