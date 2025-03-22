import {Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthRequest } from "../interfaces/auth.interface";

function verifyToken(req: Request, res: Response, next: NextFunction) {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({
			message: "Unauthorized - no token provided",
		});
		return;
	}
	try {
        const decode = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN!
        ) as JwtPayload;
        req.user = decode.userId
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Forbidden - Invalid or expired token'
        })
        return;
    }
}

export default {
    verifyToken
};
