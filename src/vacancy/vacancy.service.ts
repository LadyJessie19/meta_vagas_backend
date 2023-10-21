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
import { Brackets, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { TecnologyService } from '../tecnology/tecnology.service';
import { User } from 'src/database/entities/user.entity';
import { PostVacancyDto } from './dto/post-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    private userService: UserService,
    private techService: TecnologyService,
    private companyService: CompanyService,
  ) {}

  async createVacancy(vacancy: PostVacancyDto) {
    try {
      const technologies = await this.techService.findAll();
      const company = await this.companyService.findOne(vacancy.companyId);
      const user = await this.userService.findUserByEmail(
        vacancy.advertiserEmail,
      );

      const newVacancy = this.vacancyRepository.create({
        ...vacancy,
        advertiserId: user,
        companyId: company,
        technologies: [],
      });

      for (let i = 0; i < vacancy.technologies.length; i++) {
        for (let j = 0; j < technologies.length; j++) {
          if (
            vacancy.technologies[i].trim().toLocaleLowerCase() ===
            technologies[j].tecName.trim().toLowerCase()
          ) {
            newVacancy.technologies.push(technologies[j]);
          }
        }
      }

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

  async findVacancies(
    page: number,
    limit: number,
    tech: string,
    role: string,
    maxWage: number,
    minWage: number,
    type: string,
    local: string,
    description: string,
  ) {
    try {
      const vacancies = await this.vacancyRepository
        .createQueryBuilder('vacancy')
        .where('vacancy.wage BETWEEN :minWage AND :maxWage', {
          minWage,
          maxWage,
        })
        .andWhere('vacancy.vacancyType ILIKE :type', {
          type: `%${type.trim()}%`,
        })
        .andWhere('vacancy.location ILIKE :local', {
          local: `%${local.trim()}%`,
        })
        .andWhere(
          new Brackets((qb) => {
            qb.where('vacancy.vacancyDescription ILIKE :role', {
              role: `%${role?.trim()}%`,
            })
              .orWhere('vacancy.vacancyRole ILIKE :role', {
                role: `%${role?.trim()}%`,
              })
              .orWhere(':tech IN vacancy.technologies', {
                tech: `%${tech.trim()}%`,
              });
          }),
        )
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      return {
        vacancies,
        page,
        pageSize: limit,
        quantity: vacancies.length,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVacancy(id: number, payload: updateVacancyDto) {
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
  s;
}
