import { Request, Response, NextFunction } from "express";
import { IAuthStrategy } from "../interfaces/strategy.interface";
import passport from "passport";
import jwtServices from "../services/jwt.services";

class GithubStrategy implements IAuthStrategy {
    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }

    async callback(req: Request, res: Response, next: NextFunction): Promise<void> {
        passport.authenticate('github', { session: false }, async (err:any, user:any) => {
            if (!user || err) {
                return res.redirect('http://localhost:5173/login');
            }
            jwtServices.generateJwt(res, user.id);
            return res.redirect('http://localhost:5173/');
        })(req, res, next);
    }
}

export default GithubStrategy;