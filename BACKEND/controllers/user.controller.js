import usermodel from '../models/user.model.js';
import *as userService  from '../services/user.service.js';
import {validationResult} from 'express-validator';
import redisClint from '../services/redis.service.js';


export const createusercontroller = async (req,res) => {
    const err =validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    try {
        const {email,password} = req.body;
        const user = await userService.createUser({email,password});
        const token = await user.generateToken();
        res.status(201).json({user,token});
    }
    catch (error) {
        res.status(400).json({error:error.message});
    }
}


export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;

        const user = await usermodel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }

        const token = await user.generateToken();

        delete user._doc.password;

        res.status(200).json({ user, token });


    } catch (err) {

        console.log(err);

        res.status(400).send(err.message);
    }
}

export const profileController = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

}

export const logoutController = async (req, res) => {
    try{
        const token =
            req.cookies?.token ||
            ( req.headers.authorization.split(' ')[1]);

        redisClint.set(token, 'logout','EX', 24*60*60);


        res.status(200).json({
            message: 'Logout successfully'
        });     


    } catch (err){
        console.log(err);
        res.status(400).send(err.message);
    }}