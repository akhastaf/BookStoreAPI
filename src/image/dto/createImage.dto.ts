import { Transform } from "class-transformer"
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateImageDto {
    @IsString()
    @IsNotEmpty()
    file_path?: string
    @IsInt()
    width: number
    @IsInt()
    height: number
}