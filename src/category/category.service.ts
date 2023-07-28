import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entites/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

    async getAllCategories(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find({
                relations: {
                    sub_categories: true
                }
            })
        } catch (error) {
            throw error
        }
    }
    
    async getOneCategory(slug: string): Promise<Category> {
        try {
            return await this.categoryRepository.findOneOrFail({
                where: {
                    slug: slug
                },
                relations: {
                    books: true,
                    sub_categories: true
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Category: ${slug} not found`)
            throw error
        }
    }
    
    async create(createCategory: CreateCategoryDto): Promise<Category> {
        try {
            const {parent_category, ...categoryData} = createCategory
            const category = this.categoryRepository.create(categoryData)
            if (parent_category)
                category.parent_category = await this.categoryRepository.findOneOrFail({
                    where: {
                        id: parent_category
                    }
                })
            
            return await this.categoryRepository.save(category)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Category: ${createCategory.parent_category} not found`)
            throw error
        }
    }
    
    async update(slug: string, updateCategory: UpdateCategoryDto): Promise<any> {
        try {
            const category: Category = await this.categoryRepository.findOneOrFail({
                where: {
                    slug: slug
                },
                relations: {
                    parent_category: true
                }
            })
            const {parent_category_id, ...categoryData} = updateCategory
            if (parent_category_id)
                category.parent_category = await this.categoryRepository.findOneOrFail({
                    where: {
                        id: parent_category_id
                    }
                })
            
            return await this.categoryRepository.update(category.id, updateCategory)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Category : ${slug} is not found`)
            throw error
        }
    }

    async delete(slug: string) : Promise<Category> {
        try {
            const category : Category = await this.categoryRepository.findOneOrFail({
                where:{
                    slug: slug
                },
            })
            return await this.categoryRepository.softRemove(category)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Category : ${slug} is not found`)
            throw error
        }
    }

    async findOneById(id: number) : Promise<Category> {
        try {
            return await this.categoryRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`Category: ${id} is not found`)
            throw error
        }
    }
}
