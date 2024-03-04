import express from 'express'
import ProjectsController  from '../controllers/Projects';
import upload from '../utils/multer';
import AuthVerify from '../middleware/auth';

const router = express.Router();

router.post('/add', AuthVerify.isAuthenticated, AuthVerify.checkRole, upload.single('image'), ProjectsController.addNewProject);
router.put('/edit/:id',upload.single('image'), AuthVerify.isAuthenticated, AuthVerify.checkRole, ProjectsController.updateProject);
router.delete('/remove/:id',AuthVerify.isAuthenticated, AuthVerify.checkRole, ProjectsController.deleteProject);
router.get('/all', ProjectsController.getAllProjects);
router.get('/:id', ProjectsController.getSingleProject);


export default router;