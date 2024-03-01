import express from 'express'
import LoginController from '../controllers/Login';

const Router = express.Router();

// Login
Router.post('/login', LoginController.loginUser);





export default Router;