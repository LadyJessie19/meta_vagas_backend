import { UserService } from '../user/user.service';
import { userFoundByMailMock } from './user.found.by.mail.mock';
import { userListMock } from './user.list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockReturnValue(userListMock[0]),
    findById: jest.fn().mockResolvedValue(userListMock[0]),
    findUserByEmail: jest.fn().mockResolvedValue(userFoundByMailMock),
    update: jest.fn().mockResolvedValue(userListMock[0]),
    restore: jest.fn().mockResolvedValue(userListMock[0]),
    remove: jest.fn().mockResolvedValue(userListMock[0]),
  },
};