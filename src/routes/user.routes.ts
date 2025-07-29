import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller';

const router = Router();

//registration user route
router.post('/register', registerUser);

//login user route
router.post('/login', loginUser);

export default router; 