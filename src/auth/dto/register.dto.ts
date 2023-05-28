import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class RegistrationDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 20)
    @IsStrongPassword()
    password: string;
}