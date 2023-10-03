import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';

@Module({
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
