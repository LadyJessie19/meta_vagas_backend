import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../database/entities/user.entity';
import { Vacancy } from '../database/entities/vacancy.entity';
import { Company } from '../database/entities/company.entity';
import { Tecnology } from '../database/entities/tecnology.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('UserModule', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });
});
