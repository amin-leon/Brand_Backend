import express from 'express'
import SubscribersController from '../controllers/Subscribe';

const router = express.Router();

router.post('/subscribe',  SubscribersController.subscribe);
router.delete('/delete/:id', SubscribersController.deleteSub);
router.get('/all', SubscribersController.getAllSubs);

export default router;