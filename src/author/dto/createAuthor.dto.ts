import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { Image } from "src/image/entites/image.entity";
import { AwardToSubjectDtoClass } from "../../award/dto/awardToSubjectDtoClass";

export class CreateAuthorDto {
    @IsString()
    @IsOptional()
    name?: string   
    @IsOptional()
    @IsString()
    biography?: string
    @IsOptional()
    @Transform(({value}) => JSON.parse(value))
    awards?: AwardToSubjectDtoClass[] = []
    image?: Image
}