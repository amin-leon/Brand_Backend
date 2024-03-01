import { Request, Response } from 'express';
import User from '../models/Users';


export default class loginController {
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
         res.status(404).json({
          status: "fail",
          message: "Account does not exist",
        });
      }

      
        if (user && (await user.comparePassword(password))) {
            res.status(201).json({
            Message: "Login successful",
            id: user._id,
            name: user.firstName,
            email: user.email,
            });
        } else {
            res.status(401).json({ message: "User not found / password incorrect" });
        }
        
    } catch (error: any) {
        console.log("Internal server error (..)")
    }
  }
}
