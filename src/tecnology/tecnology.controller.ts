import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { UpdateTecnologyDto } from './dto/update-tecnology.dto';

@Controller('tecnology')
export class TecnologyController {
  constructor(private readonly tecnologyService: TecnologyService) {}

  @Post()
  create(@Body() createTecnologyDto: CreateTecnologyDto) {
    return this.tecnologyService.create(createTecnologyDto);
  }

  @Get()
  findAll() {
    return this.tecnologyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tecnologyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecnologyDto: UpdateTecnologyDto) {
    return this.tecnologyService.update(+id, updateTecnologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecnologyService.remove(+id);
  }
}
