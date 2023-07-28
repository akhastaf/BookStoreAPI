import { IsOptional, IsString } from "class-validator";
import { CreateTranslatorDto } from "./createTranslator.dto";
import { Image } from "src/image/entites/image.entity";
import { Transform } from "class-transformer";
import { AwardToSubjectDtoClass } from "src/award/dto/awardToSubjectDtoClass";

export class UpdateTranslatorDto {
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    biography?: string
    @IsOptional()
    @Transform(({value}) => JSON.parse(value))
    awards?: AwardToSubjectDtoClass[] = []
    image: Image
}