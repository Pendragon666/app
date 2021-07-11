import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../controllers/auth.controller';

const router = Router();

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;
