import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VacancyModule } from './vacancy/vacancy.module';
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
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          callback(null, `${uniqueSuffix}.${extension}`);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype.includes('xlsx')) {
          callback(null, true);
        } else {
          callback(
            new Error(
              'Tipo de arquivo inválido. Somente arquivos .xlsx são permitidos.',
            ),
            false,
          );
        }
      },
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
