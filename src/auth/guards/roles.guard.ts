import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../enums/user-roles.enum';
import { ROLES_KEY } from '../../decorators/role.decorators';
import { JWTDecoder } from 'src/util/jwt.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('chegou aqui no roles.guard');
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const bearerToken = context.switchToHttp().getRequest()
      .headers.authorization;
    const userToken = JWTDecoder(bearerToken);
    console.log('userToken', userToken);
    // return requiredRoles.some((role) => user.role?.includes(role));
  }
}
