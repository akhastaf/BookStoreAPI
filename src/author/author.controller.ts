import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { Author } from './entities/author.entity';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EntityNotFoundError } from 'typeorm';
import { AuthorImagePipe } from './pipes/author.pipe';
import { CreateImageDto } from 'src/image/dto/createImage.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthor() : Promise<Author[]> {
    try {
      return this.authorService.getAllAuthors()
    } catch (error) {
      throw error
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createAuthorDto: CreateAuthorDto, @UploadedFile(new AuthorImagePipe()) image: CreateImageDto): Promise<Author> {
    try {
      return this.authorService.create(createAuthorDto, image)
    } catch (error) {
      throw error
    }
  }

  @Put(':slug')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Body() updateAuthorDto: UpdateAuthorDto, @Param('slug') slug: string, @UploadedFile(new AuthorImagePipe()) image: CreateImageDto) : Promise<any> {
    try {
      console.log(updateAuthorDto)
      console.log(slug)
      console.log(image)
      return this.authorService.update(updateAuthorDto, slug, image)
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new BadRequestException('Author not found')
      throw error
    }
  }

  @Get(':slug')
  async getOneAuthor(@Param('slug') slug: string) : Promise<Author> {
    try {
      return this.authorService.getOneAuthor(slug)
    } catch (error) {
      // if (error instanceof EntityNotFoundError)
      //   throw new BadRequestException('Author not found')
      throw error
    }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Author> {
    try {
      return this.authorService.delete(slug)
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new BadRequestException('Author not found')
      throw error
    }
  }
}
