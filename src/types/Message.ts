import { Document } from 'mongoose';

export interface MessageServiceDoc extends Document {
  _id?: string;
  value: number;
  lastRequsted: Date;
  ip: string;
}

export interface MessageService {
  _id?: string;
  value: number;
  lastRequsted: Date;
  ip: string;
}
