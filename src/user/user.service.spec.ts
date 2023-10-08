import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { userListMock } from '../testing/user.list.mock';
import { createUserMock } from '../testing/user.create.mock';
import { userFoundByMailMock } from '../testing/user.found.by.mail.mock';
import { User } from '../database/entities/user.entity';

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an user', async () => {
      const result = await userService.create(createUserMock);

      expect(result).toEqual(userListMock[0]);
    });
  });

  describe('Read', () => {
    it('Should return an user by id', async () => {
      const result = await userService.findById(1);

      expect(result).toEqual(userListMock[0]);
    });

    it('Should return an user by email', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userFoundByMailMock as User);

      const result = await userService.findUserByEmail('teste1@gmail.com');

      expect(result).toEqual(userFoundByMailMock);
    });
  });

  describe('Update and Delete', () => {
    it('Should update an existing user', async () => {
      const createdUser = await userService.create(createUserMock);

      const updateUserDto = {
        name: 'Updated Name',
        email: 'updated.email@example.com',
      };

      const updatedUser = await userService.update(
        createdUser.id,
        updateUserDto,
      );

      expect(updatedUser.name).toEqual(updateUserDto.name);
      expect(updatedUser.email).toEqual(updateUserDto.email);
    });

    it('Should remove an existing user', async () => {
      const createdUser = await userService.create(createUserMock);

      const removalResult = await userService.remove(createdUser.id);

      expect(removalResult).toStrictEqual(
        `This action removes a #${createdUser.id} user`,
      );

      const userAfterRemoval = await userRepository.findOne(createUserMock.email);
      expect(userAfterRemoval.isActive).toBeFalsy();
    });

    it('Should restore a previously removed user', async () => {
      const createdUser = await userService.create(createUserMock);
      await userService.remove(createdUser.id);

      const restorationResult = await userService.restore(createdUser.id);

      expect(restorationResult).toEqual(
        `This action restores a #${createdUser.id} user`,
      );

      const userAfterRestoration = await userRepository.findOne(createdUser.email);
      expect(userAfterRestoration.isActive).toBeTruthy();
    });
  });
});
