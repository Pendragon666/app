import { Schema, model, Model } from 'mongoose';
import { MessageService } from '../types/Message';

const MessageSchema = new Schema<MessageService, Model<MessageService>, MessageService>(
  {
    value: { type: Number, required: true },
    lastRequsted: Date,
    ip: { type: String, required: true },
  },
  {
    collection: 'messages',
  },
);

const Message = model('messages', MessageSchema);

export default Message;
