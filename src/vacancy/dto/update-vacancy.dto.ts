import { PartialType } from "@nestjs/swagger";
import { CreateVacancyDto } from "./create-vacancy.dto";

export class updateVacancyDto extends PartialType(CreateVacancyDto){}