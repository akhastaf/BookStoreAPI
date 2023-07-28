import { IsArray, IsNumber } from "class-validator";

export class DeleteItemsInCartDto {
    @IsArray()
    @IsNumber({}, { each: true})
    books_id: number[]
}