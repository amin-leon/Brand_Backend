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
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class loginController {
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield Users_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({
                        status: "Fail",
                        Message: "Account does not exist",
                    });
                }
                if (user && (yield user.comparePassword(password))) {
                    const secetKey = process.env.SECRET_KEY;
                    const token = jsonwebtoken_1.default.sign(user.toJSON(), secetKey, { expiresIn: '7d' });
                    return res.status(200).json({
                        Message: "Login successful",
                        user,
                        token
                    });
                }
                else {
                    return res.status(401).json({ message: "Password incorrect :)" });
                }
            }
            catch (error) {
                return res.status(500).json({
                    status: "Bad request",
                    Message: "Fail to login"
                });
            }
        });
    }
}
exports.default = loginController;
