import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class TwoFactorDto {
    @IsEmail()
    email: string
    @IsString()
    @IsNotEmpty()
    token: string
}