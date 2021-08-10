import { UserI, UserToken } from '../../types/User';

declare global {
  namespace Express {
    interface Request {
      user: UserToken;
    }
  }
}
