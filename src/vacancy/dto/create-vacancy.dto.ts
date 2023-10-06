import { IsNumber, IsString, IsNotEmpty, IsDate} from "class-validator";
import { User } from "src/data-base/entities/user.entity";

export class CreateVacancyDto{
    
    @IsNotEmpty()
    @IsString()
    vacancyRole: string;

    @IsNotEmpty()
    @IsNumber()
    wage : number;

    @IsNotEmpty()
    @IsString()
    location : string;

    @IsNotEmpty()
    @IsString()
    vacancyType : string;

    @IsNotEmpty()
    @IsString()
    vacancyDescription : string;

    @IsNotEmpty()
    @IsString()
    level : string;

    @IsNotEmpty()
    @IsNumber()
    companyId : number;
}