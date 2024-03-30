import express from 'express'
import SubscribersController from '../controllers/Subscribe';
import AuthVerify from '../middleware/auth';

const router = express.Router();

router.post('/subscribe',  SubscribersController.subscribe);
router.delete('/delete/:id',AuthVerify.isAuthenticated, AuthVerify.checkRole, SubscribersController.deleteSub);
router.get('/all', AuthVerify.isAuthenticated, AuthVerify.checkRole, SubscribersController.getAllSubs);

export default router;