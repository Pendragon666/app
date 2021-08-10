import { Router } from 'express';
import { createProfile, getProfile } from '../controllers/profile.controller';

const router = Router();

router.get('/:uid', getProfile);
router.post('/', createProfile);

export default router;
