import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Image } from "src/image/entites/image.entity";

export class CreatePublisherDto {
    @IsString()
    name: string
    @IsOptional()
    @IsString()
    description?: string

    image?: Image
}