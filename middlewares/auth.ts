import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/appError';
import { IAuthRequest } from '../interfaces/auth.interface';

export const authenticate = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new UnauthorizedError('Please login to continue');
    }
    next();
}; 