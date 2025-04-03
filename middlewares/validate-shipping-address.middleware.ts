import { validationResult } from "express-validator";
import BaseMiddleware from "./base.middleware";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { BadRequestError } from "../utils/appError";

class ValidateShippingAddressMiddleware extends BaseMiddleware {
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

export default ValidateShippingAddressMiddleware;