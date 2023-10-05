import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { AuthModule } from './auth/auth.module';
import { VacancyService } from './vacancy/vacancy.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { TecnologyService } from './tecnology/tecnology.service';
import { TecnologyController } from './tecnology/tecnology.controller';
import { TecnologyModule } from './tecnology/tecnology.module';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    VacancyModule,
    UserModule,
    AuthModule,
    TecnologyModule,
    CompanyModule,
  ],
  providers: [UserService, VacancyService, TecnologyService, CompanyService],
  controllers: [UserController, TecnologyController, CompanyController],
})
export class AppModule {}
