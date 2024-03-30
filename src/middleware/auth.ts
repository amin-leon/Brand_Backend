import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

interface AddUserToRequest extends Request {
    user?: any;
}

export default class AuthVerify {
    static async isAuthenticated(req: AddUserToRequest, res: Response, next: NextFunction) {
        try {
            const { authorization }: any = req.headers;
            if (!authorization) {
                return res.status(401).json({
                    Message: "No token provided in header"
                });
            }

            const token = authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({
                    Message: "Unauthorized action"
                });
            }

            // Verify token
            const secretKey: Secret = process.env.SECRET_KEY as Secret;
            const user = jwt.verify(token, secretKey) as any;
            req.user = user;
            
            // Call next middleware
            return next();
        } catch (error: any) {
            return res.status(500).json({
                status: "Fail",
                Message: "Invalid or expired token, login again"
            });
        }
    }

    static async checkRole(req: AddUserToRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (user.role === "admin") {
                return next();
            }
            return res.status(403).json({
                message: "Only admin can access this route"
            });
        } catch (error: any) {
            return res.status(500).json({
                Message: "Fail to verify role"
            });
        }
    }
}
