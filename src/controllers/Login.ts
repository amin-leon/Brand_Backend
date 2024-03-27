import { Request, Response } from 'express';
import User from '../models/Users';
import jwt, {Secret}  from "jsonwebtoken";


export default class loginController {
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({
          status: "Fail",
          Message: "Account does not exist",
        });
      }

        if (user && (await user.comparePassword(password))) {
          // generate token
          const secetKey: Secret = process.env.SECRET_KEY as string;
          const token = jwt.sign(user.toJSON(), secetKey , {expiresIn: '7d'})
          return res.status(200).json({
            Message: "Login successful",
            user,
            token
            });
        } else {
           return  res.status(401).json({ message: "Password incorrect :)" });
        }
        
    } catch (error: any) {
        return res.status(500).json({
          status: "Bad request",
          Message: "Fail to login"
        })
    }
  }
}
