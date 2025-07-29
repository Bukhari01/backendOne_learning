import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/auth.controller';

const router = Router();

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password', resetPassword);

export default router; 