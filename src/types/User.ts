import { Document } from 'mongoose';

export interface UserDoc extends Document {
  _id: string;
  username: string;
  password: string;
  birthday?: Date;
  email: string;
  number: string;
  verified?: boolean;
  national_id: string;
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
  national_id: string;
}

export interface UserToken {
  _id: string;
  username: string;
  email: string;
  number: string;
  verified?: boolean;
  birthday?: Date;
}
