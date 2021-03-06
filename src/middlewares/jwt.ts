import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserToken } from '../types/User';

export class JWT {
  public static createToken(user: UserToken) {
    const token = jwt.sign(user, process.env.TOKEN_SECRET!, {
      expiresIn: '1m',
    });
    return token;
  }

  public static createRefreshToken(user: UserToken) {
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email, username: user.username, birthday: user.birthday, verified: user.verified },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: '365d',
      },
    );
    return refreshToken;
  }

  public static verifyToken(req: Request, _: Response, next: NextFunction) {
    const token = req.cookies['P-Token'];
    if (token) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (_: any, user: any) => {
        if (user) {
          //@ts-ignore
          req.user = user;
        }
      });
      return next();
    }
    return next();
  }

  public static verifySocketToken(next: any, socket: any) {
    if (socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, process.env.REFRESH_TOKEN_SECRET!, (_: any, user: any) => {
        if (user) {
          //@ts-ignore
          socket.user = user;
        }
      });
      return next();
    }
    return next(new Error('ar daqoneqtdi'));
  }

  public static checkAuth(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    if (req.user) {
      return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}
