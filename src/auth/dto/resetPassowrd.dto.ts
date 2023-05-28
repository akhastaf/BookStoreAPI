import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class ResetPasswordDto {
    @IsEmail()
    email: string
    @IsString()
    @IsNotEmpty()
    token: string
    @Length(8, 20)
    @IsString()
    @IsStrongPassword()
    password: string
}