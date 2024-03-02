import express from 'express'
import ProjectsController  from '../controllers/Projects';
import upload from '../utils/multer';

const router = express.Router();

router.post('/add', upload.single('image'), ProjectsController.addNewProject);
router.put('/edit/:id',upload.single('image'), ProjectsController.updateProject);
router.delete('/remove/:id', ProjectsController.deleteProject);
router.get('/all', ProjectsController.getAllProjects);
router.get('/:id', ProjectsController.getSingleProject);


export default router;