import { Router } from 'express';
import { changePassword } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Change password route (protected)
router.post('/change-password', authMiddleware, changePassword);

export default router; 