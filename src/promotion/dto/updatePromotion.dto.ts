import { Transform } from "class-transformer"
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBooleanString, IsBoolean } from "class-validator"
import { Image } from "src/image/entites/image.entity"

export class UpdatePromotionDto {
    @IsString()
    @IsOptional()
    title?: string
    
    @IsString()
    @IsOptional()
    description?: string
    
    @IsDateString()
    @Transform((value) => value)
    @IsOptional()
    start_date?: Date
    
    @IsDateString()
    @Transform((value) => value)
    @IsOptional()
    end_date?: Date

    @IsOptional()
    @IsBoolean()
    @Transform((value) => value? true : false)
    active?: boolean

    images: Image[]


}