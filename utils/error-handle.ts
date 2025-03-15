import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
            message: err.message
        })
        return;
    }
    res.status(500).json({
        message: 'Internal Server Error'
    })
    return;
}

export default errorHandler;
