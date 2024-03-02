import express from 'express'
import MessagesController from '../controllers/Messages';

const router = express.Router();

router.post('/new',  MessagesController.sendMessage);
router.delete('/delete/:id', MessagesController.deleteMessage);
router.get('/all', MessagesController.getAllMessages);
router.put('/read/:id', MessagesController.readMessage);

export default router;