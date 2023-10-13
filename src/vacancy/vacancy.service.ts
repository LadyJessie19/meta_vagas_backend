import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { updateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancy.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    private userService: UserService,
  ) {}

  async createVacancy(vacancy: any, userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      const newVacancy: any = this.vacancyRepository.create(vacancy);

      newVacancy.advertiserId = user;

      await this.vacancyRepository.save(newVacancy);

      return newVacancy;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findVacancyById(filter: { id: number; userName: string }) {
    try {
      const vacancy = await this.vacancyRepository.findOneOrFail({
        where: {
          id: filter.id,
        },
        relations: ['advertiserId'],
      });
      if (
        vacancy.advertiserId.name.toLowerCase().trim() !==
        filter.userName.toLowerCase().trim()
      ) {
        console.log('fails');
        throw new NotFoundException('Vacancy not found');
      }
      return vacancy;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findVacancies(filter: any) {
    try {
      const vacancies = await this.vacancyRepository.find({
        where: filter,
      });
      return vacancies;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVacancy(id: number, payload: any) {
    try {
      const vacancy = await this.vacancyRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
      const newVacancy = await this.vacancyRepository.update(id, payload);
      return newVacancy;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteVacancy(id: number) {
    try {
      const vacancy = await this.vacancyRepository.delete(id);

      return vacancy;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
