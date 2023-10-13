import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { UnauthorizedException } from '@nestjs/common';
config();

export const JWTDecoder = (bearerToken) => {
  const [, token] = bearerToken?.split(' ') ?? [];

  if (token) {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: JWT error');
    }
  }
};
