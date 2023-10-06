import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user.service.mock';
import { AuthGuard } from '';
import { authGuardMock } from '../testing/auth.guard.mock';
import { createUserMock } from '../testing/create.user.mock';
import { userListMock } from '../testing/user.list.mock';
import { currentUserMock } from '../testing/current.user.mock';

describe('UsersController', () => {
  let usersController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    usersController = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create', () => {
    it('Shoud create an user', async () => {
      const result = await usersController.create(createUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('Read', () => {
    it('Should return users profile', async () => {
      const result = await usersController.getProfile(currentUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('AuthGuard application', () => {
    it('Should verify if the guards are applicated', () => {
      const guards = Reflect.getMetadata(
        '__guards__',
        usersController.getProfile,
      );

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});