import { NextFunction, Request, Response } from 'express';
import authServices from '../services/auth.services';
import jwtServices from '../services/jwt.services';
import asyncError from '../middlewares/error.middleware';
import returnRes from '../utils/response';
import otpServices from '../services/otp.services';
import passport from 'passport';
class AuthController {
    signUp = asyncError(async (req:Request,res:Response) => {
        const data = await authServices.signUp(req.body);
        const accessToken = jwtServices.generateJwt(res,data.id);
        returnRes(res,201,'Sign up successful',accessToken);
    })

    verifyEmail = asyncError(async(req:Request,res:Response) => {
        const {email,otp} = req.body;
        await otpServices.verifyOTP(email,otp);
        returnRes(res,200,'Verify email successful');
    })

    signIn = asyncError(async(req:Request,res:Response) => {
        const {email,password} = req.body;
        const userId = await authServices.signIn(email,password);
        const accessToken = jwtServices.generateJwt(res,userId);
        returnRes(res,200,'Sign in successful', accessToken);
    })

    logout = asyncError(async(req:Request,res:Response) => {
        jwtServices.clearJwt(res);
        returnRes(res,200,'Log out successful')
    })

    forgotPassword = asyncError(async(req:Request,res:Response) => { 
        const {email} = req.body;
        await authServices.forgotPassword(email);
        returnRes(res,200,`OTP sent to ${email}`)
    })
    
    resetPassword = asyncError(async(req:Request,res:Response) => {
        const {email, otp, newPassword} = req.body;
        await authServices.resetPassword(email, otp,newPassword);
        returnRes(res,200,'Reset password successful')
    })
   
    checkAuth = asyncError(async(req: Request, res: Response) => {
        const user = req.user;
        returnRes(res,200,'Check authentication successful',user);
    })

    googleAuth = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', {scope: ['email', 'profile']}) (req,res,next);
    })

    googleCallback = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', {session: false}, async(err, user) => {
            if (!user || err) {
                return res.redirect('http://localhost:5173/login');
            }
            jwtServices.generateJwt(res,user.id);
            return res.redirect('http://localhost:5173/')
        })(req,res,next);
    }) 
}

const authController = new AuthController();
export default authController;