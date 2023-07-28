import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateSerieDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    description?: string

    @IsOptional()
    @IsPositive()
    @IsNumber()
    numberOfBooks?: number
}