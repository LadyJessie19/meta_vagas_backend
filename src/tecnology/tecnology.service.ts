import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      const newTecName = createTecnologyDto.tecName.toLowerCase().trim();
      const newCreatorsName = createTecnologyDto.creatorsName
        .toLowerCase()
        .trim();

      const payload: CreateTecnologyDto = {
        tecName: newTecName,
        creatorsName: newCreatorsName,
      };

      const newTecnology = this.repository.create(payload);
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
    try {
      return await this.repository.find();
    } catch (error) {
      throw new Error(`Failed to fetch technologies: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Tecnology> {
    try {
      const tecnology = await this.repository.findOneByOrFail({ id });
      if (!tecnology) {
        throw new NotFoundException(`Tecnology with ID ${id} not found`);
      }
      return tecnology;
    } catch (error) {
      throw new Error(`Failed to find technology by ID: ${error.message}`);
    }
  }

  async update(id: number, updateData: Partial<Tecnology>): Promise<Tecnology> {
    try {
      await this.findOne(id);
      await this.repository.update(id, updateData);
      return await this.findOne(id);
    } catch (error) {
      throw new Error(`Failed to update technology: ${error.message}`);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const tecnology = await this.findOne(id);
      await this.repository.remove(tecnology);
      return {
        success: true,
        message: `The tecnology with id ${id} was successfully deleted`,
      };
    } catch (error) {
      throw new Error(`Failed to delete technology: ${error.message}`);
    }
  }

  async findByName(tecName: string): Promise<Tecnology[] | null> {
    if (!tecName) {
      throw new BadRequestException('Name parameter is required');
    }

    const query = this.repository
      .createQueryBuilder('tecnology')
      .where('LOWER(tecnology.tecName) ILIKE :name', {
        name: `%${tecName.toLowerCase()}%`,
      });

    const tecnology = await query.getMany();

    if (!tecnology) {
      throw new NotFoundException(
        `Technology with tecName containing '${tecName}' not found`,
      );
    }

    return tecnology;
  }
}
