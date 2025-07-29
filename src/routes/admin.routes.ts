import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin.controller';

const router = Router();

//registration admin route
router.post('/register', registerAdmin);

//login admin route
router.post('/login', loginAdmin);

export default router; 