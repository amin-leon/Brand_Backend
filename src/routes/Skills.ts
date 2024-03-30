import express from 'express'
import SkillsController from '../controllers/Skills';
import upload from '../utils/multer';
import AuthVerify from '../middleware/auth';

const router = express.Router();

// token
// new skill: AuthVerify.isAuthenticated, AuthVerify.checkRole,
// edit: AuthVerify.isAuthenticated, AuthVerify.checkRole,
//delte: AuthVerify.isAuthenticated, AuthVerify.checkRole,

router.post('/new',AuthVerify.isAuthenticated, AuthVerify.checkRole, upload.single('icon'), SkillsController.addNewSkill);
router.put('/edit/:id', AuthVerify.isAuthenticated, AuthVerify.checkRole, upload.single('icon'), SkillsController.updateSkill);
router.delete('/delete/:id', AuthVerify.isAuthenticated, AuthVerify.checkRole, SkillsController.deleteSkill);
router.get('/all', SkillsController.getAllSkills);
router.get('/:id', SkillsController.getSkillById);



export default router;