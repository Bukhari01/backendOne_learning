import { Request, Response } from 'express';
import User from '../models/user.model';
import { hashPassword } from '../utils/hashPassword';
import jwt from 'jsonwebtoken';

// In-memory store for reset tokens (for demonstration; use DB or cache in production)
const resetTokens: { [email: string]: string } = {};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Generate a reset token (JWT with short expiry)
    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    // Store the token (in-memory for demo)
    resetTokens[email] = resetToken;
    // Stub: Send email (in real app, send resetToken via email)
    // sendEmail(email, `Reset your password: ${resetToken}`);
    res.status(200).json({ message: 'Password reset link sent to email (stub)', resetToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, resetToken } = req.body;
    // Validate token
    if (!resetTokens[email] || resetTokens[email] !== resetToken) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    // Verify JWT
    try {
      jwt.verify(resetToken, process.env.JWT_SECRET as string);
    } catch {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    // Update user password
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Remove used token
    delete resetTokens[email];
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 