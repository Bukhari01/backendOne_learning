import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller';

const router = Router();

//registration user route
router.post('/register', registerUser);

//login user route
router.post('/login', loginUser);

//logout user route
router.post('/logout', logoutUser);

export default router; 