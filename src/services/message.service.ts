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
      date: new Date(),
      ip,
    });
    return send.toJSON();
  }

  public static async checkNumber(number: number, _id: string) {
    const code = await Message.findOne({ _id });
    if (code?.value === number) {
      return true;
    }
    return false;
  }

  public static async setLimiter(_ip: string, _retriest: number) {
    return false;
  }
}
