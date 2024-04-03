"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    desc: joi_1.default.string().required(),
    tag: joi_1.default.string().required(),
    image: joi_1.default.string()
});
exports.default = blogSchema;
