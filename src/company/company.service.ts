import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from 'src/database/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}


  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const newCompany = this.repository.create(createCompanyDto);
      await this.repository.save(newCompany);
      return newCompany;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }


  async findAll(): Promise<Company[]> {
    return await this.repository.find();
  }

  async findOne(id: number) {
    try {
      const companyFound = await this.repository.findOneBy({ id });

      if (!companyFound) {
        throw new NotFoundException('company with this id not found.');
      }

      return companyFound;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.repository.findOneByOrFail({ id })

      await this.repository.update({ id }, updateCompanyDto);

      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
