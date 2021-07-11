import { Document } from 'mongoose';

export interface UserDoc extends Document {
  _id: string;
  username: string;
  password: string;
  birthday?: Date;
  email: string;
  number: string;
  verified?: boolean;
}

export interface UserI {
  _id: string;
  username: string;
  password: string;
  birthday?: Date;
  email: string;
  number: string;
  verified?: boolean;
  code: number;
}
