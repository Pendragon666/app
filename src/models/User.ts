import { Schema, model, Model } from 'mongoose';
import { UserI } from '../types/User';

const UserSchema = new Schema<UserI, Model<UserI>, UserI>(
  {
    username: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: Boolean,
    birthday: Date,
    national_id: { type: String, required: true, unique: true },
  },
  {
    collection: 'users',
  },
);

const User = model('users', UserSchema);

export default User;
