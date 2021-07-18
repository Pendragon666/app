import { Document } from 'mongoose';

export interface ProfileDoc extends Document {
  uid: any;
  fullName: string;
  profileImage: string;
  description: string;
  leagueName: string;
  _id?: string;
}

export interface ProfileI {
  uid: any;
  fullName: string;
  profileImage: string;
  description: string;
  leagueName: string;
  _id?: string;
}
