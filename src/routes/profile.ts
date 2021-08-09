import { Router } from 'express';
import { getProfile } from '../controllers/profile.controller';

const router = Router();

router.use('/:uid', getProfile);

export default router;
