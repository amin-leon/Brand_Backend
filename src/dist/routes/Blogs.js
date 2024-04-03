"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blogs_1 = __importDefault(require("../controllers/Blogs"));
const multer_1 = __importDefault(require("../utils/multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/new', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('image'), Blogs_1.default.createNewBlog);
router.put('/update/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('image'), Blogs_1.default.updateBlog);
router.delete('/delete/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, Blogs_1.default.deleteBlog);
router.put('/blog/like/:id', Blogs_1.default.likeBlog);
router.put('/blog/comment/:id', Blogs_1.default.commentBlog);
router.get('/all', Blogs_1.default.getAllBlogs);
router.get('/:id', Blogs_1.default.getSingleBlog);
exports.default = router;
