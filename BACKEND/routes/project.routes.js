import { Router } from "express";
import {body} from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authmiddelware from "../Middleware/auth.middelware.js";


const router = Router();

router.post("/create",
    authmiddelware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createproject,
)



export default router;
