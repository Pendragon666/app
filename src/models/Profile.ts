import { Schema, model, Model } from 'mongoose';
import { ProfileI } from '../types/Profile';

const ProfileSchema = new Schema<ProfileI, Model<ProfileI>, ProfileI>(
  {
    description: { type: String },
    fullName: { type: String, required: true },
    leagueName: { type: String, required: true, unique: true },
    profileImage: { type: String },
    inTeam: { type: Boolean, default: false },
    region: {
      type: String,
      enum: ['EUNE', 'EUW', 'RU', 'TR', 'BR', 'LAN', 'LAS', 'NA', 'OCE', 'JP', 'KR'],
      required: true,
    },
    uid: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  },
  {
    collection: 'profiles',
  },
);

const Profile = model('profiles', ProfileSchema);

export default Profile;
