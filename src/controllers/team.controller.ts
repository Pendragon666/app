import { NextFunction, Request, Response } from 'express';
import { io, ISocket } from '../app';
import Profile from '../models/Profile';
import TeamInvites from '../models/TeamInvites';
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

      await Profile.updateOne({ uid: req.user._id }, { inTeam: true });

      return res.status(201).json({ message: 'successTeam' });
    }
    res.status(400);
    return next({ message: 'failedTeamCreate' });
  } catch (error: any) {
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

export const sendInvite = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { teamId, playerId } = req.params;
    if (teamId && playerId) {
      const team = await Teams.findOne({ _id: teamId });
      const player = await User.findOne({ _id: playerId });
      const profile = await Profile.findOne({ uid: player?.toJSON()._id });
      if (team && player && profile) {
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

          if (!player.toJSON().verified) {
            res.status(400);
            throw new Error('notVerifiedUser');
          }

          if (profile.toJSON().inTeam) {
            res.status(400);
            throw new Error('playerInTeam');
          }

          const invite = await TeamInvites.create({ teamId, user: playerId });

          io.on('connection', (socket: ISocket) => {
            if (socket.user?._id === playerId) {
              const { _id, teamImage, teamName } = team.toJSON();
              const data = JSON.stringify({ _id, teamImage, teamName, invitationId: invite.toJSON()._id });
              socket.emit('team_invitation', data);
            }
          });

          // await Teams.updateOne({ _id: teamId }, { members: [...members, playerId] });
          return res.status(200).json({});
        }
        res.status(400);
        throw new Error('teamPermission');
      }
      res.status(400);
      throw new Error('teamOrPlayerNotExist');
    }
    res.status(400);
    throw new Error('failedPlayerAdd');
  } catch (error) {
    return next(error);
  }
};
