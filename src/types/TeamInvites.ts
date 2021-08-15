import { Document } from 'mongoose';

export interface TeamInvitesDoc extends Document {
  expires: any;
  user: any;
  teamId: any;
  responded: boolean;
  _id: any;
}

export interface TeamInvitesI {
  expires: any;
  user: any;
  teamId: any;
  responsed: boolean;
  _id: any;
}
