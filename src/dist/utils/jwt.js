"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    static generateToken(data, exp = '1d') {
        const ScreteKey = process.env.SECRET_KEY;
        return jsonwebtoken_1.default.sign(data, ScreteKey, { expiresIn: exp });
    }
}
exports.JWT = JWT;
