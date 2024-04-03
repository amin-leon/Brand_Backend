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
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterValidations_1 = __importDefault(require("../validations/RegisterValidations"));
class UsersController {
    static userRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, secondName, email, password } = req.body;
                const existanceOfuser = yield Users_1.default.findOne({ email: email });
                if (existanceOfuser) {
                    return res.status(400).json({
                        status: "Registraction Failed",
                        Message: "Email already exist !"
                    });
                }
                const { error } = RegisterValidations_1.default.validate(req.body);
                if (error) {
                    return res.status(400).json({
                        status: "Bad request",
                        Message: "Missing Field(s)"
                    });
                }
                const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                const newuser = new Users_1.default({
                    firstName,
                    secondName,
                    email,
                    password: hashedPassword,
                });
                yield newuser.save();
                return res.status(201).json({
                    Message: "User Registration  goes Well",
                });
            }
            catch (error) {
                return res.status(500).json({
                    Message: "User Not Registered"
                });
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allusers = yield Users_1.default.find().select("-password");
                if (!allusers) {
                    res.status(404).json({
                        Message: "No User Found :)"
                    });
                }
                res.status(200).json({
                    status: "success",
                    data: allusers,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Fail to fetch users",
                });
            }
        });
    }
    static getSingleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const singleUser = yield Users_1.default.findOne({ _id: id }).select("-password");
                if (!singleUser) {
                    return res.status(404).json({
                        Message: "No User Found :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    userInfo: singleUser,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Fail to fecth user",
                });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedInfo = req.body;
                const { id } = req.params;
                const existanceOfuser = yield Users_1.default.findById(id);
                if (!existanceOfuser) {
                    return res.status(404).json({
                        Message: "User not found !",
                    });
                }
                if (updatedInfo.password) {
                    updatedInfo.password = bcrypt_1.default.hashSync(updatedInfo.password, 10);
                }
                const { error } = RegisterValidations_1.default.validate(req.body);
                if (error) {
                    return res.status(400).json({
                        status: "Bad request",
                        Message: error.details[0].message
                    });
                }
                const updatedUser = yield Users_1.default.findByIdAndUpdate(id, updatedInfo, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({
                        Message: "No User Found :)"
                    });
                }
                return res.status(200).json({
                    status: "sucess",
                    Message: "User updated Well !",
                    userInfo: updatedUser,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const existUser = yield Users_1.default.findById(id);
                if (!existUser) {
                    return res.status(404).json({
                        Message: "User not Found"
                    });
                }
                yield Users_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    Message: "User deleted successfully",
                    deleted: existUser
                });
            }
            catch (error) {
                return res.status(500).json({
                    Message: "Fail to delete user"
                });
            }
        });
    }
}
exports.default = UsersController;
