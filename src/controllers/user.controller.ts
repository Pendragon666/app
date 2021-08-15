import { NextFunction, Request, Response } from 'express';
import Profile from '../models/Profile';
import TeamInvites from '../models/TeamInvites';
import Teams from '../models/Teams';

export const respondToInvite = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { accept } = req.body as { accept: boolean };
    if (id) {
      const invite = await TeamInvites.findOne({ teamId: id, user: req.user._id });
      const team = await Teams.findOne({ _id: invite?.toJSON().teamId });

      if (invite && team) {
        await TeamInvites.updateOne({ _id: invite.toJSON()._id }, { responsed: true });
        if (accept) {
          await Teams.updateOne({ _id: team.toJSON()._id }, { members: [...team.toJSON().members, req.user._id] });
          await Profile.updateOne({ uid: req.user._id }, { inTeam: true });
          return res.status(200).json({ message: 'successJoin' });
        }
        return res.status(200).json({ message: 'successDecline' });
      }
      res.status(400);
      throw new Error('badRequest');
    }
    res.status(400);
    throw new Error('badRequest');
  } catch (error) {
    return next(error);
  }
};
