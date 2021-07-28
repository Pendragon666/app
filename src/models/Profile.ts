import { Schema, model, Model } from 'mongoose';
import { ProfileI } from '../types/Profile';

const ProfileSchema = new Schema<ProfileI, Model<ProfileI>, ProfileI>(
  {
    description: { type: String },
    fullName: { type: String, required: true },
    leagueName: { type: String },
    profileImage: { type: String },
    uid: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
  },
  {
    collection: 'profiles',
  },
);

const Profile = model('profiles', ProfileSchema);

export default Profile;
