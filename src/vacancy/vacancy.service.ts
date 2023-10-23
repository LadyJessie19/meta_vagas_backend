import {
  BadRequestException,
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
import * as xlsx from 'xlsx';
import { promises as fsPromises } from 'fs';
import { MulterFile } from 'multer';
import * as path from 'path';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    private userService: UserService,
    private companyService: CompanyService,
    private techService: TecnologyService,
  ) {}

  async createVacancy(
    vacancy: CreateVacancyDto,
    userEmail: string,
    companyId: number,
    techs: string[],
  ) {
    try {
      const tech = (await this.techService.findAll()).filter((tech) => {
        techs.includes(tech.tecName);
      });
      const company = await this.companyService.findOne(companyId);
      const user = await this.userService.findUserByEmail(userEmail);
      const newVacancy = this.vacancyRepository.create(vacancy);

      newVacancy.advertiserId = user;
      newVacancy.companyId = company;
      newVacancy.technologies = tech;

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

  async createVacanciesAPartirFromXLSX(
    file: MulterFile,
    fileBuffer: Buffer,
  ): Promise<Vacancy[]> {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (path.extname(file.originalname).toLowerCase() !== '.xlsx') {
      throw new BadRequestException(
        'Tipo de arquivo inválido. Somente arquivos .xlsx são permitidos.',
      );
    }

    const maxSizeInBytes = 5 * 1024 * 1024; 

    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(
        'Tamanho do arquivo excede o limite permitido de 5 MB.',
      );
    }

    if (!file || !file.originalname) {
      throw new BadRequestException('Arquivo vazio ou nome inválido.');
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${extension}`;
    const uploadPath = path.join(__dirname, '../../src/uploads', filename);

    await fsPromises.writeFile(uploadPath, fileBuffer);

    const vacancies: any = await data.map(async (row: any) => {
      const vacancy = new Vacancy();

      vacancy.vacancyRole = row.vacancyRole;
      vacancy.wage = row.wage;
      vacancy.location = row.location;
      vacancy.vacancyType = row.vacancyType;
      vacancy.vacancyDescription = row.vacancyDescription;
      vacancy.level = row.level;
      vacancy.companyId = await this.companyService.findOne(row.companyId);

      return this.vacancyRepository.save(vacancy);
    });
    return vacancies;
  }
}
