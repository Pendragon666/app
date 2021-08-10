import { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import User from '../models/User';
import { UserI } from '../types/User';
import { saltRounds } from '../constants';
import { JWT } from '../middlewares/jwt';
import MessageService from '../services/message.service';
// import EmailService from '../services/email.service';

export const getUsers = async (_: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { username, password, birthday, email, number, code, _id, national_id } = req.body as UserI;
    if (username && password && birthday && email && number && code && national_id) {
      if (MessageService.checkNumber(code, _id)) {
        const hashedPassword = await hash(password, saltRounds);
        const user = await User.create({
          username,
          password: hashedPassword,
          birthday,
          email,
          number,
          national_id,
        });

        // await EmailService.registerMail(email, username);

        const token = JWT.createRefreshToken(user.toJSON());
        res.cookie('P-Token', token, { maxAge: 60 * 60 * 24 * 7 * 1000 });

        return res.status(200).json({ success: true, token });
      }
      res.status(400);
      return next({ message: 'badRequest' });
    }
    res.status(400);
    return next({ message: 'badRequest' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next({ ...error, message: 'alreadyExists' });
    }
    return next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { email, password } = req.body as UserI;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user) {
        const access = await compare(password, user.password);

        if (access) {
          const token = JWT.createRefreshToken(user.toJSON());
          res.cookie('P-Token', token, { maxAge: 60 * 60 * 24 * 7 * 1000 });
          return res.status(200).json({ success: true, token });
        }
        res.status(400);
        return next({ message: 'badLogin' });
      }
      res.status(400);
      return next({ message: 'badLogin' });
    }
    res.status(400);
    return next({ message: 'badLogin' });
  } catch (error) {
    res.status(500);
    return next({ message: 'wentWrong' });
  }
};
