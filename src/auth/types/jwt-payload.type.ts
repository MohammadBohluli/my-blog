import { Role } from '@prisma/client';

export type AuthJwtPayload = {
  userId: number;
  role: Role;
};
