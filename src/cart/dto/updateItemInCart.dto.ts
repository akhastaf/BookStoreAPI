import { IsOptional, IsPositive, IsInt } from "class-validator"

export class UpdateItemCartDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    quantity?: number = 1

    @IsInt()
    @IsPositive()
    book_id:number
}