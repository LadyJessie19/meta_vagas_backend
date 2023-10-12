import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { userListMock } from '../testing/user.list.mock';
import { createUserMock } from '../testing/user.create.mock';
import { userFoundByMailMock } from '../testing/user.found.by.mail.mock';
import { User } from '../database/entities/user.entity';
import { userServiceMock } from '../testing/user.service.mock';

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
      const createdUser = await userServiceMock.useValue.create(createUserMock);

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

    describe('Create', () => {
      it('Should create an user', async () => {
        const createUserDto = {
          name: 'Caio',
          email: 'teste1@gmail.com',
          password: '12345',
        };

        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

        const createSpy = jest.spyOn(userRepository, 'create');
        const saveSpy = jest.spyOn(userRepository, 'save');

        const newUser = await userService.create(createUserDto);

        expect(newUser).toBeDefined();
        expect(newUser.name).toEqual(createUserDto.name);
        expect(newUser.email).toEqual(createUserDto.email);

        expect(createSpy).toHaveBeenCalledWith(createUserDto);
        expect(saveSpy).toHaveBeenCalledWith(newUser);
      });
    });

    it('Should throw a BadRequestException if the user already exists', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'existing@example.com',
        password: '12345',
      };

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userFoundByMailMock as User);

      try {
        await userService.create(createUserDto);
        fail('Expected BadRequestException');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('Should remove an existing user', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      const createdUser = await userService.create(createUserMock);

      const removalResult = await userService.remove(createdUser.id);

      expect(removalResult).toEqual(
        `This action removes a #${createdUser.id} user`,
      );
    });

    it('Should restore a previously removed user', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      const createdUser = await userService.create(createUserMock);
      await userService.remove(createdUser.id);

      const restorationResult = await userService.restore(createdUser.id);

      expect(restorationResult).toEqual(
        `This action restores a #${createdUser.id} user`,
      );
    });
  });
});
