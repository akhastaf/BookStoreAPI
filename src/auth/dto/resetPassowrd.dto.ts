import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string
    @Length(8, 20)
    @IsString()
    @IsStrongPassword()
    password: string
}