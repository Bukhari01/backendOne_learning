import Admin from '../models/admin.model';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import { generateToken } from '../utils/generateToken';
import { Iadmin } from '../interfaces/admin.interface';
import { Types } from 'mongoose';


export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //checking if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    //hashing the password
    const hashedPassword = await hashPassword(password);

    //creating a new admin
    const admin = await Admin.create({ name, email, password: hashedPassword }) as Iadmin;

    //response
    res.status(201).json({
      message: 'Admin registered successfully',
      admin: { _id: String((admin._id as any)), name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //finding admin by email
    const admin = await Admin.findOne({ email }) as Iadmin;
    if (!admin) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    //comparing the password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    //generating token
    const token = generateToken(
      typeof admin._id === 'string' ? admin._id : (admin._id as Types.ObjectId).toHexString(),
      admin.role
    );
    //response
    res.status(200).json({
      admin: {
        _id: typeof admin._id === 'string' ? admin._id : (admin._id as Types.ObjectId).toHexString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 