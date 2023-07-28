import { IsString, IsNotEmpty, IsPhoneNumber, IsPostalCode, IsOptional, IsBoolean } from "class-validator"

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    name?: string
    
    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @IsString()
    @IsOptional()
    address?: string
    
    @IsString()
    @IsOptional()
    city?: string
    
    @IsString()
    @IsOptional()
    state?: string
    
    @IsString()
    @IsOptional()
    // @IsPostalCode()
    postal_code?: string

    @IsString()
    @IsOptional()
    country?: string

    @IsBoolean()
    @IsOptional()
    is_default?: boolean


}