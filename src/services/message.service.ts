import Twilio from 'twilio';
import Message from '../models/Message';

export default class MessageService {
  public static message = Twilio(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN);

  public static generateNumber() {
    const number = Math.floor(Math.random() * 90000) + 10000;
    return number;
  }

  public static async saveNumber(number: number, ip: string) {
    const send = await Message.create({
      value: number,
      lastRequested: new Date(),
      ip,
    });
    return send.toJSON();
  }

  public static async checkNumber(number: number, _id: string) {
    const code = await Message.findOne({ _id });
    if (code?.toJSON().value === number) {
      return true;
    }
    return false;
  }

  public static async setLimiter(ip: string, retries: number): Promise<boolean> {
    const messages = await Message.find({ ip }).sort('-lastRequested').limit(retries);
    if (messages.length === retries) {
      if (new Date(messages[retries - 1].toJSON().lastRequested.getTime() + 2 * 60000) < new Date()) {
        return false;
      }
      return true;
    }
    return true;
  }
}
