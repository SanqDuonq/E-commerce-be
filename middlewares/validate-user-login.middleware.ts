// middlewares/validate-user-login.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthRequest } from "../interfaces/auth.interface";
import BaseMiddleware from "./base.middleware";
import { BadRequestError } from "../utils/appError";

class ValidateUserLoginMiddleware extends BaseMiddleware {
    handle(req: IAuthRequest, res: Response, next: NextFunction): void {
        const accessToken = req.cookies.accessToken;
        
        if (!accessToken) {
            throw new BadRequestError("Unauthorized - no token provided");
        }

        try {
            const decode = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN!
            ) as JwtPayload;
            
            req.user = decode.userId;
            
            if (this.nextHandle) {
                this.nextHandle.handle(req, res, next);
            } else {
                next();
            }
        } catch (error) {
            throw new BadRequestError("Forbidden - Invalid or expired token");
        }
    }
}

export default ValidateUserLoginMiddleware;