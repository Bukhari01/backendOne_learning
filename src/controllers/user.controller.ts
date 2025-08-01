import User from '../models/user.model';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import { generateToken } from '../utils/generateToken';
import { Iuser } from '../interfaces/user.interface';
import { Types } from 'mongoose';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    //checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    //hasing the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword }) as Iuser;

    //response
    res.status(201).json({
      message: 'User registered successfully',
      user: { _id: String((user._id as any)), name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //finding user
    const user = await User.findOne({ email }) as Iuser;

    if (!user) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    //comparing password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid details' });
    }
    //generating token
    const token = generateToken(
      typeof user._id === 'string' ? user._id : (user._id as Types.ObjectId).toHexString(),
      user.role
    );
    
    //response
    res.status(200).json({
      user: {
        _id: typeof user._id === 'string' ? user._id : (user._id as Types.ObjectId).toHexString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 

// User Logout
export const logoutUser = async (req: Request, res: Response) => {
  //(stateless logout)
  res.status(200).json({ message: 'User logged out successfully. Please remove the token from your client.' });
}; 