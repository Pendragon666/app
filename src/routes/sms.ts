import { Router } from 'express';
import { requestSms } from '../controllers/sms.controller';

const router = Router();

router.use('/', requestSms);

export default router;
