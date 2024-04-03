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
const Blogs_1 = __importDefault(require("../models/Blogs"));
const BlogValidations_1 = __importDefault(require("../validations/BlogValidations"));
class BlogsController {
    static createNewBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, category, desc, tag } = req.body;
                const image = req.file ? req.file.path : null;
                const { error } = BlogValidations_1.default.validate(req.body);
                if (error) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: error.details[0].message,
                    });
                }
                const newBlog = new Blogs_1.default({
                    title: title,
                    category: category,
                    desc: desc,
                    tag: tag,
                    image: image
                });
                yield newBlog.save();
                return res.status(201).json({
                    status: 'success',
                    Message: "New blog created !"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Blog not created :)"
                });
            }
        });
    }
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, desc, category, tag } = req.body;
                const { id } = req.params;
                const image = req.file ? req.file.path : null;
                const foundBlogAndUpdate = yield Blogs_1.default.findByIdAndUpdate(id, { tag, image, desc, title, category }, { new: true });
                if (!foundBlogAndUpdate) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Blog not found :)"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "Blog Successful updated"
                });
            }
            catch (error) {
                return res.status(500).json({
                    Status: "Fail",
                    Message: "Blog not updated"
                });
            }
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const foundBlog = yield Blogs_1.default.findById(id);
                if (!foundBlog) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Blog with ID not found"
                    });
                }
                yield Blogs_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    status: "OK",
                    Message: "Blog deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Failed to delete blog"
                });
            }
        });
    }
    static likeBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const { id } = req.params;
                const foundBlog = yield Blogs_1.default.findById(id);
                if (!foundBlog) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Blog Not found"
                    });
                }
                const hasLiked = foundBlog.likes.includes(email);
                if (hasLiked) {
                    foundBlog.likes = foundBlog.likes.filter(e => e !== email);
                    yield foundBlog.save();
                    return res.status(200).json({
                        status: "OK",
                        Message: "You unliked Blog",
                        foundBlog
                    });
                }
                foundBlog.likes.push(email);
                yield foundBlog.save();
                return res.status(200).json({
                    status: "OK",
                    Message: "You liked Blog",
                    foundBlog
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Oops! , unable to like"
                });
            }
        });
    }
    static commentBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, comment, posterNames } = req.body;
                const { id } = req.params;
                const foundBlog = yield Blogs_1.default.findById(id);
                if (!foundBlog) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Blog Not found"
                    });
                }
                if (!email || !comment) {
                    return res.status(400).json({
                        status: "Bad request",
                        Message: "Missing value for fields"
                    });
                }
                foundBlog.comments.push({ email, comment, posterNames });
                yield foundBlog.save();
                return res.status(200).json({
                    status: "OK",
                    Message: "Blog commented"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Oops! , unable to comment"
                });
            }
        });
    }
    static getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allBlogs = yield Blogs_1.default.find();
                if (allBlogs.length === 0) {
                    return res.status(404).json({
                        Message: "No blogs found :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data: allBlogs,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "status",
                    message: "Unable to display Blogs:)",
                });
            }
        });
    }
    static getSingleBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const singleBlog = yield Blogs_1.default.findOne({ _id: id });
                if (!singleBlog) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "No Blog Found :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    userInfo: singleBlog,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    message: "Unable to find Blog :)",
                });
            }
        });
    }
}
exports.default = BlogsController;
