import { Request, Response, NextFunction} from 'express';

const asyncError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req,res,next)).catch((err) => {
            console.error(err);
            next(err);
        });
    }
}

export default asyncError;