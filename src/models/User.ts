import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: Boolean,
    birthday: Date,
  },
  {
    collection: 'users',
  },
);

const User = model('users', UserSchema);

export default User;
