import { IsOptional, IsString } from "class-validator";
import { CreatePublisherDto } from "./createPublisher.dto";
import { Image } from "src/image/entites/image.entity";

export class UpdatePublisherDto {
    @IsString()
    @IsOptional()
    name?: string
    @IsString()
    @IsOptional()
    description?: string

    image?: Image
}