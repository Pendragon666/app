import { NextFunction, Response, Request } from 'express';
import Profile from '../models/Profile';

interface ProfileI {
  fullName: string;
  region: string;
  description: string;
  leagueName: string;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const profile = await Profile.findOne({ uid: req.params.uid });
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};

export const createProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { fullName, region, description = '', leagueName } = req.body as ProfileI;
    if (fullName && region && leagueName) {
      await Profile.create({ fullName, region, description, leagueName, uid: req.user._id });
      return res.status(200).json({ success: true, message: 'Profile Created' });
    }
    res.status(400);
    throw new Error('badRequest');
  } catch (error) {
    return next(error);
  }
};
