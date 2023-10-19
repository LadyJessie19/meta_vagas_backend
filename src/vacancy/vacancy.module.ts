import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { Vacancy } from '../database/entities/vacancy.entity';
import { TecnologyModule } from '../tecnology/tecnology.module';
import { UserModule } from '../user/user.module';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { CompanyService } from '../company/company.service';
import { TecnologyService } from '../tecnology/tecnology.service';
import { CompanyRepository } from '../company/company.repository';
import { TecnologyRepository } from 'src/tecnology/tecnology.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    UserModule,
    CompanyModule,
    TecnologyModule,
  ],
  controllers: [VacancyController],
  providers: [
    VacancyService,
    CompanyService,
    TecnologyService,
    CompanyRepository,
    TecnologyRepository,
  ],
})
export class VacancyModule {}
