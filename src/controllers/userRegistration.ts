import { Response, Request } from "express";
import Users  from "../models/Users";
import bcrypt from 'bcrypt'
import userSchema from "../validations/RegisterValidations";

interface User{
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}

// User Registration
export default class UsersController {
    static async userRegistration(req: Request, res: Response){
        try {
            const { firstName, secondName, email, password }: User = req.body;
            const existanceOfuser = await Users.findOne({email: email});
            if(existanceOfuser){
                return res.status(400).json({
                    status: "Registraction Failed",
                    Message: "Email already exist !"
                })
            }

            const { error } = userSchema.validate(req.body);
            if(error){
              return res.status(400).json({
                status: "Bad request",
                Message: "Missing Field(s)"
              })
            }

            // new user object
            const hashedPassword = bcrypt.hashSync(password, 10)
            const newuser = new Users(
                {
                    firstName,
                    secondName,
                    email,
                    password: hashedPassword,
                }
            );
            // d=save data to mongoDB
            await newuser.save();
             return res.status(201).json({
                Message: "User Registration  goes Well",
            })
        } catch (error) {
            return res.status(500).json({
              Message: "User Not Registered"
            })
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
            status: "success",
            data: allusers,
          });
        } catch (error: any) {
          res.status(500).json({
            message: "Fail to fetch users",
          });
        }
      }

    // Get single user
    static async getSingleUser(req: Request, res: Response) {
        try {
          const {id} = req.params;
          const singleUser = await Users.findOne({_id: id}).select("-password");
          if(!singleUser){
            return res.status(404).json({
                Message: "No User Found :)"
            })
          }
          return res.status(200).json({
            status: "success",
            userInfo: singleUser,
          });
        } catch (error: any) {
          return res.status(500).json({
            message: "Fail to fecth user",
          });
        }
      }

    // update a user
    static async updateUser(req: Request, res: Response) {
        try {
           const updatedInfo: User = req.body;
          const {id} = req.params;

          const existanceOfuser = await Users.findOne({id: id});
          if(!existanceOfuser){
              return res.status(404).json({
                  Message: "User not found !"
              })
          }

          if(updatedInfo.password){
            updatedInfo.password = bcrypt.hashSync(updatedInfo.password, 10);
          }

          const { error } = userSchema.validate(req.body);
          if(error){
            return res.status(400).json({
              status: "Bad request",
              Message: error.details[0].message
            })
          }
          
          const updatedUser = await Users.findByIdAndUpdate(id, updatedInfo, {new: true});
          if(!updatedUser){
            return res.status(404).json({
                Message: "No User Found :)"
            })
          }

          return res.status(200).json({
            status: "sucess",
            Message: "User updated Well !",
            userInfo: updatedUser,
          });
        } catch (error: any) {
          return res.status(500).json({
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
                return res.status(404).json({
                    Message: "User not Found"
                })
            }

            // delete user
            await Users.findByIdAndDelete(id);
            return res.status(200).json({
                Message: "User deleted successfully",
                deleted: existUser
            })

        } catch (error: any) {
          return res.status(500).json({
                Message: "Fail to delete user"
            })
        }
    }

}