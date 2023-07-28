import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AWARD_TYPE } from "../entites/award.entity";
import { Image } from "src/image/entites/image.entity";

export class UpdateAwardDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsEnum(AWARD_TYPE)
    award_type?: AWARD_TYPE

    badge: Image
}