import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { RoleEnum } from 'src/enums/user-roles.enum';
  RoleEnum
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(18)
    password: string;
  
    @IsEnum(RoleEnum)
    @IsOptional()
    role?: RoleEnum;
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  }
