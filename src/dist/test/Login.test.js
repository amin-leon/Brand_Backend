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
const Users_1 = __importDefault(require("../models/Users"));
describe('Login Users - /POST', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Users_1.default.deleteMany({});
    }));
    it('should return status code 404 if the users does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/login')
            .send({ email: 'nonexistent@example.com', password: 'password' });
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('Account does not exist');
    }));
    it('should return status code 401 if the password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Users_1.default.create({
            firstName: "Leon",
            secondName: "Alvin",
            email: 'test@example.com',
            password: 'password'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Password incorrect :)');
    }));
    it('should return status code 500 if an error occurs while logging in', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Users_1.default, 'findOne').mockRejectedValueOnce(new Error('Database error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password' });
        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Fail to login');
    }));
});
