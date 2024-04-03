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
const Skills_1 = __importDefault(require("../models/Skills"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('Skills Controller', () => {
    it('should return status code 201 if new skill is created successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/skills/new')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
            icon: "omgae.png"
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.Message).toBe('new Skill added');
    }));
    it('should return status code 400 if request body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/skills/new')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: "React js"
        });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe('Bad Request');
    }));
    it('should return status code 500 if an error occurs during blog creation', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Skills_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/blogs/new')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
            icon: "imga.png"
        });
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('Fail');
        expect(res.body.Message).toBe('new Skill Not added :)');
    }));
});
describe('Skills Controller - Update Skill', () => {
    it('should return status code 200 and success message if skill is updated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Skills_1.default, 'findByIdAndUpdate').mockResolvedValueOnce({
            _id: reqParams.id,
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
            icon: 'updated_image_path.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Skill Successful updated');
    }));
    it('should return status code 404 and message if skill is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Skills_1.default, 'findByIdAndUpdate').mockResolvedValueOnce(null);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Skill not found :)');
    }));
    it('should return status code 500 and message if an error occurs during skill update', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Skills_1.default, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Skill not updated');
    }));
});
describe('Delete Blog - /DELETE', () => {
    it('should return status code 200 if skill is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield Skills_1.default.create({
            title: 'Test Skill',
            description: 'This is a test skill',
            percent: 90,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/skills/delete/${newBlog._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(200);
        expect(res.body.Message).toBe('Skill deleted !');
        expect(res.body.status).toBe('OK');
    }));
    it('should return status code 404 if skill does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/skills/delete/${nonExistingId}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('Skill Not found :)');
    }));
    it('should return status code 500 if an error occurs while deleting blog', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Skills_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
        const newSkill = yield Skills_1.default.create({
            title: 'Test Skill',
            description: 'This is a test skill',
            percent: 90,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/skills/delete/${newSkill._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Fail to delete Skill');
    }));
});
describe('Get All Skills - /GET', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Skills_1.default.deleteMany({});
    }));
    it('should return status code 200 and all blogs if there are blogs in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Skills_1.default.create({
            title: 'Test Skill',
            description: 'This is a test skill',
            percent: 90,
            icon: 'image1.jpg'
        });
        yield Skills_1.default.create({
            title: 'Test Skill',
            description: 'This is a test skill',
            percent: 90,
            icon: 'image2.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default).get('/skills/all');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('sucess');
    }));
    it('should return status code 404 if there are no skills in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/skills/all');
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('No skills found :)');
    }));
    it('should return status code 500 if an error occurs while fetching skills', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Skills_1.default, 'find').mockRejectedValueOnce(new Error("Error"));
        const res = yield (0, supertest_1.default)(index_1.default).get('/skills/all');
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('status');
        expect(res.body.message).toBe('Unable to display Skills:)');
    }));
});
