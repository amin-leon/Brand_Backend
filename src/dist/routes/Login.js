"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("../controllers/Login"));
const Router = express_1.default.Router();
Router.post('/login', Login_1.default.loginUser);
exports.default = Router;
