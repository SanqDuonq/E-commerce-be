import { NextFunction } from "express";
import { Request, Response } from "express";
import IHandler from "../interfaces/handler.interface";

abstract class BaseMiddleware implements IHandler {
    // protected next: BaseMiddleware | null = null;

    // setNext(middleware: BaseMiddleware): BaseMiddleware {
    //     this.next = middleware;
    //     return middleware;
    // }

    // abstract handle(req: Request, res: Response, next: NextFunction): void; 
    protected nextHandle: IHandler | null = null;
    public setNext(handler: IHandler): IHandler {
        this.nextHandle = handler;
        return handler;
    }
    public handle(req: Request, res: Response, next: NextFunction): void {
        if(this.nextHandle){
            return this.nextHandle.handle(req,res,next)
        }
    }
}

export default BaseMiddleware;