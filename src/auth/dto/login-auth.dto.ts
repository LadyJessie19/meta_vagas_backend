import { IsEmail, IsString } from "class-validator";

export class LoginAuthDto{
    @IsEmail()
    email : string

    @IsString()
    password: string
}