import { Transform } from "class-transformer";
import { IsBoolean, IsBooleanString, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePromotionDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsDateString()
    // @Transform((value) => value)
    start_date: Date

    @IsDateString()
    // @Transform((value) => value)
    @IsOptional()
    end_date?: Date

    @IsBoolean()
    @Transform((value) => value ? true : false)
    @IsOptional()
    active?: boolean
}