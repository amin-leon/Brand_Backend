"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const projectSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(5).max(60),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required().min(5).max(600),
    image: joi_1.default.string(),
    link: joi_1.default.string().required(),
});
exports.default = projectSchema;
