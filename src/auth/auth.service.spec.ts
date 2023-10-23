import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { JwtServiceMock } from '../testing/jwt.service.mock';
import { userServiceMock } from '../testing/user.service.mock';
import { signInUserMock } from '../testing/signIn-user.mock';
import { token } from '../testing/acess-token.mock';
import { userFoundByMailMock } from '../testing/user.found.by.mail.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtServiceMock, userServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  // describe('register', () => {
  //   it('should create a new user', async () => {
  //     const result = await authService.register(userFoundByMailMock);

  //     expect(result).toEqual(userCreatedMock);
  //   });
  // });

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
