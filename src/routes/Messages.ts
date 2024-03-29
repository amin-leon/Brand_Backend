import express from 'express'
import MessagesController from '../controllers/Messages';
// import AuthVerify from '../middleware/auth';

const router = express.Router();
// delete: AuthVerify.isAuthenticated, AuthVerify.checkRole,

//Display: AuthVerify.isAuthenticated, AuthVerify.checkRole,

router.post('/new',  MessagesController.sendMessage);
router.delete('/delete/:id', MessagesController.deleteMessage);
router.get('/all', MessagesController.getAllMessages);
router.put('/read/:id', MessagesController.readMessage);

export default router;