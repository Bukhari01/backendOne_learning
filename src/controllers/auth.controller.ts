import { Response } from 'express';
import IRequest from '../interfaces/req.interface';
import User from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hashPassword';

// Change Password (requires authentication)
export const changePassword = async (req: IRequest, res: Response) => {
  try {
    console.log("req.user",req.user);
    // req.user is set by auth middleware
    const userId = req.user?._id;


  

    const { oldPassword, newPassword } = req.body;
    console.log("REQ.BODY: ", req.body)
    console.log("OLD PASSWORD: ", oldPassword)
    console.log("NEW PASSWORD: ", newPassword)
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    //finding user by id
    const user = await User.findById(userId);
    console.log("USER: ", user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //comparing old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    //hashing new password
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 