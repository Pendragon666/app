import { Schema, model, Model } from 'mongoose';
import { TeamsI } from '../types/Teams';

const TeamsSchema = new Schema<TeamsI, Model<TeamsI>, TeamsI>(
  {
    description: { type: String },
    members: { type: [Schema.Types.ObjectId], default: [], required: true },
    teamTag: { type: String, required: true },
    teamName: { type: String, required: true, unique: true },
    teamImage: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  },
  {
    collection: 'teams',
  },
);

const Profile = model('teams', TeamsSchema);

export default Profile;
