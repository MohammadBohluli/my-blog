import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: [Role, ...Role[]]) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
    SetMetadata(ROLES_KEY, roles),
  );
};
