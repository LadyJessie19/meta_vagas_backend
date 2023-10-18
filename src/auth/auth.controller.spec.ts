import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authServiceMock } from "../testing/auth.service.mock"
import { signInUserMock } from '../testing/signIn-user.mock';
import { userCreatedMock } from '../testing/user.created.mock';
import { AuthService } from './auth.service';
import { accessToken } from '../testing/acess-token.mock';
import { UserFoundMock } from '../testing/user-found.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();

  });

  describe("Login", () => {
    it("should login an existing user", async () => {

      const result = await authController.login(signInUserMock);

      expect(result).toEqual(accessToken);
    })
  });


  describe("register", () => {
    it("should create a new user", async() => {

      const result = await authController.register(UserFoundMock)

      expect(result).toEqual(userCreatedMock);
    })
  })
});
