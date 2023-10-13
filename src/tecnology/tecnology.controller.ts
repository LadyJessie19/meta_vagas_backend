import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/user-roles.enum';
import { Roles } from 'src/decorators/role.decorators';

@ApiTags('Technology')
@UseGuards(RolesGuard)
@Controller('tecnologies')
export class TecnologyController {
  constructor(private readonly tecnologyService: TecnologyService) {}

  // @Roles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createTecnologyDto: CreateTecnologyDto) {
    return await this.tecnologyService.create(createTecnologyDto);
  }

  @Get()
  async findAll() {
    return await this.tecnologyService.findAll();
  }
}
