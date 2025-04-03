import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import BaseMiddleware from "./base.middleware";

class ValidateOrderItemsMiddleware extends BaseMiddleware {
    public handle(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req);     
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
        }

        if (this.nextHandle) {
            this.nextHandle.handle(req, res, next);
        } else {
            next();
        }
    }
}

export default ValidateOrderItemsMiddleware;