import { Router } from 'express';
import { createUser, getUsers } from '../controllers/auth.controller';

const router = Router();

router.get('/', getUsers);
router.post('/register', createUser);

export default router;
