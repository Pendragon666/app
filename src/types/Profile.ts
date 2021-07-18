import { Document } from 'mongoose';

export interface ProfileDoc extends Document {}

export interface ProfileI {
  _id?: string;
  value: number;
  lastRequested: Date;
  ip: string;
}
