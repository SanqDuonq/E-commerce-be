import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/appError';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new UnauthorizedError('Please login to continue');
    }
    next();
}; 