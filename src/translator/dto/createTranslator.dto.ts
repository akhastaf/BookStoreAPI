import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { AwardToSubjectDtoClass } from "src/award/dto/awardToSubjectDtoClass";
import { Image } from "src/image/entites/image.entity";

export class CreateTranslatorDto {
    @IsString()
    // @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    biography?: string
    @IsOptional()
    @Transform(({value}) => JSON.parse(value))
    awards?: AwardToSubjectDtoClass[] = []
    image: Image
}