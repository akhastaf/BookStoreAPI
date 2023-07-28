import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './entites/book.entity';
import { Request } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthorImagePipe } from 'src/author/pipes/author.pipe';
import { CreateImageDto } from 'src/image/dto/createImage.dto';
import { BookImagesPipe } from './pipe/book.pipe';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}


  @Get()
  async getAllBooks(): Promise<Book[]> {
    try {
      return this.bookService.getAllBooks()
    } catch (error) {
      throw error
    }
  }

  @Get(':slug')
  async getOneBook(@Param('slug') slug: string): Promise<Book> {
    try {
      return this.bookService.getOneBook(slug)
    } catch (error) {
      throw error
    }
  }

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(FilesInterceptor('images'))
  async create(@Body() createBookdto: CreateBookDto,
    // @UploadedFile(new AuthorImagePipe()) imageDto: CreateImageDto,
    @UploadedFiles(new BookImagesPipe()) imagesDto: CreateImageDto[]
  ): Promise<any> {
    try {
      // console.log(createBookdto)
      // console.log(imagesDto)
      // return createBookdto
      return await this.bookService.create(createBookdto, imagesDto)
    } catch (error) {
      throw error
    }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) : Promise<Book> {
    try {
      return await this.bookService.delete(slug)
    } catch (error) {
      throw error
    }
  }
}
