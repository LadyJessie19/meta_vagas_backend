import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    // @IsDate()
    @IsString()
    foundedAt: String;

    @IsNotEmpty()
    @IsString()
    description: string;
}
