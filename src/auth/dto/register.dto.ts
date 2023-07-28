import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 20)
    @IsStrongPassword()
    password: string;
}