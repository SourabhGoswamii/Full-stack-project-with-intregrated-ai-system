import * as projectServices from '../services/project.service.js';
import {validationResult} from "express-validator";
import userModels from "../models/user.model.js";


export const createproject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try{
        const { name } = req.body;
        const loggedinuser = await userModels.findOne({email:req.user.email});
    
    
        const userId = loggedinuser._id;
    
        const newproject = await projectServices.createproject(name, userId);
        res.status(201).json(newproject);


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}