import { IS_STRING, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { DISCOUNT_TYPE } from "../entites/discount.entity"

export class CreateDiscountDto {
    @IsNotEmpty()
    code: string
    @IsEnum(DISCOUNT_TYPE)
    type: DISCOUNT_TYPE
    @IsNumber()
    value: number
    @IsOptional()
    @IsBoolean()
    active?: boolean
}