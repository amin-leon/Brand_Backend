import express from 'express'
import SkillsController from '../controllers/Skills';
import upload from '../utils/multer';
// import AuthVerify from '../middleware/auth';

const router = express.Router();

// token
// new skill: AuthVerify.isAuthenticated, AuthVerify.checkRole,
// edit: AuthVerify.isAuthenticated, AuthVerify.checkRole,
//delte: AuthVerify.isAuthenticated, AuthVerify.checkRole,

router.post('/new', upload.single('icon'), SkillsController.addNewSkill);
router.put('/edit/:id',upload.single('icon'), SkillsController.updateSkill);
router.delete('/delete/:id', SkillsController.deleteSkill);
router.get('/all', SkillsController.getAllSkills);


export default router;