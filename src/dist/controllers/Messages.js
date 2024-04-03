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
const Messages_1 = __importDefault(require("../models/Messages"));
const MessagesValitions_1 = __importDefault(require("../validations/MessagesValitions"));
class MessagesController {
    static sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, email, names } = req.body;
                const { error } = MessagesValitions_1.default.validate(req.body);
                if (error) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: error.details[0].message,
                    });
                }
                let existingMessage = yield Messages_1.default.findOne({ email });
                if (!existingMessage) {
                    const newMessage = new Messages_1.default({
                        messages: [message],
                        email,
                        names
                    });
                    yield newMessage.save();
                }
                else {
                    existingMessage.messages.push(message);
                    yield existingMessage.save();
                }
                return res.status(201).json({
                    Message: "Message sent!",
                });
            }
            catch (error) {
                return res.status(500).json({
                    Message: "Message not sent :)",
                });
            }
        });
    }
    static getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessages = yield Messages_1.default.find();
                if (!allMessages) {
                    return res.status(404).json({
                        Message: "No Message  :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    content: allMessages,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Fail to Fetch Message :)",
                });
            }
        });
    }
    static deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const existMessage = yield Messages_1.default.findById(id);
                if (!existMessage) {
                    return res.status(404).json({
                        Message: "Message not Found"
                    });
                }
                yield Messages_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    Message: "Message deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Fail to delete message"
                });
            }
        });
    }
    static readMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { read } = req.body;
                const { id } = req.params;
                if (typeof read !== 'boolean') {
                    return res.status(400).json({
                        status: "Bad request",
                        Message: "Missing or invalid 'read' field value"
                    });
                }
                const updatedMessage = yield Messages_1.default.findByIdAndUpdate(id, { read }, { new: true });
                if (!updatedMessage) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Message not found"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "You have Read this message"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Error",
                    Message: "Failed to update message"
                });
            }
        });
    }
}
exports.default = MessagesController;
