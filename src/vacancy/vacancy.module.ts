import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { Vacancy } from '../database/entities/vacancy.entity';
import { TecnologyModule } from '../tecnology/tecnology.module';
import { UserModule } from '../user/user.module';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    UserModule,
    CompanyModule,
    TecnologyModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
