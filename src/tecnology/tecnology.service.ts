import { HttpException, Injectable } from '@nestjs/common';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { Tecnology } from '../database/entities/tecnology.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TecnologyService {
  constructor(
    @InjectRepository(Tecnology)
    private readonly repository: Repository<Tecnology>,
  ) {}

  async create(createTecnologyDto: CreateTecnologyDto): Promise<Tecnology> {
    try {
      const newTecnology = this.repository.create(createTecnologyDto);
      await this.repository.save(newTecnology);
      return newTecnology;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async findAll(): Promise<Tecnology[]> {
    return await this.repository.find();
  }
}
