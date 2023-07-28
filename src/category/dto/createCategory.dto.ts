import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    parent_category?: number


}