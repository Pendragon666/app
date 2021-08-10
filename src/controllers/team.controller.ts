import { NextFunction, Request, Response } from 'express';
import Teams from '../models/Teams';
import User from '../models/User';

interface TeamI {
  description?: string;
  teamTag: string;
  teamName: string;
  teamImage: string;
}

export const getTeams = async (_: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const team = await Teams.findOne();
    const users = await User.find({
      _id: {
        $in: team?.toJSON().members,
      },
    });
    const members = users.map((u) => ({
      username: u.toJSON().username,
      _id: u.toJSON()._id,
    }));
    return res.status(200).json({ ...team?.toJSON(), members });
  } catch (error) {
    return next(error);
  }
};

export const getTeam = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const team = await Teams.findOne({ _id: req.params.id });
    if (team) {
      const users = await User.find({
        _id: {
          $in: team?.toJSON().members,
        },
      });
      const members = users.map((u) => ({
        username: u.toJSON().username,
        _id: u.toJSON()._id,
      }));
      return res.status(200).json({ ...team?.toJSON(), members });
    }
    res.status(400);
    throw new Error('teamNotExists');
  } catch (error) {
    return next(error);
  }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { teamImage, teamName, teamTag, description = '' } = req.body as TeamI;
    if (teamImage && teamName && teamTag) {
      await Teams.create({
        members: [req.user._id],
        teamImage,
        teamName,
        teamTag,
        description,
        owner: req.user._id,
      });

      return res.status(201).json({ message: 'successTeam' });
    }
    res.status(400);
    return next({ message: 'failedTeamCreate' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next({ ...error, message: 'alreadyExists' });
    }
    return next(error);
  }
};

export const addPlayerToTeam = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { teamId, playerId } = req.params;
    if (teamId && playerId) {
      const team = await Teams.findOne({ _id: teamId });
      const player = await User.findOne({ _id: playerId });
      if (team && player) {
        if (team.toJSON().owner.toString() === req.user._id) {
          const members = team.toJSON().members.map((m: string) => m.toString());
          if (members.length === 5) {
            res.status(400);
            throw new Error('maxPlayers');
          }

          if (members.includes(playerId)) {
            res.status(400);
            throw new Error('playerExists');
          }

          await Teams.updateOne({ _id: teamId }, { members: [...members, playerId] });
          return res.status(200).json(team);
        }
        res.status(400);
        throw new Error('teamPermission');
      }
      res.status(400);
      return next({ message: 'teamOrPlayerNotExist' });
    }
    res.status(400);
    return next({ message: 'failedPlayerAdd' });
  } catch (error) {
    return next(error);
  }
};

export const removeTeam = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const team = await Teams.findOne({ _id: req.params.id });
    if (team) {
      if (team.toJSON().owner.toString() === req.user._id) {
        await Teams.deleteOne({ _id: req.params.id });
        return res.status(200).json({ success: true, message: 'successDelete' });
      }
      res.status(400);
      throw new Error('teamPermission');
    }
    res.status(400);
    throw new Error('teamNotExist');
  } catch (error) {
    return next(error);
  }
};

export const removePlayerFromTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { teamId, playerId } = req.params;
    if (teamId && playerId) {
      const team = await Teams.findOne({ _id: teamId });
      const player = await User.findOne({ _id: playerId });
      if (team && player) {
        if (team.toJSON().owner.toString().toString() === req.user._id) {
          const members = team.toJSON().members.map((m: string) => m.toString());
          if (!members.includes(playerId)) {
            res.status(400);
            throw new Error('playerNotExistsInTeam');
          }

          const newMembers = members.filter((n: string) => n !== playerId);

          await Teams.updateOne({ _id: teamId }, { members: [...newMembers] });
          return res.status(200).json(team);
        }
        res.status(400);
        throw new Error('teamPermission');
      }
      res.status(400);
      return next({ message: 'teamOrPlayerNotExist' });
    }
    res.status(400);
    return next({ message: 'failedPlayerAdd' });
  } catch (error) {
    return next(error);
  }
};
