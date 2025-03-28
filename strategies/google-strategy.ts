import { Request, Response, NextFunction } from "express";
import { IAuthStrategy } from "../interfaces/auth.interface";
import passport from "passport";
import jwtServices from "../services/jwt.services";

class GoogleStrategy implements IAuthStrategy {
    async signIn(req: Request, res: Response, next?: NextFunction): Promise<void> {
        passport.authenticate('google', {scope: ['email', 'profile']}) (req,res,next);
    }

    async callback(req: Request, res: Response, next: NextFunction): Promise<void> {
        passport.authenticate('google', { session: false }, async (err, user) => {
            if (!user || err) {
                return res.redirect('http://localhost:5173/login');
            }
            jwtServices.generateJwt(res, user.id);
            return res.redirect('http://localhost:5173/');
        })(req, res, next);
    }
}

export default GoogleStrategy;