"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const skillSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(3).max(60),
    description: joi_1.default.string().required().min(5).max(200),
    icon: joi_1.default.string(),
    percent: joi_1.default.number().required(),
});
exports.default = skillSchema;
