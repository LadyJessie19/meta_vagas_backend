import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user.service.mock';
import { RolesGuard } from '../auth/guards/roles.guard';
import { authGuardMock } from '../testing/auth.guard.mock';
import { createUserMock } from '../testing/user.create.mock';
import { userListMock } from '../testing/user.list.mock';
import { currentUserMock } from '../testing/user.current.mock';
import { updateUserMock } from '../testing/user.update.mock';
import { AuthGuard } from '../auth/guards/auth.guards';

describe('UsersController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(RolesGuard)
      .useValue(RolesGuard)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Create', () => {
    it('Shoud create an user', async () => {
      const result = await userController.create(createUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('update', () => {
    it('Should update a user', async () => {
      const userId = '1';
      const result = await userController.update(userId, updateUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('remove', () => {
    it('Should soft-delete a user', async () => {
      const userId = '1';

      userServiceMock.useValue.remove.mockResolvedValue({
        message: 'User soft-deleted successfully',
      });

      const result = await userController.remove(userId);

      expect(result).toEqual({
        message: 'User soft-deleted successfully',
      });
    });
  });

  describe('restore', () => {
    it('Should restore a soft-deleted user', async () => {
      const userId = '1'; 

      userServiceMock.useValue.restore.mockResolvedValue({
        message: 'User restored successfully',
      });

      const result = await userController.restore(userId);

      expect(result).toEqual({
        message: 'User restored successfully',
      });
    });
  });

  describe('Read', () => {
    it('Should return users profile', async () => {
      const result = await userController.getProfile(currentUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('AuthGuard application', () => {
    it('Should verify if the guards are applicated', () => {
      const guards = Reflect.getMetadata(
        '__guards__',
        userController.getProfile,
      );

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});
