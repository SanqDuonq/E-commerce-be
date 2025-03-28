import { Request, Response } from "express";
import { IAuthStrategy } from "../interfaces/auth.interface";
import authServices from "../services/auth.services";
import jwtServices from "../services/jwt.services";
import returnRes from "../utils/response";

class EmailPasswordStrategy implements IAuthStrategy {
    async signIn(req: Request, res: Response): Promise<void> {
        const {email,password} = req.body;
        const userId = await authServices.signIn(email,password);
        const accessToken = jwtServices.generateJwt(res,userId);
        returnRes(res,200,'Sign in successful', accessToken);
    }
}

export default EmailPasswordStrategy;