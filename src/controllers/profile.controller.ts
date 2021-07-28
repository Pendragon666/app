import { NextFunction, Response, Request } from 'express';
import Profile from '../models/Profile';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const profile = await Profile.findOne({ uid: req.user });
    if (profile) {
      return res.status(200).json(profile);
    }
    res.status(400);
    return next({ message: 'profileNotCreated', initial: true });
  } catch (error) {
    return next(error);
  }
};
