import { JwtService } from '@nestjs/jwt';
import { token } from './acess-token.mock';

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(token),
  },
};
