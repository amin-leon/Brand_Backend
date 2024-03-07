import { Request, Response, NextFunction } from "express";
import jwt, {Secret}  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

interface AddUserToRequest extends Request{
    user?: any;
}

export default class AuthVerify{
    static async isAuthenticated(req: AddUserToRequest, res: Response, next: NextFunction){
        try {
            const { authorization }: any = req.headers;
            if(!authorization){
                res.status(401).json({
                    Message: "Access Denied!"
                });
            }

            const token = authorization.split(" ")[1];

            if(!token) {
                res.status(401).json({
                    Message: "Unauthorized action"
                })
            }
            // Verify token
            const secretKey: Secret = process.env.SECRET_KEY as string;
            const user = jwt.verify(token, secretKey);
            req.user = user;

            next()
        } catch (error: any) {
             res.status(500).json({
                status: "Fail",
                Message: "Invalid  or Expired, Login again"
            })
        }
    }

    // ckeck role
    static async checkRole(req: AddUserToRequest, res: Response, next: NextFunction){
        try {
            const user = req.user;
            if(user.role == "Admin"){
               return next()
            }
            res.status(403).json({
                message: "Only admin can access this route"
            });
        } catch (error: any) {
                console.log(error);
        }
    }
}