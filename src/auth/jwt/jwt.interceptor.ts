import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    const [, token] = bearerToken?.split(' ') ?? [];

    if (token) {
      try {
        const user = jwt.verify(token, 'senha_secreta');
        request.user = user;
      } catch (error) {
        throw new NotFoundException('User not found | JWT error');
      }
    }

    return next.handle();
  }
}
