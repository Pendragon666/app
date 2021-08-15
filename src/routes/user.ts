import { Router } from 'express';
import { respondToInvite } from '../controllers/user.controller';

const router = Router();

router.post('/:id', respondToInvite);

export default router;
