import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { CompanyModule } from '../company/company.module';
import { TecnologyModule } from '../tecnology/tecnology.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    CompanyModule,
    TecnologyModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
