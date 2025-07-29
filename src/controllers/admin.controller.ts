import Admin from '../models/admin.model';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import { generateToken } from '../utils/generateToken';
import { Iadmin } from '../interfaces/admin.interface';

// Admin Registration
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create new admin
    const admin = await Admin.create({ name, email, password: hashedPassword }) as Iadmin;
    // Respond with admin info (no token)
    res.status(201).json({
      message: 'Admin registered successfully',
      admin: { _id: String((admin.id as any)), name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find admin by email
    const admin = await Admin.findOne({ email }) as Iadmin;
    if (!admin) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    // Compare password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    // Generate JWT token
    const token = generateToken(admin.id.toString(), admin.role);
    // Respond with admin info and token
    res.status(200).json({
      admin: { _id: String((admin.id as any)), name: admin.name, email: admin.email, role: admin.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 