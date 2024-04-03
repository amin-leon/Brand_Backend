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
const Subscribers_1 = __importDefault(require("../models/Subscribers"));
class SubscribersController {
    static subscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({
                        status: "Bad request",
                        message: "Mssing fields value!"
                    });
                }
                const alreadySub = yield Subscribers_1.default.findOne({ email: email });
                if (alreadySub) {
                    return res.status(200).json({
                        Message: "You have Already Subsribed!"
                    });
                }
                const newSub = new Subscribers_1.default({ email });
                yield newSub.save();
                return res.status(500).json({
                    Message: "Your Subscribution not sent !",
                });
            }
            catch (error) {
                return res.status(500).json({
                    Message: "Subscribution Not sent :)"
                });
            }
        });
    }
    static getAllSubs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allSubs = yield Subscribers_1.default.find();
                if (!allSubs) {
                    res.status(404).json({
                        Message: "No Subs  :)"
                    });
                }
                return res.status(200).json({
                    status: "sucess",
                    Subs: allSubs,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Fail to Fetch allSubs :)",
                });
            }
        });
    }
    static deleteSub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const existSub = yield Subscribers_1.default.findById(id);
                if (!existSub) {
                    return res.status(404).json({
                        Message: "Subs not Found"
                    });
                }
                yield Subscribers_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    Message: "Sub deleted successfully",
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    status: "Fail",
                    Message: "Fail to delete sub"
                });
            }
        });
    }
}
exports.default = SubscribersController;
