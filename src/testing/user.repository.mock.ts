import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { userListMock } from './user.list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(userListMock[0]),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(userListMock[0]),
    findOneByOrFail: jest.fn().mockResolvedValue(userListMock[0]),
  },
};
