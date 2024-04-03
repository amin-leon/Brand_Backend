"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegistration_1 = __importDefault(require("../controllers/userRegistration"));
const auth_1 = __importDefault(require("../middleware/auth"));
const Router = express_1.default.Router();
Router.post('/register', userRegistration_1.default.userRegistration);
Router.get('/', auth_1.default.isAuthenticated, auth_1.default.checkRole, userRegistration_1.default.getAllUsers);
Router.get('/user/:id', userRegistration_1.default.getSingleUser);
Router.put('/user/update/:id', userRegistration_1.default.updateUser);
Router.delete('/delete/:id', userRegistration_1.default.deleteUser);
exports.default = Router;
