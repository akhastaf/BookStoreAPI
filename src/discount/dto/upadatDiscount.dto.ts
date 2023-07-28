import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsBoolean } from "class-validator";
import { DISCOUNT_TYPE } from "../entites/discount.entity";
import { CreateDiscountDto } from "./createDiscount.dto";

export class UpdateDiscountDto {
    @IsOptional()
    code?: string
    @IsOptional()
    @IsEnum(DISCOUNT_TYPE)
    type?: DISCOUNT_TYPE
    @IsOptional()
    @IsNumber()
    value?: number
    @IsOptional()
    @IsBoolean()
    active?: boolean
}