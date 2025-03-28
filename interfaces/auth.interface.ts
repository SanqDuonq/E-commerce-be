import {Request, Response, NextFunction} from 'express'

export interface IAuthRequest extends Request {
    user?: string
}

export interface IAuthStrategy {
    signIn(req: Request, res: Response, next?: NextFunction): Promise<void>
}
