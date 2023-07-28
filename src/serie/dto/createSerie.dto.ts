import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateSerieDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    description?: string

    @IsPositive()
    @IsNumber()
    numberOfBooks: number

    // books: number[]
    
}