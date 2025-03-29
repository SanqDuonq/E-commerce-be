import { NextFunction } from "express";

import { Request, Response } from "express";
interface IHandler {
    setNext(handler: IHandler): IHandler;
    handle(req: Request, res: Response, next: NextFunction): void;
}

export default IHandler;
