import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancy.entity';
import { vacancyCreatedMock } from './vacancy-created.mock';
import { vacanciesFoundMock } from './vacancies-found.mock';

export const vacancyRepositoryMock = {
  provide: getRepositoryToken(Vacancy),
  useValue: {
    delete: jest.fn().mockResolvedValue(true),
    findOneOrFail: jest.fn().mockResolvedValue(vacanciesFoundMock[0]),
    update: jest.fn().mockResolvedValue(true),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect : jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(vacanciesFoundMock),
    })),
    create: jest.fn().mockResolvedValue(vacancyCreatedMock),
    save: jest.fn().mockResolvedValue(true),
  },
};
