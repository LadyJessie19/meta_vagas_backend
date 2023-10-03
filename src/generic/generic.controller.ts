import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GenericService } from './generic.service';
import { GenericEntity } from './generic.entity';

@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService<GenericEntity>) {}

  @Get()
  async findAll(): Promise<GenericEntity[]> {
    return this.genericService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GenericEntity> {
    return this.genericService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: Partial<GenericEntity>): Promise<GenericEntity> {
    return this.genericService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: Partial<GenericEntity>,
  ): Promise<GenericEntity> {
    return this.genericService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.genericService.delete(id);
  }
}
