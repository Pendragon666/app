import { UserI } from '../../types/User';

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}
