import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/user-role.type';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles);
