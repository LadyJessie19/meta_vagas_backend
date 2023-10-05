import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class CreateTecnologyDto {
    @IsNotEmpty()
    @IsString()
    tecName:string

    @IsNotEmpty()
    @IsString()
    creatorsName:string
}
