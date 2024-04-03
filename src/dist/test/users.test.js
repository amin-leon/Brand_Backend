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
const mongoose_1 = __importDefault(require("mongoose"));
describe("Register User Controller", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Users_1.default.deleteMany({});
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Users_1.default.deleteMany({});
    }));
    describe("Register a user -/POST", () => {
        it("should return 201 if user is well registered", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/users/register")
                .send({
                firstName: 'John',
                secondName: 'Doe',
                email: 'john.doe@example.com',
                password: 'Password@123'
            });
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("User Registration  goes Well");
        }));
        it("should return 400 if request body is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/users/register")
                .send({
                names: "Hello my friend",
                email: "leon@gmail.com",
            });
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad request");
            expect(res.body.Message).toBe("Missing Field(s)");
        }));
        it("should return 500 if an error occurs during message creation", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Users_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .post("/users/register")
                .send({
                firstName: 'John',
                secondName: 'Doe',
                email: 'john.doe@example.com',
                password: 'Password@123'
            });
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("User Not Registered");
        }));
    });
    describe("Get Users -/GET", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Users_1.default.deleteMany({});
        }));
        it("should return status code 200 and Users if users are found", () => __awaiter(void 0, void 0, void 0, function* () {
            yield Users_1.default.create({
                firstName: 'Leon',
                secondName: 'peter',
                email: 'leon@example.com',
                password: 'Password@123'
            });
            yield Users_1.default.create({
                firstName: 'Leon',
                secondName: 'peter',
                email: 'leonpizzo@example.com',
                password: 'Password@123'
            });
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
        }));
        it("should return status code 500 if an error occurs while fetching messages", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Users_1.default, 'find').mockRejectedValueOnce(new Error());
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Fail to fetch users");
        }));
        it("should return status code 404 if no users are found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe("No User Found :)");
        }));
    });
    describe('Delete User - /DELETE', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Users_1.default.deleteMany({});
        }));
        it('should return status code 204 if user is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/users/delete/${newUser._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({});
        }));
        it('should return status code 404 if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/users/delete/${newUser._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('User not Found');
        }));
        it('should return status code 500 if an error occurs while deleting user', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Users_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .delete(`/users/delete/${newUser._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Fail to delete user');
        }));
    });
    describe('Update User - /PUT', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Users_1.default.deleteMany({});
        }));
        it('should return status code 200 and updated user info if user is updated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const updatedInfo = { firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' };
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/users/update/${newUser._id}`)
                .send(updatedInfo)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.Message).toBe('User updated Well !');
        }));
        it('should return status code 404 if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId();
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/users/update/${userId}`)
                .send({ firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' })
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('User not found !');
        }));
        it('should return status code 400 if request body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const invalidInfo = { lsyy: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' };
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/users/update/${newUser._id}`)
                .send(invalidInfo)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('Bad request');
        }));
        it('should return status code 500 if an error occurs while updating user', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Users_1.default, 'findByIdAndUpdate').mockRejectedValueOnce(new Error());
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .put(`/users/update/${newUser._id}`)
                .send({ firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' })
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Internal Server Error');
        }));
    });
    describe('Get Single User - /GET', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Users_1.default.deleteMany({});
        }));
        it('should return status code 200 and user info if user is found', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .get(`/users/${newUser._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
        }));
        it('should return status code 404 if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId();
            const res = yield (0, supertest_1.default)(index_1.default)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('No User Found :)');
        }));
        it('should return status code 500 if an error occurs while fetching user', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(Users_1.default, 'findOne').mockRejectedValueOnce(new Error());
            const newUser = yield Users_1.default.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
            const res = yield (0, supertest_1.default)(index_1.default)
                .get(`/users/${newUser._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Fail to fecth user');
        }));
    });
});
