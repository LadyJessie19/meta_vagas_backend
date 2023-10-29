import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { PostVacancyDto } from './dto/post-vacancy.dto';

type VacancyTecnologyQuantity = {
  name: string;
  vacancies: number;
};
@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    private userService: UserService,
    private tecService: TecnologyService,
    private companyService: CompanyService,
  ) {}

  async createVacancy(vacancy: PostVacancyDto) {
    try {
      const tecnologies = await this.tecService.findAll();
      const company = await this.companyService.findOne(+vacancy.companyId);
      const user = await this.userService.findUserByEmail(
        vacancy.advertiserEmail,
      );

      const newVacancy = this.vacancyRepository.create({
        ...vacancy,
        advertiserId: user,
        companyId: company,
        tecnologies: [],
      });

      for (let i = 0; i < vacancy.tecnologies.length; i++) {
        for (let j = 0; j < tecnologies.length; j++) {
          if (
            vacancy.tecnologies[i].toString().trim().toLocaleLowerCase() ===
            tecnologies[j].tecName.trim().toLowerCase()
          ) {
            newVacancy.tecnologies.push(tecnologies[j]);
          }
        }
      }

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
      let vacancies: Array<Vacancy>;
      if (tech !== '') {
        vacancies = await this.vacancyRepository
          .createQueryBuilder('vacancy')
          .leftJoinAndSelect('vacancy.tecnologies', 'Tecnology')
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
              qb.where('vacancy.vacancyDescription ILIKE :description', {
                description: `%${description?.trim()}%`,
              }).andWhere('vacancy.vacancyRole ILIKE :role', {
                role: `%${role?.trim()}%`,
              });
            }),
          )
          .andWhere('"Tecnology"."tecName" ILIKE :tech', { tech })
          .skip((page - 1) * limit)
          .take(limit)
          .getMany();
      } else {
        vacancies = await this.vacancyRepository
          .createQueryBuilder('vacancy')
          .leftJoinAndSelect('vacancy.tecnologies', 'Tecnology')
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
              qb.where('vacancy.vacancyDescription ILIKE :description', {
                description: `%${description?.trim()}%`,
              }).andWhere('vacancy.vacancyRole ILIKE :role', {
                role: `%${role?.trim()}%`,
              });
            }),
          )
          .skip((page - 1) * limit)
          .take(limit)
          .getMany();
      }
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

  async getQuantitiesByTecnologies(): Promise<VacancyTecnologyQuantity[]> {
    const qb = this.vacancyRepository.createQueryBuilder('vacancy');
    qb.select('tecnology.tecName');
    qb.innerJoin('tecnologies_vacancies', 'vt', 'vt.vacanciesId = vacancy.id');
    qb.innerJoin('tecnologies', 'tecnology', 'tecnology.id = vt.tecnologiesId');
    qb.groupBy('tecnology.tecName');
    qb.addSelect('COUNT(*) AS value');

    const results = await qb.getRawMany();

    const quantitiesByTecnologies = results.map((result) => ({
      name: result.tecnology_tecName,
      vacancies: +result.value,
    }));

    return quantitiesByTecnologies;
  }
}
