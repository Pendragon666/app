import { NextFunction, Request, Response } from 'express';
import MessageService from '../services/message.service';

interface SMS {
  number: string;
}

export const requestSms = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const checkLimit = await MessageService.setLimiter(req.ip, 5);

    if (checkLimit) {
      const { number } = req.body as SMS;
      const code = MessageService.generateNumber();
      const { _id } = await MessageService.saveNumber(code, req.ip);

      MessageService.message.messages.create({
        body: `Code: ${code}`,
        from: 'Pendragon',
        to: `+995${number}`,
      });

      return res.status(200).json({ success: true, sent: true, _id });
    }
    res.status(400);
    return next({ message: 'manyMessage' });
  } catch (error) {
    res.status(500);
    return next({ message: 'wentWrong' });
  }
};
