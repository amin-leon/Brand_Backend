import express from 'express'
import UsersController from '../controllers/userRegistration';
import AuthVerify from '../middleware/auth';

const Router = express.Router();
//get users: AuthVerify.isAuthenticated, AuthVerify.checkRole,

//updateUser
Router.post('/register', UsersController.userRegistration);
Router.get('/', AuthVerify.isAuthenticated, AuthVerify.checkRole,  UsersController.getAllUsers);
Router.get('/user/:id', UsersController.getSingleUser);
Router.put('/user/update/:id', UsersController.updateUser);
Router.delete('/delete/:id', UsersController.deleteUser);




export default Router;