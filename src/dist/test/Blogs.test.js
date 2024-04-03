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
const Blogs_1 = __importDefault(require("../models/Blogs"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('Blogs Controller', () => {
    it('should return status code 201 if new blog is created successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/blogs/new')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test'
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.Message).toBe('New blog created !');
    }));
    it('should return status code 400 if request body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/blogs/new')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: "Leon is good dev"
        });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe('Bad Request');
    }));
    it('should return status code 500 if an error occurs during blog creation', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Blogs_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/blogs/new')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test'
        });
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('Fail');
        expect(res.body.Message).toBe('Blog not created :)');
    }));
});
describe('Blogs Controller - Update Blog', () => {
    it('should return status code 200 and success message if blog is updated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Blogs_1.default, 'findByIdAndUpdate').mockResolvedValueOnce({
            _id: reqParams.id,
            title: reqBody.title,
            desc: reqBody.desc,
            category: reqBody.category,
            tag: reqBody.tag,
            image: 'updated_image_path.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Blog Successful updated');
    }));
    it('should return status code 404 and message if blog is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Blogs_1.default, 'findByIdAndUpdate').mockResolvedValueOnce(null);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Blog not found :)');
    }));
    it('should return status code 500 and message if an error occurs during blog update', () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };
        jest.spyOn(Blogs_1.default, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
            .send(reqBody);
        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Blog not updated');
    }));
});
describe('Delete Blog - /DELETE', () => {
    it('should return status code 200 if blog is deleted successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/blogs/delete/${newBlog._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(200);
        expect(res.body.Message).toBe('Blog deleted successfully');
        expect(res.body.status).toBe('OK');
    }));
    it('should return status code 404 if blog does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/blogs/delete/${nonExistingId}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('Blog with ID not found');
    }));
    it('should return status code 500 if an error occurs while deleting blog', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Blogs_1.default, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/blogs/delete/${newBlog._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Failed to delete blog');
    }));
});
describe('Like Blog - /POST', () => {
    it('should return status code 200 if blog is liked successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            likes: []
        });
        const email = 'test@example.com';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/like/${newBlog._id}`)
            .send({ email });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
        expect(res.body.Message).toBe('You liked Blog');
        const updatedBlog = yield Blogs_1.default.findById(newBlog._id);
        expect(updatedBlog.likes).toContain(email);
    }));
    it('should return status code 404 if blog does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const email = 'test@example.com';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/like/${nonExistingId}`)
            .send({ email });
        expect(res.status).toBe(404);
        expect(res.body.status).toBe("Not found");
        expect(res.body.Message).toBe('Blog Not found');
    }));
    it('should return status code 403 if user has already liked the blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            likes: ['test@example.com']
        });
        const email = 'test@example.com';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/like/${existingBlog._id}`)
            .send({ email });
        expect(res.status).toBe(403);
        expect(res.body.status).toBe('Forbidden');
        expect(res.body.Message).toBe('You have already liked to this blog :)');
    }));
    it('should return status code 500 if an error occurs while liking the blog', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Blogs_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            likes: []
        });
        const email = 'test@example.com';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/like/${newBlog._id}`)
            .send({ email });
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('Fail');
        expect(res.body.Message).toBe('Oops! , unable to like');
    }));
});
describe('Comment Blog - /POST', () => {
    it('should return status code 200 if comment is added successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            comments: []
        });
        const email = 'test@example.com';
        const comment = 'This is a test comment';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/comment/${newBlog._id}`)
            .send({ email, comment });
        expect(res.status).toBe(200);
        expect(res.body.Message).toBe('Blog commented');
    }));
    it('should return status code 404 if blog does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = new mongoose_1.default.Types.ObjectId();
        const email = 'test@example.com';
        const comment = 'This is a test comment';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/comment/${nonExistingId}`)
            .send({ email, comment });
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('Blog Not found');
    }));
    it('should return status code 400 if required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            comments: []
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/comment/${newBlog._id}`)
            .send({
            email: "leon@gmail.com"
        });
        expect(res.status).toBe(400);
        expect(res.body.Message).toBe('Missing value for fields');
    }));
    it('should return status code 500 if an error occurs while commenting on the blog', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Blogs_1.default.prototype, 'save').mockRejectedValueOnce(new Error());
        const newBlog = yield Blogs_1.default.create({
            title: 'Test Blog',
            category: 'Technology',
            desc: 'This is a test blog',
            tag: 'test',
            comments: []
        });
        const email = 'test@example.com';
        const comment = 'This is a test comment';
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/blogs/blog/comment/${newBlog._id}`)
            .send({ email, comment });
        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Oops! , unable to comment');
    }));
});
describe('Get All Blogs - /GET', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Blogs_1.default.deleteMany({});
    }));
    it('should return status code 200 and all blogs if there are blogs in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Blogs_1.default.create({
            title: 'Blog 1',
            category: 'Technology',
            desc: 'Description of Blog 1',
            tag: 'tag1',
            image: 'image1.jpg'
        });
        yield Blogs_1.default.create({
            title: 'Blog 2',
            category: 'Science',
            desc: 'Description of Blog 2',
            tag: 'tag2',
            image: 'image2.jpg'
        });
        const res = yield (0, supertest_1.default)(index_1.default).get('/blogs/all');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
    }));
    it('should return status code 404 if there are no blogs in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/blogs/all');
        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('No blogs found :)');
    }));
    it('should return status code 500 if an error occurs while fetching blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(Blogs_1.default, 'find').mockRejectedValueOnce(new Error("Error"));
        const res = yield (0, supertest_1.default)(index_1.default).get('/blogs/all');
        expect(res.status).toBe(500);
        expect(res.body.status).toBe('status');
        expect(res.body.message).toBe('Unable to display Blogs:)');
    }));
});
