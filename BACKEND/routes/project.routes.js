import { Router } from 'express';
import {body } from 'express-validator';

const router =  Router();

router.post('/create',
    body('name').isString().withMessage("name is required")
);


export default router;