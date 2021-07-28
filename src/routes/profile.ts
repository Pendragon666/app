import { Router } from 'express';
import { getProfile } from '../controllers/profile.controller';

const router = Router();

router.use('/', getProfile);

export default router;
