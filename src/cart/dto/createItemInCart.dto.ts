import { IsInt, IsNumber, IsOptional, IsPositive, Max } from "class-validator";
import { Book } from "src/book/entites/book.entity";

export class CreateItemInCartDto {
    @IsOptional()
    @IsPositive()
    @IsInt()
    @Max(10)
    quantity?: number = 1

    @IsInt()
    @IsPositive()
    book_id:number
}