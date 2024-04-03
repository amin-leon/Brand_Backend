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
const Projects_1 = __importDefault(require("../models/Projects"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('Projects Controller', () => {
    it('should return status code 201 if new project is created successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/projects/add')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test blog',
            link: 'www.test.com',
            image: 'image.jpg'
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.Message).toBe('Project added');
    }));
    it('should return status code 400 if request body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/projects/add')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: "Shopify"
        });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe('Bad Request');
    }));
    it('should return status code 500 if an error occurs during project add', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Projects_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/projects/add')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test blog',
            link: 'www.test.com'
        });
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('Fail');
        expect(res.body.Message).toBe('Project Not added :)');
    }));
});
describe('Projects Controller - Update Project', () => {
    it('should return status code 200 and success message if project is updated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Projects_1.default, 'findByIdAndUpdate').mockResolvedValueOnce({
            _id: reqParams.id,
            title: reqBody.title,
            description: reqBody.description,
            category: reqBody.category,
            link: reqBody.link,
            image: 'updated_image_path.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Project Successful updated');
    }));
    it('should return status code 404 and message if project is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Projects_1.default, 'findByIdAndUpdate').mockResolvedValueOnce(null);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Project not found :)');
    }));
    it('should return status code 500 and message if an error occurs during project update', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Projects_1.default, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Project not updated');
    }));
});
describe('Delete Blog - /DELETE', () => {
    it('should return status code 200 if blog is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProject = yield Projects_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/projects/remove/${newProject._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(200);
        expect(res.body.Message).toBe('Project deleted !');
        expect(res.body.status).toBe('OK');
    }));
    it('should return status code 404 if project does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/projects/remove/${nonExistingId}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Project Not found :)');
    }));
    it('should return status code 500 if an error occurs while deleting project', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Projects_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
        const newProject = yield Projects_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/projects/remove/${newProject._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Fail to delete project');
    }));
});
describe('Get All Projects - /GET', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Projects_1.default.deleteMany({});
    }));
    it('should return status code 200 and all projects if there are projects in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Projects_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com',
            image: 'image2.jpg'
        });
        yield Projects_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com',
            image: 'image2.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default).get('/projects/all');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
    }));
    it('should return status code 404 if there are no projects in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/projects/all');
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('No Projects found :)');
    }));
    it('should return status code 500 if an error occurs while fetching blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Projects_1.default, 'find').mockRejectedValueOnce(new Error("Error"));
        const res = yield (0, supertest_1.default)(index_1.default).get('/projects/all');
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('status');
        expect(res.body.message).toBe('Unable to display Projects:)');
    }));
});
describe('Get Single Project - /GET', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Projects_1.default.deleteMany({});
    }));
    it('should return status code 200 and the project if it exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield Projects_1.default.create({
            title: 'Test Project',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com',
            image: 'image.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default).get(`/projects/${project._id}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('sucess');
    }));
    it('should return status code 404 if the project does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const res = yield (0, supertest_1.default)(index_1.default).get(`/projects/${nonExistingId}`);
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('No Project Found :)');
    }));
    it('should return status code 500 if an error occurs while fetching the project', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Projects_1.default, 'findOne').mockRejectedValueOnce(new Error("Error"));
        const res = yield (0, supertest_1.default)(index_1.default).get('/projects/609cbbed1c5eac47d8f6e95c');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Unable to find Project :)');
    }));
});
