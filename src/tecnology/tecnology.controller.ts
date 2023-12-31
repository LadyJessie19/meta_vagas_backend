import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  Query,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../enums/user-roles.enum';
import { Roles } from '../decorators/role.decorators';
import { Tecnology } from '../database/entities/tecnology.entity';
import { UpdateTecnologyDto } from './dto/update-tecnology.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { JwtInterceptor } from 'src/auth/jwt/jwt.interceptor';

@ApiTags('Technology')
@Controller('tecnologies')
export class TecnologyController {
  constructor(private readonly tecnologyService: TecnologyService) {}

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Post()
  async create(@Body() createTecnologyDto: CreateTecnologyDto) {
    return await this.tecnologyService.create(createTecnologyDto);
  }

  @Get()
  async findAll() {
    return await this.tecnologyService.findAll();
  }

  @Get(':id/one')
  async findOne(@Param('id') id: string) {
    return await this.tecnologyService.findOne(+id);
  }

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTecnologyDto: UpdateTecnologyDto,
  ): Promise<Tecnology> {
    return await this.tecnologyService.update(+id, updateTecnologyDto);
  }

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Object> {
    return await this.tecnologyService.delete(+id);
  }

  @Get('search')
  async search(@Query('name') name: string): Promise<Tecnology[]> {
    Promise<Tecnology>;
    if (!name) {
      throw new BadRequestException('Name parameter is required');
    }
    return await this.tecnologyService.findByName(name);
  }
}
