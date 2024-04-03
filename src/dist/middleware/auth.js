"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthVerify {
    static isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
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
                const secretKey = process.env.SECRET_KEY;
                const user = jsonwebtoken_1.default.verify(token, secretKey);
                req.user = user;
                return next();
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Invalid or expired token, login again"
                });
            }
        });
    }
    static checkRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    return next();
                }
                return res.status(403).json({
                    message: "Only admin can access this route"
                });
            }
            catch (error) {
                return res.status(500).json({
                    Message: "Fail to verify role"
                });
            }
        });
    }
}
exports.default = AuthVerify;
