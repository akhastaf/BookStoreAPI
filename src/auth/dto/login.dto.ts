import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string
    @IsString()
    @Length(8, 20)
    @IsStrongPassword()
    password: string
}