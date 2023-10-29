import { Test, TestingModule } from '@nestjs/testing';
import { VacancyService } from './vacancy.service';
import { userServiceMock } from '../testing/user.service.mock';
import { vacancyRepositoryMock } from '../testing/vacancy-repository.mock';
import { vacancyCreatedMock } from '../testing/vacancy-created.mock';
import { vacanciesFoundMock } from '../testing/vacancies-found.mock';
import { vacancyUpdatedMock } from '../testing/vacancy-updated.mock';

describe('VacancyService', () => {
  let vacancyService: VacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacancyService, userServiceMock, vacancyRepositoryMock],
    }).compile();

    vacancyService = module.get<VacancyService>(VacancyService);
  });

  it('should be defined', () => {
    expect(vacancyService).toBeDefined();
  });

  describe('CreateVacancy', () => {
    it('should create a vacancy', async () => {
      const result = await vacancyService.createVacancy(vacancyCreatedMock, 1);

      expect(result).toEqual(vacancyCreatedMock);
    });
  });

  describe('findVacancyById', () => {
    it("should find a vacancy by it's id", async () => {
      const result = await vacancyService.findVacancyById({
        id: vacancyCreatedMock.id,
        userName: 'teste',
      });

      expect(result).toEqual(vacancyCreatedMock);
    });
  });

  describe('findVacancies', () => {
    it('should find an vacancy array', async () => {
      const result = await vacancyService.findVacancies(
        /*page :*/ 1,
        /*limit :*/ 5,
        /*tech :*/ '',
        /*role :*/ '',
        /*maxWage :*/ 10000,
        /*minWage : */ 0,
        /*type :*/ '',
        /*local :*/ '',
        /*description :*/ '',
      );
      expect(result).toEqual({
        vacancies: vacanciesFoundMock,
        page: 1,
        pageSize: 5,
        quantity: 3,
      });
    });
  });

  describe('updateVacancy', () => {
    it('should update an existing vacancy', async () => {
      const result = await vacancyService.updateVacancy(1, vacancyUpdatedMock);
      expect(result).toEqual(true);
    });
  });

  describe('deleteVacancy', () => {
    it('should update an existing vacancy', async () => {
      const result = await vacancyService.deleteVacancy(1);
      expect(result).toEqual(true);
    });
  });
});
