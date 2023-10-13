import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/enums/user-roles.enum';
import { Roles } from 'src/decorators/role.decorators';

@ApiTags('Company')
@UseGuards(RolesGuard)
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  // @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }
}

/*
// company.repository.ts
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Repository(Company)
export class CompanyRepository extends Repository<Company> {
  async findAllWithVacancies(name?: string) {
    const query = this.createQueryBuilder('company')
      .leftJoinAndSelect('company.vacancies', 'vacancies');

    if (name) {
      query.where('company.name LIKE :name', { name: `%${name}%` });
    }

    return await query.getMany();
  }
}

// company.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { CompanyRepository } from './company.repository';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyRepository: CompanyRepository) {}

  @Get()
  async findAllWithVacancies(@Query('name') name?: string) {
    const companies = await this.companyRepository.findAllWithVacancies(name);

    return companies;
  }
}
*/