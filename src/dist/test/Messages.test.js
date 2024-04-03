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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const Messages_1 = __importDefault(require("../models/Messages"));
const mongoose_1 = __importDefault(require("mongoose"));
describe("Messages Controller", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Messages_1.default.deleteMany({});
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Messages_1.default.deleteMany({});
    }));
    describe("Send Messages -/POST", () => {
        it("should return 201 if message is sent successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/messages/new")
                .send({
                names: "Hello my friend",
                message: "shgdhsgdhsgdh",
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("Message sent!");
        }));
        it("should return 400 if request body is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/messages/new")
                .send({
                names: "Hello my friend",
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad Request");
        }));
        it("should return 500 if an error occurs during message creation", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Messages_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/messages/new")
                .send({
                names: "Hello my friend",
                message: "shgdhsgdhsgdh",
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("Message not sent :)");
        }));
    });
    describe("Get Messages -/GET", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Messages_1.default.deleteMany({});
        }));
        it("should return status code 200 and messages if messages are found", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessages = [
                { message: 'Content 1', email: 'test1@example.com', names: "amin" },
                { message: 'Content 2', email: 'test2@example.com', names: "amin" },
            ];
            yield Messages_1.default.insertMany(mockMessages);
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/messages/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
        }));
        it("should return status code 500 if an error occurs while fetching messages", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Messages_1.default, 'find').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/messages/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Fail to Fetch Message :)");
        }));
    });
    describe('Delete Message - /DELETE', () => {
        it('should return status code 200 if message is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield Messages_1.default.create({ names: 'Test Subject', message: 'Test Message', email: 'test@example.com' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/messages/delete/${newMessage._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.Message).toBe('Message deleted successfully');
        }));
        it('should return status code 404 if message does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = new mongoose_1.default.Types.ObjectId();
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/messages/delete/${newMessage}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('Message not Found');
        }));
        it('should return status code 500 if an error occurs while deleting message', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Messages_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
            const newMessage = yield Messages_1.default.create({ message: 'Test Message', email: 'test@example.com', names: "Amin Leon" });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/messages/delete/${newMessage._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Fail to delete message');
        }));
    });
    describe("Read Message - /PUT", () => {
        it("should return status code 200 and success message when message is successfully marked as read", () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield Messages_1.default.create({
                names: 'Test Subject',
                message: 'Test Message',
                email: 'test@example.com'
            });
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/messages/read/${newMessage._id}`)
                .send({ read: true });
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("Success");
            expect(res.body.Message).toBe("You have Read this message");
        }));
        it("should return status code 400 and error message when 'read' field is missing in request body", () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield Messages_1.default.create({
                names: 'Test Subject',
                message: 'Test Message',
                email: 'test@example.com'
            });
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/messages/read/${newMessage._id}`)
                .send({});
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad request");
            expect(res.body.Message).toBe("Missing or invalid 'read' field value");
        }));
        it("should return status code 404 and error message when Fail to update as read", () => __awaiter(void 0, void 0, void 0, function* () {
            const randomId = new mongoose_1.default.Types.ObjectId();
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/messages/read/${randomId}`)
                .send({ read: true });
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe("Message not found");
        }));
        it("should return status code 500 if an error occurs while reading", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Messages_1.default, 'findByIdAndUpdate').mockRejectedValueOnce(new Error());
            const newMessage = yield Messages_1.default.create({
                names: 'Test Subject',
                message: 'Test Message',
                email: 'test@example.com'
            });
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/messages/read/${newMessage._id}`)
                .send({ read: true });
            expect(res.status).toBe(500);
            expect(res.body.status).toBe("Error");
            expect(res.body.Message).toBe("Failed to update message");
        }));
    });
});
