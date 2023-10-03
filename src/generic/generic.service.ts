import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericEntity } from './generic.entity';

@Injectable()
export class GenericService<T extends GenericEntity> {
  constructor(
    @InjectRepository(GenericEntity)
    private readonly repository: Repository<T>,
  ) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id): Promise<T> {
    return this.repository.findOne(id);
  }

  async create(createDto): Promise<T> {
    const entity = this.repository.create(createDto);
    const response = await this.repository.save(entity)[0];
    return response
  }

  async update(id, updateDto): Promise<T> {
    await this.findOneOrFail(id);
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async delete(id): Promise<void> {
    await this.findOneOrFail(id);
    await this.repository.delete(id);
  }

  private async findOneOrFail(id): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return entity;
  }
}
