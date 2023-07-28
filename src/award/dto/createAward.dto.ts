import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AWARD_TYPE } from "../entites/award.entity";
import { Image } from "src/image/entites/image.entity";
import { Transform } from "class-transformer";

export class CreateAwardDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsEnum(AWARD_TYPE)
    award_type: AWARD_TYPE = AWARD_TYPE.BOOK

    badge: Image
}