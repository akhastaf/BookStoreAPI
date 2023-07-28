import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entites/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryService.getAllCategories()
    } catch (error) {
      throw error
    }
  }
  
  @Get(':slug')
  async getOneCategory(@Param('slug') slug: string): Promise<Category> {
    try {
      return await this.categoryService.getOneCategory(slug)
    } catch (error) {
      throw error
    }
  }
  
  @Post()
  async create(@Body() createCategorDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryService.create(createCategorDto)
    } catch (error) {
      throw error
    }
  }
  
  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<any> {
    try {
      return await this.categoryService.update(slug, updateCategoryDto)
    } catch (error) {
      throw error
    }
  }
  
  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Category> {
    try {
      return await this.categoryService.delete(slug)
    } catch (error) {
      throw error
    }
  }
}
