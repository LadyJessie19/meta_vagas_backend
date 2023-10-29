import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CompanyService } from './company.service';
import { Company } from '../database/entities/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new company', async () => {
    const createCompanyDto = {
      name: 'Summers',
      city: 'Nova iguacu',
      state: 'Rio de janeiro',
      address: 'Rua tals, 123, centro',
      foundedAt: '2022-09-09',
      description: 'Melhor lugar para trabalhar',
    };

    const resolvedCreatedCompany: any = {
      name: 'Summers',
      city: 'Nova iguacu',
      state: 'Rio de janeiro',
      address: 'Rua tals, 123, centro',
      foundedAt: '2022-09-09',
      description: 'Melhor lugar para trabalhar',
      id: 1,
    };

    const save = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(resolvedCreatedCompany);

    const result = await service.create(createCompanyDto);

    expect(result).toEqual(createCompanyDto);
    expect(save).toHaveBeenCalledWith(createCompanyDto);
  });

  it('should find one company', async () => {
    const companyId = 1;
    const company = new Company();

    const findOne = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(company);

    const result = await service.findOne(companyId);

    expect(result).toEqual(company);
    expect(findOne).toHaveBeenCalledWith(companyId);
  });

  it('should delete a company', async () => {
    const companyId = 1;
    const company = new Company();

    const findOne = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(company);
    const remove = jest.spyOn(repository, 'remove').mockResolvedValue(company);

    const result = await service.delete(companyId);

    expect(result).toEqual({
      success: true,
      message: `The company with id ${companyId} was successfully deleted`,
    });
    expect(findOne).toHaveBeenCalledWith(companyId);
    expect(remove).toHaveBeenCalledWith(company);
  });
});
