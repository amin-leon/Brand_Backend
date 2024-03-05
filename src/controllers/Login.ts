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
          status: "fail",
          message: "Account does not exist",
        });
      }

        if (user && (await user.comparePassword(password))) {
          // generate token
          // const userForToken = user.toJSON()
          const secetKey: Secret = process.env.SECRET_KEY as string;
          const token = jwt.sign(user.toJSON(), secetKey , {expiresIn: '1d'})
            return res.status(201).json({
            Message: "Login successful",
            token
            });
        } else {
           return  res.status(401).json({ message: "Password incorrect :)" });
        }
        
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
          status: "Bad request",
          Message: "Fail to login"
        })
    }
  }
}
