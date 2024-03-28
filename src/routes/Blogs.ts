import express from 'express'
import BlogsController from '../controllers/Blogs';
import upload from '../utils/multer';
// import AuthVerify from '../middleware/auth';

const router = express.Router();
// new blog::: AuthVerify.isAuthenticated, AuthVerify.checkRole, upload.single('image'),
//  delete:::  AuthVerify.isAuthenticated, AuthVerify.checkRole,
// update :::: AuthVerify.isAuthenticated, AuthVerify.checkRole,

router.post('/new', upload.single('image'), BlogsController.createNewBlog);
router.put('/update/:id', upload.single('image'), BlogsController.updateBlog);
router.delete('/delete/:id', BlogsController.deleteBlog);
router.put('/blog/like/:id', BlogsController.likeBlog);
router.put('/blog/comment/:id', BlogsController.commentBlog);
router.get('/all', BlogsController.getAllBlogs);
router.get('/:id', BlogsController.getSingleBlog);


export default router;