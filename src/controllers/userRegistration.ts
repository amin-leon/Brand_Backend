import { Response, Request } from "express";
import Users  from "../models/Users";
import bcrypt from 'bcrypt'

interface User{
    firstName: string,
    secondName: string,
    email: string,
    password: string,
    role: string
}

// User Registration
export default class UsersController {
    static async userRegistration(req: Request, res: Response){
        try {
            const { firstName, secondName, email, password, role }: User = req.body;
            const existanceOfuser = await Users.findOne({email: email});
            if(existanceOfuser){
                res.status(400).json({
                    status: "Registraction Failed",
                    message: "Email already exist !"
                })
            }

            const hashedPassword = bcrypt.hashSync(password, 10)

            // new user object
            const newuser = new Users(
                {
                    firstName,
                    secondName,
                    email,
                    password: hashedPassword,
                    role
                }
            );
            // d=save data to mongoDB
            await newuser.save();
             res.status(500).json({
                status: "Success",
                Message: "User Registration  goes Well",
                user: newuser
            })
        } catch (error) {
            console.log("Internal srver Error !");
        }
    }

    // Get all users
    static async getAllUsers(req: Request, res: Response) {
        try {
          const allusers = await Users.find().select("-password");
          if(!allusers){
            res.status(404).json({
                Message: "No User Found :)"
            })
          }
           res.status(200).json({
            status: "sucess",
            data: allusers,
          });
        } catch (error: any) {
          res.status(500).json({
            status: "error",
            message: error.message,
          });
        }
      }

          // Get all users
    static async getSingleUser(req: Request, res: Response) {
        try {
          const {id} = req.params;
          const singleUser = await Users.findOne({_id: id}).select("-password");
          if(!singleUser){
            res.status(404).json({
                Message: "No User Found :)"
            })
          }
           res.status(200).json({
            status: "sucess",
            userInfo: singleUser,
          });
        } catch (error: any) {
          res.status(500).json({
            status: "error",
            message: error.message,
          });
        }
      }

    // update a user
    static async updateUser(req: Request, res: Response) {
        try {
           const updatedInfo: User = req.body;
          const {id} = req.params;

          if(updatedInfo.password){
            updatedInfo.password = bcrypt.hashSync(updatedInfo.password, 10);
          }

          const updatedUser = await Users.findByIdAndUpdate(id, updatedInfo, {new: true});
          if(!updatedUser){
            res.status(404).json({
                Message: "No User Found :)"
            })
          }

           res.status(200).json({
            status: "sucess",
            Message: "User updated Well !",
            userInfo: updatedUser,
          });
        } catch (error: any) {
          res.status(500).json({
            status: "error",
            message: error.message,
          });
        }
      }

    static async deleteUser(req: Request, res: Response){
        try {
            const {id} = req.params;

            // check if user exist
            const existUser = await Users.findById(id);
            if(!existUser){
                res.status(404).json({
                    Message: "User not Found"
                })
            }

            // delete user
            await Users.findByIdAndDelete(id);
            res.status(200).json({
                Message: "User deleted successfully",
                deleted: existUser
            })

        } catch (error: any) {
            res.status(500).json({
                Message: error.message
            })
        }
    }

}