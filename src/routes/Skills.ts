import express from 'express'
import SkillsController from '../controllers/Skills';
import upload from '../utils/multer';

const router = express.Router();

router.post('/new', upload.single('icon'), SkillsController.addNewSkill);
router.put('/edit/:id',upload.single('icon'), SkillsController.updateSkill);
router.delete('/delete/:id', SkillsController.deleteSkill);
router.get('/all', SkillsController.getAllSkills);


export default router;