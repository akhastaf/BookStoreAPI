import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from "class-validator"
import { Category } from "../entites/category.entity"

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    parent_category_id?: number

    parent_category?: Category
}