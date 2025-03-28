import { Request, Response } from 'express';
import authServices from '../services/auth.services';
import { catchAsync } from '../utils/catchAsync';
import jwtServices from '../services/jwt.services';
import { success } from '../utils/response';
import otpServices from '../services/otp.services';
import { IAuthRequest } from '../interfaces/auth.interface';

class AuthController {
    signUp = catchAsync(async (req:Request,res:Response) => {
        const data = await authServices.signUp(req.body);
        const accessToken = jwtServices.generateJwt(res,data.id);
        return success(res, 201, 'Sign up successful', accessToken);
    })

    verifyEmail = catchAsync(async(req:Request,res:Response) => {
        const {email,otp} = req.body;
        await otpServices.verifyOTP(email,otp);
        return success(res, 200, 'Verify email successful');
    })

    signIn = catchAsync(async(req:Request,res:Response) => {
        const {email,password} = req.body;
        const userId = await authServices.signIn(email,password);
        const accessToken = jwtServices.generateJwt(res,userId);
        return success(res, 200, 'Sign in successful', accessToken);
    })

    logout = catchAsync(async(req:Request,res:Response) => {
        jwtServices.clearJwt(res);
        return success(res, 200, 'Log out successful');
    })

    forgotPassword = catchAsync(async(req:Request,res:Response) => { 
        const {email} = req.body;
        await authServices.forgotPassword(email);
        return success(res, 200, `OTP sent to ${email}`);
    })
    
    resetPassword = catchAsync(async(req:Request,res:Response) => {
        const {email, otp, newPassword} = req.body;
        await authServices.resetPassword(email, otp,newPassword);
        return success(res, 200, 'Reset password successful');
    })
   
    checkAuth = catchAsync(async(req: IAuthRequest, res: Response) => {
        const user = req.user;
        return success(res, 200, 'Check authentication successful', user);
    })
}

export default new AuthController();