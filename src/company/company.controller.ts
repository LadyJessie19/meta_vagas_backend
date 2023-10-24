import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEnum } from '../enums/user-roles.enum';
import { Roles } from '../decorators/role.decorators';
import { AuthGuard } from '../auth/guards/auth.guards';
import { JwtInterceptor } from '../auth/jwt/jwt.interceptor';

@ApiTags('Company')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 200,
    @Query('name') name: string,
  ) {
    return this.companyService.findAll(page, size, name);
  }

  @Get(':id/vacancies')
  findOne(@Param('id') companyId: string) {
    return this.companyService.findOne(+companyId);
  }

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN])
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.delete(+id);
  }
}
