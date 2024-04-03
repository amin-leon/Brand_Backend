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
const Subscribers_1 = __importDefault(require("../models/Subscribers"));
const mongoose_1 = __importDefault(require("mongoose"));
describe("Subscribers Controller", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Subscribers_1.default.deleteMany({});
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Subscribers_1.default.deleteMany({});
    }));
    describe("Subscribe - /POST", () => {
        it("should return 201 if subscription is successful", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/subscribers/subscribe")
                .send({
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("Your Subscribution sent !");
        }));
        it("should return 400 if request body is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/subscribers/subscribe")
                .send({
                names: "Hello my friend",
            });
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad request");
        }));
        it("should return 500 if an error occurs during subscription creation", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Subscribers_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/subscribers/subscribe")
                .send({
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("Subscribution Not sent :)");
        }));
    });
    describe("Get all subscribers -/GET", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Subscribers_1.default.deleteMany({});
        }));
        it("should return status code 200 and subs if subscribers are found", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockSubscribers = [
                { email: 'test1@example.com' },
                { email: 'test2@example.com' },
            ];
            yield Subscribers_1.default.insertMany(mockSubscribers);
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("sucess");
        }));
        it("should return status code 500 if an error occurs while fetching subs", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Subscribers_1.default, 'find').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Fail to Fetch allSubs :)");
        }));
        it("should return status code 404 if no subscribers are found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe("No Subs :)");
        }));
    });
    describe('Delete sub - /DELETE', () => {
        it('should return status code 200 if sub is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield Subscribers_1.default.create({ email: 'test@example.com' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/subscribers/delete/${newMessage._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.Message).toBe('Sub deleted successfully');
        }));
        it('should return status code 404 if message does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = new mongoose_1.default.Types.ObjectId();
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/subscribers/delete/${newMessage}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('Subs not Found');
        }));
        it('should return status code 500 if an error occurs while deleting sub', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Subscribers_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
            const newMessage = yield Subscribers_1.default.create({ email: 'test@example.com' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/subscribers/delete/${newMessage._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Fail to delete sub');
        }));
    });
});
