import { logLater } from '@harukazeorg/logger';
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import User from '../models/User';
import { UserI } from '../types/User';

export const getUsers = async (_: Request, res: Response): Promise<Response> => {
  const users = await User.find();
  return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password, birthday } = req.body as UserI;
    if (username && password && birthday) {
      const hashedPassword = await hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
        birthday,
      });
      return res.status(200).json({ success: true, user });
    }
    return res.status(400).json({});
  } catch (error) {
    logLater('createUser change');
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'alreadyExists' });
    }
    return res.status(500).json(error);
    // next();
  }
};
