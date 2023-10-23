import { AuthService } from '../auth/auth.service';
import { userCreatedMock } from './user.created.mock';
import { token } from './acess-token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    register: jest.fn().mockResolvedValue(userCreatedMock),
    login: jest.fn().mockResolvedValue(token),
  },
};
