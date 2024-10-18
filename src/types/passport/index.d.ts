import { CurrentUser } from 'src/auth/types/current-user.type';

declare global {
  namespace Express {
    interface User extends CurrentUser {}

    interface Request {
      user?: User | undefined;
    }
  }
}
