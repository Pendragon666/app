import { Document } from 'mongoose';

export interface TeamsDoc extends Document {
  description: string;
  members: any;
  teamTag: string;
  teamName: string;
  teamImage: string;
  owner: any;
  _id: any;
}

export interface TeamsI {
  description: string;
  members: any;
  teamTag: string;
  teamName: string;
  teamImage: string;
  owner: any;
  _id: any;
}
