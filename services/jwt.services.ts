import { Response } from "express";
import { IJwt } from "../interfaces/jwt.interface";
import jwt from 'jsonwebtoken';

class JwtServices implements IJwt {
    generateJwt(res: Response, userId: string): string {
        const payload = {
            userId
        }
        const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN!,{expiresIn: '2h'});
        res.cookie('accessToken',accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 2
        })
        return accessToken;
    }
    clearJwt(res: Response): void {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
    }
}

const jwtServices = new JwtServices();
export default jwtServices;