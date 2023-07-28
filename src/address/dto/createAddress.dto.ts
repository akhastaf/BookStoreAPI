import { IsNotEmpty, IsPhoneNumber, IsPostalCode, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsString()
    @IsNotEmpty()
    // @IsPostalCode(undefined)
    postal_code: string

    @IsString()
    @IsNotEmpty()
    country: string

}