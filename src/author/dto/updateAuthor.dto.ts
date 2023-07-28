import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Image } from "src/image/entites/image.entity";
import { AwardToSubjectDtoClass } from "../../award/dto/awardToSubjectDtoClass";
import { AwardToAuthor } from "src/award/entites/awardAuthor.entity";

export class UpdateAuthorDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    biography?: string
    @IsOptional()
    @Transform(({value}) => JSON.parse(value))
    awards?: AwardToSubjectDtoClass[] = []
    //awardToAuthor?: AwardToAuthor[]
    image?: Image
}