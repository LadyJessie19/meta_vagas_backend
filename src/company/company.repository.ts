import { Repository } from 'typeorm';
import { Company } from '../database/entities/company.entity';

export class CompanyRepository extends Repository<Company> {}
