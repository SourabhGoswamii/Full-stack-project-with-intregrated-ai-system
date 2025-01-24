import {Router} from 'express';
import *as userController from  "../controllers/user.controller.js";
import {body} from 'express-validator';
const router =Router();
import * as authmiddeleware from "../Middleware/auth.middelware.js";


router.post('/register',
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:6}).withMessage('Password is required'),
    userController.createusercontroller
);

router.post('/login',
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:6}).withMessage('Password is required'),
     userController.loginController
); 

router.get('/profile',authmiddeleware.authUser ,userController.profileController);


router.get('/logout',authmiddeleware.authUser,userController.logoutController);














export default router;