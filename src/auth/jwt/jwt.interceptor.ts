import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Chegou no interceptor');
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    const [, token] = bearerToken?.split(' ') ?? [];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        request.user = user;
      } catch (error) {
        throw new UnauthorizedException('Unauthorized: JWT error');
      }
    }

    return next.handle();
  }
}
