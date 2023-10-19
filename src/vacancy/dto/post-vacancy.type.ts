import { type } from "os";
import { CreateVacancyDto } from "./create-vacancy.dto";

export type postVacancyType = {
    payload : CreateVacancyDto,
    companyId : number,
    technologies : string[],
    userEmail : string,
}