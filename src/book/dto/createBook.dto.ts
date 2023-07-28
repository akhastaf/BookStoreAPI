import { ArrayNotEmpty, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { Image } from "src/image/entites/image.entity";
import { COVER_TYPE } from "../entites/book.entity";
import { Transform } from "class-transformer";
import { AwardToSubjectDtoClass } from "src/award/dto/awardToSubjectDtoClass";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsOptional()
    @IsString()
    description?: string
    
    @IsNumber()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    price: number;
    
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    inventory_count: number;
    
    @IsString()
    isbn: string;
    
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    pages: number;
    
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    is_in_series?: boolean = false;
    
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ValidateIf((obj) => obj.is_in_series === true)
    series_order?: number
    
    @IsString()
    dimensions: string;
    
    @IsEnum(COVER_TYPE)
    cover_type: COVER_TYPE;
    
    @IsDateString()
    date_of_publition: Date;
  
    @IsString()
    weight: string;

    // images: Image[]
    // image: Image

    @IsOptional()
    @ValidateIf((obj) => obj.is_in_series === true)
    @IsNumber()
    @Transform(({value}) => parseInt(value))
    serie?: number
    
    @IsNotEmpty()
    @Transform(({ value }) => value.split(',').map((item : string) => parseInt(item.trim(), 10)))
    authors: number[] = [];

    @IsOptional()
    @Transform(({ value }) => value.split(',').map((item : string) => parseInt(item.trim(), 10)))
    translators?: number[] = [];

    @IsNotEmpty()
    @Transform(({ value }) => value.split(',').map((item : string) => parseInt(item.trim(), 10)))
    publishers: number[] = [];
   
    @IsOptional()
    @Transform(({ value }) => value.split(',').map((item : string) => parseInt(item.trim(), 10)))
    categories?: number[] = [];
    
    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    awards?: AwardToSubjectDtoClass[] = [];


    

}