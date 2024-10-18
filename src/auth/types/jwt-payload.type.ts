import { Role } from '@prisma/client';

export interface AuthJwtPayload {
  userId: number;
  role: Role;
}
