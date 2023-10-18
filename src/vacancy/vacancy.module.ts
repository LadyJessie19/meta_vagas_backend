import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from '../database/entities/vacancy.entity';
import { UserModule } from 'src/user/user.module';
import { VacancyService } from './vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy]), UserModule],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
