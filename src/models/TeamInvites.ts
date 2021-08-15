import { Schema, model, Model } from 'mongoose';
import { TeamInvitesI } from '../types/TeamInvites';

const TeamInvitesSchema = new Schema<TeamInvitesI, Model<TeamInvitesI>, TeamInvitesI>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: 'teams', required: true },
    expires: { type: Date, default: new Date() },
    responsed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    collection: 'team_invites',
  },
);

const TeamInvites = model('team_invites', TeamInvitesSchema);

export default TeamInvites;
