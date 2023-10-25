import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { JwtServiceMock } from '../testing/jwt.service.mock';
import { userServiceMock } from '../testing/user.service.mock';
import { signInUserMock } from '../testing/signIn-user.mock';
import { token } from '../testing/acess-token.mock';
import { userFoundByMailMock } from '../testing/user.found.by.mail.mock';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { userListMock } from '../testing/user.list.mock';

describe('AuthService', () => {
  let userService: UserService;
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtServiceMock,
        userServiceMock,
        userRepositoryMock,
        UserService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      const result = await authService.register(userFoundByMailMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('login', () => {
    it('Should return a token.', async () => {
      const bcryptSpy = jest.spyOn(bcrypt, 'compare');
      bcryptSpy.mockResolvedValue(true as never);

      const result = await authService.login(signInUserMock);

      expect(result).toEqual({
        data: {
          email: userFoundByMailMock.email,
          isActive: userFoundByMailMock.isActive,
        },
        token,
      });
    });
  });
});