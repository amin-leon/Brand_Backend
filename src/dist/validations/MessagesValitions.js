"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const messageSchema = joi_1.default.object({
    message: joi_1.default.string().required().min(5).max(600),
    email: joi_1.default.string().required().email(),
    names: joi_1.default.string().required(),
});
exports.default = messageSchema;
