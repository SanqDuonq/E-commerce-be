// middlewares/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../utils/appError';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
};