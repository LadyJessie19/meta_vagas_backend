import { IsNumber, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Tecnology } from '../../database/entities/tecnology.entity';
import { Company } from '../../database/entities/company.entity';

export class PostVacancyDto {
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @IsNotEmpty()
  @IsNumber()
  wage: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  vacancyType: string;

  @IsNotEmpty()
  @IsString()
  vacancyDescription: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsArray()
  technologies: string[];

  @IsNotEmpty()
  @IsString()
  advertiserEmail : string;
}