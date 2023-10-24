import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TecnologyModule } from './tecnology/tecnology.module';
import { CompanyModule } from './company/company.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

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
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '');
        res.header(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS',
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
