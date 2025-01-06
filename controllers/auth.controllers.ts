import {Request,Response} from 'express'
import authServices from '../services/auth.services';
import catchError from '../utils/catch-error';
import jwtServices from '../services/jwt.services';
class AuthController {
    async signUp(req:Request,res:Response) {
        const {email,password,fullName,profilePicture,phoneNumber} = req.body;
        try {
            const user = await authServices.signUp({
                email, password, fullName, profilePicture, phoneNumber
            })
            const accessToken = jwtServices.generateJwt(res,user.userId);
            res.status(201).json({
                message: 'User created successful',
                accessToken: accessToken
            })
        } catch (error) {
            catchError(res,error);
        }
    }
    async verifyEmail(req:Request,res:Response) {
        const {email,OTP} = req.body;
        try {
            await authServices.verifyEmail({
                email,OTP
            })
            res.status(200).json({
                message: 'Verify email successful'
            })
        } catch (error) {
            catchError(res,error);
        }
    }
}

const authController = new AuthController();
export default authController;