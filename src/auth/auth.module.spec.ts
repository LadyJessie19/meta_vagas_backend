import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Vacancy } from '../database/entities/vacancy.entity';
import { Company } from '../database/entities/company.entity';
import { Tecnology } from '../database/entities/tecnology.entity';

describe('AuthModule', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '@Henrique21',
          database: 'DB_Meta-vagas',
          entities: [User, Vacancy, Company, Tecnology],
          synchronize: true,
        }),
        UserModule,
        AuthModule,
        JwtModule.register({
          global: true,
          secret: 'my-secret-key',
          signOptions: { expiresIn: '24h' },
        }),
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });
});
