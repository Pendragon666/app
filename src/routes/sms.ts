import { Router } from 'express';
import { requestSms } from '../controllers/sms.controller';

const router = Router();

router.post('/', requestSms);

export default router;
