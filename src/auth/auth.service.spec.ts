import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtServiceMock } from '../testing/jwt.service.mock';
import { userServiceMock } from '../testing/user.service.mock';
import { signInUserMock } from '../testing/signIn-user.mock';
import { accessToken } from '../testing/acess-token.mock';
import * as bcrypt from 'bcrypt'
import { userCreatedMock } from '../testing/user.created.mock';
import { UserFoundMock } from '../testing/user-found.mock';

describe('AuthService', () => {
  let authService: AuthService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtServiceMock, userServiceMock ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe("login", () => {
    it("Should return a token.", async() => {

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)

      const result = await authService.login(signInUserMock)

      expect(result).toEqual({access_token: accessToken})

    })
  })

  describe("register", () => {
    it("should create a new user", async() => {

      const result = await authService.register(UserFoundMock)
      
      expect(result).toEqual(userCreatedMock);
    })
  })
});
