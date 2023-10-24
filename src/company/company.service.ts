import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '../database/entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findAll(page: number, size: number, name: string): Promise<Company[]> {
    const skip = (page - 1) * size;
    const query = this.repository.createQueryBuilder('company');

    if (name) {
      query.where('LOWER(company.name) ILIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    return await query.skip(skip).take(size).getMany();
  }

  async findOne(companyId: number) {
    try {
      const queryBuilder = this.repository
        .createQueryBuilder('company')
        .where('company.id = :companyId', { companyId })
        .leftJoinAndSelect('company.vacancies', 'vacancy');

      return await queryBuilder.getOne();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.repository.findOneByOrFail({ id });

      await this.repository.update({ id }, updateCompanyDto);

      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const company = await this.findOne(id);
      await this.repository.remove(company);
      return {
        success: true,
        message: `The company with id ${id} was successfully deleted`,
      };
    } catch (error) {
      throw new Error(`Failed to delete company: ${error.message}`);
    }
  }
}
