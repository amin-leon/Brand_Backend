import express from 'express'
import UsersController from '../controllers/userRegistration';

const Router = express.Router();

//updateUser
Router.post('/register', UsersController.userRegistration);
Router.get('/', UsersController.getAllUsers);
Router.get('/user/:id', UsersController.getSingleUser);
Router.put('/user/update/:id', UsersController.updateUser);
Router.delete('/delete/:id', UsersController.deleteUser);




export default Router;