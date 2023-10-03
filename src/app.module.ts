import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { TecnologyModule } from './tecnology/tecnology.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsersModule, VacancyModule, CompanyModule, TecnologyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
