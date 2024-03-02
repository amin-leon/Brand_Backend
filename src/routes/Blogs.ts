import express from 'express'
import BlogsController from '../controllers/Blogs';
import upload from '../utils/multer';

const router = express.Router();

router.post('/new', upload.single('image'), BlogsController.createNewBlog);
router.put('/update/:id', BlogsController.updateBlog);
router.delete('/delete/:id', BlogsController.deleteBlog);
router.put('/blog/like/:id', BlogsController.likeBlog);
router.put('/blog/comment/:id', BlogsController.commentBlog);


export default router;