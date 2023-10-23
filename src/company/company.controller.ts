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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/enums/user-roles.enum';
import { Roles } from 'src/decorators/role.decorators';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@ApiTags('Company')
@UseGuards(RolesGuard, AuthGuard)
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  // @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  // @Roles(RoleEnum.ADMIN)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('name') name: string,
  ) {
    return this.companyService.findAll(page, size, name);
  }

  @Get(':id/vacancies')
  findOne(@Param('id') companyId: string) {
    return this.companyService.findOne(+companyId);
  }

  //  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.delete(+id);
  }
}
