import { PartialType } from '@nestjs/swagger';
import { CreateTecnologyDto } from './create-tecnology.dto';

export class UpdateTecnologyDto extends PartialType(CreateTecnologyDto) {}
