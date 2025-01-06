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
    async signIn(req:Request,res:Response) {
        const {email,password} = req.body;
        try {
            const user = await authServices.signIn({
                email,password
            })
            const accessToken = jwtServices.generateJwt(res,user.userId);
            res.status(200).json({
                message: 'Login successful',
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
    async logout(req:Request,res:Response) {
        try {
            jwtServices.clearJwt(res);
            res.status(200).json({
                message: 'Logout successful'
            })
        } catch (error) {
            catchError(res,error);
        }
    }
    async forgotPassword(req:Request,res:Response) {
        const {email} = req.body;
        try {
            await authServices.forgotPassword({
                email
            })
            res.status(200).json({
                message: `OTP sent to ${email}`
            })
        } catch (error) {
            catchError(res,error);
        }
    }
    async resetPassword(req: Request,res:Response) {
        const {OTP,newPassword} = req.body;
        try {
            await authServices.resetPassword({
                OTP,newPassword
            })
            res.status(200).json({
                message: 'Reset password successful'
            })
        } catch (error) {
            catchError(res,error);
        }
    }
}

const authController = new AuthController();
export default authController;