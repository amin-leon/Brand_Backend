import express from 'express'
import BlogsController from '../controllers/Blogs';
import upload from '../utils/multer';
import AuthVerify from '../middleware/auth';

const router = express.Router();

router.post('/new', upload.single('image'), AuthVerify.isAuthenticated, AuthVerify.checkRole,  BlogsController.createNewBlog);
router.put('/update/:id',upload.single('image'),AuthVerify.isAuthenticated, AuthVerify.checkRole, BlogsController.updateBlog);
router.delete('/delete/:id',AuthVerify.isAuthenticated, AuthVerify.checkRole,  BlogsController.deleteBlog);
router.put('/blog/like/:id', BlogsController.likeBlog);
router.put('/blog/comment/:id', BlogsController.commentBlog);
router.get('/all', BlogsController.getAllBlogs);
router.get('/:id', BlogsController.getSingleBlog);


export default router;