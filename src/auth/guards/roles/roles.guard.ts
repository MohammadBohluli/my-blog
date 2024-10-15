import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { UserJwt } from 'src/auth/types/user-jwt.type';
import { Role } from 'src/auth/types/user-role.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    const user = ctx.switchToHttp().getRequest().user as UserJwt;

    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    return hasRequiredRole;
  }
}
