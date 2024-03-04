import express from 'express'
import SkillsController from '../controllers/Skills';
import upload from '../utils/multer';
import AuthVerify from '../middleware/auth';

const router = express.Router();

router.post('/new',AuthVerify.isAuthenticated, AuthVerify.checkRole, upload.single('icon'), SkillsController.addNewSkill);
router.put('/edit/:id',upload.single('icon'),AuthVerify.isAuthenticated, AuthVerify.checkRole, SkillsController.updateSkill);
router.delete('/delete/:id',AuthVerify.isAuthenticated, AuthVerify.checkRole, SkillsController.deleteSkill);
router.get('/all', SkillsController.getAllSkills);


export default router;