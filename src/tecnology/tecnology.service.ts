import { Injectable } from '@nestjs/common';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { UpdateTecnologyDto } from './dto/update-tecnology.dto';

@Injectable()
export class TecnologyService {
  create(createTecnologyDto: CreateTecnologyDto) {
    return 'This action adds a new tecnology';
  }

  findAll() {
    return `This action returns all tecnology`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tecnology`;
  }

  update(id: number, updateTecnologyDto: UpdateTecnologyDto) {
    return `This action updates a #${id} tecnology`;
  }

  remove(id: number) {
    return `This action removes a #${id} tecnology`;
  }
}
